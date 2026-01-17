import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Lightbulb, Rocket, Bot, Check, Play, Star, Users, Award, Shield, Cpu, MessageSquare, User, GraduationCap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { AIMascot } from '@/components/AIMascot';


const features = [
  {
    icon: <Brain className="w-10 h-10 text-indigo-600" />,
    title: "What is AI?",
    description: "Learn about artificial intelligence in a fun, beginner-friendly way"
  },
  {
    icon: <Bot className="w-10 h-10 text-purple-600" />,
    title: "Hands-on Projects",
    description: "Create cool AI projects like chatbots and image recognizers"
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-amber-500" />,
    title: "Interactive Games",
    description: "Play games that teach you AI concepts while having fun"
  },
  {
    icon: <Rocket className="w-10 h-10 text-rose-500" />,
    title: "Future Skills",
    description: "Develop skills that will be important in the world of tomorrow"
  }
];

const courses = [
  {
    id: "intro-to-ai",
    title: "Introduction to AI",
    description: "Discover what AI is and how it's used in our everyday lives through fun examples and interactive lessons.",
    icon: <Brain className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    level: "Beginner",
    duration: "1-2 hours",
    path: "/lessons/intro-to-ai"
  },
  {
    id: "machine-learning-basics",
    title: "Machine Learning Basics",
    description: "Learn how machines can learn patterns from data and make predictions, with hands-on activities.",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    level: "Beginner",
    duration: "2-3 hours",
    path: "/lessons/machine-learning-basics"
  },
  {
    id: "build-a-chatbot",
    title: "Build Your First Chatbot",
    description: "Create a simple chatbot that can answer questions and have conversations with you!",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    level: "Intermediate",
    duration: "3-4 hours",
    path: "/projects/build-a-chatbot"
  }
];

const benefitsList = [
  "Beginner-friendly explanations of complex AI concepts",
  "Interactive games and activities that make learning fun",
  "Real-world AI applications they can actually build",
  "Safe, guided exploration of AI technologies",
  "Future-ready skills development",
  "Enhances problem-solving and critical thinking"
];

const stats = [
  { value: 10000, label: "Creators", icon: <Users className="w-5 h-5" />, color: "text-indigo-600" },
  { value: 50, label: "Interactive Lessons", icon: <BookOpen className="w-5 h-5" />, color: "text-purple-600" },
  { value: 100, label: "Safe Content", suffix: "%", icon: <Shield className="w-5 h-5" />, color: "text-emerald-600" },
  { value: 25, label: "Fun Projects", icon: <Award className="w-5 h-5" />, color: "text-amber-500" }
];

// Animated counter component
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Index = () => {
  const { scrollY } = useScroll();
  // Parallax effects for Hero
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]); // Moves down as you scroll

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-200 selection:text-cyan-900">
      <Header />

      <main>
        {/* Hero Section - Redesigned */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative overflow-hidden bg-transparent pt-32 pb-20 px-4 md:px-6 z-0"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-violet-500/20"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Master AI. <br />
                  <span className="bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent">
                    Create Everything.
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  The creative AI platform for the next generation of digital artists, musicians, storytellers, and innovators. From prompt engineer to digital creator - build art, music, videos, and interactive experiences with cutting-edge AI tools.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link to="/lessons">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all"
                    >
                      Start Creating
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/90 text-gray-800 font-bold hover:bg-white transition-colors border border-gray-200/80 shadow-sm"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1 lg:order-2 relative flex justify-center"
              >
                <AIMascot size="xl" animate={true} />
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-white/60 to-gray-50/60 backdrop-blur-sm border-y border-gray-200/50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className={`flex justify-center mb-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Features Section - Redesigned with Bento Grid */}
        <section className="py-24 px-4 md:px-6 bg-transparent">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Everything You Need to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Master AI</span>
              </h2>
              <p className="text-xl text-gray-600">
                A complete creative platform designed for ages 13-25
              </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {/* Large feature card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden group shadow-xl shadow-indigo-500/20"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Brain className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">Interactive Learning</h3>
                  <p className="text-lg text-indigo-100 mb-6 max-w-md">
                    Hands-on lessons that make complex AI concepts easy to understand through practice and experimentation
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>Step-by-step guided lessons</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>Real-time feedback and hints</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>Progress tracking dashboard</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Small feature cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-amber-500/20 transition-all shadow-lg"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <Lightbulb className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Fun Games</h3>
                  <p className="text-sm text-amber-100">Learn through interactive games and challenges</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/20 transition-all shadow-lg"
              >
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <Shield className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">100% Safe</h3>
                  <p className="text-sm text-emerald-100">Beginner-friendly content, no ads, completely secure</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-pink-500/20 transition-all shadow-lg"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <Bot className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Build Projects</h3>
                  <p className="text-sm text-pink-100">Create real AI projects like chatbots and games</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-cyan-500/20 transition-all shadow-lg"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <Rocket className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Future Ready</h3>
                  <p className="text-sm text-cyan-100">Skills that matter for tomorrow's world</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                A Clear Path to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">AI Mastery</span>
              </h2>
              <p className="text-xl text-gray-600">
                From beginner to builder at your own pace
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Learn the Basics", desc: "Start with engaging lessons about what AI is and how it works", icon: <BookOpen className="w-7 h-7" />, color: "from-indigo-500 to-blue-600" },
                { step: "02", title: "Practice & Play", desc: "Try interactive activities and exercises that reinforce concepts", icon: <Play className="w-7 h-7" />, color: "from-purple-500 to-violet-600" },
                { step: "03", title: "Build Projects", desc: "Create your own AI projects like chatbots and image recognizers", icon: <Rocket className="w-7 h-7" />, color: "from-orange-500 to-rose-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all group border border-gray-100">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="text-xs font-bold text-gray-400 mb-2 tracking-wider">STEP {item.step}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section - Enhanced */}
        <section className="py-24 px-4 md:px-6 bg-transparent">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Featured <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Courses</span>
                </h2>
                <p className="text-lg text-gray-600">Start your AI journey with these popular lessons</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link to="/lessons">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all"
                  >
                    View All Courses
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    icon={course.icon}
                    color={course.color}
                    level={course.level as 'Beginner' | 'Intermediate' | 'Advanced'}
                    duration={course.duration}
                    path={course.path}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Loved by Learners & <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Parents</span>
              </h2>
              <p className="text-xl text-gray-600">
                See what others are saying about their AI learning journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  quote: "My daughter loves the interactive lessons! She's already built her first chatbot and can't stop talking about AI.",
                  author: "Sarah M.",
                  role: "Parent",
                  icon: <User className="w-5 h-5 text-white" />,
                  color: "from-indigo-500 to-purple-600",
                  rating: 5
                },
                {
                  quote: "The activities make learning so engaging! I didn't know AI could be this interesting. My favorite is the pattern recognition.",
                  author: "Alex, Age 14",
                  role: "Student",
                  icon: <GraduationCap className="w-5 h-5 text-white" />,
                  color: "from-emerald-500 to-teal-600",
                  rating: 5
                },
                {
                  quote: "Finally, a platform that makes AI accessible for beginners. The content is well-structured and genuinely educational.",
                  author: "David K.",
                  role: "Parent",
                  icon: <User className="w-5 h-5 text-white" />,
                  color: "from-orange-500 to-rose-600",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-md`}>
                      {testimonial.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 md:px-6 overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/98 to-gray-50/98 backdrop-blur-lg p-12 md:p-16 rounded-2xl text-center relative overflow-hidden shadow-xl border border-gray-200/60"
            >
              {/* Decorative background blobs inside the card */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-8"
              >
                <AIMascot size="lg" animate={true} />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners who are already exploring AI and building skills for the future!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link to="/lessons">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.35)" }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all"
                  >
                    Start Creating
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-gray-800 font-bold text-lg border border-gray-200 shadow-md hover:shadow-lg transition-all"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>100% Free Lessons</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main >
      <Footer />
    </div >
  );
};

export default Index;
