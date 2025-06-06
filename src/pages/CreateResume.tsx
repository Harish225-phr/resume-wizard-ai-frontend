
import { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Target, FileText, Download, Loader2, Crown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import PremiumModal from '@/components/PremiumModal';
import AIObjectiveModal from '@/components/AIObjectiveModal';
import TemplateCard from '@/components/TemplateCard';
import { FormData, PaymentState, Template } from '@/types/resume';

const CreateResume = () => {
  const { toast } = useToast();
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
  
  const [paymentState, setPaymentState] = useState<PaymentState>({
    hasPremiumAccess: false,
    hasAIObjectiveAccess: false,
    selectedTemplate: null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingObjective, setIsGeneratingObjective] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const templates: Template[] = [
    { id: 'modern', name: 'Modern Professional', type: 'free', preview: 'Clean & Simple' },
    { id: 'executive', name: 'Executive Premium', type: 'premium', price: 49, preview: 'Professional & Elegant' },
    { id: 'creative', name: 'Creative Designer', type: 'premium', price: 49, preview: 'Bold & Creative' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTemplateSelect = (template: Template) => {
    if (template.type === 'premium' && !paymentState.hasPremiumAccess) {
      setPaymentState(prev => ({ ...prev, selectedTemplate: template }));
      setShowPremiumModal(true);
      return;
    }
    
    setFormData(prev => ({ ...prev, template: template.id }));
  };

  const handlePremiumPayment = () => {
    // Simulate payment processing
    toast({
      title: "Payment Processing",
      description: "Redirecting to payment gateway...",
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      setPaymentState(prev => ({ 
        ...prev, 
        hasPremiumAccess: true 
      }));
      if (paymentState.selectedTemplate) {
        setFormData(prev => ({ ...prev, template: paymentState.selectedTemplate!.id }));
      }
      setShowPremiumModal(false);
      toast({
        title: "Payment Successful!",
        description: "Premium templates unlocked successfully.",
      });
    }, 2000);
  };

  const handleAIPayment = () => {
    // Simulate payment processing
    toast({
      title: "Payment Processing",
      description: "Redirecting to payment gateway...",
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      setPaymentState(prev => ({ 
        ...prev, 
        hasAIObjectiveAccess: true 
      }));
      setShowAIModal(false);
      toast({
        title: "Payment Successful!",
        description: "AI career objective feature unlocked.",
      });
      // Auto-generate objective after payment
      generateObjective();
    }, 2000);
  };

  const generateObjective = async () => {
    if (!paymentState.hasAIObjectiveAccess) {
      setShowAIModal(true);
      return;
    }

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
      // Simulated API call for objective generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedObjective = `Dedicated ${formData.fullName.split(' ')[0]} with expertise in ${formData.skills.split(',')[0]} seeking to leverage strong technical skills and passion for innovation to contribute to a dynamic team and drive organizational success.`;
      
      setFormData(prev => ({ ...prev, careerObjective: generatedObjective }));
      
      toast({
        title: "Objective Generated!",
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

    const selectedTemplate = templates.find(t => t.id === formData.template);
    if (selectedTemplate?.type === 'premium' && !paymentState.hasPremiumAccess) {
      setPaymentState(prev => ({ ...prev, selectedTemplate }));
      setShowPremiumModal(true);
      return;
    }

    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowDownload(true);
      toast({
        title: "Resume Generated!",
        description: "Your resume has been created successfully. You can now download it.",
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

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded.",
    });
  };

  const selectedTemplate = templates.find(t => t.id === formData.template);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Your Professional Resume
          </h1>
          <p className="text-xl text-gray-600">
            Fill in your details and choose from free or premium templates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Personal Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="mr-3 h-6 w-6 text-blue-600" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education & Skills */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <GraduationCap className="mr-3 h-6 w-6 text-purple-600" />
              Education & Skills
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                  Education *
                </label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your educational background (degree, institution, year)"
                  required
                />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills *
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="List your skills (comma separated)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Briefcase className="mr-3 h-6 w-6 text-green-600" />
              Work Experience
            </h2>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience (Optional)
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe your work experience (job title, company, dates, responsibilities)"
              />
            </div>
          </div>

          {/* Career Objective */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Target className="mr-3 h-6 w-6 text-orange-600" />
              Career Objective
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="careerObjective" className="block text-sm font-medium text-gray-700 mb-2">
                  Career Objective
                </label>
                <textarea
                  id="careerObjective"
                  name="careerObjective"
                  value={formData.careerObjective}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your career objective will appear here..."
                />
              </div>
              <Button
                type="button"
                onClick={generateObjective}
                disabled={isGeneratingObjective}
                variant="outline"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                {isGeneratingObjective ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {paymentState.hasAIObjectiveAccess 
                  ? (isGeneratingObjective ? 'Generating...' : 'Generate with AI')
                  : 'Generate with AI – ₹19'
                }
              </Button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FileText className="mr-3 h-6 w-6 text-indigo-600" />
              Choose Template
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={formData.template === template.id}
                  onSelect={handleTemplateSelect}
                  hasPremiumAccess={paymentState.hasPremiumAccess}
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
              <Button
                type="button"
                onClick={handleDownload}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5 inline" />
                Download Resume
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Modals */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        templateName={paymentState.selectedTemplate?.name || ''}
        price={paymentState.selectedTemplate?.price || 49}
        onPayment={handlePremiumPayment}
      />

      <AIObjectiveModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onPayment={handleAIPayment}
      />
    </div>
  );
};

export default CreateResume;
