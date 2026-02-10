import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Film, PenTool, Music, Bot, Star } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/**
 * BRUTALIST REDLINE - Landing Page Variation
 *
 * Theme: Tabloid newspaper / punk zine aesthetic
 * Colors: Newsprint cream + bold red + black ink
 * Vibe: Sensationalist headlines, cut-out collage, aggressive typography
 *
 * Design DNA:
 * - Newspaper column layouts
 * - Halftone dot patterns
 * - Stamp/stencil typography
 * - "Breaking news" urgency
 * - Torn paper edges
 * - Red as DANGER/URGENCY accent
 */

const redline = {
  paper: '#f5f0e8',
  paperDark: '#e8e0d0',
  ink: '#1a1a1a',
  red: '#e63946',
  redDark: '#c1121f',
};

// Halftone pattern overlay
function HalftoneOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(${redline.ink} 1px, transparent 1px)`,
        backgroundSize: '4px 4px',
      }}
    />
  );
}

// Torn paper edge effect
function TornEdge({ position = 'bottom' }: { position?: 'top' | 'bottom' }) {
  const rotation = position === 'top' ? 'rotate-180' : '';
  return (
    <div className={`w-full h-8 ${rotation}`} style={{ backgroundColor: redline.paper }}>
      <svg viewBox="0 0 1200 32" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0,32 L0,8 Q30,12 60,6 T120,10 T180,4 T240,12 T300,6 T360,14 T420,8 T480,16 T540,6 T600,12 T660,4 T720,14 T780,8 T840,10 T900,6 T960,14 T1020,8 T1080,12 T1140,6 T1200,10 L1200,32 Z"
          fill={redline.ink}
        />
      </svg>
    </div>
  );
}

// Stamp text effect
function StampText({ children, className = '', color = redline.red }: { children: string; className?: string; color?: string }) {
  return (
    <span
      className={`inline-block px-3 py-1 font-black uppercase tracking-wider transform -rotate-2 ${className}`}
      style={{
        backgroundColor: color,
        color: redline.paper,
        boxShadow: `3px 3px 0 ${redline.ink}`,
      }}
    >
      {children}
    </span>
  );
}

// Headline with ink bleed effect
function InkHeadline({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`font-black leading-[0.85] tracking-tighter ${className}`}
      style={{
        color: redline.ink,
        textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
        fontFamily: "'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
      }}
    >
      {children}
    </h1>
  );
}

// Newspaper column component
function NewsColumn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`border-l-2 border-r-2 px-4 ${className}`}
      style={{ borderColor: `${redline.ink}20` }}
    >
      {children}
    </div>
  );
}

// Breaking news ticker
function BreakingTicker() {
  const items = [
    'BREAKING: Gen Z creators earning $500+/project',
    'EXCLUSIVE: AI skills now most in-demand',
    'URGENT: 30-day path to monetization revealed',
    'HOT: 10,000+ students already enrolled',
  ];

  return (
    <div className="overflow-hidden border-y-4" style={{ borderColor: redline.red, backgroundColor: redline.red }}>
      <motion.div
        className="flex whitespace-nowrap py-2"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 font-black uppercase tracking-wide" style={{ color: redline.paper }}>
            ★ {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Pull quote component
function PullQuote({ children, author }: { children: string; author: string }) {
  return (
    <blockquote className="relative py-8 px-6 my-8 border-l-8" style={{ borderColor: redline.red, backgroundColor: `${redline.ink}08` }}>
      <span
        className="absolute -top-4 left-4 text-8xl font-serif leading-none"
        style={{ color: redline.red }}
      >
        "
      </span>
      <p
        className="text-2xl md:text-3xl font-black leading-tight mb-4 relative z-10"
        style={{ color: redline.ink, fontFamily: "'Georgia', serif" }}
      >
        {children}
      </p>
      <footer className="font-mono text-sm uppercase tracking-wider" style={{ color: redline.red }}>
        — {author}
      </footer>
    </blockquote>
  );
}

// Counter with newspaper style
function NewsCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 border-4" style={{ borderColor: redline.ink }}>
      <div
        className="text-5xl md:text-7xl font-black"
        style={{ color: redline.red, fontFamily: "'Impact', sans-serif" }}
      >
        {value}
      </div>
      <div
        className="text-xs font-mono uppercase tracking-widest mt-2"
        style={{ color: redline.ink }}
      >
        {label}
      </div>
    </div>
  );
}

export default function BrutalistRedline() {
  const domains = [
    { icon: <Film className="w-6 h-6" />, name: 'VIDEO', tagline: 'Edit Like Hollywood' },
    { icon: <Music className="w-6 h-6" />, name: 'MUSIC', tagline: 'Produce Hit Tracks' },
    { icon: <PenTool className="w-6 h-6" />, name: 'WRITING', tagline: 'Words That Sell' },
    { icon: <Bot className="w-6 h-6" />, name: 'BOTS', tagline: 'Automate Everything' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: redline.paper }}>
      <HalftoneOverlay />

      {/* Masthead / Navigation */}
      <header className="border-b-4" style={{ borderColor: redline.ink }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/landing" className="flex items-center gap-2">
              <span
                className="text-4xl md:text-5xl font-black tracking-tighter"
                style={{ color: redline.ink, fontFamily: "'Impact', sans-serif" }}
              >
                LUMORA
              </span>
              <span
                className="text-xs font-mono uppercase tracking-widest px-2 py-1"
                style={{ backgroundColor: redline.red, color: redline.paper }}
              >
                DAILY
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/lessons"
                className="font-mono text-sm uppercase tracking-wider hover:underline"
                style={{ color: redline.ink }}
              >
                Courses
              </Link>
              <Link
                to="/lessons"
                className="px-4 py-2 font-black uppercase text-sm transition-transform hover:scale-105"
                style={{ backgroundColor: redline.red, color: redline.paper }}
              >
                Subscribe Free →
              </Link>
            </div>
          </div>
          <div
            className="text-xs font-mono uppercase tracking-widest mt-2 pb-2 border-t pt-2"
            style={{ borderColor: `${redline.ink}30`, color: `${redline.ink}60` }}
          >
            Est. 2024 • The Creative AI Revolution • For Gen Z Creators Ages 16+
          </div>
        </div>
      </header>

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Hero - Front Page Layout */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Story */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StampText className="mb-4 text-xs">Exclusive Report</StampText>
                <InkHeadline className="text-6xl md:text-8xl lg:text-9xl mb-6">
                  STOP SCROLLING
                  <br />
                  <span style={{ color: redline.red }}>START EARNING</span>
                </InkHeadline>
                <div
                  className="text-lg md:text-xl font-serif leading-relaxed mb-8 max-w-2xl"
                  style={{ color: redline.ink }}
                >
                  <span className="font-black text-3xl float-left mr-2 leading-none" style={{ color: redline.red }}>T</span>
                  housands of Gen Z creators are ditching traditional education for AI skills that
                  actually pay. The secret? A 30-day program that turns complete beginners into
                  freelancers earning $500+ per project. Inside: The full story.
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/lessons"
                    className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase text-lg transition-all hover:translate-x-1 hover:-translate-y-1"
                    style={{
                      backgroundColor: redline.ink,
                      color: redline.paper,
                      boxShadow: `4px 4px 0 ${redline.red}`,
                    }}
                  >
                    Read Full Story <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase text-lg border-4 transition-colors hover:bg-black hover:text-white"
                    style={{ borderColor: redline.ink, color: redline.ink }}
                  >
                    See Projects
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Stories */}
            <div className="lg:col-span-4 border-l-4 pl-6" style={{ borderColor: redline.ink }}>
              <div className="space-y-6">
                <div className="border-b-2 pb-4" style={{ borderColor: `${redline.ink}30` }}>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: redline.red }}>
                    Featured
                  </span>
                  <h3 className="font-black text-xl mt-1" style={{ color: redline.ink }}>
                    "I Made $2,000 In My First Month"
                  </h3>
                  <p className="text-sm font-serif mt-2" style={{ color: `${redline.ink}80` }}>
                    Sarah Chen, 17, shares how video editing changed her life...
                  </p>
                </div>
                <div className="border-b-2 pb-4" style={{ borderColor: `${redline.ink}30` }}>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: redline.red }}>
                    Investigation
                  </span>
                  <h3 className="font-black text-xl mt-1" style={{ color: redline.ink }}>
                    Why Schools Won't Teach This
                  </h3>
                  <p className="text-sm font-serif mt-2" style={{ color: `${redline.ink}80` }}>
                    The skills that pay aren't in any curriculum...
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: redline.red }}>
                    Opinion
                  </span>
                  <h3 className="font-black text-xl mt-1" style={{ color: redline.ink }}>
                    The College Degree Is Dead
                  </h3>
                  <p className="text-sm font-serif mt-2" style={{ color: `${redline.ink}80` }}>
                    Why skills beat credentials in 2024...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge position="bottom" />

      {/* Stats Section - Like a newspaper infographic */}
      <section className="py-16 px-4" style={{ backgroundColor: redline.ink }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <StampText color={redline.paper} className="text-sm" style={{ color: redline.ink }}>
              By The Numbers
            </StampText>
            <h2
              className="text-4xl md:text-6xl font-black mt-4"
              style={{ color: redline.paper, fontFamily: "'Impact', sans-serif" }}
            >
              THE COLD, HARD FACTS
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '45+', label: 'Lessons' },
              { value: '$150', label: 'Avg Per Project' },
              { value: '98%', label: 'Success Rate' },
              { value: '30', label: 'Days To Earn' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
                style={{ backgroundColor: redline.paper }}
              >
                <div
                  className="text-4xl md:text-6xl font-black"
                  style={{ color: redline.red, fontFamily: "'Impact', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest mt-2" style={{ color: redline.ink }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TornEdge position="top" />

      {/* Domains Section - Classified ads style */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: redline.red }}>
              Section B • Classifieds
            </span>
            <h2
              className="text-4xl md:text-6xl font-black mt-2"
              style={{ color: redline.ink, fontFamily: "'Impact', sans-serif" }}
            >
              SKILLS FOR HIRE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((domain, i) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-4 p-6 hover:translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer"
                style={{
                  borderColor: redline.ink,
                  backgroundColor: i % 2 === 0 ? redline.paper : redline.paperDark,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `4px 4px 0 ${redline.red}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center border-2 mb-4"
                  style={{ borderColor: redline.ink }}
                >
                  <span style={{ color: redline.red }}>{domain.icon}</span>
                </div>
                <h3 className="font-black text-2xl mb-1" style={{ color: redline.ink }}>
                  {domain.name}
                </h3>
                <p className="font-serif text-sm" style={{ color: `${redline.ink}70` }}>
                  {domain.tagline}
                </p>
                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: `${redline.ink}30` }}>
                  <span className="text-xs font-mono" style={{ color: redline.red }}>
                    10-12 LESSONS • START FREE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Pull Quote Style */}
      <section className="py-16 px-4" style={{ backgroundColor: redline.paperDark }}>
        <div className="max-w-4xl mx-auto">
          <PullQuote author="Marcus J., 22, Automation Specialist • $8,200 earned">
            I went from watching TikToks all day to getting paid to make them.
            Lumora didn't just teach me skills—it gave me a career.
          </PullQuote>
        </div>
      </section>

      {/* Final CTA - Full page takeover */}
      <section
        className="py-24 px-4 border-y-8"
        style={{ borderColor: redline.red, backgroundColor: redline.red }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-block px-4 py-2 mb-6 font-mono text-sm uppercase tracking-widest"
              style={{ backgroundColor: redline.ink, color: redline.paper }}
            >
              Limited Time Offer
            </div>
            <h2
              className="text-5xl md:text-8xl font-black leading-none mb-6"
              style={{ color: redline.paper, fontFamily: "'Impact', sans-serif" }}
            >
              DON'T BE
              <br />
              TOMORROW'S
              <br />
              NEWS.
            </h2>
            <p
              className="text-xl font-serif mb-10 max-w-xl mx-auto"
              style={{ color: redline.paper }}
            >
              Start learning today. It's free. No credit card.
              No excuses. Just results.
            </p>
            <Link
              to="/lessons"
              className="inline-flex items-center gap-3 px-10 py-5 font-black uppercase text-xl transition-all hover:scale-105"
              style={{
                backgroundColor: redline.paper,
                color: redline.ink,
                boxShadow: `6px 6px 0 ${redline.ink}`,
              }}
            >
              Start Free Now <Zap className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4" style={{ borderColor: redline.ink }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-wider" style={{ color: `${redline.ink}60` }}>
            © 2024 Lumora Daily • All Rights Reserved • Not Affiliated With Any News Organization
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-mono text-xs uppercase tracking-wider hover:underline" style={{ color: redline.ink }}>
              Privacy
            </Link>
            <Link to="/terms" className="font-mono text-xs uppercase tracking-wider hover:underline" style={{ color: redline.ink }}>
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
