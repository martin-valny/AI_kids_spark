import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Lumora Runway — Warm Sophistication Landing Page
 *
 * Amber accent (#f59e0b), Newsreader serif body, Space Grotesk headlines.
 * Warm stone palette. Minimal animations. Generous whitespace.
 * Dark mode via Tailwind `dark:` class + cookie persistence.
 *
 * SECTIONS:
 * 1. Navigation
 * 2. Hero (light gradient, single CTA, trust signal)
 * 3. Stats (static monospace numbers)
 * 4. Student Portfolio
 * 5. Features (2x2 emoji cards)
 * 6. How It Works (3 steps)
 * 7. Use Cases Gallery
 * 8. Testimonials
 * 9. Pricing (single Pro card focus)
 * 10. FAQ (accordion)
 * 11. Final CTA
 * 12. Footer (newsletter + links)
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
    emoji: '\uD83D\uDCF9',
  },
  {
    title: 'AI Automation That Pays $60-180/hr',
    description: 'Build workflows that do the boring stuff for you. Make.com, Zapier, n8n \u2014 set up once, earn on repeat. Clients pay $60\u2013180/hr for this.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    lessons: 8,
    hours: 12,
    category: 'purple' as const,
    emoji: '\uD83E\uDD16',
  },
  {
    title: 'AI Content Writing for Social & Newsletters',
    description: 'Write viral captions, threads, and newsletters with ChatGPT and Claude. Learn the prompt techniques that make AI sound like you, not a robot.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    lessons: 10,
    hours: 18,
    category: 'blue' as const,
    emoji: '\u270D\uFE0F',
  },
  {
    title: 'AI Music Production (No Instruments Needed)',
    description: 'Make original tracks, intros, and background music with Suno and Udio. No instruments needed \u2014 just ideas. Build a royalty-free library you actually own.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    lessons: 7,
    hours: 10,
    category: 'emerald' as const,
    emoji: '\uD83C\uDFB5',
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
  { value: '12,347', label: 'Students Enrolled' },
  { value: '$847K+', label: 'Earned by Students' },
  { value: '4.9\u2605', label: 'Average Rating' },
  { value: '87%', label: 'First Client in 30 Days' },
];

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
    cta: 'Start Free Trial',
    featured: true,
    accent: 'amber' as const,
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
  {
    name: 'Priya S.', age: 18, location: 'San Jose, CA',
    projectType: 'AI Video Edit',
    preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: 'My first Reel hit 28K views in a week. I never thought I could edit video.',
    portfolioLink: '#',
  },
  {
    name: 'Marcus T.', age: 17, location: 'Atlanta, GA',
    projectType: 'Automation',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    quote: 'Three clients, $2,400 a month. All from automations I built in the second module.',
    portfolioLink: '#',
  },
  {
    name: 'Lily C.', age: 19, location: 'Portland, OR',
    projectType: 'AI Music',
    preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    quote: '50 tracks on Gumroad, all made with Suno. I don\'t play a single instrument.',
    portfolioLink: '#',
  },
];

// ============================================================
// HELPERS
// ============================================================

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={`flex-shrink-0 ${className}`}>
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  return (
    <div className={isLightMode ? '' : 'dark'}>
      <div className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 min-h-screen font-sans transition-colors duration-500 overflow-x-hidden">

        {/* ====== 1. NAVIGATION ====== */}
        <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'py-3 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-sm border-b border-stone-200/50 dark:border-stone-700/50' : 'py-5 bg-transparent'}`}>
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <a href="#" className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
                <rect x="2" y="4" width="3" height="24" rx="1.5" fill="currentColor"/>
                <rect x="7" y="10" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.65"/>
                <rect x="12" y="14" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.4"/>
                <rect x="17" y="18" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.2"/>
                <text x="36" y="21" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.02em">Lumora</text>
              </svg>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Modules</a>
              <a href="#student-work" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Student Work</a>
              <a href="#pricing" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Pricing</a>
              <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:border-amber-500 transition-colors" aria-label="Toggle theme">
                {isLightMode ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
              <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-2xl transition-colors hover:-translate-y-0.5 hover:shadow-lg">
                Start Free
              </button>
            </div>
            <button className="md:hidden w-10 h-10 flex items-center justify-center border border-stone-200 dark:border-stone-700 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
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
              className="fixed inset-0 z-40 bg-stone-50 dark:bg-stone-900 pt-24 px-6"
            >
              <div className="flex flex-col gap-2">
                {[{ label: 'Modules', href: '#features' }, { label: 'Student Work', href: '#student-work' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold py-4 border-b border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 hover:text-amber-500 transition-colors">
                    {item.label}
                  </a>
                ))}
                <button className="mt-6 w-full py-4 bg-amber-500 text-white font-semibold rounded-2xl text-lg" onClick={() => setMobileMenuOpen(false)}>Start Free</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====== 2. HERO ====== */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 via-stone-50 to-amber-50/30 dark:from-stone-900 dark:via-stone-900 dark:to-stone-800"
          style={{ backgroundImage: NOISE_SVG }}
        >
          <div className="relative z-10 text-center px-4 max-w-screen-xl mx-auto pt-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[48px] sm:text-[72px] lg:text-[96px] font-bold leading-[1.05] mb-8" style={{ letterSpacing: '-0.02em' }}>
                <span className="block text-stone-900 dark:text-stone-100">Learn AI.</span>
                <span className="block text-stone-900 dark:text-stone-100">Ship Real Work.</span>
                <span className="block text-amber-500">Open New Opportunities.</span>
              </h1>

              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-stone-500 dark:text-stone-400 max-w-[650px] mx-auto leading-[1.6] mb-12">
                45 hands-on lessons across video, automation, writing, and music. Go from zero AI skills to a portfolio that opens doors.
              </p>

              <button className="px-10 h-14 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto">
                Start Your First Lesson &rarr;
              </button>

              <div className="mt-10 flex items-center justify-center gap-3">
                <div className="flex -space-x-3">
                  {TESTIMONIALS.map((t) => (
                    <img key={t.name} src={t.photo} alt="" className="w-10 h-10 rounded-full border-2 border-stone-50 dark:border-stone-900 object-cover" />
                  ))}
                </div>
                <span className="font-mono text-sm text-stone-400">12,347 students enrolled</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====== 3. STATS ====== */}
        <section
          className="py-16 md:py-32 px-4 md:px-8 bg-stone-100 dark:bg-stone-800 transition-colors"
          style={{ backgroundImage: NOISE_SVG }}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {SOCIAL_PROOF_METRICS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-3">
                  <div className="font-mono text-4xl sm:text-5xl lg:text-[56px] font-bold text-stone-900 dark:text-stone-100">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.05em] text-stone-500 dark:text-stone-400 font-medium text-center">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 4. STUDENT PORTFOLIO ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-50 dark:bg-stone-900 transition-colors" id="student-work">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              Built by students like you
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16 max-w-lg mx-auto leading-[1.6]">
              Real projects from teenagers who went from zero skills to getting paid.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STUDENT_PORTFOLIO.map((student) => (
                <div key={student.name} className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={student.preview} alt={`${student.name}'s project`} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={student.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100">{student.name}</h3>
                        <span className="text-sm text-stone-400">Age {student.age} &middot; {student.location}</span>
                      </div>
                    </div>
                    <p className="font-serif text-stone-600 dark:text-stone-300 leading-[1.6] mb-4">&ldquo;{student.quote}&rdquo;</p>
                    <a href={student.portfolioLink} className="text-sm text-stone-400 hover:text-amber-500 transition-colors">
                      View portfolio &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 5. FEATURES (2x2 emoji cards) ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-100 dark:bg-stone-800 transition-colors" id="features">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              Four Skills. Endless Possibilities.
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16 max-w-xl mx-auto leading-[1.6]">
              Each module teaches you a high-income creative skill with real AI tools. 45 lessons. 60+ hours. All hands-on.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white dark:bg-stone-800/80 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-[64px] leading-none mb-6">{f.emoji}</div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-stone-900 dark:text-stone-100 mb-3 leading-tight">{f.title}</h3>
                  <div className="font-mono text-sm text-amber-500 mb-4">{f.lessons} LESSONS &middot; {f.hours} HOURS</div>
                  <p className="font-serif text-lg sm:text-xl text-stone-500 dark:text-stone-400 leading-[1.6]">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 6. HOW IT WORKS ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-50 dark:bg-stone-900 transition-colors">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              How It Works
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16">No fluff. No filler. Just build stuff and get good.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                  </div>
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-2 text-stone-900 dark:text-stone-100">{item.title}</h3>
                    <p className="font-serif text-stone-500 dark:text-stone-400 leading-[1.6]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 7. USE CASES GALLERY ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-100 dark:bg-stone-800 transition-colors" id="use-cases">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              What You'll Actually Make
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16">Not theory. Not slides. Real stuff you can post, sell, or put in your portfolio.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {USE_CASES.map((item) => (
                <div key={item.title} className="bg-white dark:bg-stone-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-lg text-stone-900 dark:text-stone-100 mb-1">{item.title}</h3>
                    <p className="font-serif text-stone-500 dark:text-stone-400 leading-[1.6] text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 8. TESTIMONIALS ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-amber-50 dark:bg-stone-800/50 transition-colors">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              Don't Take Our Word for It
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16">12,347 students are already building with AI. Here's what they say.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {TESTIMONIALS.map((t) => (
                <div key={t.name}>
                  <p className="font-serif text-xl text-stone-700 dark:text-stone-300 leading-[1.6] mb-8">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={t.photo} alt={t.name} className="w-20 h-20 rounded-full object-cover border-[3px] border-amber-500" />
                    <div>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{t.name}</span>
                      <span className="ml-2 font-mono text-sm text-stone-400">{t.age}</span>
                      <div className="text-sm text-stone-500 dark:text-stone-400">{t.role}</div>
                      <div className="text-xs text-stone-400">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 9. PRICING ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-50 dark:bg-stone-900 transition-colors" id="pricing">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="font-serif text-xl text-stone-500 dark:text-stone-400 mb-16">Start free. Go Pro for less than a coffee. Cancel anytime.</p>

            {/* Pro Card — centered */}
            <div className="max-w-md mx-auto bg-white dark:bg-stone-800 rounded-3xl p-8 md:p-12 shadow-sm mb-12 text-left">
              <div className="inline-block px-4 py-1.5 bg-amber-500 text-white text-xs font-bold uppercase tracking-[0.05em] rounded-full mb-6">
                Most students choose this
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">{PRICING[1].name}</h3>
              <p className="font-serif text-stone-500 dark:text-stone-400 mb-6">{PRICING[1].description}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[56px] sm:text-[72px] font-bold text-stone-900 dark:text-stone-100">{PRICING[1].price}</span>
                <span className="text-stone-400 text-lg">{PRICING[1].period}</span>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-8">{PRICING[1].savings}</p>
              <ul className="space-y-3 mb-8">
                {PRICING[1].features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-serif text-stone-600 dark:text-stone-300">
                    <span className="text-amber-500"><CheckIcon /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-lg">
                Start Free Trial
              </button>
              <p className="text-center text-xs text-stone-400 mt-4">7 days free, then $9.99/month. Cancel anytime.</p>
            </div>

            {/* Free & School as smaller text */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-sm text-stone-500 dark:text-stone-400">
              <p><strong className="text-stone-700 dark:text-stone-300">Free:</strong> {PRICING[0].description} <a href="#" className="text-amber-500 hover:underline">Try it &rarr;</a></p>
              <p><strong className="text-stone-700 dark:text-stone-300">Schools & Teams:</strong> Unlimited seats from $999/year. <a href="#" className="text-amber-500 hover:underline">Contact us &rarr;</a></p>
            </div>
          </div>
        </section>

        {/* ====== 10. FAQ ====== */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-stone-50 dark:bg-stone-900 transition-colors" id="faq">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-center mb-4 text-stone-900 dark:text-stone-100" style={{ letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-center font-serif text-xl text-stone-500 dark:text-stone-400 mb-16">Everything you need to know about Lumora.</p>

            <div className="space-y-0">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-stone-200 dark:border-stone-700">
                  <button
                    className="w-full text-left py-6 flex justify-between items-center gap-4 group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">{faq.q}</span>
                    <span className={`text-stone-400 text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
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
                        <p className="pb-6 font-serif text-base text-stone-500 dark:text-stone-400 leading-[1.6]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 11. FINAL CTA ====== */}
        <section
          className="py-16 md:py-32 px-4 md:px-8 bg-stone-900 dark:bg-stone-950 text-center transition-colors"
          style={{ backgroundImage: NOISE_SVG }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold leading-tight mb-6 text-white" style={{ letterSpacing: '-0.02em' }}>
              Stop scrolling tutorials.<br />Start building skills.
            </h2>
            <p className="font-serif text-lg sm:text-xl text-stone-400 mb-3 max-w-xl mx-auto leading-[1.6]">
              Video. Automation. Writing. Music. Four modules, 45 lessons, and a clear path from &ldquo;I have no idea what I&rsquo;m doing&rdquo; to getting paid.
            </p>
            <p className="text-sm text-stone-500 mb-10">Free to start. $9.99/mo to unlock everything. Cancel anytime.</p>
            <button className="px-10 h-14 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto">
              Start Your First Lesson &rarr;
            </button>
          </div>
        </section>

        {/* ====== 12. FOOTER ====== */}
        <footer className="bg-stone-50 dark:bg-stone-900 transition-colors">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-16 pb-8">
            {/* Newsletter */}
            <div className="mb-16 p-8 md:p-10 rounded-3xl bg-amber-50 dark:bg-stone-800">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Get lesson updates + AI creator tips</h3>
              <p className="font-serif text-stone-500 dark:text-stone-400 mb-6">Weekly insights on AI tools, student success stories, and new lesson releases.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Footer links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {FOOTER_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-stone-200 dark:border-stone-700 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-400 text-sm">&copy; 2026 Lumora AI. All rights reserved.</p>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/5 transition-all text-sm"
                    aria-label={social}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium rounded-xl shadow-lg z-[10000]"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
