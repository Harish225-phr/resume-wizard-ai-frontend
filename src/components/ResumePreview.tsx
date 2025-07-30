import React from 'react';
import { FormData, Template } from '@/types/resume';

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
        <div className={`p-6 mb-6 ${getHeaderStyles()}`} style={{ margin: '-15mm -15mm 20px -15mm', padding: '20px' }}>
          <div className="flex items-center gap-6">
            {formData.photo && (
              <img 
                src={URL.createObjectURL(formData.photo)}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                style={{ minWidth: '80px', minHeight: '80px' }}
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2" style={{ fontSize: '26px', lineHeight: '1.3', marginBottom: '8px' }}>
                {formData.fullName || 'Your Name'}
              </h1>
              <p className="text-lg opacity-90 mb-3" style={{ fontSize: '16px', marginBottom: '12px' }}>
                {selectedTemplate?.placeholders?.position || 'Professional'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm opacity-80" style={{ fontSize: '12px', gap: '16px' }}>
                {formData.email && (
                  <div className="flex items-center gap-2">
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-2">
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>
              {formData.address && (
                <div className="flex items-center gap-2 text-sm opacity-80 mt-2" style={{ fontSize: '12px', marginTop: '8px' }}>
                  <span>{formData.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Career Objective */}
          {formData.careerObjective && (
            <div className="mb-6">
              <h2 className={`text-lg font-bold mb-4 ${getSectionTitleStyle()}`} style={{ fontSize: '16px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '12px' }}>
                Career Objective
              </h2>
              <p className="leading-relaxed text-justify" style={{ fontSize: '13px', lineHeight: '1.7', color: '#333333', marginBottom: '16px' }}>
                {formData.careerObjective}
              </p>
            </div>
          )}

          {/* Education */}
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-4 ${getSectionTitleStyle()}`} style={{ fontSize: '16px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '12px' }}>
              Education
            </h2>
            
            {/* Class 10th */}
            {(formData.education[0]?.class10Board || formData.education[0]?.class10Year || formData.education[0]?.class10Percentage) && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg" style={{ fontSize: '12px', marginBottom: '14px', padding: '16px' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#333333', fontSize: '14px', marginBottom: '12px' }}>Class 10th</h3>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p style={{ color: '#555555', lineHeight: '1.5' }}>{formData.education[0]?.class10Board}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.5', marginBottom: '4px' }}>{formData.education[0]?.class10Year}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.5' }}>{formData.education[0]?.class10Percentage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Class 12th */}
            {(formData.education[0]?.class12Stream || formData.education[0]?.class12Board || formData.education[0]?.class12Year || formData.education[0]?.class12Percentage) && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg" style={{ fontSize: '12px', marginBottom: '14px', padding: '16px' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#333333', fontSize: '14px', marginBottom: '12px' }}>Class 12th - {formData.education[0]?.class12Stream}</h3>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p style={{ color: '#555555', lineHeight: '1.5' }}>{formData.education[0]?.class12Board}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.5', marginBottom: '4px' }}>{formData.education[0]?.class12Year}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.5' }}>{formData.education[0]?.class12Percentage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* College/University Education */}
            {formData.education.filter(edu => edu.degree).map((edu, index) => (
              <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg" style={{ fontSize: '12px', marginBottom: '14px', padding: '16px' }}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: '#333333', fontSize: '14px', lineHeight: '1.5', marginBottom: '8px' }}>{edu.degree}</h3>
                    <p style={{ color: '#555555', lineHeight: '1.5' }}>{edu.university}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#555555', lineHeight: '1.5', marginBottom: '4px' }}>{edu.duration}</p>
                    <p className="font-medium" style={{ color: '#333333', lineHeight: '1.5' }}>{edu.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          {!formData.hasNoWorkExperience && formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.company) && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
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
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2 justify-start">
                {formData.skills.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{ 
                      fontSize: '11px',
                      lineHeight: '1.4',
                      color: selectedTemplate?.style.primaryColor || '#2563eb',
                      backgroundColor: `${selectedTemplate?.style.primaryColor || '#2563eb'}10`,
                      border: `1px solid ${selectedTemplate?.style.primaryColor || '#2563eb'}20`
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
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                Languages
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.languages}</p>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && formData.projects.some(project => project.title) && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '10px' }}>
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
                          className="text-xs underline"
                        >
                          View Project
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
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                Certifications
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.certifications}</p>
            </div>
          )}

          {/* Hobbies */}
          {formData.hobbies && (
            <div className="mb-3">
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
                Hobbies & Interests
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333333' }}>{formData.hobbies}</p>
            </div>
          )}

          {/* Custom Sections */}
          {formData.customSections && formData.customSections.length > 0 && formData.customSections.map((section) => (
            <div key={section.id} className="mb-3">
              <h2 className={`text-sm font-bold mb-3 ${getSectionTitleStyle()}`} style={{ fontSize: '14px', color: selectedTemplate?.style.primaryColor || '#2563eb', marginBottom: '8px' }}>
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
