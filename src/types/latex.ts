export interface LaTeXTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'academic';
  previewImage: string;
  templateContent: string;
  requiredPackages: string[];
  placeholders: {
    [key: string]: string;
  };
}

export interface LaTeXGenerationOptions {
  templateId: string;
  outputFormat: 'pdf';
  compiler: 'pdflatex' | 'xelatex' | 'lualatex';
}

export interface LaTeXCompilationResult {
  success: boolean;
  pdfUrl?: string;
  error?: string;
  logs?: string;
}