import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Lumora Runway - Premium Monochrome Landing Page
 *
 * Pure black & white aesthetic with functional color only:
 * - SF Pro Display / system-ui font
 * - Light mode default, dark mode toggle
 * - Monochrome palette — no accent color. Warm amber for star ratings only.
 * - Rounded hero with video background
 * - Smooth, premium-feeling transitions (0.5-0.8s)
 * - Subtle 3D tilt on feature cards
 * - Intersection Observer scroll-reveal animations
 * - FAQ accordion, FAB, scroll progress, toast
 *
 * SECTIONS (aligned with all Lumora landing pages):
 * 1. Navigation
 * 2. Hero with background video
 * 3. Features (4 cards with images)
 * 4. How It Works (3 steps)
 * 5. Showcase Gallery (6 cards)
 * 6. Testimonials (3 cards)
 * 7. Pricing (3 tiers)
 * 8. FAQ (7 items)
 * 9. Final CTA
 * 10. Footer (4-column)
 */

// ============================================================
// UNIFIED CONTENT (same across all 4 landing pages)
// ============================================================

const FEATURES = [
  {
    title: 'AI Video Editing',
    description: 'Create short-form videos that blow up on TikTok, Reels, and YouTube Shorts. Learn Runway, Pika, and Kling — from your first cut to a full portfolio.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
    lessons: 12,
  },
  {
    title: 'AI Automation & No-Code',
    description: 'Build workflows that do the boring stuff for you. Make.com, Zapier, n8n — set up once, earn on repeat. Clients pay $60\u2013180/hr for this.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    lessons: 8,
  },
  {
    title: 'AI Content Writing',
    description: 'Write viral captions, threads, and newsletters with ChatGPT and Claude. Learn the prompt techniques that make AI sound like you, not a robot.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    lessons: 10,
  },
  {
    title: 'AI Music for Creators',
    description: 'Make original tracks, intros, and background music with Suno and Udio. No instruments needed — just ideas. Build a royalty-free library you actually own.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    lessons: 7,
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Pick What You Want to Learn',
    description: 'Video, automation, writing, or music \u2014 choose the skill that fits your goals. Every path starts from zero. No experience needed.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
  },
  {
    step: 2,
    title: 'Build Real Projects',
    description: 'Every lesson has you creating something real \u2014 not just watching. By the end of each module, you\u2019ll have a portfolio you can actually show off.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    step: 3,
    title: 'Start Getting Paid',
    description: 'Use your new skills to land freelance gigs, grow your audience, or launch your own thing. Every module ends with a monetization playbook.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
];

const SOCIAL_PROOF_METRICS = [
  { value: '12,000+', label: 'Students' },
  { value: '45', label: 'Hands-On Lessons' },
  { value: '4.9\u2605', label: 'Average Rating' },
  { value: '60+', label: 'AI Tools Covered' },
];

const REPLACES = ['Overpriced Bootcamps', 'YouTube Rabbit Holes', 'Random Free Tutorials', 'Trial & Error', 'Outdated Courses'];

const USE_CASES = [
  {
    title: 'TikTok / Reels Video',
    description: 'Shoot nothing. Film nothing. AI-edit a viral short in under an hour.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop',
    icon: '\u25B6',
  },
  {
    title: 'Automated Side Hustle',
    description: 'Build a workflow that captures leads and sends emails while you sleep.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop',
    icon: '\u2699',
  },
  {
    title: 'Viral Twitter Thread',
    description: 'Write a week of content in one sitting with AI prompt chains.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=450&fit=crop',
    icon: '\u270E',
  },
  {
    title: 'Original Music Track',
    description: 'Create a full track with Suno \u2014 use it in your videos, sell it, or just vibe.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=450&fit=crop',
    icon: '\u266B',
  },
  {
    title: 'Freelance Portfolio',
    description: 'Walk out of each module with proof of work clients actually want to see.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=450&fit=crop',
    icon: '\u2606',
  },
  {
    title: 'Newsletter That Grows',
    description: 'AI-written emails that sound like you. Build an audience on autopilot.',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=450&fit=crop',
    icon: '\u2709',
  },
];

const TESTIMONIALS = [
  {
    initials: 'JR',
    name: 'Jess Rivera',
    role: 'Content Creator \u2022 180K on TikTok',
    quote: 'I was spending 6 hours editing one video. After the video module I batch-create a whole week of content in an afternoon. Lumora literally gave me my weekends back.',
  },
  {
    initials: 'AK',
    name: 'Alex Kim',
    role: 'Freelancer \u2022 $4K/mo from automation gigs',
    quote: 'I had zero coding skills. The automation module taught me Make.com and Zapier, and within a month I was charging clients $150/hr for workflows. Best $10/mo I\u2019ve ever spent.',
  },
  {
    initials: 'MO',
    name: 'Maya Osei',
    role: 'Music Producer \u2022 500+ tracks on Spotify',
    quote: 'The AI music module is insane. I built a 50-track royalty-free library in two weeks and now I earn passive income from licensing. I didn\u2019t even play an instrument before this.',
  },
];

const PRICING = [
  {
    badge: 'Try it out',
    name: 'Free',
    description: 'See if Lumora is for you',
    price: '$0',
    period: '',
    features: ['2 foundation lessons', 'Preview lessons from each module', 'Community access', 'Basic prompt templates'],
    cta: 'Start Free',
    featured: false,
  },
  {
    badge: 'Most popular',
    name: 'Pro',
    description: 'Full access to everything',
    price: '$9.99',
    period: '/month',
    savings: 'Save 17% yearly \u2014 $99/year',
    features: ['All 4 modules (45 lessons)', '60+ hours of hands-on content', 'Downloadable prompts & templates', 'Private community + feedback', 'Certificate of completion', 'New lessons as tools evolve'],
    cta: 'Go Pro',
    featured: true,
  },
  {
    badge: 'For schools & teams',
    name: 'School',
    description: 'Bring Lumora to your classroom',
    price: '$999',
    period: '/year',
    features: ['Everything in Pro', 'Unlimited student seats', 'Teacher dashboard & analytics', 'Custom learning paths', 'Dedicated support', 'Invoice billing'],
    cta: 'Contact Us',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'Do I need any experience with AI?',
    a: 'Nope. Every module starts from zero. If you can use a phone and type a sentence, you can do this. We designed Lumora for people who\u2019ve never touched an AI tool before.',
  },
  {
    q: 'What tools will I actually learn?',
    a: 'Runway, Pika, and Kling for video. Make.com, Zapier, and n8n for automation. ChatGPT and Claude for writing. Suno and Udio for music. 60+ tools total \u2014 and we update lessons when new ones drop.',
  },
  {
    q: 'Why not just learn from YouTube for free?',
    a: 'You can try. But YouTube is scattered, outdated, and teaches you random stuff with no structure. Lumora gives you a clear path: pick a skill, build real projects, and walk away with a portfolio. No guessing what to learn next.',
  },
  {
    q: 'How long does each module take?',
    a: "Most people finish a module in 2\u20133 weeks doing 30 minutes a day. But it's fully self-paced \u2014 binge it in a weekend or stretch it out. Your call.",
  },
  {
    q: 'Can I actually make money from this?',
    a: 'That\u2019s the whole point. Every module ends with a monetization playbook \u2014 freelance pricing, where to find clients, how to package your skills. Students are landing gigs within weeks of finishing.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. Cancel whenever, no questions asked. You keep access until the end of your billing period. It\u2019s $9.99/mo \u2014 less than a lunch.",
  },
  {
    q: 'What if I get stuck?',
    a: 'Every lesson has a comments section where our team and community help out. Pro members get priority support. Plus, each lesson includes troubleshooting tips for the stuff people commonly get tripped up on.',
  },
];

const FOOTER_SECTIONS = [
  { title: 'Platform', links: ['Modules', 'Pricing', 'Student Work', 'Changelog'] },
  { title: 'Resources', links: ['Free Lessons', 'Blog', 'Prompt Library', 'Community', 'Support'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

// Checkmark SVG for pricing lists (monochrome, uses currentColor for theme awareness)
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }} className="runway-check-icon">
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.1" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============================================================
// FUTURISTIC HERO CANVAS — animated geometric shapes background
// ============================================================

function FuturisticHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width || window.innerWidth;
      h = rect?.height || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Shape types
    type Shape = {
      type: 'ring' | 'triangle' | 'hexagon' | 'line' | 'dot';
      x: number; y: number;
      size: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      opDir: number;
      drift: { x: number; y: number };
      hue: number;
    };

    const shapes: Shape[] = [];
    const SHAPE_COUNT = 18;

    for (let i = 0; i < SHAPE_COUNT; i++) {
      const types: Shape['type'][] = ['ring', 'triangle', 'hexagon', 'line', 'dot'];
      shapes.push({
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 1.2 - 0.1,
        y: Math.random() * 1.2 - 0.1,
        size: 20 + Math.random() * 80,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        opacity: 0.05 + Math.random() * 0.15,
        opDir: Math.random() > 0.5 ? 1 : -1,
        drift: { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.1 },
        hue: 200 + Math.random() * 60, // cool blue-cyan range
      });
    }

    // Connecting lines between nearby shapes
    const drawConnections = (time: number) => {
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const a = shapes[i];
          const b = shapes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const alpha = (1 - dist / 250) * 0.06;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.strokeStyle = `rgba(140, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawShape = (s: Shape) => {
      const cx = s.x * w;
      const cy = s.y * h;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s.rotation);
      ctx.strokeStyle = `hsla(${s.hue}, 70%, 70%, ${s.opacity})`;
      ctx.lineWidth = 1;
      ctx.fillStyle = `hsla(${s.hue}, 70%, 70%, ${s.opacity * 0.15})`;

      switch (s.type) {
        case 'ring': {
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.stroke();
          // inner ring
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${s.hue}, 70%, 70%, ${s.opacity * 0.5})`;
          ctx.stroke();
          break;
        }
        case 'triangle': {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(angle) * s.size;
            const py = Math.sin(angle) * s.size;
            if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
          }
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          break;
        }
        case 'hexagon': {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const px = Math.cos(angle) * s.size;
            const py = Math.sin(angle) * s.size;
            if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
          }
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          break;
        }
        case 'line': {
          ctx.beginPath();
          ctx.moveTo(-s.size, 0);
          ctx.lineTo(s.size, 0);
          ctx.stroke();
          // perpendicular tick marks
          for (let t = -1; t <= 1; t += 0.5) {
            ctx.beginPath();
            ctx.moveTo(s.size * t, -s.size * 0.15);
            ctx.lineTo(s.size * t, s.size * 0.15);
            ctx.strokeStyle = `hsla(${s.hue}, 70%, 70%, ${s.opacity * 0.6})`;
            ctx.stroke();
          }
          break;
        }
        case 'dot': {
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 70%, 80%, ${s.opacity * 1.5})`;
          ctx.fill();
          // glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size * 0.6);
          grad.addColorStop(0, `hsla(${s.hue}, 70%, 70%, ${s.opacity * 0.4})`);
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          break;
        }
      }
      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, w, h);

      // Subtle radial gradient base
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.8);
      bgGrad.addColorStop(0, 'rgba(15, 25, 50, 0.4)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      drawConnections(time);

      for (const s of shapes) {
        s.rotation += s.rotSpeed;
        s.x += s.drift.x / w;
        s.y += s.drift.y / h;

        // Pulse opacity
        s.opacity += s.opDir * 0.0005;
        if (s.opacity > 0.2) s.opDir = -1;
        if (s.opacity < 0.04) s.opDir = 1;

        // Wrap around edges
        if (s.x < -0.15) s.x = 1.15;
        if (s.x > 1.15) s.x = -0.15;
        if (s.y < -0.15) s.y = 1.15;
        if (s.y > 1.15) s.y = -0.15;

        drawShape(s);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="runway-hero-bg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunwayClassic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setIsScrolled(window.scrollY > 50);
      setShowFab(winScroll > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved theme (default light)
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
    if (themeCookie && themeCookie.split('=')[1].trim() === 'dark') {
      setIsLightMode(false);
    }
  }, []);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('.runway-reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    setIsLightMode(prev => {
      const newMode = !prev;
      document.cookie = `theme=${newMode ? 'light' : 'dark'}; path=/; max-age=31536000`;
      setToast(newMode ? 'Light mode activated' : 'Dark mode activated');
      setTimeout(() => setToast(null), 3000);
      return newMode;
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        /* ============================================================
           DESIGN TOKENS
           ============================================================ */
        .lumora-runway {
          /* Monochrome palette with warm accent for visual rhythm */
          --star-color: #d97706;
          --accent-warm: #d97706;

          /* Light mode (default) */
          --bg-primary: #ffffff;
          --bg-secondary: #f3f4f5;
          --text-primary: #000000;
          --text-secondary: rgba(0, 0, 0, 0.6);
          --text-muted: rgba(0, 0, 0, 0.4);
          --border: rgba(0, 0, 0, 0.08);
          --border-hover: rgba(0, 0, 0, 0.15);
          --card-bg: #ffffff;
          --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          --card-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.08);
          --nav-bg: rgba(255, 255, 255, 0.85);
          --nav-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
          --btn-primary-bg: #000000;
          --btn-primary-color: #ffffff;
          --btn-primary-hover: rgba(0, 0, 0, 0.85);
          --btn-secondary-border: rgba(0, 0, 0, 0.15);
          --btn-secondary-hover: rgba(0, 0, 0, 0.04);

          --fab-bg: #000000;
          --fab-color: #ffffff;
          --toast-bg: rgba(0, 0, 0, 0.92);
          --toast-color: #ffffff;

          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Dark mode overrides */
        .lumora-runway.dark-mode {
          --accent-warm: #f59e0b;
          --bg-primary: #000000;
          --bg-secondary: #111111;
          --text-primary: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.6);
          --text-muted: rgba(255, 255, 255, 0.4);
          --border: rgba(255, 255, 255, 0.08);
          --border-hover: rgba(255, 255, 255, 0.15);
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-shadow: none;
          --card-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.4);
          --nav-bg: rgba(0, 0, 0, 0.85);
          --nav-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
          --btn-primary-bg: #ffffff;
          --btn-primary-color: #000000;
          --btn-primary-hover: rgba(255, 255, 255, 0.92);
          --btn-secondary-border: rgba(255, 255, 255, 0.15);
          --btn-secondary-hover: rgba(255, 255, 255, 0.04);

          --fab-bg: #ffffff;
          --fab-color: #000000;
          --toast-bg: rgba(255, 255, 255, 0.95);
          --toast-color: #000000;
        }

        /* ============================================================
           SCROLL-REVEAL ANIMATIONS
           ============================================================ */
        .runway-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .runway-reveal.delay-1 { transition-delay: 0.1s; }
        .runway-reveal.delay-2 { transition-delay: 0.2s; }
        .runway-reveal.delay-3 { transition-delay: 0.3s; }

        /* ============================================================
           NAVIGATION
           ============================================================ */
        .runway-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-nav.scrolled {
          background: var(--text-primary);
          color: var(--bg-primary);
          backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
          padding: 1rem 3rem;
        }

        .runway-nav.scrolled .logo,
        .runway-nav.scrolled .runway-nav-links a,
        .runway-nav.scrolled .runway-theme-toggle {
          color: var(--bg-primary);
        }

        .runway-nav.scrolled .runway-nav-links a:hover {
          opacity: 0.7;
        }

        .runway-nav.scrolled .runway-nav-links a::after {
          background: var(--bg-primary);
        }

        .runway-nav.scrolled .runway-btn-primary {
          background: #ffffff;
          color: #000000;
        }

        .runway-nav.scrolled .runway-btn-primary:hover {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
        }

        .dark-mode .runway-nav.scrolled .runway-btn-primary {
          background: #000000;
          color: #ffffff;
        }

        .dark-mode .runway-nav.scrolled .runway-btn-primary:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .runway-nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .runway-nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: color 0.4s ease;
          position: relative;
        }

        .runway-nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--text-primary);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-nav-links a:hover {
          color: var(--text-primary);
        }

        .runway-nav-links a:hover::after {
          width: 100%;
        }

        /* ============================================================
           BUTTONS
           ============================================================ */
        .runway-btn {
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          text-decoration: none;
          display: inline-block;
          font-family: inherit;
        }

        .runway-btn-primary {
          background: var(--btn-primary-bg);
          color: var(--btn-primary-color);
        }

        .runway-btn-primary:hover {
          background: var(--btn-primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .runway-btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--btn-secondary-border);
        }

        .runway-btn-secondary:hover {
          background: var(--btn-secondary-hover);
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        /* In hero context - always light-on-dark */
        .runway-hero .runway-btn-primary {
          background: #fff;
          color: #000;
        }

        .runway-hero .runway-btn-primary:hover {
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
        }

        .runway-hero .runway-btn-secondary {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .runway-hero .runway-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* ============================================================
           THEME TOGGLE
           ============================================================ */
        .runway-theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid var(--border);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .runway-theme-toggle:hover {
          background: var(--btn-secondary-hover);
          border-color: var(--border-hover);
          transform: scale(1.05);
        }

        .runway-theme-toggle svg {
          position: absolute;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          stroke: var(--text-primary);
        }

        .runway-theme-toggle .sun-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .runway-theme-toggle .moon-icon {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
        }

        .dark-mode .runway-theme-toggle .sun-icon {
          opacity: 0;
          transform: rotate(-90deg) scale(0.5);
        }

        .dark-mode .runway-theme-toggle .moon-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        /* ============================================================
           HERO SECTION
           ============================================================ */
        .runway-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 0 2rem;
          border-radius: 20px;
          margin-top: 90px;
          background: #000;
        }

        .runway-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .runway-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0.35) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          z-index: 1;
        }

        .runway-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 960px;
          padding: 0 2rem;
        }

        .runway-category-label {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2rem;
          backdrop-filter: blur(12px);
          animation: heroFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .runway-hero h1 {
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: #fff;
          animation: heroFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards;
          opacity: 0;
        }

        .runway-hero p {
          font-size: clamp(1.05rem, 1.5vw, 1.35rem);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
          animation: heroFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          opacity: 0;
        }

        .runway-hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: heroFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.45s forwards;
          opacity: 0;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ============================================================
           CONTENT SECTIONS
           ============================================================ */
        .runway-content-section {
          position: relative;
          padding: 7rem 3rem;
          background: var(--bg-primary);
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-section-alt {
          background: var(--bg-secondary);
        }

        .runway-section-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          text-align: center;
          line-height: 1.15;
        }

        .runway-section-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 4rem;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* ============================================================
           FEATURES GRID
           ============================================================ */
        .runway-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-feature-card {
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .runway-feature-card:hover .runway-feature-image img {
          transform: scale(1.03);
        }

        .runway-feature-image {
          position: relative;
          aspect-ratio: 16/11;
          border-radius: 14px;
          overflow: hidden;
        }

        .runway-feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-feature-info {
          margin-top: 1rem;
        }

        .runway-feature-info h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .runway-lesson-count {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent-warm);
          margin-bottom: 0.5rem;
        }

        .runway-feature-info p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* ============================================================
           HOW IT WORKS
           ============================================================ */
        .runway-how-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: var(--card-shadow);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-how-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
        }

        .runway-how-card img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-how-card:hover img {
          transform: scale(1.02);
        }

        .runway-how-card-body {
          padding: 2rem;
        }

        .runway-step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .runway-how-card-body h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .runway-how-card-body p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ============================================================
           TESTIMONIALS
           ============================================================ */
        .runway-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .runway-testimonial-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2.5rem;
          box-shadow: var(--card-shadow);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-testimonial-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: var(--card-shadow-hover);
        }

        .runway-testimonial-stars {
          color: var(--star-color);
          font-size: 1rem;
          margin-bottom: 1.25rem;
          letter-spacing: 2px;
        }

        .runway-testimonial-quote {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .runway-testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .runway-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          border: 1.5px solid var(--border);
        }

        .runway-testimonial-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .runway-testimonial-role {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        /* ============================================================
           PRICING
           ============================================================ */
        .runway-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .runway-pricing-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2.5rem;
          box-shadow: var(--card-shadow);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .runway-pricing-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: var(--card-shadow-hover);
        }

        .runway-pricing-card.featured {
          background: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
          position: relative;
        }

        .runway-pricing-card.featured .runway-pricing-badge,
        .runway-pricing-card.featured .runway-pricing-description,
        .runway-pricing-card.featured .runway-pricing-period,
        .runway-pricing-card.featured .runway-pricing-features li {
          color: rgba(255, 255, 255, 0.7);
        }

        .lumora-runway:not(.dark-mode) .runway-pricing-card.featured .runway-pricing-badge,
        .lumora-runway:not(.dark-mode) .runway-pricing-card.featured .runway-pricing-description,
        .lumora-runway:not(.dark-mode) .runway-pricing-card.featured .runway-pricing-period,
        .lumora-runway:not(.dark-mode) .runway-pricing-card.featured .runway-pricing-features li {
          color: rgba(255, 255, 255, 0.7);
        }

        .dark-mode .runway-pricing-card.featured .runway-pricing-badge,
        .dark-mode .runway-pricing-card.featured .runway-pricing-description,
        .dark-mode .runway-pricing-card.featured .runway-pricing-period,
        .dark-mode .runway-pricing-card.featured .runway-pricing-features li {
          color: rgba(0, 0, 0, 0.6);
        }

        .runway-pricing-card.featured .runway-pricing-savings {
          color: var(--bg-primary);
        }

        .runway-pricing-card.featured:hover {
          border-color: var(--text-primary);
          transform: translateY(-6px);
        }

        .runway-pricing-badge {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .runway-pricing-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .runway-pricing-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .runway-pricing-price {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 0.25rem;
        }

        .runway-pricing-period {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        .runway-pricing-savings {
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .runway-pricing-features {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          flex: 1;
        }

        .runway-pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .runway-pricing-cta {
          width: 100%;
          padding: 0.875rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-primary);
          font-family: inherit;
        }

        .runway-pricing-cta:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .runway-pricing-cta.featured {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: none;
          font-weight: 700;
        }

        .runway-pricing-cta.featured:hover {
          opacity: 0.9;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        /* ============================================================
           FAQ
           ============================================================ */
        .runway-faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .runway-faq-item {
          border-bottom: 1px solid var(--border);
        }

        .runway-faq-question {
          width: 100%;
          background: none;
          border: none;
          color: var(--text-primary);
          text-align: left;
          padding: 1.5rem 0;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          font-family: inherit;
          transition: color 0.4s ease;
        }

        .runway-faq-question:hover {
          color: var(--text-primary);
        }

        .runway-faq-question:hover span:first-child {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }

        .runway-faq-icon {
          font-size: 1.25rem;
          font-weight: 300;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          color: var(--text-muted);
          width: 24px;
          text-align: center;
        }

        .runway-faq-icon.open {
          transform: rotate(45deg);
        }

        .runway-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-faq-answer.open {
          max-height: 400px;
        }

        .runway-faq-answer p {
          padding-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        /* ============================================================
           CTA SECTION
           ============================================================ */
        .runway-cta-section {
          padding: 9rem 3rem;
          background: var(--text-primary);
          color: var(--bg-primary);
          text-align: center;
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-cta-section h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          line-height: 1.15;
        }

        .runway-cta-section p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .dark-mode .runway-cta-section p {
          color: rgba(0, 0, 0, 0.55);
        }

        .runway-cta-section .runway-btn-primary {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .runway-cta-section .runway-btn-primary:hover {
          opacity: 0.9;
        }

        .runway-cta-section .runway-btn-secondary {
          color: var(--bg-primary);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .dark-mode .runway-cta-section .runway-btn-secondary {
          color: var(--bg-primary);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .runway-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ============================================================
           FAB
           ============================================================ */
        .runway-fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .runway-fab-container.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .runway-fab-button {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--fab-bg);
          color: var(--fab-color);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-fab-button:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        /* ============================================================
           TOAST
           ============================================================ */
        .runway-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: var(--toast-bg);
          color: var(--toast-color);
          padding: 0.875rem 1.5rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
        }

        .runway-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* ============================================================
           FOOTER
           ============================================================ */
        .runway-footer {
          padding: 4rem 3rem 2rem;
          border-top: 1px solid var(--border);
          background: var(--bg-primary);
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .runway-footer-section h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .runway-footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .runway-footer-section li {
          margin-bottom: 0.75rem;
        }

        .runway-footer-section a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.4s ease;
        }

        .runway-footer-section a:hover {
          color: var(--text-primary);
        }

        .runway-footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .runway-footer-bottom a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.4s ease;
        }

        .runway-footer-bottom a:hover {
          color: var(--text-secondary);
        }

        /* ============================================================
           SOCIAL PROOF STRIP
           ============================================================ */
        .runway-proof-strip {
          padding: 4rem 3rem;
          background: var(--bg-secondary);
          text-align: center;
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-proof-metrics {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .runway-proof-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .runway-proof-value {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.35rem;
        }

        .runway-proof-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        .runway-proof-divider {
          width: 48px;
          height: 1px;
          background: var(--border);
          margin: 0 auto 2rem;
        }

        .runway-proof-replaces {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .runway-proof-replaces-label {
          font-weight: 600;
          color: var(--text-secondary);
          margin-right: 0.25rem;
        }

        .runway-proof-replaces span {
          padding: 0.3rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: border-color 0.4s ease;
        }

        .runway-proof-replaces span:hover {
          border-color: var(--border-hover);
        }

        /* ============================================================
           USE-CASE CARDS (replaces gallery)
           ============================================================ */
        .runway-usecase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-usecase-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
        }

        .runway-usecase-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-usecase-card:hover img {
          transform: scale(1.04);
        }

        .runway-usecase-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
          transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-usecase-card:hover .runway-usecase-overlay {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.15) 100%);
        }

        .runway-usecase-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          opacity: 0.7;
          color: #fff;
        }

        .runway-usecase-overlay h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .runway-usecase-overlay p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
          opacity: 0;
        }

        .runway-usecase-card:hover .runway-usecase-overlay p {
          max-height: 60px;
          opacity: 1;
        }

        /* ============================================================
           HOW-IT-WORKS CONNECTORS
           ============================================================ */
        .runway-how-grid-connected {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .runway-how-connector {
          display: none;
        }

        @media (min-width: 769px) {
          .runway-how-connector {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 22%;
            width: 2rem;
            z-index: 2;
          }

          .runway-how-connector svg {
            color: var(--text-muted);
          }
        }

        /* ============================================================
           MOBILE MENU
           ============================================================ */
        .runway-menu-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.4s ease;
        }

        .runway-menu-toggle:hover {
          border-color: var(--border-hover);
        }

        .runway-menu-toggle svg {
          stroke: var(--text-primary);
        }

        .runway-mobile-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .runway-menu-toggle {
            display: flex;
          }

          .runway-mobile-nav {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9998;
            background: var(--bg-primary);
            padding: 6rem 2rem 2rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .runway-mobile-nav.open {
            opacity: 1;
            pointer-events: auto;
          }

          .runway-mobile-nav a {
            display: block;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            text-decoration: none;
            padding: 1rem 0;
            border-bottom: 1px solid var(--border);
            transition: opacity 0.3s ease;
          }

          .runway-mobile-nav a:hover {
            opacity: 0.6;
          }

          .runway-mobile-nav .runway-btn {
            margin-top: 2rem;
            width: 100%;
            text-align: center;
            padding: 1rem;
            font-size: 1.1rem;
          }
        }

        /* ============================================================
           CTA METRICS STRIP
           ============================================================ */
        .runway-cta-metrics {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .runway-cta-metric {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.02em;
        }

        .dark-mode .runway-cta-metric {
          color: rgba(0, 0, 0, 0.4);
        }

        .runway-cta-metric strong {
          color: var(--bg-primary);
          font-weight: 700;
        }

        .runway-cta-risk {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.45);
          margin-top: -1.5rem;
          margin-bottom: 2.5rem;
        }

        .dark-mode .runway-cta-risk {
          color: rgba(0, 0, 0, 0.4);
        }

        /* ============================================================
           SCROLL PROGRESS
           ============================================================ */
        .runway-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: var(--accent-warm);
          opacity: 0.8;
          z-index: 9999;
          transition: width 0.15s ease;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 768px) {
          .runway-hero {
            margin: 0;
            margin-top: 70px;
            min-height: 100vh;
            border-radius: 0;
          }

          .runway-nav {
            padding: 1rem 1.5rem;
          }

          .runway-nav.scrolled {
            padding: 0.75rem 1.5rem;
          }

          .runway-nav-links a {
            display: none;
          }

          .runway-nav-links .runway-theme-toggle {
            order: 2;
          }

          .runway-nav-links .runway-btn {
            display: none;
          }

          .runway-features-grid {
            grid-template-columns: 1fr;
          }

          .runway-how-grid-connected,
          .runway-usecase-grid,
          .runway-testimonials-grid,
          .runway-pricing-grid {
            grid-template-columns: 1fr;
          }

          .runway-proof-metrics {
            gap: 2rem;
          }

          .runway-proof-strip {
            padding: 3rem 1.5rem;
          }

          .runway-content-section {
            padding: 4.5rem 1.5rem;
          }

          .runway-cta-section {
            padding: 5rem 1.5rem;
          }

          .runway-footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .runway-fab-container {
            bottom: 1rem;
            right: 1rem;
          }

          .runway-fab-button {
            width: 46px;
            height: 46px;
          }

          .runway-usecase-overlay p {
            max-height: 60px;
            opacity: 1;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .runway-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .runway-usecase-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className={`lumora-runway ${isLightMode ? '' : 'dark-mode'}`}>
        {/* Scroll Progress */}
        <div className="runway-scroll-progress" style={{ width: `${scrollProgress}%` }} />

        {/* ====== 1. NAVIGATION ====== */}
        <nav className={`runway-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="logo">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
              <rect x="2" y="4" width="3" height="24" rx="1.5" fill="currentColor"/>
              <rect x="7" y="10" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.65"/>
              <rect x="12" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.4"/>
              <rect x="17" y="18" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.2"/>
              <text x="36" y="21" fontFamily="'SF Pro Display', system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.02em">Lumora</text>
            </svg>
          </div>
          <div className="runway-nav-links">
            <a href="#features">Modules</a>
            <a href="#use-cases">Student Work</a>
            <a href="#pricing">Pricing</a>
            <button className="runway-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button className="runway-btn runway-btn-primary">Try Lumora</button>
            <button
              className="runway-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                {mobileMenuOpen
                  ? <path d="M18 6L6 18M6 6l12 12"/>
                  : <path d="M3 12h18M3 6h18M3 18h18"/>
                }
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Nav Overlay */}
        <div className={`runway-mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Modules</a>
          <a href="#use-cases" onClick={() => setMobileMenuOpen(false)}>Student Work</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <button className="runway-btn runway-btn-primary" onClick={() => setMobileMenuOpen(false)}>Try Lumora</button>
        </div>

        {/* ====== 2. HERO with VIDEO ====== */}
        <section className="runway-hero">
          <FuturisticHeroCanvas />
          <div className="runway-hero-overlay" />
          <div className="runway-hero-content">
            <div className="runway-category-label">The Creative AI Learning Platform</div>
            <h1>Learn AI. Create Everything.<br/>Start Getting Paid.</h1>
            <p>45 hands-on lessons across video, automation, writing, and music. Go from zero AI skills to a portfolio that makes money.</p>
            <div className="runway-hero-buttons">
              <button className="runway-btn runway-btn-primary">Start Learning Free</button>
              <button className="runway-btn runway-btn-secondary">Watch Preview</button>
            </div>
          </div>
        </section>

        {/* ====== SOCIAL PROOF STRIP ====== */}
        <section className="runway-proof-strip runway-reveal">
          <div className="runway-proof-metrics">
            {SOCIAL_PROOF_METRICS.map((m) => (
              <div key={m.label} className="runway-proof-metric">
                <div className="runway-proof-value">{m.value}</div>
                <div className="runway-proof-label">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="runway-proof-divider" />
          <div className="runway-proof-replaces">
            <span className="runway-proof-replaces-label">Say goodbye to:</span>
            {REPLACES.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </section>

        {/* ====== 3. FEATURES (4 cards) ====== */}
        <section className="runway-content-section" id="features">
          <h2 className="runway-section-title runway-reveal">Four Skills.<br/>Endless Possibilities.</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Each module teaches you a high-income creative skill with real AI tools. 45 lessons. 60+ hours. All hands-on.</p>

          <div className="runway-features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                image={f.image}
                title={f.title}
                description={f.description}
                delay={i}
                lessons={f.lessons}
              />
            ))}
          </div>
        </section>

        {/* ====== 4. HOW IT WORKS (3 steps) ====== */}
        <section className="runway-content-section runway-section-alt">
          <h2 className="runway-section-title runway-reveal">How It Works</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">No fluff. No filler. Just build stuff and get good.</p>

          <div className="runway-how-grid-connected">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="runway-how-card runway-reveal">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="runway-how-card-body">
                  <div className="runway-step-number">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            {/* Arrow connectors between cards */}
            <div className="runway-how-connector" style={{ left: 'calc((100% - 4rem) / 3 + 1rem)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
            <div className="runway-how-connector" style={{ left: 'calc(2 * (100% - 4rem) / 3 + 3rem)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
          </div>
        </section>

        {/* ====== 5. WHAT YOU'LL BUILD (6 use-case cards) ====== */}
        <section className="runway-content-section" id="use-cases">
          <h2 className="runway-section-title runway-reveal">What You'll Actually Make</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Not theory. Not slides. Real stuff you can post, sell, or put in your portfolio.</p>

          <div className="runway-usecase-grid">
            {USE_CASES.map((item) => (
              <div key={item.title} className="runway-usecase-card runway-reveal">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="runway-usecase-overlay">
                  <div className="runway-usecase-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 6. TESTIMONIALS (3 cards) ====== */}
        <section className="runway-content-section runway-section-alt">
          <h2 className="runway-section-title runway-reveal">Don't Take Our Word for It</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">12,000+ students are already building with AI. Here's what they say.</p>

          <div className="runway-testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="runway-testimonial-card runway-reveal">
                <div className="runway-testimonial-stars">{'\u2605'.repeat(5)}</div>
                <p className="runway-testimonial-quote">"{t.quote}"</p>
                <div className="runway-testimonial-author">
                  <div className="runway-testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="runway-testimonial-name">{t.name}</div>
                    <div className="runway-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 7. PRICING (3 tiers) ====== */}
        <section className="runway-content-section" id="pricing">
          <h2 className="runway-section-title runway-reveal">Simple, Transparent Pricing</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Start free. Go Pro for less than a coffee. Cancel anytime.</p>

          <div className="runway-pricing-grid">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`runway-pricing-card runway-reveal ${plan.featured ? 'featured' : ''}`}>
                <div className="runway-pricing-badge">{plan.badge}</div>
                <div className="runway-pricing-name">{plan.name}</div>
                <div className="runway-pricing-description">{plan.description}</div>
                <div>
                  <span className="runway-pricing-price">{plan.price}</span>
                  {plan.period && <span className="runway-pricing-period">{plan.period}</span>}
                </div>
                {plan.savings && <div className="runway-pricing-savings">{plan.savings}</div>}
                <ul className="runway-pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}><CheckIcon />{feature}</li>
                  ))}
                </ul>
                <button className={`runway-pricing-cta ${plan.featured ? 'featured' : ''}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 8. FAQ (7 items) ====== */}
        <section className="runway-content-section runway-section-alt" id="faq">
          <h2 className="runway-section-title runway-reveal">Frequently Asked Questions</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Everything you need to know about Lumora.</p>

          <div className="runway-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="runway-faq-item runway-reveal">
                <button
                  className="runway-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className={`runway-faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                </button>
                <div className={`runway-faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 9. CTA ====== */}
        <section className="runway-cta-section">
          <div className="runway-cta-metrics runway-reveal">
            {SOCIAL_PROOF_METRICS.map((m) => (
              <div key={m.label} className="runway-cta-metric">
                <strong>{m.value}</strong> {m.label}
              </div>
            ))}
          </div>
          <h2 className="runway-reveal delay-1">Stop scrolling tutorials.<br/>Start building skills.</h2>
          <p className="runway-reveal delay-2">Video. Automation. Writing. Music. Four modules, 45 lessons, and a clear path from \u201CI have no idea what I\u2019m doing\u201D to getting paid.</p>
          <div className="runway-cta-risk runway-reveal delay-2">Free to start. $9.99/mo to unlock everything. Cancel anytime.</div>
          <div className="runway-cta-buttons runway-reveal delay-3">
            <button className="runway-btn runway-btn-primary">Start Learning Free</button>
            <a href="#pricing" className="runway-btn runway-btn-secondary">See Pricing</a>
          </div>
        </section>

        {/* FAB */}
        <div className={`runway-fab-container ${showFab ? 'visible' : ''}`}>
          <button className="runway-fab-button" onClick={scrollToTop} aria-label="Scroll to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Toast */}
        <div className={`runway-toast ${toast ? 'show' : ''}`}>
          {toast}
        </div>

        {/* ====== 10. FOOTER (4-column) ====== */}
        <footer className="runway-footer">
          <div className="runway-footer-content">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="runway-footer-section">
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="runway-footer-bottom">
            <p>&copy; 2026 Lumora AI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Feature Card Component with subtle 3D tilt effect
function FeatureCard({ image, title, description, delay, lessons }: { image: string; title: string; description: string; delay: number; lessons: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 35;
    const rotateY = (centerX - x) / 35;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.25s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className={`runway-feature-card runway-reveal delay-${Math.min(delay, 3)}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="runway-feature-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="runway-feature-info">
        <h3>{title}</h3>
        <span className="runway-lesson-count">{lessons} lessons</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
