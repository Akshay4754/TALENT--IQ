import mongoose from "mongoose";
import { MemoryUserModel } from "../lib/memoryStore.js";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    name: {
      type: String
    },
    profileImage: {
      type: String
    }
  },
  { timestamps: true }
);

const MongooseUser = mongoose.models.User || mongoose.model("User", userSchema);
const useMemory = () => globalThis.__TALENT_IQ_USE_MEMORY_DB === true;

const User = {
  create(data) {
    return useMemory() ? MemoryUserModel.create(data) : MongooseUser.create(data);
  },
  findOne(filter) {
    return useMemory() ? MemoryUserModel.findOne(filter) : MongooseUser.findOne(filter);
  },
  findById(id) {
    return useMemory() ? MemoryUserModel.findById(id) : MongooseUser.findById(id);
  },
  deleteOne(filter) {
    return useMemory() ? MemoryUserModel.deleteOne(filter) : MongooseUser.deleteOne(filter);
  },
};

export default User;
