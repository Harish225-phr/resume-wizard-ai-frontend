
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Save, Download } from 'lucide-react';
import { FormData, Template } from '@/types/resume';
import { usePDFDownload } from '@/hooks/usePDFDownload';

interface ResumeRichEditorProps {
  formData: FormData;
  selectedTemplate: Template | null;
  onSave: (updatedData: FormData) => void;
  onBack: () => void;
}

const ResumeRichEditor = ({ formData, selectedTemplate, onSave, onBack }: ResumeRichEditorProps) => {
  const { downloadPDF, isGenerating } = usePDFDownload();
  const [content, setContent] = useState('');

  useEffect(() => {
    // Generate HTML content from formData
    const htmlContent = generateHTMLFromFormData(formData, selectedTemplate);
    setContent(htmlContent);
  }, [formData, selectedTemplate]);

  const generateHTMLFromFormData = (data: FormData, template: Template | null) => {
    const primaryColor = template?.style.primaryColor || '#2563eb';
    
    return `
      <div style="font-family: 'Inter', sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <!-- Header Section -->
        <div style="background: ${primaryColor}; color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
          <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">${data.fullName || 'Your Name'}</h1>
          <p style="margin: 0 0 10px 0; font-size: 16px; opacity: 0.9;">${template?.placeholders?.position || 'Professional'}</p>
          <div style="font-size: 14px;">
            ${data.email ? `<span style="margin-right: 20px;">📧 ${data.email}</span>` : ''}
            ${data.phone ? `<span style="margin-right: 20px;">📞 ${data.phone}</span>` : ''}
          </div>
          ${data.address ? `<div style="font-size: 14px; margin-top: 5px;">📍 ${data.address}</div>` : ''}
        </div>

        <!-- Career Objective -->
        ${data.careerObjective ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">🎯 Career Objective</h2>
          <p style="font-size: 14px; line-height: 1.6; text-align: justify;">${data.careerObjective}</p>
        </div>
        ` : ''}

        <!-- Education -->
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">🎓 Education</h2>
          
          ${data.education[0]?.class10Board ? `
          <div style="background: #f0f9ff; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">Class 10th</h3>
            <div style="display: flex; justify-content: space-between;">
              <span>${data.education[0].class10Board}</span>
              <span><strong>${data.education[0].class10Percentage}</strong> (${data.education[0].class10Year})</span>
            </div>
          </div>
          ` : ''}

          ${data.education[0]?.class12Stream ? `
          <div style="background: #f0fdf4; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">Class 12th - ${data.education[0].class12Stream}</h3>
            <div style="display: flex; justify-content: space-between;">
              <span>${data.education[0].class12Board}</span>
              <span><strong>${data.education[0].class12Percentage}</strong> (${data.education[0].class12Year})</span>
            </div>
          </div>
          ` : ''}

          ${data.education.filter(edu => edu.degree).map(edu => `
          <div style="background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <h3 style="font-weight: bold; margin-bottom: 2px;">${edu.degree}</h3>
                <p style="margin: 0; color: #666;">${edu.university}</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; color: #666;">${edu.duration}</p>
                <p style="margin: 0; font-weight: bold;">${edu.grade}</p>
              </div>
            </div>
          </div>
          `).join('')}
        </div>

        <!-- Work Experience -->
        ${!data.hasNoWorkExperience && data.workExperience.some(exp => exp.company) ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">💼 Work Experience</h2>
          ${data.workExperience.filter(exp => exp.company).map(exp => `
          <div style="background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <div>
                <h3 style="font-weight: bold; margin-bottom: 2px;">${exp.position}</h3>
                <p style="margin: 0; color: #666; font-weight: 500;">${exp.company}</p>
              </div>
              <span style="background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">${exp.duration}</span>
            </div>
            ${exp.description ? `<p style="margin: 0; font-size: 14px; line-height: 1.5;">${exp.description}</p>` : ''}
          </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Skills -->
        ${data.skills ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">⭐ Technical Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.skills.split(',').map(skill => `
            <span style="background: ${primaryColor}20; color: ${primaryColor}; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; border: 1px solid ${primaryColor}40;">
              ${skill.trim()}
            </span>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Projects -->
        ${data.projects.some(project => project.title) ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">💻 Projects</h2>
          ${data.projects.filter(project => project.title).map(project => `
          <div style="background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
              <h3 style="font-weight: bold; margin: 0;">${project.title}</h3>
              ${project.link ? `<a href="${project.link}" style="color: ${primaryColor}; font-size: 12px;">🔗 View</a>` : ''}
            </div>
            ${project.description ? `<p style="margin: 0; font-size: 14px; line-height: 1.5;">${project.description}</p>` : ''}
          </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Languages -->
        ${data.languages ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">🌐 Languages</h2>
          <p style="font-size: 14px; line-height: 1.6;">${data.languages}</p>
        </div>
        ` : ''}

        <!-- Certifications -->
        ${data.certifications ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">🏆 Certifications</h2>
          <p style="font-size: 14px; line-height: 1.6;">${data.certifications}</p>
        </div>
        ` : ''}

        <!-- Hobbies -->
        ${data.hobbies ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px;">❤️ Hobbies & Interests</h2>
          <p style="font-size: 14px; line-height: 1.6;">${data.hobbies}</p>
        </div>
        ` : ''}
      </div>
    `;
  };

  const handleSave = () => {
    // For now, just save and go back to preview
    // In a real implementation, you'd parse the HTML content back to FormData
    onSave(formData);
  };

  const handleDownloadPDF = () => {
    // Create a temporary div with the editor content for PDF generation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    tempDiv.id = 'temp-resume-content';
    tempDiv.style.cssText = 'position: absolute; left: -9999px; width: 210mm; padding: 20px;';
    document.body.appendChild(tempDiv);

    downloadPDF('temp-resume-content', {
      filename: `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf',
      quality: 1,
      format: 'a4'
    }).finally(() => {
      document.body.removeChild(tempDiv);
    });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'code-block'
  ];

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
                <p className="text-gray-600">Use the rich text editor to customize your resume content</p>
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
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>

        {/* Rich Text Editor */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Resume Content Editor</h3>
          <div className="bg-white rounded-lg">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              style={{
                height: '600px',
                marginBottom: '50px'
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeRichEditor;
