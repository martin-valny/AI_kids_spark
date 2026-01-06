import React from 'react';
import { ExternalLink, CheckCircle, Code, User, Play } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const RodocodoActivity = () => {
  return (
    <LessonLayout
      title="Rodocodo - Code Hour"
      subtitle="Learn programming step-by-step with fun puzzles!"
      backLink="/lessons/simple-algorithms"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="Meet the Rodocodos! These cute little characters need your help. Use code blocks to guide them through their world. You'll learn loops, functions, and debugging along the way!"
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-blue">
            🎯 What You'll Learn
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            In this coding game, you'll learn the basics of creating algorithms by solving fun puzzles!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 p-6 rounded-2xl border border-kids-blue/10 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-lg mb-3 text-kids-blue flex items-center gap-2">
                <Code className="w-5 h-5" />
                Coding Concepts:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-blue" />
                  <span>Sequencing (order of steps)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-blue" />
                  <span>Loops (repeating actions)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-blue" />
                  <span>Conditionals (if-then rules)</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl border border-indigo-200/50 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-lg mb-3 text-indigo-600 flex items-center gap-2">
                🎓 Life Skills:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                  <span>Problem-solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                  <span>Logical thinking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                  <span>Resilience (trying again)</span>
                </li>
              </ul>
            </div>
          </div>
        </NarratedBox>

        {/* Gameplay Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: How to Play */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
              <Play className="w-6 h-6" />
              How to Play
            </h2>
            <Card className="border border-white/20 shadow-lg flex-1 bg-white/95 backdrop-blur-md h-full">
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-kids-green font-bold flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-gray-700">Observe the puzzle goal.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-kids-green font-bold flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-gray-700">Drag commands to the timeline.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-kids-green font-bold flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-gray-700">Press "Play" to test instructions.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-kids-green font-bold flex items-center justify-center flex-shrink-0">4</div>
                    <p className="text-gray-700">Celebrate or debug!</p>
                  </li>
                </ol>

                <div className="mt-8 flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-kids-green/10 italic text-gray-600 text-sm">
                  <User className="w-6 h-6 text-gray-400" />
                  "Don't worry about mistakes. That's how we learn!"
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: CTA & Features */}
          <div className="flex flex-col h-full space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-purple">
                ⭐ Game Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/95 p-4 rounded-xl text-center border border-white/20 hover:shadow-lg transition-all shadow-md">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-bold text-sm text-indigo-600">Certificates</div>
                </div>
                <div className="bg-white/95 p-4 rounded-xl text-center border border-white/20 hover:shadow-lg transition-all shadow-md">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-bold text-sm text-indigo-600">No Login Needed</div>
                </div>
                <div className="bg-white/95 p-4 rounded-xl text-center border border-white/20 hover:shadow-lg transition-all shadow-md">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-bold text-sm text-indigo-600">Many Levels</div>
                </div>
                <div className="bg-white/95 p-4 rounded-xl text-center border border-white/20 hover:shadow-lg transition-all shadow-md">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-bold text-sm text-indigo-600">Ages 4-11</div>
                </div>
              </div>
            </div>

            <GlassCard className="p-8 text-center space-y-4 bg-gradient-to-br from-kids-blue/5 to-indigo-500/5 !border-kids-blue/10">
              <h3 className="text-xl font-bold text-kids-blue">Ready to Code?</h3>
              <p className="text-gray-600">The Rodocodos are waiting for your help!</p>

              <a
                href="https://rodocodo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Button className="w-full bg-kids-blue hover:bg-blue-600 text-white py-4 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    🎮 Play Rodocodo
                    <ExternalLink className="w-6 h-6" />
                  </span>
                </Button>
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default RodocodoActivity;
