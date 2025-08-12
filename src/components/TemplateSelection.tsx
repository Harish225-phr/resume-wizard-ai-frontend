
import React, { useState } from 'react';
import { Template } from '@/types/resume';
import { FileText, Sparkles, Check, Upload, ExternalLink, Eye, ArrowRight, Star, Users, Zap, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import latexService from '@/services/latexService';
import { getDummyDataForTemplate } from '@/data/dummyResumeData';

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

  const templates: Template[] = [
    {
      id: 'academic-professional',
      name: 'Academic Professional',
      type: 'premium',
      preview: 'Perfect for Research & Academia',
      description: 'Sophisticated template designed for researchers, professors, and academic professionals. Features clean typography and structured sections with professional table layouts.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center',
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
      type: 'premium',
      preview: 'Built for Tech Professionals',
      description: 'Modern, sleek design perfect for software engineers, developers, and tech professionals. Highlights technical skills with clean formatting and professional presentation.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600&fit=crop&crop=center',
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
      type: 'premium',
      preview: 'For C-Suite & Senior Executives',
      description: 'Elegant, traditional template designed for executives, managers, and senior professionals. Emphasizes leadership experience and achievements with formal styling.',
      imageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=400&h=600&fit=crop&crop=center',
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
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: Palette },
    { id: 'academic', name: 'Academic', icon: FileText },
    { id: 'technology', name: 'Technology', icon: Zap },
    { id: 'executive', name: 'Executive', icon: Star }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handlePreview = (template: Template) => {
    // Only show preview for LaTeX templates (academic, techmodern, classicpro)
    if (template.hasLatexSupport && template.latexTemplate) {
      const dummyData = getDummyDataForTemplate(template.latexTemplate);
      latexService.preview(dummyData, template.latexTemplate);
    } else {
      // For non-LaTeX templates, show a coming soon message
      alert('Preview for this template is coming soon! For now, you can select it to start building your resume.');
    }
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
                    variant={template.type === 'premium' ? 'default' : 'secondary'}
                    className={template.type === 'premium' 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
                      : 'bg-green-500 text-white'
                    }
                  >
                    {template.type === 'premium' ? '⭐ Premium' : '🆓 Free'}
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
    </div>
  );
};

export default TemplateSelection;
