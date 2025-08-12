import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import latexService from '@/services/latexService';
import { LaTeXGenerationOptions } from '@/types/latex';
import { AcademicResumeData } from '@/types/academicResume';

export const useLaTeXDownload = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const downloadLaTeXPDF = async (
    templateId: string,
    formData: AcademicResumeData,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating LaTeX PDF",
        description: "Compiling your professional resume...",
      });

      const result = await latexService.generatePDF(formData, templateId);
      
      // Create download link using blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(result);
      link.download = `resume-${templateId}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      toast({
        title: "✅ LaTeX Resume Generated!",
        description: "Your professional resume has been compiled and downloaded.",
      });
      
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate LaTeX PDF';
      
      toast({
        title: "LaTeX Compilation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      onError?.(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const previewLaTeXContent = async (
    templateId: string,
    formData: AcademicResumeData
  ): Promise<void> => {
    const template = latexService.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }
    
    // Use the preview function from service
    latexService.preview(formData, templateId);
  };

  return {
    downloadLaTeXPDF,
    previewLaTeXContent,
    isGenerating
  };
};