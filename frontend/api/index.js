import express from "express";
import { serve } from "inngest/express";
import cors from "cors";
import mongoose from "mongoose";
import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { Inngest } from "inngest";
import { clerkMiddleware, requireAuth, clerkClient } from "@clerk/express";

// ============================================================
// ENV (reads from process.env directly - set in Vercel dashboard)
// ============================================================
const ENV = {
  DB_URL: process.env.DB_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};

// ============================================================
// DATABASE
// ============================================================
let dbConnected = false;
const connectDB = async () => {
  if (dbConnected) return;
  if (!ENV.DB_URL) throw new Error("DB_URL is not defined in environment variables");
  await mongoose.connect(ENV.DB_URL);
  dbConnected = true;
  console.log("Connected to MongoDB");
};

// ============================================================
// MODELS
// ============================================================
const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    email: { type: String },
    name: { type: String },
    profileImage: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const sessionSchema = new mongoose.Schema(
  {
    problem: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    callId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
  },
  { timestamps: true }
);
const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);

// ============================================================
// STREAM CLIENTS (lazy - initialized on first use)
// ============================================================
let chatClient = null;
let streamClient = null;

function getChatClient() {
  if (!chatClient) {
    const key = process.env.STREAM_API_KEY;
    const secret = process.env.STREAM_API_SECRET;
    if (!key || !secret) throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    chatClient = StreamChat.getInstance(key, secret);
  }
  return chatClient;
}

function getStreamClient() {
  if (!streamClient) {
    const key = process.env.STREAM_API_KEY;
    const secret = process.env.STREAM_API_SECRET;
    if (!key || !secret) throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    streamClient = new StreamClient(key, secret);
  }
  return streamClient;
}

const upsertStreamUser = async (userData) => {
  try {
    await getChatClient().upsertUser(userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

// ============================================================
// INNGEST
// ============================================================
const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };
    await User.create(newUser);
    await upsertStreamUser({ id: newUser.clerkId, name: newUser.name, image: newUser.profileImage });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    try { await getChatClient().deleteUser(id); } catch (e) { console.error(e); }
  }
);

const inngestFunctions = [syncUser, deleteUserFromDB];

// ============================================================
// MIDDLEWARE - protectRoute
// ============================================================
const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

      let user = await User.findOne({ clerkId });

      if (!user) {
        try {
          let name = "User", email = "", profileImage = "";
          try {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
            name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";
            profileImage = clerkUser.imageUrl || "";
          } catch (e) {
            console.log("Could not fetch Clerk user:", e.message);
          }
          user = await User.create({ clerkId, email, name, profileImage });
          try {
            await upsertStreamUser({ id: user.clerkId, name: user.name, image: user.profileImage });
          } catch (e) { console.log("Stream upsert failed:", e.message); }
        } catch (createError) {
          console.error("Error auto-creating user:", createError);
          return res.status(404).json({ message: "User not found" });
        }
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// ============================================================
// CONTROLLERS
// ============================================================
async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problem || !difficulty) return res.status(400).json({ message: "Problem and difficulty are required" });
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const session = await Session.create({ problem, difficulty, host: userId, callId });
    await getStreamClient().video.call("default", callId).getOrCreate({
      data: { created_by_id: clerkId, custom: { problem, difficulty, sessionId: session._id.toString() } },
    });
    const channel = getChatClient().channel("messaging", callId, {
      name: `${problem} Session`, created_by_id: clerkId, members: [clerkId],
    });
    await channel.create();
    res.status(201).json({ session });
  } catch (error) {
    console.log("Error in createSession:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed", $or: [{ host: userId }, { participant: userId }],
    }).sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyRecentSessions:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSessionById(req, res) {
  try {
    const session = await Session.findById(req.params.id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function joinSession(req, res) {
  try {
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.status !== "active") return res.status(400).json({ message: "Cannot join completed session" });
    if (session.host.toString() === userId.toString()) return res.status(400).json({ message: "Host cannot join own session" });
    if (session.participant) return res.status(409).json({ message: "Session is full" });
    session.participant = userId;
    await session.save();
    const channel = getChatClient().channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joinSession:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function endSession(req, res) {
  try {
    const userId = req.user._id;
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.host.toString() !== userId.toString()) return res.status(403).json({ message: "Only host can end session" });
    if (session.status === "completed") return res.status(400).json({ message: "Session already completed" });
    const call = getStreamClient().video.call("default", session.callId);
    await call.delete({ hard: true });
    const channel = getChatClient().channel("messaging", session.callId);
    await channel.delete();
    session.status = "completed";
    await session.save();
    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getStreamToken(req, res) {
  try {
    const token = getChatClient().createToken(req.user.clerkId);
    res.status(200).json({ token, userId: req.user.clerkId, userName: req.user.name, userImage: req.user.profileImage });
  } catch (error) {
    console.log("Error in getStreamToken:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ============================================================
// EXPRESS APP
// ============================================================
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(async (req, res, next) => {
  try { await connectDB(); next(); }
  catch (err) { console.error("DB failed:", err.message); res.status(500).json({ message: "Database connection failed" }); }
});

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions: inngestFunctions }));
app.get("/api/chat/token", protectRoute, getStreamToken);
app.post("/api/sessions", protectRoute, createSession);
app.get("/api/sessions/active", protectRoute, getActiveSessions);
app.get("/api/sessions/my-recent", protectRoute, getMyRecentSessions);
app.get("/api/sessions/:id", protectRoute, getSessionById);
app.post("/api/sessions/:id/join", protectRoute, joinSession);
app.post("/api/sessions/:id/end", protectRoute, endSession);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    msg: "api is up and running",
    dbConnected,
    env: {
      DB_URL: !!process.env.DB_URL,
      STREAM_API_KEY: !!process.env.STREAM_API_KEY,
      STREAM_API_SECRET: !!process.env.STREAM_API_SECRET,
      CLIENT_URL: process.env.CLIENT_URL || "NOT SET",
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
      CLERK_PUBLISHABLE_KEY: !!process.env.CLERK_PUBLISHABLE_KEY,
    },
  });
});

export default app;
