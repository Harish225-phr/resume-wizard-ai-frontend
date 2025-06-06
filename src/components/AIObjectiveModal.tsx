
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CreditCard, Check, Brain, Target, TrendingUp } from 'lucide-react';

interface AIObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayment: () => void;
}

const AIObjectiveModal = ({ isOpen, onClose, onPayment }: AIObjectiveModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI Career Objective Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
              🤖 AI-Powered
            </Badge>
            <p className="text-gray-600 mb-4">
              Let AI craft a compelling career objective that perfectly matches your profile and attracts employers
            </p>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ₹19
            </div>
            <p className="text-sm text-gray-500">One-time payment • Instant generation</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-6 w-6 text-purple-500" />
                <span className="font-semibold text-purple-800">Smart AI Analysis</span>
              </div>
              <ul className="text-sm text-purple-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Analyzes your skills and experience
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Industry-specific language and keywords
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Professional tone and structure
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-blue-500" />
                <span className="font-semibold text-blue-800">What You Get</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Personalized career objective (2-3 sentences)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  ATS-optimized keywords
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Ready to use immediately
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Success Rate</span>
            </div>
            <p className="text-xs text-green-700">
              Resumes with AI-generated objectives get 60% more interview calls
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Write Manually
            </Button>
            <Button onClick={onPayment} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Generate with AI
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIObjectiveModal;
