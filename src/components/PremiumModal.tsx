
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, CreditCard, Check } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  price: number;
  onPayment: () => void;
}

const PremiumModal = ({ isOpen, onClose, templateName, price, onPayment }: PremiumModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">
              {templateName}
            </Badge>
            <p className="text-gray-600 mb-4">
              Unlock premium templates with professional designs and enhanced formatting.
            </p>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₹{price}
            </div>
            <p className="text-sm text-gray-500">One-time payment</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Premium template access</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">High-quality PDF download</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Professional formatting</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onPayment} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
