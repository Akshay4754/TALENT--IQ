import { getGroq } from "../lib/gemini.js";

export async function reviewCode(req, res) {
  try {
    const { code, language, problem, difficulty } = req.body;

    if (!code || !language || !problem) {
      return res.status(400).json({ message: "code, language, and problem are required" });
    }

    const prompt = `You are an expert coding interviewer. Analyze the following code submission for a coding interview problem.

Problem: "${problem}" (Difficulty: ${difficulty || "Unknown"})
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide a structured code review in the following JSON format (respond with ONLY valid JSON, no markdown):
{
  "overallScore": <number 1-10>,
  "timeComplexity": "<Big O notation with brief explanation>",
  "spaceComplexity": "<Big O notation with brief explanation>",
  "correctness": {
    "score": <number 1-10>,
    "notes": "<brief assessment of correctness>"
  },
  "edgeCases": [
    "<edge case 1 that should be handled>",
    "<edge case 2 that should be handled>"
  ],
  "strengths": [
    "<strength 1>",
    "<strength 2>"
  ],
  "improvements": [
    "<improvement suggestion 1>",
    "<improvement suggestion 2>"
  ],
  "optimizedApproach": "<brief description of the optimal approach if the submitted code is not optimal>",
  "summary": "<2-3 sentence overall summary>"
}`;

    const result = await getGroq().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const text = result.choices[0]?.message?.content || "";
    const review = JSON.parse(text);

    res.status(200).json({ review });
  } catch (error) {
    console.error("Error in reviewCode controller:", error.message);
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return res
        .status(429)
        .json({ message: "AI service is busy. Please wait a moment and try again." });
    }
    res.status(500).json({ message: "Failed to generate code review" });
  }
}
