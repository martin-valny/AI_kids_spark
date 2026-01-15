import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { ACTIVITIES, ACTIVITY_CATEGORIES, Activity } from '@/data/activitiesData';
import { isLessonCompleted } from '@/utils/progressTracker';
import { Gamepad2, Lock, CheckCircle, Filter, Sparkles, ExternalLink, PartyPopper } from 'lucide-react';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<Activity['category'] | 'all'>('all');

  // Calculate progress
  const unlockedActivities = ACTIVITIES.filter(activity => isLessonCompleted(activity.requiredLesson));
  const totalActivities = ACTIVITIES.length;
  const progressPercentage = (unlockedActivities.length / totalActivities) * 100;

  // Filter activities
  const filteredActivities = selectedCategory === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === selectedCategory);

  // Group by category for display
  const categorizedActivities = selectedCategory === 'all'
    ? Object.keys(ACTIVITY_CATEGORIES).map(cat => ({
      category: cat as Activity['category'],
      activities: ACTIVITIES.filter(a => a.category === cat)
    }))
    : [{
      category: selectedCategory,
      activities: filteredActivities
    }];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl mb-4 shadow-lg shadow-indigo-500/25">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              AI Activity Playground
            </h1>

            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Practice what you've learned with these interactive activities! Complete lessons to unlock more.
            </p>

            {/* Progress Summary */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/60 rounded-xl p-5 max-w-2xl mx-auto shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Your Activity Progress</span>
                <span className="text-sm font-bold text-indigo-600">
                  {unlockedActivities.length}/{totalActivities} Unlocked
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-600">
                    <strong>{unlockedActivities.length}</strong> Ready to Play
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    <strong>{totalActivities - unlockedActivities.length}</strong> Locked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Activities ({totalActivities})
              </button>
              {Object.entries(ACTIVITY_CATEGORIES).map(([key, cat]) => {
                const count = ACTIVITIES.filter(a => a.category === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as Activity['category'])}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === key
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {cat.icon} {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activities by Category */}
          {categorizedActivities.map(({ category, activities }) => {
            if (activities.length === 0) return null;

            const categoryInfo = ACTIVITY_CATEGORIES[category];

            return (
              <div key={category} className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-3xl">{categoryInfo.icon}</span>
                    {categoryInfo.name}
                  </h2>
                  <p className="text-gray-600">{categoryInfo.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activities.map((activity) => {
                    const isUnlocked = isLessonCompleted(activity.requiredLesson);

                    return (
                      <GlassCard
                        key={activity.id}
                        className={`relative overflow-hidden transition-all duration-300 ${isUnlocked ? 'hover:scale-105 hover:shadow-xl' : 'opacity-75'
                          }`}
                      >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-10`} />

                        <div className="relative p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="text-3xl">{activity.icon}</div>
                              <div>
                                <h3 className="font-bold text-gray-800 text-base leading-tight">
                                  {activity.title}
                                  {activity.isExternal && (
                                    <ExternalLink className="inline w-3 h-3 ml-1 text-gray-500" />
                                  )}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${activity.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                                      activity.difficulty === 'Medium' ? 'bg-amber-500 text-white' :
                                        'bg-rose-500 text-white'
                                    }`}>
                                    {activity.difficulty}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {activity.estimatedTime}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status Icon */}
                            {isUnlocked ? (
                              <div className="bg-emerald-500 text-white p-1.5 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="bg-gray-400 text-white p-1.5 rounded-full">
                                <Lock className="w-4 h-4" />
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                            {activity.description}
                          </p>

                          {/* Action Button */}
                          {isUnlocked ? (
                            <Link to={activity.path}>
                              <Button
                                className={`w-full bg-gradient-to-r ${activity.color} text-white hover:opacity-90 transition-opacity text-sm`}
                              >
                                Play Now →
                              </Button>
                            </Link>
                          ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-2">
                              <p className="text-xs font-semibold text-yellow-800 flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Complete lesson to unlock
                              </p>
                            </div>
                          )}
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Completion Message */}
          {unlockedActivities.length === totalActivities && (
            <div className="mt-8 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <PartyPopper className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                All Activities Unlocked!
              </h3>
              <p className="text-gray-700">
                You've unlocked every activity! Keep playing and learning!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
