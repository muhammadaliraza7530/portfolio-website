import { GoogleGenAI } from "@google/genai";

// Pehle check karein ke key sahi se load ho bhi rahi hai ya nahi
const apiKey = process.env.GEMINI_API_KEY_1;

if (!apiKey) {
  console.log("CRITICAL WARNING: GEMINI_API_KEY_1 is undefined inside gemini.ts");
}

// Instance ko hamesha check ke sath initialize karein
export const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

export function buildSystemInstruction(content: any): string {
  return `You are AliBot, an AI assistant for Ali Raza's portfolio. Content: ${JSON.stringify(content)}`;
}

export async function generateChatResponse(message: string, history: any[] = [], systemInstruction: string = "") {
  if (!process.env.GEMINI_API_KEY_1) {
    throw new Error("API Key is missing from process.env");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: message,
      config: systemInstruction ? {
        systemInstruction: systemInstruction
      } : undefined
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API direct call failed:", error);
    throw error;
  }
}