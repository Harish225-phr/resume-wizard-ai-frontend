import { FormData } from '@/types/resume';
import { LaTeXTemplate, LaTeXGenerationOptions, LaTeXCompilationResult } from '@/types/latex';

// Import LaTeX templates
import moderncvTemplate from '@/templates/latex/moderncv.tex?raw';
import awesomecvTemplate from '@/templates/latex/awesome-cv.tex?raw';
import altacvTemplate from '@/templates/latex/altacv.tex?raw';

export class LaTeXService {
  private templates: LaTeXTemplate[] = [
    {
      id: 'moderncv',
      name: 'Modern CV',
      description: 'Clean, professional template optimized for ATS compatibility',
      category: 'modern',
      previewImage: '/images/moderncv-preview.png',
      templateContent: moderncvTemplate,
      requiredPackages: ['moderncv', 'inputenc', 'geometry'],
      placeholders: {
        'FIRST_NAME': 'First Name',
        'LAST_NAME': 'Last Name',
        'TITLE': 'Professional Title',
        'EMAIL': 'Email Address',
        'PHONE': 'Phone Number',
        'ADDRESS': 'Address',
        'WEBSITE': 'Website',
        'LINKEDIN': 'LinkedIn Profile',
        'GITHUB': 'GitHub Profile',
        'CAREER_OBJECTIVE': 'Career Objective',
        'EDUCATION_SECTION': 'Education Details',
        'WORK_EXPERIENCE_SECTION': 'Work Experience',
        'TECHNICAL_SKILLS': 'Technical Skills',
        'LANGUAGES': 'Languages',
        'CERTIFICATIONS': 'Certifications',
        'PROJECTS_SECTION': 'Projects',
        'HOBBIES': 'Hobbies',
        'CUSTOM_SECTIONS': 'Custom Sections'
      }
    },
    {
      id: 'awesome-cv',
      name: 'Awesome CV',
      description: 'Modern and elegant design with excellent readability',
      category: 'modern',
      previewImage: '/images/awesome-cv-preview.png',
      templateContent: awesomecvTemplate,
      requiredPackages: ['awesome-cv'],
      placeholders: {
        'FIRST_NAME': 'First Name',
        'LAST_NAME': 'Last Name',
        'POSITION': 'Current Position',
        'TITLE': 'Professional Title',
        'ADDRESS': 'Address',
        'PHONE': 'Phone Number',
        'EMAIL': 'Email Address',
        'WEBSITE': 'Website',
        'GITHUB': 'GitHub Profile',
        'LINKEDIN': 'LinkedIn Profile',
        'CAREER_OBJECTIVE': 'Career Objective'
      }
    },
    {
      id: 'altacv',
      name: 'AltaCV',
      description: 'Two-column layout perfect for highlighting key information',
      category: 'creative',
      previewImage: '/images/altacv-preview.png',
      templateContent: altacvTemplate,
      requiredPackages: ['altacv', 'paracol', 'roboto', 'lato'],
      placeholders: {
        'FIRST_NAME': 'First Name',
        'LAST_NAME': 'Last Name',
        'TITLE': 'Professional Title',
        'EMAIL': 'Email Address',
        'PHONE': 'Phone Number',
        'ADDRESS': 'Address',
        'LOCATION': 'Location',
        'WEBSITE': 'Website',
        'LINKEDIN': 'LinkedIn Profile',
        'GITHUB': 'GitHub Profile',
        'CAREER_OBJECTIVE': 'Career Objective',
        'WORK_EXPERIENCE_SECTION': 'Work Experience',
        'PROJECTS_SECTION': 'Projects',
        'EDUCATION_SECTION': 'Education',
        'SKILLS_TAG_1': 'Skill 1',
        'SKILLS_TAG_2': 'Skill 2',
        'SKILLS_TAG_3': 'Skill 3',
        'SKILLS_TAG_4': 'Skill 4',
        'SKILLS_TAG_5': 'Skill 5',
        'LANGUAGES': 'Languages',
        'CERTIFICATIONS': 'Certifications',
        'HOBBIES': 'Hobbies',
        'CUSTOM_SECTIONS': 'Custom Sections'
      }
    }
  ];

  getTemplates(): LaTeXTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): LaTeXTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  // Convert FormData to LaTeX content by replacing placeholders
  private generateLaTeXContent(template: LaTeXTemplate, formData: FormData): string {
    let content = template.templateContent;

    // Basic personal information
    const nameParts = formData.fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    content = content.replace(/<<FIRST_NAME>>/g, this.escapeLatex(firstName));
    content = content.replace(/<<LAST_NAME>>/g, this.escapeLatex(lastName));
    content = content.replace(/<<EMAIL>>/g, this.escapeLatex(formData.email));
    content = content.replace(/<<PHONE>>/g, this.escapeLatex(formData.phone));
    content = content.replace(/<<ADDRESS>>/g, this.escapeLatex(formData.address));
    content = content.replace(/<<CAREER_OBJECTIVE>>/g, this.escapeLatex(formData.careerObjective));

    // Education section
    const educationLatex = this.generateEducationSection(formData.education);
    content = content.replace(/<<EDUCATION_SECTION>>/g, educationLatex);

    // Work experience section
    const workExperienceLatex = this.generateWorkExperienceSection(formData.workExperience);
    content = content.replace(/<<WORK_EXPERIENCE_SECTION>>/g, workExperienceLatex);

    // Skills
    const skills = formData.skills.split(',').map(skill => skill.trim());
    content = content.replace(/<<TECHNICAL_SKILLS>>/g, this.escapeLatex(formData.skills));
    
    // For AltaCV tags
    skills.slice(0, 5).forEach((skill, index) => {
      content = content.replace(new RegExp(`<<SKILLS_TAG_${index + 1}>>`, 'g'), this.escapeLatex(skill));
    });

    // Other sections
    content = content.replace(/<<LANGUAGES>>/g, this.escapeLatex(formData.languages));
    content = content.replace(/<<CERTIFICATIONS>>/g, this.escapeLatex(formData.certifications));
    content = content.replace(/<<HOBBIES>>/g, this.escapeLatex(formData.hobbies));

    // Projects section
    const projectsLatex = this.generateProjectsSection(formData.projects);
    content = content.replace(/<<PROJECTS_SECTION>>/g, projectsLatex);

    // Custom sections
    const customSectionsLatex = this.generateCustomSections(formData.customSections);
    content = content.replace(/<<CUSTOM_SECTIONS>>/g, customSectionsLatex);

    // Clean up any remaining placeholders
    content = content.replace(/<<[^>]+>>/g, '');

    return content;
  }

  private generateEducationSection(education: any[]): string {
    return education.map(edu => {
      return `\\cventry{${this.escapeLatex(edu.duration)}}{${this.escapeLatex(edu.degree)}}{${this.escapeLatex(edu.university)}}{}{${this.escapeLatex(edu.grade)}}{}`;
    }).join('\n');
  }

  private generateWorkExperienceSection(workExperience: any[]): string {
    return workExperience.map(work => {
      return `\\cventry{${this.escapeLatex(work.duration)}}{${this.escapeLatex(work.position)}}{${this.escapeLatex(work.company)}}{}{}{
${this.escapeLatex(work.description)}
}`;
    }).join('\n');
  }

  private generateProjectsSection(projects: any[]): string {
    return projects.map(project => {
      return `\\cventry{}{${this.escapeLatex(project.title)}}{}{}{${this.escapeLatex(project.link)}}{
${this.escapeLatex(project.description)}
}`;
    }).join('\n');
  }

  private generateCustomSections(customSections: any[]): string {
    return customSections.map(section => {
      return `\\section{${this.escapeLatex(section.heading)}}
${this.escapeLatex(section.content)}
`;
    }).join('\n');
  }

  // Escape special LaTeX characters
  private escapeLatex(text: string): string {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\$/g, '\\$')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/#/g, '\\#')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/_/g, '\\_')
      .replace(/~/g, '\\textasciitilde{}');
  }

  // Generate PDF using a LaTeX compilation service
  async generatePDF(
    templateId: string,
    formData: FormData,
    options: LaTeXGenerationOptions = { templateId, outputFormat: 'pdf', compiler: 'pdflatex' }
  ): Promise<LaTeXCompilationResult> {
    try {
      const template = this.getTemplate(templateId);
      if (!template) {
        throw new Error(`Template ${templateId} not found`);
      }

      const latexContent = this.generateLaTeXContent(template, formData);
      
      // Here we would call the LaTeX compilation service
      // For now, we'll simulate the API call
      const result = await this.compileLaTeX(latexContent, options);
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // LaTeX compilation service - this would integrate with external service
  private async compileLaTeX(
    latexContent: string,
    options: LaTeXGenerationOptions
  ): Promise<LaTeXCompilationResult> {
    // TODO: Implement actual LaTeX compilation
    // Options:
    // 1. Overleaf API
    // 2. LaTeX.Online API
    // 3. Custom Supabase Edge Function with Docker
    // 4. Local pdflatex installation

    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          pdfUrl: 'https://example.com/generated-resume.pdf',
          logs: 'LaTeX compilation successful'
        });
      }, 2000);
    });
  }
}

export const latexService = new LaTeXService();
