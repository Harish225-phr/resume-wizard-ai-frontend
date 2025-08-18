import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Download } from 'lucide-react';
import latexService from '@/services/latexService';
import { LatexTemplate } from '@/services/latexService';
import { AcademicResumeData } from '@/types/academicResume';
import { useLaTeXDownload } from '@/hooks/useLaTeXDownload';

// Sample data for template previews
const sampleResumeData: AcademicResumeData = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "New York, NY",
    linkedinUrl: "linkedin.com/in/johnsmith",
    githubUrl: "github.com/johnsmith"
  },
  education: [
    {
      id: "1",
      degree: "Bachelor of Computer Science",
      institute: "MIT",
      year: "2020",
      cgpa: "3.8/4.0"
    }
  ],
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Software Engineer",
      duration: "2020-Present",
      description: [
        "Developed scalable web applications using React and Node.js",
        "Led team of 3 developers on critical product features"
      ]
    }
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: [
        "Built full-stack e-commerce solution with payment integration",
        "Implemented real-time inventory management system"
      ],
      duration: "2019",
      technologies: ["React", "Node.js", "MongoDB"],
      githubLink: "github.com/johnsmith/ecommerce"
    }
  ],
  skills: {
    languages: ["JavaScript", "Python", "Java"],
    frontend: ["React", "Vue.js", "HTML/CSS"],
    backend: ["Node.js", "Express", "Django"],
    tools: ["Git", "Docker", "AWS"],
    databases: ["MongoDB", "PostgreSQL"],
    concepts: ["REST APIs", "Microservices"]
  },
  achievements: [
    {
      id: "1",
      title: "Best Developer Award 2021",
      description: "Recognized for outstanding contributions to product development"
    }
  ],
  codingProfiles: [
    {
      id: "1",
      platform: "LeetCode",
      username: "johnsmith",
      url: "leetcode.com/johnsmith"
    }
  ]
};

// Generate template preview HTML
const generateTemplatePreviewHTML = (templateId: string): string => {
  const colors = {
    academic: { primary: '#000000', accent: '#333333' },
    techmodern: { primary: '#2563eb', accent: '#1d4ed8' },
    classicpro: { primary: '#1f2937', accent: '#374151' }
  };

  const templateColors = colors[templateId as keyof typeof colors] || colors.academic;

  if (templateId === 'academic') {
    return generateAcademicHTML(sampleResumeData, templateColors, false);
  } else if (templateId === 'techmodern') {
    return generateTechModernHTML(sampleResumeData, templateColors, false);
  } else if (templateId === 'classicpro') {
    return generateClassicProHTML(sampleResumeData, templateColors, false);
  }
  
  return generateAcademicHTML(sampleResumeData, templateColors, false);
};

const generateAcademicHTML = (data: AcademicResumeData, colors: any, isModal: boolean = false): string => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    @page { size: A4; margin: 0.2in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Helvetica', sans-serif; 
      font-size: 11pt; 
      line-height: 1.4; 
      color: ${colors.primary};
      background: white;
    }
    .container { width: 100%; max-width: 8.27in; margin: 0 auto; padding: 10px; }
    .header { margin-bottom: 1.5em; }
    .name { 
      font-size: 22pt; 
      font-weight: bold; 
      margin-bottom: 0.3em; 
    }
    .contact-info { 
      display: flex; 
      justify-content: space-between; 
      font-size: 10pt;
    }
    .section { margin-bottom: 1.2em; }
    .section-title { 
      font-size: 11pt; 
      font-weight: bold; 
      text-transform: uppercase; 
      letter-spacing: 0.5px;
      margin-bottom: 0.5em;
      border-bottom: 1px solid ${colors.primary};
      padding-bottom: 0.2em;
    }
    .education-table { 
      width: 100%; 
      border-collapse: collapse; 
      font-size: 10pt;
    }
    .education-table th, .education-table td { 
      border: 1px solid ${colors.primary}; 
      padding: 0.3em; 
      text-align: center; 
    }
    .experience-item { margin-bottom: 1em; }
    .experience-header { 
      display: flex; 
      justify-content: space-between; 
      font-weight: bold; 
      margin-bottom: 0.2em; 
    }
    .experience-company { 
      font-style: italic; 
      margin-bottom: 0.3em; 
    }
    .experience-list { 
      margin-left: 1em; 
      font-size: 10pt;
    }
    .skills-list { 
      font-size: 10pt; 
    }
    .skills-list li { 
      margin-bottom: 0.2em; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="contact-info">
        <div>${data.personalInfo.address || ''}</div>
        <div>
          ${data.personalInfo.phone} | ${data.personalInfo.email}<br>
          ${data.personalInfo.linkedinUrl || ''} | ${data.personalInfo.githubUrl || ''}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">EDUCATION</div>
      <table class="education-table">
        <tr>
          <th>Degree</th>
          <th>Institute/Board</th>
          <th>CGPA/%</th>
          <th>Year</th>
        </tr>
        ${data.education.map(edu => `
        <tr>
          <td><strong>${edu.degree}</strong></td>
          <td><strong>${edu.institute}</strong></td>
          <td><strong>${edu.cgpa}</strong></td>
          <td><strong>${edu.year}</strong></td>
        </tr>
        `).join('')}
      </table>
    </div>

    <div class="section">
      <div class="section-title">EXPERIENCE</div>
      ${data.experience.map(exp => `
      <div class="experience-item">
        <div class="experience-header">
          <span>${exp.company}</span>
          <span>${exp.duration}</span>
        </div>
        <div class="experience-company">${exp.position}</div>
        <ul class="experience-list">
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">SKILLS</div>
      <ul class="skills-list">
        <li><strong>Languages:</strong> ${data.skills.languages.join(', ')}</li>
        <li><strong>Frontend:</strong> ${data.skills.frontend.join(', ')}</li>
        <li><strong>Backend:</strong> ${data.skills.backend.join(', ')}</li>
        <li><strong>Tools:</strong> ${data.skills.tools.join(', ')}</li>
      </ul>
    </div>
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
      line-height: 1.5; 
      color: #333;
      background: white;
    }
    .container { width: 100%; max-width: 8.27in; margin: 0 auto; padding: 15px; }
    .header { 
      text-align: center; 
      margin-bottom: 2em; 
    }
    .name { 
      font-size: 24pt; 
      font-weight: bold; 
      color: ${colors.primary}; 
      margin-bottom: 0.3em; 
    }
    .title { 
      font-size: 14pt; 
      color: #666; 
      margin-bottom: 0.5em; 
    }
    .divider { 
      width: 100%; 
      height: 2px; 
      background: ${colors.primary}; 
      margin: 0.5em 0; 
    }
    .contact-info { 
      font-size: 10pt; 
    }
    .section { margin-bottom: 1.5em; }
    .section-title { 
      font-size: 13pt; 
      font-weight: bold; 
      color: ${colors.primary}; 
      margin-bottom: 0.8em;
      border-bottom: 2px solid ${colors.primary};
      padding-bottom: 0.2em;
    }
    .experience-item { margin-bottom: 1.2em; }
    .experience-title { 
      font-weight: bold; 
      margin-bottom: 0.2em; 
    }
    .experience-company { 
      font-style: italic; 
      color: #555; 
      margin-bottom: 0.3em; 
    }
    .skills-grid { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 1em; 
    }
    .skill-item { 
      flex: 1; 
      min-width: 200px; 
    }
    .skill-label { 
      font-weight: bold; 
      color: ${colors.primary}; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="title">Software Engineer</div>
      <div class="divider"></div>
      <div class="contact-info">
        ${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.linkedinUrl || ''}
      </div>
    </div>

    <div class="section">
      <div class="section-title">TECHNICAL EXPERTISE</div>
      <div class="skills-grid">
        <div class="skill-item">
          <span class="skill-label">Programming Languages:</span> ${data.skills.languages.join(' • ')}
        </div>
        <div class="skill-item">
          <span class="skill-label">Frontend Technologies:</span> ${data.skills.frontend.join(' • ')}
        </div>
        <div class="skill-item">
          <span class="skill-label">Backend & Tools:</span> ${data.skills.backend.join(' • ')} • ${data.skills.tools.join(' • ')}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">PROFESSIONAL EXPERIENCE</div>
      ${data.experience.map(exp => `
      <div class="experience-item">
        <div class="experience-title">${exp.position}</div>
        <div class="experience-company">${exp.company} | ${exp.duration}</div>
        <ul>
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${data.education.map(edu => `
      <div class="experience-item">
        <div class="experience-title">${edu.degree}</div>
        <div class="experience-company">${edu.institute} | ${edu.year} | CGPA: ${edu.cgpa}</div>
      </div>
      `).join('')}
    </div>
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
    .container { width: 100%; max-width: 8.27in; margin: 0 auto; padding: 15px; }
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
    .experience-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: baseline; 
    }
    .skills-table { 
      width: 80%; 
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">${data.personalInfo.fullName}</div>
      <div class="contact-info">
        ${data.personalInfo.address || ''}<br>
        ${data.personalInfo.phone} • ${data.personalInfo.email}<br>
        ${data.personalInfo.linkedinUrl || ''}
      </div>
    </div>

    <div class="section">
      <div class="section-title">OBJECTIVE</div>
      <div class="objective">
        Experienced professional seeking challenging opportunities to leverage technical expertise and contribute to organizational growth.
      </div>
    </div>

    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${data.education.map(edu => `
      <div class="education-item">
        <div class="item-title">${edu.degree}</div>
        <div class="item-subtitle">${edu.institute}, ${edu.year}</div>
        <div>CGPA/Grade: ${edu.cgpa}</div>
      </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">PROFESSIONAL EXPERIENCE</div>
      ${data.experience.map(exp => `
      <div class="experience-item">
        <div class="experience-header">
          <span class="item-title">${exp.position}</span>
          <span>${exp.duration}</span>
        </div>
        <div class="item-subtitle">${exp.company}</div>
        <ul>
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">TECHNICAL COMPETENCIES</div>
      <table class="skills-table">
        <tr>
          <td class="label">Programming Languages:</td>
          <td>${data.skills.languages.join(', ')}</td>
        </tr>
        <tr>
          <td class="label">Web Technologies:</td>
          <td>${data.skills.frontend.join(', ')}</td>
        </tr>
        <tr>
          <td class="label">Tools & Frameworks:</td>
          <td>${data.skills.tools.join(', ')}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;
};

interface LaTeXTemplateSelectionProps {
  formData: AcademicResumeData;
  onBack: () => void;
}

const LaTeXTemplateSelection: React.FC<LaTeXTemplateSelectionProps> = ({ formData, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();

  const templates = latexService.templates;

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (template: LatexTemplate) => {
    // Use the actual LaTeX preview function to show rendered template
    latexService.preview(formData, template.id);
  };

  const handleDownload = async (templateId: string) => {
    await downloadLaTeXPDF(templateId, formData);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern': return 'bg-primary/10 text-primary border-primary/20';
      case 'classic': return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'creative': return 'bg-accent/10 text-accent-foreground border-accent/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            LaTeX Resume Templates
          </h1>
          <p className="text-muted-foreground mb-4">
            Choose from our professional LaTeX templates for ATS-optimized resumes
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <FileText className="w-4 h-4 mr-1" />
            Professional LaTeX Templates
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Template Preview */}
                  <div className="w-full h-40 bg-card rounded-lg border border-border overflow-hidden">
                    <iframe
                      src={`data:text/html;charset=utf-8,${encodeURIComponent(generateTemplatePreviewHTML(template.id))}`}
                      className="w-full h-full border-none pointer-events-none"
                      style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: '400%', height: '400%' }}
                      title={`${template.name} Preview`}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(template)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      size="sm"
                    className={`flex-1 ${
                      selectedTemplate === template.id 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ready to Generate</h3>
                <p className="text-muted-foreground">
                  Template: {templates.find(t => t.id === selectedTemplate)?.name}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onBack}>
                  Back to Editor
                </Button>
                <Button 
                  onClick={() => handleDownload(selectedTemplate)}
                  disabled={isGenerating}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Download LaTeX PDF'}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• High-quality LaTeX compilation</p>
              <p>• ATS-friendly formatting</p>
              <p>• Professional typography</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaTeXTemplateSelection;