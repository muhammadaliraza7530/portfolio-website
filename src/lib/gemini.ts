import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined.");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const buildSystemInstruction = (content: any) => {
  return `
    You are an AI assistant for Ali Raza's portfolio. Respond concisely and professionally.
    
    NAME: ${content.profile.name}
    ROLE: ${content.profile.role}
    BIO: ${content.profile.bio}
    SKILLS: ${content.profile.skills.join(", ")}
    
    PROJECTS:
    ${content.projects.map((p: any) => `- ${p.title}: ${p.description}`).join("\n")}
    
    SERVICES:
    ${content.services.map((s: any) => `- ${s.title}: ${s.description}`).join("\n")}
  `;
};
