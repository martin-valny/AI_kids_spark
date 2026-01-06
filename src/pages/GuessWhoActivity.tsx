import React from 'react';
import { Eye, ExternalLink, User, Cpu, Search } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';

const GuessWhoActivity = () => {
    return (
        <LessonLayout
            title="Guess Who: AI Edition"
            subtitle="Practice AI-style pattern recognition through strategic questioning!"
            backLink="/lessons/machine-learning-basics"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Just like in the classic 'Guess Who' game where you ask questions to identify a mystery character, AI uses pattern recognition to classify and identify things! In this activity, you'll see how asking the right questions helps AI (and you!) solve mysteries faster."
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-yellow/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-green">
                        🕵️ Think Like an AI Detective!
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Just like in the classic "Guess Who" game where you ask questions to identify a mystery character, AI uses pattern recognition to classify and identify things!
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/50 p-6 rounded-2xl border border-kids-green/10 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-bold text-kids-blue mb-2 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                In Guess Who Game:
                            </h4>
                            <p className="text-sm text-gray-600">
                                "Does your person wear glasses?" → Eliminates all characters without glasses.
                            </p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl border border-kids-green/10 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-bold text-kids-purple mb-2 flex items-center gap-2">
                                <Cpu className="w-5 h-5" />
                                In AI Recognition:
                            </h4>
                            <p className="text-sm text-gray-600">
                                "Does this image have round shapes?" → Eliminates non-circular objects.
                            </p>
                        </div>
                    </div>
                </NarratedBox>

                {/* Akinator Section */}
                <div>
                    <GlassCard variant="yellow" className="p-8 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <span className="text-4xl">🧞</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                Play Akinator: The Master AI Guesser
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                                Experience the ultimate AI questioning game. Akinator reads your mind by asking strategic questions, just like how a Decision Tree algorithm works!
                            </p>

                            <a href="https://en.akinator.com/" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-gradient-to-r from-kids-yellow to-orange-500 hover:from-kids-yellow/90 hover:to-orange-500/90 text-white px-10 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                    Play Akinator <ExternalLink className="ml-2 w-6 h-6" />
                                </Button>
                            </a>
                        </div>
                    </GlassCard>
                </div>

                {/* Algorithms Explained Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard variant="blue" className="flex flex-col">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-kids-blue">
                            <Search className="w-6 h-6" />
                            How it Works
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
                                <h4 className="font-bold text-kids-blue mb-1">Strategic Questions</h4>
                                <p className="text-sm text-gray-600">AI picks questions that split the possibilities in half. It's the fastest way to the answer!</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
                                <h4 className="font-bold text-kids-blue mb-1">Pattern Matching</h4>
                                <p className="text-sm text-gray-600">It matches your answers against millions of patterns it has learned before.</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variant="purple" className="flex flex-col">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-kids-purple">
                            <Cpu className="w-6 h-6" />
                            Real World AI
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                                <h4 className="font-bold text-kids-purple mb-1">Medical Diagnosis</h4>
                                <p className="text-sm text-gray-600">Doctors use similar "decision trees" to figure out illnesses based on symptoms.</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                                <h4 className="font-bold text-kids-purple mb-1">Face ID</h4>
                                <p className="text-sm text-gray-600">Your phone asks "Is the nose here? Are the eyes this far apart?" to unlock.</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </LessonLayout>
    );
};

export default GuessWhoActivity;
