
import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import ActivityCard from '@/components/ActivityCard';
import { InnerCard, CardGrid, HighlightBox } from '@/components/design-system';

const IntroToAI = () => {
    const activities = [
        {
            id: "ai-detective",
            title: "AI Detective Game",
            description: "Identify AI in everyday objects and applications",
            path: "/activities/ai-detective",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
            difficulty: "Easy" as const,
            estimatedTime: "10-15 min"
        },
        {
            id: "draw-ai-friend",
            title: "Draw Your AI Friend",
            description: "Imagine and draw your own AI helper",
            path: "/activities/draw-ai-friend",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
            difficulty: "Easy" as const,
            estimatedTime: "15-20 min"
        }
    ];

    return (
        <LessonLayout
            title="Introduction to AI"
            subtitle="Learn what AI is and how it's used in everyday life"
            backLink="/lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Section */}
                <GlassCard variant="purple" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
                            <div className="text-4xl">🤖</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🤖 What is Artificial Intelligence?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Artificial Intelligence (AI) refers to computer systems that can process patterns in data to make predictions, generate content, and solve complex problems.
                                Through machine learning algorithms, AI systems can analyze massive datasets and improve their performance over time without explicit programming for every scenario.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Video Section */}
                <GlassCard variant="blue" className="p-8">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-2xl">
                        <p className="font-semibold text-blue-900 mb-2">📺 Recommended Watch</p>
                        <p className="text-gray-700">
                            This video provides an excellent introduction to artificial intelligence fundamentals. Watch to see
                            real-world examples of AI in action, then complete the hands-on activities below to
                            apply what you've learned.
                        </p>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        📺 Watch: What is AI?
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            src="https://www.youtube.com/embed/kQPC4_DsJ8I"
                            title="What is AI?"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </GlassCard>

                {/* Talk & Communicate - Split Screen */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-kids-purple" />
                        How We Use AI Every Day
                    </h2>

                    <GlassCard className="overflow-hidden p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-kids-purple/80 to-kids-blue/80 flex items-center justify-center order-2 lg:order-1">
                                <div className="text-9xl">🗣️</div>
                                <div className="absolute inset-0 bg-black/5"></div>
                            </div>
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
                                <h3 className="text-3xl font-bold text-gray-800">Talk & Communicate</h3>
                                <div className="space-y-4">
                                    <InnerCard color="purple" title="Voice Assistants" description="Siri, Alexa, and Google Assistant use natural language processing to understand speech patterns and respond to queries with contextual accuracy." className="p-4" />
                                    <InnerCard color="purple" title="Language Translation" description="Neural machine translation systems process over 100 languages, enabling real-time cross-cultural communication in business and creative industries." className="p-4" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Play & Entertainment - Split Screen */}
                <section>
                    <GlassCard variant="green" className="overflow-hidden p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-gray-800">Play & Entertainment</h3>
                                <div className="space-y-4">
                                    <InnerCard color="green" title="Adaptive Game AI" description="Modern games use reinforcement learning to create dynamic NPCs that adapt to player behavior, enhancing immersion and challenge." className="p-4" />
                                    <InnerCard color="green" title="Recommendation Algorithms" description="Streaming platforms analyze viewing patterns, engagement metrics, and collaborative filtering to personalize content discovery for millions of users." className="p-4" />
                                </div>
                            </div>
                            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-kids-green/80 to-kids-blue/80 flex items-center justify-center">
                                <div className="text-9xl">🎮</div>
                                <div className="absolute inset-0 bg-black/5"></div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Create & Capture - Split Screen */}
                <section>
                    <GlassCard variant="pink" className="overflow-hidden p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-kids-pink/80 to-kids-purple/80 flex items-center justify-center order-2 lg:order-1">
                                <div className="text-9xl">📸</div>
                                <div className="absolute inset-0 bg-black/5"></div>
                            </div>
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 lg:order-2">
                                <h3 className="text-3xl font-bold text-gray-800">Create & Capture</h3>
                                <div className="space-y-4">
                                    <InnerCard color="pink" title="Computer Vision" description="Advanced image recognition powers facial detection, object identification, and automated photo organization using convolutional neural networks." className="p-4" />
                                    <InnerCard color="pink" title="Generative AI" description="Tools like Midjourney, DALL-E, and Runway ML enable creators to generate professional-quality art, music, and video content through AI collaboration." className="p-4" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Cool AI Superpowers - Split Screen */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Brain className="w-8 h-8 text-kids-yellow" />
                        Cool AI Superpowers!
                    </h2>

                    <GlassCard variant="yellow" className="overflow-hidden p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    AI capabilities that seemed impossible just a decade ago are now transforming industries and creative workflows:
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue transition-colors duration-300">
                                        <h4 className="font-bold text-kids-blue mb-2">⚡ Processing Speed</h4>
                                        <p className="text-sm text-gray-700">
                                            Modern AI models can analyze <strong>millions of data points per second</strong>, enabling real-time applications in finance, healthcare, and creative production that would be impossible for human analysis alone.
                                        </p>
                                    </div>
                                    <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green transition-colors duration-300">
                                        <h4 className="font-bold text-kids-green mb-2">🎨 Creative Generation</h4>
                                        <p className="text-sm text-gray-700">
                                            Generative AI produces professional-quality artwork, music compositions, and written content.
                                            AI-created art has entered major galleries, with pieces <strong>selling for hundreds of thousands of dollars</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center bg-gradient-to-br from-kids-yellow/80 to-kids-orange/80">
                                <div className="space-y-4">
                                    <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple transition-colors duration-300">
                                        <h4 className="font-bold text-kids-purple mb-2">🌍 Multilingual Communication</h4>
                                        <p className="text-sm text-gray-700">
                                            Transformer-based language models provide <strong>near-instantaneous translation across 100+ languages</strong>, breaking down communication barriers in global business and creative collaboration.
                                        </p>
                                    </div>
                                    <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-red/20 hover:border-kids-red transition-colors duration-300">
                                        <h4 className="font-bold text-kids-red mb-2">🔬 Scientific Discovery</h4>
                                        <p className="text-sm text-gray-700">
                                            AI accelerates research in climate modeling, drug discovery, and materials science, identifying patterns in complex datasets that advance human knowledge and solve global challenges.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-kids-blue/10 p-4 rounded-xl text-center">
                                    <p className="text-sm font-medium">
                                        🌟 <strong>Observation Exercise:</strong> Identify three AI systems you interact with daily. Consider how each uses data to enhance your experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* AI vs Humans - Card Style */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8 text-kids-blue" />
                        AI vs. Humans: Different Superpowers!
                    </h2>

                    <GlassCard variant="blue" className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-kids-blue mb-4">🤖 AI Superpowers</h3>
                                <div className="space-y-3">
                                    <div className="bg-white/50 p-4 rounded-xl border-2 border-white/20 hover:border-kids-blue/30 transition-colors">
                                        <p className="font-medium">⚡ Lightning-fast calculations</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">📊 Analyzes huge amounts of data instantly</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">🎯 Masters specific tasks with training</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">🔋 Works 24/7 with power</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">📱 Perfect memory of everything</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-kids-purple mb-4">👨‍💻 Human Superpowers</h3>
                                <div className="space-y-3">
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">🧠 Creative problem-solving</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">💡 Original ideas and imagination</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">🌟 Learns many different things naturally</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">❤️ Has feelings and consciousness</p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                                        <p className="font-medium">🤝 Understands emotions and relationships</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* AI Timeline */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <span className="text-4xl">🕰️</span>
                        How AI Evolved: From Science Fiction to Your Phone!
                    </h2>

                    <GlassCard variant="orange" className="p-8">
                        <p className="text-lg mb-8 text-center text-gray-700">
                            AI has been growing and evolving for decades! Let's take a journey through the most exciting moments in AI history.
                        </p>

                        <div className="relative">
                            <div className="timeline-container overflow-x-auto pb-4">
                                <div className="flex items-center space-x-8 min-w-max">
                                    {/* 1956 */}
                                    <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                                        <div className="timeline-node w-4 h-4 bg-kids-blue rounded-full border-4 border-white shadow-lg"></div>
                                        <div className="timeline-year text-2xl font-bold text-kids-blue mt-2">1956</div>
                                        <div className="timeline-content bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                                            <div className="text-2xl mb-2">🧠</div>
                                            <h4 className="font-bold text-sm">AI Gets a Name!</h4>
                                            <p className="text-xs text-gray-600">Scientists decide to call smart machines "Artificial Intelligence" — the name we still use today!</p>
                                        </div>
                                    </div>

                                    <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-blue to-kids-green"></div>

                                    {/* 1997 */}
                                    <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                                        <div className="timeline-node w-4 h-4 bg-kids-green rounded-full border-4 border-white shadow-lg"></div>
                                        <div className="timeline-year text-2xl font-bold text-kids-green mt-2">1997</div>
                                        <div className="timeline-content bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                                            <div className="text-2xl mb-2">♟️</div>
                                            <h4 className="font-bold text-sm">Computer Beats Chess Master!</h4>
                                            <p className="text-xs text-gray-600">Deep Blue defeats the world's best chess player — something people thought was impossible!</p>
                                        </div>
                                    </div>

                                    <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-green to-kids-yellow"></div>

                                    {/* 2011 */}
                                    <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                                        <div className="timeline-node w-4 h-4 bg-kids-yellow rounded-full border-4 border-white shadow-lg"></div>
                                        <div className="timeline-year text-2xl font-bold text-kids-yellow mt-2">2011</div>
                                        <div className="timeline-content bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                                            <div className="text-2xl mb-2">📺</div>
                                            <h4 className="font-bold text-sm">AI on Game Show!</h4>
                                            <p className="text-xs text-gray-600">Watson goes on Jeopardy! and beats human contestants by answering tricky questions super fast!</p>
                                        </div>
                                    </div>

                                    <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-yellow to-kids-red"></div>

                                    {/* 2016 */}
                                    <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                                        <div className="timeline-node w-4 h-4 bg-kids-red rounded-full border-4 border-white shadow-lg"></div>
                                        <div className="timeline-year text-2xl font-bold text-kids-red mt-2">2016</div>
                                        <div className="timeline-content bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                                            <div className="text-2xl mb-2">🎮</div>
                                            <h4 className="font-bold text-sm">AI Wins Ancient Game!</h4>
                                            <p className="text-xs text-gray-600">AlphaGo masters Go, a board game that's been around for thousands of years!</p>
                                        </div>
                                    </div>

                                    <div className="timeline-line flex-1 h-1 bg-gradient-to-r from-kids-red to-kids-purple"></div>

                                    {/* 2023 */}
                                    <div className="timeline-item flex flex-col items-center text-center min-w-[200px]">
                                        <div className="timeline-node w-4 h-4 bg-kids-purple rounded-full border-4 border-white shadow-lg"></div>
                                        <div className="timeline-year text-2xl font-bold text-kids-purple mt-2">2023</div>
                                        <div className="timeline-content bg-white/40 backdrop-blur-sm p-4 rounded-lg shadow-md mt-2 max-w-[180px]">
                                            <div className="text-2xl mb-2">💬</div>
                                            <h4 className="font-bold text-sm">AI That Chats & Translates!</h4>
                                            <p className="text-xs text-gray-600">ChatGPT and similar AI can chat like friends and communicate in over 100 languages!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-kids-blue/20">
                            <p className="text-center text-sm">
                                <strong>Amazing Journey!</strong> From getting its name to chatting with us — that's almost 70 years of incredible progress!
                                <span className="font-bold text-kids-purple"> What do you think will happen next?</span> 🚀
                            </p>
                        </div>
                    </GlassCard>
                </section>

                {/* What We Learned Summary */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🧠 What We Learned About AI
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/20">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="font-bold mb-2 text-kids-blue">AI processes data to learn patterns</h3>
                            <p className="text-sm text-gray-600">Machine learning enables systems to improve through experience</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/20">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="font-bold mb-2 text-kids-green">AI powers everyday applications</h3>
                            <p className="text-sm text-gray-600">From recommendation systems to creative tools</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/20">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="font-bold mb-2 text-kids-purple">AI capabilities are rapidly advancing</h3>
                            <p className="text-sm text-gray-600">New breakthroughs expand what's possible in creative and technical fields</p>
                        </div>
                    </div>

                    <HighlightBox variant="tip" showIcon={false} className="mt-8 p-6 text-center">
                        <h4 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
                            💭 Reflection Question
                        </h4>
                        <p className="text-lg font-medium">
                            If you were building an AI application for creative professionals, what problem would it solve?
                            <span className="text-kids-blue"> Consider applications in art, music production, video editing, or content creation.</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-2 italic">
                            Explore this question through the hands-on activities below.
                        </p>
                    </HighlightBox>
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

export default IntroToAI;
