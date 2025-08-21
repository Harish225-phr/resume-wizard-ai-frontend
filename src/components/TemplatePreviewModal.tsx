
import React from 'react';
import { X, Check } from 'lucide-react';
import { Template } from '@/types/resume';
import { Button } from '@/components/ui/button';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border shadow-lg">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSelect}>
              <Check className="mr-2 h-4 w-4" />
              Use This Template
            </Button>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <img 
                src={template.imageUrl}
                alt={`${template.name} template preview`}
                className="w-full h-auto rounded-lg shadow-lg border border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
