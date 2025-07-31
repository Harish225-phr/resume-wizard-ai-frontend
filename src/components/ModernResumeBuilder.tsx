import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Trash2, 
  User, 
  GraduationCap, 
  Eye, 
  Download,
  Briefcase,
  Code,
  Award,
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github
} from 'lucide-react';
import { Template } from '@/types/resume';

interface ModernResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    duration: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

interface ModernResumeBuilderProps {
  selectedTemplate: Template;
  onPreview?: (data: ModernResumeData, template: Template) => void;
}

const ModernResumeBuilder: React.FC<ModernResumeBuilderProps> = ({ selectedTemplate, onPreview }) => {
  const [resumeData, setResumeData] = useState<ModernResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: []
    },
    projects: [],
    achievements: []
  });

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      location: '',
      description: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      duration: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      link: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(ach => 
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }));
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(resumeData, selectedTemplate);
    }
  };

  const generateHTML = () => {
    const template = selectedTemplate;
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.personalInfo.fullName} - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: ${template.style.fontFamily}, sans-serif;
            line-height: 1.6;
            color: ${template.style.primaryColor};
            background: white;
          }
          
          .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
            min-height: 11in;
          }
          
          .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 3px solid ${template.style.accentColor};
          }
          
          .name {
            font-size: 2.5rem;
            font-weight: bold;
            color: ${template.style.primaryColor};
            margin-bottom: 0.5rem;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            font-size: 0.9rem;
            color: #666;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .section {
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 1.4rem;
            font-weight: bold;
            color: ${template.style.accentColor};
            margin-bottom: 1rem;
            padding-bottom: 0.25rem;
            border-bottom: 2px solid #eee;
          }
          
          .summary {
            font-size: 1rem;
            line-height: 1.8;
            text-align: justify;
          }
          
          .experience-item, .education-item, .project-item {
            margin-bottom: 1.5rem;
            padding-left: 1rem;
            border-left: 3px solid ${template.style.accentColor};
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
          }
          
          .item-title {
            font-weight: bold;
            font-size: 1.1rem;
            color: ${template.style.primaryColor};
          }
          
          .item-company {
            font-weight: 600;
            color: ${template.style.accentColor};
          }
          
          .item-duration {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
          }
          
          .item-description {
            margin-top: 0.5rem;
          }
          
          .item-description ul {
            padding-left: 1rem;
          }
          
          .item-description li {
            margin-bottom: 0.25rem;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .skill-category {
            margin-bottom: 1rem;
          }
          
          .skill-category-title {
            font-weight: bold;
            color: ${template.style.accentColor};
            margin-bottom: 0.5rem;
          }
          
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .skill-tag {
            background: ${template.style.accentColor};
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
          }
          
          .technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            margin-top: 0.5rem;
          }
          
          .tech-tag {
            background: #f3f4f6;
            color: ${template.style.primaryColor};
            padding: 0.125rem 0.5rem;
            border-radius: 10px;
            font-size: 0.75rem;
            border: 1px solid #e5e7eb;
          }
          
          @media print {
            .container {
              margin: 0;
              padding: 0.5in;
              box-shadow: none;
            }
            
            body {
              background: white;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1 class="name">${resumeData.personalInfo.fullName}</h1>
            <div class="contact-info">
              ${resumeData.personalInfo.email ? `<div class="contact-item">📧 ${resumeData.personalInfo.email}</div>` : ''}
              ${resumeData.personalInfo.phone ? `<div class="contact-item">📞 ${resumeData.personalInfo.phone}</div>` : ''}
              ${resumeData.personalInfo.location ? `<div class="contact-item">📍 ${resumeData.personalInfo.location}</div>` : ''}
              ${resumeData.personalInfo.linkedinUrl ? `<div class="contact-item">💼 ${resumeData.personalInfo.linkedinUrl}</div>` : ''}
              ${resumeData.personalInfo.githubUrl ? `<div class="contact-item">🔗 ${resumeData.personalInfo.githubUrl}</div>` : ''}
            </div>
          </div>
          
          <!-- Summary -->
          ${resumeData.summary ? `
          <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p class="summary">${resumeData.summary}</p>
          </div>
          ` : ''}
          
          <!-- Experience -->
          ${resumeData.experience.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${resumeData.experience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company} ${exp.location ? `• ${exp.location}` : ''}</div>
                  </div>
                  <div class="item-duration">${exp.duration}</div>
                </div>
                ${exp.description.length > 0 && exp.description[0] ? `
                <div class="item-description">
                  <ul>
                    ${exp.description.map(desc => desc ? `<li>${desc}</li>` : '').join('')}
                  </ul>
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <!-- Projects -->
          ${resumeData.projects.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Projects</h2>
            ${resumeData.projects.map(project => `
              <div class="project-item">
                <div class="item-header">
                  <div class="item-title">${project.title}</div>
                  ${project.link ? `<a href="${project.link}" class="item-duration">View Project</a>` : ''}
                </div>
                <p class="item-description">${project.description}</p>
                ${project.technologies.length > 0 ? `
                <div class="technologies">
                  ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <!-- Education -->
          ${resumeData.education.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${resumeData.education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-company">${edu.school}</div>
                  </div>
                  <div class="item-duration">${edu.duration} ${edu.gpa ? `• GPA: ${edu.gpa}` : ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          <!-- Skills -->
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
              ${resumeData.skills.technical.length > 0 ? `
              <div class="skill-category">
                <div class="skill-category-title">Technical Skills</div>
                <div class="skills-list">
                  ${resumeData.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
              ` : ''}
              ${resumeData.skills.soft.length > 0 ? `
              <div class="skill-category">
                <div class="skill-category-title">Soft Skills</div>
                <div class="skills-list">
                  ${resumeData.skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Achievements -->
          ${resumeData.achievements.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Achievements</h2>
            ${resumeData.achievements.map(achievement => `
              <div class="experience-item">
                <div class="item-title">${achievement.title}</div>
                <p class="item-description">${achievement.description}</p>
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  };

  const handleDownload = () => {
    const htmlContent = generateHTML();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
              <FileText className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Modern Resume Builder
          </h1>
          <p className="text-gray-600">
            Creating resume with <span className="font-semibold" style={{ color: selectedTemplate.style.primaryColor }}>{selectedTemplate.name}</span> template
          </p>
        </div>

        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                  }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <Input
                  value={resumeData.personalInfo.linkedinUrl}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, linkedinUrl: e.target.value }
                  }))}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <Input
                  value={resumeData.personalInfo.githubUrl}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, githubUrl: e.target.value }
                  }))}
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Write a compelling summary of your professional background, key achievements, and career objectives..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={addExperience} variant="outline" className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  <Button onClick={() => removeExperience(exp.id)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Position *</label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company *</label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration *</label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                      placeholder="June 2023 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={exp.description.join('\n')}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                    placeholder="• Developed web applications using React and Node.js&#10;• Improved system performance by 30%&#10;• Led a team of 3 developers"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={addEducation} variant="outline" className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  <Button onClick={() => removeEducation(edu.id)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree *</label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">School *</label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration *</label>
                    <Input
                      value={edu.duration}
                      onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                      placeholder="2018 - 2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GPA</label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Technical Skills</label>
                <Input
                  value={resumeData.skills.technical.join(', ')}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    skills: { 
                      ...prev.skills, 
                      technical: e.target.value.split(', ').filter(s => s.trim()) 
                    }
                  }))}
                  placeholder="JavaScript, React, Node.js, Python"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Soft Skills</label>
                <Input
                  value={resumeData.skills.soft.join(', ')}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    skills: { 
                      ...prev.skills, 
                      soft: e.target.value.split(', ').filter(s => s.trim()) 
                    }
                  }))}
                  placeholder="Leadership, Communication, Problem Solving"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={addProject} variant="outline" className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  <Button onClick={() => removeProject(project.id)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Link</label>
                    <Input
                      value={project.link || ''}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Built a full-stack e-commerce platform with React and Node.js..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Technologies</label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(t => t.trim()))}
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={addAchievement} variant="outline" className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
            {resumeData.achievements.map((achievement, index) => (
              <div key={achievement.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Achievement {index + 1}</h4>
                  <Button onClick={() => removeAchievement(achievement.id)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <Input
                      value={achievement.title}
                      onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                      placeholder="Best Project Award"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={achievement.description}
                      onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                      placeholder="Awarded for outstanding project in machine learning..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={handlePreview} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernResumeBuilder;
