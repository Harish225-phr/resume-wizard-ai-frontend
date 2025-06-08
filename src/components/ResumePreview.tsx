
import React from 'react';
import { FormData } from '@/types/resume';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Target, Star, Globe, Award, Heart, Code, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  formData: FormData;
}

const ResumePreview = ({ formData }: ResumePreviewProps) => {
  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto border border-gray-200"
      style={{ minHeight: '842px', width: '595px' }}
    >
      {/* Header Section */}
      <div className="text-center mb-6 pb-4 border-b border-gray-300">
        <div className="flex items-center justify-center gap-6 mb-4">
          {formData.photo && (
            <img 
              src={URL.createObjectURL(formData.photo)}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {formData.fullName || 'Your Name'}
            </h1>
            {formData.address && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                {formData.address}
              </div>
            )}
          </div>
        </div>
        
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
      {formData.education.length > 0 && formData.education.some(edu => edu.degree) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <GraduationCap className="h-5 w-5" />
            Education
          </h2>
          {formData.education.map((edu, index) => (
            edu.degree && (
              <div key={edu.id} className="mb-3 last:mb-0">
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
            )
          ))}
        </div>
      )}

      {/* Work Experience */}
      {!formData.hasNoWorkExperience && formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.company) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h2>
          {formData.workExperience.map((exp, index) => (
            exp.company && (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">{exp.duration}</p>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Star className="h-5 w-5" />
            Technical Skills
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

      {/* Languages */}
      {formData.languages && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Globe className="h-5 w-5" />
            Languages
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.languages}</p>
        </div>
      )}

      {/* Projects */}
      {formData.projects.length > 0 && formData.projects.some(project => project.title) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Code className="h-5 w-5" />
            Projects
          </h2>
          {formData.projects.map((project, index) => (
            project.title && (
              <div key={project.id} className="mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {formData.certifications && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Award className="h-5 w-5" />
            Certifications
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.certifications}</p>
        </div>
      )}

      {/* Hobbies */}
      {formData.hobbies && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Heart className="h-5 w-5" />
            Hobbies & Interests
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
