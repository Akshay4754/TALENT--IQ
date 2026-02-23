import express from "express";
import { serve } from "inngest/express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Load env vars
dotenv.config({ quiet: true });

import { ENV } from "../../backend/src/lib/env.js";
import { connectDB } from "../../backend/src/lib/db.js";
import { inngest, functions } from "../../backend/src/lib/inngest.js";
import chatRoutes from "../../backend/src/routes/chatRoutes.js";
import sessionRoutes from "../../backend/src/routes/sessionRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const clientUrl = ENV.CLIENT_URL || process.env.CLIENT_URL;
      if (clientUrl && origin === clientUrl) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      if (origin.startsWith("http://localhost:")) return callback(null, true);
      callback(null, true);
    },
    credentials: true,
  })
);

// Connect to DB lazily
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
