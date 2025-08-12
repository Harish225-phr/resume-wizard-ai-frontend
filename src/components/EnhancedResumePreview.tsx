import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Eye, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { AcademicResumeData } from '@/types/academicResume';
import { useLaTeXDownload } from '@/hooks/useLaTeXDownload';

interface EnhancedResumePreviewProps {
  formData: AcademicResumeData;
  selectedTemplate?: string;
  onATSAnalysis?: () => void;
}

const EnhancedResumePreview: React.FC<EnhancedResumePreviewProps> = ({ 
  formData, 
  selectedTemplate = 'academic',
  onATSAnalysis 
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { downloadLaTeXPDF, previewLaTeXContent, isGenerating } = useLaTeXDownload();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleReset = () => {
    setZoomLevel(100);
  };

  const handlePreview = async () => {
    try {
      await previewLaTeXContent(selectedTemplate, formData);
    } catch (error) {
      console.error('Preview error:', error);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadLaTeXPDF(selectedTemplate, formData);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-full'}`}>
      {/* Toolbar */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Resume Preview</CardTitle>
              <Badge variant="secondary" className="ml-2">
                {selectedTemplate} Template
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium px-2 min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  title="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Enhanced Preview
              </Button>

              {onATSAnalysis && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onATSAnalysis}
                  className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                >
                  <FileText className="w-4 h-4" />
                  Check ATS Score
                </Button>
              )}

              <Button
                size="sm"
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Preview Content */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full">
          <div 
            className="w-full h-full overflow-auto bg-gray-100 flex justify-center items-start p-8"
            style={{ minHeight: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}
          >
            <div
              ref={previewRef}
              className="bg-white shadow-2xl border border-gray-200 transition-transform duration-200"
              style={{
                width: '210mm',
                minHeight: '297mm',
                maxWidth: '210mm',
                padding: '15mm',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                ...getResumeStyles()
              }}
            >
              {/* Resume Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {formData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {formData.personalInfo.email && (
                      <span>{formData.personalInfo.email}</span>
                    )}
                    {formData.personalInfo.phone && (
                      <span>{formData.personalInfo.phone}</span>
                    )}
                    {formData.personalInfo.linkedinUrl && (
                      <span>{formData.personalInfo.linkedinUrl}</span>
                    )}
                    {formData.personalInfo.githubUrl && (
                      <span>{formData.personalInfo.githubUrl}</span>
                    )}
                  </div>
                </div>

                {/* Education */}
                {formData.education && formData.education.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      Education
                    </h2>
                    {formData.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-700">{edu.institute}</p>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <p>{edu.year}</p>
                            {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {formData.experience && formData.experience.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      Experience
                    </h2>
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                            <p className="text-gray-700">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-600">{exp.duration}</span>
                        </div>
                        {exp.description && exp.description.length > 0 && (
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            {exp.description.map((desc, i) => (
                              <li key={i} className="list-disc">{desc}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {formData.skills && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      Skills
                    </h2>
                    <div className="space-y-2 text-sm">
                      {formData.skills.languages && formData.skills.languages.length > 0 && (
                        <div>
                          <strong>Programming Languages: </strong>
                          {formData.skills.languages.join(', ')}
                        </div>
                      )}
                      {formData.skills.frontend && formData.skills.frontend.length > 0 && (
                        <div>
                          <strong>Frontend Technologies: </strong>
                          {formData.skills.frontend.join(', ')}
                        </div>
                      )}
                      {formData.skills.backend && formData.skills.backend.length > 0 && (
                        <div>
                          <strong>Backend Technologies: </strong>
                          {formData.skills.backend.join(', ')}
                        </div>
                      )}
                      {formData.skills.tools && formData.skills.tools.length > 0 && (
                        <div>
                          <strong>Tools & Technologies: </strong>
                          {formData.skills.tools.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {formData.projects && formData.projects.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      Projects
                    </h2>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          {project.duration && (
                            <span className="text-sm text-gray-600">{project.duration}</span>
                          )}
                        </div>
                        {project.description && project.description.length > 0 && (
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            {project.description.map((desc, i) => (
                              <li key={i} className="list-disc">{desc}</li>
                            ))}
                          </ul>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Technologies:</strong> {project.technologies.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Achievements */}
                {formData.achievements && formData.achievements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
                      Achievements
                    </h2>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      {formData.achievements.map((achievement, index) => (
                        <li key={index} className="list-disc">
                          <strong>{achievement.title}</strong>
                          {achievement.description && ` - ${achievement.description}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Template-specific styling
const getResumeStyles = () => {
  return {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '11pt',
    lineHeight: '1.4',
    color: '#333333'
  };
};

export default EnhancedResumePreview;