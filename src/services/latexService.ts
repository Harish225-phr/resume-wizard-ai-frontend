import { AcademicResumeData } from '../types/academicResume';

// LaTeX template based on your professional format
const generateAcademicLatex = (data: AcademicResumeData): string => {
  const personalInfo = data.personalInfo;
  const education = data.education || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills;
  const achievements = data.achievements || [];
  const codingProfiles = data.codingProfiles || [];

  return `\\documentclass[a4paper,11pt]{article}
\\usepackage[top=0.2in, bottom=0.2in, left=0.2in, right=0.2in]{geometry}
\\usepackage{enumitem}
\\usepackage[colorlinks=true, urlcolor=black, linkcolor=black]{hyperref}
\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}
\\usepackage{titlesec}
\\usepackage{array}
\\pagestyle{empty}

% Enhanced section formatting
\\titleformat{\\section}{\\bfseries\\sffamily\\normalsize\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{1.8ex plus 1ex minus .2ex}{1.2ex plus .2ex}

% Custom itemize environments
\\newenvironment{bolditemize}
  {\\begin{itemize}[noitemsep, itemsep=0.4em, leftmargin=*]
   \\renewcommand{\\labelitemi}{\\normalfont\\bfseries\\textbullet}
   \\setlength{\\labelsep}{0.5em}}
  {\\end{itemize}}

\\newenvironment{subitemize}
  {\\begin{itemize}[noitemsep, itemsep=0.3em, leftmargin=1.5em]
   \\renewcommand{\\labelitemi}{\\normalfont--}
   \\setlength{\\labelsep}{0.5em}}
  {\\end{itemize}}

\\begin{document}

% Header
\\noindent
\\begin{minipage}[t]{0.64\\textwidth}
    {\\fontsize{22}{24}\\selectfont\\bfseries ${personalInfo.fullName}} \\\\[0.5ex]
    ${personalInfo.address ? `{\\bfseries ${personalInfo.address}} \\\\` : ''}
\\end{minipage}%
\\begin{minipage}[t]{0.34\\textwidth}\\raggedleft
    ${personalInfo.phone ? `\\textbf{${personalInfo.phone}} \\\\` : ''}
    ${personalInfo.email ? `\\href{mailto:${personalInfo.email}}{${personalInfo.email}} \\\\` : ''}
    ${personalInfo.linkedinUrl ? `\\href{${personalInfo.linkedinUrl}}{${personalInfo.linkedinUrl}} \\\\` : ''}
    ${personalInfo.githubUrl ? `\\href{${personalInfo.githubUrl}}{${personalInfo.githubUrl}}` : ''}
\\end{minipage}

${education.length > 0 ? `
\\section*{EDUCATION}
\\begin{center}
\\renewcommand{\\arraystretch}{1.2}
\\begin{tabular}{|>{\\centering\\arraybackslash}p{4.6cm}|>{\\centering\\arraybackslash}p{6.6cm}|>{\\centering\\arraybackslash}p{3.4cm}|>{\\centering\\arraybackslash}p{3.4cm}|}
\\hline
\\textbf{Degree} & \\textbf{Institute/Board} & \\textbf{CGPA/\\%} & \\textbf{Year} \\\\
\\hline
${education.map(edu => `\\textbf{${edu.degree}} & \\textbf{${edu.institute}} & \\textbf{${edu.cgpa}} & \\textbf{${edu.year}} \\\\
\\hline`).join('\n')}
\\end{tabular}
\\end{center}
` : ''}

${experience.length > 0 ? `
\\section*{EXPERIENCE}
\\begin{bolditemize}
${experience.map(exp => `    \\item \\textbf{${exp.company}} \\hfill \\textit{${exp.duration}}
    \\begin{subitemize}
        \\item \\textit{${exp.position}}
${exp.description.map(desc => `        \\item ${desc}`).join('\n')}
    \\end{subitemize}`).join('\n')}
\\end{bolditemize}
` : ''}

${projects.length > 0 ? `
\\section*{PROJECTS}
\\begin{bolditemize}
${projects.map(project => `    \\item \\textbf{${project.title}} \\hfill \\textit{${project.duration || ''}}
    \\begin{subitemize}
${project.description.map(desc => `        \\item ${desc}`).join('\n')}
        ${project.githubLink ? `\\item \\href{${project.githubLink}}{\\textbf{GitHub}: ${project.githubLink}}` : ''}
    \\end{subitemize}`).join('\n')}
\\end{bolditemize}
` : ''}

\\section*{SKILLS}
\\begin{bolditemize}
    ${skills.languages.length > 0 ? `\\item \\textbf{Languages:} ${skills.languages.join(', ')}` : ''}
    ${skills.frontend.length > 0 ? `\\item \\textbf{Frontend:} ${skills.frontend.join(', ')}` : ''}
    ${skills.backend.length > 0 ? `\\item \\textbf{Backend:} ${skills.backend.join(', ')}` : ''}
    ${skills.tools.length > 0 ? `\\item \\textbf{Tools:} ${skills.tools.join(', ')}` : ''}
    ${skills.databases && skills.databases.length > 0 ? `\\item \\textbf{Databases:} ${skills.databases.join(', ')}` : ''}
    ${skills.concepts && skills.concepts.length > 0 ? `\\item \\textbf{Concepts:} ${skills.concepts.join(', ')}` : ''}
\\end{bolditemize}

${achievements.length > 0 ? `
\\section*{ACHIEVEMENTS}
\\begin{bolditemize}
${achievements.map(achievement => `    \\item ${achievement.title}${achievement.description ? ` - ${achievement.description}` : ''}`).join('\n')}
\\end{bolditemize}
` : ''}

${codingProfiles.length > 0 ? `
\\section*{CODING PROFILES}
\\begin{bolditemize}
${codingProfiles.map(profile => `    \\item \\href{${profile.url}}{\\textbf{${profile.platform}}: ${profile.url}}`).join('\n')}
\\end{bolditemize}
` : ''}

\\end{document}`;
};

// Tech Modern Template - Different layout with color accents
const generateTechModernLatex = (data: AcademicResumeData): string => {
  return `\\documentclass[a4paper,11pt]{article}
\\usepackage[top=0.3in, bottom=0.3in, left=0.3in, right=0.3in]{geometry}
\\usepackage{enumitem}
\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=blue]{hyperref}
\\usepackage{xcolor}
\\usepackage{fontspec}
\\setmainfont{Arial}
\\usepackage{titlesec}
\\usepackage{array}
\\pagestyle{empty}

\\definecolor{techblue}{RGB}{37, 99, 235}
\\definecolor{techgray}{RGB}{75, 85, 99}

% Modern section formatting with color
\\titleformat{\\section}{\\color{techblue}\\bfseries\\large}{}{0em}{}[\\color{techblue}\\titlerule[2pt]]
\\titlespacing*{\\section}{0pt}{2ex plus 1ex minus .2ex}{1.5ex plus .2ex}

\\begin{document}

% Header with modern styling
\\begin{center}
{\\Huge\\bfseries\\color{techblue} ${data.personalInfo.fullName}} \\\\[0.8ex]
{\\large\\color{techgray} Software Engineer} \\\\[0.5ex]
\\rule{\\textwidth}{1pt} \\\\[0.5ex]
${data.personalInfo.email} $\\bullet$ ${data.personalInfo.phone} $\\bullet$ ${data.personalInfo.linkedinUrl || ''} \\\\
\\end{center}

\\section{TECHNICAL EXPERTISE}
\\begin{itemize}[leftmargin=0.5cm]
\\item \\textbf{Programming Languages:} ${data.skills.languages.join(' • ')}
\\item \\textbf{Frontend Technologies:} ${data.skills.frontend.join(' • ')}
\\item \\textbf{Backend \\& Tools:} ${data.skills.backend.join(' • ')} • ${data.skills.tools.join(' • ')}
\\end{itemize}

\\section{PROFESSIONAL EXPERIENCE}
${data.experience.map(exp => `
\\textbf{${exp.position}} \\hfill \\textit{${exp.duration}} \\\\
\\textit{${exp.company}} \\\\
\\begin{itemize}[leftmargin=0.5cm]
${exp.description.map(desc => `\\item ${desc}`).join('\n')}
\\end{itemize}
\\vspace{0.3cm}
`).join('')}

\\section{KEY PROJECTS}
${data.projects.slice(0, 3).map(project => `
\\textbf{${project.title}} \\\\
${project.description.join(' ')} \\\\
\\textit{Technologies: ${project.technologies ? project.technologies.join(', ') : ''}} \\\\
\\vspace{0.2cm}
`).join('')}

\\section{EDUCATION}
${data.education.map(edu => `
\\textbf{${edu.degree}} \\hfill \\textit{${edu.year}} \\\\
${edu.institute} \\hfill CGPA: ${edu.cgpa} \\\\
\\vspace{0.2cm}
`).join('')}

\\end{document}`;
};

// Classic Professional Template - Traditional formal layout
const generateClassicProLatex = (data: AcademicResumeData): string => {
  return `\\documentclass[a4paper,12pt]{article}
\\usepackage[top=0.4in, bottom=0.4in, left=0.4in, right=0.4in]{geometry}
\\usepackage{enumitem}
\\usepackage[colorlinks=false]{hyperref}
\\usepackage{times}
\\usepackage{titlesec}
\\pagestyle{empty}

% Classic section formatting
\\titleformat{\\section}{\\centering\\bfseries\\normalsize\\scshape}{}{0em}{}[\\vspace{-0.5ex}\\noindent\\rule{\\textwidth}{0.4pt}\\vspace{0.5ex}]
\\titlespacing*{\\section}{0pt}{1.5ex plus 1ex minus .2ex}{1ex plus .2ex}

\\begin{document}

% Classic Header
\\begin{center}
{\\Large\\bfseries ${data.personalInfo.fullName}} \\\\[0.5ex]
${data.personalInfo.address || ''} \\\\
${data.personalInfo.phone} $\\cdot$ ${data.personalInfo.email} \\\\
${data.personalInfo.linkedinUrl || ''} \\\\
\\end{center}

\\section{OBJECTIVE}
Experienced professional seeking challenging opportunities to leverage technical expertise and contribute to organizational growth.

\\section{EDUCATION}
${data.education.map(edu => `
\\textbf{${edu.degree}} \\\\
${edu.institute}, ${edu.year} \\\\
CGPA/Grade: ${edu.cgpa} \\\\
`).join('\\vspace{0.3cm}\n')}

\\section{PROFESSIONAL EXPERIENCE}
${data.experience.map(exp => `
\\textbf{${exp.position}} \\hfill ${exp.duration} \\\\
\\textit{${exp.company}} \\\\
\\begin{itemize}[leftmargin=1cm]
${exp.description.map(desc => `\\item ${desc}`).join('\n')}
\\end{itemize}
\\vspace{0.3cm}
`).join('')}

\\section{TECHNICAL COMPETENCIES}
\\begin{center}
\\begin{tabular}{ll}
\\textbf{Programming Languages:} & ${data.skills.languages.join(', ')} \\\\
\\textbf{Web Technologies:} & ${data.skills.frontend.join(', ')} \\\\
\\textbf{Tools \\& Frameworks:} & ${data.skills.tools.join(', ')} \\\\
\\end{tabular}
\\end{center}

\\section{PROJECTS \\& ACHIEVEMENTS}
${data.projects.map(project => `
\\textbf{${project.title}} \\\\
${project.description.join(' ')} \\\\
\\vspace{0.2cm}
`).join('')}

\\end{document}`;
};

// Preview Generation - opens HTML in modal
export const previewLatexResume = (data: AcademicResumeData, templateId: string): void => {
  const template = latexTemplates.find(t => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  // Convert LaTeX to HTML for preview
  const htmlContent = convertLatexToHTML(data, templateId, true); // true for modal preview
  
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'resume-preview-modal';
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    width: 90vw;
    max-width: 900px;
    height: 90vh;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
  `;
  header.innerHTML = `
    <div>
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">Resume Preview</h2>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">${template.name} Template</p>
    </div>
    <button id="close-preview" style="
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.2s;
    " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">×</button>
  `;

  // Create iframe for preview
  const iframe = document.createElement('iframe');
  iframe.style.cssText = `
    flex: 1;
    border: none;
    width: 100%;
    background: white;
  `;

  // Assemble modal
  modalContent.appendChild(header);
  modalContent.appendChild(iframe);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Load content into iframe
  iframe.onload = () => {
    iframe.contentDocument!.open();
    iframe.contentDocument!.write(htmlContent);
    iframe.contentDocument!.close();
  };

  // Close modal handlers
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  document.getElementById('close-preview')!.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };

  // ESC key to close
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
};

export interface LatexTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  previewImage?: string;
  templateContent: string;
  requiredPackages: string[];
  generate: (data: AcademicResumeData) => string;
}

export const latexTemplates: LatexTemplate[] = [
  {
    id: 'academic',
    name: 'Academic Professional',
    description: 'Clean academic format with structured sections',
    category: 'academic',
    templateContent: 'Academic LaTeX template with proper formatting',
    requiredPackages: ['geometry', 'enumitem', 'hyperref', 'helvet', 'titlesec'],
    generate: generateAcademicLatex
  },
  {
    id: 'techmodern', 
    name: 'Tech Modern',
    description: 'Modern design with color accents for tech professionals',
    category: 'modern',
    templateContent: 'Tech modern LaTeX template with colors',
    requiredPackages: ['geometry', 'xcolor', 'fontspec', 'titlesec'],
    generate: generateTechModernLatex
  },
  {
    id: 'classicpro',
    name: 'Classic Professional', 
    description: 'Traditional formal layout for corporate environments',
    category: 'classic',
    templateContent: 'Classic professional LaTeX template',
    requiredPackages: ['geometry', 'times', 'titlesec'],
    generate: generateClassicProLatex
  }
];

// PDF Generation using browser-based approach
export const generateLatexPDF = async (data: AcademicResumeData, templateId: string): Promise<Blob> => {
  const template = latexTemplates.find(t => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  // Convert LaTeX to HTML for browser rendering
  const htmlContent = convertLatexToHTML(data, templateId, false); // false for PDF generation
  
  return new Promise<Blob>((resolve, reject) => {
    // Create a temporary div for rendering
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '8.27in'; // A4 width
    document.body.appendChild(tempDiv);

    // Import html2canvas and jsPDF dynamically
    Promise.all([
      import('html2canvas').catch(() => {
        throw new Error('html2canvas not found. Please install it: npm install html2canvas');
      }),
      import('jspdf').catch(() => {
        throw new Error('jspdf not found. Please install it: npm install jspdf');
      })
    ]).then(([html2canvasModule, jsPDFModule]) => {
      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default;

      html2canvas(tempDiv, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Clean up
        document.body.removeChild(tempDiv);
        
        // Convert PDF to blob
        const pdfBlob = pdf.output('blob');
        resolve(pdfBlob);
      }).catch(error => {
        document.body.removeChild(tempDiv);
        reject(error);
      });
    }).catch(error => {
      document.body.removeChild(tempDiv);
      reject(error);
    });
  });
};

// Convert LaTeX data to HTML for browser rendering
const convertLatexToHTML = (data: AcademicResumeData, templateId: string, isModal: boolean = false): string => {
  const colors = {
    academic: { primary: '#000000', accent: '#333333' },
    techmodern: { primary: '#2563eb', accent: '#1d4ed8' },
    classicpro: { primary: '#1f2937', accent: '#374151' }
  };

  const templateColors = colors[templateId as keyof typeof colors] || colors.academic;

  if (templateId === 'academic') {
    return generateAcademicHTML(data, templateColors, isModal);
  } else if (templateId === 'techmodern') {
    return generateTechModernHTML(data, templateColors, isModal);
  } else if (templateId === 'classicpro') {
    return generateClassicProHTML(data, templateColors, isModal);
  }
  
  return generateAcademicHTML(data, templateColors, isModal);
};

const generateAcademicHTML = (data: AcademicResumeData, colors: any, isModal: boolean = false): string => {
  const containerWidth = isModal ? '21cm' : '8.27in'; // A4 width for modal
  const containerHeight = isModal ? '29.7cm' : 'auto'; // A4 height for modal
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap');
    
    @page { size: A4; margin: 0.2in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      font-size: ${isModal ? '11pt' : '10pt'}; 
      line-height: 1.4; 
      color: ${colors.primary};
      background: ${isModal ? '#f8fafc' : 'white'};
      ${isModal ? `
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 20px;
      ` : ''}
    }
    .container { 
      width: ${containerWidth}; 
      ${isModal ? `height: ${containerHeight}; min-height: ${containerHeight};` : 'max-width: 8.27in;'} 
      margin: 0 auto; 
      padding: ${isModal ? '24px' : '16px'}; 
      background: white;
      ${isModal ? `
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
      ` : ''}
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: ${isModal ? '1.5em' : '1em'}; 
      padding-bottom: ${isModal ? '1em' : '0.8em'}; 
      border-bottom: 2px solid ${colors.primary};
    }
    .header-left { flex: 0.64; }
    .header-right { flex: 0.34; text-align: right; }
    .name { 
      font-family: 'Merriweather', serif;
      font-size: ${isModal ? '28pt' : '22pt'}; 
      font-weight: 700; 
      line-height: 1.1; 
      margin-bottom: 0.3em; 
      color: ${colors.primary};
      letter-spacing: -0.5px;
    }
    .contact-info { 
      font-size: ${isModal ? '11pt' : '10pt'}; 
      line-height: 1.3; 
      font-weight: 400;
    }
    .section { margin-bottom: ${isModal ? '2em' : '1.5em'}; }
    .section-title { 
      font-family: 'Inter', sans-serif;
      font-size: ${isModal ? '14pt' : '12pt'}; 
      font-weight: 600; 
      text-transform: uppercase; 
      letter-spacing: 1.2px;
      border-bottom: 2px solid ${colors.primary};
      padding-bottom: 4px;
      margin-bottom: ${isModal ? '1em' : '0.8em'};
      color: ${colors.primary};
    }
    .education-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 1em;
      font-family: 'Inter', sans-serif;
    }
    .education-table th,
    .education-table td { 
      border: 1.5px solid ${colors.primary}; 
      padding: ${isModal ? '10px' : '8px'}; 
      text-align: center; 
      font-size: ${isModal ? '10pt' : '9pt'};
      font-weight: 500;
    }
    .education-table th { 
      font-weight: 600; 
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: ${colors.primary};
    }
    .bold-item { margin-bottom: ${isModal ? '1.2em' : '1em'}; }
    .item-header { 
      display: flex; 
      justify-content: space-between; 
      font-weight: 600; 
      margin-bottom: 0.4em; 
      font-size: ${isModal ? '11pt' : '10pt'};
    }
    .sub-items { 
      margin-left: ${isModal ? '2em' : '1.5em'}; 
      margin-top: 0.4em; 
    }
    .sub-item { 
      margin-bottom: 0.4em; 
      position: relative; 
      padding-left: 1.2em;
      font-size: ${isModal ? '10pt' : '9pt'};
      line-height: 1.4;
    }
    .sub-item:before { 
      content: "•"; 
      position: absolute; 
      left: 0; 
      color: ${colors.primary};
      font-weight: 600;
    }
    .skills-list { margin-left: ${isModal ? '1.5em' : '1em'}; }
    .skill-item { 
      margin-bottom: 0.5em; 
      font-size: ${isModal ? '10pt' : '9pt'};
      line-height: 1.4;
    }
    .skill-category {
      font-weight: 600;
      color: ${colors.primary};
    }
    .highlight-text {
      font-weight: 500;
      color: ${colors.primary};
    }
    @media print {
      body { background: white; }
      .container { 
        max-width: none; 
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <div class="name">${data.personalInfo.fullName}</div>
        ${data.personalInfo.address ? `<div class="highlight-text">${data.personalInfo.address}</div>` : ''}
      </div>
      <div class="header-right contact-info">
        ${data.personalInfo.phone ? `<div class="highlight-text">${data.personalInfo.phone}</div>` : ''}
        ${data.personalInfo.email ? `<div><a href="mailto:${data.personalInfo.email}" style="color: inherit; text-decoration: none;">${data.personalInfo.email}</a></div>` : ''}
        ${data.personalInfo.linkedinUrl ? `<div><a href="${data.personalInfo.linkedinUrl}" style="color: inherit; text-decoration: none;">${data.personalInfo.linkedinUrl}</a></div>` : ''}
        ${data.personalInfo.githubUrl ? `<div><a href="${data.personalInfo.githubUrl}" style="color: inherit; text-decoration: none;">${data.personalInfo.githubUrl}</a></div>` : ''}
      </div>
    </div>

    ${data.education.length > 0 ? `
    <!-- Education -->
    <div class="section">
      <div class="section-title">Education</div>
      <table class="education-table">
        <thead>
          <tr>
            <th>Degree</th>
            <th>Institute/Board</th>
            <th>CGPA/%</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          ${data.education.map(edu => `
          <tr>
            <td><strong>${edu.degree}</strong></td>
            <td><strong>${edu.institute}</strong></td>
            <td><strong>${edu.cgpa}</strong></td>
            <td><strong>${edu.year}</strong></td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? `
    <!-- Experience -->
    <div class="section">
      <div class="section-title">Professional Experience</div>
      ${data.experience.map(exp => `
      <div class="bold-item">
        <div class="item-header">
          <span class="highlight-text">${exp.company}</span>
          <span style="font-style: italic; color: #6b7280;">${exp.duration}</span>
        </div>
        <div class="sub-items">
          <div class="sub-item" style="font-style: italic; font-weight: 500;">${exp.position}</div>
          ${exp.description.map(desc => `<div class="sub-item">${desc}</div>`).join('')}
        </div>
      </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.projects.length > 0 ? `
    <!-- Projects -->
    <div class="section">
      <div class="section-title">Projects</div>
      ${data.projects.map(project => `
      <div class="bold-item">
        <div class="item-header">
          <span class="highlight-text">${project.title}</span>
          <span style="font-style: italic; color: #6b7280;">${project.duration || ''}</span>
        </div>
        <div class="sub-items">
          ${project.description.map(desc => `<div class="sub-item">${desc}</div>`).join('')}
          ${project.githubLink ? `<div class="sub-item"><a href="${project.githubLink}" style="color: inherit;"><span class="highlight-text">GitHub</span>: ${project.githubLink}</a></div>` : ''}
        </div>
      </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Skills -->
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-list">
        ${data.skills.languages.length > 0 ? `<div class="skill-item"><span class="skill-category">Programming Languages:</span> ${data.skills.languages.join(', ')}</div>` : ''}
        ${data.skills.frontend.length > 0 ? `<div class="skill-item"><span class="skill-category">Frontend Technologies:</span> ${data.skills.frontend.join(', ')}</div>` : ''}
        ${data.skills.backend.length > 0 ? `<div class="skill-item"><span class="skill-category">Backend Technologies:</span> ${data.skills.backend.join(', ')}</div>` : ''}
        ${data.skills.tools.length > 0 ? `<div class="skill-item"><span class="skill-category">Tools & Frameworks:</span> ${data.skills.tools.join(', ')}</div>` : ''}
        ${data.skills.databases && data.skills.databases.length > 0 ? `<div class="skill-item"><span class="skill-category">Databases:</span> ${data.skills.databases.join(', ')}</div>` : ''}
        ${data.skills.concepts && data.skills.concepts.length > 0 ? `<div class="skill-item"><span class="skill-category">Core Concepts:</span> ${data.skills.concepts.join(', ')}</div>` : ''}
      </div>
    </div>

    ${data.achievements.length > 0 ? `
    <!-- Achievements -->
    <div class="section">
      <div class="section-title">Achievements</div>
      <div class="skills-list">
        ${data.achievements.map(achievement => `<div class="skill-item">• ${achievement.title}${achievement.description ? ` - ${achievement.description}` : ''}</div>`).join('')}
      </div>
    </div>
    ` : ''}

    ${data.codingProfiles.length > 0 ? `
    <!-- Coding Profiles -->
    <div class="section">
      <div class="section-title">Coding Profiles</div>
      <div class="skills-list">
        ${data.codingProfiles.map(profile => `<div class="skill-item"><a href="${profile.url}" style="color: inherit;"><span class="skill-category">${profile.platform}</span>: ${profile.url}</a></div>`).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>`;
};

const generateTechModernHTML = (data: AcademicResumeData, colors: any, isModal: boolean = false): string => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    @page { size: A4; margin: 0.3in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Arial', sans-serif; 
      font-size: 11pt; 
      line-height: 1.4; 
      color: #374151;
      background: white;
    }
    .container { width: 100%; max-width: 8.27in; margin: 0 auto; }
    .header { 
      text-align: center; 
      margin-bottom: 2em; 
      padding-bottom: 1em;
      border-bottom: 3px solid ${colors.primary};
    }
    .name { 
      font-size: 36pt; 
      font-weight: bold; 
      color: ${colors.primary}; 
      margin-bottom: 0.3em; 
    }
    .title { 
      font-size: 18pt; 
      color: ${colors.accent}; 
      margin-bottom: 0.5em; 
    }
    .contact-info { 
      font-size: 11pt; 
      color: #6b7280; 
    }
    .section { margin-bottom: 2em; }
    .section-title { 
      font-size: 14pt; 
      font-weight: bold; 
      color: ${colors.primary}; 
      margin-bottom: 1em;
      border-bottom: 2px solid ${colors.primary};
      padding-bottom: 0.2em;
    }
    .two-column { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 2em; 
    }
    .skill-item { 
      margin-bottom: 0.8em; 
    }
    .skill-category { 
      font-weight: bold; 
      color: ${colors.accent}; 
    }
    .skill-list { 
      color: #4b5563; 
    }
    .experience-item { 
      margin-bottom: 1.5em; 
    }
    .job-header { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: 0.3em; 
    }
    .job-title { 
      font-weight: bold; 
      font-size: 12pt; 
      color: ${colors.primary}; 
    }
    .duration { 
      font-style: italic; 
      color: ${colors.accent}; 
    }
    .company { 
      font-style: italic; 
      color: ${colors.accent}; 
      margin-bottom: 0.5em; 
    }
    .description { 
      margin-left: 1em; 
    }
    .description li { 
      margin-bottom: 0.3em; 
    }
    .project-item { 
      margin-bottom: 1.2em; 
      padding: 1em; 
      border-left: 4px solid ${colors.primary}; 
      background: #f8fafc; 
    }
    .project-title { 
      font-weight: bold; 
      color: ${colors.primary}; 
      margin-bottom: 0.3em; 
    }
    .tech-stack { 
      font-style: italic; 
      color: ${colors.accent}; 
      margin-top: 0.3em; 
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="title">Software Engineer</div>
      <div class="contact-info">
        ${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.linkedinUrl || ''}
      </div>
    </div>

    <!-- Technical Expertise -->
    <div class="section">
      <div class="section-title">TECHNICAL EXPERTISE</div>
      <div class="skill-item">
        <span class="skill-category">Programming Languages:</span> 
        <span class="skill-list">${data.skills.languages.join(' • ')}</span>
      </div>
      <div class="skill-item">
        <span class="skill-category">Frontend Technologies:</span> 
        <span class="skill-list">${data.skills.frontend.join(' • ')}</span>
      </div>
      <div class="skill-item">
        <span class="skill-category">Backend & Tools:</span> 
        <span class="skill-list">${data.skills.backend.join(' • ')} • ${data.skills.tools.join(' • ')}</span>
      </div>
    </div>

    <!-- Experience -->
    ${data.experience.length > 0 ? `
    <div class="section">
      <div class="section-title">PROFESSIONAL EXPERIENCE</div>
      ${data.experience.map(exp => `
      <div class="experience-item">
        <div class="job-header">
          <span class="job-title">${exp.position}</span>
          <span class="duration">${exp.duration}</span>
        </div>
        <div class="company">${exp.company}</div>
        <ul class="description">
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Projects -->
    ${data.projects.length > 0 ? `
    <div class="section">
      <div class="section-title">KEY PROJECTS</div>
      ${data.projects.slice(0, 3).map(project => `
      <div class="project-item">
        <div class="project-title">${project.title}</div>
        <div>${project.description.join(' ')}</div>
        ${project.technologies && project.technologies.length > 0 ? `<div class="tech-stack">Technologies: ${project.technologies.join(', ')}</div>` : ''}
      </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Education -->
    ${data.education.length > 0 ? `
    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${data.education.map(edu => `
      <div class="experience-item">
        <div class="job-header">
          <span class="job-title">${edu.degree}</span>
          <span class="duration">${edu.year}</span>
        </div>
        <div class="company">${edu.institute} • CGPA: ${edu.cgpa}</div>
      </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>`;
};

const generateClassicProHTML = (data: AcademicResumeData, colors: any, isModal: boolean = false): string => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    @page { size: A4; margin: 0.4in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Times New Roman', serif; 
      font-size: 12pt; 
      line-height: 1.5; 
      color: ${colors.primary};
      background: white;
    }
    .container { width: 100%; max-width: 8.27in; margin: 0 auto; }
    .header { 
      text-align: center; 
      margin-bottom: 2em; 
      border-bottom: 1px solid ${colors.primary};
      padding-bottom: 1em;
    }
    .name { 
      font-size: 18pt; 
      font-weight: bold; 
      margin-bottom: 0.5em; 
    }
    .contact-info { 
      font-size: 11pt; 
      line-height: 1.3; 
    }
    .section { margin-bottom: 2em; }
    .section-title { 
      font-size: 12pt; 
      font-weight: bold; 
      text-align: center; 
      text-transform: uppercase; 
      letter-spacing: 1px;
      margin-bottom: 0.5em;
      border-bottom: 0.4pt solid ${colors.primary};
      padding-bottom: 0.2em;
    }
    .objective { 
      text-align: justify; 
      font-style: italic; 
      margin-bottom: 1.5em; 
    }
    .education-item, 
    .experience-item { 
      margin-bottom: 1.5em; 
    }
    .item-title { 
      font-weight: bold; 
      margin-bottom: 0.2em; 
    }
    .item-subtitle { 
      font-style: italic; 
      margin-bottom: 0.5em; 
    }
    .item-details { 
      margin-bottom: 0.5em; 
    }
    .experience-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: baseline; 
    }
    .experience-list { 
      margin-left: 1cm; 
    }
    .experience-list li { 
      margin-bottom: 0.3em; 
    }
    .skills-table { 
      width: 100%; 
      margin: 0 auto; 
      border-collapse: collapse; 
    }
    .skills-table td { 
      padding: 0.3em 1em; 
      vertical-align: top; 
    }
    .skills-table .label { 
      font-weight: bold; 
      text-align: right; 
      white-space: nowrap; 
    }
    .projects-item { 
      margin-bottom: 1em; 
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="contact-info">
        ${data.personalInfo.address || ''}<br>
        ${data.personalInfo.phone} • ${data.personalInfo.email}<br>
        ${data.personalInfo.linkedinUrl || ''}
      </div>
    </div>

    <!-- Objective -->
    <div class="section">
      <div class="section-title">OBJECTIVE</div>
      <div class="objective">
        Experienced professional seeking challenging opportunities to leverage technical expertise and contribute to organizational growth while advancing career development in a dynamic environment.
      </div>
    </div>

    <!-- Education -->
    ${data.education.length > 0 ? `
    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${data.education.map(edu => `
      <div class="education-item">
        <div class="item-title">${edu.degree}</div>
        <div class="item-subtitle">${edu.institute}, ${edu.year}</div>
        <div class="item-details">CGPA/Grade: ${edu.cgpa}</div>
      </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Experience -->
    ${data.experience.length > 0 ? `
    <div class="section">
      <div class="section-title">PROFESSIONAL EXPERIENCE</div>
      ${data.experience.map(exp => `
      <div class="experience-item">
        <div class="experience-header">
          <span class="item-title">${exp.position}</span>
          <span>${exp.duration}</span>
        </div>
        <div class="item-subtitle">${exp.company}</div>
        <ul class="experience-list">
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Technical Competencies -->
    <div class="section">
      <div class="section-title">TECHNICAL COMPETENCIES</div>
      <table class="skills-table">
        ${data.skills.languages.length > 0 ? `
        <tr>
          <td class="label">Programming Languages:</td>
          <td>${data.skills.languages.join(', ')}</td>
        </tr>
        ` : ''}
        ${data.skills.frontend.length > 0 ? `
        <tr>
          <td class="label">Web Technologies:</td>
          <td>${data.skills.frontend.join(', ')}</td>
        </tr>
        ` : ''}
        ${data.skills.tools.length > 0 ? `
        <tr>
          <td class="label">Tools & Frameworks:</td>
          <td>${data.skills.tools.join(', ')}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Projects & Achievements -->
    ${data.projects.length > 0 ? `
    <div class="section">
      <div class="section-title">PROJECTS & ACHIEVEMENTS</div>
      ${data.projects.map(project => `
      <div class="projects-item">
        <div class="item-title">${project.title}</div>
        <div>${project.description.join(' ')}</div>
      </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>`;
};

const latexService = {
  templates: latexTemplates,
  getTemplates: () => latexTemplates,
  getTemplate: (id: string) => latexTemplates.find(t => t.id === id),
  generatePDF: generateLatexPDF,
  preview: previewLatexResume
};

export default latexService;
