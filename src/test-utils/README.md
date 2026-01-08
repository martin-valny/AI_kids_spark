# Test Utilities

Comprehensive testing utilities for the AI Kids Spark platform. This directory contains helpers, mocks, and fixtures to make testing easier and more consistent across the codebase.

## Overview

This test utilities package provides:

- **Render Utilities**: Pre-configured render functions with all necessary providers
- **Mock Supabase**: Complete mock implementation of Supabase client for testing
- **Test Data**: Realistic fixtures for activities, lessons, projects, and user data

## Quick Start

```typescript
import { render, screen, mockSupabase, mockActivities } from '@/test-utils';

test('renders activity card', () => {
  const activity = mockActivities[0];
  render(<ActivityCard activity={activity} />);

  expect(screen.getByText(activity.title)).toBeInTheDocument();
});
```

## Files

### 1. `render-with-providers.tsx`

Provides custom render functions that wrap components with all necessary React context providers.

**Providers included:**
- React Query (`QueryClientProvider`)
- React Router (`BrowserRouter` or `MemoryRouter`)
- Tooltip Provider
- Toast/Sonner notifications

#### Usage

```typescript
import { renderWithProviders, screen } from '@/test-utils/render-with-providers';

// Basic usage
test('renders component', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

// With custom route
test('renders on specific route', () => {
  renderWithProviders(<MyComponent />, {
    initialRoute: '/lessons/intro-to-ai'
  });
});

// With navigation history
test('renders with route history', () => {
  renderWithProviders(<MyComponent />, {
    initialRoutes: ['/', '/about', '/lessons'],
    initialIndex: 2  // Start at /lessons
  });
});

// Without router (for components that don't use routing)
import { renderWithQueryClient } from '@/test-utils/render-with-providers';

test('renders without router', () => {
  renderWithQueryClient(<MyComponent />);
});
```

### 2. `mock-supabase.ts`

Complete mock implementation of the Supabase client for testing without database dependencies.

#### Features

- Mock authentication (signIn, signUp, signOut)
- Mock database queries (select, insert, update, delete)
- Mock storage operations (upload, download, list)
- Mock RPC calls
- Chainable query builder API
- Configurable responses and errors

#### Usage

```typescript
import {
  mockSupabase,
  resetMockSupabase,
  mockAuthState,
  mockTableData,
  mockUser,
  mockSession
} from '@/test-utils/mock-supabase';

describe('User Profile', () => {
  beforeEach(() => {
    resetMockSupabase(); // Reset all mocks before each test
  });

  test('displays user when authenticated', async () => {
    mockAuthState('authenticated');

    render(<UserProfile />);
    await waitFor(() => {
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });
  });

  test('shows login prompt when unauthenticated', () => {
    mockAuthState('unauthenticated');

    render(<UserProfile />);
    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });

  test('loads user progress', async () => {
    mockTableData('user_progress', [
      { user_id: 'test-123', lesson_id: 'intro-to-ai', completed: true }
    ]);

    render(<ProgressDashboard />);
    await waitFor(() => {
      expect(screen.getByText('intro-to-ai')).toBeInTheDocument();
    });
  });
});
```

#### Mock Authentication States

```typescript
// Authenticated user
mockAuthState('authenticated');

// Unauthenticated (logged out)
mockAuthState('unauthenticated');

// Loading state (async operation in progress)
mockAuthState('loading');
```

#### Mock Database Operations

```typescript
// Mock table data
mockTableData('lessons', [
  { id: '1', title: 'Intro to AI', completed: false },
  { id: '2', title: 'ML Basics', completed: true }
]);

// Mock query error
mockQueryError('lessons', new Error('Database connection failed'));
```

### 3. `test-data.ts`

Comprehensive test fixtures for all major data types in the application.

#### Available Data

- **Lessons**: `mockLessons` - 6 realistic lesson objects
- **Activities**: `mockActivities` - 6 diverse activity examples
- **Projects**: `mockProjects` - 3 project examples
- **User Progress**: `mockUserProgress` - Sample progress data
- **Activity Completions**: `mockActivityCompletions` - Completion records
- **User Profile**: `mockUserProfile` - Sample user profile
- **Quiz Questions**: `mockQuizQuestions` - Sample quiz data

#### Usage

```typescript
import {
  mockActivities,
  mockLessons,
  getActivityById,
  getLessonById,
  isActivityUnlocked,
  createTestUserWithProgress
} from '@/test-utils/test-data';

// Use pre-defined mock data
test('displays activity list', () => {
  render(<ActivityList activities={mockActivities} />);
  expect(screen.getAllByRole('article')).toHaveLength(mockActivities.length);
});

// Get specific items
test('renders specific activity', () => {
  const activity = getActivityById('quick-draw');
  render(<ActivityCard activity={activity} />);
  expect(screen.getByText('Quick Draw Challenge')).toBeInTheDocument();
});

// Check unlock status
test('activity is locked when lesson incomplete', () => {
  const isUnlocked = isActivityUnlocked('test-user-123', 'build-image-classifier');
  expect(isUnlocked).toBe(false);
});

// Create test user with specific progress
test('shows completed lessons', () => {
  const testUser = createTestUserWithProgress(
    ['intro-to-ai', 'machine-learning-basics'], // completed lessons
    ['quick-draw'] // completed activities
  );

  render(<Dashboard user={testUser.profile} progress={testUser.progress} />);
  expect(screen.getByText('2 lessons completed')).toBeInTheDocument();
});
```

#### Helper Functions

```typescript
// Get items by ID
getActivityById(id: string): Activity | undefined
getLessonById(id: string): TestLesson | undefined

// Filter activities
getActivitiesByCategory(category: 'creative' | 'logic' | 'ethics' | 'coding'): Activity[]
getActivitiesByDifficulty(difficulty: 'Easy' | 'Medium' | 'Challenging'): Activity[]

// User progress helpers
getUserLessonProgress(userId: string, lessonId: string): TestUserProgress | undefined
getCompletedLessons(userId: string): TestUserProgress[]

// Check unlock status
isLessonUnlocked(userId: string, lessonId: string): boolean
isActivityUnlocked(userId: string, activityId: string): boolean

// Generate test data
generateTestUserId(): string
createTestUserWithProgress(completedLessons: string[], completedActivities: string[]): {...}
```

### 4. `index.ts`

Central export point for all test utilities.

```typescript
// Import everything from one place
import {
  render,
  screen,
  waitFor,
  mockSupabase,
  mockActivities,
  mockLessons,
  testData
} from '@/test-utils';
```

## Complete Example

Here's a complete example testing a component that uses routing, authentication, and data:

```typescript
import {
  render,
  screen,
  waitFor,
  mockSupabase,
  mockAuthState,
  mockTableData,
  mockActivities,
  resetMockSupabase
} from '@/test-utils';
import ActivityPage from './ActivityPage';

describe('ActivityPage', () => {
  beforeEach(() => {
    resetMockSupabase();
  });

  test('displays activity when authenticated', async () => {
    // Setup auth
    mockAuthState('authenticated');

    // Setup data
    const activity = mockActivities[0];
    mockTableData('activities', [activity]);
    mockTableData('user_progress', [
      {
        user_id: 'test-user-123',
        lesson_id: activity.requiredLesson,
        completed: true
      }
    ]);

    // Render with routing
    render(<ActivityPage />, {
      initialRoute: `/activities/${activity.id}`
    });

    // Assert
    await waitFor(() => {
      expect(screen.getByText(activity.title)).toBeInTheDocument();
      expect(screen.getByText(activity.description)).toBeInTheDocument();
    });
  });

  test('shows login prompt when unauthenticated', () => {
    mockAuthState('unauthenticated');

    render(<ActivityPage />, {
      initialRoute: '/activities/quick-draw'
    });

    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });

  test('shows locked message when lesson incomplete', async () => {
    mockAuthState('authenticated');

    const activity = mockActivities[0];
    mockTableData('activities', [activity]);
    mockTableData('user_progress', []); // No completed lessons

    render(<ActivityPage />, {
      initialRoute: `/activities/${activity.id}`
    });

    await waitFor(() => {
      expect(screen.getByText(/complete.*lesson first/i)).toBeInTheDocument();
    });
  });
});
```

## Testing Best Practices

### 1. Reset Mocks Between Tests

Always reset mocks in `beforeEach` to ensure clean state:

```typescript
beforeEach(() => {
  resetMockSupabase();
});
```

### 2. Use Semantic Queries

Prefer accessible queries over implementation details:

```typescript
// Good
screen.getByRole('button', { name: /start activity/i })
screen.getByLabelText('Email address')

// Avoid
screen.getByTestId('submit-button')
screen.getByClassName('btn-primary')
```

### 3. Wait for Async Updates

Always wait for async state changes:

```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded!')).toBeInTheDocument();
});
```

### 4. Test User Interactions

Simulate real user behavior:

```typescript
import { fireEvent } from '@/test-utils';

test('submits form on button click', async () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText('Email');
  const submitButton = screen.getByRole('button', { name: /log in/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});
```

### 5. Test Error States

Don't forget to test error handling:

```typescript
test('displays error when query fails', async () => {
  mockQueryError('lessons', new Error('Network error'));

  render(<LessonList />);

  await waitFor(() => {
    expect(screen.getByText(/error loading lessons/i)).toBeInTheDocument();
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ActivityPage.test.tsx
```

## Adding New Test Utilities

When adding new test utilities:

1. Create the utility file in `src/test-utils/`
2. Export it from `index.ts`
3. Document usage in this README
4. Add examples demonstrating the utility

## TypeScript Support

All test utilities are fully typed. TypeScript will provide autocomplete and type checking:

```typescript
import { mockActivities } from '@/test-utils';

// TypeScript knows the shape of activities
mockActivities.forEach(activity => {
  console.log(activity.title); // ✓ Type-safe
  console.log(activity.invalid); // ✗ Type error
});
```

## Troubleshooting

### Issue: "Cannot find module '@/test-utils'"

Ensure your `tsconfig.json` includes the path alias:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Tests timing out

Increase timeout in your test file:

```typescript
test('async operation', async () => {
  // Test code
}, 10000); // 10 second timeout
```

### Issue: Mock not resetting between tests

Make sure you're calling `resetMockSupabase()` in `beforeEach`:

```typescript
beforeEach(() => {
  resetMockSupabase();
});
```

## Contributing

When contributing to test utilities:

1. Follow existing patterns and conventions
2. Add comprehensive documentation
3. Include usage examples
4. Ensure TypeScript types are accurate
5. Test your utilities with real test cases
