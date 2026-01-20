
import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import ActivityCard from '@/components/ActivityCard';
import AITutor from '@/components/AITutor';

const ImageRecognition = () => {
  const activities = [
    {
      id: "build-image-classifier",
      title: "Build Your Image Classifier",
      description: "Train a simple AI to recognize different objects",
      path: "/activities/build-image-classifier",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      difficulty: "Medium" as const,
      estimatedTime: "20-25 min"
    },
    {
      id: "emoji-detector",
      title: "Emoji Detector Challenge",
      description: "Can you trick the AI with your drawings?",
      path: "/activities/emoji-detector",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "10-15 min"
    }
  ];

  return (
    <LessonLayout
      title="Image Recognition"
      subtitle="How AI sees and recognizes images"
      backLink="/lessons"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Intro Section */}
        <GlassCard variant="blue" className="p-8">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex p-4 bg-white/90 rounded-2xl">
              <div className="text-4xl">📷</div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                📷 How Computers See Images
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Computer vision systems process images as numerical matrices representing pixel values. Through deep learning, particularly Convolutional Neural Networks (CNNs), these systems extract hierarchical features—from basic edges to complex objects—enabling applications across creative industries, healthcare, and autonomous systems.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Video Section */}
        <GlassCard variant="purple" className="p-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-2xl">
            <p className="font-semibold text-purple-900 mb-2">📺 Recommended Watch</p>
            <p className="text-gray-700">
              This video reveals how AI processes and recognizes images. Watch to understand
              how computers "see" the world through pixels and patterns, then experiment with image
              recognition concepts in the activities below.
            </p>
          </div>
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            📺 Watch: How Computers See Images
          </h3>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/2hXG8v8p0KM"
              title="How Computers See Images"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </GlassCard>

        {/* How We See vs How AI Sees */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-kids-purple" />
            Human Vision vs AI Vision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard variant="purple" className="p-8">
              <h3 className="font-bold text-2xl text-kids-purple mb-4">👁️ Human Vision</h3>
              <p className="mb-4 text-gray-700">Human visual processing leverages:</p>
              <ul className="space-y-3">
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple transition-colors">
                  <p className="font-medium">✓ Invariant object recognition across viewpoints and occlusions</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple transition-colors">
                  <p className="font-medium">✓ Contextual understanding and semantic reasoning</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-purple/20 hover:border-kids-purple transition-colors">
                  <p className="font-medium">✓ Rapid adaptation to novel visual categories</p>
                </div>
              </ul>
            </GlassCard>

            <GlassCard variant="green" className="p-8">
              <h3 className="font-bold text-2xl text-kids-green mb-4">🤖 Computer Vision Systems</h3>
              <p className="mb-4 text-gray-700">CNNs learn through supervised training to:</p>
              <ul className="space-y-3">
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                  <p className="font-medium">⚙️ Extract hierarchical feature representations through convolutional layers</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                  <p className="font-medium">⚙️ Optimize millions of parameters through backpropagation</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 hover:border-kids-green transition-colors">
                  <p className="font-medium">⚙️ Generalize learned patterns to unseen data</p>
                </div>
              </ul>
            </GlassCard>
          </div>
        </section>

        {/* How Image Recognition Works */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-kids-blue" />
            How Image Recognition Works
          </h2>

          <div className="space-y-6">
            <GlassCard variant="blue" className="p-8 border-l-4 border-kids-blue">
              <h3 className="font-bold text-2xl text-kids-blue mb-4">Step 1: Training</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Models train on large labeled datasets (e.g., ImageNet with 14M images across 20K categories), learning statistical patterns through iterative optimization.
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-blue/10">
                <p className="font-medium">Supervised learning with labeled data → CNN layers extract features → Parameters adjust via gradient descent</p>
              </div>
            </GlassCard>

            <GlassCard variant="purple" className="p-8 border-l-4 border-kids-purple">
              <h3 className="font-bold text-2xl text-kids-purple mb-4">Step 2: Feature Detection</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                When shown a new image, AI looks for familiar features it learned during training.
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-purple/10">
                <p className="font-medium">"I see pointy ears, whiskers, and a tail - these are features of a cat!"</p>
              </div>
            </GlassCard>

            <GlassCard variant="green" className="p-8 border-l-4 border-kids-green">
              <h3 className="font-bold text-2xl text-kids-green mb-4">Step 3: Classification</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The AI makes its best guess about what's in the image based on the features it detected.
              </p>
              <div className="bg-gray-100 p-4 rounded-xl text-center border-2 border-kids-green/10">
                <p className="font-medium">"I'm 95% confident this is a cat, 4% it's a small dog, 1% it's something else"</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Cool Uses */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-kids-red" />
            Cool Uses of Image Recognition
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard variant="red" className="p-8">
              <h3 className="font-bold text-xl text-kids-red mb-3">🎨 AI Art Generation</h3>
              <p className="text-gray-700">
                Diffusion models (Midjourney, Stable Diffusion) and GANs enable artists to generate professional imagery from text prompts, transforming creative workflows in film, advertising, and game design.
              </p>
            </GlassCard>

            <GlassCard variant="blue" className="p-8">
              <h3 className="font-bold text-xl text-kids-blue mb-3">🎬 Style Transfer & Video Production</h3>
              <p className="text-gray-700">
                Neural style transfer applies artistic styles to video footage in real-time. Tools like Runway ML enable video editing, rotoscoping, and effects generation for creators.
              </p>
            </GlassCard>

            <GlassCard variant="green" className="p-8">
              <h3 className="font-bold text-xl text-kids-green mb-3">📸 Content-Aware Editing</h3>
              <p className="text-gray-700">
                Computer vision powers intelligent object removal, sky replacement, and portrait enhancement in Adobe Photoshop, Lightroom, and mobile photography apps.
              </p>
            </GlassCard>

            <GlassCard variant="yellow" className="p-8">
              <h3 className="font-bold text-xl text-kids-yellow mb-3">🕹️ Motion Capture & Animation</h3>
              <p className="text-gray-700">
                Pose estimation models enable real-time motion capture for character animation, VR experiences, and interactive installations without specialized hardware.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Summary */}
        <GlassCard variant="default" className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🎯 What We Learned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="font-bold mb-2 text-kids-blue">Computers see numbers</h3>
              <p className="text-sm text-gray-600">Images are grids of pixels with color values</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold mb-2 text-kids-purple">AI learns from examples</h3>
              <p className="text-sm text-gray-600">Training with thousands of labeled images</p>
            </div>
            <div className="bg-white/90 p-6 rounded-2xl text-center border border-white/50">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold mb-2 text-kids-green">Used everywhere!</h3>
              <p className="text-sm text-gray-600">From face unlock to self-driving cars</p>
            </div>
          </div>

          <div className="bg-kids-yellow/20 border border-kids-yellow/40 p-6 rounded-xl text-center mt-8">
            <h4 className="text-xl font-bold mb-3">
              🤯 Fun Fact!
            </h4>
            <p className="text-lg">
              Image recognition AI has gotten so good that some can identify thousands of different dog breeds with better accuracy than most humans! But AI still gets confused by things that would be obvious to us, like a picture of a cat wearing a dog costume.
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
      <AITutor lessonContext="Lesson: Image Recognition. Topic: How AI systems identify and classify images" />
    </LessonLayout>
  );
};

export default ImageRecognition;
