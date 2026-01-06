import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Search, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  title: string;
  image: string;
  correctAnswer: boolean;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Smart Speaker",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    correctAnswer: true,
    explanation: "Yes! Smart speakers use AI to understand your voice, process what you say, and respond with helpful information or actions."
  },
  {
    id: 2,
    title: "Headphones",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    correctAnswer: false,
    explanation: "Most basic headphones don't use AI — they just play the sound that's sent to them. However, some advanced headphones do have AI for noise cancellation!"
  },
  {
    id: 3,
    title: "Smartphone Camera",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    correctAnswer: true,
    explanation: "Yes! Modern smartphone cameras use AI to recognize faces, adjust settings automatically, and even add fun filters to your photos!"
  },
  {
    id: 4,
    title: "Simple Alarm Clock",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    correctAnswer: false,
    explanation: "No, a simple alarm clock just tells time and makes noise at set times. It doesn't learn or make smart decisions like AI does."
  }
];

const AIDetectiveActivity = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <LessonLayout
        title="Great Detective Work!"
        subtitle={`You found ${score} out of ${questions.length} AI examples!`}
        backLink="/lessons/simple-algorithms"
        backLabel="Back to Lesson"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl mb-8 animate-bounce-gentle inline-block">🎉</div>
            <p className="text-2xl text-gray-700">
              You found <span className="font-bold text-kids-blue">{score}</span> out of <span className="font-bold">{questions.length}</span> AI examples!
            </p>
          </div>

          <GlassCard className="p-8 md:p-12 mb-8 bg-kids-glass-white">
            <div className="space-y-6 flex flex-col items-center">
              <p className="text-lg text-gray-600 mb-4 max-w-lg">
                {score === questions.length
                  ? "Wow! You're a Master AI Detective! Nothing gets past you."
                  : "Good job! Keep looking for patterns to spot AI in the real world."}
              </p>
              <GradientButton onClick={resetGame} variant="primary" size="large" className="w-full md:w-auto px-8">
                Play Again
              </GradientButton>
            </div>
          </GlassCard>
        </div>
      </LessonLayout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <LessonLayout
      title="AI Detective"
      subtitle="Can you spot the AI hidden in everyday objects?"
      backLink="/lessons/simple-algorithms"
      backLabel="Back to Lesson"
    >
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="mb-8 flex justify-center">
          <span className="bg-white/90 px-6 py-2 rounded-full text-sm font-bold text-kids-blue shadow-sm border-2 border-kids-blue/20">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <GlassCard className="p-6 md:p-10 max-w-4xl mx-auto bg-white/95 border border-kids-blue/20 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <div className="aspect-video max-w-2xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg border border-white/50 relative group">
              <img
                src={question.image}
                alt={question.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <h3 className="text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-3">
              {question.title}
            </h3>
            <p className="text-xl text-kids-blue font-medium mb-10 bg-kids-blue/5 py-3 px-6 rounded-xl inline-block border border-kids-blue/10">
              🤔 Does this use AI?
            </p>

            {!showExplanation ? (
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <GradientButton
                  onClick={() => handleAnswer(true)}
                  variant="primary"
                  size="large"
                  className="min-w-40 text-xl py-8 rounded-2xl"
                >
                  Yes, it does!
                </GradientButton>
                <GradientButton
                  onClick={() => handleAnswer(false)}
                  variant="secondary"
                  size="large"
                  className="min-w-40 text-xl py-8 rounded-2xl grayscale"
                >
                  No, looking simple
                </GradientButton>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                {/* Answer Result */}
                <div className="flex items-center justify-center space-x-4 bg-white/90 p-4 rounded-2xl inline-flex shadow-sm border-2 border-white/50">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle className="w-10 h-10 text-kids-green" />
                      <span className="text-2xl font-bold text-kids-green">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-10 h-10 text-kids-red" />
                      <span className="text-2xl font-bold text-kids-red">Not quite!</span>
                    </>
                  )}
                </div>

                {/* Explanation */}
                <div className="bg-kids-blue/10 p-8 rounded-2xl border-2 border-kids-blue/20 text-lg leading-relaxed text-left max-w-2xl mx-auto shadow-inner">
                  <div className="flex gap-3 mb-2">
                    <Lightbulb className="w-6 h-6 text-kids-yellow flex-shrink-0" />
                    <span className="font-bold text-kids-blue">The Detective says:</span>
                  </div>
                  <p className="text-gray-700 ml-9">{question.explanation}</p>
                </div>

                {/* Next Button */}
                <div className="pt-4">
                  <GradientButton
                    onClick={nextQuestion}
                    variant="primary"
                    size="large"
                    icon={ArrowRight}
                    className="text-lg px-12 py-4 shadow-xl hover:scale-105 transition-transform"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </GradientButton>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </LessonLayout>
  );
};

export default AIDetectiveActivity;
