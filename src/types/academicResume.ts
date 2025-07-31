// Types for the new academic resume builder interface

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  address?: string;
}

export interface Education {
  id: string;
  degree: string;
  institute: string;
  cgpa: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  duration?: string;
  description: string[];
  githubLink?: string;
  technologies?: string[];
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
  databases?: string[];
  concepts?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
}

export interface CodingProfile {
  id: string;
  platform: string;
  username: string;
  url: string;
}

export interface AcademicResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  achievements: Achievement[];
  codingProfiles: CodingProfile[];
  languages?: string;
  certifications?: string[];
  interests?: string;
}

export interface ResumeFormState {
  data: AcademicResumeData;
  currentStep: number;
  selectedTemplate: string;
}
