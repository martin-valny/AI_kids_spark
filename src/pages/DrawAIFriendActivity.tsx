import React, { useState } from 'react';
import { Save, Palette, Eraser, Bot, Sparkles, UserPlus } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';
import DrawingCanvas from '@/components/DrawingCanvas';

const DrawAIFriendActivity = () => {
  const [showTips, setShowTips] = useState(true);

  return (
    <LessonLayout
      title="Draw Your AI Friend"
      subtitle="Imagine and create your own AI helper!"
      backLink="/lessons/simple-algorithms"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Narrated Box */}
        <NarratedBox
          text="Time to get creative! Imagine you could design your very own AI friend to help you every day. What would it look like? Would it be a robot, a floating cloud, or maybe a magical creature? Use your imagination!"
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-pink/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
            🎨 Create Your Companion
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Imagine you could design your very own AI friend to help you every day. What would it look like? Every great invention starts with a drawing!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-6 rounded-2xl border border-kids-purple/10 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-lg mb-3 text-kids-blue flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Think about:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-kids-purple">•</span>
                  <span>Friendly robot, magical creature, or something new?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kids-purple">•</span>
                  <span>What special features does it have to help you?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-kids-purple">•</span>
                  <span>What colors make it look friendly?</span>
                </li>
              </ul>
            </div>

            {showTips && (
              <div className="bg-white/50 p-6 rounded-2xl border border-blue-200/50 hover:shadow-md shadow-sm transition-all">
                <h4 className="font-bold text-lg mb-3 text-kids-purple flex items-center gap-2">
                  💡 Drawing Tips:
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Don't forget to give it a face to show emotions! Does it have wheels to move fast, or wings to fly? Maybe it has a screen on its chest to show information!
                </p>
              </div>
            )}
          </div>
        </NarratedBox>

        {/* Drawing Canvas Section */}
        <div>
          <Card className="border-2 border-kids-blue/20 shadow-lg bg-white/90 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-kids-blue flex items-center gap-2">
                  <Palette className="w-6 h-6" />
                  Your AI Friend Canvas
                </h3>
                {/* Tools are managed inside DrawingCanvas or could be externalized later */}
              </div>

              <div className="border-4 border-dashed border-kids-blue/10 rounded-3xl p-2 bg-gray-50 mb-6">
                <DrawingCanvas className="w-full rounded-2xl bg-white shadow-sm" />
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-kids-purple to-kids-pink text-white px-8 py-4 rounded-full shadow-lg hover:shadow-kids-purple/50 transition-all hover:scale-105">
                  <Save className="w-5 h-5 mr-2" />
                  Save My AI Friend
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <GlassCard variant="purple" className="p-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 text-kids-purple flex items-center justify-center gap-3">
              <Bot className="w-8 h-8" />
              Real AI Helpers
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Great job creating your AI friend! Did you know AI helpers already exist in many forms?
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 text-center hover:border-kids-blue/50 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">🗣️</div>
                <h4 className="font-bold mb-2 text-kids-blue">Voice Assistants</h4>
                <p className="text-xs text-gray-600">
                  Lives in phones/speakers to answer questions.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 text-center hover:border-kids-green/50 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-bold mb-2 text-kids-green">Helper Robots</h4>
                <p className="text-xs text-gray-600">
                  Can move around and help with cleaning.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 text-center hover:border-kids-purple/50 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">🎮</div>
                <h4 className="font-bold mb-2 text-kids-purple">Game NPCs</h4>
                <p className="text-xs text-gray-600">
                  Characters in games that react to you.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-orange/20 text-center hover:border-kids-orange/50 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">📱</div>
                <h4 className="font-bold mb-2 text-kids-orange">App Helpers</h4>
                <p className="text-xs text-gray-600">
                  Learns what you like to suggest music/movies.
                </p>
              </div>
            </div>

            <p className="mt-8 font-medium text-kids-purple text-lg">
              Your imagination shows how AI could help make our lives better and more fun!
            </p>
          </div>
        </GlassCard>
      </div>
    </LessonLayout>
  );
};

export default DrawAIFriendActivity;
