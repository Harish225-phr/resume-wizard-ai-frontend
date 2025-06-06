
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Check } from 'lucide-react';
import { Template } from '@/types/resume';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
  hasPremiumAccess: boolean;
}

const TemplateCard = ({ template, isSelected, onSelect, hasPremiumAccess }: TemplateCardProps) => {
  const canSelect = template.type === 'free' || hasPremiumAccess;
  
  return (
    <Card 
      className={`relative p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
      } ${!canSelect ? 'opacity-75' : ''}`}
      onClick={() => canSelect && onSelect(template)}
    >
      {template.type === 'premium' && (
        <Badge variant="secondary" className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Crown className="mr-1 h-3 w-3" />
          Premium
        </Badge>
      )}
      
      <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
        <span className="text-gray-500 text-sm">{template.preview}</span>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800">{template.name}</h3>
        
        {template.type === 'premium' ? (
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium">₹{template.price}</span>
            {hasPremiumAccess && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <Check className="h-4 w-4" />
                Unlocked
              </div>
            )}
          </div>
        ) : (
          <span className="text-green-600 font-medium">Free</span>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500/10 rounded-lg border-2 border-blue-500 flex items-center justify-center">
          <div className="bg-blue-500 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TemplateCard;
