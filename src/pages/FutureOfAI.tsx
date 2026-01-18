
import React from 'react';
import { Sparkles, Brain, Users } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import ActivityCard from '@/components/ActivityCard';

const FutureOfAI = () => {
    const activities = [
        {
            id: "future-ai-invention",
            title: "Design a Future AI Invention",
            description: "Imagine and draw an AI device from the future",
            path: "/activities/future-ai-invention",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
            difficulty: "Easy" as const,
            estimatedTime: "15-20 min"
        },
        {
            id: "ai-career-explorer",
            title: "AI Career Explorer",
            description: "Discover what AI job might be right for you",
            path: "/activities/ai-career-explorer",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            difficulty: "Medium" as const,
            estimatedTime: "10-15 min"
        }
    ];

    return (
        <LessonLayout
            title="The Future of AI"
            subtitle="What's next in the world of AI?"
            backLink="/lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Section */}
                <GlassCard variant="blue" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
                            <div className="text-4xl">🚀</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🚀 The Future of AI
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Artificial Intelligence is still growing and changing. Scientists and engineers are working on new AI technologies every day. Let's explore what AI might be like in the future!
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Video Section */}
                <GlassCard variant="purple" className="p-8">
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-2xl">
                        <p className="font-semibold text-purple-900 mb-2">📺 Recommended Watch</p>
                        <p className="text-gray-700">
                            This video explores emerging AI technologies and future possibilities. Watch to envision
                            how AI will shape tomorrow's world, then imagine your own AI innovations
                            in the creative activities below.
                        </p>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        📺 Watch: The Future of AI
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            src="https://www.youtube.com/embed/ftxs3nQ6YpQ"
                            title="The Future of AI"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </GlassCard>

                {/* Future AI Technologies */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-kids-purple" />
                        Future AI Technologies
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <GlassCard variant="purple" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-purple mb-4">🤖 Smarter Robots</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Future robots might be able to do more complex tasks, like helping around the house, assisting elderly people, or working in dangerous environments where humans can't go.
                            </p>
                        </GlassCard>

                        <GlassCard variant="green" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-green mb-4">📚 AI Teachers</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Imagine having an AI tutor that knows exactly how you learn best and can teach any subject in a way that makes sense to you, available whenever you have questions!
                            </p>
                        </GlassCard>

                        <GlassCard variant="blue" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-blue mb-4">🏥 Medical Breakthroughs</h3>
                            <p className="text-gray-700 leading-relaxed">
                                AI could help doctors discover new medicines and treatments by analyzing huge amounts of medical information faster than any human could.
                            </p>
                        </GlassCard>

                        <GlassCard variant="red" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-red mb-4">🏙️ Smart Cities</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Cities might use AI to manage traffic, reduce pollution, save energy, and make life better and safer for the people who live there.
                            </p>
                        </GlassCard>
                    </div>
                </section>

                {/* How Can You Be Part */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-kids-yellow" />
                        How Can You Be Part of AI's Future?
                    </h2>

                    <GlassCard variant="yellow" className="p-8 md:p-12">
                        <h3 className="font-bold text-2xl text-kids-yellow mb-6 text-center">Learn and Explore</h3>
                        <p className="text-lg mb-6 text-center text-gray-700">
                            There are many ways you can prepare to be part of AI's exciting future:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-blue mb-2">💻 Learn to code</h4>
                                <p className="text-gray-700">Programming is the language AI speaks</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-2">🔢 Study math</h4>
                                <p className="text-gray-700">Math is the foundation of AI</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-green mb-2">🎨 Be creative</h4>
                                <p className="text-gray-700">AI needs creative thinkers to solve problems</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 hover:border-kids-red shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-red mb-2">🤔 Stay curious</h4>
                                <p className="text-gray-700">Always ask questions and keep learning</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl md:col-span-2 border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-2">⚖️ Think ethically</h4>
                                <p className="text-gray-700">Consider how technology affects people</p>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* AI Jobs of the Future */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Brain className="w-8 h-8 text-kids-purple" />
                        AI Jobs of the Future
                    </h2>

                    <GlassCard variant="purple" className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-blue mb-3">🎓 AI Trainer</h4>
                                <p className="text-gray-700">Teaching AI systems how to understand human behavior</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-green mb-3">🤖 Robot Designer</h4>
                                <p className="text-gray-700">Creating helpful robots for homes and businesses</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-3">⚖️ AI Ethics Expert</h4>
                                <p className="text-gray-700">Making sure AI is fair and used responsibly</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 hover:border-kids-red shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-red mb-3">🎨 AI Artist</h4>
                                <p className="text-gray-700">Working with AI to create new forms of art and entertainment</p>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Summary */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🎯 What We Learned
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="font-bold mb-2 text-kids-blue">AI is still evolving</h3>
                            <p className="text-sm text-gray-600">New technologies are being developed every day</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="font-bold mb-2 text-kids-purple">You can be part of it</h3>
                            <p className="text-sm text-gray-600">Learn, explore, and stay curious</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">🌟</div>
                            <h3 className="font-bold mb-2 text-kids-green">Exciting careers await</h3>
                            <p className="text-sm text-gray-600">Many AI jobs haven't been invented yet!</p>
                        </div>
                    </div>

                    <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
                        <h4 className="text-xl font-bold mb-3">
                            🤯 Fun Fact!
                        </h4>
                        <p className="text-lg">
                            Many of the jobs that will exist when you grow up haven't even been invented yet! Just like people 30 years ago couldn't imagine jobs like "social media manager" or "app developer," there will be exciting new AI careers in your future!
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-kids-blue/15 to-kids-purple/15 border-2 border-kids-blue/40 p-8 rounded-xl mt-8">
                        <h4 className="text-2xl font-bold mb-4 text-center">
                            🎓 Congratulations!
                        </h4>
                        <p className="text-lg text-center text-gray-700">
                            You've completed all the AI lessons! You now understand the basics of artificial intelligence, how it works, and how it might shape our future. Keep learning, stay curious, and remember to use technology responsibly! 🌟
                        </p>
                    </div>
                </GlassCard>

                {/* Activities Section */}
                {activities.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                            <Sparkles className="w-8 h-8 text-kids-yellow" />
                            Fun Activities
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activities.map((activity) => (
                                <ActivityCard key={activity.id} {...activity} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};

export default FutureOfAI;
