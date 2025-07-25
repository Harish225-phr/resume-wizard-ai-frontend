import React from 'react';
import { FormData, Template } from '@/types/resume';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Target, Star, Globe, Award, Heart, Code, ExternalLink, Edit3 } from 'lucide-react';

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
      color: '#333333',
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
        return `border-b-4 border-[${selectedTemplate.style.primaryColor}] bg-gray-50 text-gray-800`;
    }
  };

  const getSectionTitleStyle = () => {
    if (!selectedTemplate) return 'text-blue-600';
    return `text-[${selectedTemplate.style.primaryColor}]`;
  };

  return (
    <div className="flex justify-center w-full bg-gray-100 p-8">
      <div 
        id="resume-preview" 
        className="bg-white shadow-2xl border border-gray-200"
        style={{ 
          width: '210mm',
          minHeight: '297mm',
          maxWidth: '210mm',
          padding: '15mm',
          margin: '0 auto',
          boxSizing: 'border-box',
          fontSize: '12px',
          lineHeight: '1.6',
          color: '#333333',
          ...getTemplateStyles()
        }}
      >
        {/* Header Section */}
        <div className={`p-4 mb-3 ${getHeaderStyles()}`} style={{ margin: '-12mm -12mm 12px -12mm', padding: '12px' }}>
          <div className="flex items-center gap-4">
            {formData.photo && (
              <img 
                src={URL.createObjectURL(formData.photo)}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                {formData.fullName || 'Your Name'}
              </h1>
              <p className="text-sm opacity-90 mb-2" style={{ fontSize: '14px' }}>
                {selectedTemplate?.placeholders?.position || 'Professional'}
              </p>
              <div className="flex flex-wrap gap-3 text-xs opacity-80" style={{ fontSize: '9px' }}>
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
                <div className="flex items-center gap-1 text-xs opacity-80 mt-1" style={{ fontSize: '9px' }}>
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
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                <Target className="h-4 w-4" />
                Career Objective
              </h2>
              <p className="leading-relaxed text-justify" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333', marginBottom: '12px' }}>
                {formData.careerObjective}
              </p>
            </div>
          )}

          {/* Education */}
          <div className="mb-3">
            <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
              <GraduationCap className="h-4 w-4" />
              Education
            </h2>
            
            {/* Class 10th */}
            {(formData.education[0]?.class10Board || formData.education[0]?.class10Year || formData.education[0]?.class10Percentage) && (
              <div className="mb-3 p-3 bg-blue-50 rounded" style={{ fontSize: '11px', marginBottom: '10px' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#333333', fontSize: '12px' }}>Class 10th</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p style={{ color: '#555555', lineHeight: '1.4' }}>{formData.education[0]?.class10Board}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.4' }}>{formData.education[0]?.class10Year}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.4' }}>{formData.education[0]?.class10Percentage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Class 12th */}
            {(formData.education[0]?.class12Stream || formData.education[0]?.class12Board || formData.education[0]?.class12Year || formData.education[0]?.class12Percentage) && (
              <div className="mb-3 p-3 bg-green-50 rounded" style={{ fontSize: '11px', marginBottom: '10px' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#333333', fontSize: '12px' }}>Class 12th - {formData.education[0]?.class12Stream}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p style={{ color: '#555555', lineHeight: '1.4' }}>{formData.education[0]?.class12Board}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.4' }}>{formData.education[0]?.class12Year}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.4' }}>{formData.education[0]?.class12Percentage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* College/University Education */}
            {formData.education.filter(edu => edu.degree).map((edu, index) => (
              <div key={edu.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '11px', marginBottom: '10px' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4', marginBottom: '4px' }}>{edu.degree}</h3>
                    <p style={{ color: '#555555', lineHeight: '1.4' }}>{edu.university}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.4', marginBottom: '4px' }}>{edu.duration}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.4' }}>{edu.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          {!formData.hasNoWorkExperience && formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.company) && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
                <Briefcase className="h-4 w-4" />
                Work Experience
              </h2>
              {formData.workExperience.map((exp, index) => (
                exp.company && (
                  <div key={exp.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '11px', marginBottom: '10px' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold" style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4', marginBottom: '4px' }}>{exp.position}</h3>
                        <p className="font-medium" style={{ color: '#555555', lineHeight: '1.4' }}>{exp.company}</p>
                      </div>
                      <p className="bg-white px-2 py-1 rounded text-xs" style={{ color: '#555555', fontSize: '10px', lineHeight: '1.4' }}>{exp.duration}</p>
                    </div>
                    {exp.description && (
                      <p className="leading-relaxed" style={{ color: '#333333', lineHeight: '1.6', marginTop: '6px' }}>{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {formData.skills && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
                <Star className="h-4 w-4" />
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded text-xs bg-[${selectedTemplate?.style.primaryColor}]/10 border border-[${selectedTemplate?.style.primaryColor}]/20 font-medium`}
                    style={{ 
                      fontSize: '10px',
                      lineHeight: '1.4',
                      color: selectedTemplate?.style.primaryColor || '#2563eb',
                      backgroundColor: `${selectedTemplate?.style.primaryColor || '#2563eb'}10`,
                      borderColor: `${selectedTemplate?.style.primaryColor || '#2563eb'}20`
                    }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                <Globe className="h-4 w-4" />
                Languages
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.languages}</p>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && formData.projects.some(project => project.title) && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
                <Code className="h-4 w-4" />
                Projects
              </h2>
              {formData.projects.map((project, index) => (
                project.title && (
                  <div key={project.id} className="mb-3 p-3 bg-gray-50 rounded" style={{ fontSize: '11px', marginBottom: '10px' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold" style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4' }}>{project.title}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: selectedTemplate?.style.primaryColor || '#2563eb' }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="leading-relaxed" style={{ color: '#333333', lineHeight: '1.6' }}>{project.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Certifications */}
          {formData.certifications && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                <Award className="h-4 w-4" />
                Certifications
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.certifications}</p>
            </div>
          )}

          {/* Hobbies */}
          {formData.hobbies && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                <Heart className="h-4 w-4" />
                Hobbies & Interests
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.hobbies}</p>
            </div>
          )}

          {/* Custom Sections */}
          {formData.customSections && formData.customSections.length > 0 && formData.customSections.map((section) => (
            <div key={section.id} className="mb-3">
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                <Edit3 className="h-4 w-4" />
                {section.heading}
              </h2>
              <div 
                className="leading-relaxed" 
                style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}
                dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
