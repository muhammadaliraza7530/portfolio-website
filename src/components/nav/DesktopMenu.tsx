"use client";

import Link from "next/link";
import NavLink from "./NavLink";

interface DesktopMenuProps {
  links: { name: string; path: string }[];
  pathname: string;
}

export default function DesktopMenu({ links, pathname }: DesktopMenuProps) {
  return (
    <div className="hidden md:block">
      <div className="flex items-center space-x-10">
        {links.map((link) => (
          <NavLink
            key={link.name}
            href={link.path}
            isActive={pathname === link.path}
          >
            {link.name}
          </NavLink>
        ))}
        <Link
          href="/contact"
          className="px-5 py-2 bg-white text-bg text-[12px] uppercase tracking-widest font-bold rounded-full hover:bg-accent hover:text-white transition-colors"
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
}
