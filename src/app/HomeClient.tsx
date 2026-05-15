"use client";

import { motion } from "motion/react";
import React from "react";
import { Project, Testimonial } from "@/types";
import Hero from "../components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";

interface HomeClientProps {
  initialProjects: Project[];
  initialTestimonials: Testimonial[];
}

export default function HomeClient({ initialProjects, initialTestimonials }: HomeClientProps) {
  return (
    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Left Content Column */}
      <Hero />

      {/* Right Content Column */}
      <section className="flex-1 bg-[#080808] p-8 md:p-16 flex flex-col gap-12 overflow-y-auto custom-scrollbar">
        {/* Interactive Assistant */}

        {/* Selected Projects */}
      </section>

    </motion.div>
    <section>
        <FeaturedProjects projects={initialProjects} />

        {/* Testimonials Section */}
        <Testimonials testimonials={initialTestimonials} />

      </section>
    </div>
  );
}
