
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
  RAZORPAY_KEY: 'rzp_test_1234567890', // Replace with actual key
  INSTAMOJO_CLIENT_ID: 'test_client_id', // Replace with actual client ID
  PREMIUM_TEMPLATE_PRICE: 49,
  AI_OBJECTIVE_PRICE: 19,
};

// API utility functions
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

// Payment utility functions
export const initiatePayment = async (amount: number, purpose: string) => {
  // This would integrate with Razorpay or Instamojo
  // For now, return a mock response
  return {
    success: true,
    paymentUrl: 'https://payment-gateway.com/pay',
    orderId: `order_${Date.now()}`,
  };
};
