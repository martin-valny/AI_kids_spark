import React, { useEffect } from 'react';
import { Video, Film, Download, CheckCircle, ArrowLeft, Sparkles, Clapperboard, ExternalLink, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { completeProject, startProject, isProjectCompleted } from '@/utils/progressTracker';

const AIVideoProject = () => {
    const projectId = 'ai-video-magic';
    const [isCompleted, setIsCompleted] = React.useState(isProjectCompleted(projectId));

    // Load storyboard from localStorage
    const [storyboard, setStoryboard] = React.useState<{ [key: number]: string }>(() => {
        const saved = localStorage.getItem('ai-video-storyboard');
        return saved ? JSON.parse(saved) : { 0: '', 1: '', 2: '' };
    });

    useEffect(() => {
        startProject(projectId);
    }, []);

    useEffect(() => {
        // Save storyboard to localStorage whenever it changes
        localStorage.setItem('ai-video-storyboard', JSON.stringify(storyboard));
    }, [storyboard]);

    const handleMarkComplete = () => {
        completeProject(projectId);
        setIsCompleted(true);
    };

    const handleStoryboardChange = (index: number, value: string) => {
        setStoryboard(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const storyboardSteps = [
        { step: "Opening", description: "How does your video start? Set the scene!" },
        { step: "Main Action", description: "What happens in the middle? The exciting part!" },
        { step: "Ending", description: "How does it finish? Leave them wanting more!" }
    ];

    return (
        <LessonLayout
            title="AI Video Magic"
            subtitle="Create amazing AI-generated videos and animations!"
            backLink="/lessons"
            backLabel="Back to Learning Journey"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Project Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="px-4 py-2 bg-kids-red text-white rounded-full text-sm font-bold">
                        Advanced Project
                    </span>
                    <span className="px-4 py-2 bg-kids-orange/20 text-kids-orange rounded-full text-sm font-bold">
                        60-90 minutes
                    </span>
                </div>

                {/* Introduction */}
                <GlassCard variant="purple" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
                            <Video className="w-12 h-12 text-kids-purple" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🎬 Become an AI Filmmaker!
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Imagine creating videos just by describing what you want to see! AI video tools can turn your ideas into moving pictures, animations, and even talking avatars. In this project, you'll learn to storyboard, generate, and create your own AI-powered video!
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
                            <div className="text-3xl mb-2">📝</div>
                            <h4 className="font-bold mb-2 text-kids-blue">Storyboarding</h4>
                            <p className="text-sm text-gray-700">Plan your video scene by scene</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎨</div>
                            <h4 className="font-bold mb-2 text-kids-purple">AI Video Tools</h4>
                            <p className="text-sm text-gray-700">Use different AI tools to create videos</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎬</div>
                            <h4 className="font-bold mb-2 text-kids-green">Video Creation</h4>
                            <p className="text-sm text-gray-700">Combine elements into a finished video</p>
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
                                <p className="text-sm text-gray-600">With good internet connection</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Email Address</p>
                                <p className="text-sm text-gray-600">For tool registration (free accounts)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Creative Story Idea</p>
                                <p className="text-sm text-gray-600">What video do you want to create?</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Patience!</p>
                                <p className="text-sm text-gray-600">AI video generation takes time</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-kids-blue/10 border border-kids-blue/30 rounded-lg">
                        <p className="text-sm font-semibold text-kids-blue mb-1">👨‍👩‍👧 Parent Note:</p>
                        <p className="text-sm text-gray-700">
                            AI video tools require free account registration. We recommend Runway ML (free tier), D-ID (free trial), or Canva (free account with AI features). Parents should help create accounts and supervise content creation. Video generation can take several minutes per clip.
                        </p>
                    </div>
                </GlassCard>

                {/* Step-by-Step Tutorial */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">📖 Step-by-Step Tutorial</h2>

                    {/* Step 1: Plan Your Story */}
                    <GlassCard className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Plan Your Video Story
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Every great video starts with a plan! Let's create a storyboard for your AI video.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/90 p-6 rounded-xl">
                                <h4 className="font-bold text-kids-purple mb-4">🎬 Choose Your Video Type:</h4>
                                <div className="grid md:grid-cols-3 gap-3">
                                    <div className="bg-white p-4 rounded-lg border-2 border-kids-blue hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-sm text-kids-blue mb-1">📖 Story Video</p>
                                        <p className="text-xs text-gray-600">Tell a short story with scenes</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border-2 border-kids-green hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-sm text-kids-green mb-1">🎓 Educational</p>
                                        <p className="text-xs text-gray-600">Teach something interesting</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border-2 border-kids-purple hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-sm text-kids-purple mb-1">🎨 Animation</p>
                                        <p className="text-xs text-gray-600">Create animated characters</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl">
                                <h4 className="font-bold text-kids-blue mb-4">📝 Create Your Storyboard:</h4>
                                <div className="space-y-3">
                                    {storyboardSteps.map((item, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg border-2 border-kids-blue/20 hover:border-kids-blue transition-colors">
                                            <div className="flex items-start gap-3">
                                                <span className="bg-kids-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm mb-1">{item.step}</p>
                                                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                                                    <textarea
                                                        value={storyboard[index] || ''}
                                                        onChange={(e) => handleStoryboardChange(index, e.target.value)}
                                                        placeholder="Write your idea here..."
                                                        className="w-full p-3 bg-white rounded border border-gray-300 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none text-sm resize-none transition-all"
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3 italic">💾 Your ideas are automatically saved!</p>
                            </div>

                            <div className="p-4 bg-kids-yellow/20 rounded-xl">
                                <h5 className="font-bold mb-2 text-kids-yellow flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" />
                                    Story Ideas:
                                </h5>
                                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                    <li>A robot learning to make friends</li>
                                    <li>A tour of a future city</li>
                                    <li>How plants grow (educational)</li>
                                    <li>A day in the life of a space explorer</li>
                                </ul>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 2: Choose Your Tools */}
                    <GlassCard variant="blue" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Choose Your AI Video Tools
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {/* Runway ML */}
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-purple hover:border-kids-purple hover:shadow-lg transition-all">
                                <div className="flex items-start gap-4">
                                    <Film className="w-8 h-8 text-kids-purple flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-xl">Runway ML</h4>
                                            <span className="bg-kids-purple text-white px-2 py-1 rounded text-xs font-bold">RECOMMENDED</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-3">
                                            Professional AI video tools with free tier. Great for text-to-video and image-to-video!
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-2 mb-4">
                                            <p className="text-xs">✅ Text to video generation</p>
                                            <p className="text-xs">✅ Image to video animation</p>
                                            <p className="text-xs">📧 Free account required</p>
                                            <p className="text-xs">⚡ Limited free credits</p>
                                        </div>
                                        <a href="https://runwayml.com/" target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-kids-purple text-white">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Open Runway ML
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* D-ID */}
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-blue hover:border-kids-blue hover:shadow-lg transition-all">
                                <div className="flex items-start gap-4">
                                    <Users className="w-8 h-8 text-kids-blue flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xl mb-2">D-ID</h4>
                                        <p className="text-sm text-gray-700 mb-3">
                                            Create talking avatar videos! Make photos come to life with AI voices.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-2 mb-4">
                                            <p className="text-xs">✅ Talking avatars</p>
                                            <p className="text-xs">✅ AI voice generation</p>
                                            <p className="text-xs">📧 Free trial available</p>
                                            <p className="text-xs">🎤 Text-to-speech</p>
                                        </div>
                                        <a href="https://www.d-id.com/" target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-kids-blue text-white">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Open D-ID
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Canva */}
                            <div className="bg-white/90 p-6 rounded-xl border-2 border-kids-green hover:border-kids-green hover:shadow-lg transition-all">
                                <div className="flex items-start gap-4">
                                    <Clapperboard className="w-8 h-8 text-kids-green flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xl mb-2">Canva AI Video</h4>
                                        <p className="text-sm text-gray-700 mb-3">
                                            Easy-to-use video editor with AI features. Great for beginners!
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-2 mb-4">
                                            <p className="text-xs">✅ User-friendly interface</p>
                                            <p className="text-xs">✅ Templates and effects</p>
                                            <p className="text-xs">📧 Free account</p>
                                            <p className="text-xs">🎨 Combine images & text</p>
                                        </div>
                                        <a href="https://www.canva.com/create/videos/" target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-kids-green text-white">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Open Canva
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 3: Create Your Video */}
                    <GlassCard variant="green" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Create Your AI Video
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-kids-green">🎯 Your Mission:</h4>
                            <ol className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold">Choose a tool and create account</p>
                                        <p className="text-sm">Pick one of the tools above and sign up (free)</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold">Start with one scene</p>
                                        <p className="text-sm">Begin with your opening scene from your storyboard</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold">Write detailed descriptions</p>
                                        <p className="text-sm">Use what you learned in the AI Art project - details matter!</p>
                                        <div className="mt-2 p-3 bg-white/90 rounded text-xs font-mono">
                                            Example: "A friendly robot waving hello in a colorful garden with flowers and butterflies, sunny day, cartoon style"
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                                    <div>
                                        <p className="font-semibold">Generate and wait</p>
                                        <p className="text-sm">AI video takes time - be patient! (2-5 minutes per clip)</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">5</span>
                                    <div>
                                        <p className="font-semibold">Create remaining scenes</p>
                                        <p className="text-sm">Make videos for your middle and ending scenes</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">6</span>
                                    <div>
                                        <p className="font-semibold">Combine your clips</p>
                                        <p className="text-sm">Use the tool's editor to put scenes together</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-kids-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">7</span>
                                    <div>
                                        <p className="font-semibold">Download and share!</p>
                                        <p className="text-sm">Save your finished video and show it to family and friends</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="mt-6 p-4 bg-kids-green/10 rounded-xl">
                            <h5 className="font-bold mb-2 text-kids-green">💡 Pro Tips:</h5>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>Keep each scene short (3-5 seconds)</li>
                                <li>Use consistent style across all scenes</li>
                                <li>Add text or captions if needed</li>
                                <li>Don't worry if it's not perfect - it's your creation!</li>
                            </ul>
                        </div>
                    </GlassCard>

                    {/* Step 4: Add Polish */}
                    <GlassCard variant="purple" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                Add Polish & Effects (Optional)
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Make your video even better with these optional enhancements!
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/10 hover:border-kids-purple/40 transition-colors">
                                <h5 className="font-semibold text-kids-purple mb-2">🎵 Add Music</h5>
                                <p className="text-sm text-gray-600">Use royalty-free music or sounds</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/10 hover:border-kids-blue/40 transition-colors">
                                <h5 className="font-semibold text-kids-blue mb-2">📝 Add Text</h5>
                                <p className="text-sm text-gray-600">Include titles or captions</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/10 hover:border-kids-green/40 transition-colors">
                                <h5 className="font-semibold text-kids-green mb-2">✨ Add Effects</h5>
                                <p className="text-sm text-gray-600">Transitions between scenes</p>
                            </div>
                            <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-yellow/10 hover:border-kids-yellow/40 transition-colors">
                                <h5 className="font-semibold text-kids-yellow mb-2">🎤 Add Voiceover</h5>
                                <p className="text-sm text-gray-600">Record your own narration</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 5: Reflection */}
                    <GlassCard variant="yellow" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-yellow text-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                                Reflect on Your Creation
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700">Think about these questions:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue/50 transition-colors">
                                    <p className="font-semibold text-kids-blue mb-2">🎬 About Your Video:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>What's your favorite scene?</li>
                                        <li>What surprised you about AI video?</li>
                                        <li>What would you do differently next time?</li>
                                    </ul>
                                </div>
                                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple/50 transition-colors">
                                    <p className="font-semibold text-kids-purple mb-2">🤖 About AI Video Tools:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>How does AI create moving images?</li>
                                        <li>What makes a good video prompt?</li>
                                        <li>Where could AI video be useful?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Downloadable Resources */}
                <GlassCard className="p-8 bg-gradient-to-r from-kids-purple/45 to-kids-pink/45">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Download className="w-6 h-6 text-kids-purple" />
                        Downloadable Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-purple transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">📋 Storyboard Template</h4>
                            <p className="text-sm text-gray-600 mb-3">Plan your video scenes</p>
                            <a href="/resources/storyboard-template.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-pink transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">🎬 Video Planning Sheet</h4>
                            <p className="text-sm text-gray-600 mb-3">Organize your video project</p>
                            <a href="/resources/video-planning-sheet.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-blue transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">✍️ Script Writing Guide</h4>
                            <p className="text-sm text-gray-600 mb-3">Write better video descriptions</p>
                            <a href="/resources/script-writing-guide.html" target="_blank" rel="noopener noreferrer">
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
                        🧠 What We Learned About AI Video
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Planning is Key</h3>
                            <p className="text-sm text-gray-600">Good videos start with good storyboards</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">🎬</div>
                            <h3 className="font-bold mb-2 text-kids-purple">AI is Powerful</h3>
                            <p className="text-sm text-gray-600">AI can create amazing moving images from text</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="font-bold mb-2 text-kids-green">Creativity Matters</h3>
                            <p className="text-sm text-gray-600">Your ideas bring AI tools to life!</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Mark Complete Button */}
                {!isCompleted ? (
                    <div className="text-center">
                        <Button
                            onClick={handleMarkComplete}
                            size="lg"
                            className="bg-gradient-to-r from-kids-red to-kids-orange text-white px-8 py-6 text-lg hover:shadow-xl transition-all"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Mark Project as Complete
                        </Button>
                    </div>
                ) : (
                    <div className="p-6 bg-gradient-to-r from-kids-red/80 to-kids-orange/80 border-2 border-kids-red rounded-xl text-center">
                        <div className="text-4xl mb-3">🎉</div>
                        <h3 className="text-2xl font-bold text-kids-red mb-2">Project Completed!</h3>
                        <p className="text-gray-700 mb-4">
                            Incredible! You've mastered AI video creation! 🎬
                        </p>
                        <Link to="/lessons">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Learning Journey
                            </Button>
                        </Link>
                    </div>
                )}

            </div>
        </LessonLayout>
    );
};

export default AIVideoProject;
