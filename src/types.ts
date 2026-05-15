export interface Profile {
  name: string;
  role: string;
  experience: string;
  bio: string;
  skills: string[];
  softSkills?: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  caseStudy?: string;
  softContributions?: string;
  role?: string;
  duration?: string;
  technologies: string[];
  image: string;
  gallery?: string[];
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface ContentData {
  profile: Profile;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
}
