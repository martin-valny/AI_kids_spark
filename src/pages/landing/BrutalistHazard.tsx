import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, AlertTriangle, Construction, Film, PenTool, Music, Bot,
  HardHat, Wrench, Zap, Shield
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/**
 * BRUTALIST HAZARD - Landing Page Variation
 *
 * Theme: Industrial warning / Construction zone aesthetic
 * Colors: Black + yellow hazard stripes + white stencil
 * Vibe: Warning signs, caution tape, safety equipment, blueprints
 *
 * Design DNA:
 * - Diagonal hazard stripes
 * - Stencil typography (like spray painted)
 * - Warning/caution symbols
 * - Industrial textures (concrete, metal)
 * - Blueprint grid backgrounds
 * - "Under construction" energy
 * - Safety/equipment iconography
 */

const hazard = {
  black: '#1a1a1a',
  blackDeep: '#0d0d0d',
  yellow: '#ffd000',
  yellowDark: '#ccaa00',
  white: '#f5f5f5',
  gray: '#666666',
  grayLight: '#999999',
  orange: '#ff6b00',
};

// Hazard stripe pattern component
function HazardStripes({ className = '', direction = 'right' }: { className?: string; direction?: 'left' | 'right' }) {
  const angle = direction === 'right' ? '45deg' : '-45deg';
  return (
    <div
      className={className}
      style={{
        backgroundImage: `repeating-linear-gradient(
          ${angle},
          ${hazard.yellow},
          ${hazard.yellow} 20px,
          ${hazard.black} 20px,
          ${hazard.black} 40px
        )`,
      }}
    />
  );
}

// Blueprint grid background
function BlueprintGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(${hazard.yellow} 1px, transparent 1px),
          linear-gradient(90deg, ${hazard.yellow} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  );
}

// Stencil text component
function StencilText({
  children,
  className = '',
  color = hazard.yellow,
}: {
  children: string;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={`font-black uppercase tracking-widest ${className}`}
      style={{
        color,
        fontFamily: "'Impact', 'Stencil', sans-serif",
        textShadow: `3px 3px 0 ${hazard.black}, -1px -1px 0 ${hazard.black}`,
        letterSpacing: '0.1em',
      }}
    >
      {children}
    </span>
  );
}

// Warning box component
function WarningBox({
  children,
  type = 'warning',
  className = '',
}: {
  children: React.ReactNode;
  type?: 'warning' | 'danger' | 'info';
  className?: string;
}) {
  const colors = {
    warning: { bg: hazard.yellow, text: hazard.black, icon: AlertTriangle },
    danger: { bg: hazard.orange, text: hazard.white, icon: AlertTriangle },
    info: { bg: hazard.white, text: hazard.black, icon: Shield },
  };

  const { bg, text, icon: Icon } = colors[type];

  return (
    <div
      className={`border-4 p-4 ${className}`}
      style={{ backgroundColor: bg, borderColor: hazard.black }}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: text }} />
        <div style={{ color: text }}>{children}</div>
      </div>
    </div>
  );
}

// Industrial button component
function IndustrialButton({
  children,
  to,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  const isPrimary = variant === 'primary';

  const styles = {
    backgroundColor: isPrimary ? hazard.yellow : hazard.black,
    color: isPrimary ? hazard.black : hazard.yellow,
    borderColor: hazard.black,
  };

  const content = (
    <motion.span
      className={`
        inline-flex items-center justify-center gap-3
        px-8 py-4 border-4 font-black uppercase tracking-wider
        transition-all cursor-pointer
        ${className}
      `}
      style={styles}
      whileHover={{
        x: 4,
        y: -4,
        boxShadow: `4px 4px 0 ${hazard.yellow}`,
      }}
      whileTap={{ x: 0, y: 0, boxShadow: 'none' }}
    >
      {children}
    </motion.span>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
}

// Safety stat component
function SafetyStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border-4 rotate-45"
        style={{ borderColor: hazard.yellow, backgroundColor: hazard.black }}
      >
        <Icon className="w-8 h-8 -rotate-45" style={{ color: hazard.yellow }} />
      </div>
      <div
        className="text-4xl md:text-5xl font-black mb-2"
        style={{ color: hazard.yellow, fontFamily: "'Impact', sans-serif" }}
      >
        {value}
      </div>
      <div className="text-xs font-mono uppercase tracking-widest" style={{ color: hazard.grayLight }}>
        {label}
      </div>
    </div>
  );
}

// Caution tape component
function CautionTape({ text = 'CAUTION' }: { text?: string }) {
  return (
    <div className="overflow-hidden py-3" style={{ backgroundColor: hazard.yellow }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {Array(20).fill(null).map((_, i) => (
          <span
            key={i}
            className="mx-8 font-black text-2xl uppercase tracking-widest"
            style={{ color: hazard.black }}
          >
            ⚠ {text} ⚠ {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Zone card component
function ZoneCard({
  zone,
  title,
  desc,
  icon: Icon,
  lessons,
}: {
  zone: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  lessons: number;
}) {
  return (
    <motion.div
      className="relative border-4 overflow-hidden"
      style={{ borderColor: hazard.yellow, backgroundColor: hazard.blackDeep }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Corner stripes */}
      <HazardStripes className="absolute top-0 right-0 w-16 h-16" />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="px-3 py-1 font-mono text-xs uppercase tracking-widest"
            style={{ backgroundColor: hazard.yellow, color: hazard.black }}
          >
            Zone {zone}
          </div>
          <div
            className="w-12 h-12 flex items-center justify-center border-2"
            style={{ borderColor: hazard.yellow }}
          >
            <Icon className="w-6 h-6" style={{ color: hazard.yellow }} />
          </div>
        </div>

        <h3
          className="text-2xl font-black mb-2 uppercase"
          style={{ color: hazard.white, fontFamily: "'Impact', sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm mb-4" style={{ color: hazard.grayLight }}>
          {desc}
        </p>

        <div
          className="flex items-center justify-between pt-4 border-t border-dashed"
          style={{ borderColor: hazard.gray }}
        >
          <span className="font-mono text-xs" style={{ color: hazard.yellow }}>
            {lessons} MODULES
          </span>
          <ArrowRight className="w-5 h-5" style={{ color: hazard.yellow }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function BrutalistHazard() {
  const zones = [
    { zone: 'A', title: 'Video Editing', desc: 'Master AI-powered video creation with CapCut', icon: Film, lessons: 12 },
    { zone: 'B', title: 'Music Production', desc: 'Produce original tracks with Suno & Udio', icon: Music, lessons: 10 },
    { zone: 'C', title: 'Content Writing', desc: 'Generate viral copy with ChatGPT', icon: PenTool, lessons: 11 },
    { zone: 'D', title: 'Automation', desc: 'Build powerful workflows with Make.com', icon: Bot, lessons: 12 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: hazard.black }}>
      <BlueprintGrid />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b-4" style={{ borderColor: hazard.yellow, backgroundColor: hazard.black }}>
        <HazardStripes className="h-2" />
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rotate-45"
              style={{ backgroundColor: hazard.yellow }}
            >
              <Construction className="w-6 h-6 -rotate-45" style={{ color: hazard.black }} />
            </div>
            <span
              className="text-2xl font-black uppercase tracking-tight"
              style={{ color: hazard.yellow, fontFamily: "'Impact', sans-serif" }}
            >
              LUMORA
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/lessons"
              className="font-mono text-sm uppercase tracking-wider hover:underline"
              style={{ color: hazard.grayLight }}
            >
              Courses
            </Link>
            <IndustrialButton to="/lessons" variant="primary">
              Enter Site <ArrowRight className="w-4 h-4" />
            </IndustrialButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4">
        {/* Background diagonal stripes */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <HazardStripes className="absolute inset-0 scale-150 rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Warning header */}
            <WarningBox type="warning" className="max-w-2xl mb-8">
              <div className="font-black uppercase">
                ⚠ ATTENTION: SKILL DEVELOPMENT ZONE
              </div>
              <div className="text-sm mt-1">
                This area is designated for serious creators only. Proceed with determination.
              </div>
            </WarningBox>

            {/* Main headline */}
            <h1 className="mb-6">
              <StencilText className="text-5xl md:text-7xl lg:text-9xl block" color={hazard.white}>
                CONSTRUCTION
              </StencilText>
              <StencilText className="text-5xl md:text-7xl lg:text-9xl block">
                IN PROGRESS
              </StencilText>
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl mb-10 font-mono"
              style={{ color: hazard.grayLight }}
            >
              Building the next generation of AI creators. 45+ lessons.
              4 skill zones. Real portfolio projects. No prior experience required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <IndustrialButton to="/lessons" variant="primary">
                <HardHat className="w-5 h-5" />
                Start Building
              </IndustrialButton>
              <IndustrialButton to="/projects" variant="secondary">
                <Wrench className="w-5 h-5" />
                View Projects
              </IndustrialButton>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 font-mono text-sm" style={{ color: hazard.grayLight }}>
              <span>
                <strong style={{ color: hazard.yellow }}>10K+</strong> ENROLLED
              </span>
              <span>
                <strong style={{ color: hazard.yellow }}>$50K+</strong> EARNED
              </span>
              <span>
                <strong style={{ color: hazard.yellow }}>98%</strong> SUCCESS RATE
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Caution Tape Divider */}
      <CautionTape text="SKILL BUILDING IN PROGRESS" />

      {/* Stats Section */}
      <section className="py-16 px-4" style={{ backgroundColor: hazard.blackDeep }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <StencilText className="text-3xl md:text-5xl">
              PROJECT SPECIFICATIONS
            </StencilText>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <SafetyStat value="45+" label="Total Lessons" icon={Zap} />
            <SafetyStat value="$150" label="Avg Per Project" icon={Wrench} />
            <SafetyStat value="98%" label="Completion Rate" icon={Shield} />
            <SafetyStat value="30" label="Days To Deploy" icon={HardHat} />
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-sm" style={{ color: hazard.yellow }}>
              // TRAINING_ZONES
            </span>
            <h2 className="mt-2">
              <StencilText className="text-4xl md:text-6xl" color={hazard.white}>
                SKILL SECTORS
              </StencilText>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/lessons">
                  <ZoneCard {...zone} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <WarningBox type="danger" className="text-center">
            <div className="font-black text-2xl md:text-3xl uppercase mb-4">
              ⚠ WARNING: RESULTS MAY VARY ⚠
            </div>
            <p className="text-lg mb-4">
              Side effects of completing Lumora training include:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2">
              <li>✓ Uncontrollable urge to create content</li>
              <li>✓ Sudden increases in bank account balance</li>
              <li>✓ Excessive confidence in AI tools</li>
              <li>✓ Severe reduction in mindless scrolling</li>
            </ul>
          </WarningBox>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4" style={{ backgroundColor: hazard.blackDeep }}>
        <div className="max-w-4xl mx-auto">
          <div className="border-4 p-8 md:p-12 relative" style={{ borderColor: hazard.yellow }}>
            <HazardStripes className="absolute top-0 left-0 w-full h-4" />

            <div className="pt-4">
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: hazard.yellow }}
              >
                Incident Report #247
              </span>

              <blockquote
                className="text-2xl md:text-4xl font-black leading-tight my-6"
                style={{ color: hazard.white, fontFamily: "'Impact', sans-serif" }}
              >
                "SUBJECT COMPLETED TRAINING IN 4 WEEKS.
                <span style={{ color: hazard.yellow }}> NOW EARNING $800/WEEK</span>
                BUILDING AUTOMATION TOOLS."
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center font-black"
                  style={{ backgroundColor: hazard.yellow, color: hazard.black }}
                >
                  MK
                </div>
                <div>
                  <div className="font-mono font-bold" style={{ color: hazard.white }}>
                    Marcus Kim, 21
                  </div>
                  <div className="font-mono text-sm" style={{ color: hazard.grayLight }}>
                    Status: DEPLOYED // Specialization: AUTOMATION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <HazardStripes className="absolute inset-0" />
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 border-8"
              style={{ borderColor: hazard.black, backgroundColor: hazard.black }}
            >
              <div
                className="w-20 h-20 mx-auto mb-8 flex items-center justify-center border-4 rotate-45"
                style={{ borderColor: hazard.yellow }}
              >
                <AlertTriangle className="w-10 h-10 -rotate-45" style={{ color: hazard.yellow }} />
              </div>

              <h2 className="mb-6">
                <StencilText className="text-4xl md:text-6xl">
                  DEPLOY NOW
                </StencilText>
              </h2>

              <p className="font-mono text-lg mb-10 max-w-xl mx-auto" style={{ color: hazard.grayLight }}>
                Free access. No safety deposit required.
                Hard hat and determination included.
              </p>

              <IndustrialButton to="/lessons" variant="primary">
                <Construction className="w-5 h-5" />
                Begin Construction
                <ArrowRight className="w-5 h-5" />
              </IndustrialButton>

              <div className="mt-8 font-mono text-xs" style={{ color: hazard.gray }}>
                ✓ FREE TIER AVAILABLE ✓ NO CREDIT CARD ✓ CANCEL ANYTIME
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4" style={{ borderColor: hazard.yellow, backgroundColor: hazard.blackDeep }}>
        <HazardStripes className="h-2" />
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs" style={{ color: hazard.gray }}>
            © 2024 LUMORA // SITE SAFETY RECORD: 10,000+ SUCCESSFUL COMPLETIONS
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <Link to="/privacy" className="hover:underline" style={{ color: hazard.grayLight }}>
              Safety Policy
            </Link>
            <Link to="/terms" className="hover:underline" style={{ color: hazard.grayLight }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
