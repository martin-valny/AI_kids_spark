import React from 'react';
import { Camera, ExternalLink, Zap, Target, Sparkles } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const QuickDrawActivity = () => {
  return (
    <LessonLayout
      title="Quick Draw Challenge"
      subtitle="Can the AI guess your drawing?"
      backLink="/lessons/image-recognition"
      backLabel="Back to Lesson"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="Ready to test your artistic skills against an AI? In this activity, you'll draw simple objects, and a neural network will try to guess what they are! It's amazing to see how quickly it can recognize your doodles."
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-cyan/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-blue">
            🖍️ How It Works
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            You draw something — like a cat, tree, or shoe — and the AI guesses what you're drawing, based on its training from millions of doodles.
          </p>

          <div className="bg-white/50 p-6 rounded-2xl border border-kids-blue/10 shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold mb-4 text-xl flex items-center gap-2 text-kids-blue">
              <Target className="w-6 h-6" />
              What You Learn:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-base">
              <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-blue/10 rounded-xl hover:shadow-sm transition-all">
                <span className="text-2xl">🧠</span>
                <span className="text-gray-800">How AI recognizes patterns</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-blue/10 rounded-xl hover:shadow-sm transition-all">
                <span className="text-2xl">📈</span>
                <span className="text-gray-800">More examples = better guesses</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-blue/10 rounded-xl hover:shadow-sm transition-all">
                <span className="text-2xl">🤔</span>
                <span className="text-gray-800">AI isn't perfect (yet!)</span>
              </li>
            </ul>
          </div>
        </NarratedBox>

        {/* Challenge Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
              <Sparkles className="w-6 h-6" />
              Challenge Yourself
            </h2>
            <Card className="border-2 border-kids-green/20 shadow-md flex-1 bg-white/90">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green/50 transition-colors">
                    <h4 className="font-bold mb-2 text-kids-green">Easy Drawings:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Cat</li>
                      <li>• House</li>
                      <li>• Sun</li>
                      <li>• Car</li>
                    </ul>
                  </div>
                  <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-orange/20 hover:border-kids-orange/50 transition-colors">
                    <h4 className="font-bold mb-2 text-kids-orange">Tricky Drawings:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Octopus</li>
                      <li>• Helicopter</li>
                      <li>• Birthday cake</li>
                      <li>• Dragon</li>
                    </ul>
                  </div>
                </div>
                <p className="text-center mt-6 text-gray-600 font-medium">
                  Can you draw clearly enough for the AI to guess in under 20 seconds?
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col justify-center items-center">
            <a
              href="https://quickdraw.withgoogle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md"
            >
              <Button className="w-full bg-kids-blue hover:bg-blue-600 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  🎮 Play Quick Draw!
                  <ExternalLink className="w-6 h-6" />
                </span>
              </Button>
            </a>
            <p className="text-kids-blue font-medium mt-6 text-center max-w-xs">
              🔁 Try again and again! Can you trick it with creative drawings?
            </p>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default QuickDrawActivity;
