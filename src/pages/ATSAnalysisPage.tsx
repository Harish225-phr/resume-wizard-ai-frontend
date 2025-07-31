import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Upload, 
  FileText, 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import ATSAnalysis from '../components/ATSAnalysis';
import ResumeUploadModal from '../components/ResumeUploadModal';
import { AcademicResumeData } from '../types/academicResume';
import { academicDummyData, techModernDummyData, classicProDummyData } from '../data/dummyResumeData';

const ATSAnalysisPage: React.FC = () => {
  const [selectedResume, setSelectedResume] = useState<AcademicResumeData | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'demo' | 'upload' | 'manual'>('demo');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDemoAnalysis = (resumeType: 'academic' | 'tech' | 'executive') => {
    const dummyData = {
      academic: academicDummyData,
      tech: techModernDummyData,
      executive: classicProDummyData
    };
    setSelectedResume(dummyData[resumeType]);
    setAnalysisMode('demo');
  };

  const handleUploadedResume = (data: AcademicResumeData) => {
    setSelectedResume(data);
    setAnalysisMode('upload');
    setShowUploadModal(false);
  };

  const features = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "ATS Compatibility Score",
      description: "Get an overall score out of 100 for how well your resume works with Applicant Tracking Systems"
    },
    {
      icon: <Search className="h-6 w-6 text-green-600" />,
      title: "Keyword Analysis",
      description: "Identify industry-relevant keywords and optimize keyword density for better ATS matching"
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      title: "Format Optimization",
      description: "Check formatting, structure, and readability to ensure ATS systems can parse your resume"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      title: "Improvement Suggestions",
      description: "Get specific, actionable recommendations to improve your resume's ATS performance"
    }
  ];

  const benefits = [
    "Increase your chances of passing initial ATS screening",
    "Optimize keyword usage for specific job applications",
    "Improve resume formatting for better readability",
    "Get detailed insights into what recruiters' systems see",
    "Receive personalized recommendations for improvement"
  ];

  if (selectedResume) {
    return <ATSAnalysis resumeData={selectedResume} onClose={() => setSelectedResume(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Search className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ATS Compatibility Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ensure your resume passes through Applicant Tracking Systems (ATS) and reaches human recruiters. 
            Get detailed analysis and actionable insights to optimize your resume.
          </p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Instant Analysis
            </Badge>
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <Target className="h-4 w-4 mr-1" />
              Detailed Scoring
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
              <Lightbulb className="h-4 w-4 mr-1" />
              Smart Recommendations
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Analysis Section */}
        <Card className="mb-12 border-2 border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Try Demo Analysis
            </CardTitle>
            <CardDescription className="text-lg">
              See how our ATS checker works with sample resumes from different industries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer group" 
                    onClick={() => handleDemoAnalysis('academic')}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Academic Resume</h3>
                  <p className="text-gray-600 text-sm mb-4">Research-focused resume with publications and grants</p>
                  <Button className="w-full">Analyze Academic Resume</Button>
                </CardContent>
              </Card>

              <Card className="border border-green-200 hover:border-green-400 transition-colors cursor-pointer group" 
                    onClick={() => handleDemoAnalysis('tech')}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tech Resume</h3>
                  <p className="text-gray-600 text-sm mb-4">Software engineer resume with technical projects</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Analyze Tech Resume</Button>
                </CardContent>
              </Card>

              <Card className="border border-purple-200 hover:border-purple-400 transition-colors cursor-pointer group" 
                    onClick={() => handleDemoAnalysis('executive')}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                      <FileText className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Executive Resume</h3>
                  <p className="text-gray-600 text-sm mb-4">Leadership-focused resume with management experience</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Analyze Executive Resume</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

          {/* Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Your Resume
                </CardTitle>
                <CardDescription>
                  Upload your existing resume for comprehensive ATS analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload your resume for instant ATS analysis</p>
                  <Button onClick={() => setShowUploadModal(true)} className="bg-blue-600 hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Choose Resume File
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, DOCX, TXT formats</p>
                </div>
              </CardContent>
            </Card>          <Card>
            <CardHeader>
              <CardTitle>Why Check ATS Compatibility?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card className="bg-gray-50 border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                <p className="text-gray-600">of resumes are rejected by ATS before reaching human recruiters</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                <p className="text-gray-600">of Fortune 500 companies use ATS to screen resumes</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">2x</div>
                <p className="text-gray-600">higher chance of getting interviews with ATS-optimized resumes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Use our resume builder to create ATS-optimized resumes from scratch. 
              Our templates are designed with ATS compatibility in mind.
            </AlertDescription>
          </Alert>
        </div>

        {/* Upload Modal */}
        <ResumeUploadModal 
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onResumeData={handleUploadedResume}
        />
      </div>
    </div>
  );
};

export default ATSAnalysisPage;
