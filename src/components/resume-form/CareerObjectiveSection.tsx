
import { Target, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/resume';

interface CareerObjectiveSectionProps {
  formData: FormData;
  isGeneratingObjective: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  generateObjective: () => void;
}

const CareerObjectiveSection = ({ 
  formData, 
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
            placeholder="Describe your career goals and aspirations..."
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={generateObjective}
            disabled={isGeneratingObjective}
            variant="outline"
            className="border-2 border-green-300 text-green-700 hover:bg-green-50"
          >
            {isGeneratingObjective ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGeneratingObjective ? 'Generating...' : 'Generate with AI - 100% Free!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerObjectiveSection;
