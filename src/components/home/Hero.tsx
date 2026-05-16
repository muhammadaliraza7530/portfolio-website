"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full h-[80vh] px-6 lg:px-10 pt-22 flex flex-col justify-center bg-bg relative z-10">
      <div className="max-w-[1290px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl text-center font-bold tracking-tighter mb-1 leading-[0.9] text-white">
            Full Stack  <span className="text-accent text-shadow-glow">Developer</span>
          </h1>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block drop-shadow-sm text-center">
            Available for New Projects
          </span>
          <p className="text-lg md:text-md text-text-dim leading-relaxed mb-8 max-w-2xl mx-auto text-center it">
            Specializing in building high-performance web architectures and AI-driven user experiences. I bridge the gap between technical complexity and intuitive design.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-bg rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg hover:shadow-white/10 active:scale-95"
            >
              Hire Me
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border border-border text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent transition-all active:scale-95"
            >
              Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
