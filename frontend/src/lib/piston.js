// Judge0 CE API for code execution
// Using the free public Judge0 instance

const JUDGE0_API = "https://ce.judge0.com";

// Judge0 language IDs
const LANGUAGE_IDS = {
  javascript: 63, // JavaScript (Node.js 12.14.0)
  python: 71, // Python (3.8.1)
  java: 62, // Java (OpenJDK 13.0.1)
  cpp: 54, // C++ (GCC 9.2.0)
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // Submit code for execution
    const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: btoa(unescape(encodeURIComponent(code))),
        stdin: "",
      }),
    });

    if (!submitResponse.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${submitResponse.status}`,
      };
    }

    const result = await submitResponse.json();

    // Decode base64 outputs
    const stdout = result.stdout ? decodeURIComponent(escape(atob(result.stdout))) : "";
    const stderr = result.stderr ? decodeURIComponent(escape(atob(result.stderr))) : "";
    const compileOutput = result.compile_output
      ? decodeURIComponent(escape(atob(result.compile_output)))
      : "";

    // Status id 3 = Accepted (successful execution)
    if (result.status?.id === 3) {
      return {
        success: true,
        output: stdout || "No output",
      };
    }

    // Compilation error
    if (result.status?.id === 6) {
      return {
        success: false,
        error: compileOutput || "Compilation error",
      };
    }

    // Runtime error or other failure
    return {
      success: false,
      output: stdout,
      error: stderr || compileOutput || result.status?.description || "Execution failed",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
