import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Film, PenTool, Music, Bot, X, Check, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import BrutalistUIPlaceholder from '@/components/placeholders/BrutalistUIPlaceholder';
import BrutalistAvatar from '@/components/placeholders/BrutalistAvatar';
import { neoBrutalist } from '@/constants/landingColors';

/**
 * Neo-Brutalist Pro V2 - Enhanced Landing Page
 *
 * 13 enhancements over V1: glitch effects, animated counters, live activity feed,
 * dual marquees, tool logo bar, strikethrough animations, floating action button,
 * video testimonial placeholders, and more.
 */

// Glitch accent colors
const GLITCH_MAGENTA = '#ff00ff';
const GLITCH_CYAN = '#00ffff';

// Animation variants
const glitchIn = {
  hidden: { opacity: 0, x: -20, skewX: -5 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.3, ease: 'steps(8)' },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Scanline Overlay ───────────────────────────────────────────────────────

function Scanline() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 opacity-10"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191,255,0,0.3) 2px, rgba(191,255,0,0.3) 4px)',
      }}
      animate={{ y: ['0vh', '100vh'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ─── Enhancement #1: GlitchTextV2 ──────────────────────────────────────────

function GlitchTextV2({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const [isGlitching, setIsGlitching] = useState(true); // glitch on load
  const [loadDone, setLoadDone] = useState(false);

  useEffect(() => {
    // Initial load glitch for 1.5s
    const loadTimer = setTimeout(() => {
      setIsGlitching(false);
      setLoadDone(true);
    }, 1500);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!loadDone) return;

    // Random periodic glitch every 8-10s
    const interval = setInterval(
      () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      },
      8000 + Math.random() * 2000
    );

    return () => clearInterval(interval);
  }, [loadDone]);

  const handleHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 80);
  };

  return (
    <span
      className={`inline-block transition-none ${className}`}
      onMouseEnter={handleHover}
      style={{
        textShadow: isGlitching
          ? `2px 0 ${GLITCH_MAGENTA}, -2px 0 ${GLITCH_CYAN}`
          : 'none',
        transform: isGlitching ? 'translate(2px, -1px)' : 'none',
      }}
    >
      {children}
    </span>
  );
}

// ─── Enhancement #2: DualMarquee ────────────────────────────────────────────

function DualMarquee() {
  const topItems = 'LEARN AI • BUILD PROJECTS • MAKE MONEY • GET PAID • ';
  const bottomItems = 'VIDEO • MUSIC • WRITING • AUTOMATION • NO BS • ';

  return (
    <div style={{ backgroundColor: neoBrutalist.lime }}>
      {/* Top row: scrolls left */}
      <div className="py-3 overflow-hidden" style={{ borderBottom: `2px solid ${neoBrutalist.black}` }}>
        <motion.div
          className="flex gap-12 whitespace-nowrap font-bold uppercase text-xl"
          style={{ color: neoBrutalist.black }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i}>{topItems}</span>
          ))}
        </motion.div>
      </div>
      {/* Bottom row: scrolls right (opposite) */}
      <div className="py-3 overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap font-bold uppercase text-xl"
          style={{ color: neoBrutalist.black }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i}>{bottomItems}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Enhancement #3: AnimatedCounter ────────────────────────────────────────

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const step = Math.ceil(value / 20);
          const interval = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 50);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-5xl md:text-6xl font-bold font-mono"
      style={{ color: neoBrutalist.lime }}
    >
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

// ─── Enhancement #4: StudentCardV2 ─────────────────────────────────────────

const thumbnailGradients: Record<string, string> = {
  video: 'linear-gradient(135deg, #ff0055, #ff6600)',
  music: 'linear-gradient(135deg, #7c3aed, #2563eb)',
  writing: 'linear-gradient(135deg, #059669, #BFFF00)',
};

const cardIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  video: Film,
  music: Music,
  writing: PenTool,
};

function StudentCardV2({
  type,
  name,
  location,
  achievement,
  detail,
}: {
  type: 'video' | 'music' | 'writing';
  name: string;
  location: string;
  achievement: string;
  detail: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = cardIcons[type];

  return (
    <motion.div
      className="relative overflow-hidden bg-black cursor-pointer"
      style={{
        border: `8px solid ${neoBrutalist.lime}`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 0 30px ${neoBrutalist.limeGlow}, 0 8px 30px rgba(0,0,0,0.5)`
          : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail area */}
      <div
        className="relative aspect-video flex items-center justify-center"
        style={{ background: thumbnailGradients[type] }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        <Icon className="w-20 h-20" style={{ color: 'rgba(255,255,255,0.6)' }} />

        {/* Play button overlay for video */}
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: neoBrutalist.lime }}
            >
              <Play className="w-8 h-8 ml-1" style={{ color: neoBrutalist.black }} />
            </div>
          </div>
        )}
      </div>

      {/* Info section */}
      <div
        className="p-6 font-mono"
        style={{ borderTop: `4px solid ${neoBrutalist.lime}` }}
      >
        <p className="text-lg font-bold text-white uppercase mb-1">{name}</p>
        <p className="text-sm text-gray-400 uppercase mb-3">{location}</p>

        <div
          className="inline-block px-4 py-2 font-bold text-black uppercase text-sm"
          style={{ backgroundColor: neoBrutalist.lime }}
        >
          {achievement}
        </div>

        <p className="text-xs text-gray-400 uppercase mt-2">{detail}</p>

        {/* Hover reveal: VIEW CASE STUDY */}
        <div
          className="mt-4 font-bold uppercase text-sm flex items-center gap-2"
          style={{
            color: neoBrutalist.lime,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          VIEW CASE STUDY <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Enhancement #5: LiveActivityFeed ───────────────────────────────────────

const ACTIVITIES = [
  { name: 'Alex T.', action: 'completed Video Module 3', time: '2m ago' },
  { name: 'Marcus J.', action: 'earned $75 on freelance gig', time: '5m ago' },
  { name: 'Jasmine L.', action: 'published story with 1.2K views', time: '12m ago' },
  { name: 'Jordan K.', action: 'automated a client workflow', time: '8m ago' },
  { name: 'Sarah C.', action: 'started Music Production Module', time: '3m ago' },
  { name: 'Kai R.', action: 'earned first $50 from AI editing', time: '15m ago' },
  { name: 'Priya M.', action: 'completed all 45 lessons', time: '20m ago' },
  { name: 'Tyler B.', action: 'built automation saving 10hrs/week', time: '7m ago' },
  { name: 'Luna S.', action: 'landed first paying client', time: '25m ago' },
  { name: 'Dev P.', action: 'produced a beat with 500 plays', time: '18m ago' },
  { name: 'Mia W.', action: 'earned $200 this week', time: '30m ago' },
  { name: 'Chris A.', action: 'published AI-written blog post', time: '11m ago' },
  { name: 'Zara H.', action: 'completed Video Editing basics', time: '4m ago' },
  { name: 'Nate G.', action: 'earned $120 editing YouTube shorts', time: '22m ago' },
  { name: 'Ava F.', action: 'joined the community', time: '1m ago' },
  { name: 'Oscar D.', action: 'shipped first AI automation', time: '9m ago' },
  { name: 'Riley J.', action: 'started Content Writing Module', time: '6m ago' },
  { name: 'Ellie K.', action: 'earned $300 from music production', time: '14m ago' },
  { name: 'Sam T.', action: 'completed portfolio project #2', time: '16m ago' },
  { name: 'Maya R.', action: 'got 5-star client review', time: '10m ago' },
];

function LiveActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first notification
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 5000);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const activity = ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden sm:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentIndex}
            className="px-5 py-4 font-mono text-sm max-w-sm"
            style={{
              backgroundColor: neoBrutalist.black,
              border: `4px solid ${neoBrutalist.lime}`,
            }}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <span style={{ color: neoBrutalist.lime }}>&#9679;</span>{' '}
            <span className="font-bold text-white">{activity.name}</span>{' '}
            <span className="text-gray-300">{activity.action}</span>
            <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Enhancement #6: HeroBackgroundGrid ─────────────────────────────────────

function HeroBackgroundGrid() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(191,255,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(191,255,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
      animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ─── Enhancement #7: GlitchButton ───────────────────────────────────────────

function GlitchButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);

  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative px-8 py-5 text-lg font-bold uppercase flex items-center justify-center gap-3 transition-transform hover:translate-x-1 hover:-translate-y-1 overflow-hidden ${className}`}
      style={{
        backgroundColor: isPrimary ? neoBrutalist.lime : neoBrutalist.black,
        color: isPrimary ? neoBrutalist.black : neoBrutalist.lime,
        border: `4px solid ${neoBrutalist.lime}`,
      }}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>

      {/* Glitch slices on hover */}
      {isHovering && (
        <>
          <span
            className="absolute inset-0"
            style={{
              backgroundColor: isPrimary ? '#d4ff33' : '#1a1a1a',
              clipPath: 'inset(0 0 55% 0)',
              transform: 'translate(-3px, -2px)',
            }}
          />
          <span
            className="absolute inset-0"
            style={{
              backgroundColor: isPrimary ? '#a8e600' : '#0d0d0d',
              clipPath: 'inset(45% 0 0 0)',
              transform: 'translate(3px, 2px)',
            }}
          />
        </>
      )}
    </button>
  );
}

// ─── Enhancement #8: VideoTestimonialCard ───────────────────────────────────

function VideoTestimonialCard({
  name,
  quote,
  gradient,
}: {
  name: string;
  quote: string;
  gradient: string;
}) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        aspectRatio: '9/16',
        width: '220px',
        border: `4px solid ${neoBrutalist.lime}`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: gradient }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 flex items-center justify-center"
          style={{
            border: `4px solid ${neoBrutalist.white}`,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="w-0 h-0 ml-1"
            style={{
              borderLeft: '16px solid white',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
            }}
          />
        </div>
      </div>

      {/* Name overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 font-mono"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      >
        <p className="font-bold text-sm text-white uppercase">{name}</p>
        <p className="text-xs mt-1" style={{ color: neoBrutalist.mediumGray }}>
          "{quote}"
        </p>
      </div>
    </div>
  );
}

// ─── Enhancement #9: ScrollIndicator ────────────────────────────────────────

function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsVisible(false), 3000);
    const handleScroll = () => setIsVisible(false);
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => {
      clearTimeout(fadeTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? [0, 10, 0] : 20,
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 1.5, repeat: isVisible ? Infinity : 0, ease: 'easeInOut' },
      }}
    >
      <span
        className="font-mono text-xs uppercase tracking-widest block"
        style={{ color: neoBrutalist.mediumGray }}
      >
        SCROLL TO EXPLORE
      </span>
      <div
        className="w-px h-8 mx-auto mt-2"
        style={{ backgroundColor: neoBrutalist.lime }}
      />
    </motion.div>
  );
}

// ─── Enhancement #11: ToolLogoMarquee ───────────────────────────────────────

const TOOLS = [
  'RUNWAY',
  'CHATGPT',
  'SUNO',
  'MAKE.COM',
  'MIDJOURNEY',
  'ELEVEN LABS',
  'CANVA',
  'NOTION AI',
];

function ToolLogoMarquee() {
  return (
    <div
      className="py-6 overflow-hidden"
      style={{
        borderTop: `2px solid ${neoBrutalist.lime}`,
        borderBottom: `2px solid ${neoBrutalist.lime}`,
        backgroundColor: neoBrutalist.black,
      }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(2)].flatMap((_, setIdx) =>
          TOOLS.map((tool, i) => (
            <ToolBadge key={`${setIdx}-${i}`} name={tool} />
          ))
        )}
      </motion.div>
    </div>
  );
}

function ToolBadge({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="font-mono text-sm font-bold uppercase px-4 py-2 cursor-default transition-colors"
      style={{
        color: isHovered ? neoBrutalist.lime : neoBrutalist.mediumGray,
        border: `2px solid ${isHovered ? neoBrutalist.lime : neoBrutalist.mediumGray}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
    </span>
  );
}

// ─── Enhancement #12: StrikethroughItem ─────────────────────────────────────

function StrikethroughItem({ text, delay }: { text: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className="relative inline-block">
      <span>• {text}</span>
      <motion.span
        className="absolute left-0 top-1/2 h-[3px]"
        style={{ backgroundColor: '#ff0000' }}
        initial={{ width: '0%' }}
        animate={isVisible ? { width: '100%' } : {}}
        transition={{ duration: 0.4, delay }}
      />
    </li>
  );
}

// ─── Enhancement #13: FloatingActionButton ──────────────────────────────────

function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToCTA}
          className="fixed bottom-6 right-6 z-50 px-6 py-4 font-mono font-bold uppercase cursor-pointer"
          style={{
            backgroundColor: neoBrutalist.lime,
            color: neoBrutalist.black,
            border: `4px solid ${neoBrutalist.lime}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            scale: { repeat: Infinity, repeatDelay: 5, duration: 0.4 },
            opacity: { duration: 0.2 },
          }}
        >
          START FREE
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function NeoBrutalistProV2() {
  return (
    <div className="bg-black text-white font-mono overflow-x-hidden">
      {/* Fixed overlays */}
      <Scanline />
      <LiveActivityFeed />
      <FloatingActionButton />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 w-full z-40 px-6 py-4"
        style={{
          backgroundColor: neoBrutalist.black,
          borderBottom: `4px solid ${neoBrutalist.lime}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="text-2xl font-bold"
            style={{ color: neoBrutalist.lime }}
          >
            LUMORA
          </div>
          <button
            className="px-6 py-3 font-bold uppercase"
            style={{
              backgroundColor: neoBrutalist.lime,
              color: neoBrutalist.black,
              border: `4px solid ${neoBrutalist.lime}`,
            }}
          >
            START FREE
          </button>
        </div>
      </nav>

      {/* ── Hero Section (#1 Glitch, #6 Grid, #7 Button, #9 Scroll) ── */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <HeroBackgroundGrid />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase mb-8 leading-none"
            style={{ color: neoBrutalist.white }}
            initial="hidden"
            animate="visible"
            variants={glitchIn}
          >
            <GlitchTextV2>STOP SCROLLING.</GlitchTextV2>
            <br />
            <span style={{ color: neoBrutalist.lime }}>
              <GlitchTextV2>START CREATING.</GlitchTextV2>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl uppercase"
            style={{ color: neoBrutalist.white }}
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            Master AI tools. Build real projects. Make actual money.
            <br />
            No fluff. No BS. Just results.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <GlitchButton variant="primary">
              GET STARTED FREE
              <ArrowRight className="w-6 h-6" />
            </GlitchButton>

            <GlitchButton variant="secondary">VIEW COURSES</GlitchButton>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ── Dual Marquee (#2) ──────────────────────────────────────────── */}
      <DualMarquee />

      {/* ── Tool Logo Marquee (#11) ────────────────────────────────────── */}
      <ToolLogoMarquee />

      {/* ── Stats Section (#3 Counter, #10 Hover Glow) ─────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 45, prefix: '', suffix: '', label: 'LESSONS' },
            { value: 150, prefix: '$', suffix: '', label: 'AVG EARNINGS' },
            { value: 98, prefix: '', suffix: '%', label: 'SUCCESS RATE' },
            { value: 30, prefix: '', suffix: '', label: 'DAYS TO MONEY' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 text-center cursor-default"
              style={{
                backgroundColor: neoBrutalist.black,
                border: `4px solid ${neoBrutalist.lime}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${neoBrutalist.limeGlow}, 0 0 40px ${neoBrutalist.limeGlow}`,
              }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <div className="text-sm uppercase tracking-wide mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Student Showcase (#4) ──────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.black }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold text-center mb-4 uppercase"
            style={{ color: neoBrutalist.lime }}
          >
            REAL STUDENTS. REAL PROJECTS. REAL MONEY.
          </h2>
          <p
            className="text-center text-xl mb-12 uppercase"
            style={{ color: neoBrutalist.white }}
          >
            No fake testimonials. No stock photos. Just Gen Z creators crushing it.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <StudentCardV2
              type="video"
              name="SARAH CHEN, 17"
              location="LOS ANGELES, CA"
              achievement="EARNED $2,150"
              detail="EDITING YOUTUBE VIDEOS"
            />
            <StudentCardV2
              type="music"
              name="MARCUS JOHNSON, 19"
              location="ATLANTA, GA"
              achievement="PRODUCED FIRST BEAT"
              detail="IN 1 WEEK"
            />
            <StudentCardV2
              type="writing"
              name="JASMINE LEE, 16"
              location="NEW YORK, NY"
              achievement="10,000 READS"
              detail="ON PUBLISHED STORY"
            />
          </div>
        </div>
      </section>

      {/* ── Domains ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center">
            MASTER 4 CREATIVE DOMAINS
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Film, title: 'AI VIDEO EDITING', desc: 'YouTube, TikTok, Reels' },
              { icon: Music, title: 'AI MUSIC PRODUCTION', desc: 'Beats, tracks, royalties' },
              { icon: PenTool, title: 'AI CONTENT WRITING', desc: 'Blogs, scripts, copy' },
              { icon: Bot, title: 'AI AUTOMATION', desc: 'Tools, bots, systems' },
            ].map((domain, i) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={i}
                  className="p-8 group hover:translate-x-1 hover:-translate-y-1 transition-transform"
                  style={{
                    backgroundColor: neoBrutalist.black,
                    border: `4px solid ${neoBrutalist.lime}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon
                    className="w-12 h-12 mb-4"
                    style={{ color: neoBrutalist.lime }}
                  />
                  <h3 className="text-xl font-bold mb-2 uppercase">
                    {domain.title}
                  </h3>
                  <p
                    className="text-sm uppercase"
                    style={{ color: neoBrutalist.white }}
                  >
                    {domain.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Platform Transparency ──────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.black }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold text-center mb-16 uppercase"
            style={{ color: neoBrutalist.lime }}
          >
            SEE THE ACTUAL PLATFORM. NO PHOTOSHOP MOCKUPS.
          </h2>

          {/* Lesson Interface */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <BrutalistUIPlaceholder section="lesson" />
            <div>
              <h3
                className="text-4xl font-bold mb-6 uppercase"
                style={{ color: neoBrutalist.white }}
              >
                LESSONS FEEL LIKE NETFLIX
              </h3>
              <ul className="space-y-4 text-xl uppercase">
                {['BITE-SIZED VIDEOS', 'TRACK YOUR PROGRESS', 'LEARN AT YOUR PACE', 'MOBILE-FRIENDLY'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="w-6 h-6 flex-shrink-0 mt-1"
                        style={{ color: neoBrutalist.lime }}
                      />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Editor Interface */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3
                className="text-4xl font-bold mb-6 uppercase"
                style={{ color: neoBrutalist.white }}
              >
                AI EDITOR BUILT FOR CREATORS
              </h3>
              <ul className="space-y-4 text-xl uppercase">
                {['PRO-LEVEL TOOLS', 'NO DOWNLOADS REQUIRED', 'REAL-TIME AI HELP', 'EXPORT IN 4K'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="w-6 h-6 flex-shrink-0 mt-1"
                        style={{ color: neoBrutalist.lime }}
                      />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <BrutalistUIPlaceholder
              section="editor"
              className="order-1 md:order-2"
            />
          </div>
        </div>
      </section>

      {/* ── Anti-Features (#12 Strikethrough) ──────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.lime }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center"
            style={{ color: neoBrutalist.black }}
          >
            NOT ANOTHER BORING COURSE
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3
                className="text-3xl font-bold mb-6 uppercase flex items-center gap-3"
                style={{ color: neoBrutalist.black }}
              >
                <X className="w-8 h-8" /> NOT THIS
              </h3>
              <ul
                className="space-y-4 text-lg uppercase"
                style={{ color: neoBrutalist.black }}
              >
                <StrikethroughItem text="Boring video lectures" delay={0} />
                <StrikethroughItem text="Theory without practice" delay={0.3} />
                <StrikethroughItem text="No real skills gained" delay={0.6} />
                <StrikethroughItem text="Generic certificates" delay={0.9} />
              </ul>
            </div>

            <div>
              <h3
                className="text-3xl font-bold mb-6 uppercase flex items-center gap-3"
                style={{ color: neoBrutalist.black }}
              >
                <Check className="w-8 h-8" /> NOW THIS
              </h3>
              <ul
                className="space-y-4 text-lg uppercase"
                style={{ color: neoBrutalist.black }}
              >
                <li>• Build real projects</li>
                <li>• Launch actual products</li>
                <li>• Earn real money</li>
                <li>• Portfolio that matters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Testimonials (#8) ────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 uppercase text-center">
            HEAR IT FROM THEM
          </h2>
          <p
            className="text-center text-lg mb-12 uppercase"
            style={{ color: neoBrutalist.mediumGray }}
          >
            REAL STUDENTS. REAL STORIES. TAP TO PLAY.
          </p>

          <div className="flex gap-6 overflow-x-auto pb-4 justify-center flex-wrap md:flex-nowrap">
            <VideoTestimonialCard
              name="JORDAN K., 19"
              quote="Built automation tools companies pay $500+ for"
              gradient="linear-gradient(135deg, #1a1a2e, #4c1d95)"
            />
            <VideoTestimonialCard
              name="SARAH M., 17"
              quote="$2,000 in 3 months editing YouTube videos"
              gradient="linear-gradient(135deg, #1a1a2e, #991b1b)"
            />
            <VideoTestimonialCard
              name="ALEX C., 18"
              quote="Released first beat in 1 week, now a music producer"
              gradient="linear-gradient(135deg, #1a1a2e, #065f46)"
            />
          </div>
        </div>
      </section>

      {/* ── Text Testimonials ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center">
            TESTIMONIALS FROM STUDENTS
            <br />
            <span style={{ color: neoBrutalist.lime }}>
              WHO ACTUALLY MADE MONEY
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                initials: 'JK',
                quote:
                  '"I built automation tools that companies pay $500+ for. Lumora changed my career at 19."',
                name: 'JORDAN KIM, 19',
                location: 'SEATTLE, WA',
                badge: '$500+ PER AUTOMATION',
              },
              {
                initials: 'SM',
                quote:
                  '"Made $2,000 in 3 months editing YouTube videos. Started with zero skills."',
                name: 'SARAH MARTINEZ, 17',
                location: 'MIAMI, FL',
                badge: '50+ VIDEOS EDITED',
              },
              {
                initials: 'AC',
                quote:
                  '"Released my first beat in 1 week. Now I\'m a music producer with clients."',
                name: 'ALEX CHEN, 18',
                location: 'SAN FRANCISCO, CA',
                badge: 'MUSIC PRODUCER',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-8"
                style={{
                  backgroundColor: neoBrutalist.black,
                  border: `8px solid ${neoBrutalist.lime}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <BrutalistAvatar initials={testimonial.initials} size="large" />
                <p className="text-xl my-6 uppercase">{testimonial.quote}</p>
                <p className="font-bold uppercase mb-1">{testimonial.name}</p>
                <p
                  className="text-sm uppercase mb-4"
                  style={{ color: neoBrutalist.mediumGray }}
                >
                  {testimonial.location}
                </p>
                <div
                  className="inline-block px-4 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: neoBrutalist.lime,
                    color: neoBrutalist.black,
                  }}
                >
                  {testimonial.badge}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: neoBrutalist.black }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center"
            style={{ color: neoBrutalist.lime }}
          >
            YOUR PATH TO SUCCESS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'LEARN',
                desc: '45 bite-sized lessons. Master AI tools fast.',
              },
              {
                step: '02',
                title: 'BUILD',
                desc: 'Create 3 portfolio projects. Real work, not theory.',
              },
              {
                step: '03',
                title: 'EARN',
                desc: 'Land clients or monetize. Average $150/project.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-6xl font-bold mb-4"
                  style={{ color: neoBrutalist.lime }}
                >
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold mb-4 uppercase">
                  {item.title}
                </h3>
                <p className="text-lg uppercase">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ──────────────────────────────────────────────── */}
      <section
        className="py-12 px-6"
        style={{
          borderTop: `8px solid ${neoBrutalist.lime}`,
          borderBottom: `8px solid ${neoBrutalist.lime}`,
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['FREE TO START', 'NO CREDIT CARD', 'CANCEL ANYTIME', 'SAFE COMMUNITY'].map(
            (text, i) => (
              <div key={i}>
                <div
                  className="text-4xl mb-2"
                  style={{ color: neoBrutalist.lime }}
                >
                  ✓
                </div>
                <p className="font-bold uppercase text-sm">{text}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section id="final-cta" className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase">
            <GlitchTextV2>READY TO STOP WAITING?</GlitchTextV2>
          </h2>

          <p className="text-2xl mb-12 uppercase">
            JOIN 10,000+ CREATORS BUILDING THE FUTURE
          </p>

          <GlitchButton variant="primary" className="inline-flex mx-auto">
            START NOW FOR FREE
            <ArrowRight className="w-8 h-8" />
          </GlitchButton>

          <p
            className="text-sm mt-6 uppercase"
            style={{ color: neoBrutalist.mediumGray }}
          >
            NO CREDIT CARD. NO FLUFF. JUST START.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: `4px solid ${neoBrutalist.lime}` }}
      >
        <p
          className="text-sm uppercase"
          style={{ color: neoBrutalist.mediumGray }}
        >
          © 2026 LUMORA. NEO-BRUTALIST PRO V2 DESIGN.
        </p>
      </footer>
    </div>
  );
}
