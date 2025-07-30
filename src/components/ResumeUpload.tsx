import React, { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/types/resume';
import { resumeParserService } from '@/services/resumeParser';

interface ResumeUploadProps {
  onParsedData: (data: FormData) => void;
  onSkip: () => void;
}

const ResumeUpload = ({ onParsedData, onSkip }: ResumeUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };


  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadedFile(file);

    try {
      console.log('Starting resume parsing for file:', file.name, 'Type:', file.type);
      
      const parsedData = await resumeParserService.parseResume(file);
      console.log('Generated Parsed Data:', parsedData);
      
      toast({
        title: "Resume Parsed Successfully! ✨",
        description: `Extracted: ${parsedData.fullName}, ${parsedData.email}, ${parsedData.skills ? 'skills' : ''} and more!`,
      });
      
      onParsedData(parsedData);
      
    } catch (error) {
      console.error('Resume parsing failed:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to parse your resume. Please try again or skip to manual entry.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Upload Your Existing Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your current resume and we'll automatically extract your information to help you create a better, more professional version.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragOver
                ? 'border-blue-400 bg-blue-50'
                : uploading
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Parsing Your Resume...
                </h3>
                <p className="text-gray-600">
                  We're extracting your information to pre-fill the form
                </p>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800">
                  File Ready!
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{uploadedFile.name}</span>
                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Drop your resume here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, DOC, DOCX, and TXT files
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </label>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Don't have a resume to upload? No problem!
            </p>
            <Button
              onClick={onSkip}
              variant="outline"
              className="px-8 py-3"
            >
              Skip & Create from Scratch
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeUpload;