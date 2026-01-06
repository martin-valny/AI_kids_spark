import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Award, Sparkles, Brain, Zap, Users } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import VideoPlayer from '@/components/VideoPlayer';
import MachineLearningSteps from '@/components/MachineLearningSteps';
import ActivityCard from '@/components/ActivityCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LessonContent {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  content: React.ReactNode;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    path: string;
    image: string;
    difficulty: 'Easy' | 'Medium' | 'Challenging';
    estimatedTime: string;
  }>;
  nextLesson: string | null;
  previousLesson: string | null;
}

const lessonsData: {
  [key: string]: LessonContent;
} = {
  "intro-to-ai": {
    id: "intro-to-ai",
    title: "Introduction to AI",
    description: "Learn what AI is and how it's used in everyday life",
    videoId: "kQPC4_DsJ8I",
    duration: "20 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="purple" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">🤖</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-purple/10 text-kids-purple px-4 py-1 rounded-full text-sm font-bold w-fit">
              Foundation Lesson
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              What is Artificial Intelligence?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Artificial Intelligence (AI) is like giving computers the ability to think and learn in ways similar to how humans do.
              Just like you learn new things every day, AI can learn from information (data) and get better at doing tasks.
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-purple">💡 Amazing Abilities:</h4>
              <p className="text-sm text-gray-700">
                AI can recognize pictures, play games, create art, and even chat with you! Let's explore how it shows up in your world.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Talk & Communicate - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-purple" />
          How We Use AI Every Day
        </h2>

        <GlassCard className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center order-2 lg:order-1">
              <div className="text-9xl">🗣️</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-800">Talk & Communicate</h3>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-purple mb-2">Voice Assistants</h4>
                  <p className="text-sm text-gray-700">Siri, Alexa, and Google Assistant understand your voice and can chat with you like a helpful friend!</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-purple mb-2">Language Translation</h4>
                  <p className="text-sm text-gray-700">Apps that instantly translate between over 100 languages — like having a universal translator!</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Play & Entertainment - Split Screen */}
      <section>
        <GlassCard variant="green" className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-800">Play & Entertainment</h3>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-green mb-2">Smart Game Characters</h4>
                  <p className="text-sm text-gray-700">AI controls characters in video games, making them act clever and challenge you in fun ways!</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-green mb-2">Video Recommendations</h4>
                  <p className="text-sm text-gray-700">YouTube and Netflix suggest videos you might love based on what you've watched before.</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-9xl">🎮</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Create & Capture - Split Screen */}
      <section>
        <GlassCard variant="pink" className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center order-2 lg:order-1">
              <div className="text-9xl">📸</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-800">Create & Capture</h3>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-pink mb-2">Photo Magic</h4>
                  <p className="text-sm text-gray-700">Apps that recognize faces, add fun filters, and automatically organize your pictures!</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <h4 className="font-bold text-kids-pink mb-2">Creative AI</h4>
                  <p className="text-sm text-gray-700">AI that helps create art, music, and stories — like having a creative robot assistant!</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Cool AI Superpowers - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-yellow" />
          Cool AI Superpowers!
        </h2>

        <GlassCard variant="yellow" className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                Here are some mind-blowing things AI can do that make it seem like it has actual superpowers!
              </p>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                  <h4 className="font-bold text-kids-blue mb-2">⚡ Super Speed Power</h4>
                  <p className="text-sm text-gray-700">
                    AI can process information <strong>millions of times faster</strong> than humans!
                    What takes you an hour to read, AI can "read" in seconds.
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                  <h4 className="font-bold text-kids-green mb-2">🎨 Creative Genius Power</h4>
                  <p className="text-sm text-gray-700">
                    AI creates original artwork, composes music, and writes stories!
                    Some AI art has sold for <strong>hundreds of thousands of dollars</strong>.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                  <h4 className="font-bold text-kids-purple mb-2">🌍 Language Master Power</h4>
                  <p className="text-sm text-gray-700">
                    AI can instantly understand and translate between over <strong>100 languages</strong>!
                    It's like having a universal translator from sci-fi movies.
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                  <h4 className="font-bold text-kids-red mb-2">🔬 Future Vision Power</h4>
                  <p className="text-sm text-gray-700">
                    AI helps predict earthquakes, discovers new medicines, and designs rockets for space exploration.
                    The future is now!
                  </p>
                </div>
              </div>
              <div className="bg-kids-blue/10 p-4 rounded-xl text-center">
                <p className="text-sm font-medium">
                  🌟 <strong>Fun Challenge:</strong> Next time you use your phone, try to spot 3 different AI superpowers helping you!
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* AI vs Humans - Card Style */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-kids-blue" />
          AI vs. Humans: Different Superpowers!
        </h2>

        <GlassCard variant="blue" className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-kids-blue mb-4">🤖 AI Superpowers</h3>
              <div className="space-y-3">
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">⚡ Lightning-fast calculations</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">📊 Analyzes huge amounts of data instantly</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">🎯 Masters specific tasks with training</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">🔋 Works 24/7 with power</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">📱 Perfect memory of everything</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-kids-purple mb-4">👨‍💻 Human Superpowers</h3>
              <div className="space-y-3">
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">🧠 Creative problem-solving</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">💡 Original ideas and imagination</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">🌟 Learns many different things naturally</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">❤️ Has feelings and consciousness</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="font-medium">🤝 Understands emotions and relationships</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* AI Timeline */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-4xl">🕰️</span>
          How AI Evolved: From Science Fiction to Your Phone!
        </h2>

        <GlassCard variant="orange" className="p-8">
          <p className="text-lg mb-8 text-center text-gray-700">
            AI has been growing and evolving for decades! Let's take a journey through the most exciting moments in AI history.
          </p>

          <div className="relative">
            <div className="timeline-container overflow-x-auto pb-4">
              <div className="flex items-center space-x-8 min-w-max">
                {/* 1956 */}
                <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                  <div className="timeline-node w-4 h-4 bg-kids-blue rounded-full border-4 border-white shadow-lg"></div>
                  <div className="timeline-year text-2xl font-bold text-kids-blue mt-2">1956</div>
                  <div className="timeline-content bg-white p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                    <div className="text-2xl mb-2">🧠</div>
                    <h4 className="font-bold text-sm">AI Gets a Name!</h4>
                    <p className="text-xs text-gray-600">Scientists decide to call smart machines "Artificial Intelligence" — the name we still use today!</p>
                  </div>
                </div>

                <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-blue to-kids-green"></div>

                {/* 1997 */}
                <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                  <div className="timeline-node w-4 h-4 bg-kids-green rounded-full border-4 border-white shadow-lg"></div>
                  <div className="timeline-year text-2xl font-bold text-kids-green mt-2">1997</div>
                  <div className="timeline-content bg-white p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                    <div className="text-2xl mb-2">♟️</div>
                    <h4 className="font-bold text-sm">Computer Beats Chess Master!</h4>
                    <p className="text-xs text-gray-600">Deep Blue defeats the world's best chess player — something people thought was impossible!</p>
                  </div>
                </div>

                <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-green to-kids-yellow"></div>

                {/* 2011 */}
                <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                  <div className="timeline-node w-4 h-4 bg-kids-yellow rounded-full border-4 border-white shadow-lg"></div>
                  <div className="timeline-year text-2xl font-bold text-kids-yellow mt-2">2011</div>
                  <div className="timeline-content bg-white p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                    <div className="text-2xl mb-2">📺</div>
                    <h4 className="font-bold text-sm">AI on Game Show!</h4>
                    <p className="text-xs text-gray-600">Watson goes on Jeopardy! and beats human contestants by answering tricky questions super fast!</p>
                  </div>
                </div>

                <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-yellow to-kids-red"></div>

                {/* 2016 */}
                <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                  <div className="timeline-node w-4 h-4 bg-kids-red rounded-full border-4 border-white shadow-lg"></div>
                  <div className="timeline-year text-2xl font-bold text-kids-red mt-2">2016</div>
                  <div className="timeline-content bg-white p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                    <div className="text-2xl mb-2">🎮</div>
                    <h4 className="font-bold text-sm">AI Wins Ancient Game!</h4>
                    <p className="text-xs text-gray-600">AlphaGo masters Go, a board game that's been around for thousands of years!</p>
                  </div>
                </div>

                <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-red to-kids-purple"></div>

                {/* 2023 */}
                <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                  <div className="timeline-node w-4 h-4 bg-kids-purple rounded-full border-4 border-white shadow-lg"></div>
                  <div className="timeline-year text-2xl font-bold text-kids-purple mt-2">2023</div>
                  <div className="timeline-content bg-white p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="font-bold text-sm">AI That Chats & Translates!</h4>
                    <p className="text-xs text-gray-600">ChatGPT and similar AI can chat like friends and communicate in over 100 languages!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/50 rounded-lg border border-kids-blue/20">
            <p className="text-center text-sm">
              <strong>Amazing Journey!</strong> From getting its name to chatting with us — that's almost 70 years of incredible progress!
              <span className="font-bold text-kids-purple"> What do you think will happen next?</span> 🚀
            </p>
          </div>
        </GlassCard>
      </section>

      {/* What We Learned Summary */}
      <GlassCard variant="default" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🧠 What We Learned About AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-bold mb-2 text-kids-blue">AI helps computers learn like humans</h3>
            <p className="text-sm text-gray-600">Teaching machines to think smart and get better over time</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-bold mb-2 text-kids-green">It's already in our games, phones, and photos</h3>
            <p className="text-sm text-gray-600">From voice assistants to video recommendations</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold mb-2 text-kids-purple">It's super fast, super smart — and getting better!</h3>
            <p className="text-sm text-gray-600">AI superpowers are growing every day</p>
          </div>
        </div>

        <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
          <h4 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
            💭 Dream Big Question!
          </h4>
          <p className="text-lg font-medium">
            If you could build your own AI helper, what would it help you do?
            <span className="text-kids-blue"> Would it help with homework, create amazing art, or maybe even help save the planet?</span>
          </p>
          <p className="text-sm text-gray-600 mt-2 italic">
            Think about it as you try the activities below! 🌟
          </p>
        </div>
      </GlassCard>

    </div>,
    activities: [{
      id: "ai-detective",
      title: "AI Detective Game",
      description: "Identify AI in everyday objects and applications",
      path: "/activities/ai-detective",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "10-15 min"
    }, {
      id: "draw-ai-friend",
      title: "Draw Your AI Friend",
      description: "Imagine and draw your own AI helper",
      path: "/activities/draw-ai-friend",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "15-20 min"
    }],
    nextLesson: "machine-learning-basics",
    previousLesson: null
  },
  "machine-learning-basics": {
    id: "machine-learning-basics",
    title: "Machine Learning Basics",
    description: "Discover how machines learn from data",
    videoId: "QghjaS0WQQU",
    duration: "25 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Assuming Zap, Brain, Sparkles are imported from a library like 'lucide-react' or defined elsewhere */}
      {/* For the purpose of this output, they are treated as available components */}
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="blue" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">🧠</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-blue/10 text-kids-blue px-4 py-1 rounded-full text-sm font-bold w-fit">
              Core Concept
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              What is Machine Learning?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Machine Learning is how computers learn from examples instead of being told exactly what to do.
              It's like how you learn to recognize dogs after seeing many different dogs, rather than someone
              explaining all the rules about what makes a dog a dog.
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-blue">💡 The Secret Ingredient:</h4>
              <p className="text-sm text-gray-700">
                Machine learning is the secret ingredient that makes AI work! It powers everything from voice assistants to game characters.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* How ML Powers AI - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-kids-purple" />
          How Machine Learning Powers AI
        </h2>

        <GlassCard variant="blue" className="p-8 md:p-12">
          <p className="text-lg mb-8 text-center text-gray-700">
            Remember all those amazing AI examples? Machine learning is what makes them all work!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-blue mb-3 flex items-center gap-2">
                🗣️ Voice Assistants (Siri, Alexa)
              </h4>
              <p className="text-sm mb-2">
                <strong>The AI:</strong> Understands what you say and responds helpfully
              </p>
              <p className="text-sm text-gray-600">
                <strong>The ML Behind It:</strong> Trained on millions of voice recordings to recognize speech patterns
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-purple mb-3 flex items-center gap-2">
                📸 Photo Recognition
              </h4>
              <p className="text-sm mb-2">
                <strong>The AI:</strong> Automatically tags faces and suggests who people are
              </p>
              <p className="text-sm text-gray-600">
                <strong>The ML Behind It:</strong> Learned from billions of labeled photos to recognize faces
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-green mb-3 flex items-center gap-2">
                🎵 Music Recommendations
              </h4>
              <p className="text-sm mb-2">
                <strong>The AI:</strong> Suggests new songs you'll probably love
              </p>
              <p className="text-sm text-gray-600">
                <strong>The ML Behind It:</strong> Analyzes your listening history and finds patterns
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-red mb-3 flex items-center gap-2">
                🎮 Smart Game Characters
              </h4>
              <p className="text-sm mb-2">
                <strong>The AI:</strong> Game characters that get better the more you play
              </p>
              <p className="text-sm text-gray-600">
                <strong>The ML Behind It:</strong> Learns from thousands of games to understand winning strategies
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-kids-yellow/20 rounded-xl border border-kids-yellow/30">
            <p className="text-center font-medium text-lg">
              💡 <strong>Key Insight:</strong> Machine Learning is like the "brain training" that gives AI systems their intelligence!
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Types of Learning - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-green" />
          Types of Learning
        </h2>
        <p className="text-lg mb-8 text-center text-gray-700">
          There are different ways machines can learn — with help, or all by themselves!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard variant="blue" className="overflow-hidden p-0">
            <div className="p-8 space-y-4">
              <h3 className="font-bold text-2xl text-kids-blue flex items-center gap-2">
                👨‍🏫 Supervised Learning
              </h3>
              <p className="text-sm italic text-kids-blue/70">Like learning with a teacher</p>
              <p className="text-gray-700 leading-relaxed">
                We give the computer examples with the correct answers. It's like flashcards where
                a teacher shows you the right answers so you can learn.
              </p>
              <div className="bg-kids-blue/10 p-4 rounded-xl border border-kids-blue/20">
                <p className="text-sm font-medium">
                  <strong>Real Example:</strong> Showing thousands of photos labeled "cat" or "dog" so the computer learns to tell them apart.
                </p>
              </div>
            </div>
            <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <div className="text-6xl">📚</div>
            </div>
          </GlassCard>

          <GlassCard variant="purple" className="overflow-hidden p-0">
            <div className="p-8 space-y-4">
              <h3 className="font-bold text-2xl text-kids-purple flex items-center gap-2">
                🔍 Unsupervised Learning
              </h3>
              <p className="text-sm italic text-kids-purple/70">Learning by finding patterns</p>
              <p className="text-gray-700 leading-relaxed">
                We give the computer examples without answers. It finds patterns on its own.
                Like sorting toys by color without being told how.
              </p>
              <div className="bg-kids-purple/10 p-4 rounded-xl border border-kids-purple/20">
                <p className="text-sm font-medium">
                  <strong>Real Example:</strong> Giving customer shopping data and discovering different types of shoppers.
                </p>
              </div>
            </div>
            <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-6xl">🧩</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ML in Action - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-orange" />
          Machine Learning in Action!
        </h2>

        <GlassCard variant="orange" className="p-8 md:p-12">
          <p className="text-lg mb-8 text-center text-gray-700">
            Machine learning is working behind the scenes in so many places. Here are some you might recognize!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-6 rounded-xl shadow-md border border-kids-blue/20">
              <h4 className="font-bold text-lg text-kids-blue mb-3 flex items-center gap-2">
                📱 Your Phone's Camera
              </h4>
              <p className="text-sm text-gray-700">
                When your phone automatically focuses on faces — that's machine learning recognizing where people are in the photo!
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl shadow-md border border-kids-green/20">
              <h4 className="font-bold text-lg text-kids-green mb-3 flex items-center gap-2">
                🛒 Online Shopping
              </h4>
              <p className="text-sm text-gray-700">
                "People who bought this also bought..." comes from ML finding patterns in what customers like to buy together.
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl shadow-md border border-kids-purple/20">
              <h4 className="font-bold text-lg text-kids-purple mb-3 flex items-center gap-2">
                🎮 Video Games
              </h4>
              <p className="text-sm text-gray-700">
                Some video game characters get better the more you play — that's machine learning helping them adapt!
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl shadow-md border border-kids-red/20">
              <h4 className="font-bold text-lg text-kids-red mb-3 flex items-center gap-2">
                🌍 Language Translation
              </h4>
              <p className="text-sm text-gray-700">
                Google Translate uses machine learning to understand different languages and translate between them instantly!
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* MachineLearningSteps Component */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-4xl">🔬</span>
          The Learning Process
        </h2>
        <MachineLearningSteps />
      </section>

      {/* Amazing Facts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-4xl">🤯</span>
          Amazing ML Facts!
        </h2>

        <GlassCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-blue mb-3 flex items-center gap-2">
                🧠 Super Speed Learning
              </h4>
              <p className="text-sm text-gray-700">
                A machine learning system can "read" and learn from 1 million books in the time it takes you to read one page!
                That's like having a super-powered brain! 🚀
              </p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-green mb-3 flex items-center gap-2">
                🎨 Creative Machines
              </h4>
              <p className="text-sm text-gray-700">
                AI has learned to paint pictures, compose music, and even write stories! Some AI-created art has sold for thousands of dollars! 🎭
              </p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-purple mb-3 flex items-center gap-2">
                🐕 Animal Expert
              </h4>
              <p className="text-sm text-gray-700">
                There's an AI that can identify over 300 different dog breeds just by looking at a photo — even better than most veterinarians! 🐶
              </p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-kids-red mb-3 flex items-center gap-2">
                🌟 Pattern Master
              </h4>
              <p className="text-sm text-gray-700">
                Machine learning can find patterns in data that humans would never notice, like predicting which songs will become popular! 🎵
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Summary */}
      <GlassCard variant="default" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🎯 What We Learned About Machine Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="font-bold mb-2 text-kids-blue">Machines learn from examples</h3>
            <p className="text-sm text-gray-600">Just like humans, but much faster!</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold mb-2 text-kids-purple">Powers all AI systems</h3>
            <p className="text-sm text-gray-600">From voice assistants to game characters</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold mb-2 text-kids-green">Gets better with practice</h3>
            <p className="text-sm text-gray-600">More data means smarter AI!</p>
          </div>
        </div>

        <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
          <h4 className="text-xl font-bold mb-3">
            🎯 Coming Up Next: Hands-On Fun!
          </h4>
          <p className="text-lg">
            In the activity section, you'll get to train a simple AI to recognize drawings.
            You'll draw shapes, and teach the computer what each shape is! It's like being an AI teacher!
            <span className="font-bold text-kids-blue"> Ready to become an AI trainer?</span> 🚀
          </p>
        </div>
      </GlassCard>

    </div>,
    activities: [{
      id: "train-drawing-recognizer",
      title: "Train Your Drawing Recognizer",
      description: "Teach an AI to recognize your drawings",
      path: "/activities/train-drawing-recognizer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "15-20 min"
    }, {
      id: "guess-who-ai-edition",
      title: "Guess Who: AI Edition",
      description: "Play a pattern recognition game",
      path: "/activities/guess-who-ai-edition",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "10-15 min"
    }],
    nextLesson: "data-and-patterns",
    previousLesson: "intro-to-ai"
  },
  "data-and-patterns": {
    id: "data-and-patterns",
    title: "Data and Patterns",
    description: "Explore how AI finds patterns in data",
    videoId: "tJxcVo9T8sM",
    duration: "30 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="green" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">📊</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-green/10 text-kids-green px-4 py-1 rounded-full text-sm font-bold w-fit">
              Essential Knowledge
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              What is Data?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Data is the information computers use to learn. It's like the ingredients in a recipe — without data, the AI has nothing to work with!
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-green">💡 The Foundation:</h4>
              <p className="text-sm text-gray-700">
                AI needs data to spot patterns, make decisions, and improve. The more data it has, the smarter it can get!
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Types of Data */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-blue" />
          Types of Data AI Uses
        </h2>
        <p className="text-lg mb-8 text-center text-gray-700">
          Data can be many different things! Let's explore the main types that AI loves to learn from:
        </p>

        <GlassCard variant="blue" className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-6 rounded-xl border border-white/50">
              <div className="text-4xl mb-4 text-center">🖼️</div>
              <h4 className="font-bold text-lg text-kids-blue mb-2 text-center">
                Pictures
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Like cat photos, drawings, or screenshots that AI can analyze to find objects, people, or animals!
              </p>
            </div>

            <div className="bg-white/50 p-6 rounded-xl border border-white/50">
              <div className="text-4xl mb-4 text-center">🔤</div>
              <h4 className="font-bold text-lg text-kids-green mb-2 text-center">
                Text
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Words and sentences from books, websites, or chats that AI can read and understand!
              </p>
            </div>

            <div className="bg-white/50 p-6 rounded-xl border border-white/50">
              <div className="text-4xl mb-4 text-center">🔢</div>
              <h4 className="font-bold text-lg text-kids-purple mb-2 text-center">
                Numbers
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Scores, temperatures, prices, and measurements that AI can calculate and find patterns in!
              </p>
            </div>

            <div className="bg-white/50 p-6 rounded-xl border border-white/50">
              <div className="text-4xl mb-4 text-center">🔊</div>
              <h4 className="font-bold text-lg text-kids-red mb-2 text-center">
                Sounds
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Songs, voices, or animal noises that AI can listen to and recognize!
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl border border-white/10 md:col-span-2">
              <div className="text-4xl mb-4 text-center">🎬</div>
              <h4 className="font-bold text-lg text-kids-yellow mb-2 text-center">
                Videos
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Moving pictures with sound that combine images and audio for AI to analyze!
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* What are Patterns - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-yellow" />
          What are Patterns?
        </h2>
        <p className="text-lg mb-8 text-center text-gray-700">
          Patterns are things that repeat or follow a rule. Humans are great at noticing patterns!
        </p>

        <GlassCard variant="yellow" className="p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 text-center">🎯 Fun Pattern Examples!</h3>
          <p className="text-lg mb-8 text-center text-gray-700">
            Let's look at some patterns you might recognize from everyday life:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 p-6 rounded-xl shadow-md border border-kids-blue/20">
              <h4 className="font-bold text-lg text-kids-blue mb-4 flex items-center gap-2">
                🔢 Number Pattern
              </h4>
              <div className="bg-gray-100 p-4 rounded text-2xl font-mono">
                2, 4, 6, 8, ...
              </div>
              <p className="text-sm text-gray-700 text-center">
                Each number goes up by 2. That's the pattern!
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl shadow-md border border-kids-green/20">
              <h4 className="font-bold text-lg text-kids-green mb-4 flex items-center gap-2">
                🔷 Shape Pattern
              </h4>
              <div className="bg-gray-100 p-4 rounded text-2xl">
                🔴 🔵 🟢 🔴 🔵 🟢 ...
              </div>
              <p className="text-sm text-gray-700 text-center">
                The colors repeat: red, blue, green.
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-xl shadow-md border border-kids-purple/20">
              <h4 className="font-bold text-lg text-kids-purple mb-4 flex items-center gap-2">
                🎶 Sound Pattern
              </h4>
              <div className="bg-gray-100 p-4 rounded text-xl">
                👏 👆 👏 👆 ...
              </div>
              <p className="text-sm text-gray-700 text-center">
                Clap, snap, clap, snap... A rhythm you can feel!
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* How AI Finds Patterns */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-kids-purple" />
          How AI Finds Patterns
        </h2>
        <p className="text-lg mb-8 text-center text-gray-700">
          Just like you, AI can learn to find patterns. But instead of using eyes or ears, it uses data!
        </p>

        <div className="space-y-8">
          <GlassCard variant="blue" className="p-8 border-l-4 border-kids-blue">
            <h3 className="font-bold text-2xl text-kids-blue mb-4 flex items-center gap-2">
              🌤️ Weather Prediction
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              AI looks at weather data — like temperature and clouds — from past days and learns how the weather changes.
            </p>
            <p className="mb-6 text-sm text-gray-600 italic">
              If it rains every time the air pressure drops, AI learns to expect rain next time the pressure drops!
            </p>

            <div className="bg-white/85 p-6 rounded-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-kids-blue text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Day</th>
                      <th className="py-3 px-6 text-left">Weather</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-6">Mon</td>
                      <td className="py-3 px-6">☀️ Sunny</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Tue</td>
                      <td className="py-3 px-6">☀️ Sunny</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Wed</td>
                      <td className="py-3 px-6">⛅ Cloudy</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Thu</td>
                      <td className="py-3 px-6">🌧️ Rainy</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Fri</td>
                      <td className="py-3 px-6">⛅ Cloudy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-center text-sm font-medium text-kids-blue">
                Now the AI can guess what the weather might be on Saturday! 🤔
              </p>
            </div>
          </GlassCard>

          <GlassCard variant="green" className="p-8 border-l-4 border-kids-green">
            <h3 className="font-bold text-2xl text-kids-green mb-4 flex items-center gap-2">
              🗣️ Language Patterns
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              When you type or talk, AI can guess what word comes next based on language patterns.
            </p>
            <p className="mb-6 text-sm text-gray-600 italic">
              "The cat is ___" → 🧠 AI might guess "sleeping" or "playing" based on similar sentences it has seen before.
            </p>

            <div className="bg-white/85 p-6 rounded-xl">
              <h4 className="font-bold mb-4">Examples:</h4>
              <div className="space-y-3">
                <div className="bg-white/85 p-4 rounded border border-white/10">
                  <p>"I'm going to the..." → <span className="font-bold text-kids-green">"store," "park," or "movies"</span></p>
                </div>
                <div className="bg-white/85 p-4 rounded border border-white/10">
                  <p>"She is very..." → <span className="font-bold text-kids-green">"kind," "smart," or "funny"</span></p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm font-medium text-kids-green">
                That's how autocomplete and spellcheck work! ✨
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Practice Section */}
      <GlassCard variant="red" className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          🧩 Let's Practice! — Find the Pattern
        </h3>
        <p className="text-lg mb-8 text-center text-gray-700">
          Can you guess what comes next? Click to reveal the answers!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-6 rounded-xl border border-kids-blue/20">
            <h4 className="font-bold text-lg mb-4">Pattern 1:</h4>
            <div className="bg-gray-100 p-4 rounded text-center font-mono text-2xl mb-4">
              1, 3, 5, 7, __
            </div>
            <p className="text-sm text-gray-600 mb-4 italic text-center">
              (Hint: Add 2 each time)
            </p>
            <div className="bg-kids-blue/10 p-3 rounded text-center">
              <span className="font-bold">➡️ Answer: 9</span>
            </div>
          </div>

          <div className="bg-white/90 p-6 rounded-xl border border-kids-green/20">
            <h4 className="font-bold text-lg mb-4">Pattern 2:</h4>
            <div className="bg-gray-100 p-4 rounded text-center font-mono text-2xl mb-4">
              2, 4, 8, 16, __
            </div>
            <p className="text-sm text-gray-600 mb-4 italic text-center">
              (Hint: Each number is doubled)
            </p>
            <div className="bg-kids-green/10 p-3 rounded text-center">
              <span className="font-bold">➡️ Answer: 32</span>
            </div>
          </div>

          <div className="bg-white/90 p-6 rounded-xl border border-kids-purple/20">
            <h4 className="font-bold text-lg mb-4">Pattern 3:</h4>
            <div className="bg-gray-100 p-4 rounded text-center text-2xl mb-4">
              🟠 🟢 🟠 🟢 🟠 __
            </div>
            <p className="text-sm text-gray-600 mb-4 italic text-center">
              (Hint: Colors are repeating)
            </p>
            <div className="bg-kids-purple/10 p-3 rounded text-center">
              <span className="font-bold">➡️ Answer: 🟢</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Summary */}
      <GlassCard variant="default" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          💡 Why This Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-bold mb-2 text-kids-blue">AI is like a smart helper</h3>
            <p className="text-sm text-gray-600">We learned AI can help us in many ways</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="font-bold mb-2 text-kids-green">Machine Learning helps AI get better</h3>
            <p className="text-sm text-gray-600">By studying data and finding patterns</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="font-bold mb-2 text-kids-purple">Data holds patterns!</h3>
            <p className="text-sm text-gray-600">And AI learns from those patterns</p>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-xl border border-white/20 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-white/90 pointer-events-none" />
          <h4 className="text-xl font-bold mb-4 text-center relative z-10">
            🎯 That's how AI:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="text-center bg-white/30 p-4 rounded-lg border border-white/20">
              <div className="text-3xl mb-2">🛍️</div>
              <p className="font-medium">Recommends what to buy</p>
            </div>
            <div className="text-center bg-white/30 p-4 rounded-lg border border-white/20">
              <div className="text-3xl mb-2">🌦️</div>
              <p className="font-medium">Predicts the weather</p>
            </div>
            <div className="text-center bg-white/30 p-4 rounded-lg border border-white/20">
              <div className="text-3xl mb-2">📚</div>
              <p className="font-medium">Suggests the next word you're typing</p>
            </div>
          </div>
          <p className="text-center mt-6 font-bold text-kids-blue text-lg relative z-10">
            The better the pattern, the better the prediction! ✨
          </p>
        </div>
      </GlassCard>

      {/* Challenge */}
      <div className="bg-gradient-to-r from-kids-yellow/10 to-kids-orange/10 border-2 border-kids-yellow/30 p-8 rounded-xl backdrop-blur-md">
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
          🌟 Challenge!
        </h3>
        <div className="bg-white/90 p-6 rounded-xl border border-white/30">
          <p className="text-lg mb-4">
            <strong>Look around you today.</strong>
          </p>
          <p className="text-lg mb-4">
            Can you find <span className="font-bold text-kids-purple">3 patterns</span> in your home, on your phone, or in nature?
          </p>
          <p className="text-lg">
            Take a photo or draw them — you're already thinking like an AI! 🤖✨
          </p>
        </div>
      </div>

    </div>,
    activities: [{
      id: "pattern-detective",
      title: "Pattern Detective",
      description: "Find and create patterns in different types of data",
      path: "/activities/pattern-detective",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "12-18 min"
    }, {
      id: "weather-predictor",
      title: "Weather Predictor",
      description: "Try predicting weather patterns with data",
      path: "/activities/weather-predictor",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "15-20 min"
    }],
    nextLesson: "image-recognition",
    previousLesson: "machine-learning-basics"
  },
  "image-recognition": {
    id: "image-recognition",
    title: "Image Recognition",
    description: "How AI sees and recognizes images",
    videoId: "Cgxsv1riJhI",
    duration: "25 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="blue" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">📷</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-blue/10 text-kids-blue px-4 py-1 rounded-full text-sm font-bold w-fit">
              Visual AI
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              How Computers See Images
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Did you know that computers don't see images like we do? When we look at a picture, we instantly recognize objects, people, and animals. But computers see images as grids of numbers!
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-blue">🖼️ A Digital Image Is:</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>A grid of tiny squares called <strong>pixels</strong></li>
                <li>Each pixel has a color represented by numbers</li>
                <li>A 1000×1000 pixel image has 1,000,000 pixels!</li>
              </ul>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* How We See vs How AI Sees */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-purple" />
          Human Vision vs AI Vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard variant="purple" className="p-8">
            <h3 className="font-bold text-2xl text-kids-purple mb-4">👁️ How We See</h3>
            <p className="mb-4 text-gray-700">Our brains can instantly:</p>
            <ul className="space-y-3">
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">✓ Recognize a cat is a cat, no matter the angle</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">✓ Tell the difference between different cats</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">✓ Know it's still a cat even if part is hidden</p>
              </div>
            </ul>
          </GlassCard>

          <GlassCard variant="green" className="p-8">
            <h3 className="font-bold text-2xl text-kids-green mb-4">🤖 How AI Sees</h3>
            <p className="mb-4 text-gray-700">AI needs to be trained with many examples to:</p>
            <ul className="space-y-3">
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">⚙️ Learn what features make a cat a cat</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">⚙️ Find patterns in the numbers that represent images</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="font-medium">⚙️ Recognize those patterns in new images</p>
              </div>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* How Image Recognition Works */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-kids-blue" />
          How Image Recognition Works
        </h2>

        <div className="space-y-6">
          <GlassCard variant="blue" className="p-8 border-l-4 border-kids-blue">
            <h3 className="font-bold text-2xl text-kids-blue mb-4">Step 1: Training</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              AI is shown thousands of images labeled "cat," "dog," "bird," etc. It learns the patterns that identify each object.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <p className="font-medium">"This is a cat" → AI remembers: pointy ears, whiskers, certain shapes</p>
            </div>
          </GlassCard>

          <GlassCard variant="purple" className="p-8 border-l-4 border-kids-purple">
            <h3 className="font-bold text-2xl text-kids-purple mb-4">Step 2: Feature Detection</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              When shown a new image, AI looks for familiar features it learned during training.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <p className="font-medium">"I see pointy ears, whiskers, and a tail - these are features of a cat!"</p>
            </div>
          </GlassCard>

          <GlassCard variant="green" className="p-8 border-l-4 border-kids-green">
            <h3 className="font-bold text-2xl text-kids-green mb-4">Step 3: Classification</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The AI makes its best guess about what's in the image based on the features it detected.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <p className="font-medium">"I'm 95% confident this is a cat, 4% it's a small dog, 1% it's something else"</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Cool Uses */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-red" />
          Cool Uses of Image Recognition
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard variant="red" className="p-8">
            <h3 className="font-bold text-xl text-kids-red mb-3">👤 Face Recognition</h3>
            <p className="text-gray-700">
              AI can recognize people's faces in photos and videos, like how your phone might unlock when it sees your face!
            </p>
          </GlassCard>

          <GlassCard variant="blue" className="p-8">
            <h3 className="font-bold text-xl text-kids-blue mb-3">🏥 Medical Imaging</h3>
            <p className="text-gray-700">
              Doctors use AI to help find things in X-rays and scans that might be hard to see with just human eyes.
            </p>
          </GlassCard>

          <GlassCard variant="green" className="p-8">
            <h3 className="font-bold text-xl text-kids-green mb-3">🚗 Self-Driving Cars</h3>
            <p className="text-gray-700">
              Cars with AI use cameras to recognize stop signs, traffic lights, pedestrians, and other cars on the road.
            </p>
          </GlassCard>

          <GlassCard variant="yellow" className="p-8">
            <h3 className="font-bold text-xl text-kids-yellow mb-3">📱 Augmented Reality</h3>
            <p className="text-gray-700">
              Apps that put fun filters on your face are using image recognition to find your facial features!
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Summary */}
      <GlassCard variant="default" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🎯 What We Learned
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="font-bold mb-2 text-kids-blue">Computers see numbers</h3>
            <p className="text-sm text-gray-600">Images are grids of pixels with color values</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="font-bold mb-2 text-kids-purple">AI learns from examples</h3>
            <p className="text-sm text-gray-600">Training with thousands of labeled images</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold mb-2 text-kids-green">Used everywhere!</h3>
            <p className="text-sm text-gray-600">From face unlock to self-driving cars</p>
          </div>
        </div>

        <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
          <h4 className="text-xl font-bold mb-3">
            🤯 Fun Fact!
          </h4>
          <p className="text-lg">
            Image recognition AI has gotten so good that some can identify thousands of different dog breeds with better accuracy than most humans! But AI still gets confused by things that would be obvious to us, like a picture of a cat wearing a dog costume.
          </p>
        </div>
      </GlassCard>

    </div>,
    activities: [{
      id: "build-image-classifier",
      title: "Build Your Image Classifier",
      description: "Train a simple AI to recognize different objects",
      path: "/activities/build-image-classifier",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "20-25 min"
    }, {
      id: "emoji-detector",
      title: "Emoji Detector Challenge",
      description: "Can you trick the AI with your drawings?",
      path: "/activities/emoji-detector",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "10-15 min"
    }],
    nextLesson: "simple-algorithms",
    previousLesson: "data-and-patterns"
  },
  "simple-algorithms": {
    id: "simple-algorithms",
    title: "Simple Algorithms",
    description: "Learn about the building blocks of AI",
    videoId: "6hfOvs8pY1k",
    duration: "30 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      <GlassCard className="overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
            <div className="inline-block bg-kids-green/10 text-kids-green px-4 py-1 rounded-full text-sm font-bold w-fit">
              Building Blocks
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              What Is an Algorithm?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              An algorithm is a set of step-by-step instructions that tell a computer how to solve a problem or complete a task. Think of it like a recipe for a computer to follow!
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50">
              <h4 className="font-bold mb-2 text-kids-green">🍪 Algorithms in Everyday Life:</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Following a recipe to bake cookies</li>
                <li>Instructions for building a LEGO set</li>
                <li>Directions to get from home to school</li>
                <li>Rules for playing a board game</li>
              </ul>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-9xl">📋</div>
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        </div>
      </GlassCard>

      {/* Sorting Algorithms - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-blue" />
          Simple Algorithms for Computers
        </h2>

        <GlassCard className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="inline-block bg-kids-blue/10 text-kids-blue px-4 py-1 rounded-full text-sm font-bold w-fit">
                Organizing Data
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Sorting Algorithms</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                These help computers put things in order (like numbers from smallest to largest, or names in alphabetical order).
              </p>
              <div className="bg-white/50 p-4 rounded-xl border border-white/50">
                <h4 className="font-bold mb-3 text-kids-blue">🔢 Example:</h4>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="font-mono text-sm mb-2">Unsorted: 5, 2, 9, 1, 7</p>
                  <p className="font-mono text-sm font-bold text-kids-blue">Sorted: 1, 2, 5, 7, 9</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="text-9xl">🔢</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Search Algorithms - Split Screen */}
      <section>
        <GlassCard className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center order-2 lg:order-1">
              <div className="text-9xl">🔍</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-block bg-kids-purple/10 text-kids-purple px-4 py-1 rounded-full text-sm font-bold w-fit">
                Finding Information
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Search Algorithms</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                These help computers find specific items in a list or database (like finding a specific contact in your phone).
              </p>
              <div className="bg-white/50 p-4 rounded-xl border border-white/50">
                <h4 className="font-bold mb-3 text-kids-purple">🍎 Example:</h4>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="font-mono text-sm mb-2">Find "apple" in fruits list</p>
                  <p className="font-mono text-sm font-bold text-kids-purple">Found at position 3!</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Decision Making - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-green" />
          Decision Making in Algorithms
        </h2>

        <GlassCard className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="inline-block bg-kids-green/10 text-kids-green px-4 py-1 rounded-full text-sm font-bold w-fit">
                If-Then Logic
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Making Choices</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Algorithms often need to make decisions based on different conditions. We use special statements called "if-then" to help them decide what to do next.
              </p>
              <div className="bg-white/50 p-4 rounded-xl border border-white/50">
                <h4 className="font-bold mb-3 text-kids-green">☔ If-Then Example:</h4>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                  <p><span className="text-purple-600 font-bold">IF</span> it is raining <span className="text-purple-600 font-bold">THEN</span></p>
                  <p className="pl-4 my-1">Bring an umbrella</p>
                  <p><span className="text-purple-600 font-bold">ELSE</span></p>
                  <p className="pl-4 my-1">Wear sunglasses</p>
                  <p><span className="text-purple-600 font-bold">END IF</span></p>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
              <div className="text-9xl">🤔</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Loops - Split Screen */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-kids-yellow" />
          Loops in Algorithms
        </h2>

        <GlassCard className="overflow-hidden p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center order-2 lg:order-1">
              <div className="text-9xl">🔄</div>
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-block bg-kids-yellow/10 text-kids-yellow px-4 py-1 rounded-full text-sm font-bold w-fit">
                Repeat Actions
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Doing Things Over and Over</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sometimes we need algorithms to repeat steps multiple times. We use "loops" to do the same action over and over again until a condition is met.
              </p>
              <div className="bg-white/50 p-4 rounded-xl border border-white/50">
                <h4 className="font-bold mb-3 text-kids-yellow">⭐ Loop Example:</h4>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg">
                  <p><span className="text-purple-600 font-bold">REPEAT 5 TIMES</span></p>
                  <p className="pl-4 my-1">Draw a star</p>
                  <p><span className="text-purple-600 font-bold">END REPEAT</span></p>
                  <p className="mt-3 text-center text-gray-700">(This would draw 5 stars)</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Algorithms in AI */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-kids-blue" />
          Algorithms in AI
        </h2>
        <p className="text-lg mb-8 text-center text-gray-700">
          AI uses some very special and complex algorithms to learn from data and make decisions. Here are some basic types:
        </p>

        <div className="space-y-6">
          <GlassCard variant="blue" className="p-8 border-l-4 border-kids-blue">
            <h3 className="font-bold text-2xl text-kids-blue mb-3">📧 Classification Algorithms</h3>
            <p className="text-gray-700">
              These help AI decide which category something belongs to (like deciding if an email is spam or not).
            </p>
          </GlassCard>

          <GlassCard variant="purple" className="p-8 border-l-4 border-kids-purple">
            <h3 className="font-bold text-2xl text-kids-purple mb-3">🎬 Clustering Algorithms</h3>
            <p className="text-gray-700">
              These group similar things together (like grouping movies you might like based on what you've watched before).
            </p>
          </GlassCard>

          <GlassCard variant="green" className="p-8 border-l-4 border-kids-green">
            <h3 className="font-bold text-2xl text-kids-green mb-3">⭐ Recommendation Algorithms</h3>
            <p className="text-gray-700">
              These suggest things you might like based on your preferences (like YouTube suggesting videos).
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Summary */}
      <GlassCard variant="default" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🎯 What We Learned
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-bold mb-2 text-kids-green">Algorithms are instructions</h3>
            <p className="text-sm text-gray-600">Step-by-step guides for solving problems</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="font-bold mb-2 text-kids-blue">They use decisions and loops</h3>
            <p className="text-sm text-gray-600">If-then statements and repeating actions</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
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

    </div>,
    activities: [{
      id: "sorting-game",
      title: "Sorting Algorithm Game",
      description: "Play with different ways to sort objects",
      path: "/activities/sorting-game",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "12-18 min"
    }, {
      id: "create-algorithm",
      title: "Create Your Own Algorithm",
      description: "Write step-by-step instructions for a robot",
      path: "/activities/create-algorithm",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "15-25 min"
    }],
    nextLesson: "ai-ethics",
    previousLesson: "image-recognition"
  },
  "ai-ethics": {
    id: "ai-ethics",
    title: "AI Ethics for Kids",
    description: "Using AI responsibly and safely",
    videoId: "oVvYIUChDEg",
    duration: "25 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="purple" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">⚖️</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-purple/10 text-kids-purple px-4 py-1 rounded-full text-sm font-bold w-fit">
              Responsible AI
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              What Are AI Ethics?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AI Ethics means thinking about what's right and wrong when we create and use artificial intelligence. Just like we have rules for how people should treat each other, we need rules for how we create and use AI.
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-purple">⚖️ Why AI Ethics Matter:</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>AI affects many people's lives</li>
                <li>AI should be fair to everyone</li>
                <li>AI should be safe and not harm people</li>
                <li>We need to understand what AI is doing</li>
              </ul>
            </div>
          </div>
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
            <div className="mt-4 bg-white/50 p-4 rounded-xl">
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
            <div className="mt-4 bg-white/50 p-4 rounded-xl">
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
            <div className="mt-4 bg-white/50 p-4 rounded-xl">
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
            <div className="mt-4 bg-white/50 p-4 rounded-xl">
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
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-red mb-3">✓ Be Truthful</h4>
              <p className="text-gray-700">Don't use AI to spread false information</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-blue mb-3">✓ Be Kind</h4>
              <p className="text-gray-700">Don't use AI to be mean to others</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-green mb-3">✓ Be Careful</h4>
              <p className="text-gray-700">Think about the information you share with AI</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
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
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-blue mb-2">📚 AI that helps students learn</h4>
              <p className="text-gray-700">AI tutors that adapt to different learning styles</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-green mb-2">🏥 AI that helps doctors treat patients</h4>
              <p className="text-gray-700">AI that can detect diseases in medical images</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
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
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="font-bold mb-2 text-kids-purple">Ethics guide AI use</h3>
            <p className="text-sm text-gray-600">Rules for creating and using AI responsibly</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="font-bold mb-2 text-kids-blue">Key principles matter</h3>
            <p className="text-sm text-gray-600">Privacy, fairness, safety, and transparency</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
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

    </div>,
    activities: [{
      id: "ai-ethics-scenarios",
      title: "AI Ethics Scenarios",
      description: "Think through ethical dilemmas involving AI",
      path: "/activities/ai-ethics-scenarios",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "15-20 min"
    }, {
      id: "design-responsible-ai",
      title: "Design a Responsible AI",
      description: "Create your own AI with good ethical principles",
      path: "/activities/design-responsible-ai",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      difficulty: "Challenging" as const,
      estimatedTime: "20-30 min"
    }],
    nextLesson: "future-of-ai",
    previousLesson: "simple-algorithms"
  },
  "future-of-ai": {
    id: "future-of-ai",
    title: "The Future of AI",
    description: "What's next in the world of AI?",
    videoId: "aR5N2Jl8k14",
    duration: "20 minutes",
    content: <div className="max-w-5xl mx-auto space-y-12">
      {/* Intro Section - Split Screen */}
      {/* Intro Section */}
      <GlassCard variant="blue" className="p-8">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
            <div className="text-4xl">🚀</div>
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-kids-blue/10 text-kids-blue px-4 py-1 rounded-full text-sm font-bold w-fit">
              Looking Ahead
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              The Future of AI
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Artificial Intelligence is still growing and changing. Scientists and engineers are working on new AI technologies every day. Let's explore what AI might be like in the future!
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-white/50 mt-4">
              <h4 className="font-bold mb-2 text-kids-blue">🚀 Future AI Might Be Able To:</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Understand and communicate better than today's AI</li>
                <li>Help solve big problems like climate change and disease</li>
                <li>Create amazing art, music, and stories</li>
                <li>Make robots that can move and work like humans</li>
                <li>Teach in ways that perfectly match how you learn</li>
              </ul>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Future AI Technologies */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-kids-purple" />
          Future AI Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard variant="purple" className="p-8">
            <h3 className="font-bold text-2xl text-kids-purple mb-4">🤖 Smarter Robots</h3>
            <p className="text-gray-700 leading-relaxed">
              Future robots might be able to do more complex tasks, like helping around the house, assisting elderly people, or working in dangerous environments where humans can't go.
            </p>
          </GlassCard>

          <GlassCard variant="green" className="p-8">
            <h3 className="font-bold text-2xl text-kids-green mb-4">📚 AI Teachers</h3>
            <p className="text-gray-700 leading-relaxed">
              Imagine having an AI tutor that knows exactly how you learn best and can teach any subject in a way that makes sense to you, available whenever you have questions!
            </p>
          </GlassCard>

          <GlassCard variant="blue" className="p-8">
            <h3 className="font-bold text-2xl text-kids-blue mb-4">🏥 Medical Breakthroughs</h3>
            <p className="text-gray-700 leading-relaxed">
              AI could help doctors discover new medicines and treatments by analyzing huge amounts of medical information faster than any human could.
            </p>
          </GlassCard>

          <GlassCard variant="red" className="p-8">
            <h3 className="font-bold text-2xl text-kids-red mb-4">🏙️ Smart Cities</h3>
            <p className="text-gray-700 leading-relaxed">
              Cities might use AI to manage traffic, reduce pollution, save energy, and make life better and safer for the people who live there.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* How Can You Be Part */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-kids-yellow" />
          How Can You Be Part of AI's Future?
        </h2>

        <GlassCard variant="yellow" className="p-8 md:p-12">
          <h3 className="font-bold text-2xl text-kids-yellow mb-6 text-center">Learn and Explore</h3>
          <p className="text-lg mb-6 text-center text-gray-700">
            There are many ways you can prepare to be part of AI's exciting future:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-kids-blue mb-2">💻 Learn to code</h4>
              <p className="text-gray-700">Programming is the language AI speaks</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-kids-purple mb-2">🔢 Study math</h4>
              <p className="text-gray-700">Math is the foundation of AI</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-kids-green mb-2">🎨 Be creative</h4>
              <p className="text-gray-700">AI needs creative thinkers to solve problems</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-kids-red mb-2">🤔 Stay curious</h4>
              <p className="text-gray-700">Always ask questions and keep learning</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl border border-white/20 md:col-span-2">
              <h4 className="font-bold text-lg text-kids-purple mb-2">⚖️ Think ethically</h4>
              <p className="text-gray-700">Consider how technology affects people</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* AI Jobs of the Future */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-kids-purple" />
          AI Jobs of the Future
        </h2>

        <GlassCard variant="purple" className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-blue mb-3">🎓 AI Trainer</h4>
              <p className="text-gray-700">Teaching AI systems how to understand human behavior</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-green mb-3">🤖 Robot Designer</h4>
              <p className="text-gray-700">Creating helpful robots for homes and businesses</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-purple mb-3">⚖️ AI Ethics Expert</h4>
              <p className="text-gray-700">Making sure AI is fair and used responsibly</p>
            </div>
            <div className="bg-white/90 p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-lg text-kids-red mb-3">🎨 AI Artist</h4>
              <p className="text-gray-700">Working with AI to create new forms of art and entertainment</p>
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
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-bold mb-2 text-kids-blue">AI is still evolving</h3>
            <p className="text-sm text-gray-600">New technologies are being developed every day</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="font-bold mb-2 text-kids-purple">You can be part of it</h3>
            <p className="text-sm text-gray-600">Learn, explore, and stay curious</p>
          </div>
          <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/10">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-bold mb-2 text-kids-green">Exciting careers await</h3>
            <p className="text-sm text-gray-600">Many AI jobs haven't been invented yet!</p>
          </div>
        </div>

        <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
          <h4 className="text-xl font-bold mb-3">
            🤯 Fun Fact!
          </h4>
          <p className="text-lg">
            Many of the jobs that will exist when you grow up haven't even been invented yet! Just like people 30 years ago couldn't imagine jobs like "social media manager" or "app developer," there will be exciting new AI careers in your future!
          </p>
        </div>

        <div className="bg-gradient-to-r from-kids-blue/15 to-kids-purple/15 border-2 border-kids-blue/40 p-8 rounded-xl mt-8">
          <h4 className="text-2xl font-bold mb-4 text-center">
            🎓 Congratulations!
          </h4>
          <p className="text-lg text-center text-gray-700">
            You've completed all the AI lessons! You now understand the basics of artificial intelligence, how it works, and how it might shape our future. Keep learning, stay curious, and remember to use technology responsibly! 🌟
          </p>
        </div>
      </GlassCard>

    </div>,
    activities: [{
      id: "future-ai-invention",
      title: "Design a Future AI Invention",
      description: "Imagine and draw an AI device from the future",
      path: "/activities/future-ai-invention",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "15-20 min"
    }, {
      id: "ai-career-explorer",
      title: "AI Career Explorer",
      description: "Discover what AI job might be right for you",
      path: "/activities/ai-career-explorer",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "10-15 min"
    }],
    nextLesson: null,
    previousLesson: "ai-ethics"
  }
};

const LessonDetails: React.FC = () => {
  const {
    lessonId
  } = useParams<{
    lessonId: string;
  }>();
  const [progress, setProgress] = useState(0);
  const [lessonData, setLessonData] = useState<LessonContent | null>(null);

  useEffect(() => {
    if (lessonId && lessonsData[lessonId]) {
      setLessonData(lessonsData[lessonId]);
      // Simulate progress based on scroll position
      const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight) * 100;
        setProgress(scrollPercentage > 100 ? 100 : scrollPercentage);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lessonId]);

  if (!lessonData) {
    return (
      <LessonLayout title="Lesson Not Found" subtitle="We couldn't find the lesson you're looking for.">
        <div className="flex justify-center mt-8">
          <Link to="/lessons">
            <Button variant="default">Back to Lessons</Button>
          </Link>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title={lessonData.title}
      subtitle={lessonData.description}
      backLink="/lessons"
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 bg-gray-100 rounded-full h-2 overflow-hidden">
          <Progress value={progress} className="h-full" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Clock className="w-4 h-4" />
          <span>{lessonData.duration}</span>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer videoId={lessonData.videoId} title={lessonData.title} />
        </div>

        {/* Lesson Content */}
        <div className="prose max-w-none mb-10">
          {lessonData.content}
        </div>

        {/* Enhanced Activities Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-kids-yellow to-kids-orange rounded-xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
              Fun Activities
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            🎯 Ready to put your new knowledge to the test? Try these hands-on activities!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessonData.activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                difficulty={activity.difficulty}
                estimatedTime={activity.estimatedTime}
                path={activity.path}
              />
            ))}
          </div>

          {/* Encouragement Message */}
          <GlassCard className="mt-8 p-6 text-center bg-gradient-to-r from-kids-yellow/10 to-kids-orange/10 border-kids-yellow/30">
            <p className="text-lg font-medium">
              🌟 <strong>Great job learning!</strong> These activities will help you practice what you've discovered.
              Don't worry if it feels challenging at first - that's how learning works! 🚀
            </p>
          </GlassCard>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          {lessonData.previousLesson ? <Link to={`/lessons/${lessonData.previousLesson}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Previous Lesson
            </Button>
          </Link> : <div></div>}

          {lessonData.nextLesson ? <Link to={`/lessons/${lessonData.nextLesson}`}>
            <Button variant="default" className="flex items-center gap-2">
              Next Lesson
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link> : <Link to="/lessons">
            <Button variant="default" className="flex items-center gap-2">
              Complete Course
              <Award className="w-4 h-4" />
            </Button>
          </Link>}
        </div>
      </div>
    </LessonLayout>
  );
};

export default LessonDetails;
