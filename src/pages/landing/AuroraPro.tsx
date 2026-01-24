import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Feather, Wand2, Sparkles, ArrowRight, Play,
  Brush, Music2, Film, Bot, Star, Check, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AURORA PRO - Landing Page Variation 10
 *
 * Professional, refined version of Aurora Canvas
 * Muted color palette with sophisticated typography
 * 3D hyperspace star field that responds to scroll
 * Stars rush towards viewer leaving subtle trails - sci-fi time travel effect
 */

// ============================================
// COLOR SYSTEM - PROFESSIONAL MUTED PALETTE
// ============================================
const colors = {
  // Deep, sophisticated backgrounds
  bg: '#08090c',
  bgElevated: '#0d0e12',
  bgCard: 'rgba(255, 255, 255, 0.02)',

  // Muted professional accent - single color family
  accent: '#6366f1', // Indigo
  accentMuted: '#4f46e5',
  accentSoft: 'rgba(99, 102, 241, 0.15)',
  accentGlow: 'rgba(99, 102, 241, 0.2)',

  // Subtle secondary accents
  silver: '#94a3b8',
  platinum: '#e2e8f0',

  // Text hierarchy
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textDim: '#475569',

  border: 'rgba(255, 255, 255, 0.04)',
  borderHover: 'rgba(99, 102, 241, 0.3)',
};

// ============================================
// HYPERSPACE STAR FIELD - 3D SCROLL EFFECT
// ============================================
function HyperspaceStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Create stars with 3D depth (z-position)
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      // Random position in 3D space
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      z: Math.random(), // 0 = far, 1 = close
      // Base properties
      baseSize: 1 + Math.random() * 2,
      baseOpacity: 0.1 + Math.random() * 0.3,
      // Speed multiplier for parallax
      speed: 0.5 + Math.random() * 1.5,
      // Trail length based on depth
      trailLength: 10 + Math.random() * 30,
    })),
  []);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Smooth scroll value for fluid animation
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
            ${colors.bg}
          `,
        }}
      />

      {/* Stars with hyperspace effect */}
      {stars.map((star) => (
        <HyperspaceStar
          key={star.id}
          star={star}
          scrollProgress={smoothScroll}
          dimensions={dimensions}
        />
      ))}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8, 9, 12, 0.8) 100%)',
        }}
      />
    </div>
  );
}

// Individual star with trail effect
function HyperspaceStar({
  star,
  scrollProgress,
  dimensions,
}: {
  star: {
    id: number;
    x: number;
    y: number;
    z: number;
    baseSize: number;
    baseOpacity: number;
    speed: number;
    trailLength: number;
  };
  scrollProgress: { get: () => number };
  dimensions: { width: number; height: number };
}) {
  // Calculate position based on scroll (stars move towards viewer)
  const yOffset = useTransform(
    scrollProgress,
    [0, 1],
    [0, star.speed * 200 * star.z]
  );

  // Scale increases as stars "approach" (based on scroll + depth)
  const scale = useTransform(
    scrollProgress,
    [0, 1],
    [1, 1 + star.z * star.speed * 0.8]
  );

  // Opacity changes - stars fade as they pass
  const opacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [star.baseOpacity, star.baseOpacity * 1.5, star.baseOpacity * 0.8, star.baseOpacity * 0.3]
  );

  // Trail opacity (more visible when scrolling fast)
  const trailOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.5, 1],
    [0, 0.15, 0.3, 0.1]
  );

  // Trail length grows with scroll
  const trailHeight = useTransform(
    scrollProgress,
    [0, 1],
    [0, star.trailLength * star.z]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        y: yOffset,
      }}
    >
      {/* Trail (streak behind the star) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: star.baseSize * 0.5,
          height: trailHeight,
          bottom: '100%',
          background: `linear-gradient(to top, ${colors.accent}40, transparent)`,
          opacity: trailOpacity,
          borderRadius: star.baseSize,
          filter: 'blur(1px)',
        }}
      />

      {/* Star core */}
      <motion.div
        className="rounded-full"
        style={{
          width: star.baseSize,
          height: star.baseSize,
          backgroundColor: star.z > 0.7 ? colors.platinum : colors.silver,
          opacity: opacity,
          scale: scale,
          boxShadow: star.z > 0.5
            ? `0 0 ${star.baseSize * 2}px ${colors.accent}30`
            : 'none',
        }}
      />
    </motion.div>
  );
}

// ============================================
// SUBTLE AMBIENT GLOW
// ============================================
function AmbientGlow() {
  const { scrollYProgress } = useScroll();

  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.4, 0.2]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: glowOpacity }}
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
    </motion.div>
  );
}

// ============================================
// MINIMAL GLASS CARD
// ============================================
function GlassCard({
  children,
  className = '',
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: colors.bgCard,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${colors.border}`,
      }}
      whileHover={hover ? {
        borderColor: colors.borderHover,
        y: -2,
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// MINIMAL BUTTON
// ============================================
function MinimalButton({
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
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const primaryStyle = {
    background: colors.accent,
    color: '#fff',
  };

  const secondaryStyle = {
    background: 'transparent',
    border: `1px solid ${colors.border}`,
    color: colors.textSecondary,
  };

  const content = (
    <motion.span
      className={`inline-flex items-center gap-2.5 rounded-xl font-medium ${sizeClasses[size]}`}
      style={variant === 'primary' ? primaryStyle : secondaryStyle}
      whileHover={{
        scale: 1.02,
        ...(variant === 'primary'
          ? { boxShadow: `0 8px 30px ${colors.accentGlow}` }
          : { borderColor: colors.textMuted }),
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return <button>{content}</button>;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AuroraPro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const domains = [
    {
      icon: <Film className="w-6 h-6" />,
      title: 'AI Video Editing',
      desc: 'Transform raw footage into compelling content with intelligent editing tools',
      lessons: 12,
    },
    {
      icon: <Music2 className="w-6 h-6" />,
      title: 'AI Music Production',
      desc: 'Compose original tracks and soundscapes using cutting-edge AI synthesis',
      lessons: 10,
    },
    {
      icon: <Feather className="w-6 h-6" />,
      title: 'AI Content Writing',
      desc: 'Craft compelling narratives and scripts that resonate with audiences',
      lessons: 11,
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI Automation',
      desc: 'Build intelligent workflows that amplify your creative capacity',
      lessons: 12,
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
      quote: "Lumora transformed how I approach creative work. The curriculum is thoughtfully designed, and I started earning within my first month.",
      name: "Maya Rodriguez",
      role: "Video Creator",
      earned: "$6,200",
    },
    {
      quote: "Finally, an AI platform that respects the creative process. I learned to collaborate with AI rather than compete against it.",
      name: "Jordan Kim",
      role: "Music Producer",
      earned: "$9,400",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif&display=swap" rel="stylesheet" />

      <HyperspaceStars />
      <AmbientGlow />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl"
            style={{
              background: 'rgba(8, 9, 12, 0.8)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <Link to="/landing" className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: colors.accent }}
              >
                <Brush className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-base font-medium tracking-wide"
                style={{
                  color: colors.text,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Lumora
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {['About', 'Courses', 'Projects', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm transition-colors hover:text-white"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            <MinimalButton href="/lessons" size="sm">
              Get Started
            </MinimalButton>
          </div>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Minimal badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
            style={{
              background: colors.accentSoft,
              border: `1px solid ${colors.borderHover}`,
            }}
          >
            <span
              className="text-xs tracking-widest font-medium"
              style={{
                color: colors.accent,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              FOR CREATORS 13-25
            </span>
          </motion.div>

          {/* Main headline - refined typography */}
          <motion.h1
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="block text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-3"
              style={{
                color: colors.text,
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
              }}
            >
              Where creativity
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl leading-[1.1]"
              style={{
                color: colors.accent,
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
              }}
            >
              meets intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              color: colors.textSecondary,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Master AI tools for video, music, writing, and automation.
            Transform your creative vision into sustainable income.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MinimalButton href="/lessons" size="lg">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </MinimalButton>
            <MinimalButton href="/projects" variant="secondary" size="lg">
              <Play className="w-4 h-4" />
              Watch Demo
            </MinimalButton>
          </motion.div>

          {/* Trust indicators - minimal */}
          <motion.div
            className="flex flex-wrap justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: '10,000+', label: 'Creators' },
              { value: '$50K+', label: 'Earned' },
              { value: '4.9', label: 'Rating' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="text-2xl font-medium mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-px h-12"
            style={{
              background: `linear-gradient(180deg, ${colors.accent}60, transparent)`,
            }}
          />
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-6"
              >
                <div
                  className="text-3xl font-medium mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
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
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
              }}
            >
              <span style={{ color: colors.text }}>Four paths to </span>
              <span style={{ color: colors.accent }}>mastery</span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{
                color: colors.textSecondary,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              Complete journeys from curious beginner to confident creator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6" hover>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: colors.accentSoft,
                        color: colors.accent,
                      }}
                    >
                      {domain.icon}
                    </div>
                    <div className="flex-grow">
                      <h3
                        className="text-base font-medium mb-1.5"
                        style={{
                          color: colors.text,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {domain.title}
                      </h3>
                      <p
                        className="text-sm mb-3 leading-relaxed"
                        style={{
                          color: colors.textMuted,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {domain.desc}
                      </p>
                      <span
                        className="text-xs"
                        style={{
                          color: colors.accent,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {domain.lessons} lessons
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
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
              }}
            >
              <span style={{ color: colors.text }}>Stories of </span>
              <span style={{ color: colors.accent }}>transformation</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard className="p-8">
                  <Quote
                    className="w-8 h-8 mb-5"
                    style={{ color: colors.accent, opacity: 0.3 }}
                  />
                  <blockquote
                    className="text-base mb-8 leading-relaxed"
                    style={{
                      color: colors.textSecondary,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                        style={{
                          background: colors.accentSoft,
                          color: colors.accent,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{
                            color: colors.text,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {t.name}
                        </div>
                        <div
                          className="text-xs"
                          style={{
                            color: colors.textMuted,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{
                        color: colors.accent,
                        fontFamily: "'Inter', sans-serif",
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
            <GlassCard className="p-12 md:p-16 text-center">
              <div
                className="w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center"
                style={{ background: colors.accent }}
              >
                <Wand2 className="w-7 h-7 text-white" />
              </div>

              <h2
                className="text-3xl md:text-5xl mb-5"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                }}
              >
                <span style={{ color: colors.text }}>Begin your </span>
                <span style={{ color: colors.accent }}>journey</span>
              </h2>

              <p
                className="text-base mb-10 max-w-md mx-auto"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Join 10,000+ creators building sustainable income with AI tools.
                Start free, no credit card required.
              </p>

              <MinimalButton href="/lessons" size="lg">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </MinimalButton>

              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs"
                style={{
                  color: colors.textMuted,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {['Free to start', 'No credit card', 'Cancel anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" style={{ color: colors.accent }} />
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-xs"
            style={{
              color: colors.textMuted,
              fontFamily: "'Inter', sans-serif",
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
                  fontFamily: "'Inter', sans-serif",
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
