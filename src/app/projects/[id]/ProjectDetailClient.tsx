"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Calendar, User, Code } from "lucide-react";
import { Project } from "@/types";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-6 lg:px-10 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <Link href="/projects" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-text-dim hover:text-white transition-colors mb-12">
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">Case Study</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">{project.title}</h1>
            <p className="text-text-dim text-lg leading-relaxed mb-10 max-w-xl">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12 border-t border-border pt-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-2 flex items-center gap-2">
                  <User size={12} />
                  Role
                </h4>
                <p className="text-sm font-semibold">{project.role}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-2 flex items-center gap-2">
                  <Calendar size={12} />
                  Duration
                </h4>
                <p className="text-sm font-semibold">{project.duration}</p>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-4 flex items-center gap-2">
                <Code size={12} />
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 bg-white/5 border border-border rounded-full text-white/40">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a href="#" className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-bg rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all shadow-xl hover:shadow-white/5">
              <span>Launch Site</span>
              <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl relative aspect-[4/5]"
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              referrerPolicy="no-referrer"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-12 border-b border-border pb-4">In-Depth Analysis</h2>
          <div className="prose max-w-none text-text-dim text-lg leading-relaxed">
            <p>{project.caseStudy}</p>
          </div>
        </div>

        <div>
           <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-12 border-b border-border pb-4">Exploration</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {project.gallery?.map((img, i) => (
               <div key={i} className="rounded-[2rem] overflow-hidden border border-border aspect-video group relative">
                 <Image 
                   src={img} 
                   alt={`${project.title} view ${i + 1}`} 
                   fill
                   className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale hover:grayscale-0"
                   referrerPolicy="no-referrer"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
               </div>
             ))}
           </div>
         </div>
      </div>
    </motion.div>
  );
}
