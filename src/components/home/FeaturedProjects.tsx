"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.slice(0, 2);
  
  return (
    <div className="space-y-6">
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim block border-b border-border pb-4">
        Selected Projects
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featured.map((p, i) => (
          <Link href={`/projects/${p.id}`} key={i} className="group p-8 bg-card border border-border rounded-2xl hover:border-accent transition-all cursor-pointer shadow-sm hover:shadow-accent/5">
            <h3 className="text-base font-bold mb-3 group-hover:text-accent transition-colors">{p.title}</h3>
            <p className="text-xs text-text-dim leading-relaxed line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>
      <Link href="/projects" className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-accent hover:text-white transition-colors group">
        <span>View All Work</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}