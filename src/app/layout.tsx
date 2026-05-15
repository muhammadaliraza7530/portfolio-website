import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ali Raza | Portfolio",
  description: "Senior Full Stack Developer Portfolio - Expert in AI and High-Performance Web Architectures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white font-sans antialiased">
        <Navbar />
        <main className="relative z-10 pt-20">
          {children}
        </main>
        <Footer />
        <Chatbot />
        
        {/* Background Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        </div>
      </body>
    </html>
  );
}
