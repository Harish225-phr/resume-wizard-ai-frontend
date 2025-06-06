
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CreditCard, Check } from 'lucide-react';

interface AIObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayment: () => void;
}

const AIObjectiveModal = ({ isOpen, onClose, onPayment }: AIObjectiveModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI Career Objective
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">
              AI-Powered
            </Badge>
            <p className="text-gray-600 mb-4">
              Generate a professional career objective tailored to your skills and experience using AI.
            </p>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ₹19
            </div>
            <p className="text-sm text-gray-500">One-time payment</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Personalized career objective</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Industry-specific language</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Professional tone</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onPayment} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIObjectiveModal;
