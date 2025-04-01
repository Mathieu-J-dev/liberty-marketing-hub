
import { createClient } from '@supabase/supabase-js';

// Ensure we have valid URL and key values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if URL is valid before creating the client
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  try {
    // Test if the URL is valid
    new URL(supabaseUrl);
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Invalid Supabase URL:', error);
    // Create a dummy client that won't throw errors
    supabase = {
      auth: {
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: async () => ({ data: { session: null } }),
        signInWithPassword: async () => ({ error: { message: 'Configuration Supabase invalide' } }),
        signUp: async () => ({ error: { message: 'Configuration Supabase invalide' } }),
        signOut: async () => {}
      }
    };
  }
} else {
  console.warn('Supabase URL or Anonymous Key is missing');
  // Create a dummy client that won't throw errors
  supabase = {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: async () => ({ data: { session: null } }),
      signInWithPassword: async () => ({ error: { message: 'Configuration Supabase manquante' } }),
      signUp: async () => ({ error: { message: 'Configuration Supabase manquante' } }),
      signOut: async () => {}
    }
  };
}

export { supabase };
