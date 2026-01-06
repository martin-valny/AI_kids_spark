
import React from 'react';
import { Brain, Zap, Sparkles } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import MachineLearningSteps from '@/components/MachineLearningSteps';
import ActivityCard from '@/components/ActivityCard';

const MachineLearningBasics = () => {
    const activities = [
        {
            id: "train-drawing-recognizer",
            title: "Train Your Drawing Recognizer",
            description: "Teach an AI to recognize your drawings",
            path: "/activities/train-drawing-recognizer",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
            difficulty: "Easy" as const,
            estimatedTime: "15-20 min"
        },
        {
            id: "guess-who-ai-edition",
            title: "Guess Who: AI Edition",
            description: "Play a pattern recognition game",
            path: "/activities/guess-who-ai-edition",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            difficulty: "Medium" as const,
            estimatedTime: "10-15 min"
        }
    ];

    return (
        <LessonLayout
            title="Machine Learning Basics"
            subtitle="Discover how machines learn from data"
            backLink="/lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Section */}
                <GlassCard variant="blue" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
                            <div className="text-4xl">🧠</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🧠 What is Machine Learning?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Machine Learning is how computers learn from examples instead of being told exactly what to do.
                                It's like how you learn to recognize dogs after seeing many different dogs, rather than someone
                                explaining all the rules about what makes a dog a dog.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Video Section */}
                <GlassCard variant="purple" className="p-8">
                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        📺 Watch: Machine Learning Explained
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            src="https://www.youtube.com/embed/QghjaS0WQQU"
                            title="Machine Learning Explained"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </GlassCard>

                {/* How ML Powers AI - Split Screen */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8 text-kids-purple" />
                        How Machine Learning Powers AI
                    </h2>

                    <GlassCard variant="blue" className="p-8 md:p-12">
                        <p className="text-lg mb-8 text-center text-gray-700">
                            Remember all those amazing AI examples? Machine learning is what makes them all work!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 shadow-sm hover:border-kids-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-kids-blue mb-3 flex items-center gap-2">
                                    🗣️ Voice Assistants (Siri, Alexa)
                                </h4>
                                <p className="text-sm mb-2">
                                    <strong>The AI:</strong> Understands what you say and responds helpfully
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Trained on millions of voice recordings to recognize speech patterns
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 shadow-sm hover:border-kids-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-kids-purple mb-3 flex items-center gap-2">
                                    📸 Photo Recognition
                                </h4>
                                <p className="text-sm mb-2">
                                    <strong>The AI:</strong> Automatically tags faces and suggests who people are
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Learned from billions of labeled photos to recognize faces
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 shadow-sm hover:border-kids-green hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-kids-green mb-3 flex items-center gap-2">
                                    🎵 Music Recommendations
                                </h4>
                                <p className="text-sm mb-2">
                                    <strong>The AI:</strong> Suggests new songs you'll probably love
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Analyzes your listening history and finds patterns with other users
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 shadow-sm hover:border-kids-red hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-kids-red mb-3 flex items-center gap-2">
                                    🎮 Smart Game Characters
                                </h4>
                                <p className="text-sm mb-2">
                                    <strong>The AI:</strong> Game characters that get better the more you play
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Learns from thousands of games to understand winning strategies
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-kids-yellow/20 rounded-xl border border-kids-yellow/30">
                            <p className="text-center font-medium text-lg">
                                💡 <strong>Key Insight:</strong> Machine Learning is like the "brain training" that gives AI systems their intelligence! Without ML, AI would just be regular computer programs following simple rules!
                            </p>
                        </div>
                    </GlassCard>
                </section>

                {/* Types of Learning - Split Screen */}
                <section>
                    <div className="text-center mb-8">
                        <p className="text-xl font-medium text-kids-blue mb-4">
                            🔄 Now let's look at how machines actually learn! There are different ways they can do it...
                        </p>
                    </div>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Brain className="w-8 h-8 text-kids-green" />
                        Types of Learning
                    </h2>
                    <p className="text-lg mb-8 text-center text-gray-700">
                        There are different ways machines can learn — with help, or all by themselves!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GlassCard variant="blue" className="overflow-hidden p-0">
                            <div className="p-8 space-y-4">
                                <h3 className="font-bold text-2xl text-kids-blue flex items-center gap-2">
                                    👨‍🏫 Supervised Learning
                                </h3>
                                <p className="text-sm italic text-kids-blue/70">Like learning with a teacher</p>
                                <p className="text-gray-700 leading-relaxed">
                                    We give the computer examples with the correct answers. It's like flashcards where
                                    a teacher shows you the right answers so you can learn.
                                </p>
                                <div className="bg-kids-blue/30 p-4 rounded-xl border border-kids-blue/40">
                                    <p className="text-sm font-medium">
                                        <strong>Real Example:</strong> Showing thousands of photos labeled "cat" or "dog" so the computer learns to tell them apart.
                                    </p>
                                </div>
                            </div>
                            <div className="h-32 bg-gradient-to-br from-kids-blue/80 to-cyan-500/80 flex items-center justify-center">
                                <div className="text-6xl">📚</div>
                            </div>
                        </GlassCard>

                        <GlassCard variant="purple" className="overflow-hidden p-0">
                            <div className="p-8 space-y-4">
                                <h3 className="font-bold text-2xl text-kids-purple flex items-center gap-2">
                                    🔍 Unsupervised Learning
                                </h3>
                                <p className="text-sm italic text-kids-purple/70">Learning by finding patterns</p>
                                <p className="text-gray-700 leading-relaxed">
                                    We give the computer examples without answers. It finds patterns on its own.
                                    Like sorting toys by color without being told how.
                                </p>
                                <div className="bg-kids-purple/30 p-4 rounded-xl border border-kids-purple/40">
                                    <p className="text-sm font-medium">
                                        <strong>Real Example:</strong> Giving customer shopping data and discovering different types of shoppers.
                                    </p>
                                </div>
                            </div>
                            <div className="h-32 bg-gradient-to-br from-kids-purple/80 to-kids-pink/80 flex items-center justify-center">
                                <div className="text-6xl">🧩</div>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {/* ML in Action - Split Screen */}
                <section>
                    <div className="text-center mb-8">
                        <p className="text-xl font-medium text-kids-purple mb-4">
                            ⚡ Ready to see machine learning in action? Let's explore some amazing real-world examples!
                        </p>
                    </div>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-kids-orange" />
                        Machine Learning in Action!
                    </h2>

                    <GlassCard variant="orange" className="p-8 md:p-12">
                        <p className="text-lg mb-8 text-center text-gray-700">
                            Machine learning is working behind the scenes in so many places. Here are some you might recognize!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-blue/20 hover:border-kids-blue hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-blue mb-3 flex items-center gap-2">
                                    📱 Your Phone's Camera
                                </h4>
                                <p className="text-sm text-gray-700">
                                    When your phone automatically focuses on faces — that's machine learning recognizing where people are in the photo!
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-green/20 hover:border-kids-green hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-green mb-3 flex items-center gap-2">
                                    🛒 Online Shopping
                                </h4>
                                <p className="text-sm text-gray-700">
                                    "People who bought this also bought..." comes from ML finding patterns in what customers like to buy together.
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-purple/20 hover:border-kids-purple hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-purple mb-3 flex items-center gap-2">
                                    🎮 Video Games
                                </h4>
                                <p className="text-sm text-gray-700">
                                    Some video game characters get better the more you play — that's machine learning helping them adapt!
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-red/20 hover:border-kids-red hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-red mb-3 flex items-center gap-2">
                                    🌍 Language Translation
                                </h4>
                                <p className="text-sm text-gray-700">
                                    Google Translate uses machine learning to understand different languages and translate between them instantly!
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* MachineLearningSteps Component */}
                <section>
                    <div className="text-center mb-8">
                        <p className="text-xl font-medium text-kids-green mb-4">
                            🔬 Want to see the step-by-step process? Let's break down exactly how a computer learns!
                        </p>
                    </div>
                    <MachineLearningSteps />
                </section>

                {/* Amazing Facts */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <span className="text-4xl">🤯</span>
                        Did You Know? Amazing ML Facts!
                    </h2>

                    <GlassCard className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl border border-white/20">
                                <h4 className="font-bold text-kids-blue mb-3 flex items-center gap-2">
                                    🧠 Super Speed Learning
                                </h4>
                                <p className="text-sm text-gray-700">
                                    A machine learning system can "read" and learn from 1 million books in the time it takes you to read one page!
                                    That's like having a super-powered brain! 🚀
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border border-white/20">
                                <h4 className="font-bold text-kids-green mb-3 flex items-center gap-2">
                                    🎨 Creative Machines
                                </h4>
                                <p className="text-sm text-gray-700">
                                    AI has learned to paint pictures, compose music, and even write stories! Some AI-created art has sold for thousands of dollars at art galleries! 🎭
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border border-white/20">
                                <h4 className="font-bold text-kids-purple mb-3 flex items-center gap-2">
                                    🐕 Animal Expert
                                </h4>
                                <p className="text-sm text-gray-700">
                                    There's an AI that can identify over 300 different dog breeds just by looking at a photo — even better than most veterinarians! 🐶
                                </p>
                            </div>
                            <div className="bg-white/90 p-6 rounded-xl border border-white/20">
                                <h4 className="font-bold text-kids-red mb-3 flex items-center gap-2">
                                    🌟 Pattern Master
                                </h4>
                                <p className="text-sm text-gray-700">
                                    Machine learning can find patterns in data that humans would never notice, like predicting which songs will become popular! 🎵
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Quick Quiz */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <span className="text-4xl">🎯</span>
                        Quick Quiz: Test Your ML Knowledge!
                    </h2>

                    <GlassCard variant="blue" className="p-8 mb-6">
                        <h3 className="text-xl font-bold text-kids-blue mb-4">
                            Question 1: What's the difference between supervised and unsupervised learning?
                        </h3>
                        <div className="bg-white/95 p-4 rounded-xl border border-kids-blue/30 shadow-sm">
                            <p className="text-sm font-medium">
                                💡 <strong>Hint:</strong> Think about whether the computer gets "answer sheets" or has to figure things out on its own!
                            </p>
                        </div>
                    </GlassCard>

                    <GlassCard variant="purple" className="p-8 mb-6">
                        <h3 className="text-xl font-bold text-kids-purple mb-4">
                            Question 2: Can you think of 3 ways you use machine learning every day?
                        </h3>
                        <div className="bg-white/95 p-4 rounded-xl border border-kids-purple/30 shadow-sm">
                            <p className="text-sm font-medium">
                                💡 <strong>Hint:</strong> Look at your phone, think about websites you visit, or games you play!
                            </p>
                        </div>
                    </GlassCard>

                    <GlassCard variant="green" className="p-8">
                        <h3 className="text-xl font-bold text-kids-green mb-4">
                            Bonus Challenge: What would you teach an AI to recognize?
                        </h3>
                        <div className="bg-kids-green/10 p-4 rounded-xl border border-kids-green/20">
                            <p className="text-sm font-medium">
                                💡 <strong>Think:</strong> What would be fun or helpful for a computer to learn how to identify?
                            </p>
                        </div>
                    </GlassCard>
                </section>

                {/* Summary */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🎯 What We Learned About Machine Learning
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
                            <div className="text-4xl mb-4">🧠</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Machines learn from examples</h3>
                            <p className="text-sm text-gray-600">Just like humans, but much faster!</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="font-bold mb-2 text-kids-purple">Powers all AI systems</h3>
                            <p className="text-sm text-gray-600">From voice assistants to game characters</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-bold mb-2 text-kids-green">Gets better with practice</h3>
                            <p className="text-sm text-gray-600">More data means smarter AI!</p>
                        </div>
                    </div>

                    <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
                        <h4 className="text-xl font-bold mb-3">
                            🎯 Coming Up Next: Hands-On Fun!
                        </h4>
                        <p className="text-lg">
                            In the activity section, you'll get to train a simple AI to recognize drawings.
                            You'll draw shapes, and teach the computer what each shape is! It's like being an AI teacher!
                            <span className="font-bold text-kids-blue"> Ready to become an AI trainer?</span> 🚀
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

export default MachineLearningBasics;
