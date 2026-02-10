import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Film, PenTool, Music, Bot, X, Check } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

/**
 * Neo-Brutalist Landing Page - ORANGE Variation
 * Color: Pure black + white + vibrant orange (#FF6600)
 */

const brutal = {
  black: '#000000',
  white: '#ffffff',
  accent: '#FF6600',
  accentDim: '#CC5200',
  gray: '#333333',
  grayLight: '#666666',
  grayMuted: '#999999',
};

const glitchIn = {
  hidden: { opacity: 0, x: -20, skewX: -5 },
  visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.3, ease: 'steps(8)' } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.6, 0, 0.2, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function BrutalButton({ children, to, variant = 'primary', size = 'md', className = '' }: { children: React.ReactNode; to?: string; variant?: 'primary' | 'secondary' | 'outline'; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const baseStyles = `inline-flex items-center justify-center gap-3 font-mono font-bold uppercase tracking-wider border-4 border-current transition-all duration-100 hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0`;
  const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  const styles = `${baseStyles} ${sizes[size]} ${className}`;
  const inlineStyle = variant === 'primary' ? { backgroundColor: brutal.accent, color: brutal.black } : variant === 'secondary' ? { backgroundColor: brutal.black, color: brutal.accent, borderColor: brutal.accent } : {};
  const hoverShadow = variant === 'primary' ? `4px 4px 0 0 ${brutal.black}` : variant === 'secondary' ? `4px 4px 0 0 ${brutal.accent}` : `4px 4px 0 0 ${brutal.white}`;

  if (to) {
    return (<Link to={to} className={styles} style={inlineStyle} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>{children}</Link>);
  }
  return (<button className={styles} style={inlineStyle} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>{children}</button>);
}

function BrutalCard({ children, className = '', hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`border-4 border-white bg-black p-6 ${hover ? 'transition-all duration-100 hover:translate-x-1 hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
      onMouseEnter={(e) => hover && (e.currentTarget.style.boxShadow = `6px 6px 0 0 ${brutal.accent}`)}
      onMouseLeave={(e) => hover && (e.currentTarget.style.boxShadow = 'none')}
    >
      {children}
    </div>
  );
}

function Marquee({ children, speed = 20 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y-4 border-white py-4">
      <motion.div className="inline-flex gap-8" animate={{ x: ['0%', '-50%'] }} transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => { setIsGlitching(true); setTimeout(() => setIsGlitching(false), 150); }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'opacity-0' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute inset-0" style={{ color: brutal.accent, transform: 'translate(-2px, -2px)', clipPath: 'inset(10% 0 60% 0)' }}>{children}</span>
          <span className="absolute inset-0" style={{ color: '#00FFFF', transform: 'translate(2px, 2px)', clipPath: 'inset(40% 0 20% 0)' }}>{children}</span>
          <span className="absolute inset-0">{children}</span>
        </>
      )}
    </span>
  );
}

function SteppedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let current = 0;
        const step = Math.ceil(value / 20);
        const interval = setInterval(() => { current += step; if (current >= value) { setCount(value); clearInterval(interval); } else { setCount(current); } }, 50);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (<div ref={ref} className="font-mono text-5xl md:text-7xl font-black" style={{ color: brutal.accent }}>{count}{suffix}</div>);
}

export default function NeoBrutalistOrange() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const domains = [
    { icon: <Film className="w-8 h-8" />, name: 'VIDEO', desc: 'Edit like a pro. No experience needed.' },
    { icon: <Music className="w-8 h-8" />, name: 'MUSIC', desc: 'Produce beats. Ship tracks. Get paid.' },
    { icon: <PenTool className="w-8 h-8" />, name: 'WRITING', desc: 'Content that converts. Words that sell.' },
    { icon: <Bot className="w-8 h-8" />, name: 'AUTOMATION', desc: 'Build bots. Automate everything.' },
  ];

  const stats = [
    { value: 45, label: 'LESSONS', suffix: '' },
    { value: 150, label: 'AVG $/PROJECT', suffix: '' },
    { value: 98, label: 'SUCCESS RATE', suffix: '%' },
    { value: 30, label: 'DAYS TO EARN', suffix: '' },
  ];

  const antiFeatures = [
    { bad: 'Boring tutorials', good: 'Learn by building' },
    { bad: 'Theory overload', good: 'Practical skills' },
    { bad: 'Months to results', good: 'Ship real work fast' },
    { bad: 'Cookie-cutter content', good: 'Your unique style' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <style>{`::selection { background: ${brutal.accent}; color: black; }`}</style>
      <NoiseOverlay />

      <motion.nav style={{ opacity: headerOpacity }} className="fixed top-0 left-0 right-0 z-40 border-b-4 border-white bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="font-mono text-2xl font-black tracking-tighter" style={{ color: brutal.accent }}>LUMORA_</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/lessons" className="font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-colors" style={{ color: brutal.white }}>Courses</Link>
            <Link to="/projects" className="font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-colors" style={{ color: brutal.white }}>Projects</Link>
            <BrutalButton to="/signup" size="sm">Start Now <ArrowRight className="w-4 h-4" /></BrutalButton>
          </div>
        </div>
      </motion.nav>

      <section className="relative pt-32 pb-20 px-4 md:px-8 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(${brutal.white} 1px, transparent 1px), linear-gradient(90deg, ${brutal.white} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={glitchIn} className="font-mono text-sm uppercase tracking-[0.3em] mb-6" style={{ color: brutal.accent }}>// Creative AI Platform</motion.div>
            <motion.h1 variants={slideUp} className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 tracking-tight">
              <span className="block">STOP</span>
              <span className="block">SCROLLING.</span>
              <span className="block" style={{ color: brutal.accent }}><GlitchText>START</GlitchText></span>
              <span className="block" style={{ color: brutal.accent }}>CREATING.</span>
            </motion.h1>
            <motion.p variants={slideUp} className="font-mono text-lg md:text-xl max-w-2xl mb-12" style={{ color: brutal.grayMuted }}>Master AI tools. Build real projects. Make actual money.<br />No fluff. No BS. Just skills that pay.</motion.p>
            <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4">
              <BrutalButton to="/lessons" size="lg">Start Learning <ArrowRight className="w-5 h-5" /></BrutalButton>
              <BrutalButton to="/projects" variant="outline" size="lg">View Projects</BrutalButton>
            </motion.div>
            <motion.div variants={slideUp} className="mt-16 flex flex-wrap gap-8 font-mono text-sm" style={{ color: brutal.grayLight }}>
              <span><strong className="text-white">10K+</strong> creators</span>
              <span><strong className="text-white">$50K+</strong> earned</span>
              <span><strong className="text-white">4</strong> domains</span>
            </motion.div>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'steps(3)' }}>
          <div className="font-mono text-xs uppercase tracking-widest" style={{ color: brutal.grayLight }}>Scroll</div>
          <div className="w-px h-12 bg-white/30 mx-auto mt-2" />
        </motion.div>
      </section>

      <Marquee speed={25}>
        <span className="font-black text-4xl md:text-6xl uppercase tracking-tight">
          Video Editing <span style={{ color: brutal.accent }}>•</span> Music Production <span style={{ color: brutal.accent }}>•</span> Content Writing <span style={{ color: brutal.accent }}>•</span> AI Automation <span style={{ color: brutal.accent }}>•</span> Real Money <span style={{ color: brutal.accent }}>•</span> No Experience Needed <span style={{ color: brutal.accent }}>•</span>
        </span>
      </Marquee>

      <section className="py-24 px-4 md:px-8 border-b-4 border-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <SteppedCounter value={stat.value} suffix={stat.suffix} />
                <div className="font-mono text-sm uppercase tracking-wider mt-2" style={{ color: brutal.grayMuted }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
            <div className="font-mono text-sm uppercase tracking-[0.3em] mb-4" style={{ color: brutal.accent }}>// 01. Choose Your Path</div>
            <h2 className="text-4xl md:text-6xl font-black">4 DOMAINS.<br />INFINITE POSSIBILITIES.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {domains.map((domain, index) => (
              <motion.div key={domain.name} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <BrutalCard hover>
                  <div className="flex items-start gap-6">
                    <div className="p-4 border-4 border-current" style={{ color: brutal.accent }}>{domain.icon}</div>
                    <div>
                      <h3 className="font-mono text-2xl font-black mb-2">{domain.name}</h3>
                      <p className="font-mono text-sm" style={{ color: brutal.grayMuted }}>{domain.desc}</p>
                    </div>
                  </div>
                </BrutalCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 border-y-4 border-white" style={{ backgroundColor: brutal.accent }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
            <div className="font-mono text-sm uppercase tracking-[0.3em] mb-4 text-black/60">// 02. The Lumora Difference</div>
            <h2 className="text-4xl md:text-6xl font-black text-black">NOT ANOTHER<br />BORING COURSE.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {antiFeatures.map((feature, index) => (
              <motion.div key={feature.bad} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="border-4 border-black bg-black text-white p-6 flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2"><X className="w-5 h-5 text-red-500" /><span className="font-mono text-sm line-through" style={{ color: brutal.grayMuted }}>{feature.bad}</span></div>
                  <div className="flex items-center gap-2"><Check className="w-5 h-5" style={{ color: brutal.accent }} /><span className="font-mono text-lg font-bold">{feature.good}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <BrutalCard>
              <div className="font-mono text-sm uppercase tracking-[0.3em] mb-6" style={{ color: brutal.accent }}>// Real Talk</div>
              <blockquote className="text-2xl md:text-4xl font-black leading-tight mb-8">"I went from zero coding knowledge to building automation tools that companies pay $500+ for.<span style={{ color: brutal.accent }}> In 6 weeks.</span>"</blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-4 border-white flex items-center justify-center font-mono font-bold text-xl" style={{ backgroundColor: brutal.accent, color: brutal.black }}>JK</div>
                <div>
                  <div className="font-mono font-bold">Jordan Kim, 19</div>
                  <div className="font-mono text-sm" style={{ color: brutal.grayMuted }}>Freelance AI Automation Specialist</div>
                </div>
              </div>
            </BrutalCard>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 border-t-4 border-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
            <div className="font-mono text-sm uppercase tracking-[0.3em] mb-4" style={{ color: brutal.accent }}>// 03. The Process</div>
            <h2 className="text-4xl md:text-6xl font-black">SIMPLE.<br />EFFECTIVE.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'LEARN', desc: 'Pick a domain. Watch short, practical lessons. No fluff.' },
              { num: '02', title: 'BUILD', desc: 'Complete 3 portfolio projects. Real work, not busywork.' },
              { num: '03', title: 'EARN', desc: 'Use your new skills to land gigs. We show you how.' },
            ].map((step, index) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                <BrutalCard className="h-full">
                  <div className="font-mono text-6xl font-black mb-4" style={{ color: brutal.accent }}>{step.num}</div>
                  <h3 className="font-mono text-2xl font-black mb-2">{step.title}</h3>
                  <p className="font-mono text-sm" style={{ color: brutal.grayMuted }}>{step.desc}</p>
                </BrutalCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 border-y-4" style={{ borderColor: brutal.accent, backgroundColor: brutal.accent }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-black text-black mb-6 leading-tight">READY TO<br />STOP WAITING?</h2>
            <p className="font-mono text-lg mb-10 text-black/70">Free to start. No credit card. No excuses.</p>
            <BrutalButton to="/signup" variant="secondary" size="lg">Start Learning Now <Zap className="w-5 h-5" /></BrutalButton>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 md:px-8 border-t-4 border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm" style={{ color: brutal.grayMuted }}>© 2024 LUMORA_ // Built for creators who give a damn.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-colors">Privacy</Link>
            <Link to="/terms" className="font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-colors">Terms</Link>
            <Link to="/landing" className="font-mono text-sm uppercase tracking-wider" style={{ color: brutal.accent }}>← Showcase</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
