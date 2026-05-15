import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format." }, { status: 400 });
    }

    const db = await getDb();
    if (db) {
      await db.execute(
        "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [name, email, subject, message]
      );
      return NextResponse.json({ success: true, message: "Message saved to database." });
    }

    return NextResponse.json({ success: true, message: "Message received (offline mode)." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, message: "Failed to process request." }, { status: 500 });
  }
}
