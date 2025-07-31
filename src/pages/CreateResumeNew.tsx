import React, { useState } from 'react';
import { Template } from '@/types/resume';
import TemplateSelection from '@/components/TemplateSelection';
import ResumeBuilder from '@/components/ResumeBuilder';
import ModernResumeBuilder from '@/components/ModernResumeBuilder';

const CreateResumeNew = () => {
  const [currentStep, setCurrentStep] = useState<'template' | 'builder'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setCurrentStep('builder');
    }
  };

  const handleBackToTemplates = () => {
    setCurrentStep('template');
    setSelectedTemplate(null);
  };

  if (currentStep === 'template') {
    return (
      <TemplateSelection
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onContinue={handleContinue}
      />
    );
  }

  if (currentStep === 'builder' && selectedTemplate) {
    // Use ModernResumeBuilder for non-LaTeX templates
    if (!selectedTemplate.hasLatexSupport) {
      return (
        <div>
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={handleBackToTemplates}
              className="bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              ← Back to Templates
            </button>
          </div>
          <ModernResumeBuilder selectedTemplate={selectedTemplate} />
        </div>
      );
    }
    
    // Use LaTeX-based ResumeBuilder for LaTeX templates
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={handleBackToTemplates}
            className="bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            ← Back to Templates
          </button>
        </div>
        <ResumeBuilder />
      </div>
    );
  }

  return null;
};

export default CreateResumeNew;
