import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const content = await getContent();
  const service = content.services.find((s: any) => s.id === parseInt(id));
  
  if (service) {
    return NextResponse.json(service);
  } else {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
}
