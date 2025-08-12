import React, { useState } from 'react';
import { AcademicResumeData, Education, Experience, Project, Skills, Achievement, CodingProfile } from '@/types/academicResume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Download, Eye, User, GraduationCap, Briefcase, Code, Cpu, Award, Globe, FileText, Search, Upload } from 'lucide-react';
import latexService from '@/services/latexService';
import ATSCheckerModal from './ATSCheckerModal';
import ResumeUploadModal from './ResumeUploadModal';

interface ResumeBuilderProps {
  onPreview?: (data: AcademicResumeData, template: string) => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onPreview }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('academic');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [resumeData, setResumeData] = useState<AcademicResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      githubUrl: '',
      address: ''
    },
    education: [{
      id: '1',
      degree: '',
      institute: '',
      cgpa: '',
      year: ''
    }],
    experience: [],
    projects: [],
    skills: {
      languages: [],
      frontend: [],
      backend: [],
      tools: [],
      databases: [],
      concepts: []
    },
    achievements: [],
    codingProfiles: [],
    languages: '',
    certifications: [],
    interests: ''
  });

  const [skillInputs, setSkillInputs] = useState({
    languages: '',
    frontend: '',
    backend: '',
    tools: '',
    databases: '',
    concepts: ''
  });

  const templates = [
    { id: 'academic', name: 'Academic Professional', description: 'Professional format with tables and clean structure' },
    { id: 'techmodern', name: 'Tech Modern', description: 'Modern tech-focused design with color accents' },
    { id: 'classicpro', name: 'Classic Professional', description: 'Traditional formal layout for executives' }
  ];

  // Personal Info handlers
  const updatePersonalInfo = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institute: '',
      cgpa: '',
      year: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
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

  // Experience handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
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

  // Project handlers
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      duration: '',
      description: [''],
      githubLink: '',
      technologies: []
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
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

  // Skills handlers
  const updateSkills = (category: keyof Skills, value: string) => {
    setSkillInputs(prev => ({ ...prev, [category]: value }));
    
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skillsArray }
    }));
  };

  // Achievement handlers
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
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

  // Coding Profile handlers
  const addCodingProfile = () => {
    const newProfile: CodingProfile = {
      id: Date.now().toString(),
      platform: '',
      username: '',
      url: ''
    };
    setResumeData(prev => ({
      ...prev,
      codingProfiles: [...prev.codingProfiles, newProfile]
    }));
  };

  const updateCodingProfile = (id: string, field: keyof CodingProfile, value: string) => {
    setResumeData(prev => ({
      ...prev,
      codingProfiles: prev.codingProfiles.map(profile => 
        profile.id === id ? { ...profile, [field]: value } : profile
      )
    }));
  };

  const removeCodingProfile = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      codingProfiles: prev.codingProfiles.filter(profile => profile.id !== id)
    }));
  };

  const handleDownload = async () => {
    // Basic validation
    if (!resumeData.personalInfo.fullName.trim()) {
      alert('Please enter your full name before downloading the resume.');
      return;
    }

    try {
      // Show loading state
      const originalText = (document.querySelector('[data-download-btn]') as HTMLElement)?.textContent;
      const downloadBtn = document.querySelector('[data-download-btn]') as HTMLElement;
      if (downloadBtn) {
        downloadBtn.textContent = 'Generating PDF...';
        downloadBtn.style.pointerEvents = 'none';
      }

      // Use the new service directly with the current data structure
      const pdfBlob = await latexService.generatePDF(resumeData, selectedTemplate);
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName || 'Resume'}_${selectedTemplate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Reset button
      if (downloadBtn && originalText) {
        downloadBtn.textContent = originalText;
        downloadBtn.style.pointerEvents = 'auto';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please make sure you have filled in at least your name and try again.');
      
      // Reset button on error
      const downloadBtn = document.querySelector('[data-download-btn]') as HTMLElement;
      if (downloadBtn) {
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.style.pointerEvents = 'auto';
      }
    }
  };

  const handlePreview = () => {
    // Basic validation
    if (!resumeData.personalInfo.fullName.trim()) {
      alert('Please enter your full name before previewing the resume.');
      return;
    }

    try {
      // Use the service's preview function directly
      latexService.preview(resumeData, selectedTemplate);
    } catch (error) {
      console.error('Error generating preview:', error);
      alert('Error generating preview. Please try again.');
    }
  };

  const handleUploadedData = (data: AcademicResumeData) => {
    console.log('Received uploaded data:', data);
    
    try {
      // Create a properly structured resume data object
      const mappedData: AcademicResumeData = {
        personalInfo: data.personalInfo || {
          fullName: '',
          email: '',
          phone: '',
          linkedinUrl: '',
          githubUrl: '',
          address: ''
        },
        education: data.education || [],
        experience: data.experience || [],
        projects: data.projects || [],
        skills: data.skills || {
          languages: [],
          frontend: [],
          backend: [],
          tools: []
        },
        achievements: data.achievements || [],
        codingProfiles: data.codingProfiles || [],
        languages: data.languages || '',
        certifications: data.certifications || [],
        interests: data.interests || ''
      };
      
      console.log('Mapped data for form:', mappedData);
      setResumeData(mappedData);
      
      // Update skill inputs to match the extracted data
      if (mappedData.skills) {
        const newSkillInputs = {
          languages: (mappedData.skills.languages || []).join(', '),
          frontend: (mappedData.skills.frontend || []).join(', '),
          backend: (mappedData.skills.backend || []).join(', '),
          tools: (mappedData.skills.tools || []).join(', '),
          databases: (mappedData.skills.databases || []).join(', '),
          concepts: (mappedData.skills.concepts || []).join(', ')
        };
        
      console.log('Setting skill inputs:', newSkillInputs);
      setSkillInputs(newSkillInputs);
    }
    
    // Force a re-render by triggering state updates
    setTimeout(() => {
      console.log('Current resume data after upload:', mappedData);
    }, 100);
    
    console.log('Data upload completed successfully');    } catch (error) {
      console.error('Error processing uploaded data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Upload Option */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Resume Builder</h1>
          <p className="text-gray-600 mb-4">Create professional academic-style resumes with clean formatting</p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={() => setShowUploadModal(true)}
              variant="outline" 
              className="bg-green-50 hover:bg-green-100 border-green-200"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Existing Resume
            </Button>
          </div>
        </div>

        {/* Template Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Choose Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <Badge className="mt-2">LaTeX PDF</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john.smith@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  value={resumeData.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <Input
                  value={resumeData.personalInfo.linkedinUrl}
                  onChange={(e) => updatePersonalInfo('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <Input
                  value={resumeData.personalInfo.githubUrl}
                  onChange={(e) => updatePersonalInfo('githubUrl', e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Education
              <Button onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <Button
                      onClick={() => removeEducation(edu.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree *</label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="B.E. Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Institute/University *</label>
                    <Input
                      value={edu.institute}
                      onChange={(e) => updateEducation(edu.id, 'institute', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CGPA/Percentage</label>
                    <Input
                      value={edu.cgpa}
                      onChange={(e) => updateEducation(edu.id, 'cgpa', e.target.value)}
                      placeholder="8.5 CGPA / 85%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Year/Duration *</label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      placeholder="2021-2025"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => addExperience()}
              variant="outline"
              className="mb-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Experience {resumeData.experience.indexOf(exp) + 1}</h4>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    rows={3}
                    value={exp.description.join('\n')}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                    placeholder="• Developed web applications using React and Node.js&#10;• Improved system performance by 30%&#10;• Led a team of 3 developers"
                  />
                </div>
              </div>
            ))}
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
            <Button
              onClick={() => addProject()}
              variant="outline"
              className="mb-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Project {resumeData.projects.indexOf(project) + 1}</h4>
                  <Button
                    onClick={() => removeProject(project.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Input
                      value={project.duration || ''}
                      onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                      placeholder="Jan 2024 - Mar 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub Link</label>
                    <Input
                      value={project.githubLink || ''}
                      onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Technologies</label>
                    <Input
                      value={(project.technologies || []).join(', ')}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(t => t.trim()))}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    rows={3}
                    value={project.description.join('\n')}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value.split('\n'))}
                    placeholder="• Built a full-stack e-commerce platform&#10;• Implemented user authentication and payment gateway&#10;• Deployed on AWS with 99% uptime"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Programming Languages</label>
                <Input
                  value={skillInputs.languages}
                  onChange={(e) => updateSkills('languages', e.target.value)}
                  placeholder="Java, Python, JavaScript, C++"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Frontend Technologies</label>
                <Input
                  value={skillInputs.frontend}
                  onChange={(e) => updateSkills('frontend', e.target.value)}
                  placeholder="React, Vue.js, Angular, HTML/CSS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Backend Technologies</label>
                <Input
                  value={skillInputs.backend}
                  onChange={(e) => updateSkills('backend', e.target.value)}
                  placeholder="Node.js, Express, Spring Boot, Django"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tools & Technologies</label>
                <Input
                  value={skillInputs.tools}
                  onChange={(e) => updateSkills('tools', e.target.value)}
                  placeholder="Git, Docker, AWS, VS Code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Databases</label>
                <Input
                  value={skillInputs.databases}
                  onChange={(e) => updateSkills('databases', e.target.value)}
                  placeholder="MySQL, MongoDB, PostgreSQL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Concepts</label>
                <Input
                  value={skillInputs.concepts}
                  onChange={(e) => updateSkills('concepts', e.target.value)}
                  placeholder="OOP, Data Structures, Algorithms, REST APIs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => addAchievement()}
              variant="outline"
              className="mb-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
            {resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Achievement {resumeData.achievements.indexOf(achievement) + 1}</h4>
                  <Button
                    onClick={() => removeAchievement(achievement.id)}
                    variant="ghost"
                    size="sm"
                  >
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
                    <Input
                      value={achievement.description || ''}
                      onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                      placeholder="Awarded for outstanding project in machine learning"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Coding Profiles Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Coding Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => addCodingProfile()}
              variant="outline"
              className="mb-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Profile
            </Button>
            {resumeData.codingProfiles.map((profile) => (
              <div key={profile.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Profile {resumeData.codingProfiles.indexOf(profile) + 1}</h4>
                  <Button
                    onClick={() => removeCodingProfile(profile.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform *</label>
                    <Input
                      value={profile.platform}
                      onChange={(e) => updateCodingProfile(profile.id, 'platform', e.target.value)}
                      placeholder="LeetCode, GitHub, Codeforces"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile URL *</label>
                    <Input
                      value={profile.url}
                      onChange={(e) => updateCodingProfile(profile.id, 'url', e.target.value)}
                      placeholder="https://leetcode.com/username"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input
                    value={profile.username}
                    onChange={(e) => updateCodingProfile(profile.id, 'username', e.target.value)}
                    placeholder="your_username"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Information Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Languages Known</label>
                <Input
                  value={resumeData.languages || ''}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    languages: e.target.value
                  }))}
                  placeholder="English (Fluent), Hindi (Native), Spanish (Basic)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interests & Hobbies</label>
                <Input
                  value={resumeData.interests || ''}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    interests: e.target.value
                  }))}
                  placeholder="Reading, Photography, Cricket, Guitar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Certifications</label>
                <Input
                  value={(resumeData.certifications || []).join(', ')}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    certifications: e.target.value.split(', ').filter(c => c.trim())
                  }))}
                  placeholder="AWS Certified, Oracle Certified Java Programmer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={handlePreview} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <ATSCheckerModal 
            resumeData={resumeData}
            trigger={
              <Button variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200">
                <Search className="w-4 h-4 mr-2" />
                Check ATS Score
              </Button>
            }
          />
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700" data-download-btn>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Upload Modal */}
        <ResumeUploadModal 
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onResumeData={handleUploadedData}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
