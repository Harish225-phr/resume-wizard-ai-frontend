
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, CreditCard, Check, FileText, Palette, Award, Download, Loader2 } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  price: number;
  onPayment: () => void;
  isProcessing?: boolean;
}

const PremiumModal = ({ isOpen, onClose, templateName, price, onPayment, isProcessing = false }: PremiumModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Unlock Premium Design
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              {templateName}
            </Badge>
            <p className="text-gray-600 mb-4">
              Stand out with professional designs that get you noticed by employers
            </p>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₹{price}
            </div>
            <p className="text-sm text-gray-500">One-time payment • Instant access</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Export Options</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• High-quality PDF</li>
                <li>• Editable DOCX format</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Customization</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Color themes</li>
                <li>• Font options</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Professional</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• No watermark</li>
                <li>• ATS-friendly</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Download className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Instant Access</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Download immediately</li>
                <li>• Lifetime access</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-800">Why Premium?</span>
            </div>
            <p className="text-xs text-yellow-700">
              Studies show that professionally designed resumes get 40% more callbacks than basic templates
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
              Maybe Later
            </Button>
            <Button 
              onClick={onPayment} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Unlock Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
