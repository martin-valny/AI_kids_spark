import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Film, Music, PenTool, Zap, Check } from 'lucide-react';
import { lumoraAqua } from '@/constants/landingColors';

/**
 * Lumora Aqua - Precision Tech Aesthetic
 *
 * Dark grid background with animated aqua light beams
 * Glass morphism cards, breathing animations, parallax effects
 *
 * LUMORA SPIRIT: Skills & Portfolio First
 * Bold messaging, real tools, real projects, real skills
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
function TechTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
      style={{ color: lumoraAqua.text, letterSpacing: '-0.03em' }}
      initial={{ textShadow: '0 0 0 rgba(120,255,220,0)' }}
      whileInView={{ textShadow: '0 0 30px rgba(120,255,220,0.4)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
    >
      {children}
    </motion.h1>
  );
}

// Glass card with working hover glow effect
function TechCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(120deg, transparent, ${lumoraAqua.cardGlow}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
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
      <div
        className="text-4xl md:text-5xl font-extrabold mb-1"
        style={{ color: lumoraAqua.aqua }}
      >
        {displayValue}
      </div>
      <div className="text-sm font-medium uppercase tracking-wider" style={{ color: lumoraAqua.text }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs mt-1" style={{ color: lumoraAqua.textMuted }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// Domain card with icon
function DomainCard({
  icon: Icon,
  title,
  tools,
  description,
  lessons
}: {
  icon: React.ElementType;
  title: string;
  tools: string;
  description: string;
  lessons: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-6 rounded-[14px]"
      style={{
        background: lumoraAqua.cardBg,
        border: `1px solid ${lumoraAqua.cardBorder}`,
        boxShadow: lumoraAqua.cardShadow,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(120deg, transparent, ${lumoraAqua.cardGlow}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Icon className="w-8 h-8" style={{ color: lumoraAqua.aqua }} />
          <span
            className="text-xs font-medium px-2 py-1 rounded"
            style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
          >
            {lessons} lessons
          </span>
        </div>
        <h4 className="text-lg font-bold mb-1" style={{ color: lumoraAqua.text }}>
          {title}
        </h4>
        <p className="text-xs mb-2 font-medium" style={{ color: lumoraAqua.aqua }}>
          {tools}
        </p>
        <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Student testimonial card
function TestimonialCard({
  initials,
  name,
  age,
  location,
  quote,
  badge,
  badgeIcon: BadgeIcon
}: {
  initials: string;
  name: string;
  age: number;
  location: string;
  quote: string;
  badge: string;
  badgeIcon: React.ElementType;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-6 rounded-[14px]"
      style={{
        background: lumoraAqua.cardBg,
        border: `1px solid ${lumoraAqua.cardBorder}`,
        boxShadow: lumoraAqua.cardShadow,
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(120deg, transparent, ${lumoraAqua.cardGlow}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-4"
          style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
        >
          {initials}
        </div>

        {/* Name & Location */}
        <p className="font-bold" style={{ color: lumoraAqua.text }}>
          {name.toUpperCase()}, {age}
        </p>
        <p className="text-xs mb-4" style={{ color: lumoraAqua.textMuted }}>
          {location}
        </p>

        {/* Quote */}
        <p className="text-sm mb-4 leading-relaxed" style={{ color: lumoraAqua.textSecondary }}>
          "{quote}"
        </p>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium"
          style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
        >
          <BadgeIcon className="w-3 h-3" />
          {badge}
        </div>
      </div>
    </motion.div>
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
      <main className="min-h-screen flex items-center py-24 px-6 md:px-8 relative z-10">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
          {/* Left: Title & Subtitle */}
          <section className="flex flex-col justify-center">
            <TechTitle>
              MASTER AI.<br />
              <span style={{ color: lumoraAqua.aqua }}>CREATE EVERYTHING.</span>
            </TechTitle>

            <p
              className="text-lg md:text-xl mt-6 mb-8 max-w-xl"
              style={{ color: lumoraAqua.textSecondary }}
            >
              Learn real tools. Build real projects. Get real skills.<br />
              No theory. No fluff. Just work you're proud of.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2"
                style={{
                  background: lumoraAqua.aqua,
                  color: lumoraAqua.bg,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                GET STARTED FREE
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="px-8 py-4 rounded-lg font-bold text-base"
                style={{
                  background: 'transparent',
                  color: lumoraAqua.aqua,
                  border: `2px solid ${lumoraAqua.aqua}`,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                SEE STUDENT WORK
              </motion.button>
            </div>
          </section>

          {/* Right: Feature Cards */}
          <aside className="flex flex-col gap-4">
            <TechCard>
              <div className="flex items-center gap-3 mb-2">
                <Film className="w-5 h-5" style={{ color: lumoraAqua.aqua }} />
                <h4 className="text-base font-bold" style={{ color: lumoraAqua.text }}>
                  AI Video Editing
                </h4>
              </div>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Master CapCut AI, Premiere. Edit like a pro.
              </p>
            </TechCard>

            <TechCard>
              <div className="flex items-center gap-3 mb-2">
                <Music className="w-5 h-5" style={{ color: lumoraAqua.aqua }} />
                <h4 className="text-base font-bold" style={{ color: lumoraAqua.text }}>
                  AI Music Production
                </h4>
              </div>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Create beats with Suno. Release your sound.
              </p>
            </TechCard>

            <TechCard>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5" style={{ color: lumoraAqua.aqua }} />
                <h4 className="text-base font-bold" style={{ color: lumoraAqua.text }}>
                  AI Automation
                </h4>
              </div>
              <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                Build workflows with Make.com. Automate anything.
              </p>
            </TechCard>
          </aside>
        </div>
      </main>

      {/* Metrics Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Metric value="45+" label="Lessons" sublabel="Hands-on projects" />
          <Metric value="4" label="Domains" sublabel="Video, Music, Writing, Automation" />
          <Metric value="10K+" label="Creators" sublabel="Learning worldwide" />
          <Metric value="3" label="Portfolio Projects" sublabel="Graduate with real work" />
        </div>
      </section>

      {/* Domains Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-4"
            style={{ color: lumoraAqua.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            MASTER 4 CREATIVE <span style={{ color: lumoraAqua.aqua }}>DOMAINS</span>
          </motion.h2>
          <p
            className="text-center mb-12 text-lg"
            style={{ color: lumoraAqua.textSecondary }}
          >
            Real tools. Real skills. Real portfolio pieces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DomainCard
              icon={Film}
              title="AI Video Editing"
              tools="CapCut AI, Premiere, After Effects"
              description="Edit for YouTubers, TikTokers, and brands. Create content that gets views."
              lessons={12}
            />
            <DomainCard
              icon={Music}
              title="AI Music Production"
              tools="Suno, Udio, FL Studio"
              description="Create beats, release your sound, build your producer portfolio."
              lessons={10}
            />
            <DomainCard
              icon={PenTool}
              title="AI Content Writing"
              tools="ChatGPT, Claude, Jasper"
              description="Write scripts, blogs, social copy. Content that converts."
              lessons={12}
            />
            <DomainCard
              icon={Zap}
              title="AI Automation"
              tools="Make.com, Zapier, n8n"
              description="Build workflows, automate tasks. Work smarter, not harder."
              lessons={11}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-4"
            style={{ color: lumoraAqua.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            SEE WHAT STUDENTS ARE <span style={{ color: lumoraAqua.aqua }}>BUILDING</span>
          </motion.h2>
          <p
            className="text-center mb-12 text-lg"
            style={{ color: lumoraAqua.textSecondary }}
          >
            Real creators. Real projects. Real stories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              initials="SC"
              name="Sarah Chen"
              age={17}
              location="Los Angeles, CA"
              quote="I went from watching YouTube to editing for YouTubers. The skills I learned here got me my first freelance clients."
              badge="VIDEO EDITOR"
              badgeIcon={Film}
            />
            <TestimonialCard
              initials="MJ"
              name="Marcus Johnson"
              age={19}
              location="Atlanta, GA"
              quote="I automated my entire side hustle and started building workflows for small businesses. Game changer."
              badge="AUTOMATION BUILDER"
              badgeIcon={Zap}
            />
            <TestimonialCard
              initials="JL"
              name="Jasmine Lee"
              age={16}
              location="Toronto, ON"
              quote="Released my first beat in a week. Now I have a BeatStars page and people actually listen to my music."
              badge="MUSIC PRODUCER"
              badgeIcon={Music}
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center p-12 rounded-2xl"
          style={{
            background: lumoraAqua.cardBg,
            border: `1px solid ${lumoraAqua.cardBorder}`,
            boxShadow: lumoraAqua.cardShadow,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: lumoraAqua.text }}
          >
            READY TO BUILD <span style={{ color: lumoraAqua.aqua }}>SOMETHING REAL?</span>
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: lumoraAqua.textSecondary }}
          >
            Join 10,000+ creators learning AI skills that matter.
          </p>

          <motion.button
            className="px-10 py-5 rounded-lg font-bold text-lg flex items-center justify-center gap-3 mx-auto"
            style={{
              background: lumoraAqua.aqua,
              color: lumoraAqua.bg,
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            START FREE - NO CREDIT CARD
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p
            className="text-sm mt-6"
            style={{ color: lumoraAqua.textMuted }}
          >
            Free to start • No credit card • Learn at your pace
          </p>
        </motion.div>
      </section>

      {/* Trust Signals */}
      <section
        className="relative z-10 py-8 px-6 md:px-8"
        style={{ borderTop: `1px solid ${lumoraAqua.cardBorder}` }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            'FREE TO START',
            'NO CREDIT CARD',
            'LEARN AT YOUR PACE',
            'SAFE COMMUNITY',
          ].map((text, i) => (
            <div key={i} className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" style={{ color: lumoraAqua.aqua }} />
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: lumoraAqua.textMuted }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-8 px-6 md:px-8 text-center"
        style={{ borderTop: `1px solid ${lumoraAqua.cardBorder}` }}
      >
        <p className="text-sm" style={{ color: lumoraAqua.textMuted }}>
          © 2024 Lumora. Built for creators who build.
        </p>
      </footer>
    </div>
  );
}
