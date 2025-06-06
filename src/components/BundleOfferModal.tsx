import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, CreditCard, Check, Gift, Loader2 } from 'lucide-react';

interface BundleOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseBundle: () => void;
  onPurchaseSeparate: () => void;
  isProcessing?: boolean;
}

const BundleOfferModal = ({ isOpen, onClose, onPurchaseBundle, onPurchaseSeparate, isProcessing = false }: BundleOfferModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-6 w-6 text-pink-500" />
            Special Bundle Offer!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-pink-500 to-red-500 text-white animate-bounce">
              🔥 Limited Time Deal
            </Badge>
            <p className="text-gray-600 mb-4">
              Get premium templates + AI career objective together and save ₹20!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Bundle Offer */}
            <div className="border-2 border-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs">
                  SAVE ₹20
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Complete Bundle</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Premium Templates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>AI Career Objective</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No Watermark</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>DOCX Export</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 line-through text-sm">₹68</span>
                  <div className="text-2xl font-bold text-pink-600">₹48</div>
                </div>
                <Button 
                  onClick={onPurchaseBundle}
                  className="w-full mt-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-4 w-4" />
                      Get Bundle
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Separate Purchase */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Separate Purchase</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div>Premium Templates: ₹49</div>
                  <div>AI Objective: ₹19</div>
                </div>
                <div className="text-xl font-bold text-gray-700 mb-3">₹68 Total</div>
                <Button 
                  variant="outline" 
                  onClick={onPurchaseSeparate}
                  className="w-full"
                  disabled={isProcessing}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Separately
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={onClose} className="text-gray-500" disabled={isProcessing}>
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BundleOfferModal;
