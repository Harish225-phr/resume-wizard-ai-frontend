
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

    // Wait a bit to ensure all styles are applied
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Configure html2canvas with optimized settings for consistent PDF output
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for crisp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
      imageTimeout: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // A4 dimensions in pixels (at 96 DPI)
    const a4Width = 794; // 210mm at 96 DPI
    const a4Height = 1123; // 297mm at 96 DPI
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [a4Width, a4Height],
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // Calculate dimensions to fit the page while maintaining aspect ratio
    const canvasAspectRatio = canvas.width / canvas.height;
    const pageAspectRatio = a4Width / a4Height;
    
    let imgWidth = a4Width;
    let imgHeight = a4Height;
    
    if (canvasAspectRatio > pageAspectRatio) {
      // Canvas is wider, fit to width
      imgHeight = a4Width / canvasAspectRatio;
    } else {
      // Canvas is taller, fit to height
      imgWidth = a4Height * canvasAspectRatio;
    }
    
    // Center the image on the page
    const xOffset = (a4Width - imgWidth) / 2;
    const yOffset = (a4Height - imgHeight) / 2;
    
    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(filename);
  }
}

export const pdfService = new PDFService();
