/**
 * Test Fixtures and Mock Data
 * Provides consistent test data for activities, lessons, projects, and user progress
 */

import type { Activity } from '@/data/activitiesData';

/**
 * Lesson Test Data
 */
export interface TestLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  topics: string[];
  prerequisites?: string[];
}

export const mockLessons: TestLesson[] = [
  {
    id: 'intro-to-ai',
    title: 'Introduction to AI',
    description: 'Learn the basics of Artificial Intelligence and how machines can think!',
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    topics: ['AI Basics', 'Machine Learning', 'Neural Networks'],
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    description: 'Discover how computers learn from data and make predictions.',
    difficulty: 'Beginner',
    estimatedTime: '45 min',
    topics: ['Supervised Learning', 'Training Data', 'Patterns'],
    prerequisites: ['intro-to-ai'],
  },
  {
    id: 'image-recognition',
    title: 'Image Recognition',
    description: 'Learn how AI can see and understand images like humans do.',
    difficulty: 'Intermediate',
    estimatedTime: '40 min',
    topics: ['Computer Vision', 'Image Classification', 'Neural Networks'],
    prerequisites: ['intro-to-ai', 'machine-learning-basics'],
  },
  {
    id: 'data-and-patterns',
    title: 'Data and Patterns',
    description: 'Understand how AI finds patterns in data to make smart decisions.',
    difficulty: 'Intermediate',
    estimatedTime: '35 min',
    topics: ['Data Analysis', 'Pattern Recognition', 'Decision Making'],
    prerequisites: ['machine-learning-basics'],
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics',
    description: 'Explore the important questions about using AI responsibly.',
    difficulty: 'Intermediate',
    estimatedTime: '30 min',
    topics: ['Responsible AI', 'Bias', 'Privacy', 'Fairness'],
    prerequisites: ['intro-to-ai'],
  },
  {
    id: 'future-of-ai',
    title: 'Future of AI',
    description: 'Imagine what AI might help us create in the future!',
    difficulty: 'Beginner',
    estimatedTime: '25 min',
    topics: ['Future Technology', 'Innovation', 'Career Paths'],
    prerequisites: ['intro-to-ai'],
  },
];

/**
 * Activity Test Data
 */
export const mockActivities: Activity[] = [
  {
    id: 'quick-draw',
    title: 'Quick Draw Challenge',
    description: "Draw pictures and see if AI can recognize what you're drawing!",
    category: 'creative',
    difficulty: 'Easy',
    estimatedTime: '15 min',
    requiredLesson: 'image-recognition',
    path: '/activities/image-recognition/quick-draw',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'pattern-detective',
    title: 'Pattern Detective',
    description: 'Become a detective and find hidden patterns in data!',
    category: 'logic',
    difficulty: 'Easy',
    estimatedTime: '20 min',
    requiredLesson: 'data-and-patterns',
    path: '/activities/pattern-detective',
    icon: '🔍',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'emoji-detector',
    title: 'Emoji Emotion Detector',
    description: 'Train an AI to recognize emotions from emoji faces!',
    category: 'creative',
    difficulty: 'Medium',
    estimatedTime: '25 min',
    requiredLesson: 'machine-learning-basics',
    path: '/activities/emoji-detector',
    icon: '😊',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'ai-ethics-scenarios',
    title: 'AI Ethics Scenarios',
    description: 'Explore real-world ethical dilemmas in AI and make important decisions.',
    category: 'ethics',
    difficulty: 'Medium',
    estimatedTime: '30 min',
    requiredLesson: 'ai-ethics',
    path: '/activities/ai-ethics-scenarios',
    icon: '⚖️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'build-image-classifier',
    title: 'Build an Image Classifier',
    description: 'Create your own AI that can classify different types of images!',
    category: 'coding',
    difficulty: 'Challenging',
    estimatedTime: '45 min',
    requiredLesson: 'image-recognition',
    path: '/activities/build-image-classifier',
    icon: '🤖',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'future-ai-invention',
    title: 'Future AI Invention',
    description: 'Design your own AI invention for the future!',
    category: 'creative',
    difficulty: 'Easy',
    estimatedTime: '20 min',
    requiredLesson: 'future-of-ai',
    path: '/activities/future-ai-invention',
    icon: '💡',
    color: 'from-yellow-500 to-orange-500',
  },
];

/**
 * Project Test Data
 */
export interface TestProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  path: string;
  prerequisites: string[];
  icon: string;
}

export const mockProjects: TestProject[] = [
  {
    id: 'music-ai-creator',
    title: 'Music AI Creator',
    description: 'Create your own AI-powered music compositions!',
    difficulty: 'Intermediate',
    estimatedTime: '60 min',
    path: '/projects/music-ai-creator',
    prerequisites: ['intro-to-ai', 'machine-learning-basics'],
    icon: '🎵',
  },
  {
    id: 'ai-art-studio',
    title: 'AI Art Studio',
    description: 'Generate beautiful artwork using AI algorithms.',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    path: '/projects/ai-art-studio',
    prerequisites: ['image-recognition'],
    icon: '🎨',
  },
  {
    id: 'build-chatbot',
    title: 'Build a Chatbot',
    description: 'Create your own AI chatbot that can have conversations!',
    difficulty: 'Advanced',
    estimatedTime: '90 min',
    path: '/projects/build-chatbot',
    prerequisites: ['intro-to-ai', 'machine-learning-basics', 'data-and-patterns'],
    icon: '💬',
  },
];

/**
 * User Progress Test Data
 */
export interface TestUserProgress {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
  progress_percentage: number;
  time_spent?: number; // in seconds
}

export const mockUserProgress: TestUserProgress[] = [
  {
    user_id: 'test-user-123',
    lesson_id: 'intro-to-ai',
    completed: true,
    completed_at: '2024-01-15T10:30:00Z',
    progress_percentage: 100,
    time_spent: 1800, // 30 minutes
  },
  {
    user_id: 'test-user-123',
    lesson_id: 'machine-learning-basics',
    completed: true,
    completed_at: '2024-01-16T14:20:00Z',
    progress_percentage: 100,
    time_spent: 2700, // 45 minutes
  },
  {
    user_id: 'test-user-123',
    lesson_id: 'image-recognition',
    completed: false,
    progress_percentage: 65,
    time_spent: 1560, // 26 minutes (in progress)
  },
  {
    user_id: 'test-user-123',
    lesson_id: 'data-and-patterns',
    completed: false,
    progress_percentage: 0,
  },
];

/**
 * Activity Completion Test Data
 */
export interface TestActivityCompletion {
  user_id: string;
  activity_id: string;
  completed: boolean;
  completed_at?: string;
  score?: number;
  attempts: number;
}

export const mockActivityCompletions: TestActivityCompletion[] = [
  {
    user_id: 'test-user-123',
    activity_id: 'quick-draw',
    completed: true,
    completed_at: '2024-01-17T09:15:00Z',
    score: 85,
    attempts: 1,
  },
  {
    user_id: 'test-user-123',
    activity_id: 'pattern-detective',
    completed: true,
    completed_at: '2024-01-17T10:00:00Z',
    score: 92,
    attempts: 2,
  },
  {
    user_id: 'test-user-123',
    activity_id: 'emoji-detector',
    completed: false,
    attempts: 1,
  },
];

/**
 * User Profile Test Data
 */
export interface TestUserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  age_group?: 'under-8' | '8-10' | '11-13' | '14+';
  created_at: string;
  preferences?: {
    theme?: 'light' | 'dark';
    difficulty?: 'easy' | 'medium' | 'hard';
    notifications?: boolean;
  };
}

export const mockUserProfile: TestUserProfile = {
  id: 'test-user-123',
  email: 'testuser@example.com',
  display_name: 'Test Kid',
  avatar_url: 'https://example.com/avatar.jpg',
  age_group: '8-10',
  created_at: '2024-01-10T08:00:00Z',
  preferences: {
    theme: 'light',
    difficulty: 'medium',
    notifications: true,
  },
};

/**
 * Quiz Question Test Data
 */
export interface TestQuizQuestion {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_answer: number; // index of correct option
  explanation: string;
}

export const mockQuizQuestions: TestQuizQuestion[] = [
  {
    id: 'q1',
    lesson_id: 'intro-to-ai',
    question: 'What does AI stand for?',
    options: [
      'Automated Intelligence',
      'Artificial Intelligence',
      'Advanced Internet',
      'Automatic Information',
    ],
    correct_answer: 1,
    explanation: 'AI stands for Artificial Intelligence - the simulation of human intelligence by machines.',
  },
  {
    id: 'q2',
    lesson_id: 'machine-learning-basics',
    question: 'How do machines learn from data?',
    options: [
      'By memorizing everything',
      'By finding patterns in examples',
      'By randomly guessing',
      'By copying humans exactly',
    ],
    correct_answer: 1,
    explanation: 'Machines learn by analyzing many examples and finding patterns in the data.',
  },
  {
    id: 'q3',
    lesson_id: 'image-recognition',
    question: 'What is computer vision?',
    options: [
      'A computer screen',
      'The ability of computers to understand images',
      'A special type of camera',
      'A video game',
    ],
    correct_answer: 1,
    explanation: 'Computer vision is the field of AI that enables computers to see and understand images.',
  },
];

/**
 * Helper Functions for Test Data
 */

/**
 * Get activity by ID
 */
export function getActivityById(id: string): Activity | undefined {
  return mockActivities.find(activity => activity.id === id);
}

/**
 * Get lesson by ID
 */
export function getLessonById(id: string): TestLesson | undefined {
  return mockLessons.find(lesson => lesson.id === id);
}

/**
 * Get user progress for a specific lesson
 */
export function getUserLessonProgress(
  userId: string,
  lessonId: string
): TestUserProgress | undefined {
  return mockUserProgress.find(
    progress => progress.user_id === userId && progress.lesson_id === lessonId
  );
}

/**
 * Get all completed lessons for a user
 */
export function getCompletedLessons(userId: string): TestUserProgress[] {
  return mockUserProgress.filter(
    progress => progress.user_id === userId && progress.completed
  );
}

/**
 * Get all activities for a category
 */
export function getActivitiesByCategory(
  category: Activity['category']
): Activity[] {
  return mockActivities.filter(activity => activity.category === category);
}

/**
 * Get all activities by difficulty
 */
export function getActivitiesByDifficulty(
  difficulty: Activity['difficulty']
): Activity[] {
  return mockActivities.filter(activity => activity.difficulty === difficulty);
}

/**
 * Check if a lesson is unlocked for a user
 */
export function isLessonUnlocked(userId: string, lessonId: string): boolean {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;

  // If no prerequisites, lesson is always unlocked
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) return true;

  // Check if all prerequisites are completed
  const completedLessonIds = getCompletedLessons(userId).map(p => p.lesson_id);
  return lesson.prerequisites.every(prereq =>
    completedLessonIds.includes(prereq)
  );
}

/**
 * Check if an activity is unlocked for a user
 */
export function isActivityUnlocked(userId: string, activityId: string): boolean {
  const activity = getActivityById(activityId);
  if (!activity) return false;

  // Check if required lesson is completed
  const lessonProgress = getUserLessonProgress(userId, activity.requiredLesson);
  return lessonProgress?.completed === true;
}

/**
 * Generate random test user ID
 */
export function generateTestUserId(): string {
  return `test-user-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Create a complete test user with progress
 */
export function createTestUserWithProgress(
  completedLessons: string[] = [],
  completedActivities: string[] = []
): {
  profile: TestUserProfile;
  progress: TestUserProgress[];
  completions: TestActivityCompletion[];
} {
  const userId = generateTestUserId();

  const progress: TestUserProgress[] = completedLessons.map((lessonId, index) => ({
    user_id: userId,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date(Date.now() - (completedLessons.length - index) * 86400000).toISOString(),
    progress_percentage: 100,
    time_spent: Math.floor(Math.random() * 3600) + 1800,
  }));

  const completions: TestActivityCompletion[] = completedActivities.map((activityId, index) => ({
    user_id: userId,
    activity_id: activityId,
    completed: true,
    completed_at: new Date(Date.now() - (completedActivities.length - index) * 86400000).toISOString(),
    score: Math.floor(Math.random() * 30) + 70,
    attempts: Math.floor(Math.random() * 3) + 1,
  }));

  return {
    profile: {
      ...mockUserProfile,
      id: userId,
    },
    progress,
    completions,
  };
}

/**
 * Export all mock data as a single object for convenience
 */
export const testData = {
  lessons: mockLessons,
  activities: mockActivities,
  projects: mockProjects,
  userProgress: mockUserProgress,
  activityCompletions: mockActivityCompletions,
  userProfile: mockUserProfile,
  quizQuestions: mockQuizQuestions,
};

/**
 * Usage Examples:
 *
 * @example
 * ```typescript
 * import { mockActivities, mockLessons, getActivityById } from '@/test-utils/test-data';
 *
 * // Use in tests
 * test('displays activity details', () => {
 *   const activity = getActivityById('quick-draw');
 *   render(<ActivityCard activity={activity} />);
 *   expect(screen.getByText('Quick Draw Challenge')).toBeInTheDocument();
 * });
 *
 * // Create test user with specific progress
 * test('shows unlocked activities', () => {
 *   const testUser = createTestUserWithProgress(
 *     ['intro-to-ai', 'image-recognition'],
 *     ['quick-draw']
 *   );
 *   // ... test with testUser data
 * });
 * ```
 */
