import { useEffect, useState, useRef } from 'react';

/**
 * Lumora Runway - Clean, Minimal Landing Page
 *
 * Premium high-tech minimal aesthetic inspired by Runway:
 * - SF Pro Display / system-ui font
 * - Pure black/white color scheme with #2DD4BF accent
 * - Rounded hero with video background
 * - Transparent nav with blur on scroll
 * - 3D tilt effect on feature cards
 * - FAB scroll-to-top button
 * - Theme toggle with sun/moon
 * - Toast notifications
 * - Scroll progress bar
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

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
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

  // Load saved theme
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
    if (themeCookie && themeCookie.split('=')[1] === 'light') {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    document.cookie = `theme=${newMode ? 'light' : 'dark'}; path=/; max-age=31536000`;
    showToast(newMode ? 'Light mode activated' : 'Dark mode activated');
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .lumora-runway {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        .lumora-runway.light-mode {
          background: #fff;
          color: #000;
        }

        /* Navigation */
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
          transition: background 0.3s ease, backdrop-filter 0.3s ease;
        }

        .runway-nav.scrolled {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
        }

        .light-mode .runway-nav.scrolled {
          background: rgba(255, 255, 255, 0.9);
        }

        .runway-nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .runway-nav-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: color 0.2s ease;
        }

        .runway-nav-links a:hover {
          color: #fff;
        }

        .light-mode .runway-nav-links a {
          color: rgba(0, 0, 0, 0.6);
        }

        .light-mode .runway-nav-links a:hover {
          color: #000;
        }

        /* Buttons */
        .runway-btn {
          padding: 0.625rem 1.25rem;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
        }

        .runway-btn-primary {
          background: #fff;
          color: #000;
          position: relative;
          overflow: hidden;
        }

        .runway-btn-primary:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
        }

        .light-mode .runway-btn-primary {
          background: #000;
          color: #fff;
        }

        .light-mode .runway-btn-primary:hover {
          background: rgba(0, 0, 0, 0.9);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .runway-btn-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .runway-btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .light-mode .runway-btn-secondary {
          color: #000;
          border-color: rgba(0, 0, 0, 0.2);
        }

        .light-mode .runway-btn-secondary:hover {
          border-color: rgba(0, 0, 0, 0.4);
        }

        /* Theme Toggle */
        .runway-theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .runway-theme-toggle:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .light-mode .runway-theme-toggle {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .light-mode .runway-theme-toggle:hover {
          background: rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .runway-theme-toggle svg {
          position: absolute;
          transition: all 0.3s ease;
          stroke: #fff;
        }

        .light-mode .runway-theme-toggle svg {
          stroke: #000;
        }

        .runway-theme-toggle .sun-icon {
          opacity: 0;
          transform: rotate(-90deg) scale(0.5);
        }

        .runway-theme-toggle .moon-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .light-mode .runway-theme-toggle .sun-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .light-mode .runway-theme-toggle .moon-icon {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
        }

        /* Hero Section */
        .runway-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 0 3rem;
          border-radius: 16px;
          margin-top: 100px;
          background: #000;
        }

        .light-mode .runway-hero {
          background: #f5f5f5;
        }

        .runway-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          object-position: center;
        }

        .runway-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
          z-index: 1;
        }

        .runway-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          padding: 0 2rem;
        }

        .runway-category-label {
          display: inline-block;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .runway-hero h1 {
          font-size: 5rem;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: #fff;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .runway-hero p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.5rem;
          line-height: 1.5;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .runway-hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Content Section */
        .runway-content-section {
          position: relative;
          padding: 8rem 3rem;
          background: #000;
        }

        .light-mode .runway-content-section {
          background: #fff;
        }

        .runway-section-title {
          font-size: 3rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          text-align: center;
        }

        .runway-section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .light-mode .runway-section-subtitle {
          color: rgba(0, 0, 0, 0.6);
        }

        /* Features Grid */
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
          transition: transform 0.3s ease;
        }

        .runway-feature-card:hover .runway-feature-image::after {
          opacity: 1;
        }

        .runway-feature-card:hover .runway-feature-image img {
          filter: blur(4px);
          transform: scale(1.05);
        }

        .runway-feature-card:hover .runway-feature-learn-more {
          opacity: 1;
        }

        .runway-feature-image {
          position: relative;
          aspect-ratio: 16/11;
          border-radius: 12px;
          overflow: hidden;
        }

        .runway-feature-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .runway-feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .runway-feature-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 40%, transparent 100%);
          min-height: 35%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          pointer-events: none;
        }

        .runway-feature-overlay h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0;
          line-height: 1.2;
          color: #fff;
        }

        .runway-feature-learn-more {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 10;
          text-align: center;
          white-space: nowrap;
        }

        .runway-feature-info {
          margin-top: 1rem;
        }

        .runway-feature-info p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .light-mode .runway-feature-info p {
          color: rgba(0, 0, 0, 0.65);
        }

        /* How It Works Section */
        .runway-how-section {
          padding: 8rem 3rem;
          background: #0a0a0a;
        }

        .light-mode .runway-how-section {
          background: #f9f9f9;
        }

        .runway-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .runway-how-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-how-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .light-mode .runway-how-card {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .light-mode .runway-how-card:hover {
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .runway-how-card img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
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
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .light-mode .runway-step-number {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .runway-how-card-body h3 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .runway-how-card-body p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .light-mode .runway-how-card-body p {
          color: rgba(0, 0, 0, 0.6);
        }

        /* Gallery Section */
        .runway-gallery-section {
          padding: 8rem 3rem;
          background: #000;
        }

        .light-mode .runway-gallery-section {
          background: #fff;
        }

        .runway-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-gallery-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
        }

        .runway-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-gallery-card:hover img {
          transform: scale(1.08);
        }

        .runway-gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .runway-gallery-card:hover .runway-gallery-overlay {
          opacity: 1;
        }

        .runway-gallery-overlay h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .runway-gallery-overlay span {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Testimonials Section */
        .runway-testimonials-section {
          padding: 8rem 3rem;
          background: #0a0a0a;
        }

        .light-mode .runway-testimonials-section {
          background: #f9f9f9;
        }

        .runway-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .runway-testimonial-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-testimonial-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
        }

        .light-mode .runway-testimonial-card {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .light-mode .runway-testimonial-card:hover {
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        }

        .runway-testimonial-stars {
          color: #2DD4BF;
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          letter-spacing: 2px;
        }

        .runway-testimonial-quote {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
          font-style: italic;
        }

        .light-mode .runway-testimonial-quote {
          color: rgba(0, 0, 0, 0.65);
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
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #2DD4BF;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .light-mode .runway-testimonial-avatar {
          background: rgba(0, 0, 0, 0.06);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .runway-testimonial-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .runway-testimonial-role {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.15rem;
        }

        .light-mode .runway-testimonial-role {
          color: rgba(0, 0, 0, 0.5);
        }

        /* Pricing Section */
        .runway-pricing-section {
          padding: 8rem 3rem;
          background: #000;
        }

        .light-mode .runway-pricing-section {
          background: #fff;
        }

        .runway-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .runway-pricing-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .runway-pricing-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
        }

        .runway-pricing-card.featured {
          border-color: #2DD4BF;
          background: rgba(45, 212, 191, 0.04);
          position: relative;
        }

        .light-mode .runway-pricing-card {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .light-mode .runway-pricing-card:hover {
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        }

        .light-mode .runway-pricing-card.featured {
          border-color: #2DD4BF;
          background: rgba(45, 212, 191, 0.04);
        }

        .runway-pricing-badge {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        .light-mode .runway-pricing-badge {
          color: rgba(0, 0, 0, 0.5);
        }

        .runway-pricing-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .runway-pricing-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }

        .light-mode .runway-pricing-description {
          color: rgba(0, 0, 0, 0.5);
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
          color: rgba(255, 255, 255, 0.5);
        }

        .light-mode .runway-pricing-period {
          color: rgba(0, 0, 0, 0.5);
        }

        .runway-pricing-savings {
          font-size: 0.8rem;
          color: #2DD4BF;
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
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.75rem;
        }

        .light-mode .runway-pricing-features li {
          color: rgba(0, 0, 0, 0.7);
        }

        .runway-pricing-features li::before {
          content: '';
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(45, 212, 191, 0.15);
          flex-shrink: 0;
          position: relative;
        }

        .runway-pricing-features li::after {
          content: '\u2713';
          position: absolute;
          margin-left: -1.35rem;
          font-size: 0.7rem;
          color: #2DD4BF;
          font-weight: 700;
        }

        .runway-pricing-cta {
          width: 100%;
          padding: 0.875rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: #fff;
        }

        .runway-pricing-cta:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .runway-pricing-cta.featured {
          background: #fff;
          color: #000;
          border: none;
        }

        .runway-pricing-cta.featured:hover {
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
        }

        .light-mode .runway-pricing-cta {
          border-color: rgba(0, 0, 0, 0.15);
          color: #000;
        }

        .light-mode .runway-pricing-cta:hover {
          border-color: rgba(0, 0, 0, 0.3);
        }

        .light-mode .runway-pricing-cta.featured {
          background: #000;
          color: #fff;
        }

        .light-mode .runway-pricing-cta.featured:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        /* FAQ Section */
        .runway-faq-section {
          padding: 8rem 3rem;
          background: #0a0a0a;
        }

        .light-mode .runway-faq-section {
          background: #f9f9f9;
        }

        .runway-faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .runway-faq-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .light-mode .runway-faq-item {
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }

        .runway-faq-question {
          width: 100%;
          background: none;
          border: none;
          color: inherit;
          text-align: left;
          padding: 1.5rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-family: inherit;
          transition: color 0.2s ease;
        }

        .runway-faq-question:hover {
          color: #2DD4BF;
        }

        .runway-faq-icon {
          font-size: 1.5rem;
          font-weight: 300;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.4);
        }

        .runway-faq-icon.open {
          transform: rotate(45deg);
        }

        .light-mode .runway-faq-icon {
          color: rgba(0, 0, 0, 0.4);
        }

        .runway-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .runway-faq-answer.open {
          max-height: 300px;
        }

        .runway-faq-answer p {
          padding-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
        }

        .light-mode .runway-faq-answer p {
          color: rgba(0, 0, 0, 0.6);
        }

        /* CTA Section */
        .runway-cta-section {
          padding: 10rem 3rem;
          background: #000;
          text-align: center;
        }

        .light-mode .runway-cta-section {
          background: #fff;
        }

        .runway-cta-section h2 {
          font-size: 4rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .runway-cta-section p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .light-mode .runway-cta-section p {
          color: rgba(0, 0, 0, 0.6);
        }

        /* FAB */
        .runway-fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .runway-fab-container.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .runway-fab-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fff;
          color: #000;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-fab-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .light-mode .runway-fab-button {
          background: #000;
          color: #fff;
        }

        /* Toast */
        .runway-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
        }

        .runway-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .light-mode .runway-toast {
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
        }

        /* Footer */
        .runway-footer {
          padding: 4rem 3rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
        }

        .light-mode .runway-footer {
          background: #fff;
          border-top-color: rgba(0, 0, 0, 0.08);
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
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .light-mode .runway-footer-section h4 {
          color: rgba(0, 0, 0, 0.9);
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
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .runway-footer-section a:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .light-mode .runway-footer-section a {
          color: rgba(0, 0, 0, 0.5);
        }

        .light-mode .runway-footer-section a:hover {
          color: rgba(0, 0, 0, 0.8);
        }

        .runway-footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
        }

        .light-mode .runway-footer-bottom {
          border-top-color: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.4);
        }

        .runway-footer-bottom a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .runway-footer-bottom a:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .light-mode .runway-footer-bottom a {
          color: rgba(0, 0, 0, 0.4);
        }

        .light-mode .runway-footer-bottom a:hover {
          color: rgba(0, 0, 0, 0.6);
        }

        /* Scroll Progress */
        .runway-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.6));
          z-index: 9999;
          transition: width 0.1s ease;
        }

        .light-mode .runway-scroll-progress {
          background: linear-gradient(90deg, #000, rgba(0, 0, 0, 0.6));
        }

        /* Responsive */
        @media (max-width: 768px) {
          .runway-hero {
            margin: 0;
            margin-top: 80px;
            min-height: 100vh;
            border-radius: 0;
          }

          .runway-hero h1 {
            font-size: 2.5rem;
          }

          .runway-hero p {
            font-size: 1.1rem;
          }

          .runway-nav {
            padding: 1rem 1.5rem;
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

          .runway-section-title {
            font-size: 2rem;
          }

          .runway-cta-section h2 {
            font-size: 2rem;
          }

          .runway-cta-section p {
            font-size: 1rem;
          }

          .runway-content-section,
          .runway-how-section,
          .runway-gallery-section,
          .runway-testimonials-section,
          .runway-pricing-section,
          .runway-faq-section {
            padding: 5rem 1.5rem;
          }

          .runway-cta-section {
            padding: 6rem 2rem;
          }

          .runway-footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .runway-fab-container {
            bottom: 1rem;
            right: 1rem;
          }

          .runway-fab-button {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className={`lumora-runway ${isLightMode ? 'light-mode' : ''}`}>
        {/* Scroll Progress */}
        <div className="runway-scroll-progress" style={{ width: `${scrollProgress}%` }} />

        {/* ====== 1. NAVIGATION ====== */}
        <nav className={`runway-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="logo">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
              <rect x="2" y="4" width="3" height="24" rx="1.5" fill="#2DD4BF"/>
              <rect x="7" y="10" width="3" height="18" rx="1.5" fill="#2DD4BF" opacity="0.8"/>
              <rect x="12" y="14" width="3" height="14" rx="1.5" fill="#2DD4BF" opacity="0.6"/>
              <rect x="17" y="18" width="3" height="10" rx="1.5" fill="#2DD4BF" opacity="0.4"/>
              <text x="36" y="21" fontFamily="'SF Pro Display', system-ui, sans-serif" fontSize="18" fontWeight="600" fill={isLightMode ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.92)'} letterSpacing="-0.02em">Lumora</text>
            </svg>
          </div>
          <div className="runway-nav-links">
            <a href="#features">Features</a>
            <a href="#gallery">Gallery</a>
            <a href="#pricing">Pricing</a>
            <button className="runway-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2">
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
              <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2">
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
            <h1>Master AI Tools to<br/>Create, Design & Market<br/>Your Products</h1>
            <p>The all-in-one platform for creators to master AI video, design, writing, and marketing—no technical experience needed.</p>
            <div className="runway-hero-buttons">
              <button className="runway-btn runway-btn-primary">Get Started Free</button>
              <button className="runway-btn runway-btn-secondary">Watch Demo →</button>
            </div>
          </div>
        </section>

        {/* ====== 3. FEATURES (4 cards) ====== */}
        <section className="runway-content-section" id="features">
          <h2 className="runway-section-title">Powerful AI Tools for<br/>Modern Creators</h2>
          <p className="runway-section-subtitle">Everything you need to create, design, write, and automate—all powered by cutting-edge AI.</p>

          <div className="runway-features-grid">
            {FEATURES.map((f) => (
              <FeatureCard
                key={f.title}
                image={f.image}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </section>

        {/* ====== 4. HOW IT WORKS (3 steps) ====== */}
        <section className="runway-how-section">
          <h2 className="runway-section-title">How It Works</h2>
          <p className="runway-section-subtitle">From idea to published content in three simple steps.</p>

          <div className="runway-how-grid">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="runway-how-card">
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
        <section className="runway-gallery-section" id="gallery">
          <h2 className="runway-section-title">Creator Showcase</h2>
          <p className="runway-section-subtitle">See what creators are building with Lumora's AI-powered tools.</p>

          <div className="runway-gallery-grid">
            {GALLERY.map((item) => (
              <div key={item.title} className="runway-gallery-card">
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
        <section className="runway-testimonials-section">
          <h2 className="runway-section-title">Loved by Creators</h2>
          <p className="runway-section-subtitle">Join thousands of creators already transforming their workflow with Lumora.</p>

          <div className="runway-testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="runway-testimonial-card">
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
        <section className="runway-pricing-section" id="pricing">
          <h2 className="runway-section-title">Simple, Transparent Pricing</h2>
          <p className="runway-section-subtitle">Start free. Upgrade when you're ready to scale.</p>

          <div className="runway-pricing-grid">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`runway-pricing-card ${plan.featured ? 'featured' : ''}`}>
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
                    <li key={feature} style={{ position: 'relative' }}>{feature}</li>
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
        <section className="runway-faq-section">
          <h2 className="runway-section-title">Frequently Asked Questions</h2>
          <p className="runway-section-subtitle">Everything you need to know about Lumora.</p>

          <div className="runway-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="runway-faq-item">
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
          <h2>Ready to bring your<br/>ideas to life?</h2>
          <p>Join thousands of creators already using Lumora to push the boundaries of creative expression.</p>
          <div className="runway-hero-buttons">
            <button className="runway-btn runway-btn-primary">Start Creating Free</button>
            <button className="runway-btn runway-btn-secondary">Watch Demo →</button>
          </div>
        </section>

        {/* FAB */}
        <div className={`runway-fab-container ${showFab ? 'visible' : ''}`}>
          <button className="runway-fab-button" onClick={scrollToTop} aria-label="Scroll to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

// Feature Card Component with 3D tilt effect
function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.15s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className="runway-feature-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="runway-feature-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="runway-feature-overlay">
          <h3>{title}</h3>
        </div>
        <div className="runway-feature-learn-more">Learn more →</div>
      </div>
      <div className="runway-feature-info">
        <p>{description}</p>
      </div>
    </div>
  );
}
