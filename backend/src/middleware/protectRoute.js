import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      // Auto-create user if not found (fallback for when Inngest webhook hasn't fired)
      if (!user) {
        try {
          console.log("User not found in DB, auto-creating for clerkId:", clerkId);

          // Try using clerkClient to get full user data
          let name = "User";
          let email = "";
          let profileImage = "";

          try {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
            name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";
            profileImage = clerkUser.imageUrl || "";
          } catch (clerkErr) {
            console.log(
              "Could not fetch from Clerk API, creating with minimal data:",
              clerkErr.message
            );
          }

          user = await User.create({
            clerkId,
            email,
            name,
            profileImage,
          });

          // Also sync to Stream
          try {
            await upsertStreamUser({
              id: user.clerkId.toString(),
              name: user.name,
              image: user.profileImage,
            });
          } catch (streamErr) {
            console.log("Stream upsert failed (non-blocking):", streamErr.message);
          }

          console.log("Auto-created user:", user._id);
        } catch (createError) {
          console.error("Error auto-creating user:", createError);
          return res.status(404).json({ message: "User not found" });
        }
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
