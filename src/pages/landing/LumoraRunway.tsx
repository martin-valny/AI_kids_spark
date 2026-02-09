import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Lumora Runway - Refined Premium Landing Page
 *
 * Clean minimal aesthetic with intentional teal accent:
 * - SF Pro Display / system-ui font
 * - Light mode default, dark mode toggle
 * - Intentional teal (#0d9488) woven throughout as brand accent
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

const HERO_VIDEO_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

const FEATURES = [
  {
    title: 'AI Video in Minutes',
    description: 'Turn product ideas into scroll-stopping social videos. No filming, no editing software—just describe what you want and watch it come to life.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
  },
  {
    title: 'Brand Visuals On-Demand',
    description: 'Generate product mockups, social graphics, and marketing assets instantly. Maintain consistent style across all your content without hiring a designer.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
  },
  {
    title: 'AI Writing Assistant',
    description: 'Write sales pages, email sequences, and social captions that convert. Our AI learns your voice and creates content that sounds authentically you.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
  },
  {
    title: 'Marketing Automation',
    description: 'Build workflows that run your marketing on autopilot. From lead capture to email nurture, spend less time on tasks and more time creating.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Describe What You Want',
    description: 'Type a simple description of your content. Our AI guides you through the details to get exactly what you need.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
  },
  {
    step: 2,
    title: 'AI Generates Your Content',
    description: 'Watch as Lumora creates professional-quality videos, copy, designs, and workflows in seconds—not hours.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    step: 3,
    title: 'Edit, Export & Launch',
    description: 'Fine-tune with our simple editor, then export everything ready to post. No tech skills needed—just publish and grow.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
];

const GALLERY = [
  { title: 'Cyberpunk Dreams', subtitle: 'Neon-lit cityscape', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=450&fit=crop' },
  { title: 'Ocean Serenity', subtitle: 'Underwater exploration', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=450&fit=crop' },
  { title: 'Product Showcase', subtitle: 'Commercial photography', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop' },
  { title: 'Character Design', subtitle: 'Fantasy portrait', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop' },
  { title: 'Abstract Art', subtitle: 'Generative patterns', image: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=450&fit=crop' },
  { title: 'Nature\'s Beauty', subtitle: 'Landscape photography', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop' },
];

const TESTIMONIALS = [
  {
    initials: 'SK',
    name: 'Sarah Kim',
    role: 'Online Course Creator \u2022 $42K/mo',
    quote: 'I went from spending 12 hours editing one video to creating 5 videos in an afternoon. Lumora handles all the heavy lifting\u2014I just guide the creative direction. Saved me $3,000/month in editing costs.',
  },
  {
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Digital Product Creator \u2022 2,400 students',
    quote: 'The AI copywriting alone is worth 10x the price. I launched my info product in 3 days instead of 3 weeks. Sales page, emails, social posts\u2014all done while I focused on the product itself.',
  },
  {
    initials: 'EP',
    name: 'Emily Parker',
    role: 'Solopreneur \u2022 From $8K to $35K/mo in 90 days',
    quote: 'Finally, AI tools that actually work together. I can go from product idea to full marketing campaign without switching between 10 different apps. My launch revenue jumped 340% with half the stress.',
  },
];

const PRICING = [
  {
    badge: 'Test the waters',
    name: 'Starter',
    description: 'Perfect for exploring AI tools',
    price: '$0',
    period: '/month',
    features: ['50 generations per month', '720p video quality', 'Basic style presets', 'Community support'],
    cta: 'Get Started',
    featured: false,
  },
  {
    badge: 'Best for full-time creators',
    name: 'Pro',
    description: 'For serious solo creators scaling up',
    price: '$49',
    period: '/month',
    savings: 'Save $108/year',
    features: ['Unlimited generations', '4K video quality', 'Advanced style controls', 'Priority rendering', 'Team collaboration', 'Priority support'],
    cta: 'Start Pro Trial',
    featured: true,
  },
  {
    badge: 'For agencies & businesses',
    name: 'Enterprise',
    description: 'Custom solutions for scale',
    price: 'Custom',
    period: '',
    features: ['Unlimited everything', 'Custom model training', 'API access', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact Sales',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'Do I own the commercial rights to what I create?',
    a: 'Yes, 100%. Everything you create with Lumora is yours to use commercially\u2014sell products, run ads, post on social media, use in client work. No attribution required, no royalties owed.',
  },
  {
    q: "I'm not tech-savvy. Is this really beginner-friendly?",
    a: "Absolutely. If you can type and click a button, you can use Lumora. We've designed every tool with beginners in mind\u2014no coding, no complex software, no learning curve. Most creators generate their first content in under 5 minutes.",
  },
  {
    q: 'How fast is the generation? Do I have to wait hours?',
    a: 'Most content generates in 10-45 seconds. Videos take slightly longer (1-2 minutes for high quality), but you can queue multiple projects and let them process while you work on other things. No overnight rendering\u2014everything is near-instant.',
  },
  {
    q: "What if I don't like what the AI generates?",
    a: 'Regenerate as many times as you need (unlimited on Pro plan). You can also use our editor to tweak colors, adjust text, swap elements, or refine details without starting over. Most creators get what they want within 2-3 iterations.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: "Yes, cancel anytime\u2014no questions asked, no penalties. You'll keep access until the end of your billing period. Need to pause for a month? No problem. Want to downgrade? Easy. We're flexible because your business needs change.",
  },
  {
    q: 'Is my data and content private and secure?',
    a: "Your data is encrypted and never shared with third parties. We don't train our models on your private content. You can delete your data anytime. We're SOC 2 compliant and take security seriously\u2014your creations and business information stay confidential.",
  },
  {
    q: 'What makes Lumora different from other AI tools?',
    a: 'Most AI tools do one thing. Lumora is an integrated system built specifically for solo creators\u2014video, copy, design, automation, and music in one place. No switching apps, no exporting and importing, no compatibility issues. One login, one workflow, everything connected.',
  },
];

const FOOTER_SECTIONS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Gallery', 'API', 'Changelog'] },
  { title: 'Resources', links: ['Documentation', 'Tutorials', 'Blog', 'Community', 'Support'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

// Checkmark SVG for pricing lists
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="9" fill="rgba(13, 148, 136, 0.12)" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          --accent: #0d9488;
          --accent-light: #14b8a6;
          --accent-subtle: rgba(13, 148, 136, 0.08);
          --accent-border: rgba(13, 148, 136, 0.25);
          --accent-glow: rgba(13, 148, 136, 0.15);

          /* Light mode (default) */
          --bg-primary: #ffffff;
          --bg-secondary: #f7f8f8;
          --text-primary: #0f172a;
          --text-secondary: rgba(15, 23, 42, 0.6);
          --text-muted: rgba(15, 23, 42, 0.4);
          --border: rgba(15, 23, 42, 0.08);
          --border-hover: rgba(15, 23, 42, 0.15);
          --card-bg: #ffffff;
          --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          --card-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.08);
          --nav-bg: rgba(255, 255, 255, 0.85);
          --nav-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
          --btn-primary-bg: #0f172a;
          --btn-primary-color: #ffffff;
          --btn-primary-hover: rgba(15, 23, 42, 0.88);
          --btn-secondary-border: rgba(15, 23, 42, 0.15);
          --btn-secondary-hover: rgba(15, 23, 42, 0.04);
          --fab-bg: #0f172a;
          --fab-color: #ffffff;
          --toast-bg: rgba(15, 23, 42, 0.92);
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
          --bg-primary: #000000;
          --bg-secondary: #0a0a0a;
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
          background: var(--nav-bg);
          backdrop-filter: blur(20px) saturate(180%);
          box-shadow: var(--nav-shadow);
          padding: 1rem 3rem;
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
          background: var(--accent);
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
          background: var(--accent-subtle);
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
          background: var(--accent-glow);
          border-color: var(--accent-border);
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
          border: 1px solid rgba(13, 148, 136, 0.35);
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

        .runway-feature-card:hover .runway-feature-image::after {
          opacity: 1;
        }

        .runway-feature-card:hover .runway-feature-image img {
          filter: blur(3px) brightness(0.85);
          transform: scale(1.03);
        }

        .runway-feature-card:hover .runway-feature-learn-more {
          opacity: 1;
          transform: translate(-50%, -50%) translateY(0);
        }

        .runway-feature-image {
          position: relative;
          aspect-ratio: 16/11;
          border-radius: 14px;
          overflow: hidden;
        }

        .runway-feature-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .runway-feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-feature-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%);
          min-height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          pointer-events: none;
        }

        .runway-feature-overlay h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0;
          line-height: 1.2;
          color: #fff;
        }

        .runway-feature-learn-more {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateY(6px);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 10;
          text-align: center;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .runway-feature-info {
          margin-top: 1rem;
        }

        .runway-feature-info p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* ============================================================
           HOW IT WORKS
           ============================================================ */
        .runway-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

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
          background: var(--accent-subtle);
          border: 1.5px solid var(--accent-border);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--accent);
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
           GALLERY
           ============================================================ */
        .runway-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-gallery-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
        }

        .runway-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .runway-gallery-card:hover img {
          transform: scale(1.04);
        }

        .runway-gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(4px);
        }

        .runway-gallery-card:hover .runway-gallery-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .runway-gallery-overlay h3 {
          font-size: 1.05rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.2rem;
        }

        .runway-gallery-overlay span {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
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
          color: var(--accent);
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
          background: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent);
          border: 1.5px solid var(--accent-border);
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
          border-color: var(--accent);
          background: var(--accent-subtle);
          position: relative;
        }

        .runway-pricing-card.featured:hover {
          border-color: var(--accent-light);
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
          color: var(--accent);
          font-weight: 500;
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
          background: var(--accent);
          color: #fff;
          border: none;
        }

        .runway-pricing-cta.featured:hover {
          background: var(--accent-light);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.25);
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
          color: var(--accent);
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
          background: var(--bg-primary);
          text-align: center;
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
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
           SCROLL PROGRESS
           ============================================================ */
        .runway-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-light));
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

          .runway-features-grid {
            grid-template-columns: 1fr;
          }

          .runway-how-grid,
          .runway-gallery-grid,
          .runway-testimonials-grid,
          .runway-pricing-grid {
            grid-template-columns: 1fr;
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
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .runway-features-grid {
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
              <rect x="2" y="4" width="3" height="24" rx="1.5" fill="#0d9488"/>
              <rect x="7" y="10" width="3" height="18" rx="1.5" fill="#0d9488" opacity="0.75"/>
              <rect x="12" y="14" width="3" height="14" rx="1.5" fill="#0d9488" opacity="0.5"/>
              <rect x="17" y="18" width="3" height="10" rx="1.5" fill="#0d9488" opacity="0.3"/>
              <text x="36" y="21" fontFamily="'SF Pro Display', system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.02em">Lumora</text>
            </svg>
          </div>
          <div className="runway-nav-links">
            <a href="#features">Features</a>
            <a href="#gallery">Gallery</a>
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
          </div>
        </nav>

        {/* ====== 2. HERO with VIDEO ====== */}
        <section className="runway-hero">
          <video
            className="runway-hero-bg"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="runway-hero-overlay" />
          <div className="runway-hero-content">
            <div className="runway-category-label">Create professional content in under 30 seconds</div>
            <h1>Master AI Tools to Create,<br/>Design & Market Your Products</h1>
            <p>The all-in-one platform for creators to master AI video, design, writing, and marketing—no technical experience needed.</p>
            <div className="runway-hero-buttons">
              <button className="runway-btn runway-btn-primary">Get Started Free</button>
              <button className="runway-btn runway-btn-secondary">Watch Demo</button>
            </div>
          </div>
        </section>

        {/* ====== 3. FEATURES (4 cards) ====== */}
        <section className="runway-content-section" id="features">
          <h2 className="runway-section-title runway-reveal">Powerful AI Tools for<br/>Modern Creators</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Everything you need to create, design, write, and automate—all powered by cutting-edge AI.</p>

          <div className="runway-features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                image={f.image}
                title={f.title}
                description={f.description}
                delay={i}
              />
            ))}
          </div>
        </section>

        {/* ====== 4. HOW IT WORKS (3 steps) ====== */}
        <section className="runway-content-section runway-section-alt">
          <h2 className="runway-section-title runway-reveal">How It Works</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">From idea to published content in three simple steps.</p>

          <div className="runway-how-grid">
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
          </div>
        </section>

        {/* ====== 5. SHOWCASE GALLERY (6 cards) ====== */}
        <section className="runway-content-section" id="gallery">
          <h2 className="runway-section-title runway-reveal">Creator Showcase</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">See what creators are building with Lumora's AI-powered tools.</p>

          <div className="runway-gallery-grid">
            {GALLERY.map((item) => (
              <div key={item.title} className="runway-gallery-card runway-reveal">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="runway-gallery-overlay">
                  <h3>{item.title}</h3>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 6. TESTIMONIALS (3 cards) ====== */}
        <section className="runway-content-section runway-section-alt">
          <h2 className="runway-section-title runway-reveal">Loved by Creators</h2>
          <p className="runway-section-subtitle runway-reveal delay-1">Join thousands of creators already transforming their workflow with Lumora.</p>

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
          <p className="runway-section-subtitle runway-reveal delay-1">Start free. Upgrade when you're ready to scale.</p>

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
        <section className="runway-content-section runway-section-alt">
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
          <h2 className="runway-reveal">Ready to bring your<br/>ideas to life?</h2>
          <p className="runway-reveal delay-1">Join thousands of creators already using Lumora to push the boundaries of creative expression.</p>
          <div className="runway-cta-buttons runway-reveal delay-2">
            <button className="runway-btn runway-btn-primary">Start Creating Free</button>
            <button className="runway-btn runway-btn-secondary">Watch Demo</button>
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
function FeatureCard({ image, title, description, delay }: { image: string; title: string; description: string; delay: number }) {
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
        <div className="runway-feature-overlay">
          <h3>{title}</h3>
        </div>
        <div className="runway-feature-learn-more">Learn more &rarr;</div>
      </div>
      <div className="runway-feature-info">
        <p>{description}</p>
      </div>
    </div>
  );
}
