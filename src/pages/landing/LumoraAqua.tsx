import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { lumoraAqua } from '@/constants/landingColors';

/**
 * Lumora Aqua - Precision Tech Aesthetic
 *
 * Dark grid background with animated aqua light beams
 * Glass morphism cards, breathing animations, parallax effects
 */

// Animated background with grid and light beams
function AquaBackground() {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      const grid = document.querySelector('.aqua-grid') as HTMLElement;
      if (grid) {
        grid.style.transform = `translateY(${y * 0.05}px)`;
      }

      document.querySelectorAll('.aqua-beam').forEach((b, i) => {
        (b as HTMLElement).style.transform = `translateY(${y * (0.08 + i * 0.02)}px)`;
      });
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: lumoraAqua.bgGradient,
        animation: 'bgBreathe 18s ease-in-out infinite',
      }}
    >
      {/* Grid overlay */}
      <div
        className="aqua-grid absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(${lumoraAqua.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${lumoraAqua.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.22,
        }}
      />

      {/* Animated light beams */}
      <motion.div
        className="aqua-beam absolute w-0.5 h-[120%] will-change-transform"
        style={{
          left: '32%',
          background: `linear-gradient(transparent, ${lumoraAqua.aquaGlow}, transparent)`,
          opacity: 0.25,
        }}
        animate={{ y: ['-20%', '20%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="aqua-beam absolute w-0.5 h-[120%] will-change-transform"
        style={{
          left: '68%',
          background: `linear-gradient(transparent, ${lumoraAqua.aquaGlow}, transparent)`,
          opacity: 0.25,
        }}
        animate={{ y: ['-20%', '20%'] }}
        transition={{ duration: 10, delay: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* CSS for breathing animation */}
      <style>{`
        @keyframes bgBreathe {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.04) saturate(1.06); }
        }
      `}</style>
    </div>
  );
}

// Tech title with animated glow
function TechTitle({ text }: { text: string }) {
  return (
    <motion.h1
      className="text-6xl md:text-7xl lg:text-[86px] font-extrabold tracking-tight mb-4"
      style={{ color: lumoraAqua.text, letterSpacing: '-0.03em' }}
      initial={{ textShadow: '0 0 0 rgba(120,255,220,0)' }}
      whileInView={{ textShadow: '0 0 26px rgba(120,255,220,0.35)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
    >
      {text}
    </motion.h1>
  );
}

// Glass card with hover glow effect
function TechCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative p-5 rounded-[14px] ${className}`}
      style={{
        background: lumoraAqua.cardBg,
        border: `1px solid ${lumoraAqua.cardBorder}`,
        boxShadow: lumoraAqua.cardShadow,
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-[14px] pointer-events-none"
        style={{
          background: `linear-gradient(120deg, transparent, ${lumoraAqua.cardGlow}, transparent)`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Animated metric counter
function Metric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = parseInt(value.replace(/\D/g, ''));
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
  }, [isInView, value]);

  const displayValue = value.includes('%') ? `${count}%` : value.includes('x') ? `${count}x` : `${count}+`;

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-[36px] font-extrabold"
        style={{ color: lumoraAqua.aqua }}
      >
        {displayValue}
      </div>
      <div
        className="text-sm mt-1"
        style={{ color: lumoraAqua.textMuted }}
      >
        {label}
      </div>
    </div>
  );
}

export default function LumoraAqua() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: lumoraAqua.bg, color: lumoraAqua.text }}
    >
      <AquaBackground />

      {/* Hero Section */}
      <main className="min-h-screen flex items-center py-24 px-8 relative z-10">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          {/* Left: Title & Subtitle */}
          <section>
            <TechTitle text="Lumora" />
            <p
              className="text-lg"
              style={{ color: lumoraAqua.textSecondary }}
            >
              Precision tooling for building creative AI systems.
            </p>
          </section>

          {/* Right: Feature Cards */}
          <aside className="flex flex-col gap-4">
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                AI Video Studio
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Design and edit AI-powered videos with confidence.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Learning Engine
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Personalized 5-15 minute lessons that stick.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Portfolio Builder
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Ship real projects into your portfolio.
              </p>
            </TechCard>
          </aside>
        </div>
      </main>

      {/* Metrics Section */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Metric value="45+" label="Hands-on AI lessons" />
          <Metric value="98%" label="Student success rate" />
          <Metric value="12000+" label="Projects created" />
          <Metric value="3x" label="Learning velocity" />
        </div>
      </section>

      {/* System Blocks Section */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3
            className="text-center text-xl font-medium mb-8 tracking-wide"
            style={{ color: lumoraAqua.textMuted, letterSpacing: '0.04em' }}
          >
            PLATFORM CAPABILITIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Signal Processing
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Master prompts, embeddings, and AI inputs.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Creative Execution
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Build video, music, and content projects.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Evaluation Tools
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Track progress with automated feedback.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold mb-1" style={{ color: lumoraAqua.text }}>
                Portfolio Export
              </h4>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Deploy real work to showcase skills.
              </p>
            </TechCard>
          </div>
        </div>
      </section>

      {/* Student Showcase Section */}
      <section className="relative z-10 py-16 px-8 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <h3
            className="text-center text-xl font-medium mb-8 tracking-wide"
            style={{ color: lumoraAqua.textMuted, letterSpacing: '0.04em' }}
          >
            STUDENT WORK
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TechCard>
              <h4 className="text-lg font-semibold" style={{ color: lumoraAqua.text }}>
                AI Art Assistant
              </h4>
              <p className="text-sm mt-1" style={{ color: lumoraAqua.textSecondary }}>
                Generate and refine artwork with AI guidance.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold" style={{ color: lumoraAqua.text }}>
                Learning Tutor Bot
              </h4>
              <p className="text-sm mt-1" style={{ color: lumoraAqua.textSecondary }}>
                Personalized tutoring powered by AI.
              </p>
            </TechCard>
            <TechCard>
              <h4 className="text-lg font-semibold" style={{ color: lumoraAqua.text }}>
                Story Generator
              </h4>
              <p className="text-sm mt-1" style={{ color: lumoraAqua.textSecondary }}>
                Create interactive narratives with AI.
              </p>
            </TechCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-8 px-8 text-center"
        style={{ borderTop: `1px solid ${lumoraAqua.cardBorder}` }}
      >
        <p className="text-sm" style={{ color: lumoraAqua.textMuted }}>
          © 2024 Lumora. Precision tech design.
        </p>
      </footer>
    </div>
  );
}
