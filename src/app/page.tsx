import { getContent } from "@/lib/data";
import HomeClient from "./HomeClient";

export default async function Home() {
  const content = await getContent();
  const projects = content.projects || [];
  const testimonials = content.testimonials || [
    { id: 1, name: "Sarah Johnson", role: "CEO @ NexaCorp", text: "Ali delivered a complex AI-driven dashboard that exceeded our performance expectations. A true professional." },
    { id: 2, name: "Marcus Chen", role: "CTO @ Bloom", text: "The architectural patterns applied by Ali are top-tier. Clean code, scalable structure, and perfect UI execution." },
    { id: 3, name: "Elena Rodriguez", role: "Founder @ Terra", text: "Working with Ali was seamless. He understood our technical requirements instantly and translated them into a robust system." }
  ];

  return <HomeClient initialProjects={projects} initialTestimonials={testimonials} />;
}
