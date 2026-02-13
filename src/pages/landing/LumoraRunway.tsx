import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion';

/**
 * Lumora Runway — Premium Landing Page
 *
 * Teal accent system, Framer Motion animations, Tailwind CSS.
 * Dark mode via Tailwind `dark:` class + cookie persistence.
 *
 * SECTIONS:
 * 1. Navigation
 * 2. Hero with animated gradient + floating orbs
 * 3. Social Proof (count-up stats + "Say Goodbye To" strikethrough)
 * 4. Student Portfolio Showcase
 * 5. Features (4 module cards with 3D tilt)
 * 6. How It Works (3 steps)
 * 7. Use Cases Gallery (6 cards)
 * 8. Testimonials (3 cards)
 * 9. Pricing (3 tiers)
 * 10. FAQ (6 items)
 * 11. Final CTA
 * 12. Footer (newsletter + 4-column links)
 */

// ============================================================
// UNIFIED CONTENT
// ============================================================

const FEATURES = [
  {
    title: 'AI Video Editing for TikTok & Reels',
    description: 'Create short-form videos that blow up on TikTok, Reels, and YouTube Shorts. Learn Runway, Pika, and Kling \u2014 from your first cut to a full portfolio.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
    lessons: 12,
    hours: 15,
    category: 'orange' as const,
  },
  {
    title: 'AI Automation That Pays $60-180/hr',
    description: 'Build workflows that do the boring stuff for you. Make.com, Zapier, n8n \u2014 set up once, earn on repeat. Clients pay $60\u2013180/hr for this.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    lessons: 8,
    hours: 12,
    category: 'purple' as const,
  },
  {
    title: 'AI Content Writing for Social & Newsletters',
    description: 'Write viral captions, threads, and newsletters with ChatGPT and Claude. Learn the prompt techniques that make AI sound like you, not a robot.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    lessons: 10,
    hours: 18,
    category: 'blue' as const,
  },
  {
    title: 'AI Music Production (No Instruments Needed)',
    description: 'Make original tracks, intros, and background music with Suno and Udio. No instruments needed \u2014 just ideas. Build a royalty-free library you actually own.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    lessons: 7,
    hours: 10,
    category: 'emerald' as const,
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
  { value: '12,347', label: 'Students Enrolled', numericValue: 12347, prefix: '', suffix: '' },
  { value: '$847K+', label: 'Earned by Students', numericValue: 847, prefix: '$', suffix: 'K+' },
  { value: '4.9\u2605', label: 'Average Rating', numericValue: 4.9, prefix: '', suffix: '\u2605', decimals: 1 },
  { value: '87%', label: 'Get First Client in 30 Days', numericValue: 87, prefix: '', suffix: '%' },
];

const REPLACES = ['Overpriced Bootcamps', 'YouTube Rabbit Holes', 'Random Free Tutorials', 'Trial & Error', 'Outdated Courses'];

const USE_CASES = [
  { title: 'TikTok / Reels Video', description: 'Shoot nothing. Film nothing. AI-edit a viral short in under an hour.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop', icon: '\u25B6' },
  { title: 'Automated Side Hustle', description: 'Build a workflow that captures leads and sends emails while you sleep.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop', icon: '\u2699' },
  { title: 'Viral Twitter Thread', description: 'Write a week of content in one sitting with AI prompt chains.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=450&fit=crop', icon: '\u270E' },
  { title: 'Original Music Track', description: 'Create a full track with Suno \u2014 use it in your videos, sell it, or just vibe.', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=450&fit=crop', icon: '\u266B' },
  { title: 'Freelance Portfolio', description: 'Walk out of each module with proof of work clients actually want to see.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=450&fit=crop', icon: '\u2606' },
  { title: 'Newsletter That Grows', description: 'AI-written emails that sound like you. Build an audience on autopilot.', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=450&fit=crop', icon: '\u2709' },
];

const TESTIMONIALS = [
  {
    name: 'Alex K.',
    age: 17,
    location: 'Chicago, IL',
    role: 'High School Senior',
    quote: 'I built a Make.com automation for a local real estate agent in my second week. He pays me $150/month to maintain it. The freelance pricing guide at the end of the automation module is what gave me the confidence to charge.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Maya R.',
    age: 19,
    location: 'Miami, FL',
    role: 'Community College Student',
    quote: 'I was spending 4 hours on one TikTok edit. After the video module I batch a whole week of content in an afternoon. My account went from 200 to 14K followers in two months using the techniques from Lesson 6.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Jordan L.',
    age: 16,
    location: 'Austin, TX',
    role: 'Content Creator',
    quote: "I made a 30-track royalty-free music library with Suno in two weeks. Now I license tracks to other creators on Gumroad. I've made $400 so far and I don't even play an instrument.",
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
  },
];

const PRICING = [
  {
    badge: 'Try it out',
    name: 'Free',
    description: "Try before you commit. See if Lumora's right for you.",
    price: '$0',
    period: '',
    features: ['2 foundation lessons', 'Preview lessons from each module', 'Community access', 'Basic prompt templates'],
    cta: 'Start Free',
    featured: false,
    accent: 'gray' as const,
  },
  {
    badge: 'Most popular',
    name: 'Pro',
    description: 'Everything you need to build your portfolio and get paid.',
    studentBadge: 'Most Popular with Students',
    price: '$9.99',
    period: '/month',
    savings: 'Save 17% yearly \u2014 $99/year',
    features: ['All 4 modules (45 lessons)', '60+ hours of hands-on content', 'Downloadable prompts & templates', 'Private community + feedback', 'Certificate of completion', 'New lessons as tools evolve'],
    cta: 'Go Pro',
    featured: true,
    accent: 'teal' as const,
  },
  {
    badge: 'For schools & teams',
    name: 'School & Teams',
    description: 'Unlimited students. One price. Built for schools and teams.',
    price: '$999',
    period: '/year',
    features: ['Everything in Pro', 'Unlimited student seats', 'Teacher dashboard & analytics', 'Custom learning paths', 'Dedicated support', 'Invoice billing'],
    cta: 'Contact Us',
    featured: false,
    accent: 'purple' as const,
  },
];

const FAQS = [
  { q: "I'm a complete beginner. Can I really do this?", a: 'Yes. Every module starts from zero. If you can type and follow instructions, you can do this. Most of our students had never touched an AI tool before signing up. Average completion rate: 78%.' },
  { q: 'Will this help with college applications?', a: "Absolutely. You'll build a real portfolio of AI projects \u2014 videos, automations, writing samples, and music. Admissions officers love seeing self-directed, technical creative work. Several students have featured their Lumora projects in applications and interviews." },
  { q: "I'm 16\u201317. Do I need parental permission?", a: "You can explore free lessons anytime. Upgrading to Pro under 18 requires parent/guardian approval \u2014 it takes about 30 seconds during signup. All content is age-appropriate and designed for high school and college students." },
  { q: 'Can I actually earn money from what I learn?', a: "That's the whole point. Every module ends with a monetization playbook \u2014 freelance pricing, where to find clients, how to package your skills. Our students have earned $847K+ total. Typical first earnings: $50\u2013200 in the first month after completing a module." },
  { q: 'How long does each module take to finish?', a: "Most students finish a module in 2\u20133 weeks at 30 minutes a day. But it's fully self-paced \u2014 binge it in a weekend or stretch it out over a month. Each lesson is designed to be completed in one sitting." },
  { q: 'What AI tools will I actually learn to use?', a: 'Runway, Pika, and Kling for video editing. Make.com, Zapier, and n8n for automation. ChatGPT and Claude for content writing. Suno and Udio for music production. 60+ tools total, and we update lessons whenever major new tools launch.' },
];

const FOOTER_SECTIONS = [
  { title: 'Platform', links: ['Modules', 'Pricing', 'Student Work', 'Changelog'] },
  { title: 'Resources', links: ['Free Lessons', 'Blog', 'Prompt Library', 'Community', 'Support'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

const STUDENT_PORTFOLIO = [
  { name: 'Priya S.', age: 18, location: 'San Jose, CA', projectType: 'AI Video Edit', projectTypeColor: 'orange', preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop', metric: '28K views on first Reel', portfolioLink: '#' },
  { name: 'Marcus T.', age: 17, location: 'Atlanta, GA', projectType: 'Automation', projectTypeColor: 'purple', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', metric: '$2,400/mo from 3 clients', portfolioLink: '#' },
  { name: 'Lily C.', age: 19, location: 'Portland, OR', projectType: 'AI Music', projectTypeColor: 'emerald', preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop', metric: '50-track library on Gumroad', portfolioLink: '#' },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={`flex-shrink-0 ${className}`}>
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsub = springValue.on('change', (v) => setDisplay(v));
    return unsub;
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}{display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
    </span>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}

function ScrollToTopFAB({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-[0_4px_16px_rgba(20,184,166,0.4)] flex items-center justify-center z-40 transition-colors"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function FeatureCard({ image, title, description, delay, lessons, hours }: { image: string; title: string; description: string; delay: number; lessons: number; hours: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 35;
    const rotateY = (rect.width / 2 - x) / 35;
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
    <SectionReveal delay={delay * 0.1}>
      <div
        ref={cardRef}
        className="group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden">
          <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">{lessons} Lessons</span>
            <span className="text-teal-500/50">&bull;</span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">{hours} Hours</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-teal-500 transition-colors duration-300">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </SectionReveal>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowFab(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
    if (themeCookie && themeCookie.split('=')[1].trim() === 'dark') {
      setIsLightMode(false);
    }
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

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1.05); }
          50% { opacity: 0.5; transform: scale(0.95); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 6s ease-in-out infinite 2s; }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
      `}</style>

      <div className={isLightMode ? '' : 'dark'}>
        <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen transition-colors duration-500 overflow-x-hidden">
          <ScrollProgress />

          {/* ====== 1. NAVIGATION ====== */}
          <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50' : 'py-5 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <a href="#" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
                  <rect x="2" y="4" width="3" height="24" rx="1.5" fill="currentColor"/>
                  <rect x="7" y="10" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.65"/>
                  <rect x="12" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.4"/>
                  <rect x="17" y="18" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.2"/>
                  <text x="36" y="21" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.02em">Lumora</text>
                </svg>
              </a>
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Modules</a>
                <a href="#use-cases" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Student Work</a>
                <a href="#pricing" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Pricing</a>
                <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-teal-500 transition-colors" aria-label="Toggle theme">
                  {isLightMode ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  )}
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  Start Free
                </motion.button>
              </div>
              <button className="md:hidden w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
                </svg>
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
                className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6"
              >
                <div className="flex flex-col gap-2">
                  {[{ label: 'Modules', href: '#features' }, { label: 'Student Work', href: '#use-cases' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map((item) => (
                    <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold py-4 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white hover:text-teal-500 transition-colors">
                      {item.label}
                    </a>
                  ))}
                  <button className="mt-6 w-full py-4 bg-teal-500 text-white font-semibold rounded-xl text-lg" onClick={() => setMobileMenuOpen(false)}>Start Free</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ====== 2. HERO ====== */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-teal-950/20 to-black" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-teal-600/8 rounded-full blur-3xl animate-pulse-slow-delayed" />
              <div className="absolute top-2/3 left-2/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-teal-500/40 bg-teal-500/5 backdrop-blur-sm shadow-[0_0_20px_rgba(20,184,166,0.15)] mb-8"
              >
                <span className="text-sm font-semibold tracking-wider text-teal-300 uppercase">The Creative AI Learning Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                <span className="block">Learn AI. Create Everything.</span>
                <span className="block">Start Getting Paid.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-300 max-w-[700px] mx-auto leading-relaxed opacity-90 mb-10"
              >
                45 hands-on lessons across video, automation, writing, and music. Go from zero AI skills to a portfolio that makes money.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_8px_24px_rgba(20,184,166,0.4)] overflow-hidden"
                >
                  <span className="relative z-10">Start First Lesson</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-teal-500 text-gray-300 hover:text-teal-400 font-semibold rounded-xl transition-all duration-200"
                >
                  See How It Works
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* ====== 3. SOCIAL PROOF STRIP ====== */}
          <section ref={statsRef} className="py-16 md:py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
                {SOCIAL_PROOF_METRICS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <AnimatedCounter value={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals || 0} />
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={statsInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent origin-center"
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider text-center font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Say Goodbye To */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">Say goodbye to:</span>
                {REPLACES.map((item, index) => (
                  <SectionReveal key={item} delay={index * 0.1}>
                    <div className="relative">
                      <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">{item}</span>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                        className="absolute top-1/2 left-2 right-2 h-0.5 bg-red-500/70 origin-left"
                      />
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 4. STUDENT PORTFOLIO SHOWCASE ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-black transition-colors">
            <div className="max-w-6xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">Built by Students Like You</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-lg mx-auto">Real projects. Real results. See what Lumora students are creating.</p>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STUDENT_PORTFOLIO.map((student, index) => (
                  <SectionReveal key={student.name} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-teal-500/50 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)]"
                    >
                      <div className="relative h-56 overflow-hidden border-b border-gray-100 dark:border-gray-800 group-hover:border-teal-500/30 transition-colors">
                        <img src={student.preview} alt={`${student.name}'s project`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-lg">
                          <span className="text-xs font-semibold text-white uppercase tracking-wide">{student.projectType}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{student.name}</h3>
                          <span className="text-sm text-gray-400 font-mono">Age {student.age}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{student.location}</p>
                        <p className="text-teal-600 dark:text-teal-400 font-semibold mb-4">{student.metric}</p>
                        <a href={student.portfolioLink} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-teal-500 transition-colors group/link">
                          View Portfolio <span className="transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                        </a>
                      </div>
                    </motion.div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 5. FEATURES (4 module cards) ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors" id="features">
            <div className="max-w-7xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">Four Skills. Endless Possibilities.</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">Each module teaches you a high-income creative skill with real AI tools. 45 lessons. 60+ hours. All hands-on.</p>
              </SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURES.map((f, i) => (
                  <FeatureCard key={f.title} image={f.image} title={f.title} description={f.description} delay={i} lessons={f.lessons} hours={f.hours} />
                ))}
              </div>
            </div>
          </section>

          {/* ====== 6. HOW IT WORKS ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-black transition-colors">
            <div className="max-w-6xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">How It Works</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12">No fluff. No filler. Just build stuff and get good.</p>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {HOW_IT_WORKS.map((item, index) => (
                  <SectionReveal key={item.step} delay={index * 0.15}>
                    <div className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-teal-500/40 transition-all duration-500 hover:shadow-xl">
                      <div className="relative overflow-hidden">
                        <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-6">
                        <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm mb-4">{item.step}</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 7. USE CASES GALLERY ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors" id="use-cases">
            <div className="max-w-7xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">What You'll Actually Make</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Not theory. Not slides. Real stuff you can post, sell, or put in your portfolio.</p>
              </SectionReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {USE_CASES.map((item, index) => (
                  <SectionReveal key={item.title} delay={index * 0.08}>
                    <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]">
                      <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500 flex flex-col justify-end p-5">
                        <div className="text-2xl mb-1 opacity-70 text-white">{item.icon}</div>
                        <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-snug max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">{item.description}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 8. TESTIMONIALS ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-black transition-colors">
            <div className="max-w-6xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">Don't Take Our Word for It</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12">12,347 students are already building with AI. Here's what they say.</p>
              </SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, index) => (
                  <SectionReveal key={t.name} delay={index * 0.1}>
                    <div className="relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-teal-500/30 hover:shadow-[0_8px_32px_rgba(20,184,166,0.08)] transition-all duration-300">
                      <span className="absolute top-4 left-6 text-8xl text-teal-500/10 font-serif leading-none select-none">&ldquo;</span>
                      <div className="relative z-10">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">{t.quote}</p>
                        <div className="flex items-center gap-4">
                          <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/40" />
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-gray-900 dark:text-white">{t.name}</span>
                              <span className="text-sm text-gray-400 font-mono">{t.age}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}</div>
                            <div className="text-xs text-gray-400">{t.location}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 9. PRICING ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors" id="pricing">
            <div className="max-w-6xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">Simple, Transparent Pricing</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-16">Start free. Go Pro for less than a coffee. Cancel anytime.</p>
              </SectionReveal>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {PRICING.map((plan, index) => {
                  const isPro = plan.featured;
                  const isSchool = plan.accent === 'purple';
                  const checkColor = isPro ? 'text-teal-400' : isSchool ? 'text-purple-500' : 'text-teal-500';
                  const borderClass = isPro
                    ? 'border-2 border-teal-500/50 lg:scale-105 lg:-my-4 z-10'
                    : isSchool
                    ? 'border border-purple-500/30 hover:border-purple-500/50'
                    : 'border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700';

                  return (
                    <SectionReveal key={plan.name} delay={index * 0.1}>
                      <motion.div
                        whileHover={{ y: isPro ? -6 : -3 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`relative rounded-2xl bg-white dark:bg-gray-900 p-8 transition-all duration-300 ${borderClass}`}
                      >
                        {/* Pro animated border glow */}
                        {isPro && (
                          <>
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 rounded-2xl opacity-30 blur-sm animate-gradient-x -z-10" />
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-teal-600 to-teal-500 rounded-full shadow-[0_4px_12px_rgba(20,184,166,0.4)]">
                              <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">Most Popular With Students</span>
                            </div>
                          </>
                        )}

                        <div className={isPro ? 'pt-4' : ''}>
                          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isSchool ? 'text-purple-400' : isPro ? 'text-teal-500' : 'text-gray-400'}`}>
                            {plan.badge}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{plan.description}</p>

                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                            {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
                          </div>
                          {'savings' in plan && plan.savings && (
                            <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-6">{plan.savings}</p>
                          )}
                          {!('savings' in plan) && <div className="mb-6" />}

                          <ul className="space-y-3 mb-8">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <span className={checkColor}><CheckIcon /></span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                              isPro
                                ? 'bg-teal-500 hover:bg-teal-600 text-white hover:shadow-[0_8px_24px_rgba(20,184,166,0.4)]'
                                : isSchool
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                          >
                            {plan.cta}
                          </motion.button>
                        </div>
                      </motion.div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ====== 10. FAQ ====== */}
          <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-black transition-colors" id="faq">
            <div className="max-w-3xl mx-auto">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">Frequently Asked Questions</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Everything you need to know about Lumora.</p>
              </SectionReveal>

              <div className="space-y-0">
                {FAQS.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className="border-b border-gray-200 dark:border-gray-800">
                      <button
                        className="w-full text-left py-5 flex justify-between items-center gap-4 group"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">{faq.q}</span>
                        <span className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
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
                            <p className="pb-5 text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ====== 11. FINAL CTA ====== */}
          <section className="py-24 md:py-32 px-4 md:px-8 bg-gray-900 dark:bg-gray-950 text-white text-center transition-colors">
            <div className="max-w-3xl mx-auto">
              <SectionReveal>
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  {SOCIAL_PROOF_METRICS.map((m) => (
                    <div key={m.label} className="text-sm text-gray-400">
                      <strong className="text-white">{m.value}</strong> {m.label}
                    </div>
                  ))}
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  Stop scrolling tutorials.<br />Start building skills.
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <p className="text-gray-400 text-lg mb-2 max-w-xl mx-auto">
                  Video. Automation. Writing. Music. Four modules, 45 lessons, and a clear path from &ldquo;I have no idea what I&rsquo;m doing&rdquo; to getting paid.
                </p>
                <p className="text-gray-500 text-sm mb-8">Free to start. $9.99/mo to unlock everything. Cancel anytime.</p>
              </SectionReveal>
              <SectionReveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_8px_24px_rgba(20,184,166,0.4)] overflow-hidden"
                  >
                    <span className="relative z-10">Start First Lesson</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.button>
                  <a href="#pricing" className="px-8 py-4 border-2 border-gray-600 hover:border-teal-500 text-gray-300 hover:text-teal-400 font-semibold rounded-xl transition-all duration-200 inline-block">
                    See Pricing
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>

          {/* ====== 12. FOOTER ====== */}
          <footer className="relative bg-white dark:bg-black transition-colors">
            <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
              {/* Newsletter */}
              <SectionReveal>
                <div className="mb-16 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get lesson updates + AI creator tips</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Weekly insights on AI tools, student success stories, and new lesson releases.</p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
                    />
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap">
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </SectionReveal>

              {/* Footer links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {FOOTER_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">&copy; 2026 Lumora AI. All rights reserved.</p>
                <div className="flex gap-3">
                  {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-500/5 transition-all text-sm"
                      aria-label={social}
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>

          {/* FAB + Toast */}
          <ScrollToTopFAB visible={showFab} />
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl shadow-lg z-[10000] backdrop-blur-xl"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
