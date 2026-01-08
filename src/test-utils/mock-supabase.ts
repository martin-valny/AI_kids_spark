/**
 * Mock Supabase Client for Testing
 * Provides a fully mocked Supabase client with common methods and responses
 */

import type { SupabaseClient, User, Session } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

/**
 * Mock user data for testing
 */
export const mockUser: User = {
  id: 'test-user-123',
  app_metadata: {},
  user_metadata: {
    name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
  },
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00.000Z',
  email: 'testuser@example.com',
  email_confirmed_at: '2024-01-01T00:00:00.000Z',
  phone: '',
  confirmed_at: '2024-01-01T00:00:00.000Z',
  last_sign_in_at: '2024-01-01T00:00:00.000Z',
  role: 'authenticated',
  updated_at: '2024-01-01T00:00:00.000Z',
};

/**
 * Mock session data for testing
 */
export const mockSession: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Date.now() / 1000 + 3600,
  token_type: 'bearer',
  user: mockUser,
};

/**
 * Mock progress data (example structure)
 */
export const mockProgressData = {
  user_id: mockUser.id,
  lesson_id: 'intro-to-ai',
  completed: true,
  completed_at: '2024-01-01T12:00:00.000Z',
  progress_percentage: 100,
};

/**
 * Creates a mock Supabase response
 */
function createMockResponse<T>(data: T, error: Error | null = null) {
  return {
    data,
    error,
    count: null,
    status: error ? 400 : 200,
    statusText: error ? 'Bad Request' : 'OK',
  };
}

/**
 * Mock Supabase Query Builder
 * Chainable API that mimics Supabase query syntax
 */
class MockQueryBuilder<T> {
  private mockData: T[] = [];
  private mockError: Error | null = null;
  private filters: Record<string, unknown> = {};

  constructor(initialData: T[] = []) {
    this.mockData = initialData;
  }

  select(columns?: string) {
    return this;
  }

  insert(data: Partial<T> | Partial<T>[]) {
    const records = Array.isArray(data) ? data : [data];
    this.mockData = [...this.mockData, ...records as T[]];
    return this;
  }

  update(data: Partial<T>) {
    this.mockData = this.mockData.map(item => ({ ...item, ...data }));
    return this;
  }

  delete() {
    this.mockData = [];
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters[column] = value;
    return this;
  }

  neq(column: string, value: unknown) {
    return this;
  }

  gt(column: string, value: unknown) {
    return this;
  }

  lt(column: string, value: unknown) {
    return this;
  }

  gte(column: string, value: unknown) {
    return this;
  }

  lte(column: string, value: unknown) {
    return this;
  }

  like(column: string, pattern: string) {
    return this;
  }

  ilike(column: string, pattern: string) {
    return this;
  }

  is(column: string, value: unknown) {
    return this;
  }

  in(column: string, values: unknown[]) {
    return this;
  }

  contains(column: string, value: unknown) {
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    return this;
  }

  limit(count: number) {
    this.mockData = this.mockData.slice(0, count);
    return this;
  }

  range(from: number, to: number) {
    this.mockData = this.mockData.slice(from, to + 1);
    return this;
  }

  single() {
    return this.then();
  }

  maybeSingle() {
    return this.then();
  }

  then() {
    return Promise.resolve(
      createMockResponse(
        this.mockData.length === 1 ? this.mockData[0] : this.mockData,
        this.mockError
      )
    );
  }

  setMockData(data: T[]) {
    this.mockData = data;
    return this;
  }

  setMockError(error: Error) {
    this.mockError = error;
    return this;
  }
}

/**
 * Mock Supabase Auth
 */
const mockAuth = {
  getSession: jest.fn(() =>
    Promise.resolve(createMockResponse({ session: mockSession }))
  ),
  getUser: jest.fn(() => Promise.resolve(createMockResponse({ user: mockUser }))),
  signInWithPassword: jest.fn(() =>
    Promise.resolve(
      createMockResponse({
        user: mockUser,
        session: mockSession,
      })
    )
  ),
  signInWithOAuth: jest.fn(() =>
    Promise.resolve(createMockResponse({ url: 'https://oauth.example.com' }))
  ),
  signUp: jest.fn(() =>
    Promise.resolve(
      createMockResponse({
        user: mockUser,
        session: mockSession,
      })
    )
  ),
  signOut: jest.fn(() => Promise.resolve(createMockResponse({}))),
  resetPasswordForEmail: jest.fn(() => Promise.resolve(createMockResponse({}))),
  updateUser: jest.fn((updates) =>
    Promise.resolve(
      createMockResponse({
        user: { ...mockUser, ...updates },
      })
    )
  ),
  onAuthStateChange: jest.fn((callback) => {
    // Immediately call with initial state
    callback('SIGNED_IN', mockSession);
    return {
      data: { subscription: { unsubscribe: jest.fn() } },
    };
  }),
  refreshSession: jest.fn(() =>
    Promise.resolve(createMockResponse({ session: mockSession }))
  ),
};

/**
 * Mock Supabase Storage
 */
const mockStorage = {
  from: jest.fn((bucket: string) => ({
    upload: jest.fn(() =>
      Promise.resolve(
        createMockResponse({
          path: `${bucket}/test-file.jpg`,
          id: 'test-file-id',
          fullPath: `${bucket}/test-file.jpg`,
        })
      )
    ),
    download: jest.fn(() =>
      Promise.resolve(createMockResponse(new Blob(['test content'])))
    ),
    list: jest.fn(() =>
      Promise.resolve(
        createMockResponse([
          {
            name: 'test-file.jpg',
            id: 'test-file-id',
            updated_at: '2024-01-01T00:00:00.000Z',
            created_at: '2024-01-01T00:00:00.000Z',
            last_accessed_at: '2024-01-01T00:00:00.000Z',
            metadata: {},
          },
        ])
      )
    ),
    remove: jest.fn(() => Promise.resolve(createMockResponse({}))),
    getPublicUrl: jest.fn((path: string) => ({
      data: {
        publicUrl: `https://example.com/storage/${bucket}/${path}`,
      },
    })),
    createSignedUrl: jest.fn((path: string) =>
      Promise.resolve(
        createMockResponse({
          signedUrl: `https://example.com/storage/${bucket}/${path}?token=signed`,
        })
      )
    ),
  })),
};

/**
 * Mock Supabase RPC (Remote Procedure Call)
 */
const mockRpc = jest.fn((functionName: string, params?: Record<string, unknown>) => {
  return Promise.resolve(
    createMockResponse({
      success: true,
      data: {},
    })
  );
});

/**
 * Creates a mock Supabase client
 */
export function createMockSupabaseClient(): Partial<SupabaseClient<Database>> {
  return {
    auth: mockAuth as unknown as SupabaseClient['auth'],
    storage: mockStorage as unknown as SupabaseClient['storage'],
    rpc: mockRpc as unknown as SupabaseClient['rpc'],
    from: jest.fn((table: string) => new MockQueryBuilder()),
    channel: jest.fn(() => ({
      on: jest.fn(() => ({
        subscribe: jest.fn(() => ({
          unsubscribe: jest.fn(),
        })),
      })),
    })),
    removeChannel: jest.fn(() => Promise.resolve('ok')),
    removeAllChannels: jest.fn(() => Promise.resolve([])),
    getChannels: jest.fn(() => []),
  } as Partial<SupabaseClient<Database>>;
}

/**
 * Mock Supabase client instance
 * Can be imported and used directly in tests
 */
export const mockSupabase = createMockSupabaseClient();

/**
 * Helper to reset all mocks
 * Call this in beforeEach() to ensure clean state
 */
export function resetMockSupabase() {
  jest.clearAllMocks();
  mockAuth.getSession.mockResolvedValue(
    createMockResponse({ session: mockSession })
  );
  mockAuth.getUser.mockResolvedValue(createMockResponse({ user: mockUser }));
}

/**
 * Helper to mock authentication state
 */
export function mockAuthState(
  state: 'authenticated' | 'unauthenticated' | 'loading'
) {
  if (state === 'authenticated') {
    mockAuth.getSession.mockResolvedValue(
      createMockResponse({ session: mockSession })
    );
    mockAuth.getUser.mockResolvedValue(createMockResponse({ user: mockUser }));
  } else if (state === 'unauthenticated') {
    mockAuth.getSession.mockResolvedValue(
      createMockResponse({ session: null })
    );
    mockAuth.getUser.mockResolvedValue(
      createMockResponse(null, new Error('No user found'))
    );
  } else if (state === 'loading') {
    mockAuth.getSession.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );
  }
}

/**
 * Helper to mock specific table data
 */
export function mockTableData<T>(table: string, data: T[]) {
  const queryBuilder = new MockQueryBuilder<T>(data);
  (mockSupabase.from as jest.Mock).mockImplementation((tableName: string) => {
    if (tableName === table) {
      return queryBuilder;
    }
    return new MockQueryBuilder<T>();
  });
  return queryBuilder;
}

/**
 * Helper to mock query errors
 */
export function mockQueryError(table: string, error: Error) {
  const queryBuilder = new MockQueryBuilder();
  queryBuilder.setMockError(error);
  (mockSupabase.from as jest.Mock).mockImplementation((tableName: string) => {
    if (tableName === table) {
      return queryBuilder;
    }
    return new MockQueryBuilder();
  });
}

/**
 * Export types for use in tests
 */
export type MockSupabaseClient = ReturnType<typeof createMockSupabaseClient>;

/**
 * Usage Examples:
 *
 * @example
 * ```typescript
 * import { mockSupabase, resetMockSupabase, mockAuthState, mockTableData } from '@/test-utils/mock-supabase';
 *
 * describe('MyComponent', () => {
 *   beforeEach(() => {
 *     resetMockSupabase();
 *   });
 *
 *   it('renders user data', async () => {
 *     mockAuthState('authenticated');
 *     mockTableData('profiles', [{ id: '1', name: 'Test User' }]);
 *
 *     const { getByText } = render(<MyComponent />);
 *     await waitFor(() => expect(getByText('Test User')).toBeInTheDocument());
 *   });
 *
 *   it('handles unauthenticated state', () => {
 *     mockAuthState('unauthenticated');
 *     const { getByText } = render(<MyComponent />);
 *     expect(getByText('Please log in')).toBeInTheDocument();
 *   });
 * });
 * ```
 */
