
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS } from '@/data/projectsData';
import {
  loadProgress,
  isProjectUnlocked,
  isProjectCompleted,
  getMissingLessonsForProject,
  getProgressSummary
} from '@/utils/progressTracker';
import { Sparkles, TrendingUp, Lock } from 'lucide-react';

const Projects = () => {
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

  const unlockedCount = PROJECTS.filter(p => isProjectUnlocked(p.id)).length;
  const completedCount = PROJECTS.filter(p => isProjectCompleted(p.id)).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
                AI Projects
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Get hands-on with these exciting AI projects! Complete lessons to unlock new projects and build amazing things.
              </p>

              {/* Progress Summary */}
              <div className="bg-gradient-to-r from-kids-blue/90 to-kids-purple/90 border border-kids-blue/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Your Project Progress</span>
                  <span className="text-sm font-bold text-kids-blue">
                    {completedCount}/{PROJECTS.length} Completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-kids-blue to-kids-purple h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / PROJECTS.length) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-kids-yellow" />
                    <span className="text-gray-600">
                      <strong>{unlockedCount}</strong>/{PROJECTS.length} Unlocked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-kids-green" />
                    <span className="text-gray-600">
                      <strong>{completedCount}</strong>/{PROJECTS.length} Finished
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box for Locked Projects */}
            {unlockedCount < PROJECTS.length && (
              <div className="mb-8 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-1">
                      🔓 Unlock More Projects!
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Complete lessons to unlock new projects. Each project requires specific lessons to be finished first.
                      Check the "Lessons" page to see your progress!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => {
                const unlocked = isProjectUnlocked(project.id);
                const completed = isProjectCompleted(project.id);
                const missingLessons = getMissingLessonsForProject(project.id);

                return (
                  <div key={project.id}>
                    {/* New Project Unlocked Banner */}
                    {unlocked && !completed && (
                      <div className="mb-3 p-3 bg-gradient-to-r from-kids-yellow/80 to-kids-orange/80 border-2 border-kids-yellow rounded-lg text-center">
                        <p className="text-sm font-bold text-kids-orange flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {missingLessons.length === 0 ? '🎉 Project Unlocked!' : ''}
                        </p>
                      </div>
                    )}

                    <ProjectCard
                      project={project}
                      isUnlocked={unlocked}
                      isCompleted={completed}
                      missingLessons={missingLessons}
                    />
                  </div>
                );
              })}
            </div>

            {/* Completion Message */}
            {completedCount === PROJECTS.length && (
              <div className="mt-8 p-6 bg-gradient-to-r from-kids-green/80 to-kids-blue/80 border-2 border-kids-green rounded-xl text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-2xl font-bold text-kids-green mb-2">
                  Amazing Work!
                </h3>
                <p className="text-gray-700">
                  You've completed all AI projects! You're now a certified AI builder! 🌟
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
