import React from 'react';
import { Gamepad2, ExternalLink, CheckCircle, Play, Star } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const RobotIslandsActivity = () => {
  return (
    <LessonLayout
      title="Blockly Games: Maze"
      subtitle="Learn logic by guiding a robot through tricky mazes!"
      backLink="/lessons/simple-algorithms"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="Ready for an adventure? You need to write the code to guide our explorer to the goal! It starts easy, but you'll need loops and logic to solve the harder levels. Can you beat all 10?"
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-green">
            🎯 Mission Briefing
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            In Blockly Games Maze, you'll learn to think like a programmer by creating step-by-step instructions using visual code blocks!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-6 rounded-2xl border border-kids-green/10 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-lg mb-3 text-kids-green flex items-center gap-2">
                🤖 Coding Skills:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-green" />
                  <span>Breaking problems into steps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-green" />
                  <span>Sequencing commands properly</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-kids-green" />
                  <span>Using loops & logic</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-teal-400/10 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-lg mb-3 text-teal-600 flex items-center gap-2">
                🧠 Thinking Skills:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span>Logical reasoning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span>Debugging mistakes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span>Problem solving</span>
                </li>
              </ul>
            </div>
          </div>
        </NarratedBox>

        {/* How To Play Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
              <Play className="w-6 h-6" />
              How to Play
            </h2>
            <Card className="border-2 border-kids-blue/20 shadow-md flex-1 bg-white/90">
              <CardContent className="p-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-kids-blue font-bold flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-gray-700">Look at the maze and plan your path to the goal.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-kids-blue font-bold flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-gray-700">Drag code blocks from the toolbox on the left.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-kids-blue font-bold flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-gray-700">Snap blocks together to build your program.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-kids-blue font-bold flex items-center justify-center flex-shrink-0">4</div>
                    <p className="text-gray-700">Run it! If it fails, debug and try again.</p>
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-white/90 rounded-xl border-2 border-kids-yellow/20 hover:border-kids-yellow/50 transition-colors">
                  <h4 className="font-bold text-kids-yellow flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    Pro Tip:
                  </h4>
                  <p className="text-sm text-gray-700">
                    Try to use as few blocks as possible! Can you solve it with fewer lines of code?
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: CTA & Features */}
          <div className="flex flex-col h-full justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-purple">
                <Star className="w-6 h-6" />
                Why It's Awesome
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/90 p-4 rounded-xl text-center border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <div className="text-2xl mb-2">👀</div>
                  <div className="font-bold text-sm text-kids-purple">Visual Coding</div>
                </div>
                <div className="bg-white/90 p-4 rounded-xl text-center border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <div className="text-2xl mb-2">🧩</div>
                  <div className="font-bold text-sm text-kids-purple">Block Logic</div>
                </div>
                <div className="bg-white/90 p-4 rounded-xl text-center border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-bold text-sm text-kids-purple">10 Levels</div>
                </div>
                <div className="bg-white/90 p-4 rounded-xl text-center border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <div className="text-2xl mb-2">🆓</div>
                  <div className="font-bold text-sm text-kids-purple">100% Free</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://blockly.games/maze"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Button className="w-full bg-kids-green hover:bg-green-600 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    🎮 Start Playing Maze
                    <ExternalLink className="w-6 h-6" />
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default RobotIslandsActivity;
