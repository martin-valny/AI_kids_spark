
import React from 'react';
import { Sparkles, Brain, Users } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import ActivityCard from '@/components/ActivityCard';

const AIEthics = () => {
  const activities = [
    {
      id: "ai-ethics-scenarios",
      title: "AI Ethics Scenarios",
      description: "Think through ethical dilemmas involving AI",
      path: "/activities/ai-ethics-scenarios",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "15-20 min"
    },
    {
      id: "design-responsible-ai",
      title: "Design a Responsible AI",
      description: "Create your own AI with good ethical principles",
      path: "/activities/design-responsible-ai",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      difficulty: "Challenging" as const,
      estimatedTime: "20-30 min"
    }
  ];

  return (
    <LessonLayout
      title="AI Ethics for Kids"
      subtitle="Using AI responsibly and safely"
      backLink="/lessons"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Section */}
        <GlassCard variant="purple" className="p-8">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
              <div className="text-4xl">⚖️</div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                ⚖️ What Are AI Ethics?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                AI Ethics means thinking about what's right and wrong when we create and use artificial intelligence. Just like we have rules for how people should treat each other, we need rules for how we create and use AI.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Video Section */}
        <GlassCard variant="blue" className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            📺 Watch: AI Ethics Explained for Kids
          </h3>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/tJQSyzBUAew"
              title="AI Ethics for Kids"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </GlassCard>

        {/* Important Ethical Questions */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-kids-blue" />
            Important Ethical Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="blue" className="p-8">
              <h3 className="font-bold text-2xl text-kids-blue mb-4">🔒 Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                How do we protect people's private information when AI uses it?
              </p>
              <div className="mt-4 bg-white/50 p-4 rounded-xl border-2 border-kids-blue/10">
                <p className="text-sm text-gray-600">
                  Your personal data should be kept safe and only used with your permission.
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="purple" className="p-8">
              <h3 className="font-bold text-2xl text-kids-purple mb-4">⚖️ Fairness</h3>
              <p className="text-gray-700 leading-relaxed">
                How do we make sure AI treats everyone fairly, no matter who they are?
              </p>
              <div className="mt-4 bg-white/50 p-4 rounded-xl border-2 border-kids-purple/10">
                <p className="text-sm text-gray-600">
                  AI should work equally well for everyone, regardless of background.
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="green" className="p-8">
              <h3 className="font-bold text-2xl text-kids-green mb-4">🛡️ Safety</h3>
              <p className="text-gray-700 leading-relaxed">
                How do we ensure AI systems are safe and don't cause harm?
              </p>
              <div className="mt-4 bg-white/50 p-4 rounded-xl border-2 border-kids-green/10">
                <p className="text-sm text-gray-600">
                  AI should be tested thoroughly to prevent accidents and protect people.
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="yellow" className="p-8">
              <h3 className="font-bold text-2xl text-kids-yellow mb-4">🔍 Transparency</h3>
              <p className="text-gray-700 leading-relaxed">
                How can we understand what AI is doing and why it makes certain decisions?
              </p>
              <div className="mt-4 bg-white/50 p-4 rounded-xl border-2 border-kids-yellow/10">
                <p className="text-sm text-gray-600">
                  We should be able to explain how AI works and why it makes decisions.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Being a Good Digital Citizen */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-kids-red" />
            Being a Good Digital Citizen
          </h2>

          <GlassCard variant="red" className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 shadow-sm hover:border-kids-red transition-colors">
                <h4 className="font-bold text-lg text-kids-red mb-3">✓ Be Truthful</h4>
                <p className="text-gray-700">Don't use AI to spread false information</p>
              </div>
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 shadow-sm hover:border-kids-blue transition-colors">
                <h4 className="font-bold text-lg text-kids-blue mb-3">✓ Be Kind</h4>
                <p className="text-gray-700">Don't use AI to be mean to others</p>
              </div>
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 shadow-sm hover:border-kids-green transition-colors">
                <h4 className="font-bold text-lg text-kids-green mb-3">✓ Be Careful</h4>
                <p className="text-gray-700">Think about the information you share with AI</p>
              </div>
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple transition-colors">
                <h4 className="font-bold text-lg text-kids-purple mb-3">✓ Be Thoughtful</h4>
                <p className="text-gray-700">Use AI to help people, not hurt them</p>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Examples of Ethical AI */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-kids-green" />
            Examples of Ethical AI
          </h2>

          <GlassCard variant="blue" className="p-8">
            <div className="space-y-4">
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 shadow-sm hover:border-kids-blue transition-colors">
                <h4 className="font-bold text-lg text-kids-blue mb-2">📚 AI that helps students learn</h4>
                <p className="text-gray-700">AI tutors that adapt to different learning styles</p>
              </div>
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 shadow-sm hover:border-kids-green transition-colors">
                <h4 className="font-bold text-lg text-kids-green mb-2">🏥 AI that helps doctors treat patients</h4>
                <p className="text-gray-700">AI that can detect diseases in medical images</p>
              </div>
              <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple transition-colors">
                <h4 className="font-bold text-lg text-kids-purple mb-2">♿ AI that makes technology accessible</h4>
                <p className="text-gray-700">Voice assistants that help people with disabilities</p>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Summary */}
        <GlassCard variant="default" className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🎯 What We Learned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-bold mb-2 text-kids-purple">Ethics guide AI use</h3>
              <p className="text-sm text-gray-600">Rules for creating and using AI responsibly</p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold mb-2 text-kids-blue">Key principles matter</h3>
              <p className="text-sm text-gray-600">Privacy, fairness, safety, and transparency</p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="font-bold mb-2 text-kids-green">We can make a difference</h3>
              <p className="text-sm text-gray-600">Use AI to help, not harm</p>
            </div>
          </div>

          <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl mt-8">
            <h4 className="text-xl font-bold mb-4 text-center">
              🤔 Questions to Ask About AI
            </h4>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-kids-blue">1.</span>
                <span>Who created this AI and why?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-kids-purple">2.</span>
                <span>What data was used to train it?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-kids-green">3.</span>
                <span>How might it help people?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-kids-red">4.</span>
                <span>Could it harm anyone?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-kids-yellow">5.</span>
                <span>Is it fair to everyone?</span>
              </li>
            </ol>
          </div>
        </GlassCard>

        {/* Activities Section */}
        {activities.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-kids-yellow" />
              Fun Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </section>
        )}
      </div>
    </LessonLayout>
  );
};

export default AIEthics;
