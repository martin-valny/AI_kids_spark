import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { lumoraAqua } from '@/constants/landingColors';

/**
 * Lumora Aqua - Precision Tech Aesthetic
 *
 * Dark grid background with animated aqua light beams
 * Glass morphism cards, breathing animations, parallax effects
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

// Glass card with working hover glow effect
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-[14px] overflow-hidden ${className}`}
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

// Section header component
function SectionHeader({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
        style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
      >
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: lumoraAqua.text }}>
        {title}
      </h2>
      <p className="text-lg max-w-xl mx-auto" style={{ color: lumoraAqua.textSecondary }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

// Animated metric counter
function Metric({ value, label }: { value: string; label: string }) {
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
        className="text-3xl md:text-4xl font-extrabold mb-1"
        style={{ color: lumoraAqua.aqua }}
      >
        {displayValue}
      </div>
      <div className="text-sm font-medium" style={{ color: lumoraAqua.textSecondary }}>
        {label}
      </div>
    </div>
  );
}

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

export default function LumoraAqua() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: lumoraAqua.bg, color: lumoraAqua.text }}
    >
      <AquaBackground />

      {/* ====== NAVIGATION ====== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300"
        style={{
          padding: isScrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          background: isScrolled ? 'rgba(5, 8, 7, 0.85)' : 'rgba(5, 8, 7, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${lumoraAqua.cardBorder}`,
        }}
      >
        <div className="text-xl font-bold tracking-tight" style={{ color: lumoraAqua.aqua }}>
          Lumora
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden md:block text-sm font-medium transition-colors hover:opacity-100" style={{ color: lumoraAqua.textSecondary }}>Features</a>
          <a href="#gallery" className="hidden md:block text-sm font-medium transition-colors hover:opacity-100" style={{ color: lumoraAqua.textSecondary }}>Gallery</a>
          <a href="#pricing" className="hidden md:block text-sm font-medium transition-colors hover:opacity-100" style={{ color: lumoraAqua.textSecondary }}>Pricing</a>
          <button
            className="px-5 py-2.5 rounded-lg font-bold text-sm"
            style={{ background: lumoraAqua.aqua, color: lumoraAqua.bg }}
          >
            Start Creating
          </button>
        </div>
      </nav>

      {/* ====== HERO SECTION WITH VIDEO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(5,8,7,0.4), rgba(5,8,7,0.6))' }} />

        <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua, border: `1px solid ${lumoraAqua.cardBorder}` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create professional content in under 30 seconds
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6"
            style={{ color: lumoraAqua.text }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Master AI Tools to{' '}
            <span style={{ color: lumoraAqua.aqua }}>Create, Design & Market</span>{' '}
            Your Products
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: lumoraAqua.textSecondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The all-in-one platform for solo creators. Learn AI video generation, writing automation,
            design tools, and marketing workflows—no tech experience needed.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2"
              style={{ background: lumoraAqua.aqua, color: lumoraAqua.bg }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg font-bold text-base"
              style={{ background: 'transparent', color: lumoraAqua.aqua, border: `2px solid ${lumoraAqua.aqua}` }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4 mt-10 p-6 rounded-xl"
            style={{ background: lumoraAqua.cardBg, border: `1px solid ${lumoraAqua.cardBorder}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs font-medium uppercase tracking-wider mr-2" style={{ color: lumoraAqua.textMuted }}>
              Trusted by creators at
            </span>
            {['Brand Logo 1', 'Brand Logo 2', 'Brand Logo 3', 'Brand Logo 4'].map((logo, i) => (
              <div
                key={i}
                className="w-[120px] h-9 rounded flex items-center justify-center text-xs"
                style={{ background: lumoraAqua.cardBg, border: `1px solid ${lumoraAqua.cardBorder}`, color: lumoraAqua.textMuted }}
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8" id="features">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Powerful Features"
            title="Everything you need to create"
            subtitle="Professional-grade AI tools designed for creators, marketers, and visionaries"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <GlassCard key={feature.title}>
                <div className="aspect-[16/11] overflow-hidden rounded-t-[14px]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2" style={{ color: lumoraAqua.text }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: lumoraAqua.textSecondary }}>
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            label="Simple Process"
            title="From idea to launch in 3 steps"
            subtitle="No technical skills required—just follow the system"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.step * 0.15 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua, border: `2px solid ${lumoraAqua.aquaMuted}` }}
                >
                  {step.step}
                </div>
                <div className="aspect-video rounded-xl overflow-hidden mb-4" style={{ border: `1px solid ${lumoraAqua.cardBorder}` }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: lumoraAqua.text }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GALLERY SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8" id="gallery">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Inspiration"
            title="Created with Lumora"
            subtitle="Explore what's possible when imagination meets AI"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY.map((item) => (
              <motion.div
                key={item.title}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                style={{ border: `1px solid ${lumoraAqua.cardBorder}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
                >
                  <h4 className="text-base font-bold" style={{ color: lumoraAqua.text }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: lumoraAqua.textSecondary }}>{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Testimonials"
            title="Loved by creators worldwide"
            subtitle="Join thousands of creators transforming their workflow"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <GlassCard key={t.name} className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: lumoraAqua.textSecondary }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: lumoraAqua.text }}>{t.name}</h4>
                    <p className="text-xs" style={{ color: lumoraAqua.textMuted }}>{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRICING SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8" id="pricing">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            label="Pricing"
            title="Choose your plan"
            subtitle="Start free, upgrade as you grow"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan) => (
              <motion.div
                key={plan.name}
                className="relative rounded-2xl p-7"
                style={{
                  background: plan.featured ? lumoraAqua.aquaSubtle : lumoraAqua.cardBg,
                  border: `1px solid ${plan.featured ? lumoraAqua.aquaMuted : lumoraAqua.cardBorder}`,
                  boxShadow: lumoraAqua.cardShadow,
                  transform: plan.featured ? 'scale(1.02)' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {plan.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: lumoraAqua.aqua, color: lumoraAqua.bg }}
                  >
                    Most Popular
                  </div>
                )}

                <span
                  className="inline-block px-3 py-1 rounded text-xs font-medium mb-3"
                  style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}
                >
                  {plan.badge}
                </span>

                <h3 className="text-2xl font-bold mb-1" style={{ color: lumoraAqua.text }}>{plan.name}</h3>
                <p className="text-sm mb-5" style={{ color: lumoraAqua.textSecondary }}>{plan.description}</p>

                <div className="mb-5">
                  <span className="text-4xl font-bold" style={{ color: lumoraAqua.text }}>{plan.price}</span>
                  {plan.period && <span className="text-lg" style={{ color: lumoraAqua.textSecondary }}>{plan.period}</span>}
                  {plan.savings && (
                    <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold" style={{ background: lumoraAqua.aquaSubtle, color: lumoraAqua.aqua }}>
                      {plan.savings}
                    </span>
                  )}
                </div>

                <ul className="space-y-0 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 py-3"
                      style={{ borderBottom: `1px solid ${lumoraAqua.cardBorder}`, color: lumoraAqua.textSecondary }}
                    >
                      <Check className="w-5 h-5 flex-shrink-0" style={{ color: lumoraAqua.aqua }} />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-lg font-bold text-sm transition-all"
                  style={{
                    background: plan.featured ? lumoraAqua.aqua : 'transparent',
                    color: plan.featured ? lumoraAqua.bg : lumoraAqua.text,
                    border: plan.featured ? 'none' : `1px solid ${lumoraAqua.cardBorder}`,
                  }}
                >
                  {plan.cta}
                </button>

                {plan.featured && (
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: lumoraAqua.cardBg, border: `1px solid ${lumoraAqua.cardBorder}`, color: lumoraAqua.textSecondary }}>
                      <Check className="w-3.5 h-3.5" style={{ color: lumoraAqua.aqua }} />
                      Cancel anytime
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: lumoraAqua.cardBg, border: `1px solid ${lumoraAqua.cardBorder}`, color: lumoraAqua.textSecondary }}>
                      <Check className="w-3.5 h-3.5" style={{ color: lumoraAqua.aqua }} />
                      No credit card
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FAQ SECTION ====== */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <SectionHeader
            label="Questions"
            title="Everything you need to know"
            subtitle="Can't find what you're looking for? Chat with our team"
          />

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <motion.div
                key={faq.q}
                className="p-6 rounded-xl"
                style={{
                  background: lumoraAqua.cardBg,
                  border: `1px solid ${lumoraAqua.cardBorder}`,
                }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-bold mb-2" style={{ color: lumoraAqua.text }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: lumoraAqua.textSecondary }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA SECTION ====== */}
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
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: lumoraAqua.text }}>
            Ready to bring your ideas to life?
          </h2>
          <p className="text-lg mb-8" style={{ color: lumoraAqua.textSecondary }}>
            Join thousands of creators already using Lumora to push the boundaries of creative expression
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-10 py-5 rounded-lg font-bold text-lg flex items-center justify-center gap-3"
              style={{ background: lumoraAqua.aqua, color: lumoraAqua.bg }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Creating Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-10 py-5 rounded-lg font-bold text-lg"
              style={{ background: 'transparent', color: lumoraAqua.aqua, border: `2px solid ${lumoraAqua.aqua}` }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer
        className="relative z-10 py-12 px-6 md:px-8"
        style={{ borderTop: `1px solid ${lumoraAqua.cardBorder}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold mb-4" style={{ color: lumoraAqua.text }}>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: lumoraAqua.textMuted, textDecoration: 'none' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
            style={{ borderTop: `1px solid ${lumoraAqua.cardBorder}` }}
          >
            <p className="text-sm" style={{ color: lumoraAqua.textMuted }}>
              &copy; 2026 Lumora AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: lumoraAqua.textMuted, textDecoration: 'none' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
