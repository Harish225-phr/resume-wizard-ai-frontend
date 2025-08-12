import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Download } from 'lucide-react';
import latexService from '@/services/latexService';
import { LatexTemplate } from '@/services/latexService';
import { AcademicResumeData } from '@/types/academicResume';
import { useLaTeXDownload } from '@/hooks/useLaTeXDownload';

interface LaTeXTemplateSelectionProps {
  formData: AcademicResumeData;
  onBack: () => void;
}

const LaTeXTemplateSelection: React.FC<LaTeXTemplateSelectionProps> = ({ formData, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<LatexTemplate | null>(null);
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();

  const templates = latexService.templates;

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (template: LatexTemplate) => {
    setPreviewTemplate(template);
  };

  const handleDownload = async (templateId: string) => {
    await downloadLaTeXPDF(templateId, formData);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern': return 'bg-blue-100 text-blue-800';
      case 'classic': return 'bg-green-100 text-green-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LaTeX Resume Templates
          </h1>
          <p className="text-gray-600 mb-4">
            Choose from our professional LaTeX templates for ATS-optimized resumes
          </p>
          <Badge className="bg-green-100 text-green-800">
            <FileText className="w-4 h-4 mr-1" />
            Professional LaTeX Templates
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Preview placeholder */}
                  <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">LaTeX Template</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(template)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      size="sm"
                      className={`flex-1 ${
                        selectedTemplate === template.id 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : ''
                      }`}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Ready to Generate</h3>
                <p className="text-gray-600">
                  Template: {templates.find(t => t.id === selectedTemplate)?.name}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onBack}>
                  Back to Editor
                </Button>
                <Button 
                  onClick={() => handleDownload(selectedTemplate)}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Download LaTeX PDF'}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>• High-quality LaTeX compilation</p>
              <p>• ATS-friendly formatting</p>
              <p>• Professional typography</p>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{previewTemplate.name}</h2>
                  <p className="text-gray-600">{previewTemplate.description}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close
                </Button>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2">Template Features:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Required packages: {previewTemplate.requiredPackages.join(', ')}</li>
                    <li>• Category: {previewTemplate.category}</li>
                    <li>• ATS-optimized formatting</li>
                    <li>• Professional typography</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      handleTemplateSelect(previewTemplate.id);
                      setPreviewTemplate(null);
                    }}
                    className="flex-1"
                  >
                    Select This Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaTeXTemplateSelection;