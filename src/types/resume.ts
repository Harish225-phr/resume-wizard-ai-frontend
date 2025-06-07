
export interface Template {
  id: string;
  name: string;
  type: 'free';
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

// Simplified state - no payment tracking needed
export interface AppState {
  // Remove all payment-related state
}
