const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

async function pollResult(token, maxAttempts = 15) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 1500));
    const res = await fetch(`${JUDGE0_API}/submissions/${token}?base64_encoded=true`);
    if (!res.ok) continue;
    const data = await res.json();
    // status 1 = In Queue, 2 = Processing
    if (data.status?.id > 2) return data;
  }
  return null;
}

export const executeCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });
    }

    const base64Code = Buffer.from(code).toString("base64");

    // Submit without wait — async mode
    const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageId,
        source_code: base64Code,
        stdin: "",
      }),
    });

    if (!submitResponse.ok) {
      return res
        .status(502)
        .json({ success: false, error: `Judge0 error: ${submitResponse.status}` });
    }

    const { token } = await submitResponse.json();
    if (!token) {
      return res.status(502).json({ success: false, error: "No token from Judge0" });
    }

    // Poll for result
    const result = await pollResult(token);
    if (!result) {
      return res.json({ success: false, error: "Execution timed out. Try again." });
    }

    const stdout = result.stdout ? Buffer.from(result.stdout, "base64").toString("utf8") : "";
    const stderr = result.stderr ? Buffer.from(result.stderr, "base64").toString("utf8") : "";
    const compileOutput = result.compile_output
      ? Buffer.from(result.compile_output, "base64").toString("utf8")
      : "";

    if (result.status?.id === 3) {
      return res.json({ success: true, output: stdout || "No output" });
    }
    if (result.status?.id === 6) {
      return res.json({ success: false, error: compileOutput || "Compilation error" });
    }
    return res.json({
      success: false,
      output: stdout,
      error: stderr || compileOutput || result.status?.description || "Execution failed",
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return res
      .status(500)
      .json({ success: false, error: `Failed to execute code: ${error.message}` });
  }
};
