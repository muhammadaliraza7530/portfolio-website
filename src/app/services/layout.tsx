import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Ali Raza",
  description: "Professional software engineering services including AI integration, cloud architecture, and full-stack development.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="pt-24">{children}</section>;
}