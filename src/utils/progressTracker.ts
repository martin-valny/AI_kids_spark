// Progress Tracking Utility for AI Kids Spark Learn

// Debug flag - MUST be false in production
const DEBUG_UNLOCK_ALL = false;

export interface LessonProgress {
    lessonId: string;
    completed: boolean;
    completedAt?: Date;
}

export interface ProjectProgress {
    projectId: string;
    unlocked: boolean;
    started: boolean;
    completed: boolean;
    completedAt?: Date;
}

export interface UserProgress {
    lessons: LessonProgress[];
    projects: ProjectProgress[];
    lastUpdated: Date;
}

// Lesson IDs in order
export const LESSON_IDS = [
    'intro-to-ai',
    'machine-learning-basics',
    'data-and-patterns',
    'image-recognition',
    'simple-algorithms',
    'ai-ethics',
    'future-of-ai'
] as const;

// Project unlock requirements
export const PROJECT_REQUIREMENTS = {
    'music-ai-creator': ['intro-to-ai', 'machine-learning-basics'],
    'ai-art-studio': ['data-and-patterns', 'image-recognition'],
    'build-chatbot': ['simple-algorithms', 'ai-ethics'],
    'ai-video-magic': ['future-of-ai']
} as const;

const STORAGE_KEY = 'ai-kids-progress';

// Initialize default progress
const getDefaultProgress = (): UserProgress => ({
    lessons: LESSON_IDS.map(id => ({
        lessonId: id,
        completed: false
    })),
    projects: Object.keys(PROJECT_REQUIREMENTS).map(id => ({
        projectId: id,
        unlocked: false,
        started: false,
        completed: false
    })),
    lastUpdated: new Date()
});

// Load progress from localStorage
export const loadProgress = (): UserProgress => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return getDefaultProgress();

        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        if (parsed.lastUpdated) {
            parsed.lastUpdated = new Date(parsed.lastUpdated);
        }
        parsed.lessons.forEach((lesson: LessonProgress) => {
            if (lesson.completedAt) {
                lesson.completedAt = new Date(lesson.completedAt);
            }
        });
        parsed.projects.forEach((project: ProjectProgress) => {
            if (project.completedAt) {
                project.completedAt = new Date(project.completedAt);
            }
        });

        return parsed;
    } catch (error) {
        console.error('Error loading progress:', error);
        return getDefaultProgress();
    }
};

// Save progress to localStorage
export const saveProgress = (progress: UserProgress): void => {
    try {
        progress.lastUpdated = new Date();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};

// Mark a lesson as completed
export const completeLesson = (lessonId: string): void => {
    const progress = loadProgress();
    const lesson = progress.lessons.find(l => l.lessonId === lessonId);

    if (lesson && !lesson.completed) {
        lesson.completed = true;
        lesson.completedAt = new Date();

        // Update project unlock status
        updateProjectUnlocks(progress);

        saveProgress(progress);
    }
};

// Mark a lesson as incomplete (for testing/reset)
export const uncompleteLesson = (lessonId: string): void => {
    const progress = loadProgress();
    const lesson = progress.lessons.find(l => l.lessonId === lessonId);

    if (lesson) {
        lesson.completed = false;
        lesson.completedAt = undefined;

        // Update project unlock status
        updateProjectUnlocks(progress);

        saveProgress(progress);
    }
};

// Check if a lesson is completed
export const isLessonCompleted = (lessonId: string): boolean => {
    if (DEBUG_UNLOCK_ALL) return true;
    const progress = loadProgress();
    const lesson = progress.lessons.find(l => l.lessonId === lessonId);
    return lesson?.completed || false;
};

// Get completed lesson count
export const getCompletedLessonCount = (): number => {
    const progress = loadProgress();
    return progress.lessons.filter(l => l.completed).length;
};

// Update project unlock status based on completed lessons
const updateProjectUnlocks = (progress: UserProgress): void => {
    Object.entries(PROJECT_REQUIREMENTS).forEach(([projectId, requiredLessons]) => {
        const project = progress.projects.find(p => p.projectId === projectId);
        if (!project) return;

        const allRequiredCompleted = requiredLessons.every(lessonId => {
            const lesson = progress.lessons.find(l => l.lessonId === lessonId);
            return lesson?.completed || false;
        });

        project.unlocked = allRequiredCompleted;
    });
};

// Check if a project is unlocked
export const isProjectUnlocked = (projectId: string): boolean => {
    if (DEBUG_UNLOCK_ALL) return true;
    const progress = loadProgress();
    updateProjectUnlocks(progress);
    const project = progress.projects.find(p => p.projectId === projectId);
    return project?.unlocked || false;
};

// Get required lessons for a project
export const getProjectRequirements = (projectId: string): string[] => {
    const required = PROJECT_REQUIREMENTS[projectId as keyof typeof PROJECT_REQUIREMENTS];
    return required ? [...required] : [];
};

// Get missing lessons for a project
export const getMissingLessonsForProject = (projectId: string): string[] => {
    const progress = loadProgress();
    const required = getProjectRequirements(projectId);

    return required.filter(lessonId => {
        const lesson = progress.lessons.find(l => l.lessonId === lessonId);
        return !lesson?.completed;
    });
};

// Mark project as started
export const startProject = (projectId: string): void => {
    const progress = loadProgress();
    const project = progress.projects.find(p => p.projectId === projectId);

    if (project && project.unlocked) {
        project.started = true;
        saveProgress(progress);
    }
};

// Mark project as completed
export const completeProject = (projectId: string): void => {
    const progress = loadProgress();
    const project = progress.projects.find(p => p.projectId === projectId);

    if (project && project.unlocked) {
        project.completed = true;
        project.completedAt = new Date();
        saveProgress(progress);
    }
};

// Check if project is completed
export const isProjectCompleted = (projectId: string): boolean => {
    const progress = loadProgress();
    const project = progress.projects.find(p => p.projectId === projectId);
    return project?.completed || false;
};

// Get overall progress percentage
export const getOverallProgress = (): number => {
    const progress = loadProgress();
    const totalItems = progress.lessons.length + progress.projects.length;
    const completedItems =
        progress.lessons.filter(l => l.completed).length +
        progress.projects.filter(p => p.completed).length;

    return Math.round((completedItems / totalItems) * 100);
};

// Export progress as JSON
export const exportProgress = (): string => {
    const progress = loadProgress();
    return JSON.stringify(progress, null, 2);
};

// Import progress from JSON
export const importProgress = (jsonString: string): boolean => {
    try {
        const imported = JSON.parse(jsonString);
        saveProgress(imported);
        return true;
    } catch (error) {
        console.error('Error importing progress:', error);
        return false;
    }
};

// Reset all progress
export const resetProgress = (): void => {
    const defaultProgress = getDefaultProgress();
    saveProgress(defaultProgress);
};

// Get progress summary
export const getProgressSummary = () => {
    const progress = loadProgress();
    updateProjectUnlocks(progress);

    return {
        totalLessons: progress.lessons.length,
        completedLessons: progress.lessons.filter(l => l.completed).length,
        totalProjects: progress.projects.length,
        unlockedProjects: progress.projects.filter(p => p.unlocked).length,
        completedProjects: progress.projects.filter(p => p.completed).length,
        overallProgress: getOverallProgress(),
        lastUpdated: progress.lastUpdated
    };
};
