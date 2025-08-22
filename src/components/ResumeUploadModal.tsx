import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { AcademicResumeData } from '../types/academicResume';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeData: (data: AcademicResumeData) => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onResumeData
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
      const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (!validTypes.includes(file.type) && !hasValidExtension) {
        setError('Please upload a valid file format (PDF, DOC, DOCX, or TXT)');
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setUploadedFile(file);
      setError('');
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
      const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (!validTypes.includes(file.type) && !hasValidExtension) {
        setError('Please upload a valid file format (PDF, DOC, DOCX, or TXT)');
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setUploadedFile(file);
      setError('');
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
    setError('');
  };

  const handleUseFile = () => {
    if (uploadedFile) {
      // Create empty resume data structure for the builder to start with
      const emptyResumeData: AcademicResumeData = {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          linkedinUrl: '',
          githubUrl: '',
          address: ''
        },
        education: [],
        experience: [],
        skills: {
          languages: [],
          frontend: [],
          backend: [],
          tools: [],
          databases: [],
          concepts: []
        },
        projects: [],
        achievements: [],
        codingProfiles: [],
        languages: '',
        certifications: [],
        interests: ''
      };
      
      onResumeData(emptyResumeData);
      handleClose();
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Upload Your Resume
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span>{uploadedFile.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  File uploaded successfully. Click "Use This File" to continue.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Drag & Drop Your Resume
                  </h3>
                  <p className="text-gray-600">
                    Or click to browse files (PDF, DOC, DOCX, TXT)
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            {uploadedFile && (
              <Button
                onClick={handleUseFile}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Use This File
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;