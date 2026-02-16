import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  bg: '#0A0A0F',
  bgCard: '#141416',
  bgHover: '#1F1F22',
  text: '#FFFFFF',
  textSec: '#C7C7CC',
  textTer: '#8E8E93',
  silver: '#E8E8EA',
  silverLight: '#F5F5F7',
  chrome: '#C7C7CC',
  steel: '#8E8E93',
  border: 'rgba(255,255,255,0.08)',
  borderH: 'rgba(255,255,255,0.20)',
  borderCard: 'rgba(255,255,255,0.06)',
  borderCardH: 'rgba(255,255,255,0.20)',
  navBg: 'rgba(10,10,15,0.8)',
  navBorder: 'rgba(255,255,255,0.06)',
  gradientCta: 'linear-gradient(135deg, #E8E8EA, #F5F5F7)',
};

// Shared CTA button style — liquid metal shimmer
const ctaButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(105deg, #B8B8BC 0%, #F5F5F7 25%, #FFFFFF 50%, #F5F5F7 75%, #B8B8BC 100%)',
  backgroundSize: '200% 100%',
  color: '#0A0A0F',
  boxShadow: '0 2px 12px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
  transition: 'box-shadow 0.4s ease, transform 0.3s ease, background-position 0.6s ease',
};

// Card shadow system — dark idle, white underglow on hover
const cardShadowIdle = '0 4px 20px rgba(0,0,0,0.4), 0 0 30px rgba(139,0,255,0.08)';
const cardShadowHover = '0 12px 40px rgba(139,0,255,0.25), 0 6px 20px rgba(255,0,110,0.15), 0 0 1px rgba(255,255,255,0.1)';

// Click handler for CTA buttons — gentle press
const handleCtaClick = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  el.style.transform = 'scale(0.97)';
  setTimeout(() => { el.style.transform = ''; }, 200);
};

// CSS Keyframes + Liquid Metal Styles
const KEYFRAMES = `
  /* ---- GEOMETRIC GRID BACKGROUND ---- */
  @keyframes gridPulse {
    0%, 100% { opacity: 0.6; }
    50%      { opacity: 1; }
  }
  @keyframes gridSweep {
    0%   { background-position: 0% 0%; }
    50%  { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }
  @keyframes ambientBreathe {
    0%, 100% { opacity: 0.06; }
    50%      { opacity: 0.12; }
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
  @keyframes videoColorShift {
    0%, 100% { opacity: 0.04; }
    50% { opacity: 0.08; }
  }

  /* ---- LIQUID METAL CTA ---- */
  .cta-silver {
    animation: liquidShimmer 10s ease-in-out infinite;
    background-size: 200% 100%;
    transition: box-shadow 0.4s ease, transform 0.3s ease;
  }
  .cta-silver:hover {
    box-shadow: 0 4px 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.5);
    transform: translateY(-1px);
  }

  /* ---- LIQUID METAL TEXT ---- */
  .text-liquid-metal {
    background: linear-gradient(105deg, #8E8E93 0%, #E8E8EA 20%, #FFFFFF 40%, #F5F5F7 60%, #C7C7CC 80%, #8E8E93 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShimmer 14s ease-in-out infinite;
  }

  /* ---- BREATHING HERO ---- */
  .hero-breathe {
    animation: textBreathe 12s ease-in-out infinite;
  }

  /* ---- CHROME ICONS ---- */
  .icon-chrome { transition: filter 0.4s ease, color 0.4s ease; }
  .icon-chrome:hover {
    color: #FFFFFF;
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(200,180,255,0.15));
  }

  /* ---- GLASS CARD HOVER (CSS-only) ---- */
  .glass-card {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255,255,255,0.06);
    border-left: 1px solid rgba(255,255,255,0.04);
    transition: border-color 0.4s ease, box-shadow 0.5s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease;
  }
  .glass-card:hover {
    border-color: rgba(255,255,255,0.18) !important;
    box-shadow: 0 12px 40px rgba(139,0,255,0.2), 0 6px 20px rgba(255,0,110,0.12), 0 0 1px rgba(255,255,255,0.1) !important;
    transform: translateY(-8px) scale(1.01);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
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
  },
  {
    title: 'Workflow Automation Clients Pay For',
    description: 'Build production-grade automations with Make.com, Zapier, and n8n. Set up once, earn on repeat. Real businesses need this — and you can build it.',
    icon: 'bot',
    meta: 'FIRST WORKFLOW IN 3 HOURS · 10 AUTOMATIONS IN 12',
    tier: 1,
  },
  {
    title: 'AI Content Writing & Strategy',
    description: 'Write high-performing captions, threads, and newsletters with ChatGPT and Claude. Learn prompt techniques that make AI sound like you, not a robot.',
    icon: 'pen',
    meta: 'FIRST THREAD IN 1 HOUR · FULL CALENDAR IN 18',
    tier: 2,
  },
  {
    title: 'AI Music Production Library',
    description: 'Produce original tracks, intros, and background music with Suno and Udio. No instruments needed. Build a royalty-free library you actually own.',
    icon: 'music',
    meta: 'FIRST TRACK IN 2 HOURS · FULL LIBRARY IN 10',
    tier: 2,
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

const STUDENT_PORTFOLIO = [
  {
    name: 'Priya S.', age: 18, location: 'San Jose, CA',
    projectType: 'AI Video Edit',
    preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=340&fit=crop',
  },
  {
    name: 'Marcus T.', age: 17, location: 'Atlanta, GA',
    projectType: 'Automation',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop',
  },
  {
    name: 'Lily C.', age: 19, location: 'Portland, OR',
    projectType: 'AI Music',
    preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=340&fit=crop',
  },
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

// Hover variants removed — using CSS .glass-card for smoother GPU-accelerated transitions

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
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, 120]);
  const warmBg = useTransform(scrollY, [0, 3000], ['rgba(45,10,46,0.00)', 'rgba(45,10,46,0.12)']);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Card hover is now handled entirely via CSS .glass-card class
  // No JS-based style manipulation needed

  return (
    <div className="min-h-screen font-sans overflow-x-hidden scroll-smooth" style={{ backgroundColor: C.bg, color: C.text }}>

      {/* Injected CSS Keyframes */}
      <style>{KEYFRAMES}</style>

      {/* Atmospheric breathing background — 5-layer system */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Layer 1: Base dark radial — prevents pure black */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(30,10,40,0.5) 0%, transparent 70%)',
          }}
        />
        {/* Layer 2: Geometric grid — structured, technical */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139,0,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '120px 120px',
            animation: 'gridPulse 15s ease-in-out infinite',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)',
          }}
        />
        {/* Layer 2b: Gradient sweep across grid */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(139,0,255,0.06) 0%, rgba(255,0,110,0.04) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
            animation: 'gridSweep 20s ease-in-out infinite',
          }}
        />
        {/* Layer 2c: Subtle dot accents at grid intersections */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle 1.5px, rgba(139,0,255,0.12) 0%, transparent 100%)',
            backgroundSize: '120px 120px',
            animation: 'gridPulse 15s ease-in-out infinite 7.5s',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 100%)',
          }}
        />
        {/* Layer 3: Full-screen breathing wash */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,0,110,0.06) 0%, rgba(139,0,255,0.04) 50%, rgba(80,0,180,0.05) 100%)',
            animation: 'ambientBreathe 15s ease-in-out infinite',
          }}
        />
        {/* Layer 5: Vignette — cinematic edge darkening */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 50%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Layer 6: Film grain noise texture */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            mixBlendMode: 'overlay' as const,
            pointerEvents: 'none',
          }}
        />
        {/* Layer 4: Scroll-responsive warmth */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: warmBg }}
        />
      </div>

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
                className="text-sm font-medium uppercase tracking-[0.02em] transition-colors duration-200"
                style={{ color: C.textTer }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = C.text; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = C.textTer; }}
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
                  onClick={() => setMobileMenuOpen(false)}
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          style={{ y: videoY }}
          poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </motion.video>
        {/* Mobile static fallback */}
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />
        {/* Magenta color shift overlay — desktop only */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(135deg, rgba(255,0,110,0.02) 0%, transparent 50%, rgba(139,0,255,0.015) 100%)',
            animation: 'videoColorShift 8s ease-in-out infinite',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)',
          }}
        />

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
              60–90 minutes to your first AI-powered portfolio piece. Professional video editing, workflow automation, content writing, and music production.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/mlp/first-short"
                className="cta-silver group inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg text-base transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto"
                style={ctaButtonStyle}
                onClick={handleCtaClick}
              >
                Start Building{' '}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-lg text-base transition-all duration-200 w-full sm:w-auto"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                Explore Modules
              </a>
            </div>

            {/* Animated stats bar with CountUp + pulsing dots */}
            <div
              className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-medium uppercase tracking-[0.02em]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,0,110,0.4)', animation: 'pulseActivity 2s ease-in-out infinite' }} />
                <CountUp end={12347} suffix=" students" delay={0} />
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,0,110,0.4)', animation: 'pulseActivity 2s ease-in-out infinite 0.5s' }} />
                <CountUp end={847} prefix="$" suffix="K+ earned" delay={0.1} />
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,0,110,0.4)', animation: 'pulseActivity 2s ease-in-out infinite 1s' }} />
                <CountUp end={4.9} suffix={'\u2605 average'} decimals={1} delay={0.2} />
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,0,110,0.4)', animation: 'pulseActivity 2s ease-in-out infinite 1.5s' }} />
                <CountUp end={87} suffix="% land first client in 30 days" delay={0.3} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 3. STUDENT PORTFOLIO ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="student-work">
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Featured Work
          </motion.h2>
          <p className="text-center text-lg mb-16 max-w-lg mx-auto leading-[1.5]" style={{ color: C.textSec }}>
            Real projects from students who went from zero to shipping real work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDENT_PORTFOLIO.map((student, i) => (
              <motion.div
                key={student.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card group relative rounded-xl overflow-hidden cursor-pointer"
                style={{
                  border: `1px solid ${C.borderCard}`,
                  boxShadow: cardShadowIdle,
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={student.preview}
                    alt={`${student.name}'s project`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span
                    className="text-xs font-medium uppercase tracking-[0.02em] mb-1 inline-block"
                    style={{ color: C.steel }}
                  >
                    {student.projectType}
                  </span>
                  <h3 className="text-lg font-semibold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{student.name}</h3>
                  <p className="text-sm" style={{ color: C.textSec }}>Age {student.age} &middot; {student.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 4. FEATURES / MODULE CARDS ====== */}
      <section
        className="py-20 lg:py-[120px] px-5 md:px-10 relative"
        id="features"
        style={{
          borderTop: `1px solid ${C.border}`,
          background: 'linear-gradient(180deg, transparent 0%, rgba(139,0,255,0.04) 30%, rgba(180,40,120,0.03) 70%, transparent 100%)',
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span className="text-liquid-metal">Four Skill Paths</span>
          </motion.h2>
          <p className="text-center text-lg mb-16 max-w-xl mx-auto leading-[1.5]" style={{ color: C.textSec }}>
            Each path takes you from zero to a portfolio you can show — in hours, not months.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => {
              const IconComponent = ICON_MAP[f.icon];
              const isFeatured = f.tier === 1;
              return (
                <motion.div
                  key={f.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass-card relative rounded-xl p-8 group overflow-hidden"
                  style={{
                    backgroundColor: C.bgCard,
                    border: `1px solid ${C.borderCard}`,
                    boxShadow: cardShadowIdle,
                  }}
                >
                  {isFeatured && (
                    <span
                      className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.02em] rounded-md"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: C.chrome }}
                    >
                      Most in-demand
                    </span>
                  )}

                  {IconComponent && (
                    <div className="icon-chrome mb-6 text-[#C7C7CC] transition-colors duration-300 group-hover:text-white">
                      <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 leading-tight">{f.title}</h3>
                  <div className="text-sm font-medium uppercase tracking-[0.02em] mb-4" style={{ color: C.textTer }}>
                    {f.meta}
                  </div>
                  <p className="text-base leading-[1.6]" style={{ color: C.textSec }}>{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== 5. HOW IT WORKS ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            How It Works
          </motion.h2>
          <p className="text-center text-lg mb-16" style={{ color: 'rgba(199,199,204,0.75)', letterSpacing: '0.01em' }}>
            No fluff. No filler. Build real projects and develop real skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-xl overflow-hidden group"
                style={{
                  backgroundColor: C.bgCard,
                  border: `1px solid ${C.borderCard}`,
                  boxShadow: cardShadowIdle,
                }}
              >
                <div className="overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm mb-4"
                    style={{ background: C.gradientCta, color: '#0A0A0F' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-base leading-[1.6]" style={{ color: C.textSec }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 6. USE CASES GALLERY ====== */}
      <section className="py-20 lg:py-[120px] px-5 md:px-10" id="use-cases" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span className="text-liquid-metal">What You'll Build</span>
          </motion.h2>
          <p className="text-center text-lg mb-16" style={{ color: C.textSec }}>
            Real projects you can post, sell, or add to your portfolio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((item, i) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass-card rounded-xl overflow-hidden group"
                  style={{
                    backgroundColor: C.bgCard,
                    border: `1px solid ${C.borderCard}`,
                    boxShadow: cardShadowIdle,
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    {IconComponent && (
                      <div className="icon-chrome mb-3 text-[#C7C7CC] transition-colors duration-300 group-hover:text-white">
                        <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg text-white mb-1">{item.title}</h3>
                    <p className="text-sm leading-[1.6]" style={{ color: C.textSec }}>{item.description}</p>
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
        style={{
          borderTop: `1px solid ${C.border}`,
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,0,110,0.04) 30%, rgba(120,0,200,0.03) 70%, transparent 100%)',
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            What Our Students Say
          </motion.h2>
          <p className="text-center text-lg mb-16" style={{ color: C.textSec }}>
            12,347 students are already building with AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: 'rgba(20,20,20,0.5)',
                  border: `1px solid ${C.borderCard}`,
                  boxShadow: cardShadowIdle,
                }}
              >
                <p className="text-lg leading-[1.6] mb-8" style={{ color: C.textSec }}>
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
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="ml-2 text-sm" style={{ color: C.textTer }}>{t.age}</span>
                    <div className="text-sm" style={{ color: C.textSec }}>{t.role}</div>
                    <div className="text-xs" style={{ color: C.textTer }}>{t.location}</div>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span className="text-liquid-metal">Simple, Transparent Pricing</span>
          </motion.h2>
          <p className="text-lg mb-16" style={{ color: C.textSec }}>
            Start free. Go Pro for less than a coffee. Cancel anytime.
          </p>

          {/* Pro Card with silver border */}
          <div className="max-w-md mx-auto mb-12 rounded-xl relative group/pricing">
            {/* Silver border hover effect */}
            <div
              className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}
            />
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 8px 40px rgba(255,255,255,0.04)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[11px] p-8 md:p-12 text-left m-[1px]"
              style={{ backgroundColor: C.bgCard }}
            >
              <div
                className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] rounded-md mb-6"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: C.text }}
              >
                Most students choose this
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{PRICING_PRO.name}</h3>
              <p className="mb-6" style={{ color: C.textSec }}>{PRICING_PRO.description}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[48px] sm:text-[64px] font-bold text-white">{PRICING_PRO.price}</span>
                <span className="text-lg" style={{ color: C.textTer }}>{PRICING_PRO.period}</span>
              </div>
              <p className="text-sm font-medium mb-8" style={{ color: C.chrome }}>{PRICING_PRO.savings}</p>
              <ul className="space-y-3 mb-8">
                {PRICING_PRO.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      style={{ color: '#14b8a6' }}
                      strokeWidth={2}
                    />
                    <span style={{ color: C.textSec }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="cta-silver w-full h-14 font-semibold rounded-lg text-lg transition-all duration-200 hover:scale-[1.02]"
                style={ctaButtonStyle}
                onClick={handleCtaClick}
              >
                Start Free Trial
              </button>
              <p className="text-center text-xs mt-4" style={{ color: C.textTer }}>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-center mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-center text-lg mb-16" style={{ color: C.textSec }}>
            Everything you need to know about Lumora.
          </p>

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
      <section className="py-20 lg:py-[120px] px-5 md:px-10 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[920px] mx-auto">
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
              <span className="text-liquid-metal">Stop scrolling tutorials.</span>{' '}
              <br className="hidden sm:block" />
              <span className="text-liquid-metal">Start building skills.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto leading-[1.6] mb-3" style={{ color: C.textSec }}>
              Video. Automation. Writing. Music. Four skill paths, real projects, and a clear path from zero to a portfolio that opens doors.
            </p>
            <p className="text-sm mb-10" style={{ color: C.textTer }}>
              Free to start. $9.99/mo to unlock everything. Cancel anytime.
            </p>
            <a
              href="/mlp/first-short"
              className="cta-silver group inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg text-base transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto"
              style={ctaButtonStyle}
              onClick={handleCtaClick}
            >
              Start Building{' '}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ====== 11. FOOTER ====== */}
      <footer style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-16 pb-8">
          {/* Newsletter */}
          <div
            className="mb-16 p-8 md:p-10 rounded-xl"
            style={{ backgroundColor: C.bgCard, border: `1px solid ${C.borderCard}` }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">Get lesson updates + AI creator insights</h3>
            <p className="mb-6" style={{ color: C.textSec }}>
              Weekly insights on AI tools, student success stories, and new lesson releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-white placeholder:text-[#8E8E93] text-sm transition-all duration-200 outline-none"
                style={{
                  backgroundColor: C.bgHover,
                  border: `1px solid ${C.border}`,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }}
              />
              <button
                className="px-6 py-3 font-medium rounded-lg text-sm whitespace-nowrap transition-all duration-200 hover:scale-[1.02]"
                style={{ background: C.gradientCta, color: '#0A0A0F' }}
              >
                Subscribe
              </button>
            </div>
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
                        className="text-sm transition-colors duration-200"
                        style={{ color: C.textTer }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = C.text; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = C.textTer; }}
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm transition-all duration-200"
                  style={{ color: C.textTer, border: `1px solid ${C.border}` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = C.text;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLElement).style.color = C.textTer;
                  }}
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
