import React from 'react';
import { Microscope, ExternalLink, Target, Layers, Play } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const BuildImageClassifierActivity = () => {
    return (
        <LessonLayout
            title="Build an Image Classifier"
            subtitle="Teach a computer to recognize images using Teachable Machine!"
            backLink="/lessons/image-recognition"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Get ready to be a machine learning engineer! In this advanced activity, you'll use Google's Teachable Machine to train your very own AI model. You'll teach it to tell the difference between you and your friend, or between a cat and a dog!"
                    className="bg-gradient-to-r from-kids-purple/45 to-pink-600/10 border-2 border-kids-purple/30 p-8 rounded-3xl shadow-xl relative overflow-hidden"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
                        🔬 The Ultimate AI Project
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        You'll use <strong>Teachable Machine</strong> to train a real neural network right in your browser. No coding required, just your camera and some creativity!
                    </p>

                    <div className="bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple/40 transition-colors">
                        <h3 className="font-bold mb-4 text-kids-purple flex items-center gap-2 text-xl">
                            <Layers className="w-5 h-5" />
                            Project Steps:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col items-center text-center p-4 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-kids-purple text-white flex items-center justify-center font-bold text-xl mb-3">1</div>
                                <h4 className="font-bold text-gray-800">Gather Data</h4>
                                <p className="text-sm text-gray-600">Take photos of Class A (e.g. You) and Class B (e.g. Your Pet).</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-white/90 rounded-xl border-2 border-pink-100 hover:border-pink-300 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl mb-3">2</div>
                                <h4 className="font-bold text-gray-800">Train Model</h4>
                                <p className="text-sm text-gray-600">Click "Train" to let the computer learn from your photos.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-white/90 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl mb-3">3</div>
                                <h4 className="font-bold text-gray-800">Test It</h4>
                                <p className="text-sm text-gray-600">Show it new things and see if it guesses correctly!</p>
                            </div>
                        </div>
                    </div>
                </NarratedBox>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Ideas */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
                            <Target className="w-6 h-6" />
                            Project Ideas
                        </h2>
                        <Card className="border-2 border-kids-blue/20 shadow-md flex-1 bg-white/90 backdrop-blur-glass">
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                    <li className="flex gap-4 p-4 bg-white/90 rounded-xl border-2 border-blue-100 items-center hover:border-blue-300 transition-colors">
                                        <div className="text-3xl">🙂 vs 🙁</div>
                                        <div>
                                            <h4 className="font-bold text-kids-blue">Happy vs Sad</h4>
                                            <p className="text-sm text-gray-600">Teach it to recognize your emotions.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 p-4 bg-white/90 rounded-xl border-2 border-green-100 items-center hover:border-green-300 transition-colors">
                                        <div className="text-3xl">🐶 vs 🐱</div>
                                        <div>
                                            <h4 className="font-bold text-kids-green">Dog vs Cat</h4>
                                            <p className="text-sm text-gray-600">Use toys or photos to teach it animals.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 p-4 bg-white/90 rounded-xl border-2 border-purple-100 items-center hover:border-purple-300 transition-colors">
                                        <div className="text-3xl">👍 vs 👎</div>
                                        <div>
                                            <h4 className="font-bold text-kids-purple">Thumbs Up vs Down</h4>
                                            <p className="text-sm text-gray-600">Control a game with hand gestures!</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex flex-col h-full justify-center text-center">
                        <GlassCard className="p-8 bg-pink-50 border-2 border-pink-100 mb-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-6xl mb-4">🚀</div>
                                <h3 className="text-2xl font-bold text-pink-600 mb-2">Ready to Launch?</h3>
                                <p className="text-gray-600 mb-6">This tool is super powerful but easy to use!</p>

                                <a
                                    href="https://teachablemachine.withgoogle.com/train/image"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <Button className="w-full bg-kids-purple hover:bg-purple-700 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            🎮 Open Teachable Machine
                                            <ExternalLink className="w-6 h-6" />
                                        </span>
                                    </Button>
                                    <p className="text-sm text-gray-500 mt-2">Opens Google's tool in a new tab</p>
                                </a>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
};

export default BuildImageClassifierActivity;
