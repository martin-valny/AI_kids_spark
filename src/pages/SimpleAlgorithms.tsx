
import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import AlgorithmVideoSection from '@/components/algorithms/AlgorithmVideoSection';
import AlgorithmInteractiveDemo from '@/components/algorithms/AlgorithmInteractiveDemo';
import AlgorithmFunActivities from '@/components/algorithms/AlgorithmFunActivities';
import AITutor from '@/components/AITutor';

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
                An algorithm is a precise sequence of computational steps that transforms input data into desired output. Algorithms form the foundation of computer science—from simple sorting to complex machine learning optimization.
              </p>
              <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 mt-4 hover:border-kids-green/40 transition-colors">
                <h4 className="font-bold mb-2 text-kids-green">⚙️ Algorithms in Digital Systems:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Social media feed ranking (engagement optimization)</li>
                  <li>Search engine results ordering (PageRank, relevance scoring)</li>
                  <li>Recommendation systems (collaborative filtering)</li>
                  <li>Compression algorithms (efficient data storage)</li>
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
              <h3 className="font-bold text-2xl text-kids-blue mb-4">🔢 Sorting & Ranking Algorithms</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Sorting algorithms organize data for efficient retrieval. Modern platforms use sophisticated ranking algorithms that combine multiple signals to personalize content feeds.
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-blue/10">
                <p className="font-mono text-sm mb-2">Social Feed Ranking: [engagement_score, recency, relevance, user_affinity]</p>
                <p className="font-mono text-sm font-bold text-kids-blue">Optimized by weighted algorithm → Personalized feed</p>
              </div>
            </GlassCard>

            <GlassCard variant="purple" className="p-8">
              <h3 className="font-bold text-2xl text-kids-purple mb-4">🔍 Information Retrieval Algorithms</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Search algorithms process queries against massive datasets using indexing, hashing, and semantic understanding to return relevant results in milliseconds.
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-purple/10">
                <p className="font-mono text-sm mb-2">Query: "AI music generation" → Index lookup + TF-IDF scoring + Semantic embedding</p>
                <p className="font-mono text-sm font-bold text-kids-purple">Ranked results based on relevance & authority</p>
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
                  Control flow structures (conditionals, loops) enable algorithms to make dynamic decisions based on data state and execute operations efficiently.
                </p>
                <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                  <h4 className="font-bold mb-3 text-kids-green">🎯 Conditional Logic in Recommendation Systems:</h4>
                  <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                    <p><span className="text-purple-600 font-bold">IF</span> user_engagement_score &gt; threshold <span className="text-purple-600 font-bold">THEN</span></p>
                    <p className="pl-4 my-1">Boost content visibility in feed</p>
                    <p><span className="text-purple-600 font-bold">ELSE</span></p>
                    <p className="pl-4 my-1">Apply time-decay penalty</p>
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 hover:border-kids-yellow/30 transition-colors">
                  <h4 className="font-bold mb-3 text-kids-yellow">⭐ Iteration in Data Processing:</h4>
                  <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                    <p><span className="text-purple-600 font-bold">FOR EACH</span> user in active_users</p>
                    <p className="pl-4 my-1">Calculate personalized_feed_ranking()</p>
                    <p><span className="text-purple-600 font-bold">END FOR</span></p>
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

        {/* Hands-on Activities */}
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
              🎯 Career Application
            </h4>
            <p className="text-lg mb-3">
              <strong>Algorithm Design</strong> is crucial in roles like Software Engineer, Data Scientist, and ML Engineer. Understanding algorithmic complexity (Big O notation), optimization techniques, and data structures enables you to build scalable systems.
            </p>
            <p className="text-sm italic text-gray-600">
              Key skills: Algorithm analysis, time/space complexity optimization, choosing appropriate data structures for specific use cases.
            </p>
          </div>
        </GlassCard>

      </div>
      <AITutor lessonContext="Lesson: Simple Algorithms. Topic: Understanding step-by-step instructions and decision-making in AI" />
    </LessonLayout>
  );
};

export default SimpleAlgorithms;
