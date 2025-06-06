
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { paymentService, PaymentOptions, PaymentResult } from '@/services/paymentService';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processPayment = async (
    options: PaymentOptions,
    onSuccess?: (result: PaymentResult) => void,
    onError?: (error: string) => void
  ) => {
    setIsProcessing(true);
    
    try {
      toast({
        title: "Initiating Payment",
        description: "Opening payment gateway...",
      });

      const result = await paymentService.initiatePayment(options);
      
      if (result.success) {
        toast({
          title: "🎉 Payment Successful!",
          description: `Payment of ₹${options.amount} completed successfully.`,
        });
        onSuccess?.(result);
      } else {
        const errorMessage = result.error || 'Payment failed. Please try again.';
        toast({
          title: "Payment Failed",
          description: errorMessage,
          variant: "destructive",
        });
        onError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'Payment processing failed. Please try again.';
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing
  };
};
