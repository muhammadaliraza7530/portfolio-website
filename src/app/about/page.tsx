import { getContent } from "@/lib/data";
import AboutClient from "./AboutClient";

export default async function About() {
  const content = await getContent();
  const profile = content.profile || { skills: [], softSkills: [] };

  return <AboutClient initialProfile={profile} />;
}
