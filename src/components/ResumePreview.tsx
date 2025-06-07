
import React from 'react';
import { FormData } from '@/types/resume';
import { User, Mail, Phone, GraduationCap, Briefcase, Target, Star } from 'lucide-react';

interface ResumePreviewProps {
  formData: FormData;
}

const ResumePreview = ({ formData }: ResumePreviewProps) => {
  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto border border-gray-200"
      style={{ minHeight: '842px', width: '595px' }} // A4 proportions
    >
      {/* Header Section */}
      <div className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {formData.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
          {formData.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {formData.email}
            </div>
          )}
          {formData.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {formData.phone}
            </div>
          )}
        </div>
      </div>

      {/* Career Objective */}
      {formData.careerObjective && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Target className="h-5 w-5" />
            Career Objective
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.careerObjective}</p>
        </div>
      )}

      {/* Education */}
      {formData.education && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <GraduationCap className="h-5 w-5" />
            Education
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.education}</p>
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Star className="h-5 w-5" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.split(',').map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {formData.experience && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.experience}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
