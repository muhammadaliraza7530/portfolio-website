"use client";

import { motion, AnimatePresence } from "motion/react";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  links: { name: string; path: string }[];
  pathname: string;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, links, pathname, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                href={link.path}
                isActive={pathname === link.path}
                onClick={onClose}
                className={cn(
                  "block px-3 py-2 rounded-md text-base transition-all",
                  pathname === link.path ? "text-orange-500 bg-white/5" : "text-white/70 hover:text-orange-500 hover:bg-white/5"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
