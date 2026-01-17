import React, { useEffect } from 'react';
import { Palette, Sparkles, Download, CheckCircle, ArrowLeft, Lightbulb, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { completeProject, startProject, isProjectCompleted } from '@/utils/progressTracker';

const AIArtStudioProject = () => {
    const projectId = 'ai-art-studio';
    const [isCompleted, setIsCompleted] = React.useState(isProjectCompleted(projectId));

    useEffect(() => {
        startProject(projectId);
    }, []);

    const handleMarkComplete = () => {
        completeProject(projectId);
        setIsCompleted(true);
    };

    const promptExamples = [
        { bad: "a cat", good: "a fluffy orange cat sitting on a windowsill at sunset, digital art style", why: "More details = better results!" },
        { bad: "house", good: "a cozy cottage in the forest with smoke coming from chimney, autumn colors, watercolor painting", why: "Describe the scene and art style" },
        { bad: "space", good: "an astronaut floating in space with Earth in background, stars and galaxies, realistic photo", why: "Be specific about what you want to see" }
    ];

    return (
        <LessonLayout
            title="AI Art Studio"
            subtitle="Generate amazing images using AI prompts and learn prompt engineering!"
            backLink="/lessons"
            backLabel="Back to Projects"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Project Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="px-4 py-2 bg-kids-yellow text-gray-800 rounded-full text-sm font-bold">
                        Intermediate Project
                    </span>
                    <span className="px-4 py-2 bg-kids-green/20 text-kids-green rounded-full text-sm font-bold">
                        40-60 minutes
                    </span>
                </div>

                {/* Introduction */}
                <GlassCard variant="purple" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
                            <Palette className="w-12 h-12 text-kids-purple" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🎨 Become an AI Artist!
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Did you know you can create amazing artwork just by describing what you want? AI image generators can turn your words into beautiful pictures! In this project, you'll learn the art of "prompt engineering" - writing descriptions that help AI create exactly what you imagine.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* What You'll Learn */}
                <GlassCard variant="blue" className="p-8">
                    <h2 className="text-2xl font-bold text-kids-blue mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">✍️</div>
                            <h4 className="font-bold mb-2 text-kids-blue">Prompt Engineering</h4>
                            <p className="text-sm text-gray-700">Learn how to write clear descriptions that AI can understand</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎨</div>
                            <h4 className="font-bold mb-2 text-kids-purple">Art Styles</h4>
                            <p className="text-sm text-gray-700">Discover different art styles AI can create</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🔄</div>
                            <h4 className="font-bold mb-2 text-kids-green">Iteration</h4>
                            <p className="text-sm text-gray-700">Practice improving prompts to get better results</p>
                        </div>
                    </div>
                </GlassCard>

                {/* What You'll Need */}
                <GlassCard className="p-8 bg-gradient-to-r from-kids-yellow/45 to-kids-orange/45">
                    <h2 className="text-2xl font-bold mb-4">📋 What You'll Need</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Computer or Tablet</p>
                                <p className="text-sm text-gray-600">With internet connection</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Email Address (Optional)</p>
                                <p className="text-sm text-gray-600">For Bing Image Creator only</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Imagination!</p>
                                <p className="text-sm text-gray-600">Think of creative ideas to generate</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Patience</p>
                                <p className="text-sm text-gray-600">AI takes time to create images</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-kids-blue/10 border border-kids-blue/30 rounded-lg">
                        <p className="text-sm font-semibold text-kids-blue mb-1">👨‍👩‍👧 Parent Note:</p>
                        <p className="text-sm text-gray-700">
                            We recommend using Craiyon (completely free, no account) or Bing Image Creator (free with Microsoft account). Both have content filters to ensure appropriate results. Parents may want to explore these tools together with younger teens.
                        </p>
                    </div>
                </GlassCard>

                {/* Step-by-Step Tutorial */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">📖 Step-by-Step Tutorial</h2>

                    {/* Step 1: Understanding Prompts */}
                    <GlassCard className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Understanding Good Prompts
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            The secret to great AI art is writing detailed prompts! Let's learn what makes a prompt work well.
                        </p>

                        <div className="space-y-4">
                            <h4 className="font-bold text-kids-purple">❌ Bad vs. ✅ Good Prompts:</h4>
                            {promptExamples.map((example, index) => (
                                <div key={index} className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/50 transition-colors">
                                    <div className="grid md:grid-cols-2 gap-4 mb-2">
                                        <div className="bg-red-50 p-3 rounded-lg">
                                            <p className="text-xs font-bold text-red-600 mb-1">❌ TOO SIMPLE:</p>
                                            <p className="text-sm font-mono">"{example.bad}"</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-xs font-bold text-green-600 mb-1">✅ MUCH BETTER:</p>
                                            <p className="text-sm font-mono">"{example.good}"</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 italic">💡 {example.why}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-kids-yellow/20 rounded-xl">
                            <h5 className="font-bold mb-2 text-kids-yellow flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" />
                                Prompt Formula:
                            </h5>
                            <p className="text-sm text-gray-700 font-mono bg-white/90 p-3 rounded">
                                [Subject] + [Action/Setting] + [Details] + [Art Style]
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                Example: "A robot [subject] dancing in a garden [action/setting] with colorful flowers and butterflies [details], cartoon style [art style]"
                            </p>
                        </div>
                    </GlassCard>

                    {/* Step 2: Choose Your Tool */}
                    <GlassCard variant="blue" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Choose Your AI Art Tool
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Craiyon */}
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green hover:border-kids-green shadow-sm hover:shadow-lg transition-all">
                                <div className="flex items-center gap-2 mb-3">
                                    <ImageIcon className="w-6 h-6 text-kids-green" />
                                    <h4 className="font-bold text-xl">Craiyon</h4>
                                </div>
                                <div className="mb-4">
                                    <span className="bg-kids-green text-white px-2 py-1 rounded text-xs font-bold">RECOMMENDED FOR BEGINNERS</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-4">
                                    Completely free, no account needed! Great for getting started.
                                </p>
                                <div className="space-y-2 mb-4">
                                    <p className="text-xs">✅ No login required</p>
                                    <p className="text-xs">✅ Unlimited generations</p>
                                    <p className="text-xs">✅ Kid-safe content filter</p>
                                    <p className="text-xs">⏱️ Takes ~1 minute per image</p>
                                </div>
                                <a href="https://www.craiyon.com/" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full bg-kids-green text-white">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Open Craiyon
                                    </Button>
                                </a>
                            </div>

                            {/* Bing Image Creator */}
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue hover:border-kids-blue shadow-sm hover:shadow-lg transition-all">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-6 h-6 text-kids-blue" />
                                    <h4 className="font-bold text-xl">Bing Image Creator</h4>
                                </div>
                                <div className="mb-4">
                                    <span className="bg-kids-blue text-white px-2 py-1 rounded text-xs font-bold">HIGHER QUALITY</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-4">
                                    Free with Microsoft account. Creates more detailed images!
                                </p>
                                <div className="space-y-2 mb-4">
                                    <p className="text-xs">📧 Requires email signup</p>
                                    <p className="text-xs">✅ Better image quality</p>
                                    <p className="text-xs">✅ Faster generation</p>
                                    <p className="text-xs">⚡ Limited daily credits</p>
                                </div>
                                <a href="https://www.bing.com/images/create" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full bg-kids-blue text-white">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Open Bing Creator
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 3: Create Your First Image */}
                    <GlassCard variant="green" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Create Your First AI Artwork
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-kids-green">🎯 Your Mission:</h4>
                            <ol className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold">Choose a tool</p>
                                        <p className="text-sm">Click one of the buttons above to open Craiyon or Bing</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold">Write your first prompt</p>
                                        <p className="text-sm">Use the formula: Subject + Action + Details + Style</p>
                                        <p className="text-xs text-gray-600 mt-1 font-mono bg-white/90 p-2 rounded">
                                            Try: "A friendly dragon reading a book in a library, surrounded by floating candles, fantasy art style"
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold">Generate and wait</p>
                                        <p className="text-sm">Click "Create" or "Generate" and be patient!</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                                    <div>
                                        <p className="font-semibold">Improve your prompt</p>
                                        <p className="text-sm">If you don't like the result, add more details and try again!</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">5</span>
                                    <div>
                                        <p className="font-semibold">Save your favorites</p>
                                        <p className="text-sm">Download images you like (right-click → Save Image)</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </GlassCard>

                    {/* Step 4: Experiment with Styles */}
                    <GlassCard variant="purple" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                Experiment with Art Styles
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Try the same prompt with different art styles to see how AI interprets them!
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                "cartoon style",
                                "realistic photo",
                                "watercolor painting",
                                "digital art",
                                "pixel art",
                                "oil painting",
                                "anime style",
                                "sketch drawing",
                                "3D render"
                            ].map((style, index) => (
                                <div key={index} className="bg-white/90 p-3 rounded-lg text-center border-2 border-kids-purple/20 hover:border-kids-purple hover:shadow-md transition-all">
                                    <p className="text-sm font-semibold">{style}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-kids-purple/10 rounded-xl">
                            <h5 className="font-bold mb-2 text-kids-purple">🎨 Challenge:</h5>
                            <p className="text-sm text-gray-700">
                                Pick one subject (like "a cat in space") and create it in 3 different art styles. Compare the results!
                            </p>
                        </div>
                    </GlassCard>

                    {/* Step 5: Reflection */}
                    <GlassCard variant="yellow" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-yellow text-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                                Reflect on Your Creations
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700">Think about these questions:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue/50 transition-colors">
                                    <p className="font-semibold text-kids-blue mb-2">🤔 About the Process:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>What surprised you about AI art?</li>
                                        <li>Which prompts worked best?</li>
                                        <li>How did adding details change results?</li>
                                    </ul>
                                </div>
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/50 transition-colors">
                                    <p className="font-semibold text-kids-purple mb-2">🎨 About Your Art:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>Which image is your favorite?</li>
                                        <li>What style did you like most?</li>
                                        <li>What will you create next?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Downloadable Resources */}
                <GlassCard className="p-8 bg-gradient-to-r from-kids-purple/45 to-kids-blue/45">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Download className="w-6 h-6 text-kids-purple" />
                        Downloadable Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-purple transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">💡 Prompt Idea Cards</h4>
                            <p className="text-sm text-gray-600 mb-3">50+ creative prompt starters</p>
                            <a href="/resources/prompt-idea-cards.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-blue transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">🎨 Style Reference Sheet</h4>
                            <p className="text-sm text-gray-600 mb-3">Guide to different art styles</p>
                            <a href="/resources/style-reference-sheet.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-purple transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">🖼️ Art Gallery Template</h4>
                            <p className="text-sm text-gray-600 mb-3">Organize your AI creations</p>
                            <a href="/resources/art-gallery-template.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                    </div>
                </GlassCard>

                {/* What We Learned */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🧠 What We Learned About AI Art
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">✍️</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Words Matter</h3>
                            <p className="text-sm text-gray-600">Detailed prompts help AI understand what you want</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="font-bold mb-2 text-kids-purple">AI is Creative</h3>
                            <p className="text-sm text-gray-600">AI can create art in countless styles</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="font-bold mb-2 text-kids-green">Practice Improves</h3>
                            <p className="text-sm text-gray-600">The more you experiment, the better your prompts become!</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Mark Complete Button */}
                {!isCompleted ? (
                    <div className="text-center">
                        <Button
                            onClick={handleMarkComplete}
                            size="lg"
                            className="bg-gradient-to-r from-kids-purple to-kids-pink text-white px-8 py-6 text-lg hover:shadow-xl transition-all"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Mark Project as Complete
                        </Button>
                    </div>
                ) : (
                    <div className="p-6 bg-gradient-to-r from-kids-purple/80 to-kids-pink/80 border-2 border-kids-purple rounded-xl text-center">
                        <div className="text-4xl mb-3">🎉</div>
                        <h3 className="text-2xl font-bold text-kids-purple mb-2">Project Completed!</h3>
                        <p className="text-gray-700 mb-4">
                            Amazing work! You're now a prompt engineering expert!
                        </p>
                        <Link to="/lessons">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Projects
                            </Button>
                        </Link>
                    </div>
                )}

            </div>
        </LessonLayout>
    );
};

export default AIArtStudioProject;
