
import { Target, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormData, PaymentState } from '@/types/resume';

interface CareerObjectiveSectionProps {
  formData: FormData;
  paymentState: PaymentState;
  isGeneratingObjective: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  generateObjective: () => void;
}

const CareerObjectiveSection = ({ 
  formData, 
  paymentState, 
  isGeneratingObjective, 
  handleInputChange, 
  generateObjective 
}: CareerObjectiveSectionProps) => {
  return (
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
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={generateObjective}
            disabled={isGeneratingObjective}
            variant="outline"
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 relative overflow-hidden group"
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
            {!paymentState.hasAIObjectiveAccess && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>
          {!paymentState.hasAIObjectiveAccess && (
            <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
              🔥 Limited Time: Save ₹10!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerObjectiveSection;
