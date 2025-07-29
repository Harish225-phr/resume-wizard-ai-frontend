import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { FormData, CustomSection } from '@/types/resume';
import { Button } from '@/components/ui/button';

interface CustomSectionsFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const CustomSectionsForm = ({ formData, setFormData }: CustomSectionsFormProps) => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionHeading, setNewSectionHeading] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addCustomSection = () => {
    if (newSectionHeading.trim() && newSectionContent.trim()) {
      const newSection: CustomSection = {
        id: generateId(),
        heading: newSectionHeading.trim(),
        content: newSectionContent.trim()
      };

      setFormData({
        ...formData,
        customSections: [...formData.customSections, newSection]
      });

      setNewSectionHeading('');
      setNewSectionContent('');
      setIsAddingSection(false);
    }
  };

  const removeCustomSection = (id: string) => {
    setFormData({
      ...formData,
      customSections: formData.customSections.filter(section => section.id !== id)
    });
  };

  const updateCustomSection = (id: string, field: keyof CustomSection, value: string) => {
    setFormData({
      ...formData,
      customSections: formData.customSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Custom Sections
        </h2>
        <Button
          type="button"
          onClick={() => setIsAddingSection(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          Add New Section
        </Button>
      </div>

      {/* Existing Custom Sections */}
      {formData.customSections.map((section) => (
        <div key={section.id} className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              value={section.heading}
              onChange={(e) => updateCustomSection(section.id, 'heading', e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none text-gray-800 flex-1"
              placeholder="Section Heading"
            />
            <Button
              type="button"
              onClick={() => removeCustomSection(section.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            value={section.content}
            onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter section content..."
          />
        </div>
      ))}

      {/* Add New Section Form */}
      {isAddingSection && (
        <div className="mb-6 p-4 border-2 border-purple-200 rounded-xl bg-purple-50">
          <div className="space-y-4">
            <input
              type="text"
              value={newSectionHeading}
              onChange={(e) => setNewSectionHeading(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Section Heading (e.g., Awards, Volunteer Work, Publications)"
            />
            <textarea
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter section content..."
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={addCustomSection}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add Section
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsAddingSection(false);
                  setNewSectionHeading('');
                  setNewSectionContent('');
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSectionsForm;
