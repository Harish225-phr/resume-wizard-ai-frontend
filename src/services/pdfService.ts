
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

    // Get actual element dimensions
    const elementRect = element.getBoundingClientRect();
    
    // Configure html2canvas options for better quality and proper sizing
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: elementRect.width,
      height: elementRect.height,
      scrollX: 0,
      scrollY: 0,
    });

    // A4 dimensions in mm with margins
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10; // 10mm margin on all sides
    const availableWidth = pageWidth - (2 * margin);
    const availableHeight = pageHeight - (2 * margin);
    
    // Calculate scaling to fit content within one page
    const scaleX = availableWidth / (canvas.width / (canvas.width / availableWidth));
    const scaleY = availableHeight / (canvas.height / (canvas.height / availableHeight));
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down if needed
    
    const imgWidth = (canvas.width * scale * availableWidth) / canvas.width;
    const imgHeight = (canvas.height * scale * availableHeight) / canvas.height;
    
    // Center the content horizontally
    const xOffset = margin + (availableWidth - imgWidth) / 2;
    const yOffset = margin;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png', quality);
    
    // Add image to PDF centered and scaled to fit one page
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(filename);
  }
}

export const pdfService = new PDFService();
