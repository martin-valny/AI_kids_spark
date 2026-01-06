
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Award, CheckCircle, XCircle, RotateCcw, Palette, Brain, Eye, ExternalLink } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import NarratedBox from '@/components/NarratedBox';
import DrawingCanvas from '@/components/DrawingCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetectiveItem {
  id: string;
  name: string;
  image: string;
  usesAI: boolean;
  explanation: string;
}

const detectiveItems: DetectiveItem[] = [
  {
    id: 'smart-speaker',
    name: 'Smart Speaker',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400&q=80',
    usesAI: true,
    explanation: 'Smart speakers use AI to understand voice commands and respond to questions!'
  },
  {
    id: 'headphones',
    name: 'Regular Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    usesAI: false,
    explanation: 'Regular headphones just play audio - they don\'t use AI to learn or make decisions.'
  },
  {
    id: 'smartphone-camera',
    name: 'Smartphone Camera',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    usesAI: true,
    explanation: 'Smartphone cameras use AI to recognize faces, enhance photos, and add special effects!'
  },
  {
    id: 'alarm-clock',
    name: 'Simple Alarm Clock',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=400&q=80',
    usesAI: false,
    explanation: 'Simple alarm clocks just follow basic time instructions - no AI needed!'
  }
];

const ActivityDetails: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  console.log('ActivityDetails - activityId:', activityId);
  const [answers, setAnswers] = useState<{ [key: string]: boolean | null }>({});
  const [showResults, setShowResults] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const handleAnswer = (itemId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [itemId]: answer }));
  };

  const handleNext = () => {
    if (currentItem < detectiveItems.length - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetGame = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentItem(0);
  };

  const getScore = () => {
    let correct = 0;
    detectiveItems.forEach(item => {
      if (answers[item.id] === item.usesAI) {
        correct++;
      }
    });
    return correct;
  };







  // Check if this is a valid activity ID
  const validActivityIds = ['ai-detective']; // Kept minimal or empty
  if (!validActivityIds.includes(activityId || '')) {
    return (
      <LessonLayout
        title="Activity Not Found"
        subtitle="We couldn't find the activity you're looking for."
        backLink="/lessons"
        backLabel="Back to Lessons"
      >
        <div className="flex justify-center">
          <Link to="/lessons">
            <Button variant="default" size="lg">Back to Lessons</Button>
          </Link>
        </div>
      </LessonLayout>
    );
  }


  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / detectiveItems.length) * 100);

    return (
      <LessonLayout
        title="Great Detective Work!"
        subtitle="You've completed the AI Detective challenge!"
        backLink="/lessons/intro-to-ai"
        icon={Award}
        iconBgColor="bg-gradient-to-r from-kids-blue to-kids-purple"
      >
        <div className="max-w-4xl mx-auto">
          <NarratedBox
            text={`Congratulations! You scored ${score} out of ${detectiveItems.length} correct answers. That's ${percentage} percent! You're becoming a real AI detective!`}
            variant="green"
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-kids-green">
              🎉 Your Score: {score}/{detectiveItems.length} ({percentage}%)
            </h2>
            <p className="text-lg text-gray-700">
              {percentage >= 75 ? "Amazing work! You really understand which devices use AI!" :
                percentage >= 50 ? "Good job! You're getting the hang of spotting AI!" :
                  "Keep learning! AI can be tricky to spot sometimes."}
            </p>
          </NarratedBox>

          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-bold text-center">Let's Review the Answers:</h3>
            {detectiveItems.map((item) => {
              const userAnswer = answers[item.id];
              const isCorrect = userAnswer === item.usesAI;

              return (
                <NarratedBox
                  key={item.id}
                  text={item.explanation}
                  variant={isCorrect ? 'green' : 'red'}
                  className="p-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                        {item.name}
                        {isCorrect ?
                          <CheckCircle className="w-6 h-6 text-kids-green" /> :
                          <XCircle className="w-6 h-6 text-kids-red" />
                        }
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Correct Answer:</strong> {item.usesAI ? 'Yes, uses AI' : 'No, does not use AI'}
                      </p>
                      <p className="text-sm">{item.explanation}</p>
                    </div>
                  </div>
                </NarratedBox>
              );
            })}
          </div>

          <NarratedBox
            text="AI is all around us in many of our modern devices and apps! Voice assistants, smartphone cameras, video games, and recommendation apps all use AI. But simple devices like alarm clocks, regular headphones, or flashlights just follow basic instructions without learning or making smart decisions."
            variant="orange"
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🧠 What Did You Learn?
            </h3>
            <p className="text-lg mb-4">
              AI is all around us in many of our modern devices and apps! Some technologies that use AI include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/50 p-4 rounded-lg border border-white/20">
                <p>🗣️ Voice assistants (like Alexa, Siri, or Google Assistant)</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/20">
                <p>📱 Smartphone cameras with special features</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/20">
                <p>🎮 Video game characters that react to how you play</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/20">
                <p>🎵 Apps that recommend videos or songs you might like</p>
              </div>
            </div>
            <p className="text-gray-700">
              But not everything electronic uses AI! Simple devices like basic alarm clocks, regular headphones,
              or flashlights just follow simple instructions and don't "learn" or make decisions on their own.
            </p>
          </NarratedBox>

          <div className="flex justify-center gap-4">
            <Button onClick={resetGame} className="flex items-center gap-2" size="lg">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
            <Link to="/lessons/intro-to-ai">
              <Button variant="outline" size="lg">Back to Lesson</Button>
            </Link>
          </div>
        </div>
      </LessonLayout>
    );
  }

  const item = detectiveItems[currentItem];
  const hasAnswered = answers[item.id] !== undefined && answers[item.id] !== null;

  return (
    <LessonLayout
      title="AI Detective Game"
      subtitle="Identify AI in everyday objects and applications"
      backLink="/lessons/intro-to-ai"
      icon={Award}
      iconBgColor="bg-gradient-to-r from-kids-blue to-kids-purple"
    >
      <div className="max-w-4xl mx-auto">
        <NarratedBox
          text="Time to become an AI detective! In this activity, you'll spot AI in everyday things around you. Look at each picture, decide if it uses AI or not, and click Yes or No to see if you're right!"
          variant="yellow"
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🕵️ Time to become an AI detective!
          </h2>
          <p className="text-lg mb-4">
            In this activity, you'll spot AI in everyday things around you.
          </p>
          <div className="bg-white/50 p-4 rounded-lg border border-white/20">
            <h3 className="font-bold mb-2">How to Play:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Look at the pictures of different objects and technologies</li>
              <li>Decide if each item uses AI or not</li>
              <li>Click "Yes" if you think it uses AI, and "No" if you don't</li>
              <li>See if you're right!</li>
            </ol>
          </div>
        </NarratedBox>

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-kids-purple">
            Question {currentItem + 1} of {detectiveItems.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-kids-blue to-kids-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentItem + 1) / detectiveItems.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <GlassCard variant="blue" className="max-w-2xl mx-auto p-0 overflow-hidden">
          <div className="text-center bg-gradient-to-r from-kids-blue/10 to-kids-purple/10 p-6 border-b border-kids-blue/20">
            <h3 className="text-2xl font-bold text-kids-blue">{item.name}</h3>
          </div>
          <div className="p-8">
            <div className="text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-64 h-64 object-cover rounded-xl shadow-lg mx-auto mb-6"
              />

              <h3 className="text-xl font-bold mb-6 text-kids-purple">
                Does this use AI?
              </h3>

              <div className="flex justify-center gap-4 mb-6">
                <Button
                  onClick={() => handleAnswer(item.id, true)}
                  variant={answers[item.id] === true ? "default" : "outline"}
                  size="lg"
                  className="px-8 py-3 text-lg"
                  disabled={hasAnswered}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleAnswer(item.id, false)}
                  variant={answers[item.id] === false ? "default" : "outline"}
                  size="lg"
                  className="px-8 py-3 text-lg"
                  disabled={hasAnswered}
                >
                  No
                </Button>
              </div>

              {hasAnswered && (
                <NarratedBox
                  text={item.explanation}
                  variant={answers[item.id] === item.usesAI ? 'green' : 'red'}
                  className="mb-6 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {answers[item.id] === item.usesAI ? (
                      <CheckCircle className="w-6 h-6 text-kids-green" />
                    ) : (
                      <XCircle className="w-6 h-6 text-kids-red" />
                    )}
                    <span className="font-bold text-lg">
                      {answers[item.id] === item.usesAI ? 'Correct!' : 'Not quite!'}
                    </span>
                  </div>
                  <p>{item.explanation}</p>
                </NarratedBox>
              )}

              {hasAnswered && (
                <Button onClick={handleNext} size="lg" className="px-8 py-3 text-lg">
                  {currentItem < detectiveItems.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </LessonLayout>
  );
};

export default ActivityDetails;
