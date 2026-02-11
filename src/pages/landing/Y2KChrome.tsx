import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Star, Sparkles, Heart, Zap, ArrowRight, Play, ChevronDown,
  Music, Video, PenTool, Cpu, CheckCircle2, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Y2K CHROME - Landing Page Variation 8
 *
 * Early 2000s nostalgic aesthetic with chrome/holographic effects
 * Bubble fonts, stars, glossy effects, cyber elements
 * Gen Z loves this aesthetic ironically/nostalgically
 * Think: early MySpace, Windows XP, Flash sites, Y2K futurism
 */

// ============================================
// COLOR SYSTEM - Y2K CYBER PALETTE
// ============================================
const colors = {
  // Core backgrounds
  bg: '#0d0015',
  bgCard: 'rgba(255, 255, 255, 0.03)',
  bgGlass: 'rgba(255, 255, 255, 0.05)',

  // Y2K Signature colors
  chrome: 'linear-gradient(135deg, #e8e8e8 0%, #b8b8b8 25%, #ffffff 50%, #a0a0a0 75%, #d0d0d0 100%)',
  holographic: 'linear-gradient(135deg, #ff6bd6 0%, #6bfff9 25%, #ffe66b 50%, #ff6b6b 75%, #b56bff 100%)',
  bubblegum: '#ff69b4',
  electric: '#00ffff',
  lime: '#7fff00',
  lavender: '#e6e6fa',
  silver: '#c0c0c0',

  // Gradients
  skyGradient: 'linear-gradient(180deg, #0d0015 0%, #1a0033 30%, #2d1b4e 60%, #1a0033 100%)',
  starfield: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',

  // Text
  text: '#ffffff',
  textSecondary: '#e6e6fa',
  textMuted: '#9999cc',

  // Accents
  pink: '#ff69b4',
  cyan: '#00ffff',
  yellow: '#ffff00',
  purple: '#9933ff',

  border: 'rgba(255, 255, 255, 0.15)',
  borderGlow: 'rgba(0, 255, 255, 0.5)',
};

// ============================================
// FLOATING STARS COMPONENT
// ============================================
function FloatingStars() {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 12,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      type: Math.random() > 0.5 ? 'star' : 'sparkle',
      color: [colors.pink, colors.cyan, colors.yellow, colors.lavender][Math.floor(Math.random() * 4)],
    })),
  []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            color: star.color,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
            rotate: star.type === 'sparkle' ? [0, 180, 360] : 0,
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          {star.type === 'star' ? (
            <Star className="fill-current" style={{ width: star.size, height: star.size }} />
          ) : (
            <Sparkles style={{ width: star.size, height: star.size }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// CHROME TEXT COMPONENT
// ============================================
function ChromeText({
  children,
  className = '',
  size = 'lg',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl md:text-7xl',
    xl: 'text-6xl md:text-8xl lg:text-9xl',
  };

  return (
    <span
      className={`relative inline-block font-black ${sizeClasses[size]} ${className}`}
      style={{
        background: colors.chrome,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.3))',
        fontFamily: "'Righteous', 'Impact', sans-serif",
      }}
    >
      {children}
      {/* Chrome reflection line */}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.4,
        }}
      >
        {children}
      </span>
    </span>
  );
}

// ============================================
// HOLOGRAPHIC BUTTON COMPONENT
// ============================================
function HoloButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
}: {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = `
    relative overflow-hidden rounded-full font-bold
    transition-all duration-300 transform
    hover:scale-105 active:scale-95
    ${sizeClasses[size]}
  `;

  const primaryStyles = {
    background: colors.holographic,
    color: '#000',
    boxShadow: `
      0 0 20px rgba(255, 107, 214, 0.5),
      0 0 40px rgba(107, 255, 249, 0.3),
      inset 0 2px 0 rgba(255,255,255,0.5)
    `,
  };

  const secondaryStyles = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: colors.text,
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
  };

  const content = (
    <motion.span
      className={baseStyles}
      style={variant === 'primary' ? primaryStyles : secondaryStyles}
      whileHover={{
        boxShadow: variant === 'primary'
          ? '0 0 30px rgba(255, 107, 214, 0.7), 0 0 60px rgba(107, 255, 249, 0.5), inset 0 2px 0 rgba(255,255,255,0.5)'
          : '0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255,255,255,0.1)',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 opacity-0"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
        }}
        whileHover={{
          opacity: 1,
          x: ['0%', '200%'],
          transition: { duration: 0.6, ease: 'easeInOut' },
        }}
      />
    </motion.span>
  );

  if (href) {
    return <Link to={href} className="inline-block">{content}</Link>;
  }

  return <button className="inline-block">{content}</button>;
}

// ============================================
// BUBBLE CARD COMPONENT
// ============================================
function BubbleCard({
  children,
  className = '',
  glowColor = colors.pink,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255,255,255,0.2),
          0 0 0 1px rgba(255,255,255,0.05)
        `,
      }}
      whileHover={{
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255,255,255,0.2),
          0 0 40px ${glowColor}40
        `,
        borderColor: `${glowColor}60`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Glossy top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
          borderRadius: '24px 24px 50% 50%',
        }}
      />
      {children}
    </motion.div>
  );
}

// ============================================
// MARQUEE COMPONENT
// ============================================
function Marquee({ children, speed = 20 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// CURSOR TRAIL (Y2K STYLE)
// ============================================
function CursorTrail() {
  const [trail, setTrail] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { id: idRef.current++, x: e.clientX, y: e.clientY };
      setTrail((prev) => [...prev.slice(-8), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            className="absolute"
            style={{
              left: point.x - 8,
              top: point.y - 8,
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star
              className="fill-current"
              style={{
                width: 16,
                height: 16,
                color: [colors.pink, colors.cyan, colors.yellow][i % 3],
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Y2KChrome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const domains = [
    { icon: <Video className="w-8 h-8" />, title: 'AI Video Editing', desc: 'Create viral TikToks & Reels', color: colors.pink, lessons: 12, emoji: '🎬' },
    { icon: <Music className="w-8 h-8" />, title: 'AI Music Production', desc: 'Produce original tracks', color: colors.cyan, lessons: 10, emoji: '🎵' },
    { icon: <PenTool className="w-8 h-8" />, title: 'AI Content Writing', desc: 'Write viral scripts', color: colors.yellow, lessons: 11, emoji: '✨' },
    { icon: <Cpu className="w-8 h-8" />, title: 'AI Automation', desc: 'Build no-code workflows', color: colors.purple, lessons: 12, emoji: '🤖' },
  ];

  const stats = [
    { value: '45+', label: 'Lessons', emoji: '📚' },
    { value: '$150', label: 'Avg Project Value', emoji: '💰' },
    { value: '98%', label: 'Success Rate', emoji: '⭐' },
    { value: '30', label: 'Days to Earn', emoji: '🚀' },
  ];

  const testimonials = [
    {
      quote: "OMG I made $2,000 in my first month editing videos!! Lumora literally changed my life fr fr 💖",
      name: "Sarah",
      age: 17,
      handle: "@sarahcreates",
      earned: "$4,800",
      avatar: "🌸",
    },
    {
      quote: "The automation course is insane!! Built workflows that save clients 15+ hrs/week 🔥",
      name: "Marcus",
      age: 22,
      handle: "@marcusai",
      earned: "$8,200",
      avatar: "⚡",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: colors.skyGradient }}
    >
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <FloatingStars />
      <CursorTrail />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-4 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="max-w-7xl mx-auto">
          <BubbleCard className="px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/landing" className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: colors.holographic }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  ✦
                </motion.div>
                <span
                  className="text-xl font-bold tracking-wider"
                  style={{
                    background: colors.holographic,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Righteous', sans-serif",
                  }}
                >
                  LUMORA
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {['About', 'Courses', 'Projects', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm font-medium transition-all hover:text-pink-400"
                    style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <HoloButton href="/lessons" size="sm">
                <Star className="w-4 h-4" />
                Start Free
              </HoloButton>
            </div>
          </BubbleCard>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-10 -left-10 text-6xl"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute -top-5 right-10 text-5xl"
            animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💫
          </motion.div>
          <motion.div
            className="absolute bottom-20 -left-5 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(255, 105, 180, 0.2)',
              border: '2px solid rgba(255, 105, 180, 0.5)',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.span>
            <span style={{ color: colors.pink, fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>
              FOR GEN Z CREATORS
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              💖
            </motion.span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChromeText size="xl">Master AI.</ChromeText>
            <br />
            <span
              className="text-5xl md:text-7xl lg:text-8xl font-black"
              style={{
                background: colors.holographic,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Righteous', sans-serif",
                filter: 'drop-shadow(0 0 30px rgba(255, 107, 214, 0.5))',
              }}
            >
              Create Everything.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The ultimate creative AI platform for creators 16+ ✨
            <br />
            Learn video, music, writing & automation. Build skills that open doors!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <HoloButton href="/lessons" size="lg">
              <Sparkles className="w-5 h-5" />
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </HoloButton>
            <HoloButton href="/projects" variant="secondary" size="lg">
              <Play className="w-5 h-5" />
              Watch Demo
            </HoloButton>
          </motion.div>

          {/* Mini stats with emojis */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { emoji: '👥', label: 'Creators', value: '10K+' },
              { emoji: '🎨', label: 'Projects', value: '500+' },
              { emoji: '💵', label: 'Earned', value: '$50K+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-2xl">{stat.emoji}</span>
                <div className="text-2xl font-bold" style={{ color: colors.text, fontFamily: "'Righteous', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" style={{ color: colors.pink }} />
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* MARQUEE BANNER */}
      {/* ============================================ */}
      <section
        className="py-4 overflow-hidden"
        style={{
          background: colors.holographic,
        }}
      >
        <Marquee speed={30}>
          <div className="flex items-center gap-8 px-4">
            {['✨ AI VIDEO', '🎵 AI MUSIC', '📝 AI WRITING', '🤖 AI AUTOMATION', '💰 EARN MONEY', '🚀 START TODAY'].map((text, i) => (
              <span
                key={i}
                className="text-xl font-black tracking-wider"
                style={{ color: '#000', fontFamily: "'Righteous', sans-serif" }}
              >
                {text}
              </span>
            ))}
          </div>
        </Marquee>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BubbleCard className="p-6 text-center" glowColor={[colors.pink, colors.cyan, colors.yellow, colors.purple][index]}>
                  <span className="text-4xl mb-2 block">{stat.emoji}</span>
                  <div
                    className="text-3xl md:text-4xl font-black mb-1"
                    style={{
                      background: colors.holographic,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: "'Righteous', sans-serif",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}>
                    {stat.label}
                  </div>
                </BubbleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-4 block">🎯</span>
            <h2
              className="text-4xl md:text-6xl font-black mb-4"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              <span style={{ color: colors.text }}>Master </span>
              <span
                style={{
                  background: colors.holographic,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                4 Creative Domains
              </span>
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}>
              Each domain = complete skill path from zero to earning real money 💸
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BubbleCard className="p-6" glowColor={domain.color}>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                      style={{
                        background: `linear-gradient(135deg, ${domain.color}40, ${domain.color}20)`,
                        border: `2px solid ${domain.color}`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {domain.emoji}
                    </motion.div>
                    <div className="flex-grow">
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: colors.text, fontFamily: "'Righteous', sans-serif" }}
                      >
                        {domain.title}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}>
                        {domain.desc}
                      </p>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold"
                        style={{
                          background: `${domain.color}30`,
                          color: domain.color,
                          fontFamily: "'Fredoka', sans-serif",
                        }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        {domain.lessons} lessons
                      </div>
                    </div>
                  </div>
                </BubbleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-4 block">💬</span>
            <h2
              className="text-4xl md:text-5xl font-black"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              <span style={{ color: colors.text }}>Real Results, </span>
              <span
                style={{
                  background: colors.holographic,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                No Cap
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <BubbleCard className="p-8" glowColor={index === 0 ? colors.pink : colors.cyan}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.yellow }} />
                    ))}
                  </div>
                  <blockquote
                    className="text-lg mb-6"
                    style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}
                  >
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ background: colors.holographic }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: colors.text, fontFamily: "'Righteous', sans-serif" }}>
                          {t.name}, {t.age}
                        </div>
                        <div className="text-sm" style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}>
                          {t.handle}
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{
                        background: 'rgba(255, 215, 0, 0.2)',
                        color: colors.yellow,
                        border: '2px solid rgba(255, 215, 0, 0.5)',
                        fontFamily: "'Righteous', sans-serif",
                      }}
                    >
                      💰 {t.earned}
                    </div>
                  </div>
                </BubbleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <BubbleCard className="relative p-12 md:p-16 text-center overflow-visible" glowColor={colors.pink}>
              {/* Floating decorations */}
              <motion.span
                className="absolute -top-8 -left-8 text-6xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                ⭐
              </motion.span>
              <motion.span
                className="absolute -top-4 -right-4 text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <motion.span
                className="absolute -bottom-6 left-1/4 text-4xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.span>

              <span className="text-6xl mb-6 block">🚀</span>

              <h2
                className="text-3xl md:text-5xl font-black mb-6"
                style={{ fontFamily: "'Righteous', sans-serif" }}
              >
                <span style={{ color: colors.text }}>Ready to </span>
                <span
                  style={{
                    background: colors.holographic,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Level Up?
                </span>
              </h2>

              <p
                className="text-lg mb-10 max-w-xl mx-auto"
                style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}
              >
                Join 10,000+ creators mastering AI tools and building real income.
                100% free to start. No credit card needed. Let's go! ✨
              </p>

              <HoloButton href="/lessons" size="lg">
                <Sparkles className="w-5 h-5" />
                Begin Your Journey
                <ArrowRight className="w-5 h-5" />
              </HoloButton>

              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
                style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}
              >
                {['✅ 100% free to start', '✅ No credit card', '✅ Cancel anytime'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </BubbleCard>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 px-4 border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.span>
            <span
              className="text-sm"
              style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}
            >
              © 2024 LUMORA. Made with 💖 for creators.
            </span>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-sm transition-colors hover:text-pink-400"
                style={{ color: colors.textMuted, fontFamily: "'Fredoka', sans-serif" }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
