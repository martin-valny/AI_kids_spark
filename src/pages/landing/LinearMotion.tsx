import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Film, Music, PenTool, Zap, Star, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

/**
 * Linear Motion Landing Page
 *
 * Theme: Linear/Notion/Stripe inspired - Ultra-clean SaaS premium
 * References: Linear.app, Stripe.com, Notion.so, Vercel.com
 * Target: Design-savvy Gen Z who appreciate refined sophistication
 *
 * Design DNA:
 * - Deep navy/charcoal base (#0f0f13)
 * - Subtle gradient accents (not loud)
 * - Typography-driven hierarchy
 * - Micro-animations with purpose
 * - Lots of whitespace, breathing room
 * - Refined, not flashy
 */

// Color system - Refined, sophisticated
const linear = {
  bg: '#0f0f13',
  bgElevated: '#16161c',
  bgCard: '#1c1c24',
  bgSubtle: '#222230',

  accent: '#7c5cff', // Soft purple
  accentHover: '#8f72ff',
  accentGlow: 'rgba(124, 92, 255, 0.15)',
  accentMuted: 'rgba(124, 92, 255, 0.5)',

  success: '#3ecf8e',
  successGlow: 'rgba(62, 207, 142, 0.15)',

  text: '#ededef',
  textSecondary: '#9898a2',
  textMuted: '#6b6b76',

  border: 'rgba(255, 255, 255, 0.06)',
  borderSubtle: 'rgba(255, 255, 255, 0.03)',
};

// Subtle gradient for special elements
const subtleGradient = `linear-gradient(135deg, ${linear.accent} 0%, #5b8cff 100%)`;

// Refined motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Refined button component
function Button({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all';

  const variants = {
    primary: `text-white hover:opacity-90`,
    secondary: `border hover:bg-white/5`,
    ghost: `hover:bg-white/5`,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const primaryStyle = variant === 'primary'
    ? { background: subtleGradient, boxShadow: `0 0 30px ${linear.accentGlow}` }
    : variant === 'secondary'
      ? { borderColor: linear.border, color: linear.text }
      : { color: linear.textSecondary };

  if (to) {
    return (
      <Link to={to} className={styles} style={primaryStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} style={primaryStyle}>
      {children}
    </button>
  );
}

// Refined card component
function Card({
  children,
  className = '',
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={`
        rounded-2xl border p-6
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        background: linear.bgCard,
        borderColor: linear.border,
      }}
      whileHover={hover ? {
        borderColor: linear.accentMuted,
        transition: { duration: 0.2 },
      } : {}}
    >
      {children}
    </motion.div>
  );
}

// Feature icon with subtle glow
function FeatureIcon({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        color: color,
      }}
    >
      {icon}
    </div>
  );
}

// Animated counter
function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <span className="tabular-nums">
      {value}{suffix}
    </span>
  );
}

// Grid pattern background
function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(${linear.text} 1px, transparent 1px),
          linear-gradient(90deg, ${linear.text} 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }}
    />
  );
}

// Radial gradient spotlight
function Spotlight() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${linear.accentGlow}, transparent)`,
      }}
    />
  );
}

export default function LinearMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const navBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['rgba(15, 15, 19, 0)', 'rgba(15, 15, 19, 0.8)']
  );

  const features = [
    {
      icon: <Film className="w-5 h-5" />,
      title: 'Video Editing',
      description: 'Create viral content with AI-powered tools. Master CapCut, Runway, and more.',
      color: '#ff6b6b',
    },
    {
      icon: <Music className="w-5 h-5" />,
      title: 'Music Production',
      description: 'Produce original tracks and beats. No music theory required.',
      color: '#4ecdc4',
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      title: 'Content Writing',
      description: 'Write copy that converts. Social posts, scripts, and more.',
      color: '#ffe66d',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Automation',
      description: 'Build workflows that save hours. Make.com, Zapier, n8n.',
      color: linear.accent,
    },
  ];

  const benefits = [
    'Learn at your own pace',
    'Build real portfolio projects',
    'Turn skills into paid opportunities',
    'Join 10,000+ creators',
    'Free tier forever',
    'No experience required',
  ];

  const testimonials = [
    {
      quote: "The most practical AI course I've found. Started earning in my first month.",
      author: 'Sarah K.',
      role: 'Content Creator',
      earnings: '$1,200',
    },
    {
      quote: 'Finally, a platform that focuses on real skills, not just theory.',
      author: 'Alex R.',
      role: 'Freelance Editor',
      earnings: '$2,800',
    },
    {
      quote: 'The automation lessons alone saved me 15 hours a week.',
      author: 'Jordan M.',
      role: 'Marketing Manager',
      earnings: '$800/mo saved',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ backgroundColor: linear.bg }}
    >
      <GridPattern />
      <Spotlight />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{ borderColor: linear.borderSubtle, background: navBg }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold" style={{ color: linear.text }}>
            Lumora
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/lessons"
              className="text-sm transition-colors"
              style={{ color: linear.textSecondary }}
            >
              Courses
            </Link>
            <Link
              to="/pricing"
              className="text-sm transition-colors"
              style={{ color: linear.textSecondary }}
            >
              Pricing
            </Link>
            <Link
              to="/sign-in"
              className="text-sm transition-colors"
              style={{ color: linear.textSecondary }}
            >
              Sign in
            </Link>
            <Button to="/signup" size="sm">
              Get started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
                style={{ background: linear.bgCard, color: linear.accent, border: `1px solid ${linear.border}` }}
              >
                <Star className="w-3.5 h-3.5" />
                Now available for everyone
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-6"
              style={{ color: linear.text }}
            >
              Master AI tools.
              <br />
              <span style={{ color: linear.accent }}>Create everything.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: linear.textSecondary }}
            >
              The creative AI platform for the next generation.
              Learn video editing, music production, content writing, and automation.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button to="/signup" size="lg">
                Start learning free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button to="/lessons" variant="secondary" size="lg">
                Browse courses
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-x-8 gap-y-3"
              style={{ color: linear.textMuted }}
            >
              {benefits.slice(0, 4).map((benefit) => (
                <span key={benefit} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4" style={{ color: linear.success }} />
                  {benefit}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y" style={{ borderColor: linear.border }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '45', label: 'Lessons', suffix: '+' },
              { value: '10K', label: 'Creators', suffix: '+' },
              { value: '$150', label: 'Avg/Project', suffix: '' },
              { value: '30', label: 'Days to earn', suffix: '' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-semibold mb-2" style={{ color: linear.text }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm" style={{ color: linear.textMuted }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: linear.text }}>
              Four domains. Infinite possibilities.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: linear.textSecondary }}>
              Each domain takes you from beginner to earning professional.
              Pick one or master all four.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <FeatureIcon icon={feature.icon} color={feature.color} />
                  <h3 className="text-xl font-semibold mt-5 mb-2" style={{ color: linear.text }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: linear.textSecondary }}>{feature.description}</p>
                  <div className="mt-5 pt-5 border-t" style={{ borderColor: linear.border }}>
                    <Link
                      to="/lessons"
                      className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                      style={{ color: linear.accent }}
                    >
                      Explore curriculum
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6" style={{ background: linear.bgElevated }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: linear.text }}>
              Trusted by creators worldwide
            </h2>
            <p className="text-lg" style={{ color: linear.textSecondary }}>
              Real results from real students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <p className="text-lg mb-6 flex-grow" style={{ color: linear.text }}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: linear.border }}>
                    <div>
                      <div className="font-medium" style={{ color: linear.text }}>
                        {testimonial.author}
                      </div>
                      <div className="text-sm" style={{ color: linear.textMuted }}>
                        {testimonial.role}
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: linear.successGlow, color: linear.success }}
                    >
                      {testimonial.earnings}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: linear.text }}>
              Simple path to success
            </h2>
            <p className="text-lg" style={{ color: linear.textSecondary }}>
              From complete beginner to earning professional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Learn',
                desc: 'Follow structured lessons with practical projects. No fluff, just skills.',
              },
              {
                step: '02',
                title: 'Build',
                desc: 'Create 3 portfolio projects per domain. Real work you can show clients.',
              },
              {
                step: '03',
                title: 'Earn',
                desc: 'Apply your skills to freelance gigs. We show you exactly how.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div
                  className="text-6xl font-semibold mb-4"
                  style={{ color: linear.accent }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: linear.text }}>
                  {item.title}
                </h3>
                <p style={{ color: linear.textSecondary }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ color: linear.text }}>
              Ready to start creating?
            </h2>
            <p className="text-xl mb-10" style={{ color: linear.textSecondary }}>
              Join thousands of creators mastering AI tools and building the future.
            </p>
            <Button to="/signup" size="lg">
              Get started for free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="mt-6 text-sm" style={{ color: linear.textMuted }}>
              Free forever • Upgrade anytime • Cancel whenever
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: linear.border }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm" style={{ color: linear.textMuted }}>
            © 2024 Lumora. Designed for creators.
          </div>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm transition-colors"
              style={{ color: linear.textMuted }}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm transition-colors"
              style={{ color: linear.textMuted }}
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
