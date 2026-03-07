import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import { Film, Bot, PenTool, Music, Play, Settings, Edit3, Headphones, Star, Mail, ArrowRight, Menu, X, Check } from 'lucide-react';

/**
 * Lumora Runway — Liquid Metal Creative Control Panel
 *
 * Apple-inspired dark aesthetic. Silver/chrome foreground, breathing
 * magenta/purple atmosphere behind. Inter font. No emoji. No light mode.
 * Ambient breathing gradient, glass morphism, gentle hover lift.
 *
 * SECTIONS:
 * 1. Navigation (glass bar)
 * 2. Hero (video background + animated stats)
 * 3. Student Portfolio (large thumbnails)
 * 4. Features / Module Cards (glass cards, silver hover)
 * 5. How It Works (3 steps)
 * 6. Use Cases Gallery
 * 7. Testimonials
 * 8. Pricing (single Pro card with silver border)
 * 9. FAQ (accordion)
 * 10. Final CTA
 * 11. Footer (newsletter + links)
 */

// ============================================================
// COLORS — Liquid Metal Silver + Atmospheric Magenta/Purple
// ============================================================

const C = {
  bg: '#080808',
  bgCard: 'rgba(255,255,255,0.06)',
  bgHover: 'rgba(255,255,255,0.10)',
  text: '#FFFFFF',
  textSec: '#C7C7CC',
  textTer: '#8E8E93',
  silver: '#E8E8EA',
  silverLight: '#F5F5F7',
  chrome: '#C7C7CC',
  steel: '#8E8E93',
  border: 'rgba(255,255,255,0.10)',
  borderH: 'rgba(255,255,255,0.25)',
  borderCard: 'rgba(255,255,255,0.10)',
  borderCardH: 'rgba(255,255,255,0.18)',
  navBg: 'rgba(8,8,8,0.90)',
  navBorder: 'rgba(255,255,255,0.08)',
  gradientCta: 'linear-gradient(135deg, #E8E8EA, #F5F5F7)',
  // Magenta accent system
  magenta: '#ff0080',
  magentaGrad: 'linear-gradient(135deg, #ff0080, #ff4da6)',
  magentaGlow: '0 4px 12px rgba(255,0,128,0.3)',
  magentaGlowH: '0 6px 20px rgba(255,0,128,0.4)',
  // Cyan accent system
  cyan: '#00d4ff',
  cyanGrad: 'linear-gradient(135deg, #00d4ff, #00aacc)',
  cyanGlow: '0 4px 12px rgba(0,212,255,0.3)',
  // Gold accent system
  gold: '#ffd60a',
  goldGrad: 'linear-gradient(135deg, #ffd60a, #cc9f00)',
  goldGlow: '0 4px 12px rgba(255,214,10,0.3)',
  // Card text hierarchy (white on dark glass)
  cardText: '#ffffff',
  cardTextH3: '#ffffff',
  cardTextBody: 'rgba(255,255,255,0.65)',
  cardTextMeta: 'rgba(255,255,255,0.40)',
  cardTextTer: 'rgba(255,255,255,0.30)',
};

// Shared CTA button style — liquid metal shimmer
const ctaButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(105deg, #B8B8BC 0%, #F5F5F7 25%, #FFFFFF 50%, #F5F5F7 75%, #B8B8BC 100%)',
  backgroundSize: '200% 100%',
  color: '#000000',
  boxShadow: '0 2px 12px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
  transition: 'box-shadow 0.4s ease, transform 0.3s ease, background-position 0.6s ease',
};

// Card shadow system — glass cards on dark background
const cardShadowIdle = '0 4px 24px rgba(0,0,0,0.3)';
const cardShadowHover = '0 8px 32px rgba(0,0,0,0.4)';

// Click handler for CTA buttons — gentle press
const handleCtaClick = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  el.style.transition = 'transform 0.1s ease-in';
  el.style.transform = 'scale(0.96)';
  setTimeout(() => {
    el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = '';
  }, 100);
};

// CSS Keyframes + Liquid Metal Styles
const KEYFRAMES = `
  /* ---- DARK CINEMA BACKGROUND ---- */
  @keyframes gridPulse {
    0%, 100% { opacity: 0.7; }
    50%      { opacity: 1; }
  }
  @keyframes cornerDrift {
    0%   { transform: translate(0, 0); }
    33%  { transform: translate(3%, 4%); }
    66%  { transform: translate(-2%, 2%); }
    100% { transform: translate(0, 0); }
  }

  /* ---- LIQUID METAL SHIMMER ---- */
  @keyframes liquidShimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes textShimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  /* ---- BREATHING TEXT ---- */
  @keyframes textBreathe {
    0%, 100% { opacity: 0.92; text-shadow: 0 0 40px rgba(255,255,255,0.0); }
    50%      { opacity: 1;    text-shadow: 0 0 60px rgba(255,255,255,0.08); }
  }

  /* ---- UTILITY ---- */
  @keyframes pulseActivity {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  /* ---- LIQUID METAL CTA ---- */
  .cta-silver {
    animation: liquidShimmer 10s ease-in-out infinite;
    background-size: 200% 100%;
    transition: box-shadow 0.4s ease, transform 0.3s ease;
  }
  .cta-silver:hover {
    box-shadow: 0 4px 30px rgba(255,255,255,0.20), 0 0 60px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.5);
    transform: translateY(-2px) scale(1.02);
  }

  /* ---- LIQUID METAL TEXT ---- */
  .text-liquid-metal {
    background: linear-gradient(105deg, #C0C0C8 0%, #E8E8EA 20%, #FFFFFF 40%, #F5F5F7 60%, #C7C7CC 80%, #C0C0C8 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShimmer 7s ease-in-out infinite;
  }

  /* ---- BREATHING HERO ---- */
  .hero-breathe {
    animation: textBreathe 12s ease-in-out infinite;
  }

  /* ---- CHROME ICONS ---- */
  .icon-chrome { transition: filter 0.15s ease-out, color 0.15s ease-out; }
  .icon-chrome:hover {
    color: #FFFFFF;
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15));
  }

  /* ---- BLOB ANIMATIONS (magenta only) ---- */
  @keyframes blob1Move {
    0%   { transform: translate(0, 0) scale(1); }
    25%  { transform: translate(150px, -100px) scale(1.1); }
    50%  { transform: translate(200px, 80px) scale(1); }
    75%  { transform: translate(-50px, 120px) scale(1.05); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes blob1Opacity {
    0%, 100% { opacity: 0.28; }
    50%      { opacity: 0.38; }
  }
  @keyframes blobBMove {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(80px, -80px) scale(0.9); }
    66%  { transform: translate(-60px, 60px) scale(1.05); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes blobBOpacity {
    0%, 100% { opacity: 0.14; }
    50%      { opacity: 0.20; }
  }
  @keyframes blobCMove {
    0%   { transform: translate(0, 0) scale(1); }
    40%  { transform: translate(120px, 100px) scale(0.92); }
    75%  { transform: translate(-80px, -60px) scale(1.08); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes blobCOpacity {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.25; }
  }

  /* ---- BLOB BASE STYLE ---- */
  .blob {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
    mix-blend-mode: screen;
    pointer-events: none;
    animation-fill-mode: both;
  }

  /* ---- GLASS CARD ELEVATION ---- */
  .white-card {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .white-card:hover {
    background: rgba(255, 255, 255, 0.10) !important;
    border-color: rgba(255, 255, 255, 0.18) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  }

  /* ---- NAV / FOOTER LINK HOVER ---- */
  .nav-link { color: #8E8E93; transition: color 0.2s ease; }
  .nav-link:hover { color: #FFFFFF; }
  .social-link { transition: border-color 0.2s ease, color 0.2s ease; }
  .social-link:hover { border-color: rgba(255,255,255,0.2) !important; color: #FFFFFF !important; }

  /* ---- PROOF STRIP SCROLLBAR HIDE ---- */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* ---- FEATURE CARD TEXTURES ---- */
  .feature-texture-video { position: relative; }
  .feature-texture-video::before {
    content: '';
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,128,0.03) 2px, rgba(255,0,128,0.03) 3px);
  }
  .feature-texture-automation { position: relative; }
  .feature-texture-automation::before {
    content: '';
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 0;
    background-image: radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .feature-texture-writing { position: relative; }
  .feature-texture-writing::before {
    content: '';
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 0;
    background: repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,214,10,0.025) 8px, rgba(255,214,10,0.025) 9px);
  }
  .feature-texture-music { position: relative; }
  .feature-texture-music::before {
    content: '';
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 0;
    background: repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(191,90,242,0.04) 3px, rgba(191,90,242,0.04) 4px);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// ============================================================
// ICONS MAP
// ============================================================

const ICON_MAP: Record<string, React.ElementType> = {
  film: Film,
  bot: Bot,
  pen: PenTool,
  music: Music,
  play: Play,
  settings: Settings,
  edit: Edit3,
  headphones: Headphones,
  star: Star,
  mail: Mail,
};

// ============================================================
// CONTENT DATA
// ============================================================

const FEATURES = [
  {
    title: 'AI Video Editing for TikTok & Reels',
    description: 'Professional short-form video editing for TikTok, Reels, and YouTube Shorts. Master Runway, Pika, and Kling — the tools working professionals use.',
    icon: 'film',
    meta: 'FIRST SHORT IN 2 HOURS · FULL PORTFOLIO IN 15',
    tier: 1,
    accentColor: '#ff0080',
  },
  {
    title: 'Workflow Automation Clients Pay For',
    description: 'Build production-grade automations with Make.com, Zapier, and n8n. Set up once, earn on repeat. Real businesses need this — and you can build it.',
    icon: 'bot',
    meta: 'FIRST WORKFLOW IN 3 HOURS · 10 AUTOMATIONS IN 12',
    tier: 1,
    accentColor: '#00d4ff',
  },
  {
    title: 'AI Content Writing & Strategy',
    description: 'Write high-performing captions, threads, and newsletters with ChatGPT and Claude. Learn prompt techniques that make AI sound like you, not a robot.',
    icon: 'pen',
    meta: 'FIRST THREAD IN 1 HOUR · FULL CALENDAR IN 18',
    tier: 2,
    accentColor: '#ffd60a',
  },
  {
    title: 'AI Music Production Library',
    description: 'Produce original tracks, intros, and background music with Suno and Udio. No instruments needed. Build a royalty-free library you actually own.',
    icon: 'music',
    meta: 'FIRST TRACK IN 2 HOURS · FULL LIBRARY IN 10',
    tier: 2,
    accentColor: '#bf5af2',
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Pick a Skill Path',
    description: 'Video, automation, writing, or music — choose the skill that fits your goals. Every path starts from zero. No experience required.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
  },
  {
    step: 2,
    title: 'Build Something Real',
    description: 'Every lesson has you building, not watching. By the end of each path, you have a portfolio of real work you can show.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    step: 3,
    title: 'Open New Opportunities',
    description: 'Use your new skills to freelance, grow an audience, or launch something of your own. Every path ends with a portfolio and next-steps playbook.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
];

const USE_CASES = [
  { title: 'TikTok / Reels Video', description: 'AI-edit professional short-form content in under an hour. No filming required.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop', icon: 'play' },
  { title: 'Automated Side Hustle', description: 'Build workflows that capture leads and send emails while you sleep.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop', icon: 'settings' },
  { title: 'Viral Twitter Thread', description: 'Write a week of content in one sitting with AI prompt chains.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=450&fit=crop', icon: 'edit' },
  { title: 'Original Music Track', description: 'Create a full track with Suno — license it, sell it, or use it in your videos.', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=450&fit=crop', icon: 'headphones' },
  { title: 'Freelance Portfolio', description: 'Walk out of each module with proof of work clients actually want to see.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=450&fit=crop', icon: 'star' },
  { title: 'Newsletter That Grows', description: 'AI-written emails that sound like you. Build an audience on autopilot.', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=450&fit=crop', icon: 'mail' },
];

const TESTIMONIALS = [
  {
    name: 'Alex K.',
    age: 17,
    location: 'Chicago, IL',
    role: 'High School Senior',
    quote: 'I built a Make.com automation for a local real estate agent in my second week. He hired me to maintain it. The freelance pricing guide at the end of the automation module gave me the confidence to pitch.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Maya R.',
    age: 19,
    location: 'Miami, FL',
    role: 'Community College Student',
    quote: 'I was spending 4 hours on one TikTok edit. After the video module I batch a whole week in an afternoon. My account went from 200 to 14K followers in two months using the techniques from Lesson 6.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Jordan L.',
    age: 16,
    location: 'Austin, TX',
    role: 'Content Creator',
    quote: "I made a 30-track royalty-free music library with Suno in two weeks. Now other creators license them on Gumroad. I don't even play an instrument.",
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
  },
];

const PRICING_PRO = {
  name: 'Pro',
  description: 'Everything you need to build your portfolio and open doors.',
  price: '$9.99',
  period: '/month',
  savings: 'Save 17% yearly — $99/year',
  features: [
    'All 4 skill paths — video, automation, writing, music',
    'Portfolio-ready projects in every path',
    'Downloadable prompts & templates',
    'Private community + feedback',
    'Certificate of completion',
    'Updated as new tools launch',
  ],
};

const FAQS = [
  { q: "I'm a complete beginner. Can I really do this?", a: 'Yes. Every module starts from zero. If you can type and follow instructions, you can do this. Most of our students had never touched an AI tool before signing up. Average completion rate: 78%.' },
  { q: 'Will this help with college applications?', a: "You'll build a real portfolio of AI projects — videos, automations, writing samples, and music. Admissions officers value self-directed, technical creative work. Several students have featured their Lumora projects in applications and interviews." },
  { q: "I'm 16–17. Do I need parental permission?", a: "You can explore free lessons anytime. Upgrading to Pro under 18 requires parent/guardian approval — it takes about 30 seconds during signup. All content is age-appropriate and designed for high school and college students." },
  { q: 'Can I actually earn money from what I learn?', a: "That's the point. Every path ends with a portfolio and a next-steps playbook — freelance pricing, where to find clients, how to package your skills. Students have gone on to freelance, sell digital products, and build audiences. Results vary, but the skills are real and in demand." },
  { q: 'How long does each module take to finish?', a: "You can build your first project in 1–3 hours. Most students finish a full path in 2–3 weeks at 30 minutes a day. Fully self-paced — binge it in a weekend or stretch it out. Each lesson is designed to be completed in one sitting." },
  { q: 'What AI tools will I actually learn to use?', a: 'Runway, Pika, and Kling for video editing. Make.com, Zapier, and n8n for automation. ChatGPT and Claude for content writing. Suno and Udio for music production. 60+ tools total, updated whenever major new tools launch.' },
];

const FOOTER_SECTIONS = [
  { title: 'Platform', links: ['Modules', 'Pricing', 'Student Work', 'Changelog'] },
  { title: 'Resources', links: ['Free Lessons', 'Blog', 'Prompt Library', 'Community', 'Support'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

// ============================================================
// ANIMATION VARIANTS — Staggered fade-in on scroll
// ============================================================

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cardHover = {
  y: -8,
  scale: 1.01,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

/** CountUp — Animates a number from 0 to target when scrolled into view */
function CountUp({ end, suffix = '', prefix = '', decimals = 0, delay = 0 }: {
  end: number; suffix?: string; prefix?: string; decimals?: number; delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(prefix + '0' + suffix);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now() + delay * 1000;
          const duration = 1500;
          const animate = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) { requestAnimationFrame(animate); return; }
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;
            if (decimals > 0) setDisplay(prefix + current.toFixed(decimals) + suffix);
            else setDisplay(prefix + Math.floor(current).toLocaleString() + suffix);
            if (progress < 1) requestAnimationFrame(animate);
            else {
              if (decimals > 0) setDisplay(prefix + end.toFixed(decimals) + suffix);
              else setDisplay(prefix + end.toLocaleString() + suffix);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, delay, prefix, suffix, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.8, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{ display: 'inline-block' }}
    >
      {display}
    </motion.span>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sticky scroll IntersectionObserver for How It Works steps
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.5, rootMargin: '-40% 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Card hover is now handled entirely via CSS .glass-card class
  // No JS-based style manipulation needed

  return (
    <div className="min-h-screen font-sans overflow-x-hidden scroll-smooth" style={{ color: C.text }}>

      {/* Injected CSS Keyframes */}
      <style>{KEYFRAMES}</style>

      {/* Animated gradient blob background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Base: pure black */}
        <AnimatedBackground />

        {/* Blob C — Magenta, top-left (softest) */}
        <div className="blob" style={{
          width: '500px', height: '500px',
          top: '-100px', left: '-80px',
          background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.18,
          animation: 'blobCMove 80s ease-in-out infinite, blobCOpacity 35s ease-in-out infinite',
          animationDelay: '15s, 10s',
        }} />

        {/* Blob B — Magenta, bottom-left (mid) */}
        <div className="blob" style={{
          width: '600px', height: '600px',
          bottom: '-150px', left: '-100px',
          background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)',
          filter: 'blur(130px)',
          opacity: 0.14,
          animation: 'blobBMove 70s ease-in-out infinite, blobBOpacity 28s ease-in-out infinite',
          animationDelay: '8s, 6s',
        }} />

        {/* Blob 1 — Magenta, top-right (primary) */}
        <div className="blob" style={{
          width: '800px', height: '800px',
          top: '-200px', right: '-200px',
          background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)',
          filter: 'blur(150px)',
          opacity: 0.28,
          animation: 'blob1Move 75s ease-in-out infinite, blob1Opacity 30s ease-in-out infinite',
          animationDelay: '0s, 3s',
        }} />

        {/* Grid texture — very subtle */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          animation: 'gridPulse 15s ease-in-out infinite',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)',
        }} />

        {/* Grain overlay — organic texture */}
        <div className="absolute inset-0" style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }} />
      </div>

      {/* Content wrapper — z-[1] ensures all content renders above the fixed background */}
      <div className="relative z-[1]">

      {/* ====== 1. NAVIGATION ====== */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          backgroundColor: isScrolled ? C.navBg : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? `1px solid ${C.navBorder}` : '1px solid transparent',
        }}
      >
        {/* Magenta glow line beneath nav logo */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '1px',
          background: 'radial-gradient(ellipse 30% 100% at 15% 0%, rgba(255,0,128,0.35), transparent)',
        }} />
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 md:px-10">
          <a href="#" className="text-white">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
              <rect x="2" y="4" width="3" height="24" rx="1.5" fill="currentColor"/>
              <rect x="7" y="10" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.65"/>
              <rect x="12" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.4"/>
              <rect x="17" y="18" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.2"/>
              <text x="36" y="21" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.02em">Lumora</text>
            </svg>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Modules', href: '#features' },
              { label: 'Student Work', href: '#student-work' },
              { label: 'Pricing', href: '#pricing' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-sm font-medium uppercase tracking-[0.02em]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/mlp/first-short"
              className="cta-silver px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
              style={ctaButtonStyle}
              onClick={handleCtaClick}
            >
              Start Building
            </a>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ border: `1px solid ${C.border}` }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pt-24 px-6"
            style={{ backgroundColor: C.bg }}
          >
            <div className="flex flex-col gap-2">
              {[
                { label: 'Modules', href: '#features' },
                { label: 'Student Work', href: '#student-work' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'FAQ', href: '#faq' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
                  className="text-2xl font-semibold py-4 text-white transition-colors duration-200"
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/mlp/first-short"
                className="cta-silver mt-6 block w-full py-4 font-semibold rounded-lg text-lg text-center"
                style={ctaButtonStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Building
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== 2. HERO ====== */}
      <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Hero atmosphere boost — extra magenta glow intensity */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 70% 20%, rgba(255,0,128,0.08) 0%, transparent 60%)',
        }} />
        {/* Hero border frame — desktop */}
        <div
          className="absolute hidden md:block overflow-hidden"
          style={{
            top: '88px',
            left: '24px',
            right: '24px',
            bottom: '32px',
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            background: 'rgba(0,0,0,0.15)',
          }}
        >
          <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest" style={{color: 'rgba(255,255,255,0.25)', zIndex: 2}}>
            LUMORA PLATFORM
          </div>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/hero-bg.mp4" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)' }}
          />
        </div>
        {/* Hero border frame — mobile */}
        <div
          className="absolute md:hidden overflow-hidden"
          style={{
            top: '72px',
            left: '12px',
            right: '12px',
            bottom: '20px',
            border: `1px solid ${C.border}`,
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.15)',
          }}
        >
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/hero-bg.mp4" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)' }}
          />
        </div>

        <div className="relative z-10 text-center px-5 max-w-[920px] mx-auto pt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="inline-block text-sm font-medium uppercase tracking-[0.02em] mb-6"
              style={{ color: C.textSec }}
            >
              AI Creative Platform
            </span>

            <h1
              className="hero-breathe text-[36px] sm:text-[48px] lg:text-[72px] font-semibold leading-[1.12] mb-6"
              style={{ letterSpacing: '-0.01em' }}
            >
              <span className="text-liquid-metal">Learn AI. Ship Real Work.</span>{' '}
              <br className="hidden sm:block" />
              <span className="text-liquid-metal">Open New Opportunities.</span>
            </h1>

            <p className="text-lg lg:text-xl font-normal max-w-[640px] mx-auto leading-[1.65] mb-10" style={{ color: 'rgba(199,199,204,0.75)', letterSpacing: '0.01em' }}>
              Your first portfolio piece. Done in an afternoon. Professional video editing, workflow automation, content writing, and music production — built with AI tools real creators actually use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/mlp/first-short"
                className="cta-silver group inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg text-base transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto"
                style={{...ctaButtonStyle, boxShadow: '0 0 50px rgba(255,0,128,0.20), 0 0 100px rgba(255,0,128,0.08)'}}
                onClick={handleCtaClick}
              >
                Start Building{' '}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg text-base transition-all duration-200 w-full sm:w-auto"
                style={{ border: '1px solid rgba(255,255,255,0.30)', color: 'rgba(255,255,255,0.85)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.30)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                Explore Modules
              </a>
            </div>

            {/* Before → After proof strip */}
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2 justify-center no-scrollbar">
              {[
                { label: 'Raw clip → Viral TikTok in 2 hrs', color: '#ff0080' },
                { label: 'Zero experience → First freelance client in 3 weeks', color: '#00d4ff' },
                { label: 'No instrument → 30-track music library in 10 hrs', color: '#ffd60a' },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm flex-shrink-0"
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                    color: C.textSec,
                  }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>

            {/* Animated stats bar with CountUp + pulsing dots */}
            <div
              className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-medium uppercase tracking-[0.02em]"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff0080', animation: 'pulseActivity 2s ease-in-out infinite' }} />
                <span className="text-white font-semibold"><CountUp end={12347} suffix="" delay={0} /></span> students
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff0080', animation: 'pulseActivity 2s ease-in-out infinite 0.5s' }} />
                <span className="text-white font-semibold"><CountUp end={847} prefix="$" suffix="K+" delay={0.1} /></span> earned
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff0080', animation: 'pulseActivity 2s ease-in-out infinite 1s' }} />
                <span className="text-white font-semibold"><CountUp end={4.9} suffix="" decimals={1} delay={0.2} /></span>{'\u2605'} average
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff0080', animation: 'pulseActivity 2s ease-in-out infinite 1.5s' }} />
                <span className="text-white font-semibold"><CountUp end={87} suffix="%" delay={0.3} /></span> ship their first project in week 1
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 3. HOW IT WORKS (sticky scroll) ====== */}
      <section className="px-5 md:px-10" id="how-it-works" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto pt-20 lg:pt-[120px]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            From Zero to Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}
          >
            No fluff. No filler. Build real projects and develop real skills.
          </motion.p>

          {/* Desktop: sticky scroll layout */}
          <div className="hidden md:flex gap-0" style={{ minHeight: '300vh' }}>
            {/* Left column — sticky image */}
            <div className="w-[40%]">
              <div className="sticky top-24 h-[60vh] rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.borderCard}` }}>
                {HOW_IT_WORKS.map((item, i) => (
                  <img key={i} src={item.image} alt={item.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: activeStep === i ? 1 : 0 }} />
                ))}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.4) 100%)' }} />
              </div>
            </div>
            {/* Right column — scrolling steps */}
            <div className="w-[60%] pl-12">
              {HOW_IT_WORKS.map((item, i) => {
                const stepColors = ['#ff0080', '#00d4ff', '#ffd60a'];
                const stepTextColors = ['#ffffff', '#000000', '#000000'];
                return (
                  <div key={item.step}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    className="flex items-center"
                    style={{ minHeight: '100vh' }}
                  >
                    <div className="transition-opacity duration-500" style={{ opacity: activeStep === i ? 1 : 0.4 }}>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-6"
                        style={{ background: stepColors[i], color: stepTextColors[i] }}
                      >
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-semibold mb-4" style={{ color: C.cardTextH3 }}>{item.title}</h3>
                      <p className="text-lg leading-[1.6] max-w-md" style={{ color: C.cardTextBody }}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: stacked cards fallback */}
          <div className="md:hidden grid grid-cols-1 gap-6 pb-20">
            {HOW_IT_WORKS.map((item, i) => {
              const stepColors = ['#ff0080', '#00d4ff', '#ffd60a'];
              const stepTextColors = ['#ffffff', '#000000', '#000000'];
              return (
                <motion.div
                  key={item.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className="white-card rounded-2xl overflow-hidden group"
                  style={{
                    border: `1px solid ${C.borderCard}`,
                    boxShadow: cardShadowIdle,
                  }}
                >
                  <div className="overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4"
                      style={{ background: stepColors[i], color: stepTextColors[i] }}
                    >
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: C.cardTextH3 }}>{item.title}</h3>
                    <p className="text-base leading-[1.6]" style={{ color: C.cardTextBody }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== 4. FEATURES / MODULE CARDS ====== */}
      <section
        className="py-20 lg:py-[120px] px-5 md:px-10 relative"
        id="features"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Pick Your Path. Build Real Work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16 max-w-xl mx-auto leading-[1.5]" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Each path takes you from zero to a portfolio you can show — in hours, not months.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => {
              const IconComponent = ICON_MAP[f.icon];
              const isFeatured = f.tier === 1;
              const textureClasses = ['feature-texture-video', 'feature-texture-automation', 'feature-texture-writing', 'feature-texture-music'];
              return (
                <motion.div
                  key={f.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className={`white-card relative rounded-2xl p-8 group overflow-hidden ${textureClasses[i]}`}
                  style={{
                    border: `1px solid ${C.borderCard}`,
                    boxShadow: cardShadowIdle,
                  }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl z-[1]" style={{background: f.accentColor}} />
                  {isFeatured && (
                    <span
                      className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.02em] rounded-md text-white z-[1]"
                      style={{ backgroundColor: f.accentColor, animation: 'pulseActivity 3s ease-in-out infinite' }}
                    >
                      Most in-demand
                    </span>
                  )}
                  <div className="relative z-[1]">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 leading-tight" style={{ color: C.cardTextH3 }}>{f.title}</h3>
                    <div className="text-sm font-medium uppercase tracking-[0.02em] mb-4" style={{ color: C.cardTextMeta }}>
                      {f.meta}
                    </div>
                    <p className="text-base leading-[1.6]" style={{ color: C.cardTextBody }}>{f.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== 5. STUDENT SHOWCASE ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="student-work" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Student Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16 max-w-lg mx-auto leading-[1.5]" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Real projects from students who went from zero to shipping real work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="white-card rounded-2xl text-center"
            style={{
              border: '1px solid rgba(255,0,128,0.25)',
              boxShadow: '0 0 40px rgba(255,0,128,0.10)',
              padding: '80px 48px',
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.magenta, animation: 'pulseActivity 2s ease-in-out infinite' }} />
              <span className="text-sm font-semibold uppercase tracking-[0.05em]" style={{ color: C.textSec }}>Student Showcase</span>
            </div>
            <h3 className="text-3xl font-semibold mb-4" style={{ color: C.silverLight }}>Your work could live here.</h3>
            <p className="mb-8 mx-auto leading-[1.6]" style={{ color: C.textSec, maxWidth: 480 }}>
              The first 100 students who complete a skill path get featured in the Lumora showcase.
            </p>
            <a
              href="/mlp/first-short"
              className="cta-silver inline-flex items-center gap-2 px-8 py-4 font-medium rounded-lg"
              style={ctaButtonStyle}
              onClick={handleCtaClick}
            >
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ====== 6. USE CASES GALLERY ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="use-cases" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Your Portfolio Starts Here
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Real projects you can post, sell, or add to your portfolio.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((item, i) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className="white-card rounded-2xl overflow-hidden group"
                  style={{
                    border: `1px solid ${C.borderCard}`,
                    boxShadow: cardShadowIdle,
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-1" style={{ color: C.cardTextH3 }}>{item.title}</h3>
                    <p className="text-sm leading-[1.6]" style={{ color: C.cardTextBody }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== 7. TESTIMONIALS ====== */}
      <section
        className="py-20 lg:py-[120px] px-5 md:px-10"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Real Students. Real Work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            12,347 students are already building with AI.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                whileHover={cardHover}
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="white-card relative rounded-2xl p-6 cursor-pointer"
                style={{
                  border: `1px solid ${C.borderCard}`,
                  boxShadow: cardShadowIdle,
                }}
              >
                <div className="absolute top-4 right-6 text-[80px] leading-none font-serif pointer-events-none select-none" style={{color: 'rgba(255,0,128,0.14)'}}>
                  &ldquo;
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{color: '#ff0080', fontSize: '12px'}}>&#9733;</span>
                  ))}
                </div>
                <p className="text-lg leading-[1.6] mb-8" style={{ color: C.cardTextBody }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: `2px solid ${C.borderCard}` }}
                  />
                  <div>
                    <span className="font-semibold" style={{ color: C.cardTextH3 }}>{t.name}</span>
                    <span className="ml-2 text-sm" style={{ color: C.cardTextMeta }}>{t.age}</span>
                    <div className="text-sm" style={{ color: C.cardTextMeta }}>{t.role}</div>
                    <div className="text-xs" style={{ color: C.cardTextTer }}>{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 8. PRICING ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="pricing" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg mb-16" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Start free. Go Pro for less than a coffee. Cancel anytime.
          </motion.p>

          {/* Pro Card — white with magenta accents */}
          <div className="max-w-md mx-auto mb-12 rounded-xl relative group/pricing" style={{ boxShadow: '0 0 0 1px rgba(255,0,128,0.35), 0 0 40px rgba(255,0,128,0.18), 0 0 80px rgba(255,0,128,0.10), 0 8px 48px rgba(0,0,0,0.50)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={cardHover}
              className="white-card relative rounded-[11px] p-8 md:p-12 text-left m-[1px]"
              style={{ boxShadow: '0 8px 48px rgba(255,0,128,0.15), 0 4px 24px rgba(0,0,0,0.3)' }}
            >
              <div
                className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] rounded-md mb-6 text-white"
                style={{ background: C.magenta }}
              >
                Most students choose this
              </div>
              <h3 className="text-2xl font-semibold mb-2" style={{ color: C.cardTextH3 }}>{PRICING_PRO.name}</h3>
              <p className="mb-6" style={{ color: C.cardTextBody }}>{PRICING_PRO.description}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[48px] sm:text-[64px] font-bold" style={{ color: C.cardText }}>{PRICING_PRO.price}</span>
                <span className="text-lg" style={{ color: C.cardTextMeta }}>{PRICING_PRO.period}</span>
              </div>
              <p className="text-sm font-medium mb-8" style={{ color: C.magenta }}>{PRICING_PRO.savings}</p>
              <ul className="space-y-3 mb-8">
                {PRICING_PRO.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      style={{ color: C.magenta }}
                      strokeWidth={2}
                    />
                    <span style={{ color: C.cardTextBody }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full h-14 font-semibold rounded-lg text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-white"
                style={{
                  background: C.magentaGrad,
                  boxShadow: C.magentaGlow,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = C.magentaGlowH;
                  (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = C.magentaGlow;
                  (e.currentTarget as HTMLElement).style.filter = '';
                }}
                onClick={handleCtaClick}
              >
                Start Free Trial
              </button>
              <p className="text-center text-xs mt-4" style={{ color: C.cardTextMeta }}>
                7 days free, then $9.99/month. Cancel anytime.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-sm" style={{ color: C.textSec }}>
            <p>
              <strong className="text-white">Free:</strong> Try before you commit.{' '}
              <a href="#" className="transition-colors duration-200 hover:text-white" style={{ color: C.chrome }}>Try it &rarr;</a>
            </p>
            <p>
              <strong className="text-white">Schools & Teams:</strong> Unlimited seats from $999/year.{' '}
              <a href="#" className="transition-colors duration-200 hover:text-white" style={{ color: C.chrome }}>Contact us &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      {/* ====== 9. FAQ ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="faq" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg mb-16" style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Everything you need to know about Lumora.
          </motion.p>

          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button
                  className="w-full text-left py-6 flex justify-between items-center gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="text-base sm:text-lg font-medium text-white transition-colors duration-200 group-hover:text-[#E8E8EA]"
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                    style={{ color: C.textTer }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base leading-[1.6]" style={{ color: C.textSec }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 10. FINAL CTA ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10 text-center relative" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,0,128,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }} />
        <div className="relative z-10 max-w-[920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-tight mb-6"
              style={{ letterSpacing: '-0.01em' }}
            >
              <span className="text-liquid-metal">Stop watching. Start building.</span>{' '}
              <br className="hidden sm:block" />
              <span className="text-liquid-metal">Your portfolio begins today.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto leading-[1.6] mb-3" style={{ color: C.textSec }}>
              Video. Automation. Writing. Music. Four skill paths, real projects, and a clear path from zero to a portfolio that opens doors.
            </p>
            <p className="text-sm mb-10" style={{ color: C.textTer }}>
              Free to start. $9.99/mo to unlock everything. Cancel anytime.
            </p>
            <a
              href="/mlp/first-short"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg text-base transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #ff0080 0%, #d4006a 100%)', color: '#ffffff', boxShadow: '0 4px 30px rgba(255,0,128,0.40)' }}
              onClick={handleCtaClick}
            >
              Start Building{' '}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <p className="mt-3 text-xs" style={{color: 'rgba(255,255,255,0.45)'}}>12,347 students built something real. You're next.</p>
          </motion.div>
        </div>
      </section>

      {/* ====== 11. FOOTER ====== */}
      <footer style={{ borderTop: `1px solid ${C.border}`, position: 'relative' }}>
        {/* Footer darkening overlay — subdued atmosphere */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))',
          zIndex: 0,
        }} />
        <div className="relative z-[1]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-16 pb-8">
          {/* Newsletter */}
          <div
            className="white-card mb-16 p-8 md:p-10 rounded-2xl"
            style={{ border: `1px solid ${C.borderCard}`, boxShadow: cardShadowIdle }}
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: C.cardTextH3 }}>Get lesson updates + AI creator insights</h3>
            <p className="mb-6" style={{ color: C.cardTextBody }}>
              Weekly insights on AI tools, student success stories, and new lesson releases.
            </p>
            {subscribed ? (
              <p style={{ color: C.magenta, fontWeight: 600 }}>You're in. &#10003;</p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none placeholder:text-[rgba(255,255,255,0.40)]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: C.cardTextH3,
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                />
                <button
                  className="cta-silver px-6 py-3 font-medium rounded-lg text-sm whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={ctaButtonStyle}
                  onClick={() => setSubscribed(true)}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-[0.05em] mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="nav-link text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <p className="text-sm" style={{ color: C.textTer }}>&copy; 2026 Lumora AI. All rights reserved.</p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="social-link w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                  style={{ color: C.textTer, border: `1px solid ${C.border}` }}
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
        </div>{/* end footer z-[1] wrapper */}
      </footer>

      </div>{/* end content wrapper */}
    </div>
  );
}
