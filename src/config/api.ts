
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  ENDPOINTS: {
    GENERATE_RESUME: '/generate-resume',
    GENERATE_OBJECTIVE: '/generate-objective',
  },
  TIMEOUT: 30000, // 30 seconds
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
