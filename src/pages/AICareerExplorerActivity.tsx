import React from 'react';
import { Briefcase, Star, GraduationCap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import NarratedBox from '@/components/NarratedBox';
import { GlassCard } from '@/components/ui/GlassCard';

const AICareerExplorerActivity = () => {
    const careers = [
        {
            title: "Machine Learning Engineer",
            emoji: "🤖",
            description: "Builds and trains AI models to solve real-world problems",
            skills: ["Programming (Python)", "Math", "Logic"],
            coolFact: "They teach computers to learn from data, just like you learned here!",
            color: "blue"
        },
        {
            title: "AI Ethics Specialist",
            emoji: "⚖️",
            description: "Makes sure AI is fair, safe, and used responsibly",
            skills: ["Critical Thinking", "Empathy", "Communication"],
            coolFact: "They are the superheroes who protect people from bad AI!",
            color: "green"
        },
        {
            title: "Data Scientist",
            emoji: "📊",
            description: "Finds patterns and insights in huge amounts of data",
            skills: ["Statistics", "Detecting Patterns", "Visualization"],
            coolFact: "They are like detectives who solve mysteries hidden in numbers!",
            color: "purple"
        },
        {
            title: "Robotics Engineer",
            emoji: "🦾",
            description: "Designs and builds robots powered by AI",
            skills: ["Engineering", "Creativity", "Mechanics"],
            coolFact: "They create real robots that can see, move, and help people!",
            color: "orange"
        }
    ];

    return (
        <LessonLayout
            title="AI Career Explorer"
            subtitle="Discover exciting jobs of the future!"
            backLink="/lessons/future-of-ai"
            backLabel="Back to Lesson"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Narrated Box */}
                <NarratedBox
                    text="The future is going to need lots of people who understand AI. Whether you love math, art, writing, or helping people, there's a cool AI job waiting for you. Let's explore some of them!"
                    className="bg-gradient-to-r from-kids-orange/45 to-red-500/10 border-2 border-kids-orange/30 p-8 rounded-3xl shadow-xl relative overflow-hidden"
                    showText={false}
                >
                    {/* Decorative Background Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-kids-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 -z-10" />

                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-kids-orange">
                        🚀 Your Future in AI
                    </h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-700">
                        AI is one of the fastest-growing fields in the world! There are so many exciting careers where you can work with AI.
                    </p>

                    <div className="bg-white/90 p-6 rounded-2xl border-2 border-kids-orange/20 shadow-sm hover:border-kids-orange/40 transition-colors">
                        <h4 className="font-bold mb-3 text-kids-orange flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            Did You Know?
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="text-xl">📈</span>
                                <span>AI jobs are growing super fast!</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-xl">🎨</span>
                                <span>You don't just need math — creativity is huge too!</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-xl">🏥</span>
                                <span>AI is used in medicine, movies, space, and sports!</span>
                            </li>
                        </ul>
                    </div>
                </NarratedBox>

                {/* Career Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {careers.map((career, index) => (
                        <GlassCard
                            key={index}
                            className="hover:scale-[1.02] transition-transform duration-300 border-2 border-transparent hover:border-kids-orange/30"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-5xl">{career.emoji}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
                                    <p className="text-sm text-gray-600">{career.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-white/90 p-3 rounded-xl border-2 border-kids-orange/10 hover:border-kids-orange/30 transition-colors">
                                    <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Cool Fact:</h4>
                                    <p className="text-sm text-gray-700 italic">{career.coolFact}</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Skills Needed:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {career.skills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* How to Prepare */}
                <GlassCard variant="blue" className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-kids-blue">
                                <GraduationCap className="w-8 h-8" />
                                How to Prepare
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue/50 transition-colors">
                                    <h4 className="font-bold mb-2 text-kids-blue">In School:</h4>
                                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                                        <li>Focus on math & science</li>
                                        <li>Learn to code (like Scratch!)</li>
                                        <li>Join robotics clubs</li>
                                    </ul>
                                </div>
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green/50 transition-colors">
                                    <h4 className="font-bold mb-2 text-kids-green">At Home:</h4>
                                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                                        <li>Build simple projects</li>
                                        <li>Read about technology</li>
                                        <li>Stay curious!</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </LessonLayout>
    );
};

export default AICareerExplorerActivity;
