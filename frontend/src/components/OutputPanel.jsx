// frontend/src/components/OutputPanel.jsx
// Shows raw output + per-test pass/fail verdict

function parseTestResults(output = "", examples = []) {
  if (!output || !examples.length) return [];
  const lines = output.trim().split("\n");
  return examples.map((ex, i) => {
    // Find line matching "Test N: actualValue (expected: expectedValue)"
    const line = lines.find((l) => l.startsWith(`Test ${i + 1}:`)) || "";
    const actualMatch = line.match(/Test \d+:\s*(.+?)(?:\s*\(expected:|$)/);
    const expectedMatch = line.match(/\(expected:\s*(.+?)\)/);
    const actual = actualMatch ? actualMatch[1].trim() : line.replace(`Test ${i + 1}:`, "").trim();
    const expected = expectedMatch ? expectedMatch[1].trim() : ex.output?.trim();

    const passed = actual && expected && actual.replace(/\s/g, "") === expected.replace(/\s/g, "");

    return { index: i + 1, input: ex.input, expected, actual, passed, raw: line };
  });
}

export default function OutputPanel({ output, examples = [] }) {
  const testResults =
    output?.success && examples.length ? parseTestResults(output.output, examples) : [];

  const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
  const anyFailed = testResults.some((t) => !t.passed);

  return (
    <div className="h-full overflow-y-auto bg-base-100 p-4 space-y-4">
      <h2 className="text-lg font-bold text-base-content">Output</h2>

      {!output && (
        <p className="text-base-content/40 text-sm">Click "Run Code" to see the output here...</p>
      )}

      {output && (
        <>
          {/* ── Overall verdict ── */}
          {testResults.length > 0 && (
            <div
              className={`rounded-xl p-3 text-sm font-semibold flex items-center gap-2 ${
                allPassed
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {allPassed
                ? "✅ All test cases passed!"
                : `❌ ${testResults.filter((t) => !t.passed).length} test case(s) failed`}
            </div>
          )}

          {/* ── Per-test results ── */}
          {testResults.map((t) => (
            <div
              key={t.index}
              className={`rounded-xl border p-4 space-y-2 text-sm ${
                t.passed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base-content">Test Case {t.index}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    t.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {t.passed ? "PASSED ✓" : "FAILED ✗"}
                </span>
              </div>

              <div className="font-mono text-xs space-y-1 text-base-content/80">
                <div>
                  <span className="text-base-content/40">Input: </span>
                  {t.input}
                </div>
                <div>
                  <span className="text-base-content/40">Expected: </span>
                  <span className="text-green-400">{t.expected}</span>
                </div>
                <div>
                  <span className="text-base-content/40">Got: </span>
                  <span className={t.passed ? "text-green-400" : "text-red-400"}>{t.actual}</span>
                </div>
              </div>
            </div>
          ))}

          {/* ── Raw output ── */}
          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-xs text-base-content/40 mb-2 font-semibold uppercase tracking-wide">
              Raw Output
            </p>
            <pre className="text-sm font-mono text-base-content/80 whitespace-pre-wrap">
              {output.success ? output.output : output.error}
            </pre>
          </div>

          {/* ── Error panel ── */}
          {!output.success && output.error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-xs text-red-400 font-semibold mb-2">ERROR</p>
              <pre className="text-sm font-mono text-red-300 whitespace-pre-wrap">
                {output.error}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
