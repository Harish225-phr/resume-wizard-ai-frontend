
import React from 'react';
import { FormData, Template } from '@/types/resume';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Target, Star, Globe, Award, Heart, Code, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  formData: FormData;
  selectedTemplate?: Template | null;
}

const ResumePreview = ({ formData, selectedTemplate }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    if (!selectedTemplate) return { fontFamily: 'Inter, system-ui, sans-serif' };
    
    return {
      fontFamily: selectedTemplate.style.fontFamily === 'Inter' ? 'Inter, system-ui, sans-serif' :
                 selectedTemplate.style.fontFamily === 'Roboto' ? 'Roboto, system-ui, sans-serif' :
                 selectedTemplate.style.fontFamily === 'Lato' ? 'Lato, system-ui, sans-serif' :
                 'Inter, system-ui, sans-serif',
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
    <div className="flex justify-center w-full">
      <div 
        id="resume-preview" 
        className="bg-white shadow-2xl border border-gray-200"
        style={{ 
          width: '210mm',
          minHeight: '297mm',
          maxWidth: '210mm',
          padding: '20mm',
          margin: '0 auto',
          boxSizing: 'border-box',
          fontSize: '11px',
          lineHeight: '1.4',
          ...getTemplateStyles()
        }}
      >
        {/* Header Section */}
        <div className={`p-6 mb-6 ${getHeaderStyles()}`} style={{ margin: '-20mm -20mm 20px -20mm', padding: '20px' }}>
          <div className="flex items-center gap-6">
            {formData.photo && (
              <img 
                src={URL.createObjectURL(formData.photo)}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1" style={{ fontSize: '24px', lineHeight: '1.2' }}>
                {formData.fullName || 'Your Name'}
              </h1>
              <p className="text-lg opacity-90 mb-2" style={{ fontSize: '16px' }}>
                {selectedTemplate?.placeholders?.position || 'Professional'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm opacity-80" style={{ fontSize: '10px' }}>
                {formData.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {formData.email}
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {formData.phone}
                  </div>
                )}
              </div>
              {formData.address && (
                <div className="flex items-center gap-1 text-sm opacity-80 mt-1" style={{ fontSize: '10px' }}>
                  <MapPin className="h-3 w-3" />
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Career Objective */}
          {formData.careerObjective && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Target className="h-4 w-4" />
                Career Objective
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify" style={{ fontSize: '10px', lineHeight: '1.5' }}>
                {formData.careerObjective}
              </p>
            </div>
          )}

          {/* Education */}
          <div className="mb-4">
            <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
              <GraduationCap className="h-4 w-4" />
              Education
            </h2>
            
            {/* Class 10th */}
            {(formData.education[0]?.class10Board || formData.education[0]?.class10Year || formData.education[0]?.class10Percentage) && (
              <div className="mb-3 p-3 bg-blue-50 rounded" style={{ fontSize: '10px' }}>
                <h3 className="font-semibold text-gray-800 mb-1">Class 10th</h3>
                <div className="flex justify-between items-center">
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
              <div className="mb-3 p-3 bg-green-50 rounded" style={{ fontSize: '10px' }}>
                <h3 className="font-semibold text-gray-800 mb-1">Class 12th - {formData.education[0]?.class12Stream}</h3>
                <div className="flex justify-between items-center">
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
              <div key={edu.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '10px' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.university}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.duration}</p>
                    <p className="font-medium">{edu.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          {!formData.hasNoWorkExperience && formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.company) && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Briefcase className="h-4 w-4" />
                Work Experience
              </h2>
              {formData.workExperience.map((exp, index) => (
                exp.company && (
                  <div key={exp.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '10px' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <p className="text-gray-600 bg-white px-2 py-1 rounded text-xs">{exp.duration}</p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {formData.skills && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Star className="h-4 w-4" />
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {formData.skills.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 rounded text-xs bg-[${selectedTemplate?.style.primaryColor}]/10 text-[${selectedTemplate?.style.primaryColor}] border border-[${selectedTemplate?.style.primaryColor}]/20 font-medium`}
                    style={{ fontSize: '9px' }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Globe className="h-4 w-4" />
                Languages
              </h2>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: '10px' }}>{formData.languages}</p>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && formData.projects.some(project => project.title) && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Code className="h-4 w-4" />
                Projects
              </h2>
              {formData.projects.map((project, index) => (
                project.title && (
                  <div key={project.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '10px' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{project.title}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-[${selectedTemplate?.style.primaryColor}] hover:text-[${selectedTemplate?.style.accentColor}]`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Certifications */}
          {formData.certifications && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Award className="h-4 w-4" />
                Certifications
              </h2>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: '10px' }}>{formData.certifications}</p>
            </div>
          )}

          {/* Hobbies */}
          {formData.hobbies && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px' }}>
                <Heart className="h-4 w-4" />
                Hobbies & Interests
              </h2>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: '10px' }}>{formData.hobbies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
