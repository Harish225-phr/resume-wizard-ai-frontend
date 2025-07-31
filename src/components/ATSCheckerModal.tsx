import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Target,
  FileText,
  Zap
} from 'lucide-react';
import { AcademicResumeData } from '../types/academicResume';
import { ATSAnalysisResult, analyzeResume } from '../services/atsChecker';

interface ATSCheckerModalProps {
  resumeData: AcademicResumeData;
  trigger?: React.ReactNode;
}

const ATSCheckerModal: React.FC<ATSCheckerModalProps> = ({ resumeData, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
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
      case 'suggestion': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  React.useEffect(() => {
    if (isOpen && !analysis) {
      handleAnalyze();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Check ATS Compatibility
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            ATS Compatibility Analysis
          </DialogTitle>
        </DialogHeader>

        {isAnalyzing && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <Search className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume</h3>
              <p className="text-gray-600 mb-4">Checking ATS compatibility and best practices...</p>
              <Progress value={75} className="w-full max-w-md mx-auto" />
            </div>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-full">
                      <Target className={`h-6 w-6 ${getScoreColor(analysis.score.overall)}`} />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${getScoreColor(analysis.score.overall)}`}>
                        {analysis.score.overall}/100
                      </div>
                      <div className="text-gray-600">ATS Score</div>
                    </div>
                  </div>
                  <Badge className={getCompatibilityColor(analysis.estimatedATSCompatibility)}>
                    {analysis.estimatedATSCompatibility.toUpperCase()}
                  </Badge>
                </div>

                {/* Section Scores */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(analysis.score.sections).map(([section, score]) => (
                    <div key={section} className="text-center">
                      <div className={`text-lg font-semibold ${getScoreColor(score)}`}>
                        {score}
                      </div>
                      <div className="text-xs text-gray-600 capitalize">{section}</div>
                      <Progress value={score} className="mt-1 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issues */}
            {analysis.issues.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Issues Found ({analysis.issues.length})
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {analysis.issues.slice(0, 5).map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{issue.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {issue.impact}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
                        <div className="text-xs text-blue-600">
                          <strong>Fix:</strong> {issue.fix}
                        </div>
                      </div>
                    </div>
                  ))}
                  {analysis.issues.length > 5 && (
                    <div className="text-center py-2">
                      <Button variant="ghost" size="sm">
                        View {analysis.issues.length - 5} more issues
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Passed Checks */}
            {analysis.passedChecks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  What You're Doing Right ({analysis.passedChecks.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {analysis.passedChecks.slice(0, 6).map((check, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                      <CheckCircle className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Keywords */}
            {analysis.keywordDensity.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Top Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywordDensity.slice(0, 8).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword.keyword} ({keyword.count}x)
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Quick Wins
              </h3>
              <div className="space-y-2">
                {analysis.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button onClick={handleAnalyze} variant="outline" size="sm" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Re-analyze
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Full Report
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ATSCheckerModal;
