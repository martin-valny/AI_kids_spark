// Project Data Definitions

export interface Project {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
    requiredLessons: string[];
    icon: string;
    color: string;
    path: string;
    tools: string[];
    downloadableResources: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 'music-ai-creator',
        title: 'Music & AI Creator',
        description: 'Discover how AI creates music by learning patterns! You\'ll explore musical rhythms, compose your own beats, and see how AI can generate melodies just like a real musician. Create rhythm patterns, design your own song, and learn how AI understands what makes music sound good together.',
        difficulty: 'Beginner',
        estimatedTime: '30-45 min',
        requiredLessons: ['intro-to-ai', 'machine-learning-basics'],
        icon: '🎵',
        color: 'from-kids-purple to-kids-blue',
        path: '/projects/music-ai-creator',
        tools: ['Rodocodo', 'Music Composition Tools'],
        downloadableResources: [
            'Music Pattern Worksheet',
            'Rhythm Cards',
            'Blank Music Sheet Template'
        ]
    },
    {
        id: 'ai-art-studio',
        title: 'AI Art Studio',
        description: 'Become an AI artist! Learn how to write amazing prompts that tell AI exactly what to create. You\'ll generate unique images, experiment with different art styles (cartoon, realistic, watercolor), and discover the secrets of prompt engineering. Build your own AI art gallery and see how changing just a few words can create completely different masterpieces!',
        difficulty: 'Intermediate',
        estimatedTime: '40-60 min',
        requiredLessons: ['data-and-patterns', 'image-recognition'],
        icon: '🎨',
        color: 'from-kids-green to-kids-yellow',
        path: '/projects/ai-art-studio',
        tools: ['Craiyon', 'Bing Image Creator'],
        downloadableResources: [
            'Prompt Idea Cards',
            'Image Style Reference Sheet',
            'Art Gallery Template'
        ]
    },
    {
        id: 'build-chatbot',
        title: 'Build Your AI Chatbot',
        description: 'Design and build your very own AI chatbot with a unique personality! You\'ll create a chatbot that can have conversations, answer questions, and even tell jokes. Learn how to make your chatbot helpful, honest, and harmless by following AI ethics guidelines. Give it a name, personality traits, and teach it how to respond to different questions!',
        difficulty: 'Intermediate',
        estimatedTime: '45-60 min',
        requiredLessons: ['simple-algorithms', 'ai-ethics'],
        icon: '🤖',
        color: 'from-kids-blue to-kids-purple',
        path: '/projects/build-chatbot',
        tools: ['Character.AI', 'Botpress Community'],
        downloadableResources: [
            'Chatbot Personality Worksheet',
            'Conversation Flowchart Template',
            'Ethics Checklist'
        ]
    },
    {
        id: 'ai-video-magic',
        title: 'AI Video Magic',
        description: 'Create amazing AI-generated videos and bring your stories to life! You\'ll learn how to write video scripts, plan scenes with storyboards, and use cutting-edge AI tools to generate short videos and animations. Turn your ideas into moving pictures, add characters and backgrounds, and discover how AI is revolutionizing video creation. This is the future of storytelling!',
        difficulty: 'Advanced',
        estimatedTime: '60-90 min',
        requiredLessons: ['future-of-ai'],
        icon: '🎬',
        color: 'from-kids-red to-kids-orange',
        path: '/projects/ai-video-magic',
        tools: ['Runway ML', 'D-ID', 'Canva AI Video'],
        downloadableResources: [
            'Storyboard Template',
            'Video Planning Worksheet',
            'Script Writing Guide'
        ]
    }
];

// Get project by ID
export const getProjectById = (id: string): Project | undefined => {
    return PROJECTS.find(project => project.id === id);
};

// Get projects unlocked after specific lesson count
export const getProjectsForLessonCount = (completedLessons: number): Project[] => {
    // This is a simple mapping - could be made more sophisticated
    if (completedLessons >= 7) return PROJECTS;
    if (completedLessons >= 6) return PROJECTS.slice(0, 3);
    if (completedLessons >= 4) return PROJECTS.slice(0, 2);
    if (completedLessons >= 2) return PROJECTS.slice(0, 1);
    return [];
};

// Lesson display names for UI
export const LESSON_NAMES: Record<string, string> = {
    'intro-to-ai': 'Introduction to AI',
    'machine-learning-basics': 'Machine Learning Basics',
    'data-and-patterns': 'Data and Patterns',
    'image-recognition': 'Image Recognition',
    'simple-algorithms': 'Simple Algorithms',
    'ai-ethics': 'AI Ethics Fundamentals',
    'future-of-ai': 'The Future of AI'
};

// Get lesson name by ID
export const getLessonName = (lessonId: string): string => {
    return LESSON_NAMES[lessonId] || lessonId;
};
