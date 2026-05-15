"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Project, Testimonial } from "@/types";

interface HomeClientProps {
  initialProjects: Project[];
  initialTestimonials: Testimonial[];
}

export default function HomeClient({ initialProjects, initialTestimonials }: HomeClientProps) {
  const featuredProjects = initialProjects?.slice(0, 2) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left Content Column */}
      <section className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center border-r border-border bg-bg relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block drop-shadow-sm">
            Available for New Projects
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
            Full Stack <br /> Engineering<span className="text-accent text-shadow-glow">.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-dim leading-relaxed mb-12 max-w-md">
            Specializing in building high-performance web architectures and AI-driven user experiences. I bridge the gap between technical complexity and intuitive design.
          </p>
          
          <div className="space-y-4 mb-16">
            {[
              "AI Integration & LLM Architectures",
              "Cloud Native Development (AWS/GCP)",
              "User Interface Design Systems"
            ].map((skill, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm text-text-dim hover:text-white transition-colors cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-bg rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg hover:shadow-white/10 active:scale-95"
            >
              Hire Me
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border border-border text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
            >
              Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Right Content Column */}
      <section className="flex-1 bg-[#080808] p-8 md:p-16 flex flex-col gap-12 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim block border-b border-border pb-4">
            Interactive Assistant
          </span>
          <div className="max-w-2xl">
            <p className="text-sm text-text-dim mb-4 italic">Meet AliBot — ask about my stack or availability.</p>
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-2xl hover:border-accent/20 transition-all">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">AliBot v1.0</span>
                 </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none text-sm text-white/80 max-w-[80%] border border-white/5 shadow-sm">
                  Hello! I'm Ali's virtual assistant. You can ask me about his tech stack or current availability.
                </div>
                <div className="bg-accent p-4 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%] ml-auto shadow-md">
                  What is your expertise in React?
                </div>
              </div>
              <div className="p-4 bg-bg rounded-xl border border-border text-xs text-text-dim flex justify-between items-center group cursor-pointer hover:border-accent/50 transition-all">
                 <span>Ask a question...</span>
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim block border-b border-border pb-4">
            Selected Projects
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProjects.map((p, i) => (
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

        {/* Testimonials Section */}
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim block border-b border-border pb-4">
            Client Testimonials
          </span>
          <TestimonialsCarousel testimonials={initialTestimonials} />
        </div>
      </section>
    </motion.div>
  );
}

function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-white/30 text-xs uppercase tracking-widest">No testimonials available.</div>;
  }

  return (
    <div className="relative h-56 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center bg-card border border-border p-8 rounded-2xl shadow-xl"
        >
          <Quote className="text-accent/20 mb-4" size={28} />
          <p className="text-sm text-white/80 italic leading-relaxed mb-6 font-medium">
            "{testimonials[currentIndex].text}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                {testimonials[currentIndex].name}
              </h4>
              <span className="text-[10px] text-text-dim uppercase tracking-widest font-semibold">
                {testimonials[currentIndex].role}
              </span>
            </div>
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent scale-150' : 'bg-white/10'}`} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
