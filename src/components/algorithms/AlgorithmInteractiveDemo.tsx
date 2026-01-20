import React, { useState } from 'react';
import { Brain, Play, RotateCcw } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import NarratedBox from '@/components/NarratedBox';

const AlgorithmInteractiveDemo = () => {
  // Interactive demo states
  const [classificationStep, setClassificationStep] = useState(0);
  const [clusteringStep, setClusteringStep] = useState(0);
  const [recommendationStep, setRecommendationStep] = useState(0);

  // Email classification examples
  const emails = [
    { name: "📧 Meeting reminder from boss", isSpam: false },
    { name: "💰 You've won $1M! Click here!", isSpam: true },
    { name: "📋 Project update from team", isSpam: false },
    { name: "🎁 FREE iPhone - Act now!!!", isSpam: true }
  ];

  // Music tracks for clustering
  const tracks = [
    { name: "🎸 Rock Anthem", category: "Rock", x: 20, y: 30 },
    { name: "🎵 Metal Storm", category: "Rock", x: 25, y: 35 },
    { name: "🎹 Piano Dreams", category: "Classical", x: 70, y: 25 },
    { name: "🎻 Symphony No.5", category: "Classical", x: 75, y: 30 },
    { name: "🎤 Hip Hop Beat", category: "Hip-Hop", x: 45, y: 70 },
    { name: "🎧 Rap Flow", category: "Hip-Hop", x: 50, y: 75 }
  ];

  // User streaming preferences
  const userPreferences = {
    sciFi: 5,
    comedy: 4,
    documentaries: 2
  };

  const getClusterColor = (clusterId: number | null) => {
    switch (clusterId) {
      case 0: return 'bg-blue-500';
      case 1: return 'bg-red-500';
      case 2: return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
        <Brain className="w-8 h-8 text-kids-blue" />
        Algorithms in AI
      </h2>
      <p className="text-lg mb-8 text-center text-gray-700">
        AI uses specialized algorithms to analyze data, detect patterns, and make intelligent predictions. Try these interactive demos to see how they work.
      </p>

      <div className="space-y-6">
        {/* Classification Algorithms */}
        <GlassCard variant="green" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-kids-green/10 to-green-100/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-green-200/30">
            <h3 className="flex items-center gap-2 text-lg text-green-700 font-bold">
              <span className="text-2xl">📧</span>
              Classification: Spam Detection
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="Classification algorithms analyze features of data to categorize items. Spam filters examine email content, sender reputation, and link patterns to determine if a message is legitimate or spam."
              className="bg-green-50/80 backdrop-blur-sm border border-green-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                Classification algorithms analyze features of data to categorize items. Spam filters examine email content, sender reputation, and link patterns to determine if a message is legitimate or spam.
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setClassificationStep(Math.min(classificationStep + 1, emails.length))} disabled={classificationStep >= emails.length}>
                  <Play className="w-4 h-4 mr-2" />
                  Analyze Next Email
                </Button>
                <Button variant="outline" onClick={() => setClassificationStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="space-y-3">
                {emails.slice(0, classificationStep).map((email, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-500 ${email.isSpam ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{email.name}</span>
                      <div className="flex items-center gap-2">
                        {email.isSpam ? (
                          <>
                            <span className="text-2xl">🚫</span>
                            <span className="text-red-700 font-semibold">SPAM</span>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl">✅</span>
                            <span className="text-green-700 font-semibold">LEGITIMATE</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {classificationStep === 0 && (
                  <div className="text-gray-500 italic text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                    Click "Analyze Next Email" to see classification in action
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Clustering Algorithms */}
        <GlassCard variant="blue" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-kids-blue/10 to-blue-100/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-blue-200/30">
            <h3 className="flex items-center gap-2 text-lg text-blue-700 font-bold">
              <span className="text-2xl">🎵</span>
              Clustering: Music Genre Analysis
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="Clustering algorithms group similar data points together without predefined labels. Music streaming services use clustering to organize tracks by audio features like tempo, energy, and instrumentation."
              className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                Clustering algorithms group similar data points together without predefined labels. Music streaming services use clustering to organize tracks by audio features like tempo, energy, and instrumentation.
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setClusteringStep(1)} disabled={clusteringStep >= 1}>
                  <Play className="w-4 h-4 mr-2" />
                  Run K-Means Clustering
                </Button>
                <Button variant="outline" onClick={() => setClusteringStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="relative bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg p-6" style={{ height: '300px' }}>
                <div className="absolute top-2 left-2 text-sm text-gray-600 font-semibold">🎵 Audio Feature Space</div>
                {tracks.map((track, index) => {
                  let clusterId = null;
                  if (clusteringStep >= 1) {
                    if (track.category === 'Rock') clusterId = 0;
                    else if (track.category === 'Classical') clusterId = 1;
                    else if (track.category === 'Hip-Hop') clusterId = 2;
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-1000 ${getClusterColor(clusterId)} ${clusterId !== null ? 'border-4 border-white shadow-lg' : 'bg-gray-300'}`}
                      style={{
                        left: `${track.x}%`,
                        top: `${track.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`${track.name} (${track.category})`}
                    >
                      {track.name.split(' ')[0]}
                    </div>
                  );
                })}

                {clusteringStep >= 1 && (
                  <div className="absolute bottom-2 left-2 flex gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Rock</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Classical</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Hip-Hop</span>
                    </div>
                  </div>
                )}

                {clusteringStep === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 italic bg-white/80 rounded-lg">
                    Click "Run K-Means Clustering" to group similar tracks
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Recommendation Algorithms */}
        <GlassCard variant="purple" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-purple-200/30">
            <h3 className="flex items-center gap-2 text-lg text-purple-700 font-bold">
              <span className="text-2xl">🎬</span>
              Recommendation: Content Suggestions
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="Recommendation algorithms analyze your viewing history, ratings, and behavior patterns to predict what content you'll enjoy. They use collaborative filtering and content-based matching."
              className="bg-purple-50/80 backdrop-blur-sm border border-purple-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                Recommendation algorithms analyze your viewing history, ratings, and behavior patterns to predict what content you'll enjoy. They use collaborative filtering and content-based matching.
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setRecommendationStep(1)} disabled={recommendationStep >= 1}>
                  <Play className="w-4 h-4 mr-2" />
                  Generate Recommendations
                </Button>
                <Button variant="outline" onClick={() => setRecommendationStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-purple-200/50">
                  <h5 className="font-semibold mb-3 text-purple-700">📊 Your Viewing Profile:</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">🚀</span>
                        <span>Sci-Fi:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= userPreferences.sciFi ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">😂</span>
                        <span>Comedy:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= userPreferences.comedy ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">📚</span>
                        <span>Documentaries:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= userPreferences.documentaries ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-purple-200/50">
                  <h5 className="font-semibold mb-3 text-purple-700">🎯 Recommended for You:</h5>
                  {recommendationStep >= 1 ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">🌌</span>
                          <span>Interstellar Odyssey</span>
                        </div>
                        <div className="text-sm text-gray-600">98% match based on Sci-Fi preference</div>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">🤖</span>
                          <span>Comedy Bots</span>
                        </div>
                        <div className="text-sm text-gray-600">91% match (Sci-Fi + Comedy)</div>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">🔬</span>
                          <span>Future of Space Travel</span>
                        </div>
                        <div className="text-sm text-gray-600">75% match (Documentary + Sci-Fi themes)</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      Click "Generate Recommendations" to see personalized suggestions
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section >
  );
};

export default AlgorithmInteractiveDemo;
