// backend/routes/leetcodeProxy.js
// Add to server.js: app.use("/api/leetcode", leetcodeProxyRouter);

import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET /api/leetcode/problem/:slug
router.get("/problem/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/problems/${slug}/`,
        Origin: "https://leetcode.com",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          query q($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
              content
              topicTags     { name }
              codeSnippets  { langSlug code }
              exampleTestcaseList
              difficulty
              title
            }
          }
        `,
        variables: { titleSlug: slug },
      }),
    });

    const data = await response.json();

    // Cache header so same problem isn't re-fetched on every visit
    res.setHeader("Cache-Control", "public, max-age=86400"); // 24h cache
    res.json(data);
  } catch (err) {
    console.error("LeetCode proxy error:", err.message);
    res.status(500).json({ error: "Failed to fetch from LeetCode" });
  }
});

export default router;
