
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
        isSelected ? 'ring-4 ring-blue-500 bg-blue-50' : 'hover:shadow-xl'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={template.imageUrl}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
        >
          <Eye className="h-3 w-3" />
        </button>

        {/* Template Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-bold text-sm mb-1">{template.name}</h3>
          <p className="text-xs opacity-90 line-clamp-2">{template.description}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            100% Free
          </span>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 rounded-lg border-4 flex items-center justify-center bg-blue-500/20 border-blue-500 pointer-events-none">
          <div className="text-white rounded-full p-2 bg-blue-500 shadow-lg">
            <Check className="h-4 w-4" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TemplateCard;
