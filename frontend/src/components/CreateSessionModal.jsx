import { useState } from "react";
import { Code2Icon, LoaderIcon, PlusIcon, SearchIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const allProblems = Object.values(PROBLEMS);
  const problems = allProblems.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
              <input
                type="text"
                placeholder="Search problems by title or category..."
                className="input input-bordered w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-y-auto border border-base-300 rounded-lg">
              {problems.length === 0 ? (
                <p className="p-4 text-center text-base-content/50">No problems found</p>
              ) : (
                problems.map((problem) => (
                  <button
                    key={problem.id}
                    type="button"
                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-base-200 transition-colors border-b border-base-300 last:border-b-0 ${
                      roomConfig.problem === problem.title ? "bg-primary/10" : ""
                    }`}
                    onClick={() =>
                      setRoomConfig({
                        difficulty: problem.difficulty,
                        problem: problem.title,
                      })
                    }
                  >
                    <span className="font-medium text-sm">{problem.title}</span>
                    <span
                      className={`badge badge-sm ${getDifficultyBadgeClass(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
