import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import { resumeParserService } from '../services/resumeParser';
import { AcademicResumeData } from '../types/academicResume';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeData: (data: AcademicResumeData) => void;
}

interface ParsedResumeData {
  extractedText: string;
  parsedData: AcademicResumeData;
  confidence: number;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onResumeData
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
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
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    console.log('Starting file upload:', file.name, file.type);
    setUploading(true);
    setError('');
    
    try {
      console.log('Calling resumeParserService.parseResumeFile...');
      const result = await resumeParserService.parseResumeFile(file);
      console.log('Parse result:', result);
      setParsedData(result);
    } catch (err) {
      console.error('Parse error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log('File dropped:', file.name, file.type, file.size);
      
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
      handleFileUpload(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
    setParsedData(null);
    setError('');
  };

  const handleUseData = () => {
    if (parsedData) {
      console.log('UploadModal - Using parsed data:', parsedData.parsedData);
      console.log('UploadModal - Personal info:', parsedData.parsedData.personalInfo);
      console.log('UploadModal - Skills:', parsedData.parsedData.skills);
      console.log('UploadModal - Experience:', parsedData.parsedData.experience);
      
      onResumeData(parsedData.parsedData);
      handleClose();
    } else {
      console.error('UploadModal - No parsed data available');
      setError('No parsed data available. Please try uploading again.');
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setParsedData(null);
    setError('');
    setUploading(false);
    onClose();
  };

  const handleTestExtraction = async () => {
    console.log('Testing extraction with sample text...');
    
    // Simulate a text file upload
    const sampleText = `John Doe
john.doe@email.com
(555) 123-4567
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL EXPERIENCE

Software Engineer
Tech Corp | 2020 - 2023
• Developed web applications using React and Node.js
• Led a team of 5 developers
• Improved system performance by 40%

EDUCATION

Bachelor of Science in Computer Science
Tech University | 2016 - 2020
GPA: 3.8/4.0

TECHNICAL SKILLS

Programming Languages: JavaScript, Python, Java
Frontend: React, Vue.js, HTML5, CSS3
Backend: Node.js, Express, Django
Tools: Git, Docker, AWS`;

    try {
      setUploading(true);
      setError('');
      
      // Create a mock file
      const blob = new Blob([sampleText], { type: 'text/plain' });
      const file = new File([blob], 'test-resume.txt', { type: 'text/plain' });
      setUploadedFile(file);
      
      const result = await resumeParserService.parseResumeFile(file);
      console.log('Test extraction result:', result);
      setParsedData(result);
      
    } catch (err) {
      console.error('Test extraction error:', err);
      setError('Test extraction failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
            {uploading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Parsing Your Resume...
                </h3>
                <p className="text-gray-600">
                  Extracting text and analyzing content structure
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    ℹ️ This may take a few seconds depending on your file size and format
                  </p>
                </div>
              </div>
            ) : uploadedFile ? (
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
                <div className="flex gap-2 justify-center">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={handleTestExtraction}
                    variant="outline"
                    className="text-sm"
                  >
                    Test Sample Resume
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Parsed Data Preview */}
          {parsedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Extracted Information
                </h3>
                <Badge className={getConfidenceColor(parsedData.confidence)}>
                  {parsedData.confidence}% Confidence
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Personal Info</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {parsedData.parsedData.personalInfo.fullName || 'Not found'}</div>
                    <div><strong>Email:</strong> {parsedData.parsedData.personalInfo.email || 'Not found'}</div>
                    <div><strong>Phone:</strong> {parsedData.parsedData.personalInfo.phone || 'Not found'}</div>
                  </div>
                </Card>

                {/* Experience */}
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Experience</h4>
                  <div className="space-y-2 text-sm">
                    {parsedData.parsedData.experience.length > 0 ? (
                      parsedData.parsedData.experience.slice(0, 2).map((exp, index) => (
                        <div key={index}>
                          <strong>{exp.position}</strong> at {exp.company}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No experience found</div>
                    )}
                  </div>
                </Card>

                {/* Education */}
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Education</h4>
                  <div className="space-y-2 text-sm">
                    {parsedData.parsedData.education.length > 0 ? (
                      parsedData.parsedData.education.slice(0, 2).map((edu, index) => (
                        <div key={index}>
                          <strong>{edu.degree}</strong><br />
                          {edu.institute}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No education found</div>
                    )}
                  </div>
                </Card>

                {/* Skills */}
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                  <div className="space-y-2 text-sm">
                    {Object.values(parsedData.parsedData.skills).flat().length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {Object.values(parsedData.parsedData.skills).flat().slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">No skills found</div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Raw Text Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Extracted Text Preview
                </Label>
                <div className="bg-gray-50 p-3 rounded border max-h-32 overflow-y-auto text-xs">
                  {parsedData.extractedText.substring(0, 500)}...
                </div>
              </div>
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
            {parsedData && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('Full parsed data:', JSON.stringify(parsedData, null, 2));
                    console.log('Extracted text length:', parsedData.extractedText.length);
                  }}
                  className="text-gray-600"
                >
                  Debug Info
                </Button>
                <Button
                  onClick={handleUseData}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Use This Data
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;
