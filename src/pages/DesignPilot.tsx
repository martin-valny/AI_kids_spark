import React from 'react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Zap, ArrowRight, Play, Star } from 'lucide-react';

const DesignPilot = () => {
    return (
        <LessonLayout
            title="Design Pilot: Future Standard"
            subtitle="A reference implementation for the unified 'High-Opacity Glass' design system."
            backLink="/lessons"
            backLabel="Back to Lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* 1. HERO SECTION: Standard High-Opacity Glass */}
                <section>
                    <div className="mb-6 text-center">
                        <span className="px-3 py-1 bg-kids-blue/10 text-kids-blue rounded-full text-sm font-bold border border-kids-blue/20">
                            CORE COMPONENT
                        </span>
                    </div>
                    <GlassCard variant="blue" className="p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative background element, low opacity so it doesn't hurt readiblity */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Sparkles className="w-64 h-64" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                🎨 High-Opacity Glass Panel
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                                This is the standard container for all lesson content. It uses <strong>bg-white/90</strong> to ensure perfect readability while maintaining a modern, airy feel.
                                Notice the subtle pastel tint (Blue variant) and the frosted blur effect.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-kids-blue hover:bg-kids-blue/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Primary Action
                                </Button>
                                <Button variant="outline" className="border-2 border-kids-blue text-kids-blue hover:bg-kids-blue/5">
                                    Secondary Action
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* 2. INNER CARDS GRID: The specific fix for "Framing" issues */}
                <section>
                    <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                        <Zap className="w-6 h-6 text-kids-yellow" />
                        Standardized Inner Cards (Grid)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: Standard Info Card (Blue) */}
                        <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20 shadow-sm hover:border-kids-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-kids-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6 text-kids-blue" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-blue transition-colors">
                                Consistent Framing
                            </h4>
                            <p className="text-sm text-gray-600">
                                Every card has a visible border (2px) and a standard background opacity. No more "invisible" boxes.
                            </p>
                        </div>

                        {/* Card 2: Interactive Card (Purple) */}
                        <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="w-12 h-12 bg-kids-purple/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 text-kids-purple" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-purple transition-colors flex items-center gap-2">
                                Interactive Hover
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </h4>
                            <p className="text-sm text-gray-600">
                                Hover over me! Notice the smooth lift, shadow increase, and border color change.
                            </p>
                        </div>

                        {/* Card 3: Success/Feature Card (Green) */}
                        <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-green/20 shadow-sm hover:border-kids-green hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-kids-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6 text-kids-green" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-green transition-colors">
                                Readability First
                            </h4>
                            <p className="text-sm text-gray-600">
                                High contrast text on opaque backgrounds ensures content is always legible, even over complex page backgrounds.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. SPLIT SECTIONS: Example of Text + Content pairings */}
                <section>
                    <GlassCard variant="purple" className="p-0 overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Structured Content Layouts
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    For complex explanations, we use this split layout. The text side is clean and focused. The visual side provides context.
                                </p>
                                <div className="bg-white/80 p-4 rounded-xl border border-kids-purple/20 mb-6">
                                    <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-kids-purple" />
                                        <strong>Pro Tip:</strong> Use these boxes for key takeaways.
                                    </p>
                                </div>
                                <Button className="w-fit bg-kids-purple hover:bg-kids-purple/90 text-white">
                                    Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>

                            {/* Visual Side */}
                            <div className="bg-gradient-to-br from-kids-purple/10 to-kids-pink/10 p-12 flex items-center justify-center relative">
                                {/* Decorative circle */}
                                <div className="absolute inset-0 bg-kids-purple/5 backdrop-blur-sm" />

                                <div className="relative bg-white/90 p-6 rounded-2xl shadow-xl border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-32 h-32 bg-kids-purple/20 rounded-xl flex items-center justify-center mb-4">
                                        <Play className="w-12 h-12 text-kids-purple" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* 4. PASTEL GRADIENTS: The "Soft" Look */}
                <section>
                    <h3 className="text-2xl font-bold text-center mb-8">
                        Consistent Pastel Gradients (45% Opacity)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-kids-blue/45 to-kids-cyan/45 border border-kids-blue/20 flex flex-col items-center justify-center text-center">
                            <span className="font-bold text-kids-blue mb-1">Blue</span>
                            <span className="text-xs text-gray-600">/45 Opacity</span>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-kids-purple/45 to-kids-pink/45 border border-kids-purple/20 flex flex-col items-center justify-center text-center">
                            <span className="font-bold text-kids-purple mb-1">Purple</span>
                            <span className="text-xs text-gray-600">/45 Opacity</span>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-kids-green/45 to-emerald-400/45 border border-kids-green/20 flex flex-col items-center justify-center text-center">
                            <span className="font-bold text-kids-green mb-1">Green</span>
                            <span className="text-xs text-gray-600">/45 Opacity</span>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-kids-orange/45 to-kids-yellow/45 border border-kids-orange/20 flex flex-col items-center justify-center text-center">
                            <span className="font-bold text-kids-orange mb-1">Orange</span>
                            <span className="text-xs text-gray-600">/45 Opacity</span>
                        </div>
                    </div>
                </section>

            </div>
        </LessonLayout>
    );
};

export default DesignPilot;
