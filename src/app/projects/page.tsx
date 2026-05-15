import { getContent } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const content = await getContent();
  const projects = content.projects || [];

  return <ProjectsClient initialProjects={projects} />;
}
