import React from 'react';
import { Scale, CheckCircle, XCircle, Flag } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { GlassCard } from '@/components/ui/GlassCard';

const AIEthicsScenariosActivity = () => {
    const scenarios = [
        {
            id: 1,
            title: "The Homework Helper",
            icon: "📚",
            scenario: "An AI app can do your homework for you instantly. Should you use it?",
            thinkAbout: [
                "Will you actually learn if AI does your homework?",
                "Is it fair to other students?",
                "What would your teacher think?"
            ],
            goodChoice: "Use AI to help explain concepts you don't understand, but do the work yourself.",
            badChoice: "Let AI do all your homework without learning anything."
        },
        {
            id: 2,
            title: "The Face Scanner",
            icon: "🤳",
            scenario: "A new app wants to scan everyone's face at school to automatically take attendance. Is this okay?",
            thinkAbout: [
                "Do students have a choice?",
                "Where is the face data stored?",
                "Could it be used for other things?"
            ],
            goodChoice: "Only use it if students and parents agree, and the data is kept safe.",
            badChoice: "Scan everyone's face without asking permission."
        },
        {
            id: 3,
            title: "The Game Character",
            icon: "🎮",
            scenario: "You're making a game with AI characters. Should they all look and sound the same?",
            thinkAbout: [
                "Do all people look and sound the same in real life?",
                "How can you make characters that represent everyone?"
            ],
            goodChoice: "Create diverse characters that represent different people, cultures, and abilities.",
            badChoice: "Make all characters look the same or use stereotypes."
        }
    ];

    return (
        <LessonLayout
            title="AI Ethics Scenarios"
            subtitle="What would YOU do? Be the judge in these tricky situations."
            backLink="/lessons/ai-ethics"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="Welcome to the Ethics Lab! Being an AI expert isn't just about coding - it's about deciding what is Right and what is Wrong. Read these scenarios and decide the best path forward."
                    className="bg-white/95 border border-white/20 p-8 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-md"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-teal">
                        🤔 Think Like an Ethicist
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        Read each scenario and think about what the right thing to do would be. There's no single "correct" answer - ethics is about thinking carefully about choices and their consequences.
                    </p>

                    <div className="bg-white/50 p-6 rounded-2xl border border-kids-teal/10 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold mb-3 text-kids-teal flex items-center gap-2">
                            <Flag className="w-5 h-5" />
                            The Golden Rules:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Who is helped by this?</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Who might be harmed?</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Is it fair to everyone?</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Would you want this used on you?</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* Scenarios List */}
                <div className="space-y-8">
                    {scenarios.map((scenario, index) => (
                        <GlassCard key={scenario.id} className="p-0 overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-shadow">
                            <div className={`p-4 bg-gradient-to-r ${index % 2 === 0 ? 'from-kids-blue/45 to-kids-purple/45' : 'from-kids-green/45 to-kids-teal/45'} border-b-2 border-gray-100`}>
                                <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                                    <span className="text-3xl">{scenario.icon}</span>
                                    Scenario {scenario.id}: {scenario.title}
                                </h3>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="mb-6">
                                    <p className="text-xl font-medium text-gray-800 mb-4 bg-white/90 p-4 rounded-xl border-2 border-gray-200 shadow-sm hover:border-kids-teal/30 transition-colors">
                                        "{scenario.scenario}"
                                    </p>

                                    <div className="mb-6">
                                        <h4 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-2">Think About:</h4>
                                        <ul className="space-y-1">
                                            {scenario.thinkAbout.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                    <span className="text-kids-teal">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-kids-green/10 p-5 rounded-2xl border-2 border-kids-green/20 hover:scale-[1.02] transition-transform">
                                        <h4 className="font-bold mb-3 text-green-700 flex items-center gap-2 text-lg">
                                            <CheckCircle className="w-6 h-6" />
                                            Better Choice:
                                        </h4>
                                        <p className="text-gray-800 font-medium leading-relaxed">{scenario.goodChoice}</p>
                                    </div>
                                    <div className="bg-kids-red/10 p-5 rounded-2xl border-2 border-kids-red/20 hover:scale-[1.02] transition-transform">
                                        <h4 className="font-bold mb-3 text-red-700 flex items-center gap-2 text-lg">
                                            <XCircle className="w-6 h-6" />
                                            Problematic Choice:
                                        </h4>
                                        <p className="text-gray-800 font-medium leading-relaxed">{scenario.badChoice}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </LessonLayout>
    );
};

export default AIEthicsScenariosActivity;
