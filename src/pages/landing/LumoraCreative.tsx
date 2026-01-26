import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Film, Music, Zap, Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { lumoraCreative, lumoraGradients } from '@/constants/landingColors';

/**
 * Lumora Creative - Dark Luxury Landing Page
 *
 * Sophisticated dark palette with white gold accents
 * Based on the lumora-creative-ai design system
 */

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Animated number component for stats
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// Gold frame wrapper component
function GoldFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        border: `1px solid ${lumoraCreative.goldBorder}`,
        borderRadius: '16px',
        boxShadow: `inset 0 0 30px rgba(212, 197, 160, 0.05), 0 0 40px rgba(212, 197, 160, 0.08)`,
      }}
    >
      {children}
    </div>
  );
}

export default function LumoraCreative() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: lumoraCreative.bg, color: lumoraCreative.text }}>
      {/* Header */}
      <motion.header
        className="fixed top-0 w-full z-50 px-6 py-4"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${lumoraCreative.goldBorder}`,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="text-2xl font-semibold tracking-tight"
            style={{ color: lumoraCreative.gold }}
          >
            Lumora
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Courses', 'Community', 'Pricing'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors"
                style={{ color: lumoraCreative.textSecondary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = lumoraCreative.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = lumoraCreative.textSecondary)}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all"
            style={{
              backgroundColor: lumoraCreative.gold,
              color: lumoraCreative.bg,
            }}
          >
            Sign In
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Decorative corner accents */}
          <div
            className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2"
            style={{ borderColor: lumoraCreative.goldBorder }}
          />
          <div
            className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2"
            style={{ borderColor: lumoraCreative.goldBorder }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2"
            style={{ borderColor: lumoraCreative.goldBorder }}
          />
          <div
            className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2"
            style={{ borderColor: lumoraCreative.goldBorder }}
          />

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{
              background: lumoraGradients.goldText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Master AI.
            <br />
            Create Everything.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: lumoraCreative.textSecondary }}
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.15 } } }}
          >
            Creative AI education designed for Gen Z creators. Learn to create, monetize, and build your future.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.3 } } }}
          >
            <button
              className="px-8 py-4 text-base font-semibold rounded-xl transition-all hover:scale-105"
              style={{
                background: lumoraGradients.goldButton,
                color: lumoraCreative.bg,
                boxShadow: `0 4px 20px ${lumoraCreative.goldGlow}`,
              }}
            >
              Get Started
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-base transition-all group"
              style={{ color: lumoraCreative.textSecondary }}
            >
              Learn more
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-6">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          {[
            { value: 45, label: 'Lessons', suffix: '' },
            { value: 150, label: 'Avg. Monthly', prefix: '$' },
            { value: 98, label: 'Success Rate', suffix: '%' },
            { value: 2400, label: 'Students', suffix: '+' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center py-6"
              style={{
                borderRight: i < 3 ? `1px solid ${lumoraCreative.goldBorder}` : 'none',
              }}
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
                style={{ color: lumoraCreative.gold }}
              >
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div
                className="text-sm uppercase tracking-wider"
                style={{ color: lumoraCreative.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Student Work Section */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: lumoraCreative.bgCard }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: lumoraGradients.goldText,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Student creations
            </h2>
            <p style={{ color: lumoraCreative.textSecondary }}>
              Real projects built by real students. See what you'll create.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {[
              { type: 'AI Video Edit', name: 'Sarah Chen', age: 17, achievement: 'Earned $2,150' },
              { type: 'Music Production', name: 'Marcus Johnson', age: 19, achievement: 'First beat sold' },
              { type: 'AI Automation', name: 'Jasmine Lee', age: 16, achievement: '$500/project' },
            ].map((project, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GoldFrame className="p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div
                    className="aspect-[4/3] rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: lumoraCreative.bgSurface }}
                  >
                    {i === 0 && <Film className="w-12 h-12" style={{ color: lumoraCreative.goldDark }} />}
                    {i === 1 && <Music className="w-12 h-12" style={{ color: lumoraCreative.goldDark }} />}
                    {i === 2 && <Zap className="w-12 h-12" style={{ color: lumoraCreative.goldDark }} />}
                  </div>
                  <p className="text-sm mb-1" style={{ color: lumoraCreative.textMuted }}>
                    {project.type}
                  </p>
                  <p className="font-semibold mb-1" style={{ color: lumoraCreative.text }}>
                    {project.name}, {project.age}
                  </p>
                  <p className="text-sm font-medium" style={{ color: lumoraCreative.gold }}>
                    {project.achievement}
                  </p>
                </GoldFrame>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          {[
            {
              title: 'Personalized Learning',
              features: ['5-15 minute lessons that stick', 'Track your progress visually', 'Learn at your own pace'],
              label: 'Lesson Interface',
            },
            {
              title: 'Professional Tools',
              features: ['AI video editor built in', 'Export in any format', 'Templates from top creators'],
              label: 'Editor Preview',
              reverse: true,
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              className={`grid md:grid-cols-2 gap-12 items-center ${section.reverse ? 'md:flex-row-reverse' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
            >
              <div className={section.reverse ? 'md:order-2' : ''}>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{
                    background: lumoraGradients.goldText,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: lumoraCreative.gold }}
                      />
                      <span style={{ color: lumoraCreative.textSecondary }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <GoldFrame className={`p-4 ${section.reverse ? 'md:order-1' : ''}`}>
                <div
                  className="aspect-[4/3] rounded-lg flex flex-col"
                  style={{ backgroundColor: lumoraCreative.bgSurface }}
                >
                  {/* Window controls */}
                  <div className="flex items-center gap-2 p-4 border-b" style={{ borderColor: lumoraCreative.goldBorder }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
                  </div>
                  {/* Content placeholder */}
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-sm" style={{ color: lumoraCreative.textMuted }}>
                      {section.label}
                    </span>
                  </div>
                </div>
              </GoldFrame>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: lumoraCreative.bgCard }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{
              background: lumoraGradients.goldText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            What students say
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                initials: 'SC',
                quote: '"I earned my first $2,000 editing videos for local businesses. Lumora taught me everything."',
                name: 'Sarah Chen',
                age: 17,
                location: 'Los Angeles, CA',
                achievement: 'First $1K Earned',
              },
              {
                initials: 'MJ',
                quote: '"The community is amazing. Any time I had a question, someone was there to help within minutes."',
                name: 'Marcus Johnson',
                age: 22,
                location: 'Atlanta, GA',
                achievement: 'Community Champion',
              },
              {
                initials: 'JP',
                quote: '"My parents were skeptical at first, but when I showed them my first paycheck, they were blown away."',
                name: 'Jasmine Patel',
                age: 19,
                location: 'Toronto, ON',
                achievement: '50 Projects Complete',
              },
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GoldFrame className="p-8 h-full">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-semibold"
                    style={{
                      backgroundColor: lumoraCreative.gold,
                      color: lumoraCreative.bg,
                    }}
                  >
                    {testimonial.initials}
                  </div>
                  <p className="mb-6" style={{ color: lumoraCreative.textSecondary }}>
                    {testimonial.quote}
                  </p>
                  <p className="font-semibold">{testimonial.name}, {testimonial.age}</p>
                  <p className="text-sm mb-3" style={{ color: lumoraCreative.textMuted }}>
                    {testimonial.location}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(212, 197, 160, 0.15)',
                      color: lumoraCreative.gold,
                    }}
                  >
                    <Check className="w-3 h-3" />
                    {testimonial.achievement}
                  </div>
                </GoldFrame>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-32 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <GoldFrame className="py-16 px-8">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: lumoraGradients.goldText,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ready to start?
            </h2>
            <p className="mb-8" style={{ color: lumoraCreative.textSecondary }}>
              Join thousands of Gen Z creators learning AI skills that pay.
            </p>
            <button
              className="px-8 py-4 text-base font-semibold rounded-xl transition-all hover:scale-105 mb-6"
              style={{
                background: lumoraGradients.goldButton,
                color: lumoraCreative.bg,
                boxShadow: `0 4px 20px ${lumoraCreative.goldGlow}`,
              }}
            >
              Get Started Free
            </button>
            <p className="text-sm" style={{ color: lumoraCreative.textMuted }}>
              Free · No credit card · Cancel anytime
            </p>
          </GoldFrame>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: `1px solid ${lumoraCreative.goldBorder}` }}
      >
        <p className="text-sm" style={{ color: lumoraCreative.textMuted }}>
          © 2024 Lumora. Dark luxury design.
        </p>
      </footer>
    </div>
  );
}
