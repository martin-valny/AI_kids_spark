import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Film, Music, PenTool, Zap, Check } from 'lucide-react';

/**
 * Lumora Video - Cinematic Hero Landing
 *
 * Dark theme with looping background video in hero section
 * Aqua color scheme, glassmorphism cards, parallax light beams
 * Focus on Gen Z creators learning AI tools
 *
 * LUMORA SPIRIT: Skills & Portfolio First
 * Bold messaging, real tools, real projects, real skills
 */

const colors = {
  bg: '#050807',
  bgSecondary: '#0a0d0c',
  bgElevated: 'rgba(10, 13, 12, 0.9)',
  text: '#e6fff6',
  textSecondary: 'rgba(230, 255, 246, 0.72)',
  textMuted: 'rgba(230, 255, 246, 0.48)',
  aqua: '#78ffdc',
  aquaSecondary: '#5ee8c5',
  aquaSubtle: 'rgba(120, 255, 220, 0.12)',
  border: 'rgba(120, 255, 220, 0.12)',
  glow: 'rgba(120, 255, 220, 0.25)',
  cardBg: 'rgba(10, 13, 12, 0.6)',
  cardBorder: 'rgba(120, 255, 220, 0.1)',
};

// Animated background with grid and light beams
function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 700px at 28% 18%, rgba(120, 255, 220, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 1200px 900px at 72% 62%, rgba(94, 232, 197, 0.06) 0%, transparent 62%),
            radial-gradient(ellipse 800px 520px at 50% 102%, rgba(77, 217, 180, 0.05) 0%, transparent 52%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120, 255, 220, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 255, 220, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.22,
        }}
      />

      {/* Light beams */}
      <motion.div
        className="absolute w-0.5 h-[120%]"
        style={{
          left: '32%',
          background: `linear-gradient(transparent, ${colors.glow}, transparent)`,
          opacity: 0.25,
        }}
        animate={{ y: ['-20%', '20%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-0.5 h-[120%]"
        style={{
          left: '68%',
          background: `linear-gradient(transparent, ${colors.glow}, transparent)`,
          opacity: 0.25,
        }}
        animate={{ y: ['-20%', '20%'] }}
        transition={{ duration: 10, delay: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Animated metric counter
function Metric({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/\D/g, ''));
  const hasPlus = value.includes('+');
  const hasK = value.includes('K') || value.includes('k');

  useEffect(() => {
    if (!isInView) return;
    const end = numericValue;
    let current = 0;
    const step = Math.max(1, Math.floor(end / 40));

    const id = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(current);
      }
    }, 30);

    return () => clearInterval(id);
  }, [isInView, numericValue]);

  const displayValue = hasK ? `${count}K${hasPlus ? '+' : ''}` : `${count}${hasPlus ? '+' : ''}`;

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold mb-1" style={{ color: colors.aqua }}>
        {displayValue}
      </div>
      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.text }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs mt-1" style={{ color: colors.textMuted }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// Glass card with hover glow
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-[14px] overflow-hidden ${className}`}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(120deg, transparent, rgba(120, 255, 220, 0.1), transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Domain card
function DomainCard({
  icon: Icon,
  title,
  tools,
  description,
  image,
}: {
  icon: React.ElementType;
  title: string;
  tools: string;
  description: string;
  image: string;
}) {
  return (
    <GlassCard>
      <img
        src={image}
        alt={title}
        className="w-full aspect-[16/10] object-cover"
        style={{ background: `linear-gradient(135deg, ${colors.aquaSubtle} 0%, rgba(94, 232, 197, 0.05) 100%)` }}
      />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5" style={{ color: colors.aqua }} />
          <h3 className="text-lg font-bold uppercase" style={{ color: colors.text }}>
            {title}
          </h3>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: colors.aqua }}>
          {tools}
        </p>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          {description}
        </p>
      </div>
    </GlassCard>
  );
}

// Process step card
function ProcessCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6"
        style={{
          background: colors.aqua,
          color: colors.bg,
          boxShadow: `0 0 40px rgba(120, 255, 220, 0.5), 0 0 80px rgba(120, 255, 220, 0.25)`,
        }}
      >
        {number}
      </div>
      <h3 className="text-xl font-bold uppercase mb-3" style={{ color: colors.text }}>
        {title}
      </h3>
      <p style={{ color: colors.textSecondary }}>{description}</p>
    </div>
  );
}

// Feature showcase card
function FeatureCard({ image, title, lessons }: { image: string; title: string; lessons: number }) {
  return (
    <motion.div
      className="relative aspect-square rounded-[14px] overflow-hidden cursor-pointer"
      style={{ border: `1px solid ${colors.cardBorder}` }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${colors.aquaSubtle} 0%, rgba(94, 232, 197, 0.08) 100%)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 p-6"
        style={{
          background: `linear-gradient(to top, rgba(5, 8, 7, 0.95) 0%, rgba(5, 8, 7, 0.6) 60%, transparent 100%)`,
        }}
      >
        <h3 className="text-base font-bold uppercase text-white">{title}</h3>
        <span
          className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: colors.aquaSubtle,
            border: `1px solid rgba(120, 255, 220, 0.3)`,
            color: colors.aqua,
          }}
        >
          {lessons} Lessons
        </span>
      </div>
    </motion.div>
  );
}

export default function LumoraVideo() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ background: colors.bg, color: colors.text }}>
      <VideoBackground />

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[10000]"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(135deg, ${colors.aqua} 0%, ${colors.aquaSecondary} 100%)`,
        }}
      />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] px-6 py-5 flex justify-between items-center"
        style={{
          background: 'rgba(5, 8, 7, 0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid rgba(120, 255, 220, 0.08)`,
        }}
      >
        <div
          className="text-2xl font-black uppercase tracking-wider"
          style={{
            color: colors.aqua,
            filter: `drop-shadow(0 0 16px rgba(120, 255, 220, 0.6))`,
          }}
        >
          LUMORA
        </div>
        <div className="flex items-center gap-8">
          <a href="#domains" className="hidden md:block text-sm font-semibold uppercase tracking-wide" style={{ color: colors.textSecondary }}>
            Domains
          </a>
          <a href="#process" className="hidden md:block text-sm font-semibold uppercase tracking-wide" style={{ color: colors.textSecondary }}>
            Process
          </a>
          <motion.button
            className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide"
            style={{ background: colors.aqua, color: colors.bg }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
          </motion.button>
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center text-center pt-32 pb-16 px-6 z-10 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-35"
          >
            <source src="https://cdn.pixabay.com/video/2020/05/25/40130-424930941_large.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(5, 8, 7, 0.7) 0%, rgba(5, 8, 7, 0.4) 40%, rgba(5, 8, 7, 0.6) 70%, rgba(5, 8, 7, 0.95) 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-6"
            style={{ letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MASTER AI.
            <br />
            <span style={{ color: colors.aqua, textShadow: `0 0 40px rgba(120, 255, 220, 0.5)` }}>
              CREATE EVERYTHING.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn real tools. Build real projects. Get real skills. No theory. No fluff. Just work you're proud of that
            gets you paid.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 rounded-lg font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2"
              style={{
                background: colors.aqua,
                color: colors.bg,
                boxShadow: `0 0 30px rgba(120, 255, 220, 0.4)`,
              }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg font-bold text-base uppercase tracking-wide"
              style={{
                background: 'transparent',
                color: colors.aqua,
                border: `2px solid ${colors.aqua}`,
              }}
              whileHover={{ scale: 1.02, y: -3, background: 'rgba(120, 255, 220, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              See Student Work
            </motion.button>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(120, 255, 220, 0.15)`,
              boxShadow: `0 24px 70px rgba(0, 0, 0, 0.65), 0 0 60px rgba(120, 255, 220, 0.15)`,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop&auto=format"
              alt="Lumora Platform Preview"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Metric value="45+" label="Lessons" sublabel="Hands-on projects" />
          <Metric value="4" label="Domains" sublabel="Video, Music, Writing, Automation" />
          <Metric value="10K+" label="Creators" sublabel="Learning worldwide" />
          <Metric value="3" label="Portfolio Projects" sublabel="Graduate with real work" />
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="relative z-10 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: colors.aquaSubtle,
                border: `1px solid rgba(120, 255, 220, 0.25)`,
                color: colors.aqua,
              }}
            >
              Master 4 Creative Domains
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-4">
              Real tools. <span style={{ color: colors.aqua }}>Real skills.</span> Real portfolio pieces.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
              Learn the AI tools professionals use to create viral content, automate workflows, and build creative
              businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DomainCard
              icon={Film}
              title="AI Video Editing"
              tools="CapCut AI, Premiere, After Effects"
              description="Edit for YouTubers, TikTokers, and brands. Create scroll-stopping content that gets views."
              image="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=375&fit=crop&auto=format"
            />
            <DomainCard
              icon={Music}
              title="AI Music Production"
              tools="Suno, Udio, FL Studio"
              description="Create beats, produce tracks, and release your sound. Build your producer portfolio."
              image="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=375&fit=crop&auto=format"
            />
            <DomainCard
              icon={PenTool}
              title="AI Content Writing"
              tools="ChatGPT, Claude, Jasper"
              description="Write scripts, social copy, and content that converts. Master prompts that work."
              image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=375&fit=crop&auto=format"
            />
            <DomainCard
              icon={Zap}
              title="AI Automation"
              tools="Make.com, Zapier, n8n"
              description="Build workflows that run on autopilot. Save 10+ hours/week and charge premium rates."
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=375&fit=crop&auto=format"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: colors.aquaSubtle,
                border: `1px solid rgba(120, 255, 220, 0.25)`,
                color: colors.aqua,
              }}
            >
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-4">
              From zero to <span style={{ color: colors.aqua }}>portfolio-ready</span> in weeks
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Our project-based curriculum gets you creating immediately
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard
              number={1}
              title="Pick Your Domain"
              description="Choose from Video, Music, Writing, or Automation. Start with what excites you most."
            />
            <ProcessCard
              number={2}
              title="Learn By Doing"
              description="Every lesson is hands-on. No theory dumps—create real projects from day one."
            />
            <ProcessCard
              number={3}
              title="Build Your Portfolio"
              description="Graduate with 3+ portfolio pieces and skills to land freelance clients."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: colors.aquaSubtle,
                border: `1px solid rgba(120, 255, 220, 0.25)`,
                color: colors.aqua,
              }}
            >
              What You'll Create
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase">
              Explore what's possible when <span style={{ color: colors.aqua }}>imagination meets AI</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              image="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&auto=format"
              title="TikTok & Reels"
              lessons={12}
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&auto=format"
              title="Beat Production"
              lessons={10}
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=600&fit=crop&auto=format"
              title="Social Copy"
              lessons={12}
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&auto=format"
              title="Business Automation"
              lessons={11}
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop&auto=format"
              title="YouTube Editing"
              lessons={8}
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop&auto=format"
              title="Podcast Audio"
              lessons={6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center p-12 rounded-2xl"
          style={{
            background: colors.cardBg,
            border: `1px solid rgba(120, 255, 220, 0.15)`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 24px 70px rgba(0, 0, 0, 0.5), 0 0 60px rgba(120, 255, 220, 0.1)`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-4">
            Ready to build <span style={{ color: colors.aqua }}>something real?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
            Join 10,000+ creators learning AI skills that actually matter
          </p>

          <motion.button
            className="px-10 py-5 rounded-lg font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-3 mx-auto"
            style={{
              background: colors.aqua,
              color: colors.bg,
              boxShadow: `0 0 40px rgba(120, 255, 220, 0.4)`,
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Free — No Credit Card
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {['Free to Start', 'No Credit Card', 'Learn at Your Pace', 'Safe Community'].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: colors.aqua }} />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-8 px-6 text-center"
        style={{ borderTop: `1px solid ${colors.cardBorder}` }}
      >
        <p className="text-sm" style={{ color: colors.textMuted }}>
          &copy; 2024 Lumora. Built for creators who build.
        </p>
      </footer>
    </div>
  );
}
