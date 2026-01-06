import React, { useEffect } from 'react';
import { Bot, MessageSquare, Download, CheckCircle, ArrowLeft, Sparkles, Users, ExternalLink, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { completeProject, startProject, isProjectCompleted } from '@/utils/progressTracker';

const BuildChatbotProject = () => {
    const projectId = 'build-chatbot';
    const [isCompleted, setIsCompleted] = React.useState(isProjectCompleted(projectId));

    useEffect(() => {
        startProject(projectId);
    }, []);

    const handleMarkComplete = () => {
        completeProject(projectId);
        setIsCompleted(true);
    };

    const personalityTraits = [
        { trait: "Friendly", example: "Always greets warmly and uses kind words" },
        { trait: "Helpful", example: "Offers solutions and asks clarifying questions" },
        { trait: "Funny", example: "Makes jokes and uses playful language" },
        { trait: "Smart", example: "Shares interesting facts and explains things clearly" },
        { trait: "Patient", example: "Takes time to understand and never rushes" },
        { trait: "Creative", example: "Suggests unique ideas and thinks outside the box" }
    ];

    return (
        <LessonLayout
            title="Build Your AI Chatbot"
            subtitle="Create a chatbot with personality and learn about conversation design!"
            backLink="/lessons"
            backLabel="Back to Learning Journey"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Project Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="px-4 py-2 bg-kids-blue text-white rounded-full text-sm font-bold">
                        Intermediate Project
                    </span>
                    <span className="px-4 py-2 bg-kids-purple/20 text-kids-purple rounded-full text-sm font-bold">
                        45-60 minutes
                    </span>
                </div>

                {/* Introduction */}
                <GlassCard variant="blue" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
                            <Bot className="w-12 h-12 text-kids-blue" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🤖 Design Your Own AI Friend!
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Chatbots are AI programs that can have conversations with people! In this project, you'll create your own chatbot with a unique personality. You'll learn how to design conversations, make ethical choices, and bring your AI character to life!
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* What You'll Learn */}
                <GlassCard variant="purple" className="p-8">
                    <h2 className="text-2xl font-bold text-kids-purple mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">🎭</div>
                            <h4 className="font-bold mb-2 text-kids-blue">Personality Design</h4>
                            <p className="text-sm text-gray-700">Create a unique character with specific traits and style</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">💬</div>
                            <h4 className="font-bold mb-2 text-kids-purple">Conversation Flow</h4>
                            <p className="text-sm text-gray-700">Plan how conversations should work</p>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl">
                            <div className="text-3xl mb-2">⚖️</div>
                            <h4 className="font-bold mb-2 text-kids-green">Ethical AI</h4>
                            <p className="text-sm text-gray-700">Make responsible choices in chatbot design</p>
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
                                <p className="font-semibold">Email Address</p>
                                <p className="text-sm text-gray-600">For Character.AI account (free)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Creativity!</p>
                                <p className="text-sm text-gray-600">Think about your chatbot's personality</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-kids-green mt-1" />
                            <div>
                                <p className="font-semibold">Paper & Pencil (Optional)</p>
                                <p className="text-sm text-gray-600">For planning your chatbot</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-kids-blue/10 border border-kids-blue/30 rounded-lg">
                        <p className="text-sm font-semibold text-kids-blue mb-1">👨‍👩‍👧 Parent Note:</p>
                        <p className="text-sm text-gray-700">
                            Character.AI is a free platform designed for creating AI chatbots. It requires email registration. The platform has safety features and content moderation. We recommend parents help younger children create accounts and supervise chatbot interactions.
                        </p>
                    </div>
                </GlassCard>

                {/* Step-by-Step Tutorial */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">📖 Step-by-Step Tutorial</h2>

                    {/* Step 1: Design Personality */}
                    <GlassCard className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Design Your Chatbot's Personality
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Before building your chatbot, let's plan who they are! Think of your chatbot as a character in a story.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/90 p-6 rounded-xl">
                                <h4 className="font-bold text-kids-purple mb-4">🎭 Choose Personality Traits:</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {personalityTraits.map((item, index) => (
                                        <div key={index} className="bg-white p-3 rounded-lg border-2 border-kids-blue/20 hover:border-kids-blue hover:scale-105 transition-all">
                                            <p className="font-semibold text-sm text-kids-blue">{item.trait}</p>
                                            <p className="text-xs text-gray-600">{item.example}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-4 italic">
                                    💡 Tip: Choose 2-3 traits that work well together!
                                </p>
                            </div>

                            <div className="bg-white/90 p-6 rounded-xl">
                                <h4 className="font-bold text-kids-blue mb-4">📝 Answer These Questions:</h4>
                                <div className="space-y-3">
                                    <div className="bg-white p-3 rounded-lg border-2 border-kids-blue/10">
                                        <p className="font-semibold text-sm mb-1">1. What is your chatbot's name?</p>
                                        <p className="text-xs text-gray-600">Example: "Sparky the Science Bot"</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border-2 border-kids-blue/10">
                                        <p className="font-semibold text-sm mb-1">2. What does your chatbot know about?</p>
                                        <p className="text-xs text-gray-600">Example: "Space, planets, and astronomy"</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border-2 border-kids-blue/10">
                                        <p className="font-semibold text-sm mb-1">3. How does your chatbot talk?</p>
                                        <p className="text-xs text-gray-600">Example: "Uses space puns and gets excited about stars"</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border-2 border-kids-blue/10">
                                        <p className="font-semibold text-sm mb-1">4. What is your chatbot's goal?</p>
                                        <p className="text-xs text-gray-600">Example: "Help kids learn about space in a fun way"</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-kids-yellow/20 rounded-xl">
                                <h5 className="font-bold mb-2 text-kids-yellow flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" />
                                    Use the Personality Worksheet!
                                </h5>
                                <p className="text-sm text-gray-700">
                                    Download the worksheet below to plan your chatbot's personality before building it.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 2: Ethics Check */}
                    <GlassCard variant="red" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-red text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Ethics Check: Make Responsible Choices
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Before creating your chatbot, let's make sure it will be helpful and kind!
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                                    ✅ Good Chatbot Behaviors
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>Helps people learn new things</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>Uses kind and respectful language</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>Admits when it doesn't know something</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>Encourages positive behavior</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>Treats everyone fairly</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200">
                                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                    ❌ Avoid These Behaviors
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600">✗</span>
                                        <span>Gives mean or hurtful responses</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600">✗</span>
                                        <span>Shares false information</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600">✗</span>
                                        <span>Pretends to be a real person</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600">✗</span>
                                        <span>Encourages unsafe behavior</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600">✗</span>
                                        <span>Treats people unfairly</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-kids-red/10 rounded-xl">
                            <p className="text-sm font-semibold text-kids-red mb-2">⚖️ Remember:</p>
                            <p className="text-sm text-gray-700">
                                Your chatbot should always be helpful, honest, and harmless. If you're not sure if something is okay, ask a parent or teacher!
                            </p>
                        </div>
                    </GlassCard>

                    {/* Step 3: Build on Character.AI */}
                    <GlassCard variant="blue" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Build Your Chatbot on Character.AI
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/90 p-4 rounded-xl">
                                <h4 className="font-bold text-kids-blue mb-3">🎯 Your Mission:</h4>
                                <ol className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-kids-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                                        <div>
                                            <p className="font-semibold">Create an account</p>
                                            <p className="text-sm">Visit Character.AI and sign up with your email</p>
                                            <a href="https://character.ai/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                                                <Button size="sm" className="bg-kids-blue text-white">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Open Character.AI
                                                </Button>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-kids-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                                        <div>
                                            <p className="font-semibold">Click "Create" button</p>
                                            <p className="text-sm">Look for the "Create" or "+" button to start a new character</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-kids-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                                        <div>
                                            <p className="font-semibold">Fill in character details</p>
                                            <div className="text-sm mt-2 space-y-1">
                                                <p><strong>Name:</strong> Your chatbot's name</p>
                                                <p><strong>Greeting:</strong> First message users see</p>
                                                <p><strong>Description:</strong> What your chatbot is about</p>
                                                <p><strong>Personality:</strong> The traits you chose in Step 1</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-kids-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                                        <div>
                                            <p className="font-semibold">Test your chatbot</p>
                                            <p className="text-sm">Start chatting to see how it responds!</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-kids-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">5</span>
                                        <div>
                                            <p className="font-semibold">Improve and refine</p>
                                            <p className="text-sm">Edit the personality if responses aren't quite right</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-kids-purple/10 p-4 rounded-xl">
                                <h5 className="font-bold mb-2 text-kids-purple">💡 Pro Tips:</h5>
                                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                    <li>Be specific about your chatbot's knowledge areas</li>
                                    <li>Include example phrases they might use</li>
                                    <li>Test with different types of questions</li>
                                    <li>Don't be afraid to edit and improve!</li>
                                </ul>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Step 4: Test Conversations */}
                    <GlassCard variant="green" className="p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="bg-kids-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                Test Your Chatbot
                            </h3>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Now it's time to have conversations with your chatbot and see how well it works!
                        </p>

                        <div className="bg-white/90 p-6 rounded-xl mb-6">
                            <h4 className="font-bold text-kids-green mb-4">🧪 Test Scenarios:</h4>
                            <div className="space-y-3">
                                <div className="bg-white p-3 rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors">
                                    <p className="font-semibold text-sm mb-1">1. Simple Question</p>
                                    <p className="text-xs text-gray-600">Ask something your chatbot should know about</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                                    <p className="font-semibold text-sm mb-1">2. Tricky Question</p>
                                    <p className="text-xs text-gray-600">Ask something outside its knowledge area</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-colors">
                                    <p className="font-semibold text-sm mb-1">3. Personality Test</p>
                                    <p className="text-xs text-gray-600">See if it responds with the right personality</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
                                    <p className="font-semibold text-sm mb-1">4. Conversation Flow</p>
                                    <p className="text-xs text-gray-600">Have a back-and-forth conversation</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-kids-green/10 rounded-xl">
                            <h5 className="font-bold mb-2 text-kids-green">🎯 Challenge:</h5>
                            <p className="text-sm text-gray-700">
                                Have at least 5 different conversations with your chatbot. After each one, think about what worked well and what could be better!
                            </p>
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
                                <div className="bg-white/90 p-4 rounded-xl">
                                    <p className="font-semibold text-kids-blue mb-2">🤖 About Your Chatbot:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>Does it match your personality plan?</li>
                                        <li>What responses surprised you?</li>
                                        <li>What would you change?</li>
                                    </ul>
                                </div>
                                <div className="bg-white/90 p-4 rounded-xl">
                                    <p className="font-semibold text-kids-purple mb-2">💭 About AI Chatbots:</p>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        <li>How does AI understand conversations?</li>
                                        <li>What makes a chatbot helpful?</li>
                                        <li>Where could chatbots be useful?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Downloadable Resources */}
                <GlassCard className="p-8 bg-gradient-to-r from-kids-blue/45 to-kids-purple/45">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Download className="w-6 h-6 text-kids-blue" />
                        Downloadable Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-blue transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">📋 Personality Worksheet</h4>
                            <p className="text-sm text-gray-600 mb-3">Design your chatbot's character</p>
                            <a href="/resources/personality-worksheet.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-purple transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">💬 Conversation Flowchart</h4>
                            <p className="text-sm text-gray-600 mb-3">Map conversation paths</p>
                            <a href="/resources/conversation-flowchart.html" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white/90 p-4 rounded-xl border-2 border-white/50 hover:border-kids-green transition-colors hover:shadow-lg">
                            <h4 className="font-bold mb-2">⚖️ Ethics Checklist</h4>
                            <p className="text-sm text-gray-600 mb-3">Ensure responsible AI design</p>
                            <a href="/resources/ethics-checklist.html" target="_blank" rel="noopener noreferrer">
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
                        🧠 What We Learned About Chatbots
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">🎭</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Personality Matters</h3>
                            <p className="text-sm text-gray-600">How a chatbot "acts" affects how helpful it is</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="font-bold mb-2 text-kids-purple">Design is Important</h3>
                            <p className="text-sm text-gray-600">Good conversations need planning and testing</p>
                        </div>
                        <div className="bg-white/90 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">⚖️</div>
                            <h3 className="font-bold mb-2 text-kids-green">Ethics First</h3>
                            <p className="text-sm text-gray-600">We must design AI to be helpful and kind</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Mark Complete Button */}
                {!isCompleted ? (
                    <div className="text-center">
                        <Button
                            onClick={handleMarkComplete}
                            size="lg"
                            className="bg-gradient-to-r from-kids-blue to-kids-purple text-white px-8 py-6 text-lg hover:shadow-xl transition-all"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Mark Project as Complete
                        </Button>
                    </div>
                ) : (
                    <div className="p-6 bg-gradient-to-r from-kids-blue/80 to-kids-purple/80 border-2 border-kids-blue rounded-xl text-center">
                        <div className="text-4xl mb-3">🎉</div>
                        <h3 className="text-2xl font-bold text-kids-blue mb-2">Project Completed!</h3>
                        <p className="text-gray-700 mb-4">
                            Awesome! You've created your own AI chatbot with personality!
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

export default BuildChatbotProject;
