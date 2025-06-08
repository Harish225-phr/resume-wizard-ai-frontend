
import React from 'react';
import { X, Check } from 'lucide-react';
import { Template } from '@/types/resume';
import { Button } from '@/components/ui/button';
import FakeResumePreview from './FakeResumePreview';

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

const TemplatePreviewModal = ({ template, isOpen, onClose, onSelect }: TemplatePreviewModalProps) => {
  if (!isOpen || !template) return null;

  const handleSelect = () => {
    onSelect(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSelect} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Check className="mr-2 h-4 w-4" />
              Use This Template
            </Button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="flex justify-center">
            <div className="transform scale-75 origin-top">
              <FakeResumePreview template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
