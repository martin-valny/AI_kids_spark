
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
import { Sparkles, TrendingUp, Lock, Trophy } from 'lucide-react';

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
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                AI Projects
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Get hands-on with these exciting AI projects! Complete lessons to unlock new projects and build amazing things.
              </p>

              {/* Progress Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/60 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Your Project Progress</span>
                  <span className="text-sm font-bold text-indigo-600">
                    {completedCount}/{PROJECTS.length} Completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / PROJECTS.length) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-gray-600">
                      <strong>{unlockedCount}</strong>/{PROJECTS.length} Unlocked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-600">
                      <strong>{completedCount}</strong>/{PROJECTS.length} Finished
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box for Locked Projects */}
            {unlockedCount < PROJECTS.length && (
              <div className="mb-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">
                      Unlock More Projects
                    </h3>
                    <p className="text-sm text-amber-700">
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
                    {unlocked && !completed && missingLessons.length === 0 && (
                      <div className="mb-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg text-center">
                        <p className="text-sm font-semibold text-amber-600 flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Project Unlocked!
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
              <div className="mt-8 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-center shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                  Amazing Work!
                </h3>
                <p className="text-gray-700">
                  You've completed all AI projects! You're now a certified AI builder!
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
