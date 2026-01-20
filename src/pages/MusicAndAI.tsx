import React from 'react';
import { Music, Mic, Play, ExternalLink } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';

const MusicAndAI = () => {
    return (
        <LessonLayout
            title="Music & AI"
            subtitle="Discover how Artificial Intelligence can compose, perform, and understand music!"
            backLink="/lessons"
            backLabel="Back to Lessons"
        >
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Intro Section */}
                <GlassCard variant="purple" className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="hidden md:flex p-4 bg-white/50 rounded-2xl">
                            <Music className="w-12 h-12 text-kids-purple" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                🎵 Can Computers Be Musicians?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Yes! AI is learning to make music in amazing ways. It can write songs, sing opera, and even help you play instruments better. In this lesson, we'll explore some super fun tools that let you play with AI music.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Blob Opera Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <Mic className="w-8 h-8 text-kids-pink" />
                        Create Your Own Opera!
                    </h2>

                    <GlassCard className="overflow-hidden p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <div className="inline-block bg-kids-pink/10 text-kids-pink px-4 py-1 rounded-full text-sm font-bold w-fit">
                                    Google Arts & Culture Experiment
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800">Blob Opera</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Meet the Blobs! They are four opera voices that you can control. You don't need to know how to sing - just drag the blobs up and down to change their pitch, and left and right to change their vowel sounds.
                                </p>
                                <div className="bg-white/50 p-4 rounded-xl border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                                    <h4 className="font-bold mb-2 text-kids-purple">🤖 How it works:</h4>
                                    <p className="text-sm text-gray-700">
                                        This AI was trained on 16 hours of real opera singers! It learned what opera sounds like so it can sing whatever you tell it to.
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
                                {/* Placeholder for Blob Opera Image - using a generic music abstract for now */}
                                <div className="text-9xl">🎶</div>
                                <div className="absolute inset-0 bg-black/5"></div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Freddiemeter Section */}
                <section>
                    <GlassCard variant="blue" className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800">Freddiemeter</h3>
                                <p className="text-lg text-gray-700">
                                    Do you sound like Freddie Mercury? This AI analyzes your singing voice to see how closely it matches the legendary Queen singer!
                                </p>
                                <div className="bg-white/50 p-4 rounded-xl border-2 border-kids-blue/10">
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
                                <div className="w-48 h-48 bg-white/50 rounded-full flex items-center justify-center shadow-inner">
                                    <Mic className="w-24 h-24 text-kids-blue opacity-50" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* What We Learned */}
                <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🧠 What We Learned About AI Music
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-blue/30 transition-colors">
                            <div className="text-4xl mb-4">👂</div>
                            <h3 className="font-bold mb-2 text-kids-blue">Listening</h3>
                            <p className="text-sm text-gray-600">AI learns by "listening" to thousands of songs to understand patterns.</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-purple/30 transition-colors">
                            <div className="text-4xl mb-4">🎼</div>
                            <h3 className="font-bold mb-2 text-kids-purple">Composing</h3>
                            <p className="text-sm text-gray-600">It can create new melodies that sound like they were written by humans.</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-2xl text-center border-2 border-white/50 hover:border-kids-green/30 transition-colors">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="font-bold mb-2 text-kids-green">Collaborating</h3>
                            <p className="text-sm text-gray-600">AI is a tool for humans to be more creative, not just replace them!</p>
                        </div>
                    </div>
                </GlassCard>

            </div>
        </LessonLayout>
    );
};

export default MusicAndAI;
