import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useInviteToSession,
  useJoinSession,
  useReviewCode,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
  Loader2Icon,
  LogOutIcon,
  MailIcon,
  PhoneOffIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon,
  SparklesIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import useStreamClient from "../hooks/useStreamClient";
import useYjsCollaboration from "../hooks/useYjsCollaboration";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

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

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [aiReview, setAiReview] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();
  const inviteMutation = useInviteToSession();
  const reviewMutation = useReviewCode();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    fixStarterCode(problemData?.starterCode?.[selectedLanguage] || "", "javascript")
  );

  // Yjs collaborative editing — uses session callId as room
  const {
    ydoc,
    connected: yjsConnected,
    peers: yjsPeers,
    ready: yjsReady,
    setSharedCode,
    getSharedCode,
  } = useYjsCollaboration(session?.callId || null, {
    name: user?.fullName || user?.firstName || "Anonymous",
    id: user?.id,
  });

  // Seed the Yjs document with starter code when everything is ready
  // Only if the shared doc is empty (first user to load)
  const seededRef = useRef(false);
  useEffect(() => {
    if (!yjsReady || !ydoc || seededRef.current) return;
    const starterCode = fixStarterCode(
      problemData?.starterCode?.[selectedLanguage] || "",
      selectedLanguage
    );
    if (!starterCode) return;

    const ytext = ydoc.getText("monacoContent");
    // Only seed if document is truly empty (first user in the room)
    if (ytext.length === 0) {
      setSharedCode(starterCode);
    }
    seededRef.current = true;
  }, [yjsReady, ydoc, problemData, selectedLanguage, setSharedCode]);

  // Helper to get the current code (from Yjs if active, else local state)
  const getCurrentCode = () => {
    if (ydoc) {
      return getSharedCode();
    }
    return code;
  };

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });

    // remove the joinSessionMutation, refetch from dependencies to avoid infinite loop
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(fixStarterCode(problemData.starterCode[selectedLanguage], selectedLanguage));
    }
    setIsAccepted(false);
    setOutput(null);
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const newCode = fixStarterCode(problemData?.starterCode?.[newLang] || "", newLang);
    setCode(newCode);
    // Update Yjs shared doc so the other user sees the language change
    if (ydoc) {
      setSharedCode(newCode);
    }
    setOutput(null);
  };

  const getExamples = () =>
    (problemData?.examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const examples = getExamples();
    const result = await executeCode(selectedLanguage, getCurrentCode(), examples);
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput(null);

    const examples = getExamples();
    if (examples.length === 0) {
      toast.error("No test cases available for this problem.");
      setIsSubmitting(false);
      return;
    }

    const result = await executeCode(selectedLanguage, getCurrentCode(), examples);
    setOutput(result);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error("Code execution failed!");
      return;
    }

    const outputText = result.output || "";
    let passCount = 0;
    const total = examples.length;

    examples.forEach((ex, i) => {
      const line = outputText.split("\n").find((l) => l.startsWith(`Test ${i + 1}:`)) || "";
      const actualMatch = line.match(/Test \d+:\s*(.+?)(?:\s*\(expected:|$)/);
      const actual = actualMatch ? actualMatch[1].trim() : "";
      const expected = (ex.output || "").trim();
      if (actual.replace(/\s/g, "") === expected.replace(/\s/g, "")) passCount++;
    });

    if (passCount === total) {
      setIsAccepted(true);
      triggerConfetti();
      toast.success("Accepted! All test cases passed! 🎉");
    } else {
      toast.error(`${passCount}/${total} test cases passed. All must pass to submit.`);
    }
  };

  const handleAiReview = () => {
    const currentCode = getCurrentCode();
    if (!currentCode.trim()) return;
    reviewMutation.mutate(
      {
        code: currentCode,
        language: selectedLanguage,
        problem: problemData?.title || session?.problem || "",
        difficulty: problemData?.difficulty || session?.difficulty || "",
      },
      {
        onSuccess: (data) => {
          setAiReview(data.review);
          setShowReview(true);
        },
      }
    );
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      // this will navigate the HOST to dashboard
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/session/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;
    inviteMutation.mutate(
      { id, email: inviteEmail.trim() },
      {
        onSuccess: () => {
          setInviteEmail("");
          setShowInviteModal(false);
        },
      }
    );
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM DSC PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  {/* HEADER SECTION */}
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-bold text-base-content">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">{problemData.category}</p>
                        )}
                        <p className="text-base-content/60 mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty.slice(0, 1).toUpperCase() +
                            session?.difficulty.slice(1) || "Easy"}
                        </span>
                        {session?.status === "active" && (
                          <button
                            onClick={() => setShowInviteModal(true)}
                            className="btn btn-primary btn-sm gap-2"
                          >
                            <ShareIcon className="w-4 h-4" />
                            Invite
                          </button>
                        )}
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* problem desc */}
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
                        <div className="space-y-3 text-base leading-relaxed">
                          <p className="text-base-content/90">{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-base-content/90">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* examples section */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>

                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="badge badge-sm">{idx + 1}</span>
                                <p className="font-semibold text-base-content">Example {idx + 1}</p>
                              </div>
                              <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                <div className="flex gap-2">
                                  <span className="text-primary font-bold min-w-[70px]">
                                    Input:
                                  </span>
                                  <span>{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-secondary font-bold min-w-[70px]">
                                    Output:
                                  </span>
                                  <span>{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-base-300 mt-2">
                                    <span className="text-base-content/60 font-sans text-xs">
                                      <span className="font-semibold">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                        <ul className="space-y-2 text-base-content/90">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <code className="text-sm">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      onAiReview={handleAiReview}
                      isReviewing={reviewMutation.isPending}
                      ydoc={ydoc}
                      yjsConnected={yjsConnected}
                      yjsPeers={yjsPeers}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} examples={getExamples()} isAccepted={isAccepted} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">Unable to connect to the video call</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
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

            {aiReview.correctness && (
              <div className="bg-base-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-base-content/60">Correctness</p>
                  <span className="badge badge-sm">{aiReview.correctness.score}/10</span>
                </div>
                <p className="text-sm">{aiReview.correctness.notes}</p>
              </div>
            )}

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

            {aiReview.optimizedApproach && (
              <div className="bg-base-200 rounded-lg p-3 mb-4">
                <h4 className="font-semibold text-info mb-1">Optimized Approach</h4>
                <p className="text-sm">{aiReview.optimizedApproach}</p>
              </div>
            )}

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

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-xl mb-4">Share Session</h3>

            {/* Copy Link */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-semibold">Session Link</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/session/${id}`}
                  className="input input-bordered flex-1 text-sm"
                />
                <button onClick={handleCopyLink} className="btn btn-primary btn-square">
                  {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Email Invite */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Invite via Email</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  className="input input-bordered flex-1"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendInvite()}
                />
                <button
                  onClick={handleSendInvite}
                  disabled={inviteMutation.isPending || !inviteEmail.trim()}
                  className="btn btn-primary gap-2"
                >
                  {inviteMutation.isPending ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    <MailIcon className="w-4 h-4" />
                  )}
                  Send
                </button>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowInviteModal(false)}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowInviteModal(false)}></div>
        </div>
      )}
    </div>
  );
}

export default SessionPage;
