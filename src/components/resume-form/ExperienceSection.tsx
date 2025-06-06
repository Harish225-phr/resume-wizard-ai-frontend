
import { Briefcase } from 'lucide-react';
import { FormData } from '@/types/resume';

interface ExperienceSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ExperienceSection = ({ formData, handleInputChange }: ExperienceSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Briefcase className="mr-3 h-6 w-6 text-green-600" />
        Work Experience
      </h2>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Work Experience (Optional)
        </label>
        <textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Describe your work experience (job title, company, dates, responsibilities)"
        />
      </div>
    </div>
  );
};

export default ExperienceSection;
