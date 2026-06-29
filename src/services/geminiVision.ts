import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;
  });
}

export async function analyzeImage(image: File) {
  try {
    const base64 = await fileToBase64(image);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `
You are an expert civic issue detection AI.

Analyze this uploaded image.

Return:
1. Issue Detected
2. Severity (Low/Medium/High/Critical)
3. Responsible Department
4. Confidence %
5. Suggested Action
`,
        },
        {
          inlineData: {
            mimeType: image.type,
            data: base64,
          },
        },
      ],
    });

    return response.text;
  } catch (err) {
    console.error(err);
    return "Image analysis failed.";
  }
}