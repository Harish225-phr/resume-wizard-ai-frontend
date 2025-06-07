
import { useState } from 'react';
import { FileText, Download, Loader2, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { Button } from '@/components/ui/button';
import TemplateCard from '@/components/TemplateCard';
import ResumePreview from '@/components/ResumePreview';
import PersonalInfoSection from '@/components/resume-form/PersonalInfoSection';
import EducationSkillsSection from '@/components/resume-form/EducationSkillsSection';
import ExperienceSection from '@/components/resume-form/ExperienceSection';
import CareerObjectiveSection from '@/components/resume-form/CareerObjectiveSection';
import { FormData, Template } from '@/types/resume';

const CreateResume = () => {
  const { toast } = useToast();
  const { downloadPDF, isGenerating } = usePDFDownload();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: '',
    careerObjective: '',
    template: 'modern',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const templates: Template[] = [
    { id: 'modern', name: 'Modern Professional', type: 'free', preview: 'Clean & Simple' },
    { id: 'executive', name: 'Executive Style', type: 'free', preview: 'Professional & Elegant' },
    { id: 'creative', name: 'Creative Designer', type: 'free', preview: 'Bold & Creative' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTemplateSelect = (template: Template) => {
    setFormData(prev => ({ ...prev, template: template.id }));
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
      // Simulate AI generation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.education || !formData.skills) {
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
      
      setShowDownload(true);
      toast({
        title: "🎉 Resume Generated Successfully!",
        description: "Your professional resume has been created successfully.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Your Professional Resume - 100% Free!
          </h1>
          <p className="text-xl text-gray-600">
            Fill in your details and choose from our completely free templates
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <PersonalInfoSection formData={formData} handleInputChange={handleInputChange} />
              <EducationSkillsSection formData={formData} handleInputChange={handleInputChange} />
              <ExperienceSection formData={formData} handleInputChange={handleInputChange} />
              <CareerObjectiveSection 
                formData={formData}
                isGeneratingObjective={isGeneratingObjective}
                handleInputChange={handleInputChange}
                generateObjective={generateObjective}
              />

              {/* Template Selection */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FileText className="mr-3 h-6 w-6 text-indigo-600" />
                  Choose Template - All Free!
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={formData.template === template.id}
                      onSelect={handleTemplateSelect}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!showDownload ? (
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
                      'Generate Resume'
                    )}
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleDownloadPDF}
                      disabled={isGenerating}
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Generating PDF...
                        </div>
                      ) : (
                        <>
                          <FileDown className="mr-2 h-5 w-5" />
                          Download as PDF
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Resume Preview Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Resume Preview
            </h2>
            <div className="overflow-auto max-h-screen">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
