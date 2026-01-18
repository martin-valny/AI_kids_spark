import React, { useEffect } from 'react';
import { Music, Mic, Play, ExternalLink, Download, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Button } from '@/components/ui/button';
import { completeProject, startProject, isProjectCompleted } from '@/utils/progressTracker';

const MusicAIProject = () => {
    const projectId = 'music-ai-creator';
    const [isCompleted, setIsCompleted] = React.useState(isProjectCompleted(projectId));

    useEffect(() => {
        // Mark project as started when component mounts
        startProject(projectId);
    }, []);

    const handleMarkComplete = () => {
        completeProject(projectId);
        setIsCompleted(true);
    };

    return (
        <LessonLayout
            title="Music & AI Creator"
            subtitle="Create AI-generated music and explore how AI understands musical patterns!"
            backLink="/lessons"
            backLabel="Back to Projects"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Project Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="px-4 py-2 bg-kids-green text-white rounded-full text-sm font-bold">
                        Beginner Project
                    </span>
                    <span className="px-4 py-2 bg-kids-purple/20 text-kids-purple rounded-full text-sm font-bold">
                        30-45 minutes
                    </span>
                </div>

                {/* Introduction */}
                <GlassCard variant="purple" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
                            <Music className="w-12 h-12 text-kids-purple" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🎵 Can Computers Be Musicians?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Yes! AI is learning to make music in amazing ways. It can write songs, sing opera, and even help you play instruments better. In this project, you'll explore fun tools that let you create music with AI!
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
                            <div className="text-3xl mb-2">👂</div>
                            <h4 className="font-bold mb-2 text-kids-blue">How AI Listens</h4>
                            <p className="text-sm text-gray-700">Discover how AI learns from thousands of songs to understand musical patterns</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎼</div>
                            <h4 className="font-bold mb-2 text-kids-purple">Creating Melodies</h4>
                            <p className="text-sm text-gray-700">See how AI can compose new music that sounds human-made</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎨</div>
                            <h4 className="font-bold mb-2 text-kids-green">Being Creative</h4>
                            <p className="text-sm text-gray-700">Use AI as a tool to boost your own musical creativity</p>
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
                                <p className="text-sm text-gray-600">With internet connection and speakers</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Headphones (Optional)</p>
                                <p className="text-sm text-gray-600">For better sound quality</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Microphone (For Freddiemeter)</p>
                                <p className="text-sm text-gray-600">Built-in mic works great!</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">No Account Needed!</p>
                                <p className="text-sm text-gray-600">All tools are free to use</p>
                            </div>
                        </div>
                    </div>

                    {/* Parent Note */}
                    <div className="mt-6 p-4 bg-kids-blue/10 border border-kids-blue/30 rounded-lg">
                        <p className="text-sm font-semibold text-kids-blue mb-1">👨‍👩‍👧 Parent Note:</p>
                        <p className="text-sm text-gray-700">
                            All activities use free, browser-based tools from Google Arts & Culture. No downloads or account creation required. Microphone access is only needed for the Freddiemeter activity.
                        </p>
                    </div>
                </GlassCard>

                {/* Step-by-Step Tutorial */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">📖 Step-by-Step Tutorial</h2>

                    {/* Step 1: Blob Opera */}
                    <GlassCard className="overflow-hidden p-0">
                        <div className="bg-gradient-to-r from-kids-pink/45 to-kids-purple/45 p-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Create Your Own Opera with Blob Opera
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <div className="inline-block bg-kids-pink/10 text-kids-pink px-4 py-1 rounded-full text-sm font-bold w-fit">
                                    Google Arts & Culture Experiment
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">Meet the Blobs!</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    They are four opera voices that you can control. You don't need to know how to sing - just drag the blobs up and down to change their pitch, and left and right to change their vowel sounds.
                                </p>

                                <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 space-y-3 hover:border-kids-purple/30 transition-colors">
                                    <h5 className="font-bold text-kids-purple">🎯 Your Mission:</h5>
                                    <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                                        <li>Click the button below to launch Blob Opera</li>
                                        <li>Try dragging each blob up and down to hear different notes</li>
                                        <li>Move them left and right to change the vowel sounds</li>
                                        <li>Create a short melody using all four blobs</li>
                                        <li>Try the "Record" feature to save your creation!</li>
                                    </ol>
                                </div>

                                <div className="bg-kids-purple/10 p-4 rounded-xl">
                                    <h5 className="font-bold mb-2 text-kids-purple">🤖 How it works:</h5>
                                    <p className="text-sm text-gray-700">
                                        This AI was trained on 16 hours of real opera singers! It learned what opera sounds like so it can sing whatever you tell it to. The AI understands musical harmony, so the blobs will automatically harmonize with each other!
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="https://artsandculture.google.com/experiment/blob-opera/AAH8q36x4XMPvw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GradientButton variant="primary" size="large" icon={ExternalLink}>
                                            Launch Blob Opera
                                        </GradientButton>
                                    </a>
                                </div>
                            </div>
                            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                <div className="text-9xl">🎶</div>
                                <div className="absolute inset-0 bg-black/5"></div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 2: Freddiemeter */}
                    <GlassCard variant="blue" className="p-8 md:p-12">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                                <span className="bg-kids-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Test Your Voice with Freddiemeter
                            </h3>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-6">
                                <p className="text-lg text-gray-700">
                                    Do you sound like Freddie Mercury? This AI analyzes your singing voice to see how closely it matches the legendary Queen singer!
                                </p>

                                <div className="bg-white/90 p-4 rounded-xl space-y-3">
                                    <h5 className="font-bold text-kids-blue">🎯 Your Mission:</h5>
                                    <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                                        <li>Click the button below to open Freddiemeter</li>
                                        <li>Allow microphone access when prompted</li>
                                        <li>Sing along with the song that plays</li>
                                        <li>Watch your score appear in real-time!</li>
                                        <li>Try different songs to improve your score</li>
                                    </ol>
                                </div>

                                <div className="bg-kids-yellow/20 p-4 rounded-xl">
                                    <p className="text-sm font-medium text-kids-blue">
                                        🎤 Challenge: Try to get a score higher than 50%!
                                    </p>
                                </div>

                                <a
                                    href="https://freddiemeter.withyoutube.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <GradientButton variant="secondary" icon={Play}>
                                        Try Freddiemeter
                                    </GradientButton>
                                </a>
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="w-48 h-48 bg-white/90 rounded-full flex items-center justify-center shadow-inner">
                                    <Mic className="w-24 h-24 text-kids-blue opacity-50" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 3: Reflection */}
                    <GlassCard variant="green" className="p-8">
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                            <span className="bg-kids-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                            Reflect on What You Created
                        </h3>

                        <div className="space-y-4">
                            <p className="text-gray-700">Think about these questions after trying both activities:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/10 hover:border-kids-green/50 transition-colors">
                                    <p className="font-semibold text-kids-green mb-2">🎵 About Blob Opera:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>What surprised you about the blobs?</li>
                                        <li>Did they sound like real singers?</li>
                                        <li>What melody did you create?</li>
                                    </ul>
                                </div>
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/10 hover:border-kids-blue/50 transition-colors">
                                    <p className="font-semibold text-kids-blue mb-2">🎤 About Freddiemeter:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>What was your highest score?</li>
                                        <li>How did the AI know if you matched?</li>
                                        <li>Was it fun or challenging?</li>
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
                            <h4 className="font-bold mb-2">📄 Music Pattern Worksheet</h4>
                            <p className="text-sm text-gray-600 mb-3">Practice identifying patterns in music</p>
                            <a href="/resources/music-pattern-worksheet.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-blue transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">🎵 Rhythm Cards</h4>
                            <p className="text-sm text-gray-600 mb-3">Printable rhythm pattern cards</p>
                            <a href="/resources/rhythm-cards.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-green transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">📝 Blank Music Sheet</h4>
                            <p className="text-sm text-gray-600 mb-3">Create your own compositions</p>
                            <a href="/resources/blank-music-sheet.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        💡 Tip: Print these resources to enhance your learning experience!
                    </p>
                </GlassCard>

                {/* What We Learned */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🧠 What We Learned About AI Music
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">👂</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Listening</h3>
                            <p className="text-sm text-gray-600">AI learns by "listening" to thousands of songs to understand patterns.</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">🎼</div>
                            <h3 className="font-bold mb-2 text-kids-purple">Composing</h3>
                            <p className="text-sm text-gray-600">It can create new melodies that sound like they were written by humans.</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="font-bold mb-2 text-kids-green">Collaborating</h3>
                            <p className="text-sm text-gray-600">AI is a tool for humans to be more creative, not just replace them!</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Mark Complete Button */}
                {!isCompleted ? (
                    <div className="text-center">
                        <Button
                            onClick={handleMarkComplete}
                            size="lg"
                            className="bg-gradient-to-r from-kids-green to-kids-blue text-white px-8 py-6 text-lg hover:shadow-xl transition-all"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Mark Project as Complete
                        </Button>
                    </div>
                ) : (
                    <div className="p-6 bg-gradient-to-r from-kids-green/80 to-kids-blue/80 border-2 border-kids-green rounded-xl text-center">
                        <div className="text-4xl mb-3">🎉</div>
                        <h3 className="text-2xl font-bold text-kids-green mb-2">Project Completed!</h3>
                        <p className="text-gray-700 mb-4">
                            Great job! You've learned how AI creates and understands music!
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

export default MusicAIProject;
