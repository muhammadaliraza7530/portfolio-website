"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full px-6 lg:px-10 py-32 flex flex-col justify-center bg-bg relative z-10">
      <div className="max-w-[1290px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block drop-shadow-sm">
            Available for New Projects
          </span>
          <h1 className="text-6xl md:text-8xl text-center font-bold tracking-tighter mb-8 leading-[0.9] text-white">
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
      </div>
    </section>
  );
}
