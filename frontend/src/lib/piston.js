const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

const CPP_STRUCTS = `struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *l, TreeNode *r) : val(x), left(l), right(r) {}
};
struct ListNode {
    int val; ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *n) : val(x), next(n) {}
};
`;

const JAVA_STRUCTS = `class TreeNode {
    int val; TreeNode left, right;
    TreeNode(){} TreeNode(int v){val=v;}
    TreeNode(int v,TreeNode l,TreeNode r){val=v;left=l;right=r;}
}
class ListNode {
    int val; ListNode next;
    ListNode(){} ListNode(int v){val=v;}
    ListNode(int v,ListNode n){val=v;next=n;}
}
`;

function parseCppSignature(code) {
  const sig = code.match(
    /(int|long long|double|float|bool|string|void|vector<[^>]+>|pair<[^>]+>)\s+(\w+)\s*\(([^)]*)\)/
  );
  if (!sig || sig[2] === "main") return null;
  const returnType = sig[1];
  const fnName = sig[2];
  const params = sig[3]
    .split(",")
    .map((p) => {
      p = p.trim().replace(/&/g, "").replace(/const/g, "").replace(/\*/g, "").trim();
      const parts = p.split(/\s+/);
      return { type: parts.slice(0, -1).join(" ").trim(), name: parts[parts.length - 1] };
    })
    .filter((p) => p.name && p.type);
  return { fnName, returnType, params };
}

function cppVal(type) {
  if (type.includes("vector<vector")) return "{{1,2},{3,4}}";
  if (type.includes("vector<int")) return "{1,2,3}";
  if (type.includes("vector<string")) return '{"a","b"}';
  if (type.includes("vector")) return "{}";
  if (type === "string") return '"hello"';
  if (type === "bool") return "true";
  if (type === "double" || type === "float") return "1.0";
  if (type === "long long") return "1LL";
  return "1";
}

// Parse example input like "m = 3, n = 7" into C++ arg values
function parseExampleArgs(inputStr, params) {
  return params.map((p) => {
    const pattern = new RegExp(`\\b${p.name}\\s*=\\s*([^,\\n]+)`);
    const match = inputStr.match(pattern);
    if (match) {
      let v = match[1]
        .trim()
        .replace(/\[/g, "{")
        .replace(/\]/g, "}")
        .replace(/True/g, "true")
        .replace(/False/g, "false");
      // Remove trailing punctuation
      v = v.replace(/[;,]$/, "").trim();
      return v;
    }
    return cppVal(p.type);
  });
}

function buildPrintStmt(returnType, fnName, args, label, expected) {
  const call = `sol.${fnName}(${args})`;
  if (returnType === "void") {
    return `    ${call};\n    cout << "${label}: Done (void) (expected: ${expected})" << endl;`;
  }
  if (returnType.includes("vector")) {
    return `    { auto _r = ${call}; cout << "${label}: ["; for(int _i=0;_i<(int)_r.size();_i++){if(_i)cout<<","; cout<<_r[_i];} cout << "] (expected: ${expected})" << endl; }`;
  }
  if (returnType === "bool") {
    return `    cout << "${label}: " << boolalpha << ${call} << " (expected: ${expected})" << endl;`;
  }
  return `    cout << "${label}: " << ${call} << " (expected: ${expected})" << endl;`;
}

function buildCppMain(code, examples) {
  const parsed = parseCppSignature(code);
  if (!parsed) return `\nint main(){\n    cout<<"Add test cases"<<endl;\n    return 0;\n}`;

  const { fnName, returnType, params } = parsed;
  const lines = [];

  const validExamples = (examples || []).filter(
    (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
  );

  if (validExamples.length > 0) {
    validExamples.forEach((ex, i) => {
      const args = parseExampleArgs(ex.input, params).join(", ");
      const expected = (ex.output || "").trim();
      lines.push(buildPrintStmt(returnType, fnName, args, `Test ${i + 1}`, expected));
    });
  } else {
    // No examples — use default values
    const args = params.map((p) => cppVal(p.type)).join(", ");
    lines.push(buildPrintStmt(returnType, fnName, args, "Test 1", "?"));
  }

  return `\nint main() {\n    Solution sol;\n${lines.join("\n")}\n    return 0;\n}`;
}

function prepareCpp(code, examples) {
  let result = code;

  // 1. Add headers
  if (!result.includes("#include")) {
    result = "#include <bits/stdc++.h>\nusing namespace std;\n\n" + result;
  }

  // 2. Add structs if needed
  const needsStructs =
    (result.includes("TreeNode") && !result.includes("struct TreeNode")) ||
    (result.includes("ListNode") && !result.includes("struct ListNode"));
  if (needsStructs) {
    result = result.replace("using namespace std;", "using namespace std;\n\n" + CPP_STRUCTS);
  }

  // 3. ALWAYS remove any existing main() and replace with our test runner
  result = result.replace(/\n?int main\s*\(\s*\)\s*\{[\s\S]*?\n\}/g, "");

  // 4. Append new main with real test cases
  result += buildCppMain(result, examples);

  return result;
}

function prepareJava(code, examples) {
  let result = code;
  if (!result.includes("import java.util")) {
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
    if (needs.some((n) => result.includes(n))) result = "import java.util.*;\n\n" + result;
  }
  if (result.includes("TreeNode") && !result.includes("class TreeNode"))
    result = result.replace("class Solution", JAVA_STRUCTS + "\nclass Solution");
  if (result.includes("ListNode") && !result.includes("class ListNode"))
    result = result.replace("class Solution", JAVA_STRUCTS + "\nclass Solution");
  if (!result.includes("public static void main")) {
    const validEx = (examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );
    const testLines =
      validEx
        .map(
          (ex, i) =>
            `        System.out.println("Test ${i + 1}: " + "expected: ${(ex.output || "").trim()}");`
        )
        .join("\n") || `        System.out.println("Add test cases");`;
    result += `\nclass Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n${testLines}\n    }\n}`;
  }
  return result;
}

function preparePython(code, examples) {
  let result = code;
  const add = [];
  if (
    !result.includes("from collections") &&
    (result.includes("defaultdict") || result.includes("Counter") || result.includes("deque"))
  )
    add.push("from collections import defaultdict, Counter, deque");
  if (!result.includes("import heapq") && result.includes("heapq")) add.push("import heapq");
  if (!result.includes("import math") && result.includes("math.")) add.push("import math");
  if (add.length) result = add.join("\n") + "\n\n" + result;

  if (!result.includes("if __name__") && !result.includes("print(")) {
    const validEx = (examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );
    const testLines =
      validEx
        .map(
          (ex, i) => `    print(f"Test ${i + 1}: {sol} (expected: ${(ex.output || "").trim()})")`
        )
        .join("\n") || `    print("Add test cases")`;
    result += `\n\nif __name__ == "__main__":\n    sol = Solution()\n${testLines}`;
  }
  return result;
}

function prepareJs(code, examples) {
  if (!code.includes("console.log")) {
    const validEx = (examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );
    const testLines =
      validEx
        .map(
          (ex, i) =>
            `console.log("Test ${i + 1}: " + JSON.stringify(result) + " (expected: ${(ex.output || "").trim()})");`
        )
        .join("\n") || `console.log("Add test cases");`;
    return code + "\n\n" + testLines;
  }
  return code;
}

export function prepareCode(language, code, examples = []) {
  if (!code) return code;
  switch (language) {
    case "cpp":
      return prepareCpp(code, examples);
    case "java":
      return prepareJava(code, examples);
    case "python":
      return preparePython(code, examples);
    case "javascript":
      return prepareJs(code, examples);
    default:
      return code;
  }
}

export async function executeCode(language, code, examples = []) {
  try {
    const languageId = LANGUAGE_IDS[language];
    if (!languageId) return { success: false, error: `Unsupported language: ${language}` };

    const preparedCode = prepareCode(language, code, examples);

    const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true&wait=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageId,
        source_code: btoa(unescape(encodeURIComponent(preparedCode))),
        stdin: "",
      }),
    });

    if (!submitResponse.ok)
      return { success: false, error: `HTTP error! status: ${submitResponse.status}` };

    const result = await submitResponse.json();
    const stdout = result.stdout ? decodeURIComponent(escape(atob(result.stdout))) : "";
    const stderr = result.stderr ? decodeURIComponent(escape(atob(result.stderr))) : "";
    const compileOutput = result.compile_output
      ? decodeURIComponent(escape(atob(result.compile_output)))
      : "";

    if (result.status?.id === 3)
      return { success: true, output: stdout || "Code ran but no output." };
    if (result.status?.id === 6)
      return { success: false, error: compileOutput || "Compilation error" };
    return {
      success: false,
      output: stdout,
      error: stderr || compileOutput || result.status?.description || "Execution failed",
    };
  } catch (error) {
    return { success: false, error: `Failed to execute code: ${error.message}` };
  }
}
