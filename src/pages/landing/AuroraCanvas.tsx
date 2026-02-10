import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Feather, Palette, Wand2, Sparkles, ArrowRight, Play,
  Brush, Music2, Film, Bot, Star, Check, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AURORA CANVAS - Landing Page Variation 9
 *
 * Ethereal flowing aurora gradients with organic shapes
 * Dreamy artist studio vibe, perfect for creative types
 * Soft, magical, inviting - like a creative sanctuary
 * Think: northern lights + watercolor + digital art studio
 */

// ============================================
// COLOR SYSTEM - AURORA PALETTE
// ============================================
const colors = {
  // Deep backgrounds
  bg: '#0a0a12',
  bgElevated: '#12121f',
  bgCard: 'rgba(255, 255, 255, 0.03)',

  // Aurora colors
  aurora1: '#00d4aa', // Teal/Emerald
  aurora2: '#7c3aed', // Purple
  aurora3: '#f472b6', // Pink
  aurora4: '#38bdf8', // Sky blue
  aurora5: '#a78bfa', // Lavender

  // Gradients
  auroraGradient: 'linear-gradient(135deg, #00d4aa 0%, #7c3aed 50%, #f472b6 100%)',
  auroraGradientSoft: 'linear-gradient(135deg, rgba(0,212,170,0.15) 0%, rgba(124,58,237,0.15) 50%, rgba(244,114,182,0.15) 100%)',

  // Text
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',

  // Organic accents
  cream: '#fef3c7',
  sage: '#86efac',
  blush: '#fda4af',

  border: 'rgba(255, 255, 255, 0.06)',
  borderGlow: 'rgba(0, 212, 170, 0.3)',
};

// ============================================
// AURORA BACKGROUND COMPONENT
// ============================================
function AuroraBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, rgba(0,212,170,0.12) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 60%, rgba(124,58,237,0.1) 0%, transparent 50%),
                       radial-gradient(ellipse at 40% 80%, rgba(244,114,182,0.08) 0%, transparent 50%),
                       ${colors.bg}`,
        }}
      />

      {/* Animated aurora layers */}
      {[
        { color: colors.aurora1, x: 20, y: 10, size: 800, delay: 0 },
        { color: colors.aurora2, x: 60, y: 30, size: 700, delay: 2 },
        { color: colors.aurora3, x: 80, y: 60, size: 600, delay: 4 },
        { color: colors.aurora4, x: 30, y: 70, size: 500, delay: 1 },
        { color: colors.aurora5, x: 50, y: 20, size: 650, delay: 3 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            background: `radial-gradient(circle, ${blob.color}20 0%, transparent 70%)`,
            filter: 'blur(80px)',
            x: springX,
            y: springY,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// ============================================
// ORGANIC BLOB SHAPE
// ============================================
function OrganicBlob({
  className = '',
  color = colors.aurora1,
  size = 300,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      animate={{
        scale: [1, 1.05, 0.98, 1],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <defs>
        <linearGradient id={`blob-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#blob-gradient-${color})`}
        d="M47.5,-57.2C59.9,-46.8,67.5,-30.5,70.6,-13.4C73.8,3.7,72.5,21.6,64.4,35.8C56.3,50,41.4,60.5,25.1,66.3C8.8,72.1,-8.9,73.2,-25.3,68.1C-41.7,63,-56.8,51.7,-65.3,36.7C-73.8,21.7,-75.7,3,-71.8,-13.5C-67.9,-30,-58.2,-44.3,-45.1,-54.6C-32,-64.9,-16,-71.2,0.8,-72.2C17.6,-73.1,35.2,-67.6,47.5,-57.2Z"
        transform="translate(100 100)"
      />
    </motion.svg>
  );
}

// ============================================
// FLOATING PARTICLES
// ============================================
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      color: [colors.aurora1, colors.aurora2, colors.aurora3, colors.aurora4][Math.floor(Math.random() * 4)],
    })),
  []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// ETHEREAL TEXT COMPONENT
// ============================================
function EtherealText({
  children,
  className = '',
  gradient = true,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}) {
  if (gradient) {
    return (
      <span
        className={`${className}`}
        style={{
          background: colors.auroraGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {children}
      </span>
    );
  }
  return <span className={className} style={{ color: colors.text }}>{children}</span>;
}

// ============================================
// GLASS CARD COMPONENT
// ============================================
function GlassCard({
  children,
  className = '',
  hover = false,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
}) {
  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: glow ? `0 0 40px ${glow}20` : 'none',
      }}
      whileHover={hover ? {
        borderColor: 'rgba(255,255,255,0.15)',
        y: -4,
        boxShadow: glow ? `0 0 60px ${glow}30` : '0 8px 40px rgba(0,0,0,0.3)',
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SOFT BUTTON COMPONENT
// ============================================
function SoftButton({
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
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const primaryStyle = {
    background: colors.auroraGradient,
    color: '#0a0a12',
    boxShadow: '0 4px 30px rgba(0, 212, 170, 0.3)',
  };

  const secondaryStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: colors.text,
  };

  const content = (
    <motion.span
      className={`inline-flex items-center gap-2 rounded-2xl font-medium ${sizeClasses[size]}`}
      style={variant === 'primary' ? primaryStyle : secondaryStyle}
      whileHover={{
        scale: 1.02,
        boxShadow: variant === 'primary'
          ? '0 8px 40px rgba(0, 212, 170, 0.4)'
          : '0 4px 20px rgba(255,255,255,0.1)',
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
export default function AuroraCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const domains = [
    {
      icon: <Film className="w-7 h-7" />,
      title: 'AI Video Editing',
      desc: 'Transform raw footage into viral content with AI-powered editing tools',
      color: colors.aurora1,
      lessons: 12,
    },
    {
      icon: <Music2 className="w-7 h-7" />,
      title: 'AI Music Production',
      desc: 'Compose original tracks and soundscapes using cutting-edge AI',
      color: colors.aurora2,
      lessons: 10,
    },
    {
      icon: <Feather className="w-7 h-7" />,
      title: 'AI Content Writing',
      desc: 'Craft compelling stories, scripts, and captions that captivate',
      color: colors.aurora3,
      lessons: 11,
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: 'AI Automation',
      desc: 'Build intelligent workflows that free your time for creating',
      color: colors.aurora4,
      lessons: 12,
    },
  ];

  const stats = [
    { value: '45+', label: 'Creative Lessons', icon: <Palette className="w-5 h-5" /> },
    { value: '$150', label: 'Avg Project Value', icon: <Sparkles className="w-5 h-5" /> },
    { value: '98%', label: 'Success Rate', icon: <Star className="w-5 h-5" /> },
    { value: '30', label: 'Days to First Sale', icon: <Wand2 className="w-5 h-5" /> },
  ];

  const testimonials = [
    {
      quote: "Lumora helped me turn my passion for editing into a real income. I've never felt more creatively fulfilled while also supporting myself financially.",
      name: "Maya Rodriguez",
      age: 19,
      role: "Video Creator",
      earned: "$6,200",
    },
    {
      quote: "The courses feel like having a mentor who truly understands the creative process. I learned to work WITH AI, not against it.",
      name: "Jordan Kim",
      age: 24,
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
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <AuroraBackground />
      <FloatingParticles />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <GlassCard className="px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/landing" className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: colors.auroraGradient }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Brush className="w-5 h-5 text-[#0a0a12]" />
                </motion.div>
                <span
                  className="text-xl font-light tracking-[0.3em]"
                  style={{
                    color: colors.text,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                  }}
                >
                  LUMORA
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {['About', 'Courses', 'Projects', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm tracking-wide transition-colors hover:text-white"
                    style={{
                      color: colors.textMuted,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <SoftButton href="/lessons" size="sm">
                Begin Creating
                <Sparkles className="w-4 h-4" />
              </SoftButton>
            </div>
          </GlassCard>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24"
      >
        {/* Decorative blobs */}
        <OrganicBlob className="-top-20 -left-40 opacity-30" color={colors.aurora1} size={500} />
        <OrganicBlob className="top-1/3 -right-20 opacity-20" color={colors.aurora2} size={400} />
        <OrganicBlob className="-bottom-20 left-1/4 opacity-25" color={colors.aurora3} size={450} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Subtle badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" style={{ color: colors.aurora1 }} />
            </motion.div>
            <span
              className="text-sm tracking-widest"
              style={{
                color: colors.textSecondary,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 500,
              }}
            >
              FOR YOUNG CREATORS AGES 16+
            </span>
          </motion.div>

          {/* Main headline - elegant typography */}
          <motion.h1
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-2"
              style={{
                color: colors.text,
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em',
              }}
            >
              Where Creativity
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.02em',
              }}
            >
              <EtherealText>Meets Intelligence</EtherealText>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              color: colors.textSecondary,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 300,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Master AI tools for video, music, writing, and automation.
            Transform your creative vision into real skills that open new opportunities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <SoftButton href="/lessons" size="lg">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </SoftButton>
            <SoftButton href="/projects" variant="secondary" size="lg">
              <Play className="w-5 h-5" />
              Watch Stories
            </SoftButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { value: '10,000+', label: 'Creators' },
              { value: '$50K+', label: 'Earned Together' },
              { value: '4.9/5', label: 'Rating' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-light mb-1"
                  style={{
                    color: colors.text,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs tracking-wider"
                  style={{
                    color: colors.textMuted,
                    fontFamily: "'Nunito', sans-serif",
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-px h-16"
            style={{
              background: `linear-gradient(180deg, ${colors.aurora1}, transparent)`,
            }}
          />
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center" hover>
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{
                      background: colors.auroraGradientSoft,
                      color: colors.aurora1,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div
                    className="text-3xl md:text-4xl font-light mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    <EtherealText>{stat.value}</EtherealText>
                  </div>
                  <div
                    className="text-xs tracking-wider"
                    style={{
                      color: colors.textMuted,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-6xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span style={{ color: colors.text }}>Four Paths to </span>
              <EtherealText>Creative Mastery</EtherealText>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{
                color: colors.textSecondary,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 300,
              }}
            >
              Each domain is a complete journey—from curious beginner to confident creator earning real income
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8" hover glow={domain.color}>
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${domain.color}30, ${domain.color}10)`,
                        border: `1px solid ${domain.color}40`,
                        color: domain.color,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {domain.icon}
                    </motion.div>
                    <div className="flex-grow">
                      <h3
                        className="text-xl font-medium mb-2"
                        style={{
                          color: colors.text,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {domain.title}
                      </h3>
                      <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{
                          color: colors.textSecondary,
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {domain.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm"
                          style={{
                            color: domain.color,
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {domain.lessons} lessons
                        </span>
                        <ArrowRight className="w-4 h-4" style={{ color: domain.color }} />
                      </div>
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
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span style={{ color: colors.text }}>Stories of </span>
              <EtherealText>Transformation</EtherealText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard className="p-10" glow={index === 0 ? colors.aurora1 : colors.aurora2}>
                  <Quote
                    className="w-10 h-10 mb-6 opacity-30"
                    style={{ color: index === 0 ? colors.aurora1 : colors.aurora2 }}
                  />
                  <blockquote
                    className="text-lg mb-8 leading-relaxed"
                    style={{
                      color: colors.text,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium"
                        style={{
                          background: colors.auroraGradient,
                          color: '#0a0a12',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div
                          className="font-medium"
                          style={{
                            color: colors.text,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {t.name}, {t.age}
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: colors.textMuted,
                            fontFamily: "'Nunito', sans-serif",
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{
                        background: 'rgba(0, 212, 170, 0.1)',
                        color: colors.aurora1,
                        fontFamily: "'Nunito', sans-serif",
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-[40px] blur-3xl opacity-30"
              style={{ background: colors.auroraGradient }}
            />

            <GlassCard className="relative p-12 md:p-20 text-center rounded-[40px]">
              {/* Decorative elements */}
              <OrganicBlob className="-top-20 -right-20 opacity-20" color={colors.aurora1} size={200} />
              <OrganicBlob className="-bottom-10 -left-10 opacity-15" color={colors.aurora3} size={150} />

              <motion.div
                className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center"
                style={{ background: colors.auroraGradient }}
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Wand2 className="w-8 h-8 text-[#0a0a12]" />
              </motion.div>

              <h2
                className="text-4xl md:text-6xl font-light mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span style={{ color: colors.text }}>Your Creative </span>
                <EtherealText>Journey Awaits</EtherealText>
              </h2>

              <p
                className="text-lg mb-12 max-w-xl mx-auto"
                style={{
                  color: colors.textSecondary,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 300,
                }}
              >
                Join a community of 10,000+ creators who are turning their passion
                into sustainable income. Begin free, no credit card required.
              </p>

              <SoftButton href="/lessons" size="lg">
                <Sparkles className="w-5 h-5" />
                Begin Creating Today
                <ArrowRight className="w-5 h-5" />
              </SoftButton>

              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm"
                style={{
                  color: colors.textMuted,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {['Free to start', 'No credit card', 'Cancel anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: colors.aurora1 }} />
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
      <footer className="py-16 px-6 border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Brush className="w-5 h-5" style={{ color: colors.aurora1 }} />
            <span
              className="text-sm"
              style={{
                color: colors.textMuted,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              © 2024 Lumora. Crafted for creators.
            </span>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-sm transition-colors hover:text-white"
                style={{
                  color: colors.textMuted,
                  fontFamily: "'Nunito', sans-serif",
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
