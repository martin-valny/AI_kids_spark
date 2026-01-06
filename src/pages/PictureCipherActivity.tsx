import React from 'react';
import { Lock, ExternalLink, Brain, ScanLine } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const PictureCipherActivity = () => {
  return (
    <LessonLayout
      title="Picture Cipher"
      subtitle="Can you guess the image before it's fully revealed?"
      backLink="/lessons/image-recognition"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="You're a detective again! Images are hidden behind a scrambled grid. As pieces flip over, try to guess what the full picture is. This is how AI works when it has noisy or incomplete data!"
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-green">
            👁️‍🗨️ What You Do
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Images are slowly revealed through a scrambled grid. Try to guess what it is before all pieces appear!
          </p>

          <div className="bg-white/50 p-6 rounded-2xl border border-kids-green/10 shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-lg mb-3 text-kids-green flex items-center gap-2">
              <Brain className="w-5 h-5" />
              What You Learn:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-kids-green"></div>
                <span>How AI handles partial information</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-kids-green"></div>
                <span>That pattern matching works even when things are blurry</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-kids-green"></div>
                <span>How the brain predicts what's coming next</span>
              </li>
            </ul>
          </div>
        </NarratedBox>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: AI Connection */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-purple">
              <ScanLine className="w-6 h-6" />
              Real AI Connection
            </h2>
            <Card className="border-2 border-kids-purple/20 shadow-md flex-1 bg-white/90">
              <CardContent className="p-6">
                <p className="mb-6 text-gray-700 leading-relaxed">
                  This game mimics how AI deals with "noisy" or bad inputs! Sometimes cameras are blurry or blocked, but AI can still guess what's in the picture.
                </p>

                <h4 className="font-bold mb-4 text-kids-purple">Real Examples:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                    <span className="text-2xl">📹</span>
                    <span className="font-medium text-gray-700">Security cameras in dark places</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                    <span className="text-2xl">🏥</span>
                    <span className="font-medium text-gray-700">Medical scans with blurry spots</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                    <span className="text-2xl">🌧️</span>
                    <span className="font-medium text-gray-700">Self-driving cars in heavy rain</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col h-full justify-center">
            <div className="p-8 bg-white/90 rounded-3xl border-2 border-kids-green/20 text-center mb-6 hover:border-kids-green/40 transition-colors">
              <div className="text-6xl mb-4">🕵️‍♀️</div>
              <h3 className="text-2xl font-bold text-kids-green mb-2">Ready to Solve It?</h3>
              <p className="text-gray-600">Put on your detective hat!</p>
            </div>

            <a
              href="https://plays.org/picture-cipher/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Button className="w-full bg-kids-green hover:bg-green-600 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  🎮 Play Picture Cipher
                  <ExternalLink className="w-6 h-6" />
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default PictureCipherActivity;
