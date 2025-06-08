
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Template } from '@/types/resume';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
}

const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  return (
    <Card 
      className={`relative p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-xl'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="aspect-[3/4] rounded-lg mb-3 flex items-center justify-center transition-all duration-300 bg-gradient-to-b from-gray-100 to-gray-200">
        <span className="text-sm font-medium text-gray-500">
          {template.preview}
        </span>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">
          {template.name}
        </h3>
        
        <span className="text-green-600 font-medium">100% Free</span>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 rounded-lg border-2 flex items-center justify-center bg-blue-500/10 border-blue-500">
          <div className="text-white rounded-full p-1 bg-blue-500">
            <Check className="h-4 w-4" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TemplateCard;
