
export interface Template {
  id: string;
  name: string;
  type: 'free' | 'premium';
  price?: number;
  preview: string;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  experience: string;
  careerObjective: string;
  template: string;
}

export interface PaymentState {
  hasPremiumAccess: boolean;
  hasAIObjectiveAccess: boolean;
  selectedTemplate: Template | null;
}
