import React from 'react';
import { Palette, Lightbulb, Shield, Award } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { GlassCard } from '@/components/ui/GlassCard';
import DrawingCanvas from '@/components/DrawingCanvas';

const DesignResponsibleAIActivity = () => {
    return (
        <LessonLayout
            title="Design Responsible AI"
            subtitle="Create your own ethical AI invention that helps the world!"
            backLink="/lessons/ai-ethics"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="It's time to be an inventor! Imagine an AI that could solve a big problem - maybe cleaning the ocean, helping doctors, or teaching kids. But remember: a good AI must be safe, fair, and honest. Draw your idea below!"
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-green">
                        🎨 Your Invention Studio
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Imagine you're creating an AI system to help people. What would it do? How would you make sure it's fair, safe, and helpful to everyone?
                    </p>

                    <div className="bg-white/50 p-6 rounded-2xl border border-kids-green/10 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold mb-3 text-kids-green flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Safety Checklist:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <li className="flex items-center gap-2 p-2 bg-white/50 border border-kids-green/10 rounded-lg">
                                <span className="text-xl">✅</span>
                                <span>Helps everyone equally</span>
                            </li>
                            <li className="flex items-center gap-2 p-2 bg-white/50 border border-kids-green/10 rounded-lg">
                                <span className="text-xl">✅</span>
                                <span>Keeps data private</span>
                            </li>
                            <li className="flex items-center gap-2 p-2 bg-white/50 border border-kids-green/10 rounded-lg">
                                <span className="text-xl">✅</span>
                                <span>Easy to understand</span>
                            </li>
                            <li className="flex items-center gap-2 p-2 bg-white/50 border border-kids-green/10 rounded-lg">
                                <span className="text-xl">✅</span>
                                <span>Safe to use</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* Drawing Canvas Section */}
                <GlassCard className="p-8 border-2 border-blue-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-kids-blue">
                        ✏️ Sketch Your Idea
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Draw what your AI looks like. Does it have eyes? Is it an app? A robot? Don't forget to draw people using it safely!
                    </p>

                    <div className="border-4 border-dashed border-gray-200 rounded-3xl overflow-hidden bg-white">
                        <DrawingCanvas width={800} height={500} className="w-full h-full" />
                    </div>

                    <p className="text-center mt-4 text-sm text-gray-500 italic">
                        💡 Tip: You can save your drawing when you're done!
                    </p>
                </GlassCard>

                {/* Example Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard variant="purple" className="flex flex-col">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-kids-purple">
                            <Lightbulb className="w-6 h-6" />
                            Example: Homework Helper Bot
                        </h3>
                        <div className="space-y-4 flex-1">
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/40 transition-colors">
                                <h4 className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Mission</h4>
                                <p>Helps students understand difficult math problems.</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/40 transition-colors">
                                <h4 className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Ethical Features</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Never just gives the answer</li>
                                    <li>• Encourages the student</li>
                                    <li>• Doesn't share grades with others</li>
                                </ul>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variant="yellow" className="flex flex-col">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-kids-yellow">
                            <Award className="w-6 h-6" />
                            Share & Discuss
                        </h3>
                        <div className="space-y-4 text-gray-800">
                            <p>Ask a friend or parent:</p>
                            <ul className="space-y-2 bg-white/90 p-4 rounded-xl border-2 border-kids-yellow/20 hover:border-kids-yellow/40 transition-colors">
                                <li className="flex gap-2">
                                    <span className="font-bold">1.</span>
                                    Would you trust this AI?
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">2.</span>
                                    What if it makes a mistake?
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">3.</span>
                                    Does it help everyone fairly?
                                </li>
                            </ul>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </LessonLayout>
    );
};

export default DesignResponsibleAIActivity;
