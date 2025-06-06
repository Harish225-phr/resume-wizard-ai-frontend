
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  currency: string;
  description: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

class PaymentService {
  private razorpayKey = 'rzp_test_1234567890'; // Test key - replace with actual key later

  private loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async initiatePayment(options: PaymentOptions): Promise<PaymentResult> {
    const isLoaded = await this.loadRazorpayScript();
    
    if (!isLoaded) {
      return {
        success: false,
        error: 'Payment gateway failed to load. Please try again.'
      };
    }

    return new Promise((resolve) => {
      const razorpayOptions = {
        key: this.razorpayKey,
        amount: options.amount * 100, // Razorpay expects amount in paise
        currency: options.currency,
        name: 'ResumeBuilder Pro',
        description: options.description,
        order_id: options.orderId,
        prefill: options.prefill || {},
        theme: {
          color: '#3B82F6'
        },
        handler: (response: any) => {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        },
        modal: {
          ondismiss: () => {
            resolve({
              success: false,
              error: 'Payment cancelled by user'
            });
          }
        }
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    });
  }

  // For future payment providers
  async processPayment(provider: 'razorpay' | 'instamojo', options: PaymentOptions): Promise<PaymentResult> {
    switch (provider) {
      case 'razorpay':
        return this.initiatePayment(options);
      case 'instamojo':
        // Future implementation
        throw new Error('Instamojo integration not yet implemented');
      default:
        throw new Error('Unsupported payment provider');
    }
  }
}

export const paymentService = new PaymentService();
