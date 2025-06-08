
import React from 'react';
import { Star, Globe, Award, Heart, Code } from 'lucide-react';
import { FormData } from '@/types/resume';

interface SkillsFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SkillsForm = ({ formData, handleInputChange }: SkillsFormProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Star className="mr-3 h-6 w-6 text-yellow-600" />
        Skills & Additional Information
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Technical Skills *
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., JavaScript, React, Python, Node.js, SQL, AWS"
            required
          />
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Languages Known
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., English (Fluent), Hindi (Native), Spanish (Basic)"
          />
        </div>

        <div>
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Award className="mr-2 h-4 w-4" />
            Certifications
          </label>
          <textarea
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., AWS Solutions Architect, Google Cloud Professional"
          />
        </div>

        <div>
          <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Hobbies & Interests
          </label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., Reading, Photography, Gaming, Traveling"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
