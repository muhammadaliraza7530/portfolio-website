"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({ href, children, isActive, onClick, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-[14px] font-[500] uppercase tracking-[0.10em] transition-colors hover:text-accent",
        isActive ? "text-accent" : "text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
