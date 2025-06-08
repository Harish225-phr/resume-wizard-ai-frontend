import { useState } from 'react';
import { FileText, Download, Loader2, FileDown, Edit3, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { Button } from '@/components/ui/button';
import TemplateSelection from '@/components/TemplateSelection';
import ResumePreview from '@/components/ResumePreview';
import PersonalInfoForm from '@/components/resume-form/PersonalInfoForm';
import EducationForm from '@/components/resume-form/EducationForm';
import WorkExperienceForm from '@/components/resume-form/WorkExperienceForm';
import SkillsForm from '@/components/resume-form/SkillsForm';
import ProjectsForm from '@/components/resume-form/ProjectsForm';
import CareerObjectiveSection from '@/components/resume-form/CareerObjectiveSection';
import { FormData, Template, Education, WorkExperience, Project } from '@/types/resume';

const CreateResume = () => {
  const { toast } = useToast();
  const { downloadPDF, isGenerating } = usePDFDownload();
  
  const [currentStep, setCurrentStep] = useState<'template' | 'form' | 'preview'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    photo: null,
    address: '',
    careerObjective: '',
    education: [{ id: '1', degree: '', university: '', duration: '', grade: '' }],
    workExperience: [{ id: '1', company: '', position: '', duration: '', description: '' }],
    hasNoWorkExperience: false,
    skills: '',
    languages: '',
    certifications: '',
    hobbies: '',
    projects: [],
    template: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const templates: Template[] = [
    { id: 'modern', name: 'Modern Professional', type: 'free', preview: 'Clean & Simple' },
    { id: 'executive', name: 'Executive Style', type: 'free', preview: 'Professional & Elegant' },
    { id: 'creative', name: 'Creative Designer', type: 'free', preview: 'Bold & Creative' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setFormData(prev => ({ ...prev, template: template.id }));
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Education handlers
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      degree: '',
      university: '',
      duration: '',
      grade: ''
    };
    setFormData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Work experience handlers
  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, workExperience: newWorkExperience }));
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: generateId(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    setFormData(prev => ({ ...prev, workExperience: [...prev.workExperience, newExperience] }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleNoExperienceChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, hasNoWorkExperience: checked }));
  };

  // Project handlers
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      title: '',
      link: '',
      description: ''
    };
    setFormData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const generateObjective = async () => {
    if (!formData.fullName || !formData.skills) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and skills first to generate a career objective.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingObjective(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedObjective = `Dedicated ${formData.fullName.split(' ')[0]} with expertise in ${formData.skills.split(',')[0]} seeking to leverage strong technical skills and passion for innovation to contribute to a dynamic team and drive organizational success.`;
      
      setFormData(prev => ({ ...prev, careerObjective: generatedObjective }));
      
      toast({
        title: "✨ Objective Generated!",
        description: "Your AI-powered career objective has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate career objective. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingObjective(false);
    }
  };

  const handleContinueToForm = () => {
    if (!selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a template before continuing.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('form');
  };

  const handleBackToTemplate = () => {
    setCurrentStep('template');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.skills) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentStep('preview');
      toast({
        title: "🎉 Resume Generated Successfully!",
        description: "Your professional resume has been created. You can now preview and download it.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF('resume-preview', {
      filename: `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf',
      quality: 1,
      format: 'a4'
    });
  };

  const scrollToSection = (sectionId: string) => {
    setEditingSection(sectionId);
    setCurrentStep('form');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setEditingSection(null), 2000);
    }, 100);
  };

  // Template Selection Step
  if (currentStep === 'template') {
    return (
      <TemplateSelection
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onContinue={handleContinueToForm}
      />
    );
  }

  // Form Step
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with selected template info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToTemplate}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Building Your Resume</h2>
                  <p className="text-gray-600">
                    Using template: <span className="font-medium text-blue-600">{selectedTemplate?.name}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Step 2 of 3</div>
                <div className="text-lg font-semibold text-gray-800">Fill Your Details</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <div id="personal-info" className={editingSection === 'personal-info' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <PersonalInfoForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                />
              </div>

              <div id="career-objective" className={editingSection === 'career-objective' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <CareerObjectiveSection 
                  formData={formData}
                  isGeneratingObjective={isGeneratingObjective}
                  handleInputChange={handleInputChange}
                  generateObjective={generateObjective}
                />
              </div>

              <div id="education" className={editingSection === 'education' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <EducationForm
                  formData={formData}
                  handleEducationChange={handleEducationChange}
                  addEducation={addEducation}
                  removeEducation={removeEducation}
                />
              </div>

              <div id="work-experience" className={editingSection === 'work-experience' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <WorkExperienceForm
                  formData={formData}
                  handleWorkExperienceChange={handleWorkExperienceChange}
                  addWorkExperience={addWorkExperience}
                  removeWorkExperience={removeWorkExperience}
                  handleNoExperienceChange={handleNoExperienceChange}
                />
              </div>

              <div id="skills" className={editingSection === 'skills' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <SkillsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div id="projects" className={editingSection === 'projects' ? 'ring-4 ring-blue-200 rounded-xl p-4' : ''}>
                <ProjectsForm
                  formData={formData}
                  handleProjectChange={handleProjectChange}
                  addProject={addProject}
                  removeProject={removeProject}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  onClick={handleBackToTemplate}
                  variant="outline"
                  className="px-6 py-3"
                >
                  ← Back to Templates
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Generating Resume...
                    </div>
                  ) : (
                    'Generate Resume →'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Preview Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Resume is Ready! 🎉</h2>
              <p className="text-gray-600">
                Template: <span className="font-medium text-blue-600">{selectedTemplate?.name}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button
                onClick={() => scrollToSection('personal-info')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Personal Info
              </Button>
              <Button
                onClick={() => scrollToSection('education')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Education
              </Button>
              <Button
                onClick={() => scrollToSection('work-experience')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Experience
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold hover:shadow-xl transition-all duration-300"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating PDF...
                  </div>
                ) : (
                  <>
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Resume Preview */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
