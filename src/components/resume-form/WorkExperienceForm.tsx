
import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData, WorkExperience } from '@/types/resume';

interface WorkExperienceFormProps {
  formData: FormData;
  handleWorkExperienceChange: (index: number, field: keyof WorkExperience, value: string) => void;
  addWorkExperience: () => void;
  removeWorkExperience: (index: number) => void;
  handleNoExperienceChange: (checked: boolean) => void;
}

const WorkExperienceForm = ({ 
  formData, 
  handleWorkExperienceChange, 
  addWorkExperience, 
  removeWorkExperience,
  handleNoExperienceChange 
}: WorkExperienceFormProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Work Experience
        </h2>
        {!formData.hasNoWorkExperience && (
          <Button
            type="button"
            onClick={addWorkExperience}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Checkbox
          id="noExperience"
          checked={formData.hasNoWorkExperience}
          onCheckedChange={handleNoExperienceChange}
        />
        <label htmlFor="noExperience" className="text-sm font-medium text-gray-700">
          I have no work experience
        </label>
      </div>

      {!formData.hasNoWorkExperience && formData.workExperience.map((exp, index) => (
        <div key={exp.id} className="border border-gray-200 rounded-xl p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Experience {index + 1}</h3>
            {formData.workExperience.length > 1 && (
              <Button
                type="button"
                onClick={() => removeWorkExperience(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Google Inc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Software Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Jan 2022 - Present"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe your responsibilities and achievements..."
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceForm;
