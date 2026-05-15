import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ali Raza",
  description: "Explore a collection of technical case studies and high-performance web applications built by Ali Raza.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-24">{children}</div>;
}
