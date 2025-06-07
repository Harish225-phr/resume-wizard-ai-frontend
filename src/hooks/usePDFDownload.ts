
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { pdfService, PDFOptions } from '@/services/pdfService';

export const usePDFDownload = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const downloadPDF = async (
    elementId: string, 
    options: PDFOptions = {},
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating PDF",
        description: "Creating your resume PDF...",
      });

      await pdfService.generatePDF(elementId, options);
      
      toast({
        title: "✅ Your resume has been downloaded!",
        description: "PDF saved successfully to your downloads folder.",
      });
      
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF';
      
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      onError?.(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    downloadPDF,
    isGenerating
  };
};
