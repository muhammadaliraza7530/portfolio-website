import { getContent } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = await getContent();
  const project = content.projects?.find((p: any) => p.id.toString() === id);

  if (!project) {
    return (
      <div className="pb-32 px-6 lg:px-10 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-6">Case Investigation Stalled</h1>
        <p className="text-text-dim mb-12 max-w-md">The specific project record could not be retrieved from the archives.</p>
        <Link href="/projects" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return <ProjectDetailClient project={project} />;
}
