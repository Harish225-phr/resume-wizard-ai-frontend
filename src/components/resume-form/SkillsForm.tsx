import React, { useState } from 'react';
import { Star, Globe, Award, Heart, Code, Plus, X } from 'lucide-react';
import { FormData } from '@/types/resume';
import { Button } from '@/components/ui/button';

interface SkillsFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SkillsForm = ({ formData, handleInputChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');
  const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [];

  const addSkill = () => {
    if (newSkill.trim() && !skillsArray.includes(newSkill.trim())) {
      const updatedSkills = [...skillsArray, newSkill.trim()].join(', ');
      handleInputChange({ target: { name: 'skills', value: updatedSkills } } as any);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skillsArray.filter(skill => skill !== skillToRemove).join(', ');
    handleInputChange({ target: { name: 'skills', value: updatedSkills } } as any);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Skills & Additional Information
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Technical Skills *
          </label>
          
          {/* Skills Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., JavaScript, React, Communication"
            />
            <Button
              type="button"
              onClick={addSkill}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Skills Tags */}
          {skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {skillsArray.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Fallback textarea for manual entry */}
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Or enter skills manually separated by commas"
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
