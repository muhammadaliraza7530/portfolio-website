"use client";

import { motion } from "motion/react";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, Laptop, Shield, Zap, Target, Star } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
}

const IconMap: Record<string, any> = {
  Code2: Code2,
  Laptop: Laptop,
  Shield: Shield,
};

export default function ServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Service investigation failed");
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("We couldn't retrieve the details for this specific service.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen">
        <div className="animate-pulse space-y-12">
          <div className="h-4 w-32 bg-white/5 rounded-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="h-16 w-3/4 bg-white/5 rounded-2xl" />
              <div className="h-32 w-full bg-white/5 rounded-2xl" />
              <div className="space-y-4">
                {[1,2,3,4].map(i => <div key={i} className="h-4 w-full bg-white/5 rounded-full" />)}
              </div>
            </div>
            <div className="h-96 bg-white/5 rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 bg-white/5 p-12 rounded-[2.5rem] border border-white/10 max-w-xl">
          <h2 className="text-2xl font-bold">Service Not Found</h2>
          <p className="text-text-dim">{error || "The service you are looking for does not exist."}</p>
          <Link href="/services" className="inline-block px-8 py-3 bg-accent text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-accent/90 transition-all">
            Return to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = IconMap[service.icon] || Code2;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Link 
        href="/services" 
        className="inline-flex items-center gap-2 text-text-dim hover:text-accent transition-colors mb-16 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Services</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
            <Icon className="text-accent" size={32} />
          </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">{service.title}</h1>
          <p className="text-xl text-text-dim leading-relaxed mb-12">
            {service.longDescription}
          </p>

          <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent italic flex items-center gap-2">
                <Target size={12} /> Goal Oriented
              </span>
              <p className="text-sm font-medium">Strategic Execution</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 italic flex items-center gap-2">
                <Zap size={12} /> High Velocity
              </span>
              <p className="text-sm font-medium">Agile Delivery</p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Key Benefits</h3>
            <div className="grid grid-cols-1 gap-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Star size={12} className="text-accent group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-text-dim group-hover:text-white transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="bg-card border border-border p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-all" />
            
            <h2 className="text-2xl font-bold mb-10 tracking-tight">Core Features</h2>
            <div className="space-y-6">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-white/5 rounded-2xl hover:border-accent/20 transition-all bg-white/[0.02]">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                  <span className="text-sm font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link 
                href={`/contact?subject=Inquiry: ${encodeURIComponent(service.title)}`}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-bg rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl"
              >
                <span>Start Project Inquiry</span>
                <ArrowLeft className="rotate-180" size={16} />
              </Link>
              <p className="text-center text-[10px] text-white/20 mt-6 uppercase tracking-widest font-bold">Typically responds within 24 hours</p>
            </div>
          </div>

          <div className="p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01]">
            <p className="text-sm text-text-dim italic leading-relaxed">
              "Working with Ali on our API infrastructure was the best decision we made last year. Highly technical and strategic."
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-10 h-10 bg-white/5 rounded-full" />
              <div>
                <p className="text-xs font-bold">Tech Member</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Verified Partner</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
