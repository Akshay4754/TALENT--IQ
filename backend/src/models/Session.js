import mongoose from "mongoose";
import { MemorySessionModel } from "../lib/memoryStore.js";

const sessionSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    callId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

const MongooseSession = mongoose.models.Session || mongoose.model("Session", sessionSchema);
const useMemory = () => globalThis.__TALENT_IQ_USE_MEMORY_DB === true;

const Session = {
  create(data) {
    return useMemory() ? MemorySessionModel.create(data) : MongooseSession.create(data);
  },
  find(filter) {
    return useMemory() ? MemorySessionModel.find(filter) : MongooseSession.find(filter);
  },
  findById(id) {
    return useMemory() ? MemorySessionModel.findById(id) : MongooseSession.findById(id);
  },
};

export default Session;
