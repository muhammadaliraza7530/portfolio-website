import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ali Raza",
  description: "Get in touch with Ali Raza for project inquiries, collaborations, or engineering consultation.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-24">{children}</div>;
}
