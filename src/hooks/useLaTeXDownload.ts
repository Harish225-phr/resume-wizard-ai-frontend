import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { latexService } from '@/services/latexService';
import { LaTeXGenerationOptions } from '@/types/latex';
import { FormData } from '@/types/resume';

export const useLaTeXDownload = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const downloadLaTeXPDF = async (
    templateId: string,
    formData: FormData,
    options: LaTeXGenerationOptions = { templateId, outputFormat: 'pdf', compiler: 'pdflatex' },
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating LaTeX PDF",
        description: "Compiling your professional resume...",
      });

      const result = await latexService.generatePDF(templateId, formData, options);
      
      if (result.success && result.pdfUrl) {
        // Create download link
        const link = document.createElement('a');
        link.href = result.pdfUrl;
        link.download = `resume-${templateId}-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "✅ LaTeX Resume Generated!",
          description: "Your professional resume has been compiled and downloaded.",
        });
        
        onSuccess?.();
      } else {
        throw new Error(result.error || 'Failed to generate LaTeX PDF');
      }
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
    formData: FormData
  ): Promise<string> => {
    const template = latexService.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }
    
    // This would return the generated LaTeX content for preview
    // For now, return the template content
    return template.templateContent;
  };

  return {
    downloadLaTeXPDF,
    previewLaTeXContent,
    isGenerating
  };
};