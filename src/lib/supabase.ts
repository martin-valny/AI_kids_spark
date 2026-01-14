import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Create a mock client for development without Supabase credentials
const createMockClient = () => {
  const mockResponse = { data: null, error: null };
  const mockAuth = {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signUp: async () => mockResponse,
    signInWithPassword: async () => mockResponse,
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  };

  return {
    auth: mockAuth,
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => mockResponse,
      update: () => mockResponse,
      delete: () => mockResponse,
      eq: () => ({ data: [], error: null }),
      single: () => mockResponse,
    }),
  } as unknown as SupabaseClient;
};

// Use real client if credentials exist, otherwise use mock
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Flag to check if using real Supabase
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase not configured. Running in demo mode without authentication.');
}

// Database types for TypeScript
export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  birth_date: string; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface ProjectProgress {
  id: string;
  user_id: string;
  project_id: string;
  unlocked: boolean;
  started: boolean;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}
