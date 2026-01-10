import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Users, Rocket, Star, Sparkles, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

const features = [{
  icon: <Brain className="w-8 h-8 text-kids-blue" />,
  title: "Made for Curious Minds",
  description: "Our lessons are crafted for learners ages 13 and up, using clear language, relatable stories, and real-world examples to make complex ideas click."
}, {
  icon: <Heart className="w-8 h-8 text-kids-red" />,
  title: "Safe, Trusted, Learner-First",
  description: "Every course is carefully reviewed to ensure it's appropriate, accurate, and provides a quality learning experience."
}, {
  icon: <Shield className="w-8 h-8 text-kids-green" />,
  title: "Privacy Comes First",
  description: "We protect your digital space with secure, ad-free features - because safety is non-negotiable."
}, {
  icon: <Users className="w-8 h-8 text-kids-purple" />,
  title: "Learn Together",
  description: "Whether you're a parent or a teacher, you'll find guides and resources to help you join the journey - and maybe even learn a little AI magic yourself."
}];

const stats = [{
  number: "10,000+",
  label: "Learners"
}, {
  number: "50+",
  label: "Interactive Lessons"
}, {
  number: "25+",
  label: "Fun Projects"
}, {
  number: "98%",
  label: "Parent Satisfaction"
}];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-200 selection:text-cyan-900">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-kids-blue to-kids-purple mb-8 shadow-lg shadow-blue-500/30"
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight"
            >
              About <span className="bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent">AI Spark</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              We're on a mission to make artificial intelligence accessible, fun, and educational for the next generation of young innovators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/lessons">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-kids-blue to-kids-purple text-white font-bold text-lg shadow-xl"
                >
                  Start Learning Today
                  <Rocket className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <GlassCard variant="default" className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Our Mission</h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We believe everyone deserves the chance to explore, understand, and shape the future of technology. At AI Spark, we turn complex AI concepts into fun, accessible learning experiences for beginners.
                  </p>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Through interactive lessons, creative projects, and hands-on play, we empower the next generation to become confident creators - not just passive users - of tomorrow’s technology.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center bg-kids-blue/10 rounded-lg p-3 border border-white/20">
                      <Rocket className="w-6 h-6 text-kids-blue mr-3" />
                      <span className="font-bold text-kids-blue">Future-Ready Skills</span>
                    </div>
                    <div className="flex items-center bg-kids-yellow/10 rounded-lg p-3 border border-white/20">
                      <Star className="w-6 h-6 text-kids-yellow mr-3" />
                      <span className="font-bold text-kids-yellow-dark">Trusted by Parents</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-kids-blue to-kids-purple rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
                  <img
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80"
                    alt="Kids learning together"
                    className="relative rounded-2xl shadow-2xl z-10 border-4 border-white/50"
                  />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce-gentle z-20 shadow-xl border border-white/60">
                    <span className="text-4xl filter drop-shadow-md">🚀</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-kids-blue to-kids-purple bg-clip-text text-transparent">AI Spark?</span>
              </h2>
              <p className="text-xl text-gray-600">Built with love, backed by science</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <GlassCard
                  key={index}
                  hover={true}
                  className="p-8 h-full flex flex-col items-start border-l-4 border-l-kids-blue"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 shadow-inner flex items-center justify-center mb-6 border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-3xl p-12 md:p-16 text-center shadow-2xl bg-gradient-to-r from-kids-blue via-kids-indigo to-kids-purple relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 relative z-10">
                Our Impact So Far
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-md">{stat.number}</div>
                    <div className="text-blue-100 font-bold text-sm md:text-base uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
                Built by <span className="text-kids-purple">Scientists</span>, Inspired by <span className="text-kids-blue">Curiosity</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                We're a team of scientists, technologists, and educators on a mission to make the future of AI fun, creative, and beginner-friendly. With backgrounds in biotechnology, neuroscience, and AI research, we've swapped the lab bench for the learning bench.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="text-center p-8 border-t-4 border-t-kids-blue">
                <div className="w-24 h-24 rounded-full bg-kids-blue/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <span className="text-4xl">🔬</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Science & Research</h3>
                <p className="text-gray-600">PhD-trained researchers with deep experience in brain science, computational biology, and translating big ideas into real-world impact</p>
              </GlassCard>

              <GlassCard className="text-center p-8 border-t-4 border-t-kids-purple">
                <div className="w-24 h-24 rounded-full bg-kids-purple/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <span className="text-4xl">🧬</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Biotech Meets Creativity</h3>
                <p className="text-gray-600">Professionals from leading biotech companies who believe the tools of tomorrow should be fun, safe, and understandable</p>
              </GlassCard>

              <GlassCard className="text-center p-8 border-t-4 border-t-kids-green">
                <div className="w-24 h-24 rounded-full bg-kids-green/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">AI & Tech for Learners</h3>
                <p className="text-gray-600">AI specialists turning cutting-edge tech into engaging, hands-on experiences that help learners understand the world and build the future</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <GlassCard variant="strong" className="p-12 md:p-16 text-center relative overflow-hidden backdrop-blur-xl bg-kids-glass-white-strong border border-white/50">
              {/* Decorative blobs */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-kids-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-kids-purple/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-kids-purple via-kids-blue to-kids-cyan bg-clip-text text-transparent">
                Ready to Start Your Child's AI Journey?
              </h2>

              <p className="text-xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Join thousands of families already exploring the exciting world of artificial intelligence together.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/lessons">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-kids-blue to-kids-purple text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
                  >
                    Start Free Lessons
                    <Rocket className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/resources">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 text-gray-800 font-bold text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    View Resources
                  </motion.button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;