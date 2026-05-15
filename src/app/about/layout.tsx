import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Ali Raza",
  description: "Learn more about Ali Raza's professional journey, skills, and expertise in full-stack engineering.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="pt-24">{children}</section>;
}
