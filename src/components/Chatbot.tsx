"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMessage: Message = { role: "user", parts: [{ text: currentInput }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      const modelMessage: Message = { role: "model", parts: [{ text: data.text || "I couldn't generate a response." }] };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { role: "model", parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again later." }] };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/20 text-white"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-[60] w-[90vw] md:w-[380px] h-[580px] max-h-[80vh] bg-card border border-border rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-white/[0.02] border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-white">AliBot Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-text-dim font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-text-dim hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <Sparkles size={32} className="text-accent/20" />
                  <p className="text-[11px] text-text-dim uppercase tracking-widest leading-relaxed font-semibold">
                    Ask me about Ali's experience, <br /> tech stack, or projects.
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-accent text-white rounded-tr-none" 
                      : "bg-white/5 text-white/90 rounded-tl-none border border-border"
                  }`}>
                    <div className="flex items-center space-x-2 mb-2 opacity-40">
                      {msg.role === "user" ? <User size={10} /> : <Bot size={10} />}
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em]">
                        {msg.role === "user" ? "You" : "AliBot"}
                      </span>
                    </div>
                    <div className="markdown-body prose prose-sm prose-invert max-w-none text-inherit">
                      <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-border shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/[0.02] border-t border-border">
              <form 
                onSubmit={handleSend}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-bg border border-border rounded-xl pl-5 pr-14 py-4 text-xs focus:outline-none focus:border-accent transition-all placeholder:text-text-dim/50"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
