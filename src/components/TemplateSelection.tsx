
import React, { useState } from 'react';
import { Template } from '@/types/resume';
import { FileText, Sparkles, Check, Upload, ExternalLink, Eye, ArrowRight, Star, Users, Zap, Palette, Brush, Code, Award, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import latexService from '@/services/latexService';
import { getDummyDataForTemplate } from '@/data/dummyResumeData';
import TemplatePreviewModal from '@/components/TemplatePreviewModal';
import academicPreview from '@/assets/template-academic-preview.jpg';
import techPreview from '@/assets/template-tech-preview.jpg';
import executivePreview from '@/assets/template-executive-preview.jpg';
import creativePreview from '@/assets/template-creative-preview.jpg';
import minimalPreview from '@/assets/template-minimal-preview.jpg';
import sidebarPreview from '@/assets/template-sidebar-preview.jpg';

interface TemplateSelectionProps {
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  onContinue: () => void;
  onBackToUpload?: () => void;
  onUploadResume?: () => void;
}

const TemplateSelection = ({ selectedTemplate, onTemplateSelect, onContinue, onBackToUpload, onUploadResume }: TemplateSelectionProps) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templates: Template[] = [
    {
      id: 'academic-professional',
      name: 'Academic Professional',
      type: 'free',
      preview: 'Perfect for Research & Academia',
      description: 'Sophisticated template designed for researchers, professors, and academic professionals. Features clean typography and structured sections with professional table layouts.',
      imageUrl: academicPreview,
      style: {
        layout: 'single-column',
        fontFamily: 'Merriweather',
        primaryColor: '#1a365d',
        accentColor: '#2d3748'
      },
      placeholders: {
        position: 'Research Scientist',
        company: 'Harvard Medical School',
        skills: 'Python, R, Machine Learning, Statistical Analysis, Research Methodology'
      },
      latexTemplate: 'academic',
      hasLatexSupport: true,
      category: 'academic',
      rating: 4.9,
      downloads: '12.5k',
      features: ['LaTeX Export', 'Publication Ready', 'Citation Format', 'Academic Sections']
    },
    {
      id: 'tech-modern',
      name: 'Tech Modern',
      type: 'free',
      preview: 'Built for Tech Professionals',
      description: 'Modern, sleek design perfect for software engineers, developers, and tech professionals. Highlights technical skills with clean formatting and professional presentation.',
      imageUrl: techPreview,
      style: {
        layout: 'single-column',
        fontFamily: 'Inter',
        primaryColor: '#2563eb',
        accentColor: '#1d4ed8'
      },
      placeholders: {
        position: 'Senior Software Engineer',
        company: 'Meta (Facebook)',
        skills: 'React, Node.js, TypeScript, AWS, Docker, Kubernetes'
      },
      latexTemplate: 'techmodern',
      hasLatexSupport: true,
      category: 'technology',
      rating: 4.8,
      downloads: '18.2k',
      features: ['Modern Design', 'Tech-Focused', 'Project Showcase', 'Skills Matrix']
    },
    {
      id: 'classic-professional',
      name: 'Classic Professional',
      type: 'free',
      preview: 'For C-Suite & Senior Executives',
      description: 'Elegant, traditional template designed for executives, managers, and senior professionals. Emphasizes leadership experience and achievements with formal styling.',
      imageUrl: executivePreview,
      style: {
        layout: 'single-column',
        fontFamily: 'Times New Roman',
        primaryColor: '#1f2937',
        accentColor: '#374151'
      },
      placeholders: {
        position: 'Chief Technology Officer',
        company: 'Fortune 500 Technology Corp',
        skills: 'Strategic Leadership, Digital Transformation, Team Management, Business Strategy'
      },
      latexTemplate: 'classicpro',
      hasLatexSupport: true,
      category: 'executive',
      rating: 4.9,
      downloads: '15.7k',
      features: ['Executive Focus', 'Achievement-Driven', 'Leadership Emphasis', 'Premium Layout']
    },
    {
      id: 'creative-modern',
      name: 'Creative Modern',
      type: 'free',
      preview: 'For Creative Professionals',
      description: 'Eye-catching template perfect for designers, artists, and creative professionals. Features vibrant colors and modern design elements to showcase your creativity.',
      imageUrl: creativePreview,
      style: {
        layout: 'single-column',
        fontFamily: 'Poppins',
        primaryColor: '#7c3aed',
        accentColor: '#a855f7'
      },
      placeholders: {
        position: 'Creative Director',
        company: 'Design Studio',
        skills: 'Adobe Creative Suite, UI/UX Design, Branding, Typography, Illustration'
      },
      latexTemplate: 'creative',
      hasLatexSupport: true,
      category: 'creative',
      rating: 4.7,
      downloads: '9.8k',
      features: ['Creative Layout', 'Portfolio Focus', 'Visual Impact', 'Color Accents']
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      type: 'free',
      preview: 'Simplicity at its Best',
      description: 'Ultra-clean minimalist design that focuses on content. Perfect for any profession with its timeless and professional appearance.',
      imageUrl: minimalPreview,
      style: {
        layout: 'single-column',
        fontFamily: 'Open Sans',
        primaryColor: '#374151',
        accentColor: '#6b7280'
      },
      placeholders: {
        position: 'Professional',
        company: 'Company Name',
        skills: 'Communication, Leadership, Problem Solving, Team Work'
      },
      latexTemplate: 'minimal',
      hasLatexSupport: true,
      category: 'general',
      rating: 4.6,
      downloads: '25.3k',
      features: ['Clean Design', 'ATS Friendly', 'Minimalist', 'Universal']
    },
    {
      id: 'sidebar-professional',
      name: 'Sidebar Professional',
      type: 'free',
      preview: 'Two-Column Excellence',
      description: 'Professional two-column layout with sidebar for skills and contact information. Modern design that maximizes space utilization.',
      imageUrl: sidebarPreview,
      style: {
        layout: 'two-column',
        fontFamily: 'Roboto',
        primaryColor: '#0f172a',
        accentColor: '#1e293b'
      },
      placeholders: {
        position: 'Business Analyst',
        company: 'Tech Corporation',
        skills: 'Data Analysis, Excel, SQL, Project Management, Business Intelligence'
      },
      latexTemplate: 'sidebar',
      hasLatexSupport: true,
      category: 'business',
      rating: 4.8,
      downloads: '14.1k',
      features: ['Two-Column Layout', 'Space Efficient', 'Professional', 'Modern']
    },
    {
      id: 'elegant',
      name: 'Elegant Professional',
      type: 'free',
      preview: 'Modern Teal Accent Design',
      description: 'Sophisticated two-column layout with teal accents, modern typography, and LaTeX-quality formatting. Perfect for frontend engineers and tech professionals.',
      imageUrl: '/src/assets/template-elegant-preview.jpg',
      style: {
        layout: 'two-column',
        fontFamily: 'Inter, Lora',
        primaryColor: '#0E7490',
        accentColor: '#0EA5E9'
      },
      placeholders: {
        position: 'Frontend Engineer',
        company: 'Tech Innovation Co.',
        skills: 'React, TypeScript, Design Systems'
      },
      latexTemplate: 'elegant',
      hasLatexSupport: true,
      category: 'technology',
      rating: 4.9,
      downloads: '2.1k',
      features: ['Teal Accents', 'Modern Typography', 'Two-Column', 'LaTeX Quality']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: Palette },
    { id: 'academic', name: 'Academic', icon: FileText },
    { id: 'technology', name: 'Technology', icon: Code },
    { id: 'executive', name: 'Executive', icon: Award },
    { id: 'creative', name: 'Creative', icon: Brush },
    { id: 'business', name: 'Business', icon: Layout },
    { id: 'general', name: 'General', icon: Star }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const handleSelectFromPreview = (template: Template) => {
    onTemplateSelect(template);
    handleClosePreview();
  };

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Resume Templates
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose from our collection of expertly designed templates. 
              Each template is crafted to help you land your dream job.
            </p>
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-300" />
                <span>ATS Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-300" />
                <span>Industry Specific</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-300" />
                <span>Easy Customization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                selectedTemplate?.id === template.id 
                  ? 'ring-4 ring-blue-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="relative">
                {/* Template Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <img 
                    src={template.imageUrl} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(template);
                        }}
                        size="sm"
                        variant="outline"
                        className="bg-white/90 text-black border-white hover:bg-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                        }}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Template Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary"
                    className="bg-green-500 text-white"
                  >
                    🆓 Free
                  </Badge>
                </div>

                {/* LaTeX Badge */}
                {template.hasLatexSupport && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-blue-600 border-blue-200">
                      LaTeX
                    </Badge>
                  </div>
                )}

                {/* Selected Indicator */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="bg-blue-600 text-white p-3 rounded-full">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{template.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-blue-600 font-medium mb-2">{template.preview}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.features?.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{template.downloads} downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handlePreview(template)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Template CTA */}
      {selectedTemplate && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={selectedTemplate.imageUrl} 
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{selectedTemplate.name}</h3>
                  <p className="text-blue-600">{selectedTemplate.preview}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {onUploadResume && (
                  <Button
                    onClick={onUploadResume}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Resume
                  </Button>
                )}
                <Button
                  onClick={onContinue}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 text-lg font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Continue Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Upload Button */}
      {onBackToUpload && !selectedTemplate && (
        <div className="fixed top-24 left-6 z-40">
          <Button
            onClick={onBackToUpload}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Different Resume
          </Button>
        </div>
      )}

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onSelect={handleSelectFromPreview}
      />
    </div>
  );
};

export default TemplateSelection;
