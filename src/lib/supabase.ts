import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
