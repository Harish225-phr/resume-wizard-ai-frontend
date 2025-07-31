import { FormData } from '@/types/resume';
import { LaTeXTemplate, LaTeXGenerationOptions, LaTeXCompilationResult } from '@/types/latex';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Import LaTeX templates
import classicproTemplate from '@/templates/latex/classicpro.tex?raw';
import techmodernTemplate from '@/templates/latex/techmodern.tex?raw';
import academicTemplate from '@/templates/latex/academic.tex?raw';

export class LaTeXService {
  private templates: LaTeXTemplate[] = [
    {
      id: 'classicpro',
      name: 'Classic Professional',
      description: 'Sophisticated executive template perfect for senior-level positions',
      category: 'classic',
      previewImage: '/images/classicpro-preview.png',
      templateContent: classicproTemplate,
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
      id: 'techmodern',
      name: 'Tech Modern',
      description: 'Cutting-edge template designed specifically for technology professionals',
      category: 'modern',
      previewImage: '/images/techmodern-preview.png',
      templateContent: techmodernTemplate,
      requiredPackages: ['moderncv', 'inputenc', 'geometry', 'fontawesome', 'xcolor'],
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
      id: 'academic',
      name: 'Academic Clean',
      description: 'Clean academic-style template with structured tables and professional formatting',
      category: 'academic',
      previewImage: '/images/academic-preview.png',
      templateContent: academicTemplate,
      requiredPackages: ['article', 'geometry', 'enumitem', 'hyperref', 'helvet', 'titlesec', 'array'],
      placeholders: {
        'FULL_NAME': 'Full Name',
        'DEGREE': 'Degree',
        'UNIVERSITY': 'University',
        'EMAIL': 'Email Address',
        'PHONE': 'Phone Number',
        'LINKEDIN_URL': 'LinkedIn URL',
        'LINKEDIN_HANDLE': 'LinkedIn Handle',
        'GITHUB_URL': 'GitHub URL',
        'GITHUB_HANDLE': 'GitHub Handle',
        'EDUCATION_SECTION': 'Education Details',
        'WORK_EXPERIENCE_SECTION': 'Work Experience',
        'PROJECTS_SECTION': 'Projects',
        'SKILLS_SECTION': 'Skills',
        'ACHIEVEMENTS': 'Achievements',
        'CODING_PROFILES': 'Coding Profiles',
        'LANGUAGES': 'Languages',
        'CERTIFICATIONS': 'Certifications',
        'HOBBIES': 'Interests'
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

    // Check if this is an academic template (uses Mustache-style syntax)
    if (template.id === 'academic') {
      return this.generateAcademicLaTeX(content, formData);
    }

    // Basic personal information (old format)
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

  // Generate LaTeX content for academic template
  private generateAcademicLaTeX(content: string, formData: FormData): string {
    // Basic information
    const education = formData.education[0]; // Primary education
    content = content.replace(/\{\{fullName\}\}/g, this.escapeLatex(formData.fullName));
    content = content.replace(/\{\{email\}\}/g, this.escapeLatex(formData.email));
    content = content.replace(/\{\{phone\}\}/g, this.escapeLatex(formData.phone));
    content = content.replace(/\{\{degree\}\}/g, education ? this.escapeLatex(education.degree) : 'B.E. Computer Science');
    content = content.replace(/\{\{university\}\}/g, education ? this.escapeLatex(education.university) : 'University');

    // Social links
    const linkedinHandle = 'linkedin.com/in/profile';
    const githubHandle = 'github.com/profile';
    const linkedinUrl = `https://${linkedinHandle}`;
    const githubUrl = `https://${githubHandle}`;
    
    content = content.replace(/\{\{#linkedinUrl\}\}(.*?)\{\{\/linkedinUrl\}\}/gs, `$1`);
    content = content.replace(/\{\{linkedinUrl\}\}/g, linkedinUrl);
    content = content.replace(/\{\{linkedinHandle\}\}/g, linkedinHandle);
    
    content = content.replace(/\{\{#githubUrl\}\}(.*?)\{\{\/githubUrl\}\}/gs, `$1`);
    content = content.replace(/\{\{githubUrl\}\}/g, githubUrl);
    content = content.replace(/\{\{githubHandle\}\}/g, githubHandle);

    // Education section
    let educationRows = '';
    formData.education.forEach(edu => {
      educationRows += `\\textbf{${this.escapeLatex(edu.degree)}} & \\textbf{${this.escapeLatex(edu.university)}} & \\textbf{${this.escapeLatex(edu.grade || 'N/A')}} & \\textbf{${this.escapeLatex(edu.duration)}} \\\\\n\\hline\n`;
    });
    content = content.replace(/\{\{#education\}\}(.*?)\{\{\/education\}\}/gs, educationRows);

    // Work experience section
    const hasWorkExperience = formData.workExperience && formData.workExperience.length > 0;
    if (hasWorkExperience) {
      content = content.replace(/\{\{#hasWorkExperience\}\}(.*?)\{\{\/hasWorkExperience\}\}/gs, '$1');
      let workExperienceContent = '';
      formData.workExperience.forEach(work => {
        const descriptionPoints = work.description.split('.').filter(p => p.trim()).map(p => p.trim());
        workExperienceContent += `    \\item \\textbf{${this.escapeLatex(work.company)}} \\hfill \\textit{${this.escapeLatex(work.duration)}}\n`;
        workExperienceContent += `    \\begin{subitemize}\n`;
        workExperienceContent += `        \\item \\textit{${this.escapeLatex(work.position)}}\n`;
        descriptionPoints.forEach(point => {
          if (point) workExperienceContent += `        \\item ${this.escapeLatex(point)}\n`;
        });
        workExperienceContent += `    \\end{subitemize}\n`;
      });
      content = content.replace(/\{\{#workExperience\}\}(.*?)\{\{\/workExperience\}\}/gs, workExperienceContent);
    } else {
      content = content.replace(/\{\{#hasWorkExperience\}\}(.*?)\{\{\/hasWorkExperience\}\}/gs, '');
    }

    // Projects section
    const hasProjects = formData.projects && formData.projects.length > 0;
    if (hasProjects) {
      content = content.replace(/\{\{#hasProjects\}\}(.*?)\{\{\/hasProjects\}\}/gs, '$1');
      let projectsContent = '';
      formData.projects.forEach(project => {
        const descriptionPoints = project.description.split('.').filter(p => p.trim()).map(p => p.trim());
        projectsContent += `    \\item \\textbf{${this.escapeLatex(project.title)}} \\hfill \\textit{Duration}\n`;
        projectsContent += `    \\begin{subitemize}\n`;
        descriptionPoints.forEach(point => {
          if (point) projectsContent += `        \\item ${this.escapeLatex(point)}\n`;
        });
        if (project.link) {
          projectsContent += `        \\item \\href{${project.link}}{\\textbf{GitHub}: ${project.link}}\n`;
        }
        projectsContent += `    \\end{subitemize}\n`;
      });
      content = content.replace(/\{\{#projects\}\}(.*?)\{\{\/projects\}\}/gs, projectsContent);
    } else {
      content = content.replace(/\{\{#hasProjects\}\}(.*?)\{\{\/hasProjects\}\}/gs, '');
    }

    // Skills section
    const hasSkills = formData.skills && formData.skills.trim();
    if (hasSkills) {
      content = content.replace(/\{\{#hasSkills\}\}(.*?)\{\{\/hasSkills\}\}/gs, '$1');
      const skillCategories = [
        { category: 'Languages', skills: 'JavaScript, Python, Java, C++' },
        { category: 'Frontend', skills: 'React, Vue.js, Angular, HTML/CSS' },
        { category: 'Backend', skills: 'Node.js, Express, Django, Spring Boot' },
        { category: 'Tools', skills: 'Git, Docker, AWS, VS Code' }
      ];
      let skillsContent = '';
      skillCategories.forEach(cat => {
        skillsContent += `    \\item \\textbf{${cat.category}:} ${cat.skills}\n`;
      });
      content = content.replace(/\{\{#skillCategories\}\}(.*?)\{\{\/skillCategories\}\}/gs, skillsContent);
    } else {
      content = content.replace(/\{\{#hasSkills\}\}(.*?)\{\{\/hasSkills\}\}/gs, '');
    }

    // Achievements section
    content = content.replace(/\{\{#hasAchievements\}\}(.*?)\{\{\/hasAchievements\}\}/gs, '$1');
    const achievements = [
      'Awarded scholarship for academic excellence',
      'Solved 500+ coding problems across platforms',
      'Led team of 5 developers in hackathon project',
      'Published research paper in conference'
    ];
    let achievementsContent = '';
    achievements.forEach(achievement => {
      achievementsContent += `    \\item ${achievement}\n`;
    });
    content = content.replace(/\{\{#achievements\}\}(.*?)\{\{\/achievements\}\}/gs, achievementsContent);

    // Coding profiles section
    content = content.replace(/\{\{#hasCodingProfiles\}\}(.*?)\{\{\/hasCodingProfiles\}\}/gs, '$1');
    const codingProfiles = [
      { platform: 'LeetCode', url: 'https://leetcode.com/profile', handle: 'leetcode.com/profile' },
      { platform: 'GitHub', url: 'https://github.com/profile', handle: 'github.com/profile' },
      { platform: 'CodeChef', url: 'https://codechef.com/users/profile', handle: 'codechef.com/users/profile' }
    ];
    let codingProfilesContent = '';
    codingProfiles.forEach(profile => {
      codingProfilesContent += `    \\item \\href{${profile.url}}{\\textbf{${profile.platform}}: ${profile.handle}}\n`;
    });
    content = content.replace(/\{\{#codingProfiles\}\}(.*?)\{\{\/codingProfiles\}\}/gs, codingProfilesContent);

    // Other sections
    const hasLanguages = formData.languages && formData.languages.trim();
    if (hasLanguages) {
      content = content.replace(/\{\{#hasLanguages\}\}(.*?)\{\{\/hasLanguages\}\}/gs, '$1');
      content = content.replace(/\{\{languages\}\}/g, this.escapeLatex(formData.languages));
    } else {
      content = content.replace(/\{\{#hasLanguages\}\}(.*?)\{\{\/hasLanguages\}\}/gs, '');
    }

    const hasCertifications = formData.certifications && formData.certifications.trim();
    if (hasCertifications) {
      content = content.replace(/\{\{#hasCertifications\}\}(.*?)\{\{\/hasCertifications\}\}/gs, '$1');
      const certificationList = formData.certifications.split(',').map(cert => cert.trim());
      let certificationsContent = '';
      certificationList.forEach(cert => {
        certificationsContent += `    \\item ${this.escapeLatex(cert)}\n`;
      });
      content = content.replace(/\{\{#certificationList\}\}(.*?)\{\{\/certificationList\}\}/gs, certificationsContent);
    } else {
      content = content.replace(/\{\{#hasCertifications\}\}(.*?)\{\{\/hasCertifications\}\}/gs, '');
    }

    const hasHobbies = formData.hobbies && formData.hobbies.trim();
    if (hasHobbies) {
      content = content.replace(/\{\{#hasHobbies\}\}(.*?)\{\{\/hasHobbies\}\}/gs, '$1');
      content = content.replace(/\{\{hobbies\}\}/g, this.escapeLatex(formData.hobbies));
    } else {
      content = content.replace(/\{\{#hasHobbies\}\}(.*?)\{\{\/hasHobbies\}\}/gs, '');
    }

    // Clean up any remaining Mustache syntax
    content = content.replace(/\{\{#[^}]+\}\}.*?\{\{\/[^}]+\}\}/gs, '');
    content = content.replace(/\{\{[^}]+\}\}/g, '');

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

  // LaTeX compilation service - converts LaTeX to HTML then to PDF
  private async compileLaTeX(
    latexContent: string,
    options: LaTeXGenerationOptions
  ): Promise<LaTeXCompilationResult> {
    try {
      // Convert LaTeX content to HTML
      const htmlContent = this.convertLatexToHtml(latexContent);
      
      // Create temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.width = '210mm';
      tempDiv.style.minHeight = '297mm';
      tempDiv.style.padding = '20mm';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.5';
      tempDiv.style.color = '#000';
      tempDiv.style.backgroundColor = '#fff';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      
      document.body.appendChild(tempDiv);
      
      // Wait for fonts to load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempDiv.offsetWidth,
        height: Math.max(tempDiv.offsetHeight, 1056) // A4 height in pixels
      });
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Clean up temporary element
      document.body.removeChild(tempDiv);
      
      // Create blob URL for download
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      return {
        success: true,
        pdfUrl,
        logs: 'LaTeX successfully converted to PDF using browser-based compilation'
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed',
        logs: `LaTeX compilation error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Convert LaTeX commands to HTML
  private convertLatexToHtml(latexContent: string): string {
    let html = latexContent;
    
    // Remove document class and packages
    html = html.replace(/\\documentclass\{[^}]*\}/g, '');
    html = html.replace(/\\usepackage\{[^}]*\}/g, '');
    html = html.replace(/\\begin\{document\}/g, '');
    html = html.replace(/\\end\{document\}/g, '');
    html = html.replace(/\\renewcommand\{[^}]*\}[^}]*\}/g, '');
    html = html.replace(/\\pagestyle\{[^}]*\}/g, '');
    html = html.replace(/\\titleformat\{[^}]*\}[^}]*\{[^}]*\}[^}]*\{[^}]*\}[^}]*\[[^]]*\]/g, '');
    html = html.replace(/\\titlespacing\*?\{[^}]*\}[^}]*\{[^}]*\}[^}]*\{[^}]*\}/g, '');
    
    // Handle academic template specific environments
    html = html.replace(/\\newenvironment\{[^}]*\}[^}]*\{([^}]*)\}[^}]*\{([^}]*)\}/g, '');
    
    // Convert sections with better styling for academic template
    html = html.replace(/\\section\*?\{([^}]+)\}/g, '<h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 20px; margin-bottom: 15px; font-size: 14px; font-weight: bold; text-transform: uppercase; font-family: Arial, sans-serif;">$1</h2>');
    html = html.replace(/\\subsection\{([^}]+)\}/g, '<h3 style="color: #000; margin-top: 15px; margin-bottom: 10px; font-size: 13px; font-weight: bold;">$1</h3>');
    
    // Handle minipages (for header layout)
    html = html.replace(/\\begin\{minipage\}\[[^]]*\]\{[^}]*\}/g, '<div style="display: inline-block; vertical-align: top;">');
    html = html.replace(/\\end\{minipage\}/g, '</div>');
    html = html.replace(/\\noindent/g, '');
    
    // Handle tables (education section)
    html = html.replace(/\\begin\{center\}/g, '<div style="text-align: center; margin: 15px 0;">');
    html = html.replace(/\\end\{center\}/g, '</div>');
    html = html.replace(/\\renewcommand\{\\arraystretch\}\{[^}]*\}/g, '');
    html = html.replace(/\\begin\{tabular\}\{[^}]*\}/g, '<table style="border-collapse: collapse; width: 100%; margin: 10px auto; font-size: 11px;">');
    html = html.replace(/\\end\{tabular\}/g, '</table>');
    html = html.replace(/\\hline/g, '');
    
    // Convert table rows and cells
    html = html.replace(/([^\\])&/g, '$1</td><td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">');
    html = html.replace(/\\\\ *\\hline/g, '</td></tr>');
    html = html.replace(/\\\\/g, '</td></tr>');
    
    // Fix table structure
    html = html.replace(/<table[^>]*>\s*([^<]*)</g, '<table style="border-collapse: collapse; width: 100%; margin: 10px auto; font-size: 11px;"><tr><td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">$1<');
    
    // Handle custom itemize environments
    html = html.replace(/\\begin\{bolditemize\}/g, '<ul style="margin: 10px 0; padding-left: 15px; list-style-type: disc;">');
    html = html.replace(/\\end\{bolditemize\}/g, '</ul>');
    html = html.replace(/\\begin\{subitemize\}/g, '<ul style="margin: 5px 0 5px 20px; padding-left: 15px; list-style-type: none;">');
    html = html.replace(/\\end\{subitemize\}/g, '</ul>');
    
    // Convert CV entries
    html = html.replace(/\\cventry\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g, 
      '<div style="margin-bottom: 15px;"><div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;"><div><strong style="font-size: 14px;">$2</strong><br><em style="color: #666;">$3</em></div><div style="text-align: right; color: #666; font-size: 12px;">$1</div></div><div style="margin-left: 10px; color: #444;">$6</div></div>');
    
    // Convert text formatting
    html = html.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
    html = html.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
    html = html.replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>');
    html = html.replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>');
    
    // Convert font size commands
    html = html.replace(/\\fontsize\{[^}]*\}\{[^}]*\}\\selectfont/g, '');
    html = html.replace(/\\large/g, '');
    html = html.replace(/\\Large/g, '');
    html = html.replace(/\\huge/g, '');
    
    // Convert spacing
    html = html.replace(/\\hfill/g, '');
    html = html.replace(/\\\\\[[^]]*\]/g, '<br>');
    html = html.replace(/\\raggedleft/g, '');
    
    // Convert standard lists
    html = html.replace(/\\begin\{itemize\}/g, '<ul style="margin: 10px 0; padding-left: 20px;">');
    html = html.replace(/\\end\{itemize\}/g, '</ul>');
    html = html.replace(/\\begin\{enumerate\}/g, '<ol style="margin: 10px 0; padding-left: 20px;">');
    html = html.replace(/\\end\{enumerate\}/g, '</ol>');
    html = html.replace(/\\item\s+/g, '<li style="margin-bottom: 5px;">');
    
    // Handle hyperlinks
    html = html.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1" style="color: #000; text-decoration: none;">$2</a>');
    
    // Handle line breaks
    html = html.replace(/\\\\/g, '<br>');
    html = html.replace(/\\newline/g, '<br>');
    
    // Remove remaining LaTeX commands
    html = html.replace(/\\[a-zA-Z]+\*?\{([^}]*)\}/g, '$1');
    html = html.replace(/\\[a-zA-Z]+\*?/g, '');
    
    // Clean up extra whitespace and convert to proper paragraphs
    const lines = html.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const paragraphs = [];
    let currentParagraph = '';
    
    for (const line of lines) {
      if (line.includes('<h2>') || line.includes('<h3>') || line.includes('<div>') || line.includes('<ul>') || line.includes('<ol>') || line.includes('<table>')) {
        if (currentParagraph) {
          paragraphs.push(`<p style="margin-bottom: 10px; text-align: justify;">${currentParagraph}</p>`);
          currentParagraph = '';
        }
        paragraphs.push(line);
      } else {
        currentParagraph += (currentParagraph ? ' ' : '') + line;
      }
    }
    
    if (currentParagraph) {
      paragraphs.push(`<p style="margin-bottom: 10px; text-align: justify;">${currentParagraph}</p>`);
    }
    
    return `
      <div style="max-width: 170mm; margin: 0 auto; font-family: 'Times New Roman', serif; line-height: 1.6;">
        ${paragraphs.join('\n')}
      </div>
    `;
  }
}

export const latexService = new LaTeXService();
