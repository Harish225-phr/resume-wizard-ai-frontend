
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

    // Configure html2canvas options for better quality and A4 format
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      windowWidth: 794,
      windowHeight: 1123,
    });

    // A4 dimensions in mm
    const imgWidth = 210; 
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png', quality);
    
    // Add image to PDF with proper scaling
    if (imgHeight <= pageHeight) {
      // Single page - fits perfectly
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Multiple pages needed
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;

      while (heightLeft >= 0) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        pageNumber++;
      }
    }

    // Download the PDF
    pdf.save(filename);
  }
}

export const pdfService = new PDFService();
