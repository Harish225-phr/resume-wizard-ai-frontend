
import React from 'react';
import { FormData, Template } from '@/types/resume';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Target, Star, Globe, Award, Heart, Code, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  formData: FormData;
  selectedTemplate?: Template | null;
}

const ResumePreview = ({ formData, selectedTemplate }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    if (!selectedTemplate) return {};
    
    return {
      fontFamily: selectedTemplate.style.fontFamily,
      color: selectedTemplate.style.primaryColor,
    };
  };

  const getHeaderStyles = () => {
    if (!selectedTemplate) return 'bg-blue-600 text-white';
    
    switch (selectedTemplate.style.layout) {
      case 'sidebar':
        return `bg-gradient-to-br from-[${selectedTemplate.style.primaryColor}] to-[${selectedTemplate.style.accentColor}] text-white`;
      case 'two-column':
        return `bg-[${selectedTemplate.style.primaryColor}] text-white`;
      default:
        return `border-b-4 border-[${selectedTemplate.style.primaryColor}] bg-gray-50`;
    }
  };

  const getSectionTitleStyle = () => {
    if (!selectedTemplate) return 'text-blue-600';
    return `text-[${selectedTemplate.style.primaryColor}]`;
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-2xl rounded-lg border border-gray-200 mx-auto"
      style={{ 
        minHeight: '842px', 
        width: '595px',
        ...getTemplateStyles()
      }}
    >
      {/* Header Section */}
      <div className={`p-8 ${getHeaderStyles()}`}>
        <div className="flex items-center gap-6">
          {formData.photo && (
            <img 
              src={URL.createObjectURL(formData.photo)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {formData.fullName || 'Your Name'}
            </h1>
            <p className="text-xl opacity-90 mb-3">
              {selectedTemplate?.placeholders?.position || 'Professional'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm opacity-80">
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
            {formData.address && (
              <div className="flex items-center gap-1 text-sm opacity-80 mt-2">
                <MapPin className="h-4 w-4" />
                {formData.address}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Career Objective */}
        {formData.careerObjective && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Target className="h-6 w-6" />
              Career Objective
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{formData.careerObjective}</p>
          </div>
        )}

        {/* Education */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
            <GraduationCap className="h-6 w-6" />
            Education
          </h2>
          
          {/* Class 10th */}
          {(formData.education[0]?.class10Board || formData.education[0]?.class10Year || formData.education[0]?.class10Percentage) && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Class 10th</h3>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-gray-600">{formData.education[0]?.class10Board}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{formData.education[0]?.class10Year}</p>
                  <p className="font-medium">{formData.education[0]?.class10Percentage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Class 12th */}
          {(formData.education[0]?.class12Stream || formData.education[0]?.class12Board || formData.education[0]?.class12Year || formData.education[0]?.class12Percentage) && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Class 12th - {formData.education[0]?.class12Stream}</h3>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-gray-600">{formData.education[0]?.class12Board}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{formData.education[0]?.class12Year}</p>
                  <p className="font-medium">{formData.education[0]?.class12Percentage}</p>
                </div>
              </div>
            </div>
          )}

          {/* College/University Education */}
          {formData.education.filter(edu => edu.degree).map((edu, index) => (
            <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.university}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.duration}</p>
                  <p className="font-medium">{edu.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        {!formData.hasNoWorkExperience && formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.company) && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Briefcase className="h-6 w-6" />
              Work Experience
            </h2>
            {formData.workExperience.map((exp, index) => (
              exp.company && (
                <div key={exp.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{exp.position}</h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">{exp.duration}</p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-sm">{exp.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Skills */}
        {formData.skills && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Star className="h-6 w-6" />
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.split(',').map((skill, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm bg-[${selectedTemplate?.style.primaryColor}]/10 text-[${selectedTemplate?.style.primaryColor}] border border-[${selectedTemplate?.style.primaryColor}]/20 font-medium`}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {formData.languages && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Globe className="h-6 w-6" />
              Languages
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.languages}</p>
          </div>
        )}

        {/* Projects */}
        {formData.projects.length > 0 && formData.projects.some(project => project.title) && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Code className="h-6 w-6" />
              Projects
            </h2>
            {formData.projects.map((project, index) => (
              project.title && (
                <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{project.title}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-[${selectedTemplate?.style.primaryColor}] hover:text-[${selectedTemplate?.style.accentColor}]`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Certifications */}
        {formData.certifications && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Award className="h-6 w-6" />
              Certifications
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.certifications}</p>
          </div>
        )}

        {/* Hobbies */}
        {formData.hobbies && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${getSectionTitleStyle()}`}>
              <Heart className="h-6 w-6" />
              Hobbies & Interests
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.hobbies}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
