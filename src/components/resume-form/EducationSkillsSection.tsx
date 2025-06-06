
import { GraduationCap } from 'lucide-react';
import { FormData } from '@/types/resume';

interface EducationSkillsSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EducationSkillsSection = ({ formData, handleInputChange }: EducationSkillsSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <GraduationCap className="mr-3 h-6 w-6 text-purple-600" />
        Education & Skills
      </h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
            Education *
          </label>
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your educational background (degree, institution, year)"
            required
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
            Skills *
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="List your skills (comma separated)"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EducationSkillsSection;
