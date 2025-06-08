
import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormData, Education } from '@/types/resume';

interface EducationFormProps {
  formData: FormData;
  handleEducationChange: (index: number, field: keyof Education, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
}

const EducationForm = ({ formData, handleEducationChange, addEducation, removeEducation }: EducationFormProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <GraduationCap className="mr-3 h-6 w-6 text-purple-600" />
          Education
        </h2>
        <Button
          type="button"
          onClick={addEducation}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {formData.education.map((edu, index) => (
        <div key={edu.id} className="border border-gray-200 rounded-xl p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <Button
                type="button"
                onClick={() => removeEducation(index)}
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
                Degree/Course *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., B.Tech Computer Science"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University/Institution *
              </label>
              <input
                type="text"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., IIT Delhi"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={edu.duration}
                onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., 2020-2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade/CGPA *
              </label>
              <input
                type="text"
                value={edu.grade}
                onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., 8.5 CGPA or 85%"
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
