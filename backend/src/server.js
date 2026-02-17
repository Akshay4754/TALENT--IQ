import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
const app = express();
const __dirname = path.resolve();

// API routes - must be defined BEFORE the catch-all route
app.get("/health", (req, res) => {
res.status(200).json({ msg: "api is up and running" });
}); 

app.get("/books", (req, res) => {
res.status(200).json({ msg: "this is the books endpoint" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route for SPA - should be LAST and only match non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api") || req.path === "/health" || req.path === "/books") {
    return res.status(404).json({ error: "Not found" });
  }
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));

export default app;