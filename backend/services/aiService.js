const axios = require("axios");

const AI_API_KEY = process.env.AI_API_KEY;
const AI_API_URL = process.env.AI_API_URL;

async function callLLM(prompt) {
  if (!AI_API_KEY || !AI_API_URL) {
    throw new Error("AI_API_KEY or AI_API_URL not configured in environment");
  }
  const resp = await axios.post(
    AI_API_URL,
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
    }
  );
  return resp.data.choices?.[0]?.message?.content || JSON.stringify(resp.data);
}

exports.extractTaskFeatures = async (taskText, optionalDeadline) => {
  const prompt = `
You are a helpful assistant. Given the following single-line task description, extract:
1) a one-sentence summary,
2) estimated time in minutes (if possible),
3) urgency level (0-10),
4) importance level (0-10),
5) whether it contains a deadline and the date if present,
6) suggested category (Study, Work, Personal, Admin, Other).

Return ONLY valid JSON with keys:
{"summary": "...", "estimated_minutes": <int or null>, "urgency": <0-10>, "importance": <0-10>, "deadline": "... or null", "category": "..."}

Task: "${taskText}"
If a deadline is not present, use the optional deadline parameter: "${optionalDeadline || ''}" .
`;

  const output = await callLLM(prompt);
  try {
    const json = JSON.parse(output);
    return {
      summary: json.summary,
      estimatedDuration: json.estimated_minutes,
      urgencyScore: Number(json.urgency),
      importanceScore: Number(json.importance),
      deadline: json.deadline || null,
      category: json.category || "Other",
    };
  } catch (e) {
    return {
      summary: taskText.slice(0, 120),
      estimatedDuration: null,
      urgencyScore: 5,
      importanceScore: 5,
      deadline: optionalDeadline || null,
      category: "Other",
    };
  }
};
