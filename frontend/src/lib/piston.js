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

// Bracket-aware input parser: "nums = [2,7,11,15], target = 9" → { nums: "[2,7,11,15]", target: "9" }
function parseInputValues(inputStr, paramNames) {
  const values = {};
  for (const name of paramNames) {
    const regex = new RegExp(`\\b${name}\\s*=\\s*`);
    const m = regex.exec(inputStr);
    if (!m) continue;
    let start = m.index + m[0].length;
    let depth = 0;
    let inStr = false;
    let strCh = "";
    let end = start;
    for (; end < inputStr.length; end++) {
      const ch = inputStr[end];
      if (inStr) {
        if (ch === strCh && inputStr[end - 1] !== "\\") inStr = false;
        continue;
      }
      if (ch === '"' || ch === "'") {
        inStr = true;
        strCh = ch;
        continue;
      }
      if ("[{(".includes(ch)) {
        depth++;
        continue;
      }
      if ("])}".includes(ch)) {
        depth--;
        continue;
      }
      if (ch === "," && depth === 0) break;
    }
    values[name] = inputStr.slice(start, end).trim();
  }
  return values;
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
      const vals = parseInputValues(
        ex.input,
        params.map((p) => p.name)
      );
      const expected = (ex.output || "").trim();
      const varNames = [];
      params.forEach((p, j) => {
        const vn = `_a${i}_${j}`;
        const raw = vals[p.name] || cppVal(p.type);
        const v = raw
          .replace(/\[/g, "{")
          .replace(/\]/g, "}")
          .replace(/True/g, "true")
          .replace(/False/g, "false")
          .replace(/[;,]$/, "")
          .trim();
        lines.push(`    ${p.type} ${vn} = ${v};`);
        varNames.push(vn);
      });
      lines.push(
        buildPrintStmt(returnType, fnName, varNames.join(", "), `Test ${i + 1}`, expected)
      );
    });
  } else {
    const varNames = [];
    params.forEach((p, j) => {
      const vn = `_a0_${j}`;
      lines.push(`    ${p.type} ${vn} = ${cppVal(p.type)};`);
      varNames.push(vn);
    });
    lines.push(buildPrintStmt(returnType, fnName, varNames.join(", "), "Test 1", "?"));
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

// ========== JAVA ==========
function parseJavaSignature(code) {
  const lines = code.split("\n");
  for (const line of lines) {
    const m = line.match(/^\s*(?:public\s+)?(\S+)\s+(\w+)\s*\(([^)]*)\)\s*\{?\s*$/);
    if (m && m[2] !== "main" && m[2] !== "Solution") {
      const returnType = m[1];
      const fnName = m[2];
      const params = m[3]
        .split(",")
        .map((p) => {
          p = p.trim();
          const lastSpace = p.lastIndexOf(" ");
          if (lastSpace === -1) return null;
          return {
            type: p.substring(0, lastSpace).trim(),
            name: p.substring(lastSpace + 1).trim(),
          };
        })
        .filter(Boolean);
      return { fnName, returnType, params };
    }
  }
  return null;
}

function javaConvertVal(type, val) {
  if (!val) return "null";
  if (["int", "long", "double", "float", "boolean"].includes(type))
    return val.replace(/True/gi, "true").replace(/False/gi, "false");
  if (type === "String" || type === "char") return val;
  if (type === "int[]") return `new int[]${val.replace(/\[/g, "{").replace(/\]/g, "}")}`;
  if (type === "int[][]") return `new int[][]${val.replace(/\[/g, "{").replace(/\]/g, "}")}`;
  if (type === "String[]") return `new String[]${val.replace(/\[/g, "{").replace(/\]/g, "}")}`;
  if (type === "char[]") return `${val}.toCharArray()`;
  if (type.startsWith("List<")) {
    const inner = val.replace(/^\[/, "").replace(/\]$/, "").trim();
    return inner ? `new ArrayList<>(Arrays.asList(${inner}))` : "new ArrayList<>()";
  }
  return val.replace(/\[/g, "{").replace(/\]/g, "}");
}

function javaResultWrap(returnType, expr) {
  if (returnType.endsWith("[][]")) return `Arrays.deepToString(${expr})`;
  if (returnType.endsWith("[]")) return `Arrays.toString(${expr})`;
  return `"" + ${expr}`;
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
    const parsed = parseJavaSignature(result);
    const validEx = (examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );
    let testLines;
    if (parsed && validEx.length > 0) {
      const parts = validEx.map((ex, i) => {
        const vals = parseInputValues(
          ex.input,
          parsed.params.map((p) => p.name)
        );
        const expected = (ex.output || "").trim();
        const decls = [];
        const argNames = [];
        parsed.params.forEach((p, j) => {
          const raw = vals[p.name] || "null";
          const converted = javaConvertVal(p.type, raw);
          if (p.type.includes("[]") || p.type.startsWith("List<")) {
            const vn = `_a${i}_${j}`;
            decls.push(`        ${p.type} ${vn} = ${converted};`);
            argNames.push(vn);
          } else {
            argNames.push(converted);
          }
        });
        const call = `sol.${parsed.fnName}(${argNames.join(", ")})`;
        const wrapped = javaResultWrap(parsed.returnType, call);
        return [
          ...decls,
          `        System.out.println("Test ${i + 1}: " + ${wrapped} + " (expected: ${expected})");`,
        ].join("\n");
      });
      testLines = parts.join("\n");
    } else {
      testLines = '        System.out.println("Add test cases");';
    }
    result += `\nclass Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n${testLines}\n    }\n}`;
  }
  return result;
}

// ========== PYTHON ==========
function parsePythonSignature(code) {
  const m = code.match(/def\s+(\w+)\s*\(\s*self\s*(?:,\s*([^)]*))\)/);
  if (!m) return null;
  return {
    fnName: m[1],
    params: (m[2] || "")
      .split(",")
      .map((p) => p.trim().split(":")[0].trim())
      .filter(Boolean),
  };
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
    const parsed = parsePythonSignature(result);
    const validEx = (examples || []).filter(
      (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
    );
    if (parsed && validEx.length > 0) {
      const lines = validEx.map((ex, i) => {
        const vals = parseInputValues(ex.input, parsed.params);
        const args = parsed.params
          .map((p) => {
            let v = vals[p] || "None";
            v = v
              .replace(/\btrue\b/gi, "True")
              .replace(/\bfalse\b/gi, "False")
              .replace(/\bnull\b/gi, "None");
            return v;
          })
          .join(", ");
        const expected = (ex.output || "").trim();
        return `    print(f"Test ${i + 1}: {sol.${parsed.fnName}(${args})} (expected: ${expected})")`;
      });
      result += `\n\nif __name__ == "__main__":\n    sol = Solution()\n${lines.join("\n")}`;
    } else {
      result += '\n\nif __name__ == "__main__":\n    sol = Solution()\n    print("Add test cases")';
    }
  }
  return result;
}

// ========== JAVASCRIPT ==========
function parseJsSignature(code) {
  let m = code.match(/(?:var|let|const)\s+(\w+)\s*=\s*function\s*\(([^)]*)\)/);
  if (!m) m = code.match(/function\s+(\w+)\s*\(([^)]*)\)/);
  if (!m) return null;
  return {
    fnName: m[1],
    params: m[2]
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

function prepareJs(code, examples) {
  if (code.includes("console.log")) return code;
  const parsed = parseJsSignature(code);
  const validEx = (examples || []).filter(
    (e) => e.input && !e.input.toLowerCase().includes("see leetcode")
  );
  if (!parsed || validEx.length === 0) return code + '\n\nconsole.log("Add test cases");';
  const { fnName, params } = parsed;
  const lines = validEx.map((ex, i) => {
    const vals = parseInputValues(ex.input, params);
    const args = params
      .map((p) => {
        let v = vals[p] || "null";
        v = v.replace(/True/gi, "true").replace(/False/gi, "false");
        return v;
      })
      .join(", ");
    const expected = (ex.output || "").trim();
    return `console.log("Test ${i + 1}: " + JSON.stringify(${fnName}(${args})) + " (expected: ${expected})");`;
  });
  return code + "\n\n" + lines.join("\n");
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
