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
          const clerkUser = await clerkClient.users.getUser(clerkId);
          user = await User.create({
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
            profileImage: clerkUser.imageUrl,
          });

          // Also sync to Stream
          await upsertStreamUser({
            id: user.clerkId.toString(),
            name: user.name,
            image: user.profileImage,
          });
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
