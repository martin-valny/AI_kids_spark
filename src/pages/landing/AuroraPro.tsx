import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  Feather, Wand2, ArrowRight, Play,
  Brush, Music2, Film, Bot, Check, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AURORA PRO - Masterclass Edition
 *
 * The perfect balance: professional sophistication with a whisper of magic
 * Subtle particle system that feels like creative energy, not sci-fi
 * Muted teal/purple/rose palette - refined, not rainbow
 * Typography: Elegant serifs meet clean sans-serifs
 *
 * Design philosophy: "Noticed only when you pay attention"
 */

// ============================================
// COLOR SYSTEM - SOPHISTICATED MUTED PALETTE
// ============================================
const colors = {
  // Deep, warm dark background
  bg: '#0c0a0f',
  bgElevated: '#13111a',
  bgCard: 'rgba(255, 255, 255, 0.02)',
  bgCardHover: 'rgba(255, 255, 255, 0.04)',

  // Muted accent triad - whispers of color
  teal: '#5eead4',      // Primary accent
  tealMuted: '#2dd4bf',
  tealSoft: 'rgba(94, 234, 212, 0.08)',

  purple: '#c4b5fd',    // Secondary accent
  purpleSoft: 'rgba(196, 181, 253, 0.06)',

  rose: '#fda4af',      // Tertiary accent
  roseSoft: 'rgba(253, 164, 175, 0.05)',

  // Text hierarchy - warm grays
  text: '#faf5ff',
  textSecondary: '#a8a29e',
  textMuted: '#78716c',
  textDim: '#57534e',

  // Borders
  border: 'rgba(255, 255, 255, 0.04)',
  borderHover: 'rgba(94, 234, 212, 0.2)',
};

// ============================================
// MAGIC DUST PARTICLES - Subtle Creative Energy
// ============================================
function MagicDustField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth, gentle scroll response
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 40,
    restDelta: 0.001,
  });

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Create particles with varied properties
  const particles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random(), // Depth: 0 = far, 1 = close
      size: 1.5 + Math.random() * 2.5,
      baseOpacity: 0.15 + Math.random() * 0.25,
      driftSpeed: 0.3 + Math.random() * 0.7,
      // Color distribution: mostly neutral with occasional color hints
      color: i % 12 === 0 ? colors.teal
           : i % 15 === 0 ? colors.purple
           : i % 18 === 0 ? colors.rose
           : colors.text,
      colorIntensity: i % 12 === 0 || i % 15 === 0 || i % 18 === 0 ? 0.6 : 0.3,
    })),
  []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ambient color washes - very subtle */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, ${colors.tealSoft} 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 75% 70%, ${colors.purpleSoft} 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 90%, ${colors.roseSoft} 0%, transparent 40%),
            ${colors.bg}
          `,
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <MagicParticle
          key={particle.id}
          particle={particle}
          scrollProgress={smoothScroll}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(12, 10, 15, 0.6) 100%)',
        }}
      />
    </div>
  );
}

// Individual magic particle with gentle drift
function MagicParticle({
  particle,
  scrollProgress,
  mouseX,
  mouseY,
}: {
  particle: {
    id: number;
    x: number;
    y: number;
    z: number;
    size: number;
    baseOpacity: number;
    driftSpeed: number;
    color: string;
    colorIntensity: number;
  };
  scrollProgress: { get(): number };
  mouseX: { get(): number };
  mouseY: { get(): number };
}) {
  // Gentle vertical drift based on scroll (closer particles drift more)
  const yDrift = useTransform(
    scrollProgress,
    [0, 1],
    [0, particle.z * particle.driftSpeed * 60]
  );

  // Subtle scale increase as particles "approach"
  const scale = useTransform(
    scrollProgress,
    [0, 1],
    [1, 1 + particle.z * 0.15]
  );

  // Gentle opacity pulse
  const opacity = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [
      particle.baseOpacity,
      particle.baseOpacity * 1.2,
      particle.baseOpacity * 0.8
    ]
  );

  // Whisper-light trail (only visible on scroll, very subtle)
  const trailOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.4, 1],
    [0, 0.03, 0.08, 0.02]
  );

  const trailHeight = useTransform(
    scrollProgress,
    [0, 1],
    [0, particle.z * 15]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        y: yDrift,
      }}
    >
      {/* Whisper trail */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: particle.size * 0.4,
          height: trailHeight,
          bottom: '100%',
          background: `linear-gradient(to top, ${particle.color}30, transparent)`,
          opacity: trailOpacity,
          filter: 'blur(2px)',
        }}
      />

      {/* Particle core */}
      <motion.div
        className="rounded-full"
        style={{
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          opacity: opacity,
          scale: scale,
          boxShadow: particle.colorIntensity > 0.5
            ? `0 0 ${particle.size * 3}px ${particle.color}20`
            : 'none',
        }}
      />
    </motion.div>
  );
}

// ============================================
// GLASS CARD - Refined with subtle glow
// ============================================
function GlassCard({
  children,
  className = '',
  hover = false,
  accentColor,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accentColor?: string;
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: colors.bgCard,
        backdropFilter: 'blur(16px)',
        border: `1px solid ${colors.border}`,
      }}
      whileHover={hover ? {
        background: colors.bgCardHover,
        borderColor: accentColor ? `${accentColor}30` : colors.borderHover,
        y: -2,
      } : {}}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ELEGANT BUTTON
// ============================================
function ElegantButton({
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
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const content = (
    <motion.span
      className={`inline-flex items-center gap-2.5 rounded-xl font-medium ${sizeClasses[size]}`}
      style={variant === 'primary' ? {
        background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.tealMuted} 100%)`,
        color: colors.bg,
      } : {
        background: 'transparent',
        border: `1px solid ${colors.border}`,
        color: colors.textSecondary,
      }}
      whileHover={{
        scale: 1.02,
        ...(variant === 'primary'
          ? { boxShadow: `0 8px 32px ${colors.tealSoft}, 0 0 0 1px ${colors.teal}20` }
          : { borderColor: colors.textMuted, color: colors.text }
        ),
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link to={href}>{content}</Link>;
  return <button>{content}</button>;
}

// ============================================
// GRADIENT TEXT
// ============================================
function GradientText({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.purple} 50%, ${colors.rose} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AuroraPro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const domains = [
    {
      icon: <Film className="w-5 h-5" />,
      title: 'AI Video Editing',
      desc: 'Transform raw footage into compelling stories with intelligent editing',
      lessons: 12,
      accent: colors.teal,
    },
    {
      icon: <Music2 className="w-5 h-5" />,
      title: 'AI Music Production',
      desc: 'Compose original tracks using cutting-edge AI synthesis tools',
      lessons: 10,
      accent: colors.purple,
    },
    {
      icon: <Feather className="w-5 h-5" />,
      title: 'AI Content Writing',
      desc: 'Craft narratives and scripts that resonate with audiences',
      lessons: 11,
      accent: colors.rose,
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: 'AI Automation',
      desc: 'Build intelligent workflows that amplify creative capacity',
      lessons: 12,
      accent: colors.teal,
    },
  ];

  const stats = [
    { value: '45+', label: 'Lessons' },
    { value: '$150', label: 'Avg Value' },
    { value: '98%', label: 'Success' },
    { value: '30d', label: 'To Earn' },
  ];

  const testimonials = [
    {
      quote: "Lumora transformed my approach to creative work. The curriculum feels intentional, and I started earning within my first month.",
      name: "Maya Rodriguez",
      role: "Video Creator",
      earned: "$6,200",
      accent: colors.teal,
    },
    {
      quote: "Finally, a platform that respects the creative process. I learned to collaborate with AI rather than compete against it.",
      name: "Jordan Kim",
      role: "Music Producer",
      earned: "$9,400",
      accent: colors.purple,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Typography */}
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <MagicDustField />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="flex items-center justify-between px-6 py-3 rounded-2xl"
            style={{
              background: 'rgba(12, 10, 15, 0.7)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <Link to="/landing" className="flex items-center gap-3 group">
              <motion.div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.teal}20, ${colors.purple}20)`,
                  border: `1px solid ${colors.teal}30`,
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: colors.teal,
                }}
              >
                <Brush className="w-4 h-4" style={{ color: colors.teal }} />
              </motion.div>
              <span
                className="text-lg tracking-wide"
                style={{
                  color: colors.text,
                  fontFamily: "'Crimson Pro', serif",
                  fontWeight: 500,
                }}
              >
                Lumora
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {['About', 'Courses', 'Projects', 'Pricing'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-sm transition-colors"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                  }}
                  whileHover={{ color: colors.text }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <ElegantButton href="/lessons" size="sm">
              Get Started
            </ElegantButton>
          </div>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-12"
            style={{
              background: colors.tealSoft,
              border: `1px solid ${colors.teal}20`,
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.teal }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: colors.teal,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              For Creators 13–25
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-2"
              style={{
                color: colors.text,
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Where creativity
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl leading-[1.1]"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              <GradientText>meets intelligence</GradientText>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
            style={{
              color: colors.textSecondary,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Master AI tools for video, music, writing, and automation.
            Transform creative vision into sustainable income.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ElegantButton href="/lessons" size="lg">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </ElegantButton>
            <ElegantButton href="/projects" variant="secondary" size="lg">
              <Play className="w-4 h-4" />
              Watch Demo
            </ElegantButton>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { value: '10,000+', label: 'Creators' },
              { value: '$50K+', label: 'Earned' },
              { value: '4.9', label: 'Rating' },
            ].map((item, i) => (
              <div key={item.label} className="text-center">
                <div
                  className="text-2xl mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "'Crimson Pro', serif",
                    fontWeight: 500,
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-px h-16"
            style={{
              background: `linear-gradient(180deg, ${colors.teal}60, transparent)`,
            }}
            animate={{ scaleY: [1, 0.6, 1], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* STATS BAR */}
      {/* ============================================ */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="py-8 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="text-3xl mb-1"
                    style={{
                      fontFamily: "'Crimson Pro', serif",
                      fontWeight: 500,
                    }}
                  >
                    <GradientText>{stat.value}</GradientText>
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{
                      color: colors.textMuted,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS */}
      {/* ============================================ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-5xl mb-4"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
              }}
            >
              <span style={{ color: colors.text }}>Four paths to </span>
              <GradientText>mastery</GradientText>
            </h2>
            <p
              className="text-base max-w-lg mx-auto"
              style={{
                color: colors.textSecondary,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Complete journeys from curious beginner to confident creator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {domains.map((domain, i) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6" hover accentColor={domain.accent}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${domain.accent}10`,
                        border: `1px solid ${domain.accent}25`,
                        color: domain.accent,
                      }}
                    >
                      {domain.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3
                        className="text-base font-medium mb-1.5"
                        style={{
                          color: colors.text,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {domain.title}
                      </h3>
                      <p
                        className="text-sm mb-3 leading-relaxed"
                        style={{
                          color: colors.textMuted,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {domain.desc}
                      </p>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: domain.accent,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {domain.lessons} lessons →
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontWeight: 400,
              }}
            >
              <span style={{ color: colors.text }}>Stories of </span>
              <GradientText>transformation</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard className="p-8 h-full" accentColor={t.accent}>
                  <Quote
                    className="w-8 h-8 mb-6"
                    style={{ color: t.accent, opacity: 0.4 }}
                  />
                  <blockquote
                    className="text-base mb-8 leading-relaxed"
                    style={{
                      color: colors.textSecondary,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                        style={{
                          background: `${t.accent}15`,
                          color: t.accent,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{
                            color: colors.text,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {t.name}
                        </div>
                        <div
                          className="text-xs"
                          style={{
                            color: colors.textMuted,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{
                        color: t.accent,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {t.earned} earned
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 md:p-16 text-center relative overflow-hidden">
              {/* Subtle gradient orb */}
              <div
                className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${colors.teal}30 0%, transparent 70%)`,
                }}
              />

              <motion.div
                className="w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${colors.teal}20, ${colors.purple}20)`,
                  border: `1px solid ${colors.teal}30`,
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Wand2 className="w-6 h-6" style={{ color: colors.teal }} />
              </motion.div>

              <h2
                className="text-3xl md:text-5xl mb-5 relative z-10"
                style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontWeight: 400,
                }}
              >
                <span style={{ color: colors.text }}>Begin your </span>
                <GradientText>journey</GradientText>
              </h2>

              <p
                className="text-base mb-10 max-w-md mx-auto relative z-10"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                Join 10,000+ creators building sustainable income with AI.
                Start free, no credit card required.
              </p>

              <div className="relative z-10">
                <ElegantButton href="/lessons" size="lg">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </ElegantButton>
              </div>

              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs relative z-10"
                style={{
                  color: colors.textMuted,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {['Free to start', 'No credit card', 'Cancel anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-xs"
            style={{
              color: colors.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © 2024 Lumora
          </span>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-xs transition-colors hover:text-white"
                style={{
                  color: colors.textMuted,
                  fontFamily: "'DM Sans', sans-serif",
                }}
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
