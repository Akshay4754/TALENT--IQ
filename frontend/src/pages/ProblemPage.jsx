import { useParams } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";

function ProblemPage() {
  const { id } = useParams();
  const problem = PROBLEMS[id];

  if (!problem) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Problem not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">{problem.title}</h1>
        <p className="text-base-content/70 mt-2">{problem.description.text}</p>
      </div>
    </div>
  );
}
export default ProblemPage;
