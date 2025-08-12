
import React, { useState, useEffect } from 'react';
import { convertFormToAcademicData } from '@/utils/dataConverters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Download, FileText } from 'lucide-react';
import { FormData, Template } from '@/types/resume';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { useLaTeXDownload } from '@/hooks/useLaTeXDownload';
import ResumePreview from './ResumePreview';

interface ResumeEditorProps {
  formData: FormData;
  selectedTemplate: Template | null;
  onSave: (updatedData: FormData) => void;
  onBack: () => void;
}

const ResumeEditor = ({ formData, selectedTemplate, onSave, onBack }: ResumeEditorProps) => {
  const [editedData, setEditedData] = useState<FormData>(formData);
  const { downloadPDF, isGenerating } = usePDFDownload();
  const { downloadLaTeXPDF, isGenerating: isLaTeXGenerating } = useLaTeXDownload();

  useEffect(() => {
    setEditedData(formData);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...editedData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEditedData(prev => ({ ...prev, education: newEducation }));
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string) => {
    const newWorkExperience = [...editedData.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setEditedData(prev => ({ ...prev, workExperience: newWorkExperience }));
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...editedData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setEditedData(prev => ({ ...prev, projects: newProjects }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  const handleDownloadPDF = () => {
    downloadPDF('resume-preview-editor', {
      filename: `${editedData.fullName.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf',
      quality: 1,
      format: 'a4'
    });
  };

  const handleDownloadLaTeX = async () => {
    if (selectedTemplate?.latexTemplate) {
      const academicData = convertFormToAcademicData(editedData);
      await downloadLaTeXPDF(selectedTemplate.latexTemplate, academicData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Preview
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Your Resume</h2>
                <p className="text-gray-600">Make final adjustments to your resume content</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Download HTML PDF'}
              </Button>
              {selectedTemplate?.hasLatexSupport && (
                <Button
                  onClick={handleDownloadLaTeX}
                  disabled={isLaTeXGenerating}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4" />
                  {isLaTeXGenerating ? 'Generating...' : 'Download LaTeX PDF'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
              <div className="space-y-4">
                <Input
                  value={editedData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Full Name"
                  className="font-medium"
                />
                <Input
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email"
                />
                <Input
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Phone"
                />
                <Input
                  value={editedData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Address"
                />
              </div>
            </Card>

            {/* Career Objective */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Career Objective</h3>
              <Textarea
                value={editedData.careerObjective}
                onChange={(e) => handleInputChange('careerObjective', e.target.value)}
                placeholder="Career objective..."
                rows={4}
              />
            </Card>

            {/* Education */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Education</h3>
              <div className="space-y-4">
                {editedData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      placeholder="Degree"
                    />
                    <Input
                      value={edu.university}
                      onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                      placeholder="University"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={edu.duration}
                        onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                        placeholder="Duration"
                      />
                      <Input
                        value={edu.grade}
                        onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                        placeholder="Grade/CGPA"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Work Experience */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Work Experience</h3>
              <div className="space-y-4">
                {editedData.workExperience.map((exp, index) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                    <Input
                      value={exp.position}
                      onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                      placeholder="Position"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                      placeholder="Company"
                    />
                    <Input
                      value={exp.duration}
                      onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                      placeholder="Duration"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                      placeholder="Job description..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Skills</h3>
              <Textarea
                value={editedData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="Skills (comma-separated)"
                rows={3}
              />
            </Card>

            {/* Projects */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Projects</h3>
              <div className="space-y-4">
                {editedData.projects.map((project, index) => (
                  <div key={project.id} className="p-4 border rounded-lg space-y-3">
                    <Input
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      placeholder="Project Title"
                    />
                    <Input
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      placeholder="Project Link"
                    />
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      placeholder="Project description..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Live Preview</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[800px]">
                <div id="resume-preview-editor" className="scale-75 origin-top-left">
                  <ResumePreview formData={editedData} selectedTemplate={selectedTemplate} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
