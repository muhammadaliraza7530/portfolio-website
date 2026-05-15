"use client";

import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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
    <div className="space-y-6">
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim block border-b border-border pb-4">
        Client Testimonials
      </span>
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
    </div>
  );
}
