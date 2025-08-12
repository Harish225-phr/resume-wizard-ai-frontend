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
  Zap,
  Brain,
  Eye,
  RefreshCw
} from 'lucide-react';
import { AcademicResumeData } from '../types/academicResume';
import { ATSAnalysisResult, ATSIssue, analyzeResume } from '../services/atsChecker';

interface EnhancedATSAnalysisProps {
  resumeData: AcademicResumeData;
  onClose?: () => void;
  onReanalyze?: () => void;
}

const EnhancedATSAnalysis: React.FC<EnhancedATSAnalysisProps> = ({ 
  resumeData, 
  onClose, 
  onReanalyze 
}) => {
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'suggestion': return <Lightbulb className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[impact as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCompatibilityIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <Award className="w-6 h-6 text-green-600" />;
      case 'good': return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'fair': return <Target className="w-6 h-6 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const filteredIssues = analysis?.issues.filter(issue => 
    selectedCategory === 'all' || issue.category === selectedCategory
  ) || [];

  if (isAnalyzing) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Analyzing Your Resume for ATS Compatibility
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              Our AI is thoroughly examining your resume structure, keywords, formatting, 
              and content to provide comprehensive ATS optimization insights.
            </p>
            <div className="mt-6 w-full max-w-md">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Scanning content...</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Analysis Available
            </h3>
            <p className="text-gray-600">Please provide resume data to perform ATS analysis.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ATS Compatibility Analysis</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive analysis of your resume's ATS-friendliness and optimization recommendations
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setAnalysis(null);
              performAnalysis();
            }}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Re-analyze
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className={`border-2 ${getScoreBgColor(analysis.score.overall)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getCompatibilityIcon(analysis.estimatedATSCompatibility)}
              <div>
                <CardTitle className="text-2xl">
                  Overall ATS Score: {analysis.score.overall}/100
                </CardTitle>
                <CardDescription className="text-lg capitalize">
                  {analysis.estimatedATSCompatibility} ATS Compatibility
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.score.overall)}`}>
                {analysis.score.overall}%
              </div>
              <Badge 
                className={`mt-1 ${getScoreBgColor(analysis.score.overall)} ${getScoreColor(analysis.score.overall)}`}
              >
                {analysis.estimatedATSCompatibility.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(analysis.score.sections).map(([category, score]) => (
          <Card key={category} className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <Progress value={score} className="mt-2 h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Issues & Fixes
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Issues ({analysis.issues.length})
            </Button>
            {['keywords', 'formatting', 'structure', 'completeness', 'readability'].map(category => {
              const count = analysis.issues.filter(issue => issue.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredIssues.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Issues Found in This Category
                  </h3>
                  <p className="text-gray-600">Your resume looks great in this area!</p>
                </CardContent>
              </Card>
            ) : (
              filteredIssues.map((issue, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                          <Badge className={getImpactBadge(issue.impact)}>
                            {issue.impact} impact
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {issue.category}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{issue.description}</p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                          <h5 className="font-medium text-blue-900 mb-1">How to fix:</h5>
                          <p className="text-blue-800 text-sm">{issue.fix}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Keyword Analysis
              </CardTitle>
              <CardDescription>
                Keywords found in your resume that match industry standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.keywordDensity.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Industry Keywords Detected
                  </h3>
                  <p className="text-gray-600">
                    Consider adding more industry-specific terms and technical skills
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysis.keywordDensity.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{keyword.keyword}</Badge>
                        <span className="text-sm text-gray-600">
                          {keyword.count} occurrence{keyword.count !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        {keyword.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  What's Working Well
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.passedChecks.map((check, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Zap className="w-5 h-5" />
                  Improvement Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Advanced analysis and personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Brain className="w-4 h-4" />
                <AlertTitle>Resume Strength Analysis</AlertTitle>
                <AlertDescription>
                  {analysis.score.overall >= 85 
                    ? "Your resume demonstrates excellent ATS compatibility with strong keyword presence and professional formatting."
                    : analysis.score.overall >= 70
                    ? "Your resume shows good potential but could benefit from keyword optimization and formatting improvements."
                    : "Your resume needs significant improvements in multiple areas to pass ATS screening effectively."
                  }
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Top Priority Actions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {analysis.issues
                      .filter(issue => issue.impact === 'high')
                      .slice(0, 3)
                      .map((issue, index) => (
                        <li key={index}>• {issue.title}</li>
                      ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">ATS Optimization Score</h4>
                  <div className="text-2xl font-bold text-green-800 mb-1">
                    {Math.round((analysis.passedChecks.length / (analysis.passedChecks.length + analysis.issues.length)) * 100)}%
                  </div>
                  <p className="text-sm text-green-700">
                    {analysis.passedChecks.length} out of {analysis.passedChecks.length + analysis.issues.length} checks passed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedATSAnalysis;