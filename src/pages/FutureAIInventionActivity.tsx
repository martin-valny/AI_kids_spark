import React from 'react';
import { Rocket, Sparkles, Lightbulb, Pencil } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';
import DrawingCanvas from '@/components/DrawingCanvas';

const FutureAIInventionActivity = () => {
    return (
        <LessonLayout
            title="Future AI Invention"
            subtitle="Imagine and design an AI invention for the future!"
            backLink="/lessons/future-of-ai"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Welcome to the future! Imagine it's the year 2050 and you are a world-famous AI inventor. The world needs your help! What kind of amazing technology will you create to solve big problems? Maybe a robot that cleans the oceans, or an AI doctor that keeps everyone healthy?"
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-purple/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-blue">
                        🚀 Invent the Future!
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        It's the year 2050! You're a famous AI inventor. What amazing AI technology will you create to make the world better?
                    </p>

                    <div className="bg-white/50 p-6 rounded-2xl border border-kids-blue/10 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold mb-4 text-xl flex items-center gap-2 text-kids-purple">
                            <Lightbulb className="w-6 h-6" />
                            Ideas to Get You Started:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🌍 Environmental Helper</p>
                                <p className="text-xs text-gray-600">Cleans oceans or fights climate change</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🏥 Health Guardian</p>
                                <p className="text-xs text-gray-600">Predicts and prevents diseases</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🎓 Super Teacher</p>
                                <p className="text-xs text-gray-600">Teaches perfectly for each student</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🌌 Space Explorer</p>
                                <p className="text-xs text-gray-600">Explores distant planets</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🎨 Creative Partner</p>
                                <p className="text-xs text-gray-600">Helps create amazing art & music</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-kids-blue/10 hover:shadow-sm transition-all">
                                <p className="font-medium text-sm text-kids-blue">🤝 Friendship Bot</p>
                                <p className="text-xs text-gray-600">Companion for lonely people</p>
                            </div>
                        </div>
                    </div>
                </NarratedBox>

                {/* Drawing Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
                        <Pencil className="w-8 h-8" />
                        Design Your Invention
                    </h2>
                    <Card className="border-2 border-kids-purple/20 shadow-lg bg-kids-glass-white overflow-hidden">
                        <CardContent className="p-6">
                            <p className="mb-6 text-gray-700 text-lg">
                                Draw your future AI invention! Show what it looks like, how it works, and how it helps people.
                            </p>

                            <div className="border-4 border-dashed border-kids-purple/10 rounded-3xl p-2 bg-gray-50 mb-6">
                                <DrawingCanvas width={800} height={500} className="w-full rounded-2xl bg-white shadow-sm" />
                            </div>

                            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 hover:border-kids-purple/30 transition-colors">
                                <h4 className="font-bold mb-3 text-kids-purple text-lg">Don't forget to include:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-kids-purple text-white flex items-center justify-center text-sm font-bold">1</span>
                                        <span className="text-sm font-medium">A cool name</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-kids-purple text-white flex items-center justify-center text-sm font-bold">2</span>
                                        <span className="text-sm font-medium">What problem it solves</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-kids-purple text-white flex items-center justify-center text-sm font-bold">3</span>
                                        <span className="text-sm font-medium">How it uses AI</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-kids-purple text-white flex items-center justify-center text-sm font-bold">4</span>
                                        <span className="text-sm font-medium">Why it helps the world</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Description Form / Reflection */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-green">
                        <Sparkles className="w-8 h-8" />
                        Describe Your Invention
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-2 border-kids-green/20 shadow-lg bg-kids-glass-white h-full">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="font-bold text-kids-green block">Invention Name:</label>
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-400 italic">
                                        Write a creative name...
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-kids-blue block">What It Does:</label>
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-400 italic h-24">
                                        Explain the main purpose...
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-kids-yellow/20 shadow-lg bg-kids-glass-white h-full">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-kids-yellow text-lg">🌟 Think Bigger!</h4>
                                    <ul className="space-y-3">
                                        <li className="p-3 bg-white/90 border-2 border-yellow-100 rounded-xl text-sm font-medium text-gray-700 hover:border-yellow-300 transition-colors">
                                            • What challenges might you face building this?
                                        </li>
                                        <li className="p-3 bg-white/90 border-2 border-yellow-100 rounded-xl text-sm font-medium text-gray-700 hover:border-yellow-300 transition-colors">
                                            • How would you make sure it's safe and ethical?
                                        </li>
                                        <li className="p-3 bg-white/90 border-2 border-yellow-100 rounded-xl text-sm font-medium text-gray-700 hover:border-yellow-300 transition-colors">
                                            • Who would benefit most from your invention?
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-kids-blue/45 to-kids-purple/45 p-6 rounded-2xl border-2 border-kids-blue/30 text-center mb-12">
                    <p className="text-xl font-bold text-kids-blue">
                        💫 Remember: Today's impossible ideas become tomorrow's reality! Keep dreaming big!
                    </p>
                </div>
            </div>
        </LessonLayout>
    );
};

export default FutureAIInventionActivity;
