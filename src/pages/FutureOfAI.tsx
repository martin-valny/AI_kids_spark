
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
                                AI development continues to accelerate across research frontiers—from multimodal models combining vision, language, and audio to autonomous systems reshaping industries. Understanding emerging trends positions you to capitalize on opportunities in this rapidly evolving field.
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
                            <h3 className="font-bold text-2xl text-kids-purple mb-4">🎨 Generative AI Evolution</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Next-generation models will offer fine-grained control over style, composition, and narrative—enabling creators to iterate rapidly from concept to production-ready assets in film, gaming, and advertising.
                            </p>
                        </GlassCard>

                        <GlassCard variant="green" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-green mb-4">🎵 AI in Music Production</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Advanced AI will handle mixing, mastering, and stem separation while generating custom soundscapes—transforming music production workflows and democratizing professional-quality audio creation.
                            </p>
                        </GlassCard>

                        <GlassCard variant="blue" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-blue mb-4">🎬 Autonomous Video Production</h3>
                            <p className="text-gray-700 leading-relaxed">
                                AI-driven editing, color grading, and effects generation will accelerate post-production timelines, enabling independent creators to achieve cinematic quality without large production budgets.
                            </p>
                        </GlassCard>

                        <GlassCard variant="red" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-red mb-4">🕹️ Procedural Content in Gaming</h3>
                            <p className="text-gray-700 leading-relaxed">
                                AI will generate dynamic game worlds, adaptive narratives, and personalized experiences—each playthrough unique, driven by player behavior and preferences analyzed in real-time.
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
                            Build skills that position you for emerging roles at the intersection of AI and creative industries:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-blue mb-2">💻 Master Programming & ML</h4>
                                <p className="text-gray-700">Python, PyTorch, TensorFlow—foundational tools for implementing and fine-tuning models</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-2">📊 Understand Data Pipelines</h4>
                                <p className="text-gray-700">Data collection, cleaning, and preprocessing determine model quality and performance</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-green mb-2">🎨 Develop Creative-Technical Fluency</h4>
                                <p className="text-gray-700">Combine artistic vision with technical implementation to direct AI tools effectively</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 hover:border-kids-red shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-red mb-2">🔬 Engage with Research</h4>
                                <p className="text-gray-700">Follow arXiv papers, implement novel architectures, contribute to open-source projects</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl md:col-span-2 border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-2">🧠 Study Cognitive Science & Design</h4>
                                <p className="text-gray-700">Understanding human perception and UX principles informs better AI product development</p>
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
                                <h4 className="font-bold text-lg text-kids-blue mb-3">🎨 AI Creative Director</h4>
                                <p className="text-gray-700">Leading creative teams using generative AI for advertising, film production, and brand development—combining artistic vision with technical AI literacy</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-green mb-3">🔬 ML Research Engineer</h4>
                                <p className="text-gray-700">Developing novel architectures, optimizing training procedures, and publishing research advancing the state of the art in AI capabilities</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-purple mb-3">⚖️ AI Ethics & Policy Specialist</h4>
                                <p className="text-gray-700">Shaping regulations, conducting bias audits, and ensuring responsible AI deployment across industries and governmental applications</p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 hover:border-kids-red shadow-sm transition-colors">
                                <h4 className="font-bold text-lg text-kids-red mb-3">🎵 AI Music Producer</h4>
                                <p className="text-gray-700">Composing with generative models, creating custom sound design, and producing adaptive game soundtracks using AI-assisted workflows</p>
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
                            💡 Industry Insight
                        </h4>
                        <p className="text-lg">
                            The creative AI market is projected to grow exponentially. <strong>Prompt engineering</strong>, <strong>AI fine-tuning</strong>, and <strong>model evaluation</strong> are becoming essential skills. Professionals who combine domain expertise (art, music, design) with AI proficiency command premium positions in entertainment, advertising, and tech.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-kids-blue/15 to-kids-purple/15 border-2 border-kids-blue/40 p-8 rounded-xl mt-8">
                        <h4 className="text-2xl font-bold mb-4 text-center">
                            🎓 Next Steps in Your AI Journey
                        </h4>
                        <p className="text-lg text-center text-gray-700 mb-4">
                            You've completed foundational AI concepts. Continue building expertise through hands-on projects, research paper implementation, and open-source contributions. The field evolves rapidly—staying current with arxiv.org, attending conferences, and experimenting with cutting-edge tools positions you at the forefront of creative AI innovation.
                        </p>
                        <p className="text-sm text-gray-600 italic text-center">
                            Resources: Hugging Face transformers, PyTorch tutorials, Papers with Code, AI alignment research, and creative AI communities on Discord and GitHub.
                        </p>
                    </div>
                </GlassCard>

                {/* Activities Section */}
                {activities.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                            <Sparkles className="w-8 h-8 text-kids-yellow" />
                            Hands-on Activities
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
