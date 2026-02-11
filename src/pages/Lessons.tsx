
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Brain, Database, PieChart, Search, ShieldCheck, Zap, Sparkles, TrendingUp, GraduationCap, ArrowRight } from 'lucide-react';
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
    icon: <Brain className="w-6 h-6 text-indigo-600" />,
    path: "/lessons/intro-to-ai",
    isSubscriptionRequired: false,
  },
  {
    id: "machine-learning-basics",
    title: "Machine Learning Basics",
    description: "Discover how machines learn from data",
    icon: <Cpu className="w-6 h-6 text-purple-600" />,
    path: "/lessons/machine-learning-basics",
    isSubscriptionRequired: false,
  },
  {
    id: "data-and-patterns",
    title: "Data and Patterns",
    description: "Explore how AI finds patterns in data",
    icon: <Database className="w-6 h-6 text-cyan-600" />,
    path: "/lessons/data-and-patterns",
    isSubscriptionRequired: false,
  },
  {
    id: "image-recognition",
    title: "Image Recognition",
    description: "How AI sees and recognizes images",
    icon: <Search className="w-6 h-6 text-emerald-600" />,
    path: "/lessons/image-recognition",
    isSubscriptionRequired: false,
  },
  {
    id: "simple-algorithms",
    title: "Simple Algorithms",
    description: "Learn about the building blocks of AI",
    icon: <PieChart className="w-6 h-6 text-amber-600" />,
    path: "/lessons/simple-algorithms",
    isSubscriptionRequired: false,
  },
  {
    id: "ai-ethics",
    title: "AI Ethics Fundamentals",
    description: "Using AI responsibly and safely",
    icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
    path: "/lessons/ai-ethics",
    isSubscriptionRequired: false,
  },
  {
    id: "future-of-ai",
    title: "The Future of AI",
    description: "What's next in the world of AI?",
    icon: <Zap className="w-6 h-6 text-violet-600" />,
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
              <HighlightBox variant="tip" icon={<Sparkles className="w-5 h-5" />} className="mb-4 text-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300">
                <span className="text-lg font-bold text-amber-600">
                  New Project Unlocked!
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
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Your Creative Journey</h1>
              <p className="text-gray-600 mb-4">
                Complete lessons to unlock exciting hands-on projects!
              </p>

              {/* Progress Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/60 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-indigo-600">{progressSummary.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressSummary.overallProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-600">
                      <strong>{progressSummary.completedLessons}</strong>/{progressSummary.totalLessons} Lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-600">
                      <strong>{progressSummary.completedProjects}</strong>/{progressSummary.totalProjects} Projects
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MLP Start Here Card */}
            <Link to="/mlp/first-short" className="block mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold">Start Here: Make Your First AI-Boosted Short</h3>
                    <p className="text-indigo-100 text-sm">60-90 min guided project. Pick a template, generate your hook, and ship it.</p>
                  </div>
                  <ArrowRight className="w-6 h-6 flex-shrink-0 ml-auto hidden sm:block" />
                </div>
              </div>
            </Link>

            {/* Learning Journey */}
            <div className="space-y-4">
              {buildLearningJourney()}
            </div>

            {/* Completion Message */}
            {progressSummary.completedLessons === progressSummary.totalLessons &&
              progressSummary.completedProjects === progressSummary.totalProjects && (
                <div className="mt-8 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-center shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-700 mb-2">Congratulations!</h3>
                  <p className="text-gray-700">
                    You've completed all lessons and projects! You're now an AI expert!
                  </p>
                </div>
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
