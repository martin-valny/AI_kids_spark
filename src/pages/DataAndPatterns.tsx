
import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import ActivityCard from '@/components/ActivityCard';
import { InnerCard, CardGrid, HighlightBox } from '@/components/design-system';

const DataAndPatterns = () => {
    const activities = [
        {
            id: "pattern-detective",
            title: "Pattern Detective",
            description: "Find and create patterns in different types of data",
            path: "/activities/pattern-detective",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            difficulty: "Easy" as const,
            estimatedTime: "12-18 min"
        },
        {
            id: "weather-predictor",
            title: "Weather Predictor",
            description: "Try predicting weather patterns with data",
            path: "/activities/weather-predictor",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
            difficulty: "Medium" as const,
            estimatedTime: "15-20 min"
        }
    ];

    return (
        <LessonLayout
            title="Data and Patterns"
            subtitle="Explore how AI finds patterns in data"
            backLink="/lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Intro Section */}
                <GlassCard variant="green" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
                            <div className="text-4xl">📊</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                📊 What is Data?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Data is the foundation of all AI systems—structured or unstructured information that algorithms analyze to identify patterns, make predictions, and generate insights. Quality data is essential: models are only as good as the data they're trained on.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Video Section */}
                <GlassCard variant="blue" className="p-8">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-2xl">
                        <p className="font-semibold text-blue-900 mb-2">📺 Recommended Watch</p>
                        <p className="text-gray-700">
                            This video explores how data powers AI and why patterns matter. Watch to discover
                            how AI recognizes trends and makes predictions, then practice identifying patterns yourself
                            in the activities below.
                        </p>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        📺 Watch: What is Data?
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            src="https://www.youtube.com/embed/CzFLDtvN_Xk"
                            title="What is Data?"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </GlassCard>

                {/* Types of Data */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-kids-blue" />
                        Types of Data AI Uses
                    </h2>
                            <p className="text-lg mb-8 text-center text-gray-700">
                        AI processes diverse data modalities, each requiring specialized preprocessing and model architectures:
                    </p>

                    <GlassCard variant="blue" className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-4 text-center">🖼️</div>
                                <h4 className="font-bold text-lg text-kids-blue mb-2 text-center">
                                    Pictures
                                </h4>
                                <p className="text-sm text-gray-600 text-center mb-3">
                                    Image data (pixels with RGB values) powers computer vision applications in creative tools, medical imaging, and autonomous systems through CNNs.
                                </p>
                                <div className="text-2xl text-center">
                                    📸 🎨 🖼️
                                </div>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-4 text-center">🔤</div>
                                <h4 className="font-bold text-lg text-kids-green mb-2 text-center">
                                    Text
                                </h4>
                                <p className="text-sm text-gray-600 text-center mb-3">
                                    Natural language data enables sentiment analysis, content generation, and semantic search through transformer-based models like GPT and BERT.
                                </p>
                                <div className="text-2xl text-center">
                                    📚 💬 📝
                                </div>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-4 text-center">🔢</div>
                                <h4 className="font-bold text-lg text-kids-purple mb-2 text-center">
                                    Numbers
                                </h4>
                                <p className="text-sm text-gray-600 text-center mb-3">
                                    Scores, temperatures, prices, and measurements that AI can calculate and find patterns in!
                                </p>
                                <div className="text-2xl text-center">
                                    📊 🌡️ 💰
                                </div>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-red/20 hover:border-kids-red hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-4 text-center">🔊</div>
                                <h4 className="font-bold text-lg text-kids-red mb-2 text-center">
                                    Sounds
                                </h4>
                                <p className="text-sm text-gray-600 text-center mb-3">
                                    Songs, voices, or animal noises that AI can listen to and recognize!
                                </p>
                                <div className="text-2xl text-center">
                                    🎵 🗣️ 🐶
                                </div>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-yellow/20 hover:border-kids-yellow hover:-translate-y-1 transition-all duration-300 md:col-span-2">
                                <div className="text-4xl mb-4 text-center">🎬</div>
                                <h4 className="font-bold text-lg text-kids-yellow mb-2 text-center">
                                    Videos
                                </h4>
                                <p className="text-sm text-gray-600 text-center mb-3">
                                    Moving pictures with sound that combine images and audio for AI to analyze!
                                </p>
                                <div className="text-2xl text-center">
                                    🎥 📱 🖥️
                                </div>
                            </div>
                        </div>
                        <HighlightBox variant="info" showIcon={false} className="mt-8 p-6 text-center">
                            <p className="font-medium text-lg">
                                👉 <strong>Key Point:</strong> AI needs data to spot patterns, make decisions, and improve. The more data it has, the smarter it can get!
                            </p>
                        </HighlightBox>
                    </GlassCard>
                </section>

                {/* Transition */}
                <div className="text-center">
                    <p className="text-xl font-medium text-kids-purple">
                        🧠 Now let's talk about patterns! What are they and why do they matter?
                    </p>
                </div>

                {/* What are Patterns - Split Screen */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Brain className="w-8 h-8 text-kids-yellow" />
                        What are Patterns?
                    </h2>
                    <p className="text-lg mb-8 text-center text-gray-700">
                        Patterns are repeating structures or statistical regularities in data. Machine learning algorithms excel at discovering complex, non-linear patterns that inform predictions and classifications.
                    </p>

                    <GlassCard variant="yellow" className="p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-6 text-center">🎯 Fun Pattern Examples!</h3>
                        <p className="text-lg mb-8 text-center text-gray-700">
                            Let's look at some patterns you might recognize from everyday life:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-blue/20 hover:border-kids-blue hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-blue mb-4 flex items-center gap-2">
                                    🔢 Number Pattern
                                </h4>
                                <div className="text-center mb-4">
                                    <div className="bg-white/85 p-4 rounded text-2xl font-mono">
                                        2, 4, 6, 8, ...
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 text-center">
                                    Each number goes up by 2. That's the pattern!
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-green/20 hover:border-kids-green hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-green mb-4 flex items-center gap-2">
                                    🔷 Shape Pattern
                                </h4>
                                <div className="text-center mb-4">
                                    <div className="bg-white/85 p-4 rounded text-2xl">
                                        🔴 🔵 🟢 🔴 🔵 🟢 ...
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 text-center">
                                    The colors repeat: red, blue, green.
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl shadow-md border-2 border-kids-purple/20 hover:border-kids-purple hover:-translate-y-1 transition-all duration-300">
                                <h4 className="font-bold text-lg text-kids-purple mb-4 flex items-center gap-2">
                                    🎶 Sound Pattern
                                </h4>
                                <div className="text-center mb-4">
                                    <div className="bg-white/85 p-4 rounded text-xl">
                                        👏 👆 👏 👆 ...
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 text-center">
                                    Clap, snap, clap, snap... A rhythm you can feel!
                                </p>
                            </div>
                        </div>
                        <HighlightBox variant="tip" showIcon={false} className="mt-8 p-6 text-center">
                            <p className="font-medium text-lg">
                                🤖 <strong>Data Science Application:</strong> Pattern recognition is fundamental to clustering algorithms, time series forecasting, and anomaly detection across industries from finance to healthcare.
                            </p>
                        </HighlightBox>
                    </GlassCard>
                </section>

                {/* How AI Finds Patterns */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8 text-kids-purple" />
                        How AI Finds Patterns
                    </h2>
                    <p className="text-lg mb-8 text-center text-gray-700">
                        AI systems discover patterns through statistical analysis and optimization algorithms, processing datasets far larger than human analysis could handle:
                    </p>

                    <div className="space-y-8">
                        <GlassCard variant="blue" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-blue mb-4 flex items-center gap-2">
                                🌤️ Weather Prediction
                            </h3>
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                Time series models analyze historical weather data (temperature, pressure, humidity, wind patterns) to forecast future conditions with increasing accuracy.
                            </p>
                            <p className="mb-6 text-sm text-gray-600 italic">
                                <strong>Real-world application:</strong> NOAA and weather services use ensemble ML models processing satellite imagery, sensor networks, and atmospheric data to generate forecasts.
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                        <thead className="bg-kids-blue text-white">
                                            <tr>
                                                <th className="py-3 px-6 text-left">Day</th>
                                                <th className="py-3 px-6 text-left">Weather</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="py-3 px-6">Mon</td>
                                                <td className="py-3 px-6">☀️ Sunny</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-6">Tue</td>
                                                <td className="py-3 px-6">☀️ Sunny</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-6">Wed</td>
                                                <td className="py-3 px-6">⛅ Cloudy</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-6">Thu</td>
                                                <td className="py-3 px-6">🌧️ Rainy</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-6">Fri</td>
                                                <td className="py-3 px-6">⛅ Cloudy</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-4 text-center text-sm font-medium text-kids-blue">
                                    Now the AI can guess what the weather might be on Saturday! 🤔
                                </p>
                            </div>
                        </GlassCard>

                        <GlassCard variant="green" className="p-8">
                            <h3 className="font-bold text-2xl text-kids-green mb-4 flex items-center gap-2">
                                🗣️ Language Patterns
                            </h3>
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                Language models predict next tokens based on learned probability distributions from massive text corpora, enabling autocomplete and text generation.
                            </p>
                            <p className="mb-6 text-sm text-gray-600 italic">
                                <strong>Technical detail:</strong> Transformer models use attention mechanisms to weigh context, generating coherent text by sampling from learned distributions over vocabulary.
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl">
                                <h4 className="font-bold mb-4">Examples:</h4>
                                <div className="space-y-3">
                                    <div className="bg-white p-4 rounded border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                                        <p>"I'm going to the..." → <span className="font-bold text-kids-green">"store," "park," or "movies"</span></p>
                                    </div>
                                    <div className="bg-white p-4 rounded border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                                        <p>"She is very..." → <span className="font-bold text-kids-green">"kind," "smart," or "funny"</span></p>
                                    </div>
                                </div>
                                <p className="mt-4 text-center text-sm font-medium text-kids-green">
                                    That's how autocomplete and spellcheck work! ✨
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {/* Practice Section */}
                <GlassCard variant="red" className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                        🧩 Let's Practice! — Find the Pattern
                    </h3>
                    <p className="text-lg mb-8 text-center text-gray-700">
                        Can you guess what comes next? Click to reveal the answers!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue transition-colors">
                            <h4 className="font-bold text-lg mb-4">Pattern 1:</h4>
                            <div className="bg-gray-100 p-4 rounded text-center font-mono text-2xl mb-4">
                                1, 3, 5, 7, __
                            </div>
                            <p className="text-sm text-gray-600 mb-4 italic text-center">
                                (Hint: Add 2 each time)
                            </p>
                            <div className="bg-kids-blue/10 p-3 rounded text-center">
                                <span className="font-bold">➡️ Answer: 9</span>
                            </div>
                        </div>

                        <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                            <h4 className="font-bold text-lg mb-4">Pattern 2:</h4>
                            <div className="bg-gray-100 p-4 rounded text-center font-mono text-2xl mb-4">
                                2, 4, 8, 16, __
                            </div>
                            <p className="text-sm text-gray-600 mb-4 italic text-center">
                                (Hint: Each number is doubled)
                            </p>
                            <div className="bg-kids-green/10 p-3 rounded text-center">
                                <span className="font-bold">➡️ Answer: 32</span>
                            </div>
                        </div>

                        <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple transition-colors">
                            <h4 className="font-bold text-lg mb-4">Pattern 3:</h4>
                            <div className="bg-gray-100 p-4 rounded text-center text-2xl mb-4">
                                🟠 🟢 🟠 🟢 🟠 __
                            </div>
                            <p className="text-sm text-gray-600 mb-4 italic text-center">
                                (Hint: Colors are repeating)
                            </p>
                            <div className="bg-kids-purple/10 p-3 rounded text-center">
                                <span className="font-bold">➡️ Answer: 🟢</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Summary */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        💡 Why This Matters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/30">
                            <div className="text-4xl mb-4">🤖</div>
                            <p className="text-xs text-kids-blue font-bold mb-2">In Lesson 1:</p>
                            <h3 className="font-bold mb-2 text-kids-blue">AI is like a smart helper</h3>
                            <p className="text-sm text-gray-600">We learned AI can help us in many ways</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/30">
                            <div className="text-4xl mb-4">🧠</div>
                            <p className="text-xs text-kids-green font-bold mb-2">In Lesson 2:</p>
                            <h3 className="font-bold mb-2 text-kids-green">Machine Learning helps AI get better</h3>
                            <p className="text-sm text-gray-600">By studying data and finding patterns</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/30">
                            <div className="text-4xl mb-4">🧩</div>
                            <p className="text-xs text-kids-purple font-bold mb-2">Now in Lesson 3:</p>
                            <h3 className="font-bold mb-2 text-kids-purple">Data holds patterns!</h3>
                            <p className="text-sm text-gray-600">And AI learns from those patterns</p>
                        </div>
                    </div>

                    <HighlightBox variant="tip" showIcon={false} className="p-6">
                        <h4 className="text-xl font-bold mb-4 text-center">
                            🎯 That's how AI:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🛍️</div>
                                <p className="font-medium">Recommends what to buy</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">🌦️</div>
                                <p className="font-medium">Predicts the weather</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">📚</div>
                                <p className="font-medium">Suggests the next word you're typing</p>
                            </div>
                        </div>
                        <p className="text-center mt-6 font-bold text-kids-blue text-lg">
                            The better the pattern, the better the prediction! ✨
                        </p>
                    </HighlightBox>
                </GlassCard>

                {/* Challenge */}
                <div className="bg-gradient-to-r from-kids-yellow/45 to-kids-orange/45 border-2 border-kids-yellow/60 p-8 rounded-xl shadow-md backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
                        🌟 Challenge!
                    </h3>
                    <div className="bg-white/95 p-6 rounded-xl shadow-md">
                        <p className="text-lg mb-4">
                            <strong>Look around you today.</strong>
                        </p>
                        <p className="text-lg mb-4">
                            Can you find <span className="font-bold text-kids-purple">3 patterns</span> in your home, on your phone, or in nature?
                        </p>
                        <p className="text-lg">
                            Take a photo or draw them — you're already thinking like an AI! 🤖✨
                        </p>
                    </div>
                </div>

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

export default DataAndPatterns;
