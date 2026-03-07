// =============================================================
//  fixAllProblems.js
//  Reads frontend/src/data/problems.js, finds all problems with
//  "See LeetCode" placeholders, re-fetches from LeetCode GraphQL,
//  and writes back with real examples.
//
//  Run: node fixAllProblems.js
// =============================================================

import fs from "fs";

const INPUT_FILE = "frontend/src/data/problems.js";
const DELAY_MS = 500;
const BATCH_SIZE = 3; // concurrent requests per batch
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
//  HTML helpers
// ─────────────────────────────────────────────
function decodeEntities(str = "") {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&times;/g, "×")
    .replace(/&minus;/g, "-")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/\u00a0/g, " ");
}

function stripHtml(html = "") {
  return html
    .replace(/<sup>([\s\S]*?)<\/sup>/gi, "^$1")
    .replace(/<pre>[\s\S]*?<\/pre>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─────────────────────────────────────────────
//  Robust example extraction (5 strategies)
// ─────────────────────────────────────────────
function extractExamples(html = "", exampleTestcaseList = []) {
  if (!html) return null;

  const examples = [];

  // ─── Strategy 1: <pre> blocks with <strong>Input:</strong> ───
  const preBlocks = html.match(/<pre>([\s\S]*?)<\/pre>/gi) || [];
  for (const block of preBlocks) {
    const text = decodeEntities(block.replace(/<[^>]+>/g, "").trim());
    const inM = text.match(/Input:\s*([\s\S]*?)(?=\nOutput:|Output:)/i);
    const outM = text.match(/Output:\s*([\s\S]*?)(?=\nExplanation:|$)/i);
    const expM = text.match(/Explanation:\s*([\s\S]*?)$/i);
    if (inM && outM) {
      const ex = {
        input: inM[1].trim(),
        output: outM[1].trim().split("\n")[0].trim(),
      };
      if (expM) ex.explanation = expM[1].replace(/\n/g, " ").trim();
      examples.push(ex);
    }
  }
  if (examples.length > 0) return examples.slice(0, 3);

  // ─── Strategy 2: <strong>Input:</strong> outside <pre> ───
  const inputMatches = [
    ...html.matchAll(/<strong[^>]*>\s*Input:\s*<\/strong>\s*([\s\S]*?)(?=<strong|<\/p>|<br)/gi),
  ];
  const outputMatches = [
    ...html.matchAll(/<strong[^>]*>\s*Output:\s*<\/strong>\s*([\s\S]*?)(?=<strong|<\/p>|<br)/gi),
  ];
  if (inputMatches.length > 0 && outputMatches.length > 0) {
    const count = Math.min(inputMatches.length, outputMatches.length, 3);
    for (let i = 0; i < count; i++) {
      examples.push({
        input: decodeEntities(inputMatches[i][1].replace(/<[^>]+>/g, "").trim()),
        output: decodeEntities(outputMatches[i][1].replace(/<[^>]+>/g, "").trim()),
      });
    }
  }
  if (examples.length > 0) return examples.slice(0, 3);

  // ─── Strategy 3: Split by "Example N:" headers ───
  const exampleSections = html.split(/Example\s*\d+:\s*/i).slice(1);
  for (const section of exampleSections) {
    const text = decodeEntities(
      section
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    );
    const inM = text.match(/Input:\s*(.*?)(?:Output:|$)/i);
    const outM = text.match(/Output:\s*(.*?)(?:Explanation:|$)/i);
    if (inM && outM) {
      examples.push({
        input: inM[1].trim(),
        output: outM[1].trim(),
      });
    }
  }
  if (examples.length > 0) return examples.slice(0, 3);

  // ─── Strategy 4: Plain text Input:/Output: pairs ───
  const plainText = decodeEntities(html.replace(/<[^>]+>/g, "\n").trim());
  const inputLines = [...plainText.matchAll(/Input:\s*(.+)/gi)];
  const outputLines = [...plainText.matchAll(/Output:\s*(.+)/gi)];
  if (inputLines.length > 0 && outputLines.length > 0) {
    const count = Math.min(inputLines.length, outputLines.length, 3);
    for (let i = 0; i < count; i++) {
      examples.push({
        input: inputLines[i][1].trim(),
        output: outputLines[i][1].trim(),
      });
    }
  }
  if (examples.length > 0) return examples.slice(0, 3);

  // ─── Strategy 5: Use exampleTestcaseList for inputs (no expected output) ───
  // This is a last resort — we have inputs but no expected outputs
  if (exampleTestcaseList && exampleTestcaseList.length > 0) {
    for (const tc of exampleTestcaseList.slice(0, 3)) {
      examples.push({
        input: tc.trim(),
        output: "Run to verify",
      });
    }
  }
  if (examples.length > 0) return examples.slice(0, 3);

  return null; // truly can't extract
}

function extractConstraints(html = "") {
  const ulBlocks = html.match(/<ul>([\s\S]*?)<\/ul>/gi) || [];
  if (ulBlocks.length) {
    const last = ulBlocks[ulBlocks.length - 1];
    const items = last.match(/<li>([\s\S]*?)<\/li>/gi) || [];
    const result = items
      .map((li) =>
        decodeEntities(
          li
            .replace(/<sup>([\s\S]*?)<\/sup>/gi, "^$1")
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim()
        )
      )
      .filter(Boolean);
    if (result.length) return result.slice(0, 6);
  }
  const pBlocks = html.match(/<p>([\s\S]*?)<\/p>/gi) || [];
  const constraints = pBlocks
    .map((p) => decodeEntities(p.replace(/<[^>]+>/g, "").trim()))
    .filter((p) => p.match(/\d.*[≤<>=]|length|size|node/i))
    .slice(0, 6);
  return constraints;
}

function extractDescription(html = "") {
  const plain = decodeEntities(stripHtml(html));
  const lines = plain
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const text = lines[0] || "";
  const notes = lines
    .slice(1)
    .filter((l) => l.length > 15 && l.length < 300)
    .slice(0, 3);
  return { text, notes };
}

// ─────────────────────────────────────────────
//  LeetCode GraphQL fetcher
// ─────────────────────────────────────────────
async function fetchFromLeetCode(slug) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0",
          Referer: `https://leetcode.com/problems/${slug}/`,
          Origin: "https://leetcode.com",
        },
        body: JSON.stringify({
          query: `query($titleSlug:String!){
            question(titleSlug:$titleSlug){
              content
              topicTags{name}
              exampleTestcaseList
            }
          }`,
          variables: { titleSlug: slug },
        }),
      });

      if (res.status === 429) {
        const wait = attempt * 3000;
        console.log(`  ⚠️  Rate limited on ${slug}, waiting ${wait}ms...`);
        await sleep(wait);
        continue;
      }
      const json = await res.json();
      return json?.data?.question || null;
    } catch (err) {
      if (attempt < 3) await sleep(attempt * 1500);
    }
  }
  return null;
}

// ─────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  fixAllProblems.js — Fix See LeetCode   ║");
  console.log("╚══════════════════════════════════════════╝\n");

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found.`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT_FILE, "utf8");

  // Parse PROBLEMS from the ESM file
  const jsonMatch = raw.match(/export const PROBLEMS\s*=\s*(\{[\s\S]*?\n\});/);
  if (!jsonMatch) {
    console.error("❌ Could not parse PROBLEMS from file.");
    process.exit(1);
  }

  let PROBLEMS;
  try {
    PROBLEMS = eval("(" + jsonMatch[1] + ")");
  } catch (e) {
    console.error("❌ Parse error:", e.message);
    process.exit(1);
  }

  const slugs = Object.keys(PROBLEMS);
  console.log(`📦 Total problems: ${slugs.length}`);

  // Find broken ones
  const broken = slugs.filter((slug) => {
    const p = PROBLEMS[slug];
    if (!p.examples || p.examples.length === 0) return true;
    return p.examples.some(
      (e) =>
        !e.input ||
        e.input === "See LeetCode" ||
        e.input === "See problem on LeetCode" ||
        e.output === "See LeetCode" ||
        e.output === "See problem on LeetCode"
    );
  });

  console.log(`🔍 Broken (need re-fetch): ${broken.length}`);
  console.log(`✅ Already good: ${slugs.length - broken.length}\n`);

  if (broken.length === 0) {
    console.log("Nothing to fix!");
    return;
  }

  let fixed = 0;
  let failed = 0;
  let rateLimited = 0;

  // Process in batches
  for (let i = 0; i < broken.length; i += BATCH_SIZE) {
    const batch = broken.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((slug) => fetchFromLeetCode(slug)));

    for (let j = 0; j < batch.length; j++) {
      const slug = batch[j];
      const q = results[j];
      const idx = i + j + 1;

      if (q && q.content) {
        const examples = extractExamples(q.content, q.exampleTestcaseList || []);
        if (examples && examples.length > 0 && examples[0].input !== "See LeetCode") {
          PROBLEMS[slug].examples = examples;
          fixed++;

          // Also fix constraints and description
          const constraints = extractConstraints(q.content);
          if (constraints.length > 0) PROBLEMS[slug].constraints = constraints;

          const desc = extractDescription(q.content);
          if (desc.text && desc.text.length > 10) {
            PROBLEMS[slug].description = desc;
          }
        } else {
          failed++;
        }
      } else {
        failed++;
        if (!q) rateLimited++;
      }

      // Progress
      const pct = Math.round((idx / broken.length) * 100);
      process.stdout.write(
        `\r[${idx}/${broken.length}] ${pct}% ✓${fixed} ✗${failed} — ${slug.substring(0, 40).padEnd(40)}`
      );
    }

    // Save checkpoint every 100 problems
    if ((i + BATCH_SIZE) % 99 < BATCH_SIZE) {
      saveFile(PROBLEMS, raw);
    }

    await sleep(DELAY_MS);
  }

  // Also clean HTML entities across ALL problems
  console.log("\n\n🧹 Cleaning HTML entities across all problems...");
  for (const slug of slugs) {
    const p = PROBLEMS[slug];
    if (p.constraints) p.constraints = p.constraints.map((c) => decodeEntities(c));
    if (p.description?.text) {
      p.description.text = decodeEntities(p.description.text);
      p.description.notes = (p.description.notes || []).map((n) => decodeEntities(n));
    }
    if (p.examples) {
      p.examples = p.examples.map((e) => ({
        ...e,
        input: decodeEntities(e.input || ""),
        output: decodeEntities(e.output || ""),
        explanation: e.explanation ? decodeEntities(e.explanation) : undefined,
      }));
    }
  }

  // Final save
  saveFile(PROBLEMS, raw);

  console.log("\n╔══════════════════════════════════════════╗");
  console.log(`║  ✅ Done!                                ║`);
  console.log(`║  ✓ Fixed:       ${String(fixed).padEnd(24)}║`);
  console.log(`║  ✗ Failed:      ${String(failed).padEnd(24)}║`);
  console.log(`║  ⚠️  Rate-limited: ${String(rateLimited).padEnd(21)}║`);
  console.log("╚══════════════════════════════════════════╝\n");
}

function saveFile(PROBLEMS, originalRaw) {
  // Preserve LANGUAGE_CONFIG from the original file
  const langConfigMatch = originalRaw.match(/(export const LANGUAGE_CONFIG[\s\S]*$)/);
  const langConfig =
    langConfigMatch?.[1] ||
    `export const LANGUAGE_CONFIG = {
  javascript : { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python     : { name: "Python",     icon: "/python.png",     monacoLang: "python"      },
  java       : { name: "Java",       icon: "/java.png",       monacoLang: "java"        },
  cpp        : { name: "C++",        icon: "/cpp.png",        monacoLang: "cpp"         },
};`;

  const output = [
    `// Auto-fixed by fixAllProblems.js on ${new Date().toISOString()}`,
    "",
    `export const PROBLEMS = ${JSON.stringify(PROBLEMS, null, 2)};`,
    "",
    langConfig,
  ].join("\n");

  fs.writeFileSync(INPUT_FILE, output, "utf8");
}

main().catch(console.error);
