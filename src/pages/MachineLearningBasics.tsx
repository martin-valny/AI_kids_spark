
import React from 'react';
import { Brain, Zap, Sparkles } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import MachineLearningSteps from '@/components/MachineLearningSteps';
import ActivityCard from '@/components/ActivityCard';
import { InnerCard, CardGrid, HighlightBox } from '@/components/design-system';

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
                                Machine Learning enables computers to identify patterns in data and make predictions without explicit programming for every scenario.
                                Instead of following rigid rules, ML algorithms improve their performance by analyzing examples and adjusting their internal parameters—similar to how the human brain recognizes patterns through exposure and experience.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Video Section */}
                <GlassCard variant="purple" className="p-8">
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-2xl">
                        <p className="font-semibold text-purple-900 mb-2">📺 Recommended Watch</p>
                        <p className="text-gray-700">
                            This video breaks down how machines learn from patterns and data. Watch to understand
                            the core concepts behind machine learning, then complete the hands-on activities below to
                            see pattern recognition in action.
                        </p>
                    </div>
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
                            Machine learning powers the AI applications transforming creative industries and digital experiences. Here's how ML drives modern platforms:
                        </p>

                        <CardGrid columns={2}>
                            <InnerCard color="blue" title="🗣️ Voice Assistants (Siri, Alexa)">
                                <p className="text-sm mb-2">
                                    <strong>The Application:</strong> Natural language understanding and contextual response generation
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Deep neural networks trained on billions of audio samples, processing speech recognition, intent classification, and semantic understanding
                                </p>
                            </InnerCard>

                            <InnerCard color="purple" title="📸 Computer Vision">
                                <p className="text-sm mb-2">
                                    <strong>The Application:</strong> Facial recognition, object detection, and automated image tagging
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Convolutional Neural Networks (CNNs) trained on massive image datasets, learning hierarchical visual features from edges to complex objects
                                </p>
                            </InnerCard>

                            <InnerCard color="green" title="🎵 Recommendation Systems (Spotify, Netflix)">
                                <p className="text-sm mb-2">
                                    <strong>The Application:</strong> Personalized content discovery based on user preferences and behavior
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Collaborative filtering and deep learning models analyze listening patterns, engagement signals, and similarities across millions of users to predict preferences
                                </p>
                            </InnerCard>

                            <InnerCard color="red" title="🎮 Adaptive Game AI">
                                <p className="text-sm mb-2">
                                    <strong>The Application:</strong> Dynamic difficulty adjustment and intelligent NPC behavior
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>The ML Behind It:</strong> Reinforcement learning agents train through millions of simulated games, learning optimal strategies and adapting to player skill levels
                                </p>
                            </InnerCard>
                        </CardGrid>

                        <HighlightBox variant="tip" showIcon={false} className="mt-8 p-6">
                            <p className="text-center font-medium text-lg">
                                💡 <strong>Key Insight:</strong> Machine Learning is the foundational technology that enables AI to generalize from examples. Traditional programming uses explicit instructions; ML discovers patterns in data to make intelligent decisions.
                            </p>
                        </HighlightBox>
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
                                <p className="text-sm italic text-kids-blue/70">Learning from labeled training data</p>
                                <p className="text-gray-700 leading-relaxed">
                                    The algorithm receives input-output pairs (features and labels) and learns to map inputs to correct outputs. Used extensively in classification and regression tasks.
                                </p>
                                <div className="bg-kids-blue/30 p-4 rounded-xl border border-kids-blue/40">
                                    <p className="text-sm font-medium">
                                        <strong>Industry Application:</strong> Image classification models trained on millions of labeled images power content moderation, medical diagnosis, and creative tools like style transfer.
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
                                <p className="text-sm italic text-kids-purple/70">Discovering hidden patterns in unlabeled data</p>
                                <p className="text-gray-700 leading-relaxed">
                                    The algorithm identifies structure and relationships in data without predefined labels. Essential for clustering, dimensionality reduction, and anomaly detection.
                                </p>
                                <div className="bg-kids-purple/30 p-4 rounded-xl border border-kids-purple/40">
                                    <p className="text-sm font-medium">
                                        <strong>Industry Application:</strong> Customer segmentation for targeted marketing, content recommendation systems, and identifying emerging trends in user behavior without explicit categories.
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
                            ML algorithms power critical systems across industries, often invisible but essential to modern digital experiences:
                        </p>
                        <CardGrid columns={2}>
                            <InnerCard color="blue" title="📱 Computational Photography" description="Real-time scene detection, portrait mode depth mapping, and low-light enhancement use ML to transform smartphone photography into professional-quality imaging." />
                            <InnerCard color="green" title="🛒 E-Commerce Optimization" description="Product recommendations, dynamic pricing, fraud detection, and inventory prediction leverage ML to process billions of transactions and optimize the shopping experience." />
                            <InnerCard color="purple" title="🎮 Procedural Content Generation" description="Modern games use ML for level design, character behavior, dialogue generation, and balancing—creating unique experiences that adapt to individual players." />
                            <InnerCard color="red" title="🌍 Neural Machine Translation" description="Transformer models trained on parallel text corpora enable near-instantaneous translation across languages, maintaining context and cultural nuance." />
                        </CardGrid>
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
                        <CardGrid columns={2}>
                            <InnerCard color="blue" title="🧠 Processing Scale" description="Large language models process billions of parameters across trillions of tokens during training, enabling capabilities that emerge from scale rather than explicit programming." />
                            <InnerCard color="green" title="🎨 Generative AI" description="Diffusion models and GANs create professional-quality art, music, and video. AI-generated works have sold at major auction houses and entered gallery collections." />
                            <InnerCard color="purple" title="🐕 Fine-Grained Classification" description="Computer vision models achieve superhuman accuracy in specialized tasks like species identification, medical imaging analysis, and quality control—surpassing expert human performance." />
                            <InnerCard color="red" title="🌟 Trend Prediction" description="ML algorithms analyze streaming data, social signals, and engagement patterns to forecast cultural trends, hit songs, and viral content before they peak." />
                        </CardGrid>
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

                    <HighlightBox variant="tip" showIcon={false} className="mt-8 p-6 text-center">
                        <h4 className="text-xl font-bold mb-3">
                            🎯 Career Pathways in Machine Learning
                        </h4>
                        <p className="text-lg">
                            ML expertise opens doors to roles like <strong>Machine Learning Engineer</strong> (building and deploying models), <strong>Data Scientist</strong> (extracting insights from data), and <strong>AI Research Scientist</strong> (advancing the field). Creative applications include <strong>AI Artist</strong>, <strong>Computational Designer</strong>, and <strong>ML Product Manager</strong>.
                        </p>
                        <p className="text-sm text-gray-600 mt-3 italic">
                            Explore ML concepts hands-on in the activities below.
                        </p>
                    </HighlightBox>
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

export default MachineLearningBasics;
