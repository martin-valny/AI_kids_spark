import React from 'react';
import { Lightbulb, ExternalLink, Layers, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/GlassCard';

const SortingChallengeActivity = () => {
    return (
        <LessonLayout
            title="Sorting Challenge"
            subtitle="Learn how algorithms sort and organize data!"
            backLink="/lessons/machine-learning-basics"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Computers are neat freaks! They love to sort information perfectly. Whether it's your photos by date or your high scores in a game, sorting algorithms are working hard behind the scenes. Let's see how they do it!"
                    className="bg-gradient-to-r from-kids-purple/45 to-kids-pink/45 border-2 border-kids-purple/30 p-8 rounded-3xl shadow-xl relative overflow-hidden"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-pink/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-purple">
                        🔢 Sorting Like a Computer!
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Computers need to sort information all the time - from organizing your photos by date to ranking search results. Let's learn how sorting algorithms work!
                    </p>

                    <div className="bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple/40 transition-colors">
                        <h4 className="font-bold mb-4 text-xl flex items-center gap-2 text-kids-purple">
                            <Lightbulb className="w-6 h-6" />
                            What You'll Learn:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-4 text-base text-gray-700">
                            <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-kids-purple/20 flex items-center justify-center text-kids-purple font-bold">1</div>
                                <span>How computers organize data</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-kids-purple/20 flex items-center justify-center text-kids-purple font-bold">2</div>
                                <span>Bubble sort vs. Quick sort</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-kids-purple/20 flex items-center justify-center text-kids-purple font-bold">3</div>
                                <span>Why speed matters in sorting</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/30 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-kids-purple/20 flex items-center justify-center text-kids-purple font-bold">4</div>
                                <span>How sorting helps AI work faster</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Algorithms Column */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
                            <Layers className="w-6 h-6" />
                            Common Algorithms
                        </h2>
                        <Card className="border-2 border-kids-blue/20 shadow-md flex-1 bg-white/90">
                            <CardContent className="p-6 space-y-4">
                                <div className="bg-kids-blue/10 p-4 rounded-xl border-2 border-kids-blue/20 hover:scale-[1.02] transition-transform hover:border-kids-blue/40">
                                    <h4 className="font-bold mb-2 text-kids-blue text-lg flex items-center gap-2">
                                        🫧 Bubble Sort
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Compares items two at a time and swaps them if they're wrong. Like bubbles rising!
                                    </p>
                                    <div className="text-xs font-bold text-kids-blue/60 uppercase tracking-wider">⏱️ Slow but Simple</div>
                                </div>

                                <div className="bg-kids-green/10 p-4 rounded-xl border-2 border-kids-green/20 hover:scale-[1.02] transition-transform hover:border-kids-green/40">
                                    <h4 className="font-bold mb-2 text-kids-green text-lg flex items-center gap-2">
                                        ⚡ Quick Sort
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Picks a "pivot" item and sorts everything around it. Super fast for big lists!
                                    </p>
                                    <div className="text-xs font-bold text-kids-green/60 uppercase tracking-wider">⏱️ Very Fast</div>
                                </div>

                                <div className="bg-kids-yellow/10 p-4 rounded-xl border-2 border-kids-yellow/20 hover:scale-[1.02] transition-transform hover:border-kids-yellow/40">
                                    <h4 className="font-bold mb-2 text-kids-yellow text-lg flex items-center gap-2">
                                        🔀 Merge Sort
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Splits the list into tiny pieces, sorts them, and merges them back together.
                                    </p>
                                    <div className="text-xs font-bold text-kids-yellow/60 uppercase tracking-wider">⏱️ Reliable & Fast</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Real World & CTA Column */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-green">
                            <Zap className="w-6 h-6" />
                            Real-World Uses
                        </h2>
                        <Card className="border-2 border-kids-green/20 shadow-md mb-8 bg-white/90">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 bg-kids-green/10 rounded-xl text-2xl">📱</div>
                                        <div>
                                            <h4 className="font-bold text-kids-green">In Your Phone</h4>
                                            <p className="text-sm text-gray-600">Sorting contacts A-Z, Photos by date, App lists.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 bg-kids-blue/10 rounded-xl text-2xl">🤖</div>
                                        <div>
                                            <h4 className="font-bold text-kids-blue">In AI Systems</h4>
                                            <p className="text-sm text-gray-600">Ranking search results, finding the best answer confidence.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-auto">
                            <a
                                href="https://www.toptal.com/developers/sorting-algorithms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <Button className="w-full bg-kids-purple hover:bg-purple-600 text-white py-8 text-xl rounded-2xl shadow-xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        🎮 Try Sorting Visualizer
                                        <ExternalLink className="w-6 h-6" />
                                    </span>
                                </Button>
                            </a>
                            <p className="text-center text-gray-500 text-sm mt-3">
                                Watch algorithms race against each other! 🏁
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
};

export default SortingChallengeActivity;
