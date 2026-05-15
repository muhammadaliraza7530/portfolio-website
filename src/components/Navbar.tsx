"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">
              ALI RAZA
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-white",
                    pathname === link.path ? "text-white" : "text-text-dim"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="px-5 py-2 bg-white text-bg text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white/90 transition-colors"
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest",
                    pathname === link.path ? "text-orange-500 bg-white/5" : "text-white/70 hover:text-orange-500 hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

