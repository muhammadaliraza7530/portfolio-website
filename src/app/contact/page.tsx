"use client";

import { motion } from "motion/react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams?.get("subject") || "";
  
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: initialSubject, 
    message: "" 
  });

  useEffect(() => {
    const subject = searchParams?.get("subject");
    if (subject) {
      setFormData(prev => ({ ...prev, subject }));
    }
  }, [searchParams]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email address";
    if (!formData.subject.trim()) return "Subject is required";
    if (formData.message.length < 10) return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus("error");
      setResponseMsg(error);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setResponseMsg(data.message);
      } else {
        setStatus("error");
        setResponseMsg(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResponseMsg("Failed to send message.");
    }
  };

  return (
    <div className="p-10 md:p-14 rounded-[3rem] bg-card border border-border relative">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-bg border-b border-border py-4 focus:outline-none focus:border-accent transition-all text-sm font-medium"
              placeholder="Full Name"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Email</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-bg border-b border-border py-4 focus:outline-none focus:border-accent transition-all text-sm font-medium"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Subject</label>
          <input
            required
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-bg border-b border-border py-4 focus:outline-none focus:border-accent transition-all text-sm font-medium"
            placeholder="Inquiry Subject"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Proposal</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-bg border-b border-border py-4 focus:outline-none focus:border-accent transition-all text-sm font-medium resize-none leading-relaxed"
            placeholder="Details of your request..."
          />
        </div>
        <button
          disabled={status === "loading"}
          type="submit"
          className="w-full bg-white text-bg py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-white/90 shadow-xl shadow-white/5 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Processing...</span>
            </>
          ) : (
            "Send Request"
          )}
        </button>
        
        {status === "success" && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-center text-xs font-bold uppercase tracking-widest bg-accent/10 py-4 rounded-xl border border-accent/20"
          >
            {responseMsg}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-center text-xs font-bold uppercase tracking-widest bg-red-500/10 py-4 rounded-xl border border-red-500/20"
          >
            {responseMsg}
          </motion.p>
        )}
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">New Partnerships</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-tight">Drop me a <span className="text-accent">line</span>.</h1>
          <p className="text-text-dim text-lg leading-relaxed italic accent-accent">
            Currently accepting new strategic projects and engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-16">
             <div className="flex items-start space-x-8">
               <div className="p-5 rounded-[20px] bg-white/[0.03] border border-border text-accent">
                 <Mail size={22} />
               </div>
               <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">Communications</h3>
                  <p className="text-lg font-medium">muhammadaliraza7530@gmail.com</p>
               </div>
             </div>
             <div className="flex items-start space-x-8">
               <div className="p-5 rounded-[20px] bg-white/[0.03] border border-border text-accent">
                 <Phone size={22} />
               </div>
               <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">Voice</h3>
                  <p className="text-lg font-medium">+92 300 0000000</p>
               </div>
             </div>
             <div className="flex items-start space-x-8">
               <div className="p-5 rounded-[20px] bg-white/[0.03] border border-border text-accent">
                 <MapPin size={22} />
               </div>
               <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">Base</h3>
                  <p className="text-lg font-medium">Lahore, Pakistan</p>
               </div>
             </div>
          </div>

          {/* Contact Form Container with Suspension for useSearchParams */}
          <Suspense fallback={<div className="p-10 bg-card border border-border rounded-[3rem] animate-pulse h-[500px]" />}>
            <ContactForm />
          </Suspense>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 border-t border-border pt-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-12 block text-center">Frequently Asked Questions</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {[
              { q: "What is your typical turnaround time?", a: "For MVP projects, typically 4-6 weeks. Larger enterprise solutions depend on scope but are built in agile 2-week sprints." },
              { q: "Do you offer post-launch support?", a: "Yes, I provide monthly maintenance packages including security updates, performance monitoring, and feature iterations." },
              { q: "Can you work with existing tech stacks?", a: "Absolutely. While I specialize in React/Node.js, I have deep experience integrating with legacy systems and third-party APIs." },
              { q: "How do we get started?", a: "Once you send an inquiry, I'll reach out within 24 hours to schedule a discovery call to discuss your objectives." }
            ].map((faq, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-lg font-bold text-white italic">{faq.q}</h4>
                <p className="text-sm text-text-dim leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
