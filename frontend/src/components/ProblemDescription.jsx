import { useEffect, useState } from "react";
import { getDifficultyBadgeClass } from "../lib/utils";

function decode(str = "") {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function clean(html = "") {
  return decode(
    html
      .replace(/<sup>([\s\S]*?)<\/sup>/gi, "^$1")
      .replace(/<sub>([\s\S]*?)<\/sub>/gi, "_$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{2,}/g, " ")
  ).trim();
}

function getExamples(html = "") {
  const results = [];
  for (const m of html.matchAll(/<pre>([\s\S]*?)<\/pre>/gi)) {
    const txt = clean(m[1]);
    const inp = txt.match(/Input\s*:\s*([\s\S]+?)(?=\s*Output\s*:)/i);
    const out = txt.match(/Output\s*:\s*([\s\S]+?)(?=\s*Explanation\s*:|$)/i);
    const exp = txt.match(/Explanation\s*:\s*([\s\S]+?)$/i);
    if (inp && out) {
      const ex = { input: inp[1].trim(), output: out[1].trim() };
      if (exp) ex.explanation = exp[1].trim().slice(0, 200);
      results.push(ex);
    }
  }
  if (results.length) return results.slice(0, 3);

  const segments = html.split(/<p>\s*<strong[^>]*>Example\s*\d*\s*<\/strong>/gi);
  for (const seg of segments.slice(1)) {
    const inp = seg.match(/<strong[^>]*>\s*Input\s*:<\/strong>([\s\S]*?)(?=<strong[^>]*>\s*Output)/i);
    const out = seg.match(/<strong[^>]*>\s*Output\s*:<\/strong>([\s\S]*?)(?=<strong[^>]*>|<\/ul>|$)/i);
    const exp = seg.match(/<strong[^>]*>\s*Explanation\s*:<\/strong>([\s\S]*?)(?=<\/p>|$)/i);
    if (inp && out) {
      const ex = { input: clean(inp[1]), output: clean(out[1]) };
      if (exp) ex.explanation = clean(exp[1]).slice(0, 200);
      results.push(ex);
    }
  }
  return results.slice(0, 3);
}

function getConstraints(html = "") {
  const uls = [...html.matchAll(/<ul>([\s\S]*?)<\/ul>/gi)];
  for (let i = uls.length - 1; i >= 0; i--) {
    const items = [...uls[i][1].matchAll(/<li>([\s\S]*?)<\/li>/gi)]
      .map(m => clean(m[1])).filter(Boolean);
    if (items.length) return items.slice(0, 6);
  }
  return [];
}

function getDescription(html = "", title = "") {
  const stripped = html
    .replace(/<p>\s*<strong[^>]*>Example[\s\S]*$/i, "")
    .replace(/<p>\s*<strong[^>]*>Constraint[\s\S]*$/i, "")
    .replace(/<ul>[\s\S]*?<\/ul>/gi, "")
    .replace(/<pre>[\s\S]*?<\/pre>/gi, "");
  const paras = [...stripped.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map(m => clean(m[1])).filter(p => p.length > 10);
  if (!paras.length) return { text: title, notes: [] };
  return {
    text : paras[0],
    notes: paras.slice(1).filter(p => p.length > 10 && p.length < 300).slice(0, 3),
  };
}

const cache = {};
const LANG_MAP = { javascript:"javascript", python3:"python", java:"java", cpp:"cpp" };

function useLiveProblem(problem) {
  const [live,    setLive]    = useState(null);
  const [loading, setLoading] = useState(false);

  const isBroken =
    !problem?.description?.text ||
    problem.description.text === problem.title ||
    problem.description.text.length < 20 ||
    !problem.examples?.length ||
    problem.examples[0]?.input?.toLowerCase().includes("see leetcode") ||
    problem.examples[0]?.input?.toLowerCase().includes("see problem") ||
    problem.constraints?.some(c => c.includes("&#"));

  useEffect(() => {
    if (!problem?.id) return;
    if (!isBroken) { setLive(null); return; }
    if (cache[problem.id]) { setLive(cache[problem.id]); return; }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        // Calls your backend proxy — no CORS issues
        const res  = await fetch(`/api/leetcode/problem/${problem.id}`);
        const json = await res.json();
        const q    = json?.data?.question;
        if (!q?.content || cancelled) return;

        const html        = q.content;
        const description = getDescription(html, problem.title);
        const examples    = getExamples(html);
        const constraints = getConstraints(html);
        const tags        = (q.topicTags || []).map(t => t.name);

        const finalExamples = examples.length ? examples
          : (q.exampleTestcaseList || []).slice(0, 2).map((tc, i) => ({
              input : tc.replace(/\n/g, ", "),
              output: `See Example ${i + 1} on LeetCode`,
            }));

        const starterCode = { ...problem.starterCode };
        for (const s of (q.codeSnippets || [])) {
          if (LANG_MAP[s.langSlug]) starterCode[LANG_MAP[s.langSlug]] = s.code;
        }

        const enriched = {
          ...problem, description, constraints,
          examples : finalExamples,
          category : tags.slice(0, 3).join(" • ") || problem.category,
          starterCode,
        };

        cache[problem.id] = enriched;
        if (!cancelled) setLive(enriched);
      } catch (err) {
        console.error("Problem fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [problem?.id]);

  return { data: live || problem, loading };
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-base-300 rounded w-full" />
      <div className="h-4 bg-base-300 rounded w-5/6" />
      <div className="h-4 bg-base-300 rounded w-4/6" />
    </div>
  );
}

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const { data: p, loading } = useLiveProblem(problem);

  return (
    <div className="h-full overflow-y-auto bg-base-200">
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">{p.title}</h1>
          <span className={`badge ${getDifficultyBadgeClass(p.difficulty)}`}>
            {p.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{p.category}</p>
        {loading && (
          <div className="mt-2 flex items-center gap-2 text-xs text-base-content/40">
            <span className="loading loading-spinner loading-xs" />
            Loading problem details...
          </div>
        )}
        <div className="mt-4">
          <select
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title} - {prob.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content mb-3">Description</h2>
          {loading ? <Skeleton /> : (
            <div className="space-y-3 text-base leading-relaxed">
              <p className="text-base-content/90">{p.description?.text}</p>
              {(p.description?.notes || []).map((note, idx) => (
                <p key={idx} className="text-base-content/90">{note}</p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          {loading ? <Skeleton /> : (
            <div className="space-y-4">
              {(p.examples || []).map((example, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-sm">{idx + 1}</span>
                    <p className="font-semibold text-base-content">Example {idx + 1}</p>
                  </div>
                  <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                    <div className="flex gap-2">
                      <span className="text-primary font-bold min-w-[70px]">Input:</span>
                      <span>{example.input}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                      <span>{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-2 border-t border-base-300 mt-2">
                        <span className="text-base-content/60 font-sans text-xs">
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
          {loading ? <Skeleton /> : (
            <ul className="space-y-2 text-base-content/90">
              {(p.constraints || []).map((constraint, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <code className="text-sm">{constraint}</code>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
