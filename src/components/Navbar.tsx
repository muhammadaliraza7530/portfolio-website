"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DesktopMenu from "./nav/DesktopMenu";
import MobileMenu from "./nav/MobileMenu";
import Image from "next/image";
import { cn } from "../lib/utils";
import logo from '../../public/images/logo.png'

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
    <nav className={cn('fixed', 'top-0', 'left-0', 'w-full', 'z-50', 'bg-bg/80', 'backdrop-blur-md', 'border-b', 'border-border')}>
      <div className={cn('max-w-[1290px]', 'mx-auto', 'px-6', 'lg:px-10')}>
        <div className={cn('flex', 'items-center', 'justify-between', 'h-20')}>
          <div className="flex-shrink-0 w-55 relative h-12"> {/* Height aur Relative zaroori hai agar fill use karein */}
            <Image
              src={logo}
              alt="Ali Raza Logo"
              fill // Isse image container ke hisab se khud ko adjust karegi
              className="object-cover" // Image ka ratio kharab nahi hoga
              priority // Logo ko sabse pehle load hona chahiye (LCP optimization)
              sizes="(max-width: 768px) 100vw, 180px"
            />
          </div>

          {/* Desktop Navigation */}
          <DesktopMenu links={navLinks} pathname={pathname} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn('inline-flex', 'items-center', 'justify-center', 'p-2', 'rounded-md', 'text-white', 'hover:text-orange-500', 'transition-colors', 'focus:outline-none')}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className={cn('h-6', 'w-6')} /> : <Menu className={cn('h-6', 'w-6')} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileMenu
        isOpen={isOpen}
        links={navLinks}
        pathname={pathname}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
}