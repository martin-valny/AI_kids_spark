// Activity Data Definitions for AI Activity Playground

export interface Activity {
    id: string;
    title: string;
    description: string;
    category: 'creative' | 'logic' | 'ethics' | 'coding' | 'external';
    difficulty: 'Easy' | 'Medium' | 'Challenging';
    estimatedTime: string;
    requiredLesson: string; // Lesson ID that must be completed to unlock
    path: string;
    icon: string;
    color: string; // Tailwind gradient classes
    isExternal?: boolean; // For external links
}

export const ACTIVITIES: Activity[] = [
    // Creative Activities
    {
        id: 'quick-draw',
        title: 'Quick Draw Challenge',
        description: 'Draw pictures and see if AI can recognize what you\'re drawing! Test your artistic skills against machine learning.',
        category: 'creative',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        requiredLesson: 'image-recognition',
        path: '/activities/image-recognition/quick-draw',
        icon: '🎨',
        color: 'from-pink-500 to-rose-500'
    },
    {
        id: 'future-invention',
        title: 'Future AI Invention',
        description: 'Design your own AI invention for the future! What amazing things could AI help us create?',
        category: 'creative',
        difficulty: 'Easy',
        estimatedTime: '20 min',
        requiredLesson: 'future-of-ai',
        path: '/activities/future-ai-invention',
        icon: '💡',
        color: 'from-yellow-500 to-orange-500'
    },
    {
        id: 'draw-ai-friend',
        title: 'Draw Your AI Friend',
        description: 'Create and design your very own AI companion! What would your perfect AI friend look like?',
        category: 'creative',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        requiredLesson: 'intro-to-ai',
        path: '/activities/algorithms/draw-ai-friend',
        icon: '🤖',
        color: 'from-purple-500 to-pink-500'
    },

    // Logic & Puzzles
    {
        id: 'guess-who',
        title: 'Guess Who? AI Edition',
        description: 'Learn how AI asks questions to narrow down possibilities, just like the classic game!',
        category: 'logic',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        requiredLesson: 'data-and-patterns',
        path: '/activities/guess-who-ai-edition',
        icon: '❓',
        color: 'from-orange-500 to-amber-500'
    },
    {
        id: 'pattern-detective',
        title: 'Pattern Detective',
        description: 'Find the missing pieces in the sequence! Can you spot the pattern better than an AI?',
        category: 'logic',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        requiredLesson: 'data-and-patterns',
        path: '/activities/pattern-detective',
        icon: '🕵️',
        color: 'from-indigo-500 to-violet-500'
    },
    {
        id: 'weather-predictor',
        title: 'Weather Predictor',
        description: 'Use data patterns to predict the weather! Can you forecast if it will rain or shine?',
        category: 'logic',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        requiredLesson: 'data-and-patterns',
        path: '/activities/weather-predictor',
        icon: '🌤️',
        color: 'from-sky-400 to-blue-500'
    },
    {
        id: 'ai-detective',
        title: 'AI Detective',
        description: 'Solve mysteries by finding patterns and clues, just like an AI detective! Can you crack the case?',
        category: 'logic',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        requiredLesson: 'simple-algorithms',
        path: '/activities/algorithms/ai-detective',
        icon: '🔍',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'sorting-challenge',
        title: 'Sorting Challenge',
        description: 'Learn how AI sorts and organizes information by solving fun sorting puzzles!',
        category: 'logic',
        difficulty: 'Medium',
        estimatedTime: '15 min',
        requiredLesson: 'data-and-patterns',
        path: '/activities/sorting-challenge',
        icon: '🔢',
        color: 'from-indigo-500 to-purple-500'
    },
    {
        id: 'picture-sorting',
        title: 'Picture Sorting Game',
        description: 'Sort images into categories and discover how AI learns to classify things!',
        category: 'logic',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        requiredLesson: 'data-and-patterns',
        path: '/activities/image-recognition/picture-sorting',
        icon: '🖼️',
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 'picture-cipher',
        title: 'Picture Cipher',
        description: 'Decode secret messages hidden in pictures using pattern recognition!',
        category: 'logic',
        difficulty: 'Challenging',
        estimatedTime: '25 min',
        requiredLesson: 'image-recognition',
        path: '/activities/image-recognition/picture-cipher',
        icon: '🔐',
        color: 'from-violet-500 to-purple-500'
    },
    {
        id: 'emoji-detector',
        title: 'Emoji Detector',
        description: 'Train AI to recognize different emojis and emotions! How well can you teach it?',
        category: 'logic',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        requiredLesson: 'machine-learning-basics',
        path: '/activities/emoji-detector',
        icon: '😊',
        color: 'from-amber-500 to-yellow-500'
    },

    // AI Ethics
    {
        id: 'ethics-scenarios',
        title: 'AI Ethics Scenarios',
        description: 'Make important decisions about how AI should be used responsibly and fairly.',
        category: 'ethics',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        requiredLesson: 'ai-ethics',
        path: '/activities/ai-ethics-scenarios',
        icon: '⚖️',
        color: 'from-teal-500 to-cyan-500'
    },
    {
        id: 'design-responsible-ai',
        title: 'Design Responsible AI',
        description: 'Create your own AI system that is helpful, honest, and harmless!',
        category: 'ethics',
        difficulty: 'Medium',
        estimatedTime: '25 min',
        requiredLesson: 'ai-ethics',
        path: '/activities/design-responsible-ai',
        icon: '🛡️',
        color: 'from-emerald-500 to-green-500'
    },

    // Coding & Algorithms
    {
        id: 'train-drawing',
        title: 'Train a Drawing Recognizer',
        description: 'Teach an AI to understand your drawings by giving it examples. You are the teacher!',
        category: 'coding',
        difficulty: 'Challenging',
        estimatedTime: '25 min',
        requiredLesson: 'machine-learning-basics',
        path: '/activities/train-drawing-recognizer',
        icon: '✏️',
        color: 'from-blue-500 to-indigo-500'
    },
    {
        id: 'rodocodo',
        title: 'Rodocodo Coding',
        description: 'Learn to code by programming a robot to complete challenges! External coding game.',
        category: 'coding',
        difficulty: 'Medium',
        estimatedTime: '30 min',
        requiredLesson: 'simple-algorithms',
        path: '/activities/algorithms/rodocodo',
        icon: '💻',
        color: 'from-blue-600 to-indigo-600',
        isExternal: true
    },
    {
        id: 'robot-islands',
        title: 'Robot Islands',
        description: 'Guide robots through island challenges using algorithms and logic!',
        category: 'coding',
        difficulty: 'Challenging',
        estimatedTime: '30 min',
        requiredLesson: 'simple-algorithms',
        path: '/activities/algorithms/robot-islands',
        icon: '🏝️',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'build-image-classifier',
        title: 'Build Image Classifier',
        description: 'Create your own AI that can recognize and classify different types of images!',
        category: 'coding',
        difficulty: 'Challenging',
        estimatedTime: '35 min',
        requiredLesson: 'image-recognition',
        path: '/activities/build-image-classifier',
        icon: '🔬',
        color: 'from-purple-600 to-pink-600'
    },
    {
        id: 'ai-career-explorer',
        title: 'AI Career Explorer',
        description: 'Explore exciting careers in AI and technology! What could you become?',
        category: 'creative',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        requiredLesson: 'future-of-ai',
        path: '/activities/ai-career-explorer',
        icon: '🚀',
        color: 'from-orange-500 to-red-500'
    }
];

// Get activity by ID
export const getActivityById = (id: string): Activity | undefined => {
    return ACTIVITIES.find(activity => activity.id === id);
};

// Get activities by category
export const getActivitiesByCategory = (category: Activity['category']): Activity[] => {
    return ACTIVITIES.filter(activity => activity.category === category);
};

// Category display information
export const ACTIVITY_CATEGORIES = {
    creative: {
        name: 'Creative Activities',
        icon: '🎨',
        description: 'Express yourself and imagine the future of AI',
        color: 'from-pink-500 to-rose-500'
    },
    logic: {
        name: 'Logic & Puzzles',
        icon: '🧩',
        description: 'Solve problems and find patterns like AI does',
        color: 'from-blue-500 to-purple-500'
    },
    ethics: {
        name: 'AI Ethics',
        icon: '⚖️',
        description: 'Learn to make AI helpful, honest, and harmless',
        color: 'from-teal-500 to-emerald-500'
    },
    coding: {
        name: 'Coding & Algorithms',
        icon: '💻',
        description: 'Program and build your own AI systems',
        color: 'from-indigo-500 to-blue-600'
    },
    external: {
        name: 'External Games',
        icon: '🔗',
        description: 'Fun AI games from around the web',
        color: 'from-gray-500 to-slate-600'
    }
};
