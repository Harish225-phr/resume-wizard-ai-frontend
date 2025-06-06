
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Sparkles } from 'lucide-react';
import { Template } from '@/types/resume';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
  hasPremiumAccess: boolean;
}

const TemplateCard = ({ template, isSelected, onSelect, hasPremiumAccess }: TemplateCardProps) => {
  const canSelect = template.type === 'free' || hasPremiumAccess;
  const isPremium = template.type === 'premium';
  
  return (
    <Card 
      className={`relative p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-xl'
      } ${!canSelect ? 'opacity-75' : ''} ${
        isPremium ? 'border-2 border-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-2xl hover:shadow-yellow-500/25' : ''
      }`}
      onClick={() => canSelect && onSelect(template)}
      style={isPremium ? {
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
      } : undefined}
    >
      {isPremium && (
        <>
          <Badge variant="secondary" className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
            <Crown className="mr-1 h-3 w-3" />
            Premium
          </Badge>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"></div>
          <Sparkles className="absolute top-2 left-2 h-4 w-4 text-yellow-600 animate-pulse" />
        </>
      )}
      
      <div className={`aspect-[3/4] rounded-lg mb-3 flex items-center justify-center transition-all duration-300 ${
        isPremium 
          ? 'bg-gradient-to-b from-yellow-100 to-orange-100 border-2 border-yellow-300' 
          : 'bg-gradient-to-b from-gray-100 to-gray-200'
      }`}>
        <span className={`text-sm font-medium ${
          isPremium ? 'text-orange-700' : 'text-gray-500'
        }`}>
          {template.preview}
        </span>
      </div>
      
      <div className="space-y-2">
        <h3 className={`font-semibold ${isPremium ? 'text-orange-800' : 'text-gray-800'}`}>
          {template.name}
        </h3>
        
        {isPremium ? (
          <div className="flex items-center justify-between">
            <span className="text-orange-600 font-bold">₹{template.price}</span>
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

        {isPremium && !hasPremiumAccess && (
          <div className="text-xs text-orange-600 space-y-1">
            <div>• No watermark</div>
            <div>• DOCX export</div>
            <div>• Color options</div>
          </div>
        )}
      </div>
      
      {isSelected && (
        <div className={`absolute inset-0 rounded-lg border-2 flex items-center justify-center ${
          isPremium 
            ? 'bg-orange-500/10 border-orange-500' 
            : 'bg-blue-500/10 border-blue-500'
        }`}>
          <div className={`text-white rounded-full p-1 ${
            isPremium ? 'bg-orange-500' : 'bg-blue-500'
          }`}>
            <Check className="h-4 w-4" />
          </div>
        </div>
      )}

      {isPremium && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-500/0 rounded-lg pointer-events-none"></div>
      )}
    </Card>
  );
};

export default TemplateCard;
