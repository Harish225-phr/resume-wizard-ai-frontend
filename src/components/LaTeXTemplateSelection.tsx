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
  const { downloadLaTeXPDF, isGenerating } = useLaTeXDownload();

  const templates = latexService.templates;

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (template: LatexTemplate) => {
    // Use the actual LaTeX preview function to show rendered template
    latexService.preview(formData, template.id);
  };

  const handleDownload = async (templateId: string) => {
    await downloadLaTeXPDF(templateId, formData);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern': return 'bg-primary/10 text-primary border-primary/20';
      case 'classic': return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'creative': return 'bg-accent/10 text-accent-foreground border-accent/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            LaTeX Resume Templates
          </h1>
          <p className="text-muted-foreground mb-4">
            Choose from our professional LaTeX templates for ATS-optimized resumes
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
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
                  ? 'ring-2 ring-primary shadow-lg' 
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
                  <div className="w-full h-40 bg-muted/30 rounded-lg flex items-center justify-center border border-border">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">LaTeX Template</p>
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
                        ? 'bg-primary hover:bg-primary/90' 
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
          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ready to Generate</h3>
                <p className="text-muted-foreground">
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
                  className="bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Download LaTeX PDF'}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• High-quality LaTeX compilation</p>
              <p>• ATS-friendly formatting</p>
              <p>• Professional typography</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaTeXTemplateSelection;