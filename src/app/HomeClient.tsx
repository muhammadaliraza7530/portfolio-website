'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Project, Testimonial } from '@/types';
import Hero from '../components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';

interface HomeClientProps {
  initialProjects: Project[];
  initialTestimonials: Testimonial[];
}

export default function HomeClient({ initialProjects, initialTestimonials }: HomeClientProps) {
  return (
    <div className='flex flex-col bg-bg'>
      <Hero />

      <section className='px-6 lg:px-10 py-5 bg-[#080808] border-border'>
        <div className='max-w-[1290px] mx-auto space-y-40'>
          <FeaturedProjects projects={initialProjects} />
          <Testimonials testimonials={initialTestimonials} />
        </div>
      </section>
    </div>
  );
}
