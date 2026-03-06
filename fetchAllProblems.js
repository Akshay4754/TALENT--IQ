// =============================================================
//  fetchAllProblems.js  — FIXED VERSION
//  Uses LeetCode's own GraphQL API directly (faster + reliable)
//  Run: node fetchAllProblems.js
// =============================================================

import fetch from "node-fetch";
import fs from "fs";

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────
const CONFIG = {
  DIFFICULTY_FILTER: "All", // "All" | "Easy" | "Medium" | "Hard"
  MAX_PROBLEMS: Infinity, // Infinity = all, or set e.g. 500
  DELAY_MS: 400, // ms between requests (400 is safe)
  MAX_RETRIES: 3, // retry failed requests
  OUTPUT_FILE: "problems_generated.js",
  SKIP_PREMIUM: true,
};

const LANG_MAP = {
  javascript: "javascript",
  python3: "python",
  java: "java",
  cpp: "cpp",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
//  STEP 1 — Get full problem list
//  LeetCode public API — always works
// ─────────────────────────────────────────────
async function fetchProblemList() {
  console.log("\n📋 Fetching problem list from LeetCode...");

  const res = await fetch("https://leetcode.com/api/problems/all/", {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
  });
  const data = await res.json();
  const all = data.stat_status_pairs || [];

  console.log(`   Found ${all.length} total problems`);

  let list = all.map((p) => ({
    slug: p.stat.question__title_slug,
    title: p.stat.question__title,
    id: p.stat.question_id,
    difficulty: ["", "Easy", "Medium", "Hard"][p.difficulty.level],
    isPaid: p.paid_only,
  }));

  // Sort by ID
  list.sort((a, b) => a.id - b.id);

  // Filter premium
  if (CONFIG.SKIP_PREMIUM) {
    const before = list.length;
    list = list.filter((p) => !p.isPaid);
    console.log(`🔒 Skipped ${before - list.length} premium problems`);
  }

  // Filter difficulty
  if (CONFIG.DIFFICULTY_FILTER !== "All") {
    list = list.filter((p) => p.difficulty === CONFIG.DIFFICULTY_FILTER);
    console.log(`🎯 Difficulty filter (${CONFIG.DIFFICULTY_FILTER}): ${list.length} problems`);
  }

  // Cap
  if (CONFIG.MAX_PROBLEMS !== Infinity) {
    list = list.slice(0, CONFIG.MAX_PROBLEMS);
  }

  console.log(`📦 Will fetch details for ${list.length} problems\n`);
  return list;
}

// ─────────────────────────────────────────────
//  STEP 2 — Fetch full details via LeetCode
//  GraphQL (this is the fix — direct, fast)
// ─────────────────────────────────────────────
async function fetchProblemDetails(slug, retries = CONFIG.MAX_RETRIES) {
  const query = `
    query getProblem($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        difficulty
        content
        topicTags     { name }
        codeSnippets  { lang langSlug code }
        exampleTestcaseList
        hints
      }
    }
  `;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: `https://leetcode.com/problems/${slug}/`,
          Origin: "https://leetcode.com",
        },
        body: JSON.stringify({ query, variables: { titleSlug: slug } }),
      });

      if (res.status === 429) {
        // Rate limited — wait longer and retry
        const wait = attempt * 2000;
        await sleep(wait);
        continue;
      }

      const json = await res.json();
      const q = json?.data?.question;
      if (q) return q;
    } catch {
      if (attempt < retries) await sleep(attempt * 1000);
    }
  }
  return null;
}

// ─────────────────────────────────────────────
//  HTML helpers
// ─────────────────────────────────────────────
function stripHtml(html = "") {
  return html
    .replace(/<pre>[\s\S]*?<\/pre>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractExamples(html = "") {
  const examples = [];
  const preBlocks = html.match(/<pre>([\s\S]*?)<\/pre>/gi) || [];

  for (const block of preBlocks) {
    const text = block.replace(/<[^>]+>/g, "").trim();
    const inM = text.match(/Input:\s*(.+)/);
    const outM = text.match(/Output:\s*(.+)/);
    const expM = text.match(/Explanation:\s*([\s\S]+?)(?=\n\n|$)/);
    if (inM && outM) {
      const ex = { input: inM[1].trim(), output: outM[1].trim() };
      if (expM) ex.explanation = expM[1].replace(/\n/g, " ").trim();
      examples.push(ex);
    }
  }

  if (!examples.length) examples.push({ input: "See LeetCode", output: "See LeetCode" });
  return examples.slice(0, 3);
}

function extractConstraints(html = "") {
  const ulBlocks = html.match(/<ul>([\s\S]*?)<\/ul>/gi) || [];
  if (!ulBlocks.length) return [];
  const last = ulBlocks[ulBlocks.length - 1];
  const items = last.match(/<li>([\s\S]*?)<\/li>/gi) || [];
  return items
    .map((li) =>
      li
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim()
    )
    .filter(Boolean)
    .slice(0, 6);
}

// ─────────────────────────────────────────────
//  STEP 3 — Build problem entry
// ─────────────────────────────────────────────
function buildEntry(meta, q) {
  const html = q?.content || "";
  const title = q?.title || meta.title;
  const tags = (q?.topicTags || []).map((t) => t.name);
  const category = tags.slice(0, 3).join(" • ") || "Algorithm";

  const plainText = stripHtml(html);
  const lines = plainText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const descText = lines[0] || title;
  const notes = lines
    .slice(1)
    .filter((l) => l.length > 15 && l.length < 250)
    .slice(0, 3);

  const examples = extractExamples(html);
  const constraints = extractConstraints(html);

  // Code snippets — real ones from LeetCode
  const starterCode = {};
  const snippets = q?.codeSnippets || [];

  for (const [lcKey, myKey] of Object.entries(LANG_MAP)) {
    const found = snippets.find((s) => s.langSlug === lcKey);
    if (found) {
      // Add test comment
      const testComment = {
        javascript: "\n\n// Test your solution:\n// console.log(your_function());",
        python: "\n\n# Test your solution:\n# print(your_function())",
        java: "\n\n// Test in main method above",
        cpp: "\n\n// Test in main() above",
      };
      starterCode[myKey] = found.code + (testComment[myKey] || "");
    } else {
      starterCode[myKey] = `// Write your ${myKey} solution for:\n// ${title}`;
    }
  }

  return {
    id: meta.slug,
    title,
    difficulty: meta.difficulty,
    category,
    description: { text: descText, notes },
    examples,
    constraints,
    starterCode,
    expectedOutput: {
      javascript: "// Run to see output",
      python: "# Run to see output",
      java: "// Run to see output",
      cpp: "// Run to see output",
    },
  };
}

// ─────────────────────────────────────────────
//  STEP 4 — Main runner
// ─────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  LeetCode → problems.js  Fixed Fetcher  ║");
  console.log("╚══════════════════════════════════════════╝");

  const toFetch = await fetchProblemList();
  const PROBLEMS = {};
  let success = 0,
    failed = 0;

  for (let i = 0; i < toFetch.length; i++) {
    const meta = toFetch[i];
    const details = await fetchProblemDetails(meta.slug);

    if (details) {
      PROBLEMS[meta.slug] = buildEntry(meta, details);
      success++;
    } else {
      // Save with basic info so it's not completely lost
      PROBLEMS[meta.slug] = buildEntry(meta, null);
      failed++;
    }

    // Live progress line
    const pct = Math.round(((i + 1) / toFetch.length) * 100);
    const bar = "█".repeat(Math.floor(pct / 5)).padEnd(20, "░");
    process.stdout.write(
      `\r[${bar}] ${pct}%  ✓${success}  ✗${failed}  (${i + 1}/${toFetch.length})`
    );

    // Save checkpoint every 100 problems
    // (so you don't lose data if it crashes)
    if ((i + 1) % 100 === 0) {
      saveOutput(PROBLEMS, success, failed, toFetch.length, false);
    }

    await sleep(CONFIG.DELAY_MS);
  }

  console.log("\n");
  saveOutput(PROBLEMS, success, failed, toFetch.length, true);
}

// ─────────────────────────────────────────────
//  Save output file
// ─────────────────────────────────────────────
function saveOutput(PROBLEMS, success, failed, total, isFinal) {
  const output = [
    `// ═══════════════════════════════════════════════════`,
    `//  Auto-generated by fetchAllProblems.js`,
    `//  Total   : ${total}`,
    `//  Success : ${success}`,
    `//  Failed  : ${failed}`,
    `//  Status  : ${isFinal ? "COMPLETE ✅" : "IN PROGRESS ⏳"}`,
    `//  Updated : ${new Date().toISOString()}`,
    `// ═══════════════════════════════════════════════════`,
    "",
    `export const PROBLEMS = ${JSON.stringify(PROBLEMS, null, 2)};`,
    "",
    `export const LANGUAGE_CONFIG = {`,
    `  javascript : { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },`,
    `  python     : { name: "Python",     icon: "/python.png",     monacoLang: "python"      },`,
    `  java       : { name: "Java",       icon: "/java.png",       monacoLang: "java"        },`,
    `  cpp        : { name: "C++",        icon: "/cpp.png",        monacoLang: "cpp"         },`,
    `};`,
  ].join("\n");

  fs.writeFileSync(CONFIG.OUTPUT_FILE, output, "utf8");

  if (isFinal) {
    console.log("╔══════════════════════════════════════════╗");
    console.log(`║  ✅  DONE!                                ║`);
    console.log(`║  ✓   With full details : ${String(success).padEnd(16)} ║`);
    console.log(`║  ✗   Basic info only   : ${String(failed).padEnd(16)} ║`);
    console.log(`║  💾  Saved to          : ${CONFIG.OUTPUT_FILE.padEnd(16)} ║`);
    console.log("╚══════════════════════════════════════════╝");
  }
}

main().catch(console.error);
