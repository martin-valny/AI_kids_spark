import React, { useState } from 'react';
import { Brain, Play, RotateCcw, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import NarratedBox from '@/components/NarratedBox';

const AlgorithmInteractiveDemo = () => {
  // Interactive demo states
  const [classificationStep, setClassificationStep] = useState(0);
  const [clusteringStep, setClusteringStep] = useState(0);
  const [recommendationStep, setRecommendationStep] = useState(0);

  // Simpler examples for kids
  const snacks = [
    { name: "🍎 Apple", isHealthy: true },
    { name: "🍪 Cookie", isHealthy: false },
    { name: "🥕 Carrot", isHealthy: true },
    { name: "🍭 Lollipop", isHealthy: false }
  ];

  const toys = [
    { name: "🚗 Car", category: "Vehicle", x: 20, y: 30 },
    { name: "✈️ Plane", category: "Vehicle", x: 25, y: 35 },
    { name: "🧸 Teddy", category: "Stuffed", x: 70, y: 25 },
    { name: "🐶 Puppy", category: "Stuffed", x: 75, y: 30 },
    { name: "⚽ Ball", category: "Sports", x: 45, y: 70 },
    { name: "🏀 Basketball", category: "Sports", x: 50, y: 75 }
  ];

  const kidPreferences = {
    cartoons: 5,
    games: 4,
    books: 2
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
        AI uses special algorithms to learn and make smart guesses, just like how you learn to recognize things and make choices!
      </p>

      <div className="space-y-6">
        {/* Classification Algorithms - Simplified */}
        <GlassCard variant="green" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-kids-green/10 to-green-100/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-green-200/30">
            <h3 className="flex items-center gap-2 text-lg text-green-700 font-bold">
              <span className="text-2xl">🍎</span>
              Sorting Things Into Groups
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="AI can look at things and decide which group they belong to - like deciding if a snack is healthy or not healthy!"
              className="bg-green-50/80 backdrop-blur-sm border border-green-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                AI can look at things and decide which group they belong to - like deciding if a snack is healthy or not healthy!
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setClassificationStep(Math.min(classificationStep + 1, snacks.length))} disabled={classificationStep >= snacks.length}>
                  <Play className="w-4 h-4 mr-2" />
                  Check Next Snack
                </Button>
                <Button variant="outline" onClick={() => setClassificationStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="space-y-3">
                {snacks.slice(0, classificationStep).map((snack, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-500 ${snack.isHealthy ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{snack.name}</span>
                      <div className="flex items-center gap-2">
                        {snack.isHealthy ? (
                          <>
                            <span className="text-2xl">💪</span>
                            <span className="text-green-700 font-semibold">HEALTHY!</span>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl">🍭</span>
                            <span className="text-orange-700 font-semibold">TREAT!</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {classificationStep === 0 && (
                  <div className="text-gray-500 italic text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                    Click "Check Next Snack" to see how AI sorts snacks!
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Clustering Algorithms - Simplified */}
        <GlassCard variant="blue" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-kids-blue/10 to-blue-100/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-blue-200/30">
            <h3 className="flex items-center gap-2 text-lg text-blue-700 font-bold">
              <span className="text-2xl">🧸</span>
              Putting Similar Things Together
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="AI can look at lots of things and group the similar ones together - like putting all the toy cars together and all the stuffed animals together!"
              className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                AI can look at lots of things and group the similar ones together - like putting all the toy cars together and all the stuffed animals together!
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setClusteringStep(1)} disabled={clusteringStep >= 1}>
                  <Play className="w-4 h-4 mr-2" />
                  Group My Toys
                </Button>
                <Button variant="outline" onClick={() => setClusteringStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="relative bg-gradient-to-br from-yellow-100 to-blue-100 rounded-lg p-6" style={{ height: '300px' }}>
                <div className="absolute top-2 left-2 text-sm text-gray-600 font-semibold">🧸 My Toy Box</div>
                {toys.map((toy, index) => {
                  let clusterId = null;
                  if (clusteringStep >= 1) {
                    if (toy.category === 'Vehicle') clusterId = 0;
                    else if (toy.category === 'Stuffed') clusterId = 1;
                    else if (toy.category === 'Sports') clusterId = 2;
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-1000 ${getClusterColor(clusterId)} ${clusterId !== null ? 'border-4 border-white shadow-lg' : 'bg-gray-300'}`}
                      style={{
                        left: `${toy.x}%`,
                        top: `${toy.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`${toy.name} (${toy.category})`}
                    >
                      {toy.name.split(' ')[0]}
                    </div>
                  );
                })}

                {clusteringStep >= 1 && (
                  <div className="absolute bottom-2 left-2 flex gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Vehicles</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Stuffed</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Sports</span>
                    </div>
                  </div>
                )}

                {clusteringStep === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 italic bg-white/80 rounded-lg">
                    Click "Group My Toys" to see the magic! ✨
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Recommendation Algorithms - Simplified */}
        <GlassCard variant="purple" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-6 rounded-t-glass border-b border-purple-200/30">
            <h3 className="flex items-center gap-2 text-lg text-purple-700 font-bold">
              <span className="text-2xl">📺</span>
              Suggesting Things You Might Like
            </h3>
          </div>
          <div className="p-4">
            <NarratedBox
              text="AI can look at what you like and suggest other things you might enjoy - like if you love cartoons, it might suggest a new cartoon show!"
              className="bg-purple-50/80 backdrop-blur-sm border border-purple-200/30 mb-4"
              showSpeaker={true}
            >
              <p className="text-base text-gray-700 mb-4">
                AI can look at what you like and suggest other things you might enjoy - like if you love cartoons, it might suggest a new cartoon show!
              </p>
            </NarratedBox>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => setRecommendationStep(1)} disabled={recommendationStep >= 1}>
                  <Play className="w-4 h-4 mr-2" />
                  What Should I Watch?
                </Button>
                <Button variant="outline" onClick={() => setRecommendationStep(0)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-purple-200/50">
                  <h5 className="font-semibold mb-3 text-purple-700">📝 What I Like:</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">📺</span>
                        <span>Cartoons:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= kidPreferences.cartoons ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">🎮</span>
                        <span>Games:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= kidPreferences.games ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">📚</span>
                        <span>Books:</span>
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={star <= kidPreferences.books ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-purple-200/50">
                  <h5 className="font-semibold mb-3 text-purple-700">🎯 Perfect for You:</h5>
                  {recommendationStep >= 1 ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">🦸</span>
                          <span>Super Heroes Cartoon</span>
                        </div>
                        <div className="text-sm text-gray-600">Perfect match! 🌟🌟🌟🌟🌟</div>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">🚀</span>
                          <span>Space Adventure Game</span>
                        </div>
                        <div className="text-sm text-gray-600">Great choice! 🌟🌟🌟🌟</div>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                        <div className="font-medium flex items-center gap-2">
                          <span className="text-xl">📖</span>
                          <span>Picture Story Book</span>
                        </div>
                        <div className="text-sm text-gray-600">Maybe you'll like it! 🌟🌟</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      Click the button to see what AI suggests! 🎁
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
