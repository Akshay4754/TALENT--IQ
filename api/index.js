import express from "express";
import { serve } from "inngest/express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Load env vars
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
    origin: ENV.CLIENT_URL || process.env.CLIENT_URL,
    credentials: true,
  })
);

// Connect to DB on cold start (must be before routes)
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

export default app;
