import express from "express";
import http from "http";
import path from "path";
import { serve } from "inngest/express";
import { WebSocketServer } from "ws";
import * as Y from "yjs";

import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import leetcodeProxy from "./routes/leetcodeProxy.js";

const app = express();
const __dirname = path.resolve();

// ✅ middlewares FIRST
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());

// routes
app.use("/api/leetcode", leetcodeProxy);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/code", codeRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ─── Yjs WebSocket Collaboration Server ───
const yjsDocs = new Map();

function getYDoc(roomName) {
  if (yjsDocs.has(roomName)) return yjsDocs.get(roomName);
  const doc = new Y.Doc();
  yjsDocs.set(roomName, { doc, conns: new Set() });
  return yjsDocs.get(roomName);
}

function encodeStateUpdate(doc) {
  return Y.encodeStateAsUpdate(doc);
}

const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  // Only handle /yjs/* paths
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname.startsWith("/yjs/")) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      const roomName = url.pathname.slice(5); // strip "/yjs/"
      wss.emit("connection", ws, roomName);
    });
  } else {
    socket.destroy();
  }
});

wss.on("connection", (ws, roomName) => {
  const room = getYDoc(roomName);
  room.conns.add(ws);

  // Send current doc state to the new client
  const currentState = Y.encodeStateAsUpdate(room.doc);
  ws.send(JSON.stringify({ type: "sync", data: Array.from(currentState) }));

  ws.on("message", (msg) => {
    try {
      const parsed = JSON.parse(msg);
      if (parsed.type === "update") {
        const update = new Uint8Array(parsed.data);
        Y.applyUpdate(room.doc, update);
        // Broadcast to all OTHER clients in the same room
        for (const conn of room.conns) {
          if (conn !== ws && conn.readyState === 1) {
            conn.send(JSON.stringify({ type: "update", data: parsed.data }));
          }
        }
      }
      if (parsed.type === "awareness") {
        // Broadcast awareness to all OTHER clients
        for (const conn of room.conns) {
          if (conn !== ws && conn.readyState === 1) {
            conn.send(JSON.stringify({ type: "awareness", data: parsed.data }));
          }
        }
      }
    } catch {}
  });

  ws.on("close", () => {
    room.conns.delete(ws);
    // Clean up empty rooms after a delay
    if (room.conns.size === 0) {
      setTimeout(() => {
        const r = yjsDocs.get(roomName);
        if (r && r.conns.size === 0) {
          r.doc.destroy();
          yjsDocs.delete(roomName);
        }
      }, 30000);
    }
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("✶ Error starting the server", error);
  }
};
startServer();
