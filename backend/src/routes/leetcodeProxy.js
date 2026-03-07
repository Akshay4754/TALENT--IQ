// backend/routes/leetcodeProxy.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// ─────────────────────────────────────────────
//  Fix C++ — wrap in proper runnable file
// ─────────────────────────────────────────────
function fixCppCode(code = "") {
  if (!code) return code;

  // LeetCode gives just the class body like:
  // class Solution {
  // public:
  //     vector<int> twoSum(...) { }
  // };
  // We need to prepend headers and append main()

  const alreadyHasInclude = code.includes("#include");

  const headers = `#include <bits/stdc++.h>
using namespace std;

`;

  const mainFunc = `

int main() {
    Solution sol;
    // Add your test cases here
    // Example: cout << sol.twoSum({2,7,11,15}, 9)[0] << endl;
    return 0;
}`;

  const hasMain = code.includes("int main");
  const hasClass = code.includes("class Solution");

  if (alreadyHasInclude && hasMain) return code; // already complete

  let result = "";
  if (!alreadyHasInclude) result += headers;
  result += code;
  if (!hasMain && hasClass) result += mainFunc;

  return result;
}

// ─────────────────────────────────────────────
//  Fix Java — add imports + main class wrapper
// ─────────────────────────────────────────────
function fixJavaCode(code = "") {
  if (!code) return code;

  const imports = [];
  if (!code.includes("import java.util")) {
    const needs = [
      "List",
      "ArrayList",
      "Map",
      "HashMap",
      "Set",
      "HashSet",
      "Queue",
      "Stack",
      "Arrays",
      "Collections",
      "TreeMap",
      "LinkedList",
      "Deque",
      "PriorityQueue",
      "Comparator",
    ];
    if (needs.some((n) => code.includes(n))) {
      imports.push("import java.util.*;");
    }
  }

  return imports.length > 0 ? imports.join("\n") + "\n\n" + code : code;
}

// ─────────────────────────────────────────────
//  Fix Python — add missing imports
// ─────────────────────────────────────────────
function fixPythonCode(code = "") {
  if (!code) return code;
  const add = [];
  if (
    !code.includes("from collections") &&
    (code.includes("defaultdict") || code.includes("Counter") || code.includes("deque"))
  )
    add.push("from collections import defaultdict, Counter, deque");
  if (!code.includes("import heapq") && code.includes("heapq")) add.push("import heapq");
  if (!code.includes("import math") && code.includes("math.")) add.push("import math");
  return add.length > 0 ? add.join("\n") + "\n\n" + code : code;
}

// ─────────────────────────────────────────────
//  Fix JavaScript — add console.log hint
// ─────────────────────────────────────────────
function fixJsCode(code = "") {
  if (!code) return code;
  if (code.includes("// Add your test")) return code;
  return code + "\n\n// Add your test cases here:\n// console.log(solution());";
}

// ─────────────────────────────────────────────
//  GET /api/leetcode/problem/:slug
// ─────────────────────────────────────────────
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
        query: `query q($titleSlug:String!){
          question(titleSlug:$titleSlug){
            content topicTags{name}
            codeSnippets{langSlug code}
            exampleTestcaseList difficulty title
          }
        }`,
        variables: { titleSlug: slug },
      }),
    });

    const data = await response.json();

    if (data?.data?.question?.codeSnippets) {
      data.data.question.codeSnippets = data.data.question.codeSnippets.map((s) => {
        switch (s.langSlug) {
          case "cpp":
            return { ...s, code: fixCppCode(s.code) };
          case "java":
            return { ...s, code: fixJavaCode(s.code) };
          case "python3":
          case "python":
            return { ...s, code: fixPythonCode(s.code) };
          case "javascript":
          case "typescript":
            return { ...s, code: fixJsCode(s.code) };
          default:
            return s;
        }
      });
    }

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Failed to fetch from LeetCode" });
  }
});

export default router;
