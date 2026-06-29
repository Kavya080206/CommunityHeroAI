import { analyzeIssue } from "./gemini";

export async function checkAIDuplicate(
  newTitle: string,
  newDescription: string,
  existingReports: any[]
) {
  if (existingReports.length === 0) {
    return {
      duplicate: false,
      message: "No previous reports found.",
    };
  }

  const prompt = `
You are an AI assistant for a civic reporting application.

A citizen has submitted:

Title:
${newTitle}

Description:
${newDescription}

Existing Reports:
${JSON.stringify(existingReports, null, 2)}

Task:

1. Decide whether this new report is similar to any existing report.
2. If yes, return:
- duplicate: true
- matching report title
- similarity percentage
- reason

3. If no, return:
- duplicate: false

Respond ONLY in JSON.

Example:

{
  "duplicate": true,
  "title": "Broken Road",
  "similarity": "92%",
  "reason": "Both reports describe the same pothole."
}
`;

  const result = await analyzeIssue(prompt);

  return result;
}