import React, { useState } from 'react';
import { Target, Search, ExternalLink, Play, Sparkles } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const PatternDetective: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const challenges = [
    {
      title: "Number Pattern Detective",
      description: "Find the missing number in the sequence",
      sequence: [1, 3, 5, 7, "?"],
      answer: "9",
      options: ["8", "9", "10", "11"],
      explanation: "This pattern adds 2 each time! (1+2=3, 3+2=5, 5+2=7, 7+2=9)"
    },
    {
      title: "Double Pattern Hunter",
      description: "What number comes next?",
      sequence: [2, 4, 8, 16, "?"],
      answer: "32",
      options: ["24", "28", "32", "36"],
      explanation: "Each number is doubled! (2×2=4, 4×2=8, 8×2=16, 16×2=32)"
    },
    {
      title: "Color Pattern Master",
      description: "Complete the pattern",
      sequence: ["🟠", "🟢", "🟠", "🟢", "🟠", "?"],
      answer: "🟢",
      options: ["🟠", "🟢", "🔴", "🟦"],
      explanation: "Orange and green alternate! Green comes next."
    }
  ];

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (challengeIndex: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [challengeIndex]: answer }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  return (
    <LessonLayout
      title="Pattern Detective"
      subtitle="Train your brain to spot patterns like a real AI detective!"
      backLink="/lessons/data-and-patterns"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <NarratedBox
          text="Welcome to Pattern Detective training! Just like AI systems learn to recognize patterns in data, you'll practice spotting patterns in numbers, colors, and shapes. This skill is exactly what helps AI understand the world around us!"
          className="bg-gradient-to-r from-kids-purple/10 to-kids-blue/10 border-2 border-kids-purple/30 p-8 rounded-3xl shadow-xl relative overflow-hidden"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-blue/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
            🕵️ Mission Briefing
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Just like AI systems learn to recognize patterns in data, you'll practice spotting patterns in numbers, colors, and shapes.
          </p>

          <div className="bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple/40 transition-colors">
            <h3 className="font-bold mb-4 text-kids-blue flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5" />
              How This Connects to AI:
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-white/40 hover:border-kids-blue/30 transition-colors">
                <span className="text-2xl">📊</span>
                <span>AI looks for patterns in massive amounts of data</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-white/40 hover:border-kids-purple/30 transition-colors">
                <span className="text-2xl">🔮</span>
                <span>Pattern recognition helps AI make predictions</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-white/40 hover:border-kids-green/30 transition-colors">
                <span className="text-2xl">👁️</span>
                <span>Powers image recognition & language understanding</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-white/40 hover:border-kids-orange/30 transition-colors">
                <span className="text-2xl">🧠</span>
                <span>Every time you spot a pattern, you're thinking like an AI!</span>
              </li>
            </ul>
          </div>
        </NarratedBox>

        {/* Quick Pattern Challenges */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-kids-green">
            <Target className="w-8 h-8" />
            Let's Practice! Pattern Test
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge, index) => (
              <GlassCard key={index} className="shadow-lg border-2 border-kids-blue/20 bg-kids-glass-white flex flex-col">
                <CardHeader className="bg-gradient-to-r from-kids-blue/10 to-kids-purple/10 border-b border-kids-blue/10">
                  <CardTitle className="text-lg font-bold text-kids-blue">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <p className="mb-4 text-sm text-gray-600 font-medium">{challenge.description}</p>

                  <div className="flex items-center justify-center gap-2 text-2xl mb-6 bg-white/90 p-4 rounded-xl border-2 border-kids-blue/10 font-mono font-bold text-gray-800">
                    {challenge.sequence.map((item, i) => (
                      <span key={i} className="min-w-[40px] text-center">
                        {item}
                      </span>
                    ))}
                  </div>

                  {!showResults ? (
                    <div className="space-y-3 mt-auto">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wide text-center">Select Answer</p>
                      <div className="grid grid-cols-2 gap-3">
                        {challenge.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswer(index, option)}
                            className={`p-4 text-lg font-bold border-2 rounded-xl transition-all duration-200 shadow-sm ${userAnswers[index] === option
                              ? 'bg-kids-blue text-white border-kids-blue scale-105 shadow-md'
                              : 'bg-white hover:bg-blue-50 border-gray-100 text-gray-700 hover:border-blue-200'
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl mt-auto animate-fade-in ${userAnswers[index] === challenge.answer
                      ? 'bg-kids-green/10 border border-kids-green/20'
                      : 'bg-kids-red/10 border border-kids-red/20'
                      }`}>
                      <p className={`font-bold mb-1 text-lg flex items-center gap-2 ${userAnswers[index] === challenge.answer ? 'text-green-700' : 'text-red-700'}`}>
                        {userAnswers[index] === challenge.answer ? '✅ Correct!' : '❌ Not quite!'}
                      </p>
                      <div className="text-sm text-gray-800">
                        <span className="font-bold">Answer:</span> {challenge.answer}
                      </div>
                    </div>
                  )}
                </CardContent>
              </GlassCard>
            ))}
          </div>

          {!showResults ? (
            <div className="text-center">
              <Button
                onClick={checkAnswers}
                size="lg"
                className="px-10 py-6 text-xl rounded-full shadow-xl bg-kids-green hover:bg-green-600 hover:scale-105 transition-all"
              >
                Check My Answers!
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Button
                onClick={() => { setShowResults(false); setUserAnswers({}); }}
                size="lg"
                variant="outline"
                className="px-10 py-6 text-xl rounded-full border-2 border-kids-blue text-kids-blue hover:bg-blue-50"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* How to Be a Pattern Detective */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-kids-purple">
            <Search className="w-8 h-8" />
            How to Spot Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 border-2 border-kids-blue/10 hover:border-kids-blue transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-kids-blue/10 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform">👀</div>
                <h3 className="font-bold mb-2 text-xl text-kids-blue">Step 1: Look</h3>
                <p className="text-gray-600">Observe carefully. What shapes, colors, or numbers do you see?</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 border-2 border-kids-purple/10 hover:border-kids-purple transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-kids-purple/10 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform">🤔</div>
                <h3 className="font-bold mb-2 text-xl text-kids-purple">Step 2: Think</h3>
                <p className="text-gray-600">What is changing? What is repeating? Find the hidden rule!</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 border-2 border-kids-green/10 hover:border-kids-green transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-kids-green/10 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform">🔮</div>
                <h3 className="font-bold mb-2 text-xl text-kids-green">Step 3: Predict</h3>
                <p className="text-gray-600">Use the rule you found to guess what comes next!</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Online Pattern Games CTA */}
        <div>
          <GlassCard variant="green" className="p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-kids-green flex items-center justify-center md:justify-start gap-3">
                  <Play className="w-8 h-8 fill-current" />
                  Play Online Games
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ready to test your skills? Try "Shape Patterns" by ABCya. It starts easy and gets trickier!
                </p>
                <a
                  href="https://www.abcya.com/games/shape_patterns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-kids-green hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Play Shape Patterns <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </LessonLayout>
  );
};

export default PatternDetective;
