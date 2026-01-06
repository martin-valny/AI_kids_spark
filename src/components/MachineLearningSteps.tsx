
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const MachineLearningSteps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Collect Examples",
      icon: "📚",
      description: "Just like collecting many pictures of cats and dogs to show what each animal looks like.",
      visual: (
        <div className="bg-white/95 p-6 rounded-xl shadow-md border border-white/50">
          <h4 className="font-bold text-center mb-4">Gathering Training Data</h4>
          <div className="grid grid-cols-4 gap-2">
            {/* Cat examples */}
            <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-2xl mb-1">🐱</div>
              <div className="text-xs text-blue-600">Cat</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-2xl mb-1">😸</div>
              <div className="text-xs text-blue-600">Cat</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-2xl mb-1">😺</div>
              <div className="text-xs text-blue-600">Cat</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-2xl mb-1">🐈</div>
              <div className="text-xs text-blue-600">Cat</div>
            </div>
            {/* Dog examples */}
            <div className="text-center p-2 bg-green-50 rounded border border-green-200">
              <div className="text-2xl mb-1">🐶</div>
              <div className="text-xs text-green-600">Dog</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded border border-green-200">
              <div className="text-2xl mb-1">🐕</div>
              <div className="text-xs text-green-600">Dog</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded border border-green-200">
              <div className="text-2xl mb-1">🦮</div>
              <div className="text-xs text-green-600">Dog</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded border border-green-200">
              <div className="text-2xl mb-1">🐕‍🦺</div>
              <div className="text-xs text-green-600">Dog</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <strong>Thousands of labeled examples</strong> help the computer learn!
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Find Patterns",
      icon: "🧠",
      description: "The computer studies all the examples and notices that cats have pointy ears and dogs have floppy ears.",
      visual: (
        <div className="bg-white/95 p-6 rounded-xl shadow-md border border-white/50">
          <h4 className="font-bold text-center mb-4">Analyzing Patterns</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🐱</div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-bold text-blue-700 mb-2">Cat Features:</h5>
                <ul className="text-xs text-left space-y-1">
                  <li>👂 Pointy ears</li>
                  <li>👁️ Almond-shaped eyes</li>
                  <li>😸 Whiskers</li>
                  <li>🐾 Small paws</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🐶</div>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-bold text-green-700 mb-2">Dog Features:</h5>
                <ul className="text-xs text-left space-y-1">
                  <li>👂 Floppy ears</li>
                  <li>👁️ Round eyes</li>
                  <li>👃 Bigger nose</li>
                  <li>🐾 Larger paws</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
              🔍 Computer finds these patterns automatically!
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Make Predictions",
      icon: "🎯",
      description: "Now when shown a new photo, it can guess if it's a cat or dog based on the patterns it learned!",
      visual: (
        <div className="bg-white/95 p-6 rounded-xl shadow-md border border-white/50">
          <h4 className="font-bold text-center mb-4">Making Predictions</h4>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-6xl mb-2">🐱</div>
              <div className="text-sm text-gray-600">New Image</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-2xl">→</div>
              <div className="bg-purple-50 px-3 py-1 rounded border border-purple-200">
                <div className="text-sm font-bold text-purple-700">AI Brain</div>
                <div className="text-xs text-purple-600">Analyzing...</div>
              </div>
              <div className="text-2xl">→</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded border border-blue-300">
                <div className="text-lg font-bold text-blue-700">95% Cat</div>
                <div className="text-xs text-blue-600">5% Dog</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">Prediction</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
              ✅ Correct! It found pointy ears and whiskers!
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Get Better",
      icon: "📈",
      description: "The more examples it sees, the better it gets at recognizing cats and dogs correctly!",
      visual: (
        <div className="bg-white/95 p-6 rounded-xl shadow-md border border-white/50">
          <h4 className="font-bold text-center mb-4">Improving Over Time</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium w-20">Day 1:</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-red-400 h-4 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="text-sm text-red-600 w-12">60%</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium w-20">Day 7:</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-400 h-4 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-sm text-yellow-600 w-12">80%</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium w-20">Day 30:</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-400 h-4 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="text-sm text-green-600 w-12">95%</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-red-50 p-2 rounded border border-red-200">
              <div className="text-lg">📖</div>
              <div className="text-xs">100 examples</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
              <div className="text-lg">📚</div>
              <div className="text-xs">1,000 examples</div>
            </div>
            <div className="bg-green-50 p-2 rounded border border-green-200">
              <div className="text-lg">📚📚</div>
              <div className="text-xs">10,000 examples</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              🚀 More data = Better performance!
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="glass-blue p-6 rounded-xl mt-8 hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
        🔬 How Does a Computer Actually Learn?
      </h2>
      <p className="text-lg mb-6 text-gray-700">
        Let's break down the learning process step by step, just like how you might learn to ride a bike!
      </p>

      {/* Step Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${index === currentStep
                  ? 'bg-kids-blue text-white shadow-lg'
                  : 'bg-white text-kids-blue border border-kids-blue/30 hover:bg-kids-blue/10'
                  }`}
              >
                {step.id}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 transition-colors ${index < currentStep ? 'bg-kids-blue' : 'bg-gray-300'
                  }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Display */}
      <div className="bg-white/90 p-6 rounded-xl shadow-md border border-white/50">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{currentStepData.icon}</div>
          <h3 className="text-xl font-bold text-kids-blue mb-2">
            Step {currentStepData.id}: {currentStepData.title}
          </h3>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        {/* Visual Component */}
        <div className="mb-6">
          {currentStepData.visual}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex items-center gap-2"
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>

        <Button
          onClick={nextStep}
          variant="default"
          className="flex items-center gap-2"
          disabled={currentStep === steps.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="mt-6 p-4 bg-kids-green/80 rounded-xl border border-kids-green/50">
        <p className="text-center text-sm text-gray-700">
          <strong className="text-kids-green">Cool!</strong> This is exactly how you learned to recognize different animals when you were little - by seeing lots of examples! 🎉
        </p>
      </div>
    </div>
  );
};

export default MachineLearningSteps;
