import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipForward, Volume2, Layers, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/**
 * Vapor Studio Landing Page
 *
 * Theme: Music production app aesthetic (Ableton/FL Studio inspired)
 * References: Dark DAW interfaces, waveforms, channel strips, vapor gradients
 * Target: Creative Gen Z who want professional tool vibes
 *
 * Design DNA:
 * - Dark foundation (#0a0a0f) with vapor gradient overlays
 * - Neon cyan (#00d4ff) + magenta (#ff006e) + purple (#8b5cf6) accents
 * - Waveform visualizations, audio-inspired UI elements
 * - Glass panels mimicking mixer channels
 * - Grid-based layout like DAW arrange view
 */

// Color system - Music production inspired
const vapor = {
  bg: '#0a0a0f',
  bgElevated: '#12121a',
  bgPanel: '#1a1a24',
  bgGlass: 'rgba(20, 20, 30, 0.7)',

  cyan: '#00d4ff',
  cyanGlow: 'rgba(0, 212, 255, 0.4)',
  magenta: '#ff006e',
  magentaGlow: 'rgba(255, 0, 110, 0.3)',
  purple: '#8b5cf6',
  purpleGlow: 'rgba(139, 92, 246, 0.3)',
  gold: '#fbbf24',

  text: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',

  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(0, 212, 255, 0.3)',
};

// Animated waveform component
function Waveform({ color = vapor.cyan, bars = 40 }: { color?: string; bars?: number }) {
  return (
    <div className="flex items-center justify-center gap-[2px] h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: [
              `${20 + Math.random() * 30}%`,
              `${50 + Math.random() * 50}%`,
              `${20 + Math.random() * 30}%`,
            ],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

// Glass panel component (like mixer channel)
function GlassPanel({
  children,
  className = '',
  glow,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'magenta' | 'purple';
  hover?: boolean;
}) {
  const glowColors = {
    cyan: `0 0 40px ${vapor.cyanGlow}`,
    magenta: `0 0 40px ${vapor.magentaGlow}`,
    purple: `0 0 40px ${vapor.purpleGlow}`,
  };

  return (
    <motion.div
      className={`
        relative backdrop-blur-xl rounded-xl p-6
        border border-white/10
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        background: vapor.bgGlass,
        boxShadow: glow ? glowColors[glow] : 'none',
      }}
      whileHover={hover ? {
        borderColor: vapor.borderHover,
        y: -4,
        transition: { duration: 0.2 },
      } : {}}
    >
      {children}
    </motion.div>
  );
}

// Vapor gradient text
function VaporText({
  children,
  className = '',
  variant = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'gold';
}) {
  const gradients = {
    primary: `linear-gradient(135deg, ${vapor.cyan} 0%, ${vapor.purple} 50%, ${vapor.magenta} 100%)`,
    secondary: `linear-gradient(135deg, ${vapor.magenta} 0%, ${vapor.purple} 100%)`,
    gold: `linear-gradient(135deg, ${vapor.gold} 0%, ${vapor.cyan} 100%)`,
  };

  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: gradients[variant] }}
    >
      {children}
    </span>
  );
}

// Playback button (DAW inspired)
function PlayButton({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-16 h-16 rounded-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${vapor.cyan}, ${vapor.purple})`,
        boxShadow: `0 0 30px ${vapor.cyanGlow}`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {playing ? (
        <Pause className="w-6 h-6 text-white ml-0" />
      ) : (
        <Play className="w-6 h-6 text-white ml-1" />
      )}
    </motion.button>
  );
}

// Channel strip component
function ChannelStrip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-2 h-24 rounded-full relative overflow-hidden"
        style={{ background: vapor.bgPanel }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          whileInView={{ height: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-mono" style={{ color: vapor.textMuted }}>
        {label}
      </span>
    </div>
  );
}

// Floating orb background element
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: vapor.cyanGlow, top: '10%', left: '10%' }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: vapor.magentaGlow, top: '50%', right: '10%' }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-25"
        style={{ background: vapor.purpleGlow, bottom: '20%', left: '30%' }}
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function VaporStudio() {
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const domains = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Video',
      desc: 'Edit viral content',
      color: vapor.cyan,
      value: 85,
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'Music',
      desc: 'Produce original tracks',
      color: vapor.magenta,
      value: 72,
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Writing',
      desc: 'Create compelling copy',
      color: vapor.purple,
      value: 90,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Automation',
      desc: 'Build smart workflows',
      color: vapor.gold,
      value: 68,
    },
  ];

  const stats = [
    { label: 'Lessons', value: '45', suffix: '+' },
    { label: 'Avg Project Value', value: '$150', suffix: '' },
    { label: 'Success Rate', value: '98', suffix: '%' },
    { label: 'Days to Earn', value: '30', suffix: '' },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: vapor.bg }}
    >
      <FloatingOrbs />

      {/* Navigation - Transport bar style */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{ borderColor: vapor.border, background: 'rgba(10, 10, 15, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${vapor.cyan}, ${vapor.purple})` }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: vapor.text }}>
              Lumora
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/lessons"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: vapor.textSecondary }}
            >
              Courses
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: vapor.textSecondary }}
            >
              Projects
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${vapor.cyan}, ${vapor.purple})`,
                boxShadow: `0 0 20px ${vapor.cyanGlow}`,
              }}
            >
              Start Creating
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - DAW Arrange View style */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative pt-32 pb-24 px-6 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
                style={{ background: vapor.bgPanel, color: vapor.cyan }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: vapor.cyan }} />
                Now in Beta
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span style={{ color: vapor.text }}>Create like a</span>
                <br />
                <VaporText variant="primary" className="font-black">
                  Pro Studio.
                </VaporText>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-lg" style={{ color: vapor.textSecondary }}>
                Master AI-powered video editing, music production, content writing, and automation.
                Build your portfolio. Start earning in 30 days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/lessons"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${vapor.cyan}, ${vapor.purple})`,
                    boxShadow: `0 4px 30px ${vapor.cyanGlow}`,
                  }}
                >
                  Start Learning Free
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all border hover:bg-white/5"
                  style={{ color: vapor.text, borderColor: vapor.border }}
                >
                  View Projects
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex gap-8">
                {[
                  { label: 'Creators', value: '10K+' },
                  { label: 'Projects', value: '500+' },
                  { label: 'Earned', value: '$50K+' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold" style={{ color: vapor.text }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: vapor.textMuted }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual element - Mixer/Waveform */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <GlassPanel glow="cyan" className="p-8">
                {/* Transport controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <PlayButton playing={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
                    <button className="p-3 rounded-lg transition-colors hover:bg-white/10">
                      <SkipForward className="w-5 h-5" style={{ color: vapor.textSecondary }} />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl font-bold" style={{ color: vapor.cyan }}>
                      00:00:00
                    </div>
                    <div className="text-sm" style={{ color: vapor.textMuted }}>
                      Your creative journey
                    </div>
                  </div>
                </div>

                {/* Waveform */}
                <div className="mb-8 p-4 rounded-lg" style={{ background: vapor.bgPanel }}>
                  <Waveform color={vapor.cyan} bars={50} />
                </div>

                {/* Channel strips */}
                <div className="flex justify-between px-4">
                  {domains.map((domain) => (
                    <ChannelStrip
                      key={domain.title}
                      label={domain.title}
                      value={domain.value}
                      color={domain.color}
                    />
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent, ${vapor.bgElevated}, transparent)`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    <VaporText variant={index % 2 === 0 ? 'primary' : 'secondary'}>
                      {stat.value}{stat.suffix}
                    </VaporText>
                  </div>
                  <div className="text-sm font-medium" style={{ color: vapor.textMuted }}>
                    {stat.label}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section - Track Lanes */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <VaporText>Master 4 Creative Domains</VaporText>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: vapor.textSecondary }}>
              Each domain is a complete skill path—from basics to earning real money
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel hover className="flex items-center gap-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${domain.color}20, ${domain.color}40)`,
                      border: `1px solid ${domain.color}50`,
                    }}
                  >
                    <div style={{ color: domain.color }}>{domain.icon}</div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-1" style={{ color: vapor.text }}>
                      {domain.title}
                    </h3>
                    <p style={{ color: vapor.textSecondary }}>{domain.desc}</p>
                  </div>
                  <div className="hidden sm:block">
                    <div
                      className="w-20 h-2 rounded-full overflow-hidden"
                      style={{ background: vapor.bgPanel }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: domain.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${domain.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="text-xs mt-1 text-right" style={{ color: vapor.textMuted }}>
                      {domain.value}% complete
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Single Impact */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassPanel glow="magenta" className="text-center p-12">
              <div className="mb-8">
                <Waveform color={vapor.magenta} bars={30} />
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8" style={{ color: vapor.text }}>
                "I made my first $500 editing TikToks for a brand.
                <span style={{ color: vapor.magenta }}> In just 3 weeks.</span>
                Lumora taught me everything I needed."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${vapor.magenta}, ${vapor.purple})`,
                    color: vapor.text,
                  }}
                >
                  MC
                </div>
                <div className="text-left">
                  <div className="font-semibold" style={{ color: vapor.text }}>
                    Marcus Chen, 19
                  </div>
                  <div className="text-sm" style={{ color: vapor.textMuted }}>
                    Video Editor • $2,400 earned
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
              style={{
                background: `linear-gradient(135deg, ${vapor.cyanGlow}, ${vapor.purpleGlow}, ${vapor.magentaGlow})`,
              }}
            />
            <GlassPanel className="relative text-center p-12 rounded-3xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span style={{ color: vapor.text }}>Ready to </span>
                <VaporText>Create?</VaporText>
              </h2>
              <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: vapor.textSecondary }}>
                Join 10,000+ creators mastering AI tools and earning real money.
                Free to start. No credit card required.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-bold text-white transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${vapor.cyan}, ${vapor.purple}, ${vapor.magenta})`,
                  boxShadow: `0 4px 40px ${vapor.cyanGlow}`,
                }}
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="mt-6 text-sm" style={{ color: vapor.textMuted }}>
                Free tier forever • Premium from $9.99/mo
              </p>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: vapor.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2" style={{ color: vapor.textMuted }}>
            <Sparkles className="w-4 h-4" style={{ color: vapor.cyan }} />
            <span className="text-sm">© 2024 Lumora. Create like a pro.</span>
          </div>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm transition-colors hover:text-white"
              style={{ color: vapor.textMuted }}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm transition-colors hover:text-white"
              style={{ color: vapor.textMuted }}
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
