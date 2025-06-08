export interface Template {
  id: string;
  name: string;
  type: 'free';
  preview: string;
  description: string;
  imageUrl: string;
  style: {
    layout: 'single-column' | 'two-column' | 'sidebar';
    fontFamily: string;
    primaryColor: string;
    accentColor: string;
  };
  placeholders?: {
    position: string;
    company: string;
    skills: string;
  };
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  duration: string;
  grade: string;
  class10Board?: string;
  class10Year?: string;
  class10Percentage?: string;
  class12Stream?: string;
  class12Board?: string;
  class12Year?: string;
  class12Percentage?: string;
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
