import mongoose from "mongoose";
import { ENV } from "./env.js";

const DB_CONNECT_TIMEOUT_MS = 10000;
let connectPromise = null;
const isDev = ENV.NODE_ENV !== "production";

export const isDBConnected = () => mongoose.connection.readyState === 1;
export const isMemoryDBEnabled = () => globalThis.__TALENT_IQ_USE_MEMORY_DB === true;

export const connectDB = async () => {
  if (isDBConnected() || isMemoryDBEnabled()) return mongoose.connection;

  if (!ENV.DB_URL) {
    if (isDev) {
      globalThis.__TALENT_IQ_USE_MEMORY_DB = true;
      console.warn("DB_URL missing. Falling back to in-memory data store.");
      return null;
    }

    throw new Error("DB_URL is not defined in environment variables");
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(ENV.DB_URL, {
        serverSelectionTimeoutMS: DB_CONNECT_TIMEOUT_MS,
      })
      .then((conn) => {
        console.log("Connected to MongoDB:", conn.connection.host);
        return conn;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB", error.message);
        if (isDev) {
          globalThis.__TALENT_IQ_USE_MEMORY_DB = true;
          console.warn("Falling back to in-memory data store for local development.");
          return null;
        }

        throw error;
      })
      .finally(() => {
        connectPromise = null;
      });
  }

  return connectPromise;
};
