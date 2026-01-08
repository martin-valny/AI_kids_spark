
import React, { useState, useEffect } from 'react';
import { BookOpen, Cpu, Brain, Database, PieChart, Search, ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModuleCard from '@/components/ModuleCard';
import { ProjectCard } from '@/components/ProjectCard';
import SubscriptionModal from '@/components/SubscriptionModal';
import { HighlightBox } from '@/components/design-system';
import {
  loadProgress,
  isLessonCompleted,
  isProjectUnlocked,
  isProjectCompleted,
  getMissingLessonsForProject,
  getProgressSummary
} from '@/utils/progressTracker';
import { PROJECTS } from '@/data/projectsData';

const modules = [
  {
    id: "intro-to-ai",
    title: "Introduction to AI",
    description: "Learn the basics of AI and how it's used in everyday life",
    icon: <Brain className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/intro-to-ai",
    isSubscriptionRequired: false,
  },
  {
    id: "machine-learning-basics",
    title: "Machine Learning Basics",
    description: "Discover how machines learn from data",
    icon: <Cpu className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/machine-learning-basics",
    isSubscriptionRequired: false,
  },
  {
    id: "data-and-patterns",
    title: "Data and Patterns",
    description: "Explore how AI finds patterns in data",
    icon: <Database className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/data-and-patterns",
    isSubscriptionRequired: false,
  },
  {
    id: "image-recognition",
    title: "Image Recognition",
    description: "How AI sees and recognizes images",
    icon: <Search className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/image-recognition",
    isSubscriptionRequired: false,
  },
  {
    id: "simple-algorithms",
    title: "Simple Algorithms",
    description: "Learn about the building blocks of AI",
    icon: <PieChart className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/simple-algorithms",
    isSubscriptionRequired: false,
  },
  {
    id: "ai-ethics",
    title: "AI Ethics for Kids",
    description: "Using AI responsibly and safely",
    icon: <ShieldCheck className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/ai-ethics",
    isSubscriptionRequired: false,
  },
  {
    id: "future-of-ai",
    title: "The Future of AI",
    description: "What's next in the world of AI?",
    icon: <Zap className="w-6 h-6 text-kids-blue" />,
    path: "/lessons/future-of-ai",
    isSubscriptionRequired: false,
  },
];

// Define where projects should appear (after which lesson index)
const projectPositions = {
  'music-ai-creator': 2,      // After lesson 2 (Machine Learning Basics)
  'ai-art-studio': 4,          // After lesson 4 (Image Recognition)
  'build-chatbot': 6,          // After lesson 6 (AI Ethics)
  'ai-video-magic': 7          // After lesson 7 (Future of AI)
};

const Lessons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState(loadProgress());
  const [progressSummary, setProgressSummary] = useState(getProgressSummary());

  // Reload progress when component mounts or when returning to page
  useEffect(() => {
    const handleFocus = () => {
      setProgress(loadProgress());
      setProgressSummary(getProgressSummary());
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Build the lesson/project list
  const buildLearningJourney = () => {
    const journey: JSX.Element[] = [];

    modules.forEach((module, index) => {
      const completed = isLessonCompleted(module.id);

      // Add lesson card
      journey.push(
        <ModuleCard
          key={module.id}
          id={module.id}
          title={module.title}
          description={module.description}
          icon={module.icon}
          isCompleted={completed}
          isLocked={false}
          path={module.path}
          subscriptionRequired={module.isSubscriptionRequired}
        />
      );

      // Check if a project should appear after this lesson
      const projectToShow = PROJECTS.find(
        project => projectPositions[project.id as keyof typeof projectPositions] === index + 1
      );

      if (projectToShow) {
        const unlocked = isProjectUnlocked(projectToShow.id);
        const projectComplete = isProjectCompleted(projectToShow.id);
        const missingLessons = getMissingLessonsForProject(projectToShow.id);

        journey.push(
          <div key={`project-${projectToShow.id}`} className="my-8">
            {/* Project Unlocked Banner */}
            {unlocked && !projectComplete && (
              <HighlightBox variant="tip" icon={<Sparkles className="w-5 h-5" />} className="mb-4 text-center animate-pulse bg-gradient-to-r from-kids-yellow/20 to-kids-orange/20 border-2 border-kids-yellow">
                <span className="text-lg font-bold text-kids-orange">
                  🎉 New Project Unlocked!
                </span>
              </HighlightBox>
            )}

            <ProjectCard
              project={projectToShow}
              isUnlocked={unlocked}
              isCompleted={projectComplete}
              missingLessons={missingLessons}
              compact={true}
            />
          </div>
        );
      }
    });

    return journey;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Header with Progress */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Learning Journey</h1>
              <p className="text-gray-600 mb-4">
                Complete lessons to unlock exciting hands-on projects!
              </p>

              {/* Progress Summary */}
              <div className="bg-gradient-to-r from-kids-blue/10 to-kids-purple/10 border border-kids-blue/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-kids-blue">{progressSummary.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-kids-blue to-kids-purple h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressSummary.overallProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-kids-blue" />
                    <span className="text-gray-600">
                      <strong>{progressSummary.completedLessons}</strong>/{progressSummary.totalLessons} Lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-kids-purple" />
                    <span className="text-gray-600">
                      <strong>{progressSummary.completedProjects}</strong>/{progressSummary.totalProjects} Projects
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Journey */}
            <div className="space-y-4">
              {buildLearningJourney()}
            </div>

            {/* Completion Message */}
            {progressSummary.completedLessons === progressSummary.totalLessons &&
              progressSummary.completedProjects === progressSummary.totalProjects && (
                <HighlightBox variant="success" showIcon={false} className="mt-8 p-6 bg-gradient-to-r from-kids-green/20 to-kids-blue/20 border-2 border-kids-green text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-2xl font-bold text-kids-green mb-2">Congratulations!</h3>
                  <p className="text-gray-700">
                    You've completed all lessons and projects! You're now an AI expert! 🌟
                  </p>
                </HighlightBox>
              )}
          </div>
        </div>
      </main>
      <Footer />

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lessonTitle={selectedLesson?.title || ''}
      />
    </div>
  );
};

export default Lessons;
