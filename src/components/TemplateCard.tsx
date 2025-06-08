
import { Card } from '@/components/ui/card';
import { Check, Eye } from 'lucide-react';
import { Template } from '@/types/resume';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
}

const TemplateCard = ({ template, isSelected, onSelect, onPreview }: TemplateCardProps) => {
  return (
    <Card 
      className={`relative p-0 cursor-pointer transition-all duration-300 transform hover:scale-105 overflow-hidden ${
        isSelected ? 'ring-4 ring-blue-500 bg-blue-50' : 'hover:shadow-2xl'
      }`}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={template.imageUrl}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Eye className="h-4 w-4" />
        </button>

        {/* Template Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1">{template.name}</h3>
          <p className="text-sm opacity-90">{template.description}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            100% Free
          </span>
        </div>
      </div>
      
      {/* Select Button */}
      <div className="p-4">
        <button
          onClick={() => onSelect(template)}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-800'
          }`}
        >
          {isSelected ? (
            <div className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4" />
              Selected
            </div>
          ) : (
            'Select Template'
          )}
        </button>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 rounded-lg border-4 flex items-center justify-center bg-blue-500/10 border-blue-500 pointer-events-none">
          <div className="text-white rounded-full p-2 bg-blue-500">
            <Check className="h-6 w-6" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TemplateCard;
