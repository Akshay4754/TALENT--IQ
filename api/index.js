import express from "express";
import { serve } from "inngest/express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Load env vars (harmless if .env doesn't exist on Vercel — process.env already has dashboard vars)
dotenv.config({ path: "./backend/.env", quiet: true });

import { ENV } from "../backend/src/lib/env.js";
import { connectDB } from "../backend/src/lib/db.js";
import { inngest, functions } from "../backend/src/lib/inngest.js";
import chatRoutes from "../backend/src/routes/chatRoutes.js";
import sessionRoutes from "../backend/src/routes/sessionRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow same-origin requests (origin is undefined for same-origin)
      if (!origin) return callback(null, true);
      // Allow configured CLIENT_URL
      const clientUrl = ENV.CLIENT_URL || process.env.CLIENT_URL;
      if (clientUrl && origin === clientUrl) return callback(null, true);
      // Allow Vercel preview/production domains
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      // Allow localhost in development
      if (origin.startsWith("http://localhost:")) return callback(null, true);
      callback(null, true); // allow all for now
    },
    credentials: true,
  })
);

// Connect to DB lazily on first request
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error("DB connection failed:", err.message);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }
  next();
});

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running", dbConnected });
});

export default app;
