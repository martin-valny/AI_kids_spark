import React, { useState } from 'react';
import { Target, Play, ExternalLink, Cloud } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import NarratedBox from '@/components/NarratedBox';

const WeatherPredictor: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const challenges = [
    {
      title: "Temperature Trend Detective",
      description: "What will tomorrow's temperature be?",
      data: ["Monday: 70°F", "Tuesday: 72°F", "Wednesday: 74°F", "Thursday: ?"],
      answer: "76°F",
      options: ["73°F", "76°F", "80°F", "68°F"],
      explanation: "The temperature is rising by 2 degrees each day!"
    },
    {
      title: "Cloud Pattern Predictor",
      description: "What weather comes next?",
      data: ["☀️ Sunny", "⛅ Partly Cloudy", "☁️ Cloudy", "🌧️ ?"],
      answer: "🌧️ Rainy",
      options: ["☀️ Sunny", "🌧️ Rainy", "❄️ Snowy", "🌪️ Stormy"],
      explanation: "The clouds are getting thicker, leading to rain!"
    },
    {
      title: "Weekly Weather Cycle",
      description: "Complete the weather pattern",
      data: ["Week 1: Sunny → Rainy", "Week 2: Sunny → Rainy", "Week 3: Sunny → ?"],
      answer: "Rainy",
      options: ["Sunny", "Rainy", "Snowy", "Windy"],
      explanation: "The pattern shows it rains after sunny days each week!"
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
      title="Weather Predictor"
      subtitle="Learn how AI uses data patterns to predict the weather!"
      backLink="/lessons"
      backLabel="Back to Lessons"
    >
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Intro Narrated Box */}
        <NarratedBox
          text="Just like meteorologists and AI systems use weather data to make forecasts, you'll practice spotting patterns in temperature, clouds, and weather cycles."
          className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
          showText={false}
        >
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-kids-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-blue">
            🌤️ Welcome to Weather Predictor Training!
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Just like meteorologists and AI systems use weather data to make forecasts, you'll practice spotting patterns in temperature, clouds, and weather cycles.
          </p>

          <div className="bg-white/50 p-6 rounded-2xl border border-kids-blue/10 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold mb-3 text-kids-blue flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              How This Connects to AI:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>AI analyzes thousands of weather data points to make predictions</li>
              <li>Machine learning finds patterns in temperature, humidity, and wind</li>
              <li>Weather apps use AI to tell you if it will rain tomorrow</li>
            </ul>
          </div>
        </NarratedBox>

        {/* Quick Weather Challenges */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-kids-green" />
            Quick Weather Challenges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge, index) => (
              <GlassCard key={index} className="flex flex-col h-full p-0 overflow-hidden text-left">
                <div className="bg-gradient-to-r from-kids-blue/10 to-kids-green/10 p-4 border-b border-white/20">
                  <h3 className="font-bold text-kids-blue">{challenge.title}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="mb-4 text-sm text-gray-600">{challenge.description}</p>
                  <div className="space-y-2 mb-6">
                    {challenge.data.map((item, i) => (
                      <div key={i} className="text-sm bg-white/85 p-2 rounded text-center border-2 border-kids-blue/10">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {!showResults ? (
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Predict:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {challenge.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleAnswer(index, option)}
                              className={`p-3 text-sm border rounded-lg transition-all duration-200 ${userAnswers[index] === option
                                ? 'bg-kids-blue text-white border-kids-blue shadow-md transform scale-105'
                                : 'bg-white/90 hover:bg-kids-blue/10 border-white/30 hover:border-kids-blue/30'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`p-4 rounded-xl border-2 ${userAnswers[index] === challenge.answer
                        ? 'bg-kids-green/10 border-kids-green/20 text-green-800'
                        : 'bg-kids-red/10 border-kids-red/20 text-red-800'
                        }`}>
                        <p className="font-bold mb-1">
                          {userAnswers[index] === challenge.answer ? '✅ Correct!' : '❌ Not quite!'}
                        </p>
                        <p className="text-sm font-medium">Answer: {challenge.answer}</p>
                        <p className="text-xs mt-2 opacity-80">{challenge.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center">
            {!showResults ? (
              <Button
                onClick={checkAnswers}
                size="lg"
                className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-kids-blue to-kids-green border-none"
              >
                Check My Predictions!
              </Button>
            ) : (
              <Button
                onClick={() => { setShowResults(false); setUserAnswers({}); }}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>

        {/* Step-by-Step Guidance */}
        <GlassCard variant="default" className="p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            🎯 How to Be a Weather Predictor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-kids-blue/20 hover:shadow-lg transition-all hover:border-kids-blue/40">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold mb-2 text-kids-blue">Step 1: Collect Data</h3>
              <p className="text-sm text-gray-600">Look at past weather patterns and measurements</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-kids-purple/20 hover:shadow-lg transition-all hover:border-kids-purple/40">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-bold mb-2 text-kids-purple">Step 2: Analyze Trends</h3>
              <p className="text-sm text-gray-600">Find patterns in temperature, clouds, and rain</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-kids-green/20 hover:shadow-lg transition-all hover:border-kids-green/40">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="font-bold mb-2 text-kids-green">Step 3: Predict</h3>
              <p className="text-sm text-gray-600">Use the patterns to forecast tomorrow's weather!</p>
            </div>
          </div>
        </GlassCard>

        {/* Online Weather Game */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Play className="w-6 h-6 text-kids-green" />
            Fun Online Weather Game
          </h2>

          <GlassCard className="p-8 border-2 border-kids-green/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-kids-green">Weather Report Game</h3>
                <p className="text-gray-600">
                  Observe various weather conditions and select the appropriate weather report based on visual cues.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-kids-green/10 text-kids-green px-3 py-1 rounded-full text-xs font-bold">Ages 6-10</span>
                  <span className="bg-kids-blue/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Observation Skills</span>
                </div>
              </div>
              <div>
                <a
                  href="https://www.turtlediary.com/game/weather-report.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-kids-green text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Play Game
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Tips for Parents/Teachers */}
        <GlassCard variant="purple" className="p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-kids-purple">
            👨‍👩‍👧‍👦 Tips for Parents & Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 border-kids-orange/20 hover:border-kids-orange/40 transition-colors">
              <h4 className="font-bold mb-1 text-kids-orange">📝 Keep a Weather Journal</h4>
              <p className="text-sm text-gray-700">Have kids track daily weather and make predictions for tomorrow</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue/40 transition-colors">
              <h4 className="font-bold mb-1 text-kids-blue">☁️ Cloud Watching</h4>
              <p className="text-sm text-gray-700">Teach kids to identify cloud types and what weather they predict</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/40 transition-colors">
              <h4 className="font-bold mb-1 text-kids-purple">📊 Use Real Data</h4>
              <p className="text-sm text-gray-700">Check weather apps together and discuss how AI makes forecasts</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green/40 transition-colors">
              <h4 className="font-bold mb-1 text-kids-green">🌡️ Temperature Tracking</h4>
              <p className="text-sm text-gray-700">Graph weekly temperatures to see patterns and trends</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </LessonLayout>
  );
};

export default WeatherPredictor;
