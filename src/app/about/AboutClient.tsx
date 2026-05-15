"use client";

import { motion } from "motion/react";
import { Profile } from "@/types";

interface AboutClientProps {
  initialProfile: Profile;
}

export default function AboutClient({ initialProfile }: AboutClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-6 lg:px-10"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4 block">The Professional Story</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-tight">About Ali <span className="text-accent">Raza</span></h1>
          <div className="prose max-w-none text-text-dim text-[16px] leading-relaxed space-y-8">
            <p className="border-l border-accent/20 pl-8">
              Hello! I'm Ali Raza, a passionate Full Stack Developer with over 5 years of experience 
              in building high-performance web architectures. My approach combines 
              technical rigidity with fluid, user-centric design.
            </p>
            <p>
              I specialize in complex React architectures and Node.js backend systems. I focus on modularity, 
              security, and extreme performance in every line of code I write.
            </p>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <button className="px-8 py-4 bg-white text-bg rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-2">
              <span>View Resume</span>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </button>
            <div className="text-text-dim text-[10px] uppercase tracking-widest font-bold">
              Available for new projects
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-8 border-b border-border pb-4">Core Competencies</h2>
            <div className="flex flex-wrap gap-3">
              {initialProfile?.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-card border border-border rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-dim hover:border-accent hover:text-white transition-all cursor-default shadow-sm hover:shadow-accent/10"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-8 border-b border-border pb-4">Soft Strengths</h2>
            <div className="flex flex-wrap gap-3">
              {initialProfile?.softSkills?.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-accent/5 border border-accent/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-accent hover:bg-accent/10 hover:border-accent transition-all cursor-default shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="border-t border-border pt-24"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-12 block text-center">Career Journey</span>
          
          <div className="relative border-l border-white/5 space-y-20 ml-4 lg:ml-0">
            {[
              { year: "2021 - Present", title: "Senior Web Developer", org: "Tech Innovations Inc", desc: "Leading the development of scalable SaaS platforms and mentoring junior engineers.", color: "accent" },
              { year: "2019 - 2021", title: "Full Stack Developer", org: "Digital Solutions Lab", desc: "Built end-to-end applications using MERN stack with a focus on real-time systems.", color: "white/20" },
              { year: "2015 - 2019", title: "B.S. Computer Science", org: "University of Excellence", desc: "Specialized in distributed systems and advanced algorithms.", color: "white/10" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-12 group"
              >
                <div className={`absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-white/20 border-2 border-bg group-hover:scale-150 transition-transform ${item.color === 'accent' ? '!bg-accent' : ''}`} />
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim mb-2 block">{item.year}</span>
                    <h4 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                    <p className="text-sm font-semibold text-white/40 uppercase tracking-widest">{item.org}</p>
                  </div>
                  <div className="max-w-md lg:text-right">
                    <p className="text-text-dim text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
