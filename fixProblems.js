// =============================================================
//  fixProblems.js
//  Fixes existing problems_generated.js:
//  1. Re-fetches problems with "See LeetCode" examples
//  2. Decodes all HTML entities in constraints/description
//  3. Fixes broken examples extraction
//
//  Run: node fixProblems.js
// =============================================================

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

const INPUT_FILE = "problems_generated.js";
const OUTPUT_FILE = "problems_generated.js"; // overwrite same file
const DELAY_MS = 400;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
//  HTML entity decoder — fixes &#39; &amp; etc
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
    .replace(/&ne;/g, "≠")
    .replace(/&times;/g, "×")
    .replace(/&divide;/g, "÷")
    .replace(/&lfloor;/g, "⌊")
    .replace(/&rfloor;/g, "⌋")
    .replace(/&lceil;/g, "⌈")
    .replace(/&rceil;/g, "⌉")
    .replace(/&infin;/g, "∞")
    .replace(/&pi;/g, "π")
    .replace(/&sup2;/g, "²")
    .replace(/&sup3;/g, "³")
    .trim();
}

function stripHtml(html = "") {
  return decodeEntities(
    html
      .replace(/<pre>[\s\S]*?<\/pre>/gi, "")
      .replace(/<code>([\s\S]*?)<\/code>/gi, "$1")
      .replace(/<strong>([\s\S]*?)<\/strong>/gi, "$1")
      .replace(/<em>([\s\S]*?)<\/em>/gi, "$1")
      .replace(/<sup>([\s\S]*?)<\/sup>/gi, "^$1")
      .replace(/<sub>([\s\S]*?)<\/sub>/gi, "_$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/ {2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
  ).trim();
}

// ─────────────────────────────────────────────
//  Improved example extractor
//  Handles multiple LeetCode HTML formats
// ─────────────────────────────────────────────
function extractExamples(html = "") {
  const examples = [];

  // Format 1: <pre> blocks (most common)
  const preBlocks = html.match(/<pre>([\s\S]*?)<\/pre>/gi) || [];
  for (const block of preBlocks) {
    const text = decodeEntities(block.replace(/<[^>]+>/g, "").replace(/\s+/g, " ")).trim();
    const inM = text.match(/Input\s*:\s*(.+?)(?=Output|$)/i);
    const outM = text.match(/Output\s*:\s*(.+?)(?=Explanation|$)/i);
    const expM = text.match(/Explanation\s*:\s*([\s\S]+?)(?=\n\n|Input|$)/i);

    if (inM && outM) {
      const ex = {
        input: inM[1].trim(),
        output: outM[1].trim(),
      };
      if (expM) ex.explanation = expM[1].trim().substring(0, 200);
      examples.push(ex);
    }
  }

  // Format 2: <strong>Input:</strong> pattern (newer LeetCode format)
  if (examples.length === 0) {
    const strongPattern =
      html.match(
        /<strong[^>]*>Input:<\/strong>([\s\S]*?)<strong[^>]*>Output:<\/strong>([\s\S]*?)(?=<strong[^>]*>(?:Input|Explanation|Constraints)|<\/div>|$)/gi
      ) || [];

    for (const match of strongPattern) {
      const inputM = match.match(
        /<strong[^>]*>Input:<\/strong>([\s\S]*?)<strong[^>]*>Output:<\/strong>/i
      );
      const outputM = match.match(/<strong[^>]*>Output:<\/strong>([\s\S]*?)(?=<strong|$)/i);
      if (inputM && outputM) {
        examples.push({
          input: decodeEntities(inputM[1].replace(/<[^>]+>/g, "").trim()),
          output: decodeEntities(outputM[1].replace(/<[^>]+>/g, "").trim()),
        });
      }
    }
  }

  // Format 3: p tags with Input/Output text
  if (examples.length === 0) {
    const pContent = html.replace(/<p><strong[^>]*>Input:<\/strong>/gi, "\nINPUT:");
    const lines = pContent.split("\n");
    let inp = null;
    for (const line of lines) {
      const clean = decodeEntities(line.replace(/<[^>]+>/g, "").trim());
      if (clean.startsWith("INPUT:")) inp = clean.replace("INPUT:", "").trim();
      if (clean.startsWith("Output:") && inp) {
        examples.push({ input: inp, output: clean.replace("Output:", "").trim() });
        inp = null;
      }
    }
  }

  // Fallback: use exampleTestcaseList from GraphQL if available
  if (examples.length === 0) {
    return [{ input: "See problem on LeetCode", output: "See problem on LeetCode" }];
  }

  return examples.slice(0, 3);
}

function extractConstraints(html = "") {
  // Try last <ul> block
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

  // Try <p> with constraint-like content
  const pBlocks = html.match(/<p>([\s\S]*?)<\/p>/gi) || [];
  const constraints = pBlocks
    .map((p) => decodeEntities(p.replace(/<[^>]+>/g, "").trim()))
    .filter((p) => p.match(/\d.*[≤<>=]|length|size|node/i))
    .slice(0, 6);

  return constraints;
}

function extractDescription(html = "") {
  const plain = stripHtml(html);
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
//  Fetch problem from LeetCode GraphQL
// ─────────────────────────────────────────────
async function fetchFromLeetCode(slug) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Referer: `https://leetcode.com/problems/${slug}/`,
          Origin: "https://leetcode.com",
        },
        body: JSON.stringify({
          query: `query($titleSlug:String!){
            question(titleSlug:$titleSlug){
              content
              topicTags{name}
              codeSnippets{lang langSlug code}
              exampleTestcaseList
            }
          }`,
          variables: { titleSlug: slug },
        }),
      });

      if (res.status === 429) {
        await sleep(attempt * 2000);
        continue;
      }
      const json = await res.json();
      return json?.data?.question || null;
    } catch {
      if (attempt < 3) await sleep(attempt * 1000);
    }
  }
  return null;
}

// ─────────────────────────────────────────────
//  MAIN — load file, fix all problems
// ─────────────────────────────────────────────
async function main() {
  console.log("\n🔧 TALENT-IQ Problem Fixer\n");

  // 1. Read the generated file
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run fetchAllProblems.js first.`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT_FILE, "utf8");

  // Extract the JSON from the JS file
  // Extract the object from the JS file
  const jsonMatch = raw.match(/const PROBLEMS\s*=\s*(\{[\s\S]*?\n\});/);

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
  const total = slugs.length;
  let fixed = 0;
  let skipped = 0;
  let refetched = 0;

  console.log(`📦 Loaded ${total} problems from ${INPUT_FILE}`);

  // 2. Find broken ones
  const broken = slugs.filter((slug) => {
    const p = PROBLEMS[slug];
    const hasBadExample = p.examples?.some(
      (e) => e.input === "See LeetCode" || e.input === "See problem on LeetCode"
    );
    const hasBadConstraint = p.constraints?.some(
      (c) => c.includes("&#") || c.includes("&amp;") || c.includes("&lt;") || c.includes("&gt;")
    );
    const hasBadDesc =
      p.description?.text?.includes("&#") || p.description?.text?.includes("&amp;");
    return hasBadExample || hasBadConstraint || hasBadDesc;
  });

  console.log(`\n🔍 Found ${broken.length} problems needing fixes`);
  console.log(`✅  ${total - broken.length} problems look clean\n`);

  if (broken.length === 0) {
    // Still fix HTML entities in ALL problems even if examples look ok
    console.log("🧹 Cleaning HTML entities across all problems...");
    for (const slug of slugs) {
      const p = PROBLEMS[slug];
      // Fix constraints
      if (p.constraints) {
        p.constraints = p.constraints.map((c) => decodeEntities(c));
      }
      // Fix description
      if (p.description?.text) {
        p.description.text = decodeEntities(p.description.text);
        p.description.notes = (p.description.notes || []).map((n) => decodeEntities(n));
      }
      // Fix example fields
      if (p.examples) {
        p.examples = p.examples.map((e) => ({
          ...e,
          input: decodeEntities(e.input || ""),
          output: decodeEntities(e.output || ""),
          explanation: e.explanation ? decodeEntities(e.explanation) : undefined,
        }));
      }
      fixed++;
    }
    console.log(`✅ Cleaned ${fixed} problems`);
  } else {
    // Fix broken ones by re-fetching
    for (let i = 0; i < broken.length; i++) {
      const slug = broken[i];
      process.stdout.write(`\r[${i + 1}/${broken.length}] Re-fetching: ${slug.padEnd(45)}`);

      const q = await fetchFromLeetCode(slug);

      if (q && q.content) {
        const html = q.content;
        PROBLEMS[slug].examples = extractExamples(html);
        PROBLEMS[slug].constraints = extractConstraints(html);
        const desc = extractDescription(html);
        if (desc.text) {
          PROBLEMS[slug].description.text = desc.text;
          PROBLEMS[slug].description.notes = desc.notes;
        }
        refetched++;
      } else {
        skipped++;
      }

      // Also clean entities on ALL problems
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
      fixed++;

      await sleep(DELAY_MS);
    }

    // Also clean entities on non-broken problems
    console.log("\n\n🧹 Cleaning HTML entities on remaining problems...");
    for (const slug of slugs) {
      if (broken.includes(slug)) continue;
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
  }

  // 3. Save fixed file
  const langConfig = `
export const LANGUAGE_CONFIG = {
  javascript : { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python     : { name: "Python",     icon: "/python.png",     monacoLang: "python"      },
  java       : { name: "Java",       icon: "/java.png",       monacoLang: "java"        },
  cpp        : { name: "C++",        icon: "/cpp.png",        monacoLang: "cpp"         },
};`;

  const output = [
    `// Fixed by fixProblems.js on ${new Date().toISOString()}`,
    `// Total: ${total} | Re-fetched: ${refetched} | Cleaned: ${fixed} | Skipped: ${skipped}`,
    "",
    `export const PROBLEMS = ${JSON.stringify(PROBLEMS, null, 2)};`,
    langConfig,
  ].join("\n");

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");

  console.log("\n╔══════════════════════════════════════╗");
  console.log(`║  ✅  Fix Complete!                    ║`);
  console.log(`║  🔄  Re-fetched   : ${String(refetched).padEnd(15)}║`);
  console.log(`║  🧹  Entity-fixed : ${String(fixed).padEnd(15)}║`);
  console.log(`║  ⚠️   Skipped      : ${String(skipped).padEnd(15)}║`);
  console.log(`║  💾  Saved to     : ${OUTPUT_FILE.padEnd(15)}║`);
  console.log("╚══════════════════════════════════════╝\n");
  console.log("👉 Now copy problems_generated.js → frontend/src/data/problems.js");
}

main().catch(console.error);
