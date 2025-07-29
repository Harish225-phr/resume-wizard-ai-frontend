
import { useState } from 'react';
import { FileText, Download, Loader2, FileDown, Edit, ArrowLeft, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { Button } from '@/components/ui/button';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeUploadModal from '@/components/ResumeUploadModal';
import TemplateSelection from '@/components/TemplateSelection';
import ResumePreview from '@/components/ResumePreview';
import ResumeRichEditor from '@/components/ResumeRichEditor';
import PersonalInfoForm from '@/components/resume-form/PersonalInfoForm';
import EducationForm from '@/components/resume-form/EducationForm';
import WorkExperienceForm from '@/components/resume-form/WorkExperienceForm';
import SkillsForm from '@/components/resume-form/SkillsForm';
import ProjectsForm from '@/components/resume-form/ProjectsForm';
import CustomSectionsForm from '@/components/resume-form/CustomSectionsForm';
import CareerObjectiveSection from '@/components/resume-form/CareerObjectiveSection';
import { FormData, Template, Education, WorkExperience, Project } from '@/types/resume';

const CreateResume = () => {
  const { toast } = useToast();
  const { downloadPDF, isGenerating } = usePDFDownload();
  
  const [currentStep, setCurrentStep] = useState<'upload' | 'template' | 'form' | 'preview' | 'editor'>('template');
  const [showUploadModal, setShowUploadModal] = useState(false);
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
    customSections: [],
    template: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);

  const careerObjectives = [
    "Dedicated professional with expertise in {skills} seeking to leverage strong technical skills and passion for innovation to contribute to a dynamic team and drive organizational success.",
    "Results-driven {position} with proven track record in {field}, looking to apply analytical thinking and creative problem-solving skills to deliver exceptional value in a growth-oriented organization.",
    "Motivated individual with strong foundation in {skills} and excellent communication abilities, eager to contribute fresh perspectives and drive meaningful impact in a collaborative environment.",
    "Ambitious professional passionate about {field} technology and innovation, seeking opportunities to apply technical expertise and leadership skills to solve complex challenges and exceed organizational goals.",
    "Detail-oriented {position} with commitment to excellence and continuous learning, aiming to utilize comprehensive skill set and industry knowledge to contribute to team success and professional growth.",
    "Dynamic professional with experience in {field} and strong analytical capabilities, seeking to join a forward-thinking organization where I can apply my skills to drive innovation and achieve measurable results."
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
    // Automatically proceed to the form step after template selection
    setTimeout(() => setCurrentStep('form'), 100);
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

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
    if (!formData.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name first to generate a career objective.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingObjective(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomObjective = careerObjectives[Math.floor(Math.random() * careerObjectives.length)];
      
      let generatedObjective = randomObjective
        .replace('{skills}', formData.skills || 'various technologies')
        .replace('{position}', selectedTemplate?.placeholders?.position || 'professional')
        .replace('{field}', 'technology');
      
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

  const handleOpenEditor = () => {
    setCurrentStep('editor');
  };

  const handleSaveFromEditor = (updatedData: FormData) => {
    setFormData(updatedData);
    setCurrentStep('preview');
    toast({
      title: "Resume Updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleParsedData = (parsedData: FormData) => {
    console.log('Parsed Data Received:', parsedData);
    const updatedData = { ...parsedData, template: selectedTemplate?.id || '' };
    setFormData(updatedData);
    console.log('Form Data After Setting:', updatedData);
    setCurrentStep('form');
    toast({
      title: "Data Extracted Successfully! ✨",
      description: "Your resume data has been extracted and template applied!",
    });
  };

  const handleSkipUpload = () => {
    setCurrentStep('template');
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
  };

  const handleUploadResume = () => {
    setShowUploadModal(true);
  };


  // Resume Upload Step
  if (currentStep === 'upload') {
    return (
      <ResumeUpload
        onParsedData={handleParsedData}
        onSkip={handleSkipUpload}
      />
    );
  }

  // Template Selection Step
  if (currentStep === 'template') {
    return (
      <TemplateSelection
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onContinue={handleContinueToForm}
        onBackToUpload={handleBackToUpload}
        onUploadResume={handleUploadResume}
      />
    );
  }

  // Rich Text Editor Step
  if (currentStep === 'editor') {
    return (
      <ResumeRichEditor
        formData={formData}
        selectedTemplate={selectedTemplate}
        onSave={handleSaveFromEditor}
        onBack={() => setCurrentStep('preview')}
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
              <PersonalInfoForm 
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
              />

              <CareerObjectiveSection 
                formData={formData}
                isGeneratingObjective={isGeneratingObjective}
                handleInputChange={handleInputChange}
                generateObjective={generateObjective}
              />

              <EducationForm
                formData={formData}
                handleEducationChange={handleEducationChange}
                addEducation={addEducation}
                removeEducation={removeEducation}
              />

              <WorkExperienceForm
                formData={formData}
                handleWorkExperienceChange={handleWorkExperienceChange}
                addWorkExperience={addWorkExperience}
                removeWorkExperience={removeWorkExperience}
                handleNoExperienceChange={handleNoExperienceChange}
              />

              <SkillsForm
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <ProjectsForm
                formData={formData}
                handleProjectChange={handleProjectChange}
                addProject={addProject}
                removeProject={removeProject}
              />

              <CustomSectionsForm
                formData={formData}
                setFormData={setFormData}
              />

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Resume is Ready! 🎉</h2>
              <p className="text-gray-600">
                Template: <span className="font-medium text-blue-600">{selectedTemplate?.name}</span>
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button
                onClick={() => setCurrentStep('form')}
                variant="outline"
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              >
                <Edit3 className="h-4 w-4" />
                Back to Edit
              </Button>
              <Button
                onClick={handleOpenEditor}
                variant="outline"
                className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
              >
                <Edit className="h-4 w-4" />
                Edit Resume
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
                  <div className="flex items-center">
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Resume Preview */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center">
            <div className="w-full max-w-none">
              <ResumePreview formData={formData} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <ResumeUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onParsedData={handleParsedData}
        />
      </div>
    </div>
  );
};

export default CreateResume;
