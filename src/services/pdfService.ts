
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
}

class PDFService {
  async generatePDF(elementId: string, options: PDFOptions = {}): Promise<void> {
    const {
      filename = 'resume.pdf',
      quality = 1,
      format = 'a4'
    } = options;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // Calculate dimensions for A4 format
    const imgWidth = format === 'a4' ? 210 : 216; // A4 width in mm
    const pageHeight = format === 'a4' ? 297 : 279; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: format,
    });

    const imgData = canvas.toDataURL('image/png', quality);
    
    // Add image to PDF
    if (imgHeight <= pageHeight) {
      // Single page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Multiple pages
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
    }

    // Download the PDF
    pdf.save(filename);
  }
}

export const pdfService = new PDFService();
