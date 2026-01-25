import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Palette, Music, Video, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Neural Stream Landing Page
 *
 * Inspired by Insitro's sophisticated data-visualization aesthetic.
 * Deep navy background, cyan/teal accents, flowing data particles,
 * wireframe geometric elements, and elegant serif typography.
 *
 * Target: Tech-savvy Gen Z creators who appreciate premium, data-driven aesthetics.
 */

// Color palette - Insitro-inspired with creative twist
const colors = {
  bg: '#0a0f1a',
  bgLight: '#0f1628',
  bgCard: '#141c2e',
  navy: '#1a2744',
  cyan: '#00d4ff',
  cyanMuted: '#5eead4',
  gold: '#ffd000',
  purple: '#a78bfa',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  border: 'rgba(0, 212, 255, 0.15)',
};

// Flowing data particle component
function DataStream() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
      isCyan: i % 5 === 0,
      isGold: i % 12 === 0,
    })),
  []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.isGold ? colors.gold : p.isCyan ? colors.cyan : colors.cyanMuted,
            opacity: p.opacity,
            filter: `blur(${p.size > 3 ? 1 : 0}px)`,
            boxShadow: p.isCyan || p.isGold
              ? `0 0 ${p.size * 3}px ${p.isGold ? colors.gold : colors.cyan}40`
              : 'none',
          }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Wireframe hexagon grid overlay
function HexGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse">
          <polygon
            points="28,2 54,18 54,52 28,68 2,52 2,18"
            fill="none"
            stroke={colors.cyan}
            strokeWidth="1"
          />
          <polygon
            points="28,34 54,50 54,84 28,100 2,84 2,50"
            fill="none"
            stroke={colors.cyan}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  );
}

// Animated wireframe sphere
function WireframeSphere() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* Longitude lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse
            key={`lon-${i}`}
            cx="200"
            cy="200"
            rx="150"
            ry="150"
            fill="none"
            stroke={colors.cyan}
            strokeWidth="0.5"
            transform={`rotate(${i * 15} 200 200)`}
            style={{
              transformOrigin: 'center',
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        ))}
        {/* Latitude lines */}
        {Array.from({ length: 8 }, (_, i) => {
          const radius = 30 + i * 18;
          return (
            <circle
              key={`lat-${i}`}
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke={colors.cyan}
              strokeWidth="0.5"
              opacity={0.3 + i * 0.08}
            />
          );
        })}
        {/* Accent points */}
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 100 + Math.sin(i * 0.8) * 40;
          const x = 200 + Math.cos(angle) * radius;
          const y = 200 + Math.sin(angle) * radius;
          return (
            <circle
              key={`point-${i}`}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 3 : 1.5}
              fill={i % 4 === 0 ? colors.gold : colors.cyan}
              opacity={0.6}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}

// Hexagonal image frame component
function HexFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      >
        {children}
      </div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points="25,0 75,0 100,50 75,100 25,100 0,50"
          fill="none"
          stroke={colors.cyan}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

// Section number with gradient line
function SectionNumber({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
        style={{
          background: `linear-gradient(135deg, ${colors.cyan}20, ${colors.gold}20)`,
          border: `2px solid ${colors.cyan}40`,
          color: colors.cyan,
        }}
      >
        {number}
      </div>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${colors.cyan}40, ${colors.gold}20, transparent)`,
        }}
      />
      <span
        className="text-sm font-medium uppercase tracking-widest"
        style={{ color: colors.textMuted }}
      >
        {title}
      </span>
    </div>
  );
}

// Domain card with data visualization accent
function DomainCard({
  icon: Icon,
  title,
  description,
  stats,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  stats: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div
        className="relative p-8 rounded-2xl h-full transition-all duration-500"
        style={{
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${colors.cyan}10, transparent 70%)`,
          }}
        />

        {/* Icon with hexagonal background */}
        <div className="relative mb-6">
          <div
            className="w-16 h-16 flex items-center justify-center"
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              background: `linear-gradient(135deg, ${colors.cyan}20, ${colors.purple}10)`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: colors.cyan }} />
          </div>
        </div>

        {/* Content */}
        <h3
          className="text-2xl font-semibold mb-3"
          style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h3>
        <p className="mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
          {description}
        </p>

        {/* Stats bar */}
        <div
          className="flex items-center gap-3 pt-4"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <div
            className="h-1 flex-1 rounded-full overflow-hidden"
            style={{ backgroundColor: `${colors.cyan}20` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.cyan}, ${colors.gold})`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: '70%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: delay + 0.3 }}
            />
          </div>
          <span className="text-sm font-medium" style={{ color: colors.gold }}>
            {stats}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function NeuralStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progressWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    { stiffness: 100, damping: 30 }
  );

  const domains = [
    {
      icon: Palette,
      title: 'Visual Arts',
      description: 'Generate, edit, and enhance images with AI. From concept art to photo manipulation.',
      stats: '12 courses',
    },
    {
      icon: Music,
      title: 'Audio Creation',
      description: 'Compose music, design sounds, and master audio production with intelligent tools.',
      stats: '8 courses',
    },
    {
      icon: Video,
      title: 'Video & Motion',
      description: 'Create stunning videos, animations, and visual effects powered by machine learning.',
      stats: '10 courses',
    },
    {
      icon: Zap,
      title: 'Generative AI',
      description: 'Master prompt engineering, model training, and creative AI workflows.',
      stats: '15 courses',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Background elements */}
      <DataStream />
      <HexGrid />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-50"
        style={{
          width: progressWidth.get() + '%',
          background: `linear-gradient(90deg, ${colors.cyan}, ${colors.gold})`,
        }}
      />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        style={{
          backgroundColor: `${colors.bg}e6`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                background: `linear-gradient(135deg, ${colors.cyan}, ${colors.gold})`,
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: colors.bg }} />
            </div>
            <span
              className="text-xl font-semibold"
              style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
            >
              Lumora
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Platform', 'Courses', 'Community', 'Pricing'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: colors.textSecondary }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-sm font-medium transition-colors"
              style={{ color: colors.textSecondary }}
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: colors.gold,
                color: colors.bg,
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <WireframeSphere />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{
                  backgroundColor: `${colors.cyan}15`,
                  border: `1px solid ${colors.cyan}30`,
                  color: colors.cyan,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.gold }} />
                Now in Beta
              </div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
                style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
              >
                The Creative
                <br />
                <span style={{ color: colors.cyan }}>Intelligence</span>
                <br />
                Platform
              </h1>

              {/* Subheadline */}
              <p
                className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl"
                style={{ color: colors.textSecondary, fontFamily: "'Inter', sans-serif" }}
              >
                Master AI-powered creativity through structured learning paths,
                hands-on projects, and a community of forward-thinking creators.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/sign-up"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.gold,
                    color: colors.bg,
                  }}
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/landing"
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:bg-opacity-80"
                  style={{
                    backgroundColor: `${colors.cyan}15`,
                    color: colors.cyan,
                    border: `1px solid ${colors.cyan}30`,
                  }}
                >
                  View Showcase
                </Link>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-12 mt-16 pt-10"
              style={{ borderTop: `1px solid ${colors.border}` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {[
                { value: '45+', label: 'AI Courses' },
                { value: '4', label: 'Creative Domains' },
                { value: '100%', label: 'Project-Based' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ color: colors.cyan, fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.textMuted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionNumber number="01" title="Creative Domains" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
            >
              Four Pillars of
              <br />
              <span style={{ color: colors.gold }}>AI Creativity</span>
            </h2>
            <p
              className="text-xl max-w-2xl"
              style={{ color: colors.textSecondary }}
            >
              Comprehensive learning paths designed to take you from fundamentals
              to professional-grade AI creative workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, index) => (
              <DomainCard key={domain.title} {...domain} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="relative py-32 px-6" style={{ backgroundColor: colors.bgLight }}>
        <div className="max-w-7xl mx-auto">
          <SectionNumber number="02" title="Platform Features" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
              >
                Learn by
                <br />
                <span style={{ color: colors.cyan }}>Creating</span>
              </h2>
              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                Every lesson leads to a tangible creative output. Build your portfolio
                while you learn, with AI-assisted feedback and community collaboration.
              </p>

              <div className="space-y-6">
                {[
                  'Hands-on projects with real-world applications',
                  'AI-powered feedback and suggestions',
                  'Community showcase and collaboration',
                  'Certificate upon completion',
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.cyan}30, ${colors.gold}20)`,
                      }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: colors.cyan }} />
                    </div>
                    <span style={{ color: colors.text }}>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 mt-10 text-lg font-medium transition-colors group"
                style={{ color: colors.gold }}
              >
                Explore Curriculum
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Hexagonal frame showcase */}
              <HexFrame className="w-full aspect-square max-w-md mx-auto">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.navy}, ${colors.bgCard})`,
                  }}
                >
                  <div className="text-center p-8">
                    <div
                      className="text-6xl font-bold mb-4"
                      style={{ color: colors.cyan, fontFamily: "'Playfair Display', serif" }}
                    >
                      45+
                    </div>
                    <div className="text-xl" style={{ color: colors.text }}>
                      AI-Powered
                      <br />
                      Creative Courses
                    </div>
                  </div>
                </div>
              </HexFrame>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                    fill="none"
                    stroke={colors.gold}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Create with
              <br />
              <span style={{ color: colors.cyan }}>Intelligence?</span>
            </h2>
            <p
              className="text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: colors.textSecondary }}
            >
              Join thousands of creators mastering the intersection of
              artificial intelligence and human creativity.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/sign-up"
                className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.gold,
                  color: colors.bg,
                }}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold rounded-xl transition-all"
                style={{
                  backgroundColor: `${colors.cyan}15`,
                  color: colors.cyan,
                  border: `1px solid ${colors.cyan}30`,
                }}
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-16 px-6"
        style={{
          backgroundColor: colors.bgLight,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    background: `linear-gradient(135deg, ${colors.cyan}, ${colors.gold})`,
                  }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: colors.bg }} />
                </div>
                <span
                  className="text-xl font-semibold"
                  style={{ color: colors.text, fontFamily: "'Playfair Display', serif" }}
                >
                  Lumora
                </span>
              </Link>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                The creative intelligence platform for the next generation of AI artists.
              </p>
            </div>

            {[
              { title: 'Platform', links: ['Courses', 'Projects', 'Community', 'Pricing'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: colors.textMuted }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 flex flex-wrap justify-between items-center gap-4"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            <p className="text-sm" style={{ color: colors.textMuted }}>
              © 2024 Lumora. All rights reserved.
            </p>
            <Link
              to="/landing"
              className="text-sm transition-colors"
              style={{ color: colors.cyan }}
            >
              ← Back to Showcase
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
