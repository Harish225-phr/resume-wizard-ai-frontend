
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  ENDPOINTS: {
    GENERATE_RESUME: '/generate-resume',
    GENERATE_OBJECTIVE: '/generate-objective',
    PAYMENT_RAZORPAY: '/payment/razorpay',
    PAYMENT_INSTAMOJO: '/payment/instamojo',
  },
  TIMEOUT: 30000, // 30 seconds
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  RAZORPAY_KEY: 'rzp_test_1234567890', // Replace with actual test/live key
  INSTAMOJO_CLIENT_ID: 'test_client_id', // Replace with actual client ID
  PREMIUM_TEMPLATE_PRICE: 49,
  AI_OBJECTIVE_PRICE: 19,
  BUNDLE_PRICE: 48, // ₹68 - ₹20 discount
  CURRENCY: 'INR',
  COMPANY_NAME: 'ResumeBuilder Pro',
};

// Legacy API utility functions (kept for backward compatibility)
export const apiCall = async (endpoint: string, data: any) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Legacy payment utility (deprecated - use paymentService instead)
export const initiatePayment = async (amount: number, purpose: string) => {
  console.warn('initiatePayment is deprecated. Use paymentService instead.');
  return {
    success: true,
    paymentUrl: 'https://payment-gateway.com/pay',
    orderId: `order_${Date.now()}`,
  };
};
