// frontend/src/lib/fixStarterCode.js
// Call this whenever you load starter code into the editor
// Usage: const fixed = fixStarterCode(code, "cpp")

export function fixStarterCode(code = "", language = "") {
  if (!code) return code;

  switch (language) {
    case "cpp":
      return fixCpp(code);
    case "java":
      return fixJava(code);
    case "python":
      return fixPython(code);
    default:
      return code;
  }
}

function fixCpp(code) {
  // Already complete
  if (code.includes("#include") && code.includes("int main")) return code;

  const header = `#include <bits/stdc++.h>\nusing namespace std;\n\n`;
  const main = `\n\nint main() {\n    Solution sol;\n    // Add your test cases here\n    return 0;\n}`;

  let result = code;
  if (!code.includes("#include")) result = header + result;
  if (!code.includes("int main")) result = result + main;
  return result;
}

function fixJava(code) {
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
  if (needs.some((n) => code.includes(n))) {
    return "import java.util.*;\n\n" + code;
  }
  return code;
}

function fixPython(code) {
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
