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

  // Create chainable query builder mock
  const createQueryBuilder = () => {
    const builder: Record<string, unknown> = {};
    const methods = ['select', 'insert', 'update', 'delete', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in', 'contains', 'containedBy', 'range', 'overlaps', 'match', 'not', 'or', 'filter', 'order', 'limit', 'single', 'maybeSingle'];

    methods.forEach(method => {
      builder[method] = () => {
        // Return async result for terminal methods
        if (method === 'single' || method === 'maybeSingle') {
          return Promise.resolve({ data: null, error: null });
        }
        // Return builder for chaining
        return builder;
      };
    });

    // Add then for async/await support
    builder.then = (resolve: (value: { data: unknown[]; error: null }) => void) => resolve({ data: [], error: null });

    return builder;
  };

  // Mock channel for realtime subscriptions
  const createChannel = () => ({
    on: () => createChannel(),
    subscribe: () => ({ unsubscribe: () => {} }),
    unsubscribe: () => {},
  });

  return {
    auth: mockAuth,
    from: () => createQueryBuilder(),
    channel: () => createChannel(),
    removeChannel: () => {},
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
