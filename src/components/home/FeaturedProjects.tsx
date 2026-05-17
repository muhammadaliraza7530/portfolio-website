"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] tracking-[0.1em] font-bold text-white  mb-8">
      Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featured.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            className="group bg-card rounded-[2rem] overflow-hidden border border-border hover:border-accent transition-all shadow-sm hover:shadow-accent/5"
          >
            <div className="aspect-[16/10] overflow-hidden bg-bg relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale hover:grayscale-0"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-10">
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-dim mb-8 line-clamp-2 leading-relaxed font-medium">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 bg-white/5 border border-border rounded-full text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-6 pt-4 border-t border-border">
                <span className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent group-hover:text-white transition-colors">
                  <span>View Case Study</span>
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/projects" className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-accent hover:text-white transition-colors group">
        <span>View All Work</span>
        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}