import React from 'react';
import { Brain, ExternalLink, Target, Zap, Award } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';

const TrainDrawingRecognizerActivity = () => {
    return (
        <LessonLayout
            title="Train Your Drawing Recognizer"
            subtitle="Teach an AI to recognize your masterpieces using Teachable Machine!"
            backLink="/lessons/machine-learning-basics"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="In this activity, you'll train your very own AI to recognize different drawings! You'll use Google's Teachable Machine to create a model that can tell the difference between your drawings of different objects. This is how real machine learning works - we show the AI lots of examples so it can learn patterns!"
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-blue/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
                        🧠 Train Your Own AI!
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        In this activity, you'll train your very own AI to recognize different drawings! You'll use Google's <strong>Teachable Machine</strong> to create a model that can tell the difference between your drawings of different objects.
                    </p>

                    <div className="bg-white/50 p-6 rounded-2xl border border-kids-purple/10 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold mb-4 text-xl flex items-center gap-2 text-kids-blue">
                            <Target className="w-6 h-6" />
                            What You'll Learn:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="text-xl">📊</span>
                                <span>How to collect training data for machine learning</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-xl">👁️</span>
                                <span>How AI learns to recognize patterns in images</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-xl">🧪</span>
                                <span>The difference between training and testing</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-xl">📈</span>
                                <span>How to improve AI accuracy with more examples</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <GlassCard variant="purple" className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-kids-purple flex items-center gap-2 mb-4">
                            <Brain className="w-6 h-6" />
                            Step 1: Open Teachable Machine
                        </h3>
                        <p className="mb-6 flex-1 text-gray-700">
                            Click the button below to open Google's Teachable Machine in a new tab. This is a free tool that lets you train AI models!
                        </p>
                        <a
                            href="https://teachablemachine.withgoogle.com/train/image"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="w-full bg-gradient-to-r from-kids-purple to-kids-blue text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Open Teachable Machine <ExternalLink className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                    </GlassCard>

                    <GlassCard variant="blue" className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-kids-blue flex items-center gap-2 mb-4">
                            <Zap className="w-6 h-6" />
                            Step 2: Create Classes
                        </h3>
                        <p className="mb-4 text-gray-700">
                            Create 3-4 different classes for things you want to draw. For example:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/90 p-2 rounded text-center border border-kids-blue/10">🐱 Cat</div>
                            <div className="bg-white/90 p-2 rounded text-center border border-kids-blue/10">🐶 Dog</div>
                            <div className="bg-white/90 p-2 rounded text-center border border-kids-blue/10">🌳 Tree</div>
                            <div className="bg-white/90 p-2 rounded text-center border border-kids-blue/10">🏠 House</div>
                        </div>
                    </GlassCard>

                    <GlassCard variant="green" className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-kids-green flex items-center gap-2 mb-4">
                            <Target className="w-6 h-6" />
                            Step 3: Draw Examples
                        </h3>
                        <p className="mb-4 text-gray-700">
                            For each class, draw 10-15 different examples using your camera or webcam. Make them different:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700 bg-white/90 p-4 rounded-xl border border-kids-green/10">
                            <li>• Different sizes</li>
                            <li>• Different angles</li>
                            <li>• Different styles</li>
                        </ul>
                    </GlassCard>

                    <GlassCard variant="orange" className="flex flex-col h-full">
                        <h3 className="text-xl font-bold text-kids-orange flex items-center gap-2 mb-4">
                            <Award className="w-6 h-6" />
                            Step 4: Train & Test
                        </h3>
                        <p className="mb-4 text-gray-700">
                            Click "Train Model" and wait for it to learn. Then test it with new drawings!
                        </p>
                        <div className="bg-orange-50 text-orange-800 p-3 rounded-xl text-center font-bold border border-orange-100">
                            Goal: 80% Accuracy
                        </div>
                    </GlassCard>
                </div>

                {/* Summary Section */}
                <GlassCard variant="green" className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
                                🎉 Using Real Machine Learning
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Amazing work! You've just experienced the core of machine learning. The AI learned to recognize patterns in your drawings by looking at many examples. In real life, this same process is used to teach AI to:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="bg-white/90 p-3 rounded-lg flex items-center gap-2 border-2 border-kids-green/10 hover:border-kids-green/30 transition-colors">
                                    <span>🚗</span> Recognize street signs for self-driving cars
                                </li>
                                <li className="bg-white/90 p-3 rounded-lg flex items-center gap-2 border-2 border-kids-green/10 hover:border-kids-green/30 transition-colors">
                                    <span>📱</span> Unlock phones with face ID
                                </li>
                                <li className="bg-white/90 p-3 rounded-lg flex items-center gap-2 border-2 border-kids-green/10 hover:border-kids-green/30 transition-colors">
                                    <span>🩺</span> Help doctors read X-rays
                                </li>
                                <li className="bg-white/90 p-3 rounded-lg flex items-center gap-2 border-2 border-kids-green/10 hover:border-kids-green/30 transition-colors">
                                    <span>✍️</span> Read handwriting
                                </li>
                            </ul>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </LessonLayout>
    );
};

export default TrainDrawingRecognizerActivity;
