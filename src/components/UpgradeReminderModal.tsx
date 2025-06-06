
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, TrendingUp, Award } from 'lucide-react';

interface UpgradeReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  freeTemplateSelections: number;
}

const UpgradeReminderModal = ({ isOpen, onClose, onUpgrade, freeTemplateSelections }: UpgradeReminderModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            Stand Out From The Crowd
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              You've used our free template {freeTemplateSelections} times. Ready to create a resume that stands out?
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Premium Benefits
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Professional designs that get noticed</li>
              <li>• Remove "Made with ResumeBuilder" watermark</li>
              <li>• Export in both PDF and DOCX formats</li>
              <li>• Color customization options</li>
              <li>• Resume scoring and improvement tips</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">₹49 only</div>
            <p className="text-sm text-gray-500 mb-4">One-time payment, lifetime access</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continue Free
            </Button>
            <Button 
              onClick={onUpgrade} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeReminderModal;
