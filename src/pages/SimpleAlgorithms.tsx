
import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import AlgorithmVideoSection from '@/components/algorithms/AlgorithmVideoSection';
import AlgorithmInteractiveDemo from '@/components/algorithms/AlgorithmInteractiveDemo';
import AlgorithmFunActivities from '@/components/algorithms/AlgorithmFunActivities';

const SimpleAlgorithms = () => {
  return (
    <LessonLayout
      title="Simple Algorithms"
      subtitle="Learn about the building blocks of AI"
      backLink="/lessons"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Section */}
        <GlassCard variant="green" className="p-8">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
              <div className="text-4xl">📋</div>
            </div>
            <div className="space-y-4">
              <div className="inline-block bg-kids-green/10 text-kids-green px-4 py-1 rounded-full text-sm font-bold w-fit">
                Building Blocks
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                What Is an Algorithm?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                An algorithm is a set of step-by-step instructions that tell a computer how to solve a problem or complete a task. Think of it like a recipe for a computer to follow!
              </p>
              <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 mt-4 hover:border-kids-green/40 transition-colors">
                <h4 className="font-bold mb-2 text-kids-green">🍪 Algorithms in Everyday Life:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Following a recipe to bake cookies</li>
                  <li>Instructions for building a LEGO set</li>
                  <li>Directions to get from home to school</li>
                  <li>Rules for playing a board game</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Video Section */}
        <AlgorithmVideoSection />

        {/* Simple Algorithms for Computers */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-kids-blue" />
            Simple Algorithms for Computers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="blue" className="p-8">
              <h3 className="font-bold text-2xl text-kids-blue mb-4">🔢 Sorting Algorithms</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                These help computers put things in order (like numbers from smallest to largest, or names in alphabetical order).
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-blue/10">
                <p className="font-mono text-sm mb-2">Unsorted: 5, 2, 9, 1, 7</p>
                <p className="font-mono text-sm font-bold text-kids-blue">Sorted: 1, 2, 5, 7, 9</p>
              </div>
            </GlassCard>

            <GlassCard variant="purple" className="p-8">
              <h3 className="font-bold text-2xl text-kids-purple mb-4">🔍 Search Algorithms</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                These help computers find specific items in a list or database (like finding a specific contact in your phone).
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-purple/10">
                <p className="font-mono text-sm mb-2">Find "apple" in fruits list</p>
                <p className="font-mono text-sm font-bold text-kids-purple">Found at position 3!</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Decision Making & Loops - Split Screen */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-kids-green" />
            Decision Making & Loops
          </h2>

          <GlassCard className="overflow-hidden p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                <div className="inline-block bg-kids-green/10 text-kids-green px-4 py-1 rounded-full text-sm font-bold w-fit">
                  If-Then Logic
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Making Choices</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Algorithms need to make decisions. We use "if-then" statements to help them choose what to do next.
                </p>
                <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                  <h4 className="font-bold mb-3 text-kids-green">☔ If-Then Example:</h4>
                  <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                    <p><span className="text-purple-600 font-bold">IF</span> it is raining <span className="text-purple-600 font-bold">THEN</span></p>
                    <p className="pl-4 my-1">Bring an umbrella</p>
                    <p><span className="text-purple-600 font-bold">ELSE</span></p>
                    <p className="pl-4 my-1">Wear sunglasses</p>
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 hover:border-kids-yellow/30 transition-colors">
                  <h4 className="font-bold mb-3 text-kids-yellow">⭐ Loop Example:</h4>
                  <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                    <p><span className="text-purple-600 font-bold">REPEAT 5 TIMES</span></p>
                    <p className="pl-4 my-1">Draw a star</p>
                    <p><span className="text-purple-600 font-bold">END REPEAT</span></p>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center">
                <div className="text-9xl">🤔</div>
                <div className="absolute inset-0 bg-black/5"></div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Interactive Demo - Algorithms in AI */}
        <AlgorithmInteractiveDemo />

        {/* Fun Activities */}
        <AlgorithmFunActivities />

        {/* Summary */}
        <GlassCard variant="default" className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🎯 What We Learned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold mb-2 text-kids-green">Algorithms are instructions</h3>
              <p className="text-sm text-gray-600">Step-by-step guides for solving problems</p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-bold mb-2 text-kids-blue">They use decisions and loops</h3>
              <p className="text-sm text-gray-600">If-then statements and repeating actions</p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold mb-2 text-kids-purple">AI uses special algorithms</h3>
              <p className="text-sm text-gray-600">For classification, clustering, and recommendations</p>
            </div>
          </div>

          <div className="bg-kids-red/20 border border-kids-red/40 p-6 rounded-xl mt-8">
            <h4 className="text-xl font-bold mb-3 text-center">
              🎯 Try This!
            </h4>
            <p className="text-lg mb-3">
              Think of an algorithm (set of steps) for getting ready for school in the morning. What steps would you include? In what order?
            </p>
            <p className="text-sm italic text-gray-600">
              Example: 1) Wake up, 2) Brush teeth, 3) Get dressed, 4) Eat breakfast, 5) Pack backpack, 6) Leave for school
            </p>
          </div>
        </GlassCard>

      </div>
    </LessonLayout>
  );
};

export default SimpleAlgorithms;
