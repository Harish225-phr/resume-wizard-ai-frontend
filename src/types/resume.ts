
export interface Template {
  id: string;
  name: string;
  type: 'free';
  preview: string;
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  duration: string;
  grade: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  photo: File | null;
  address: string;
  careerObjective: string;
  education: Education[];
  workExperience: WorkExperience[];
  hasNoWorkExperience: boolean;
  skills: string;
  languages: string;
  certifications: string;
  hobbies: string;
  projects: Project[];
  template: string;
}

export interface AppState {
  // No payment-related state needed
}
