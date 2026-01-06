import React from 'react';
import { Smile, ExternalLink, Zap, Target, Sparkles } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const EmojiDetectorActivity = () => {
    return (
        <LessonLayout
            title="Emoji Detector Challenge"
            subtitle="Can you trick the AI with your drawings?"
            backLink="/lessons/image-recognition"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Get your digital crayons ready! In this challenge, you'll play a game called Quick, Draw! Google's AI will try to guess what you're drawing as you draw it. It's like playing Pictionary with a robot. The more people play, the smarter the robot gets at recognizing doodles!"
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-orange/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-orange">
                        😊 Draw Emojis for AI!
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Draw simple objects and emojis and see if Google's <strong>Quick, Draw!</strong> AI can guess what you're making! This is a super fun way to see how AI recognizes patterns in lines and shapes.
                    </p>

                    <div className="bg-white/50 p-6 rounded-2xl border border-kids-yellow/10 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold mb-4 text-xl flex items-center gap-2 text-kids-orange">
                            <Target className="w-6 h-6" />
                            Your Mission:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base">
                            <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-yellow/10 rounded-xl">
                                <span className="text-2xl">✏️</span>
                                <span className="text-gray-800">Draw simple objects (smiley face, heart, sun)</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-yellow/10 rounded-xl">
                                <span className="text-2xl">🤖</span>
                                <span className="text-gray-800">Watch the AI guess in real-time!</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-yellow/10 rounded-xl">
                                <span className="text-2xl">🎨</span>
                                <span className="text-gray-800">Try to be creative (or messy!)</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/50 border border-kids-yellow/10 rounded-xl">
                                <span className="text-2xl">🧠</span>
                                <span className="text-gray-800">See how patterns teach the machine</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* How It Works & CTA */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: How It Works */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
                            <Zap className="w-6 h-6" />
                            How It Works
                        </h2>
                        <Card className="border-2 border-kids-blue/20 shadow-md flex-1 bg-white/90">
                            <CardContent className="p-6">
                                <p className="mb-4 text-gray-700 leading-relaxed">
                                    The AI was trained on <strong>millions</strong> of drawings from people all over the world. It learned what a "cat" usually looks like when humans draw it.
                                </p>
                                <div className="bg-kids-blue/10 p-4 rounded-xl mb-4">
                                    <h4 className="font-bold text-kids-blue mb-2">The AI looks for:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                        <li>Basic shapes (circles, lines)</li>
                                        <li>Order of your strokes (what you draw first)</li>
                                        <li>Common features (whiskers on a cat)</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-500 italic">
                                    Sometimes it gets confused by unique or very messy drawings!
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Fun Ideas & CTA */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
                            <Sparkles className="w-6 h-6" />
                            Fun Ideas to Try
                        </h2>
                        <Card className="border-2 border-kids-green/20 shadow-md flex-1 mb-6 bg-white/90">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-kids-green/10 p-3 rounded-xl">
                                        <div className="text-xl mb-1">😃</div>
                                        <p className="font-bold text-kids-green text-sm">Easy</p>
                                        <p className="text-xs text-gray-600">Smiley Face</p>
                                    </div>
                                    <div className="bg-kids-green/10 p-3 rounded-xl">
                                        <div className="text-xl mb-1">🍕</div>
                                        <p className="font-bold text-kids-green text-sm">Medium</p>
                                        <p className="text-xs text-gray-600">Pizza Slice</p>
                                    </div>
                                    <div className="bg-kids-green/10 p-3 rounded-xl">
                                        <div className="text-xl mb-1">🦄</div>
                                        <p className="font-bold text-kids-green text-sm">Tricky</p>
                                        <p className="text-xs text-gray-600">Unicorn</p>
                                    </div>
                                    <div className="bg-kids-green/10 p-3 rounded-xl">
                                        <div className="text-xl mb-1">🚲</div>
                                        <p className="font-bold text-kids-green text-sm">Hard</p>
                                        <p className="text-xs text-gray-600">Bicycle</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <a
                            href="https://quickdraw.withgoogle.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button className="w-full bg-kids-yellow hover:bg-yellow-500 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform hover:scale-105 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    🎮 Start Drawing Game
                                    <ExternalLink className="w-6 h-6" />
                                </span>
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Tip Box */}
                <div className="bg-kids-blue/10 border-2 border-kids-blue/30 p-6 rounded-2xl text-center shadow-inner">
                    <p className="text-lg font-medium text-kids-blue-dark">
                        💡 Tip: Don't worry about being a great artist! The AI is looking for patterns, not masterpieces.
                    </p>
                </div>
            </div>
        </LessonLayout>
    );
};

export default EmojiDetectorActivity;
