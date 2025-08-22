import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Lightbulb, 
  Target, 
  BarChart3, 
  FileText, 
  Search,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { AcademicResumeData } from '../types/academicResume';
import { ATSAnalysisResult, ATSIssue, analyzeResume } from '../services/atsChecker';

interface ATSAnalysisProps {
  resumeData: AcademicResumeData;
  onClose?: () => void;
}

const ATSAnalysis: React.FC<ATSAnalysisProps> = ({ resumeData, onClose }) => {
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (resumeData) {
      performAnalysis();
    }
  }, [resumeData]);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate analysis time for better UX
    setTimeout(() => {
      const result = analyzeResume(resumeData);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 55) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getCompatibilityColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 animate-spin" />
              Analyzing Resume for ATS Compatibility
            </CardTitle>
            <CardDescription>
              Please wait while we analyze your resume against ATS best practices...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={33} className="w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Checking keywords and phrases
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Analyzing formatting and structure
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  Evaluating completeness
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No analysis available. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ATS Compatibility Analysis</h1>
          <p className="text-gray-600 mt-1">Comprehensive assessment of your resume's ATS readiness</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>Close Analysis</Button>
        )}
      </div>

      {/* Overall Score Card */}
      <Card className={`${getScoreBackground(analysis.score.overall)} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-white`}>
                <Target className={`h-6 w-6 ${getScoreColor(analysis.score.overall)}`} />
              </div>
              <div>
                <CardTitle className={`text-2xl ${getScoreColor(analysis.score.overall)}`}>
                  {analysis.score.overall}/100
                </CardTitle>
                <CardDescription className="text-gray-700">Overall ATS Score</CardDescription>
              </div>
            </div>
            <Badge className={getCompatibilityColor(analysis.estimatedATSCompatibility)}>
              {analysis.estimatedATSCompatibility.toUpperCase()} COMPATIBILITY
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(analysis.score.sections).map(([section, score]) => (
              <div key={section} className="text-center">
                <div className={`text-lg font-semibold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-sm text-gray-600 capitalize">{section}</div>
                <Progress value={score} className="mt-1 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Issues ({analysis.issues.length})
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="passed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Passed ({analysis.passedChecks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          {analysis.issues.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect! No Issues Found</h3>
                  <p className="text-gray-600">Your resume follows all ATS best practices.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {analysis.issues.map((issue, index) => (
                <Card key={index} className={`${getIssueColor(issue.type)} border`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                          <Badge variant={issue.impact === 'high' ? 'destructive' : issue.impact === 'medium' ? 'default' : 'secondary'}>
                            {issue.impact} impact
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{issue.description}</p>
                        <div className="bg-white/60 rounded-lg p-3 border">
                          <p className="text-sm font-medium text-gray-900 mb-1">How to fix:</p>
                          <p className="text-sm text-gray-700">{issue.fix}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Keywords Found
                </CardTitle>
                <CardDescription>
                  Keywords detected in your resume with frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.keywordDensity.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No industry keywords detected</p>
                ) : (
                  <div className="space-y-3">
                    {analysis.keywordDensity.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{keyword.keyword}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{keyword.count}x</span>
                          <Badge variant="outline">{keyword.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Pro Tip</AlertTitle>
                  <AlertDescription>
                    Include keywords from job descriptions naturally throughout your resume. 
                    Aim for 10-15 relevant keywords per application.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Suggested Keywords to Add:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['project management', 'team leadership', 'data analysis', 'problem solving', 'communication', 'agile methodology'].map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ATS Optimization Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Use standard section headers (Experience, Education, Skills)',
                    'Include relevant keywords naturally in content',
                    'Use bullet points instead of paragraphs',
                    'Add quantifiable achievements with numbers',
                    'Keep formatting simple and clean',
                    'Include complete contact information',
                    'Use common file format (PDF or Word)',
                    'Tailor resume for each application'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="passed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Successfully Passed Checks
              </CardTitle>
              <CardDescription>
                Areas where your resume excels in ATS compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.passedChecks.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No checks passed yet. Review the issues tab for improvements.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.passedChecks.map((check, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-800">{check}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onClose} variant="outline" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={performAnalysis} className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Re-generate ATS Score
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSAnalysis;
