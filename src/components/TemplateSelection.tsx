
import React, { useState } from 'react';
import { Template } from '@/types/resume';
import TemplateCard from './TemplateCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import { FileText, Sparkles, Check } from 'lucide-react';

interface TemplateSelectionProps {
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  onContinue: () => void;
}

const TemplateSelection = ({ selectedTemplate, onTemplateSelect, onContinue }: TemplateSelectionProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      type: 'free',
      preview: 'Clean & Contemporary',
      description: 'Perfect for tech professionals and modern industries',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop',
      style: {
        layout: 'single-column',
        fontFamily: 'Inter',
        primaryColor: '#3B82F6',
        accentColor: '#1E40AF'
      },
      placeholders: {
        position: 'Software Engineer',
        company: 'TechCorp Solutions',
        skills: 'JavaScript, React, Node.js, TypeScript'
      }
    },
    {
      id: 'executive',
      name: 'Executive Elite',
      type: 'free',
      preview: 'Sophisticated & Authoritative',
      description: 'Ideal for senior management and executive positions',
      imageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=300&h=400&fit=crop',
      style: {
        layout: 'two-column',
        fontFamily: 'Playfair Display',
        primaryColor: '#1F2937',
        accentColor: '#374151'
      },
      placeholders: {
        position: 'Senior Vice President',
        company: 'Fortune 500 Company',
        skills: 'Strategic Planning, Leadership, Business Development'
      }
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      type: 'free',
      preview: 'Bold & Artistic',
      description: 'Great for designers, artists, and creative professionals',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=400&fit=crop',
      style: {
        layout: 'sidebar',
        fontFamily: 'Poppins',
        primaryColor: '#8B5CF6',
        accentColor: '#7C3AED'
      },
      placeholders: {
        position: 'UI/UX Designer',
        company: 'Creative Studio Inc',
        skills: 'Figma, Adobe Creative Suite, Prototyping, User Research'
      }
    },
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      type: 'free',
      preview: 'Simple & Elegant',
      description: 'Clean design for any industry, focuses on content',
      imageUrl: 'https://images.unsplash.com/photo-1618477371303-b2a56b64930f?w=300&h=400&fit=crop',
      style: {
        layout: 'single-column',
        fontFamily: 'Source Sans Pro',
        primaryColor: '#6B7280',
        accentColor: '#4B5563'
      },
      placeholders: {
        position: 'Product Manager',
        company: 'Innovation Labs',
        skills: 'Product Strategy, Agile, Data Analysis, Team Leadership'
      }
    },
    {
      id: 'professional',
      name: 'Corporate Professional',
      type: 'free',
      preview: 'Traditional & Reliable',
      description: 'Perfect for banking, finance, and corporate roles',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop',
      style: {
        layout: 'two-column',
        fontFamily: 'Roboto',
        primaryColor: '#1E3A8A',
        accentColor: '#1E40AF'
      },
      placeholders: {
        position: 'Financial Analyst',
        company: 'Global Bank Corp',
        skills: 'Financial Modeling, Risk Analysis, Excel, Bloomberg'
      }
    },
    {
      id: 'academic',
      name: 'Academic Scholar',
      type: 'free',
      preview: 'Research & Education',
      description: 'Designed for academics, researchers, and educators',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      style: {
        layout: 'single-column',
        fontFamily: 'Georgia',
        primaryColor: '#059669',
        accentColor: '#047857'
      },
      placeholders: {
        position: 'Research Associate',
        company: 'University Research Lab',
        skills: 'Research Methodology, Data Analysis, Academic Writing, SPSS'
      }
    },
    {
      id: 'startup',
      name: 'Startup Innovator',
      type: 'free',
      preview: 'Dynamic & Fresh',
      description: 'Perfect for startup employees and entrepreneurs',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop',
      style: {
        layout: 'sidebar',
        fontFamily: 'Nunito',
        primaryColor: '#F59E0B',
        accentColor: '#D97706'
      },
      placeholders: {
        position: 'Growth Hacker',
        company: 'TechStartup Inc',
        skills: 'Digital Marketing, Analytics, A/B Testing, Growth Strategy'
      }
    },
    {
      id: 'healthcare',
      name: 'Healthcare Professional',
      type: 'free',
      preview: 'Trustworthy & Clean',
      description: 'Ideal for doctors, nurses, and healthcare workers',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop',
      style: {
        layout: 'two-column',
        fontFamily: 'Open Sans',
        primaryColor: '#10B981',
        accentColor: '#059669'
      },
      placeholders: {
        position: 'Registered Nurse',
        company: 'City General Hospital',
        skills: 'Patient Care, Medical Procedures, Electronic Health Records'
      }
    },
    {
      id: 'engineering',
      name: 'Engineering Expert',
      type: 'free',
      preview: 'Technical & Precise',
      description: 'Perfect for engineers and technical professionals',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop',
      style: {
        layout: 'single-column',
        fontFamily: 'IBM Plex Sans',
        primaryColor: '#6366F1',
        accentColor: '#4F46E5'
      },
      placeholders: {
        position: 'Software Engineer',
        company: 'Tech Solutions Ltd',
        skills: 'Python, Machine Learning, AWS, DevOps, System Design'
      }
    },
    {
      id: 'sales',
      name: 'Sales Champion',
      type: 'free',
      preview: 'Confident & Persuasive',
      description: 'Great for sales professionals and business development',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      style: {
        layout: 'sidebar',
        fontFamily: 'Montserrat',
        primaryColor: '#EF4444',
        accentColor: '#DC2626'
      },
      placeholders: {
        position: 'Sales Executive',
        company: 'Enterprise Solutions Corp',
        skills: 'B2B Sales, CRM, Lead Generation, Client Relations'
      }
    }
  ];

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleTemplateSelectFromModal = (template: Template) => {
    onTemplateSelect(template);
    setIsPreviewOpen(false);
  };

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <FileText className="h-10 w-10 text-blue-600" />
            Choose Your Perfect Resume Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start by selecting a professional template that matches your industry and style. 
            All templates are completely free and designed to make you stand out.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-green-600">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">All 10 templates completely free - No hidden charges!</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleTemplateSelect}
              onPreview={handlePreview}
            />
          ))}
        </div>

        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onSelect={handleTemplateSelectFromModal}
        />
      </div>
    </div>
  );
};

export default TemplateSelection;
