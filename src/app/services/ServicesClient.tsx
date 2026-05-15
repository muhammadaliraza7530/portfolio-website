"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Code2, Globe, Laptop, Smartphone, Rocket, Shield } from "lucide-react";
import { Service } from "@/types";

const icons = [
  <Code2 key="code" className="text-orange-500" size={32} />,
  <Globe key="globe" className="text-blue-500" size={32} />,
  <Laptop key="laptop" className="text-green-500" size={32} />,
  <Smartphone key="phone" className="text-purple-500" size={32} />,
  <Rocket key="rocket" className="text-red-500" size={32} />,
  <Shield key="shield" className="text-yellow-500" size={32} />
];

interface ServicesClientProps {
  initialServices: Service[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold tracking-tighter mb-6 underline decoration-blue-500 underline-offset-8">Services</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Providing comprehensive technical solutions tailored to your unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialServices?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/[0.08]"
            >
              <div className="mb-8">{icons[index % icons.length]}</div>
              <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
              <p className="text-white/50 leading-relaxed text-lg">
                {service.description}
              </p>
              <div className="mt-8 pt-8 border-t border-white/5">
                <Link 
                  href={`/services/${service.id}`}
                  className="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 inline-flex items-center gap-2 group/link"
                >
                  <span>Learn More</span>
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <div className="border-t border-border pt-20">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">The Methodology</span>
          <h2 className="text-4xl font-bold tracking-tighter mb-16">How I Build Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals, constraints, and target audience." },
              { step: "02", title: "Strategy", desc: "Mapping out the architecture and technical roadmap." },
              { step: "03", title: "Execution", desc: "Agile development with clean code and high performance." },
              { step: "04", title: "Launch", desc: "Rigorous testing and deployment to cloud infrastructure." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 bg-card border border-border rounded-2xl relative overflow-hidden group hover:border-accent transition-all"
              >
                <span className="text-5xl font-black text-white/5 absolute -right-2 -top-2 group-hover:text-accent/10 transition-all">{item.step}</span>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
