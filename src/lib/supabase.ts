
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using mock client for development.');
  
  // Create a mock supabase client that won't crash the app
  export const supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.reject(new Error('Please connect to Supabase first')),
      signUp: () => Promise.reject(new Error('Please connect to Supabase first')),
      signInWithOAuth: () => Promise.reject(new Error('Please connect to Supabase first')),
      signOut: () => Promise.reject(new Error('Please connect to Supabase first')),
    }
  } as any;
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}
