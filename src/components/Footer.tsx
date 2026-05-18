import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white mb-6 block">
              ALI RAZA
            </Link>
            <p className="text-text-dim max-w-sm text-sm leading-relaxed">
            As a dedicated Full Stack Developer, I craft end-to-end web architectures that balance powerful backend logic with sleek, responsive frontends. My technical toolkit includes React, Next.js, Tailwind CSS, Node.js, and both SQL/NoSQL databases. I am particularly skilled in creating intelligent web applications by integrating advanced AI models (like Gemini API) and implementing dynamic, interactive components. I thrive on solving complex problems and transforming innovative ideas into production-ready software.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-8">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-xs text-text-dim hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/about" className="text-xs text-text-dim hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-xs text-text-dim hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-xs text-text-dim hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 mb-8">Social</h3>
            <div className="flex space-x-6">
              <a href="https://github.com/muhammadaliraza7530" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-accent transition-colors"><Github size={18} /></a>
              <a href="#" className="text-text-dim hover:text-accent transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-text-dim hover:text-accent transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} Ali Raza. All rights reserved.
          </p>
          <p className="text-xs text-white/30 uppercase tracking-widest">
            Designed for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}

