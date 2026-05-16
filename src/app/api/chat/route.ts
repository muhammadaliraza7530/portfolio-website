import { NextResponse } from "next/server";
import { getContent } from "@/lib/data";
import { buildSystemInstruction, generateChatResponse } from "@/lib/gemini";

// Next.js ko batane ke liye ke yeh route dynamic chalna chahiye
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 }
      );
    }

    // 1. Fetch dynamic content to build the system instruction
    const content = await getContent();
    const systemInstruction = buildSystemInstruction(content);

    // 2. Generate chat response using the gemini library
    const responseText = await generateChatResponse(
      message,
      history,
      systemInstruction
    );

    // 3. Return a clean, successful response
    return NextResponse.json({ text: responseText });
  } catch (error) {
    // 4. Handle errors gracefully
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}