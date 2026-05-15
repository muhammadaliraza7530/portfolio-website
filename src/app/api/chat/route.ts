import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/data";
import { getAIClient, buildSystemInstruction } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // 1. Content fetch karein
    const content = await getContent();
    
    // 2. AI Client setup karein
    const genAI = getAIClient();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Note: gemini-3-flash agar available na ho toh ye stable version hai
      systemInstruction: buildSystemInstruction(content)
    });
    
    // 3. Chat history format karein
    const chat = model.startChat({
      history: history?.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.parts?.[0]?.text || m.content || "" }]
      })) || [],
    });

    // 4. Message bhejein
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("AI ne koi jawab nahi diya");
    }

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Chat API error details:", error);

    // Rate Limit (Quota) Error Handling
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("quota")) {
      return NextResponse.json(
        { 
          error: "API Quota exceeded. Aapki rozana ki limit khatam ho chuki hai. Baraye meherbani kal koshish karein ya billing check karein.",
          code: "QUOTA_EXCEEDED"
        }, 
        { status: 429 }
      );
    }

    // Generic Error
    const errorMessage = error instanceof Error ? error.message : "AI communication failed";
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}