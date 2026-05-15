"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">Proven Experience</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">Selected <span className="text-accent">Works</span></h1>
          <p className="text-text-dim max-w-xl text-lg leading-relaxed">
            Architecting modern digital solutions with a focus on scalability and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {initialProjects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="group bg-card rounded-[2rem] overflow-hidden border border-border hover:border-accent transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-bg relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale hover:grayscale-0"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-10">
                <h3 className="text-xl font-bold mb-4 tracking-tight">{project.title}</h3>
                <p className="text-sm text-text-dim mb-8 line-clamp-2 leading-relaxed font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 bg-white/5 border border-border rounded-full text-white/40">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-6 pt-4 border-t border-border">
                  <Link href={`/projects/${project.id}`} className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-white transition-colors group/link">
                    <span>Case Study</span>
                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
