/**
 * Test Utilities - Main Export
 * Central export point for all test utilities
 *
 * Usage:
 * ```typescript
 * import { renderWithProviders, mockSupabase, mockActivities } from '@/test-utils';
 * ```
 */

// Re-export render utilities
export * from './render-with-providers';

// Re-export mock Supabase
export * from './mock-supabase';

// Re-export test data
export * from './test-data';

/**
 * Convenience exports for common testing patterns
 */
export { renderWithProviders as render } from './render-with-providers';
export { mockSupabase, createMockSupabaseClient } from './mock-supabase';
export { testData, mockActivities, mockLessons } from './test-data';
