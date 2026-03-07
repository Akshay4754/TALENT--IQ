import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";
import { useReviewCode } from "../hooks/useSessions";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { SparklesIcon } from "lucide-react";

function fixStarterCode(code = "", language = "") {
  if (!code) return code;
  if (language === "cpp") {
    if (!code.includes("#include"))
      return "#include <bits/stdc++.h>\nusing namespace std;\n\n" + code;
    return code;
  }
  if (language === "java") {
    if (code.includes("import java.util")) return code;
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
    ];
    if (needs.some((n) => code.includes(n))) return "import java.util.*;\n\n" + code;
    return code;
  }
  if (language === "python") {
    const add = [];
    if (
      !code.includes("from collections") &&
      (code.includes("defaultdict") || code.includes("Counter") || code.includes("deque"))
    )
      add.push("from collections import defaultdict, Counter, deque");
    if (!code.includes("import heapq") && code.includes("heapq")) add.push("import heapq");
    if (!code.includes("import math") && code.includes("math.")) add.push("import math");
    return add.length ? add.join("\n") + "\n\n" + code : code;
  }
  return code;
}

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState(id || "two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    fixStarterCode(PROBLEMS[id || "two-sum"]?.starterCode?.javascript || "", "javascript")
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [aiReview, setAiReview] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const reviewMutation = useReviewCode();

  // ✅ Live problem data — updated by ProblemDescription once it fetches from backend
  const [liveProblem, setLiveProblem] = useState(PROBLEMS[currentProblemId] || {});

  const staticProblem = PROBLEMS[currentProblemId] || {};

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(fixStarterCode(PROBLEMS[id].starterCode[selectedLanguage], selectedLanguage));
      setOutput(null);
      setLiveProblem(PROBLEMS[id]); // reset live while new one loads
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(fixStarterCode(staticProblem.starterCode?.[newLang] || "", newLang));
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const handleAiReview = () => {
    if (!code.trim()) return;
    reviewMutation.mutate(
      {
        code,
        language: selectedLanguage,
        problem: staticProblem?.title || "",
        difficulty: staticProblem?.difficulty || "",
      },
      {
        onSuccess: (data) => {
          setAiReview(data.review);
          setShowReview(true);
        },
      }
    );
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    // ✅ Use live examples (fetched from backend), not broken static ones
    const examples = (liveProblem.examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );

    const result = await executeCode(selectedLanguage, code, examples);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const outputText = result.output || "";
      const allPassed =
        examples.length > 0 &&
        examples.every((ex, i) => {
          const line = outputText.split("\n").find((l) => l.startsWith(`Test ${i + 1}:`)) || "";
          const actualMatch = line.match(/Test \d+:\s*(.+?)(?:\s*\(expected:|$)/);
          const actual = actualMatch ? actualMatch[1].trim() : "";
          const expected = (ex.output || "").trim();
          return actual.replace(/\s/g, "") === expected.replace(/\s/g, "");
        });

      if (allPassed && examples.length > 0) {
        triggerConfetti();
        toast.success("All test cases passed! 🎉");
      } else if (examples.length > 0) {
        toast.error("Some test cases failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            {/* ✅ onProblemLoad callback — get live data back from ProblemDescription */}
            <ProblemDescription
              problem={staticProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
              onProblemLoad={setLiveProblem}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                  onAiReview={handleAiReview}
                  isReviewing={reviewMutation.isPending}
                />
              </Panel>
              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel
                  output={output}
                  examples={(liveProblem.examples || []).filter(
                    (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
                  )}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {/* AI REVIEW MODAL */}
      {showReview && aiReview && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-2xl">AI Code Review</h3>
              <div className="ml-auto badge badge-accent badge-lg text-lg font-bold">
                {aiReview.overallScore}/10
              </div>
            </div>

            {/* Complexity */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xs text-base-content/60 mb-1">Time Complexity</p>
                <p className="font-mono font-bold text-primary">{aiReview.timeComplexity}</p>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xs text-base-content/60 mb-1">Space Complexity</p>
                <p className="font-mono font-bold text-secondary">{aiReview.spaceComplexity}</p>
              </div>
            </div>

            {/* Correctness */}
            {aiReview.correctness && (
              <div className="bg-base-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-base-content/60">Correctness</p>
                  <span className="badge badge-sm">{aiReview.correctness.score}/10</span>
                </div>
                <p className="text-sm">{aiReview.correctness.notes}</p>
              </div>
            )}

            {/* Strengths */}
            {aiReview.strengths?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-success mb-2">Strengths</h4>
                <ul className="list-disc list-inside space-y-1">
                  {aiReview.strengths.map((s, i) => (
                    <li key={i} className="text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {aiReview.improvements?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-warning mb-2">Improvements</h4>
                <ul className="list-disc list-inside space-y-1">
                  {aiReview.improvements.map((item, i) => (
                    <li key={i} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Edge Cases */}
            {aiReview.edgeCases?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-error mb-2">Edge Cases</h4>
                <ul className="list-disc list-inside space-y-1">
                  {aiReview.edgeCases.map((ec, i) => (
                    <li key={i} className="text-sm">
                      {ec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optimized Approach */}
            {aiReview.optimizedApproach && (
              <div className="bg-base-200 rounded-lg p-3 mb-4">
                <h4 className="font-semibold text-info mb-1">Optimized Approach</h4>
                <p className="text-sm">{aiReview.optimizedApproach}</p>
              </div>
            )}

            {/* Summary */}
            {aiReview.summary && (
              <div className="bg-base-200 rounded-lg p-3 mb-4">
                <h4 className="font-semibold mb-1">Summary</h4>
                <p className="text-sm">{aiReview.summary}</p>
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setShowReview(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemPage;
