/**
 * Test Utilities - Render with Providers
 * Provides a test wrapper with all necessary React context providers
 * Includes: React Query, React Router, Tooltip Provider, and Toasters
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

/**
 * Custom render options extending RTL's RenderOptions
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Initial route for MemoryRouter (default: '/') */
  initialRoute?: string;
  /** Initial routes array for MemoryRouter (overrides initialRoute) */
  initialRoutes?: string[];
  /** Initial index for MemoryRouter routes */
  initialIndex?: number;
  /** Use MemoryRouter instead of BrowserRouter (default: true) */
  useMemoryRouter?: boolean;
  /** Custom QueryClient instance */
  queryClient?: QueryClient;
}

/**
 * Creates a default QueryClient for testing with appropriate defaults
 */
function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries in tests for faster feedback
        retry: false,
        // Disable caching in tests to ensure fresh data
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    // Suppress errors in console during tests
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // Suppress error logs in tests
    },
  });
}

/**
 * Wrapper component that provides all necessary context providers
 */
interface AllProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
  initialRoute?: string;
  initialRoutes?: string[];
  initialIndex?: number;
  useMemoryRouter: boolean;
}

function AllProviders({
  children,
  queryClient,
  initialRoute = '/',
  initialRoutes,
  initialIndex,
  useMemoryRouter,
}: AllProvidersProps) {
  const Router = useMemoryRouter ? MemoryRouter : BrowserRouter;
  const routerProps = useMemoryRouter
    ? {
        initialEntries: initialRoutes || [initialRoute],
        initialIndex,
      }
    : {};

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router {...routerProps}>
          {children}
          <Toaster />
          <Sonner />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

/**
 * Custom render function that wraps component with all providers
 *
 * @example
 * ```tsx
 * import { renderWithProviders } from '@/test-utils/render-with-providers';
 * import MyComponent from './MyComponent';
 *
 * test('renders component', () => {
 *   const { getByText } = renderWithProviders(<MyComponent />);
 *   expect(getByText('Hello')).toBeInTheDocument();
 * });
 *
 * // With custom initial route
 * test('renders on specific route', () => {
 *   const { getByText } = renderWithProviders(<MyComponent />, {
 *     initialRoute: '/lessons/intro-to-ai'
 *   });
 * });
 *
 * // With multiple routes
 * test('renders with navigation history', () => {
 *   const { getByText } = renderWithProviders(<MyComponent />, {
 *     initialRoutes: ['/', '/about', '/lessons'],
 *     initialIndex: 2
 *   });
 * });
 * ```
 */
export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const {
    initialRoute = '/',
    initialRoutes,
    initialIndex,
    useMemoryRouter = true,
    queryClient = createTestQueryClient(),
    ...renderOptions
  } = options;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllProviders
      queryClient={queryClient}
      initialRoute={initialRoute}
      initialRoutes={initialRoutes}
      initialIndex={initialIndex}
      useMemoryRouter={useMemoryRouter}
    >
      {children}
    </AllProviders>
  );

  return render(ui, { wrapper, ...renderOptions });
}

/**
 * Render with only QueryClient provider (no router)
 * Useful for testing components that don't use routing
 */
export function renderWithQueryClient(
  ui: ReactElement,
  options: { queryClient?: QueryClient } & Omit<RenderOptions, 'wrapper'> = {}
): RenderResult {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );

  return render(ui, { wrapper, ...renderOptions });
}

/**
 * Re-export everything from React Testing Library
 * This allows importing both custom render and RTL utilities from one place
 *
 * @example
 * ```tsx
 * import { renderWithProviders, screen, fireEvent, waitFor } from '@/test-utils/render-with-providers';
 * ```
 */
export * from '@testing-library/react';

/**
 * Export the custom render as 'render' to override default
 * Use named import to avoid confusion
 */
export { renderWithProviders as render };

/**
 * Export test QueryClient creator for custom test setups
 */
export { createTestQueryClient };
