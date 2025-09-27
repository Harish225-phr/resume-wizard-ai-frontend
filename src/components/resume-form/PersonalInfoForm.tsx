
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { FormData } from '@/types/resume';
import { Button } from '@/components/ui/button';

interface PersonalInfoFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomField {
  id: string;
  label: string;
  value: string;
}

const PersonalInfoForm = ({ formData, handleInputChange, handleFileChange }: PersonalInfoFormProps) => {
  console.log('PersonalInfoForm received formData:', formData);
  
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');

  const addCustomField = () => {
    if (newFieldLabel.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        label: newFieldLabel.trim(),
        value: ''
      };
      setCustomFields([...customFields, newField]);
      setNewFieldLabel('');
    }
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const updateCustomField = (id: string, value: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Personal Information
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => {
                // Only allow letters, spaces, and common name characters
                const value = e.target.value;
                if (/^[a-zA-Z\s.''-]*$/.test(value)) {
                  handleInputChange(e);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              // Only allow numbers, spaces, hyphens, parentheses, and plus sign
              const value = e.target.value;
              if (/^[0-9\s\-\(\)\+]*$/.test(value)) {
                handleInputChange(e);
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="+91 98765 43210"
            required
          />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo (Optional)
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full address"
          />
        </div>

        {/* Custom Fields Section */}
        <div className="md:col-span-2">
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
            
            {/* Add New Field */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter field name (e.g., LinkedIn, Website, etc.)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomField();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addCustomField}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Field
              </Button>
            </div>

            {/* Custom Fields */}
            {customFields.map((field) => (
              <div key={field.id} className="flex gap-2 mb-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateCustomField(field.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCustomField(field.id)}
                  className="mt-8 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
