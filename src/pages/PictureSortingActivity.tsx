import React from 'react';
import { Grid3x3, ExternalLink, Target, Brain, Layers } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const PictureSortingActivity = () => {
  return (
    <LessonLayout
      title="Picture Sorting Game"
      subtitle="Sort images into categories and learn how AI classifies things!"
      backLink="/lessons/image-recognition"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="Welcome! In this game, you'll be doing exactly what an AI does - looking at pictures and deciding which group they belong to. Is it a bird? Is it a plane? Or is it a pizza? Let's sort it out!"
          className="bg-gradient-to-r from-kids-purple/45 to-pink-500/10 border-2 border-kids-purple/30 p-8 rounded-3xl shadow-xl relative overflow-hidden"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
            📦 Your Mission
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Sort different pictures (animals, foods, tools, etc.) into the correct categories. It sounds simple, but you're training your brain to think like a classifier!
          </p>

          <div className="bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple/40 transition-colors">
            <h4 className="font-bold text-lg mb-3 text-kids-purple flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Why It's Cool:
            </h4>
            <p className="text-lg text-gray-700">
              This is exactly what AI does when it "classifies" images — it finds the best group for what it sees based on features!
            </p>
          </div>
        </NarratedBox>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: How AI Sorts */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
              <Layers className="w-6 h-6" />
              How AI Sorts Images
            </h2>
            <Card className="border-2 border-kids-blue/20 shadow-md flex-1 bg-white/90">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-kids-blue/10 p-4 rounded-xl border-2 border-kids-blue/20 flex gap-4 items-center hover:border-kids-blue/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-kids-blue text-white font-bold flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-gray-700 font-medium">Look at image features (shapes, colors)</p>
                  </div>
                  <div className="bg-kids-blue/10 p-4 rounded-xl border-2 border-kids-blue/20 flex gap-4 items-center hover:border-kids-blue/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-kids-blue text-white font-bold flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-gray-700 font-medium">Compare to known patterns</p>
                  </div>
                  <div className="bg-kids-blue/10 p-4 rounded-xl border-2 border-kids-blue/20 flex gap-4 items-center hover:border-kids-blue/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-kids-blue text-white font-bold flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-gray-700 font-medium">Assign to the best category</p>
                  </div>
                  <div className="bg-kids-blue/10 p-4 rounded-xl border-2 border-kids-blue/20 flex gap-4 items-center hover:border-kids-blue/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-kids-blue text-white font-bold flex items-center justify-center flex-shrink-0">4</div>
                    <p className="text-gray-700 font-medium">Calculate confidence (how sure it is)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Real Uses & Play */}
          <div className="flex flex-col h-full justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
                <Target className="w-6 h-6" />
                Real World Uses
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-kids-purple/10 p-4 rounded-xl text-center border-2 border-kids-purple/20 hover:scale-105 transition-transform hover:border-kids-purple/50">
                  <div className="text-2xl mb-2">📸</div>
                  <div className="font-bold text-xs text-kids-purple">Photo Organization</div>
                </div>
                <div className="bg-kids-purple/10 p-4 rounded-xl text-center border-2 border-kids-purple/20 hover:scale-105 transition-transform hover:border-kids-purple/50">
                  <div className="text-2xl mb-2">🛍️</div>
                  <div className="font-bold text-xs text-kids-purple">Shopping Search</div>
                </div>
                <div className="bg-kids-purple/10 p-4 rounded-xl text-center border-2 border-kids-purple/20 hover:scale-105 transition-transform hover:border-kids-purple/50">
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="font-bold text-xs text-kids-purple">Safety Filters</div>
                </div>
                <div className="bg-kids-purple/10 p-4 rounded-xl text-center border-2 border-kids-purple/20 hover:scale-105 transition-transform hover:border-kids-purple/50">
                  <div className="text-2xl mb-2">🏥</div>
                  <div className="font-bold text-xs text-kids-purple">Medical Diagnosis</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://www.splashlearn.com/ela/categorize-pictures-into-groups-games"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Button className="w-full bg-kids-purple hover:bg-purple-600 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    🎮 Play Sorting Game
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

export default PictureSortingActivity;
