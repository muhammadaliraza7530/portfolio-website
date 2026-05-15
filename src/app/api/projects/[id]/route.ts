import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const content = await getContent();
  const project = content.projects.find((p: any) => p.id === parseInt(id));
  
  if (project) {
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}
