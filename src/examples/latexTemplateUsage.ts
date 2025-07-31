// Example: How to use the new LaTeX templates

import { latexService } from '@/services/latexService';
import { useLaTeXDownload } from '@/hooks/useLaTeXDownload';
import { AcademicResumeData } from '@/types/academicResume';

// Sample form data for testing (corrected format)
const sampleFormData: AcademicResumeData = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    githubUrl: "https://github.com/johnsmith",
    address: "123 Tech Street, San Francisco, CA 94105"
  },
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institute: "Stanford University",
      year: "2018-2022",
      cgpa: "3.8/4.0"
    }
  ],
  experience: [
    {
      id: "work1",
      position: "Senior Software Engineer",
      company: "Google",
      duration: "2022-Present",
      description: ["Led development of high-traffic web applications serving 10M+ users", "Implemented microservices architecture reducing system latency by 40%"]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      githubLink: "https://github.com/johnsmith/ecommerce",
      description: ["Built scalable e-commerce platform handling 1000+ concurrent users with React and Node.js"],
      technologies: ["React", "Node.js", "MongoDB", "AWS"]
    }
  ],
  skills: {
    languages: ["JavaScript", "Python", "TypeScript"],
    frontend: ["React", "Vue.js", "HTML5", "CSS3"],
    backend: ["Node.js", "Express", "Django"],
    tools: ["Git", "Docker", "AWS", "Kubernetes"]
  },
  achievements: [],
  codingProfiles: [],
  languages: "English (Native), Spanish (Conversational)",
  certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional"],
  interests: "Rock climbing, Photography, Open source contributions"
};

// Usage Examples:

// 1. Classic Professional Template (New)
// 1. Classic Professional Template
export const useClassicProTemplate = () => {
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();
  
  const downloadClassicPro = async () => {
    // Note: This example shows the intended usage but requires FormData format
    console.log('Classic Pro template download - requires FormData conversion');
    console.log('Sample data:', sampleFormData);
  };
  
  return { downloadClassicPro, isGenerating };
};

// 2. Tech Modern Template (New)
export const useTechModernTemplate = () => {
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();
  
  const downloadTechModern = async () => {
    // Note: This example shows the intended usage but requires FormData format
    console.log('Tech Modern template download - requires FormData conversion');
    console.log('Sample data:', sampleFormData);
  };
  
  return { downloadTechModern, isGenerating };
};

// 3. Get all available templates
export const getAllTemplates = () => {
  const templates = latexService.templates;
  console.log('Available LaTeX Templates:');
  templates.forEach((template, index) => {
    console.log(`${index + 1}. ${template.name} (${template.id})`);
  });
  return templates;
};

// 4. Direct service usage
export const generatePDFDirectly = async (templateId: string) => {
  try {
    const blob = await latexService.generatePDF(sampleFormData, templateId);
    
    // Create URL for the blob and open it
    const url = URL.createObjectURL(blob);
    window.open(url);
    console.log('PDF generated successfully!');
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return blob;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

// Template Information
export const getTemplateInfo = () => {
  return {
    totalTemplates: latexService.templates.length,
    newTemplates: [
      {
        id: 'classicpro',
        name: 'Classic Professional',
        description: 'Sophisticated executive template perfect for senior-level positions',
        category: 'classic',
        features: [
          'Professional typography',
          'Executive-focused layout',
          'ATS-optimized formatting',
          'Clean and readable design'
        ]
      },
      {
        id: 'techmodern',
        name: 'Tech Modern',
        description: 'Cutting-edge template designed specifically for technology professionals',
        category: 'modern',
        features: [
          'Tech-focused sections',
          'Modern blue color scheme',
          'FontAwesome icons',
          'Prominent technical skills section',
          'GitHub and LinkedIn integration'
        ]
      },
      {
        id: 'academic',
        name: 'Academic Clean',
        description: 'Clean academic-style template with structured tables and professional formatting',
        category: 'academic',
        features: [
          'Structured education table',
          'Professional typography',
          'Academic-focused sections',
          'Clean black and white design',
          'Achievement and coding profiles sections'
        ]
      }
    ]
  };
};

// 3. Academic Template (New)
export const useAcademicTemplate = () => {
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();
  
  const downloadAcademic = async () => {
    // Note: This example shows the intended usage but requires FormData format
    console.log('Academic template download - requires FormData conversion');
    console.log('Sample data:', sampleFormData);
  };
  
  return { downloadAcademic, isGenerating };
};
