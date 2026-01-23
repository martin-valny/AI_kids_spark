import { motion } from 'framer-motion';
import { Book, DollarSign, Award, Zap, Film, PenTool, Music, Cpu } from 'lucide-react';
import VaporBackground from '@/components/effects/VaporBackground';
import NeonGlassCard from '@/components/ui/NeonGlassCard';
import HexagonFrame from '@/components/ui/HexagonFrame';
import GradientText from '@/components/ui/GradientText';
import StatsCounter from '@/components/ui/StatsCounter';
import { GradientButton } from '@/components/ui/GradientButton';
import { landingColors } from '@/constants/landingColors';

/**
 * Tech/Professional Landing Page Variation
 *
 * Theme: "LinkedIn meets Spotify" - Credibility-focused, data-driven
 * Color: Cyan dominant (70%) with Magenta accents (30%)
 * Target: Career-focused Gen Z creators seeking earning potential
 */
export default function TechProfessional() {
  const features = [
    {
      icon: <Film className="w-12 h-12" />,
      title: 'AI Video Editing',
      description: 'Master professional video editing with AI-powered tools. Create stunning content in minutes.',
      color: 'cyan' as const,
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'AI Automation',
      description: 'Automate workflows and boost productivity. Learn to build smart solutions that work 24/7.',
      color: 'purple' as const,
    },
    {
      icon: <PenTool className="w-12 h-12" />,
      title: 'AI Content Writing',
      description: 'Craft compelling copy and content. Transform ideas into polished professional writing.',
      color: 'magenta' as const,
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: 'AI Music Production',
      description: 'Produce original tracks and beats. No music theory required—just creativity.',
      color: 'gold' as const,
    },
  ];

  const testimonials = [
    {
      quote: "In 30 days I went from zero to earning my first $500 with AI video editing. Lumora changed my life.",
      name: "Marcus Chen",
      age: 19,
      achievement: "First paid client in 3 weeks",
      avatar: "MC",
    },
    {
      quote: "The automation skills I learned here landed me a freelance gig worth $2K. Best investment ever.",
      name: "Sarah Williams",
      age: 22,
      achievement: "$2,000 project completed",
      avatar: "SW",
    },
    {
      quote: "I'm still in high school but already making money with AI content writing. My parents are shocked!",
      name: "Alex Rodriguez",
      age: 17,
      achievement: "Earning while in school",
      avatar: "AR",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Vapor gradient background */}
      <VaporBackground variant="cyan" intensity="medium" />

      {/* Navigation - Simple for landing page */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div style={{ color: landingColors.textPrimary }} className="text-2xl font-bold">
          <GradientText variant="primary" as="span">Lumora</GradientText>
        </div>
        <GradientButton to="/signup" className="hidden md:inline-block">
          Get Started Free
        </GradientButton>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <GradientText variant="primary" as="span">
                Master AI.
              </GradientText>
              <br />
              <span style={{ color: landingColors.textPrimary }}>
                Create Everything.
              </span>
              <br />
              <GradientText variant="cyber" as="span">
                Monetize Fast.
              </GradientText>
            </h1>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: landingColors.textSecondary }}
            >
              The premier creative AI platform for Gen Z creators. Learn cutting-edge skills,
              build impressive projects, and start earning—all in 30 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton to="/lessons" size="lg">
                Start Learning Free
              </GradientButton>
              <GradientButton to="/lessons" variant="outline" size="lg">
                View Course Catalog
              </GradientButton>
            </div>
          </motion.div>

          {/* Right: Visual element - Hexagonal icon grid */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Central large hexagon */}
              <div className="absolute">
                <HexagonFrame size="xl" color="gradient" glow>
                  <Cpu className="w-20 h-20" style={{ color: landingColors.cyan }} />
                </HexagonFrame>
              </div>

              {/* Orbiting smaller hexagons */}
              <motion.div
                className="absolute -translate-y-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <HexagonFrame size="md" color="cyan" glow>
                  <Film className="w-8 h-8" style={{ color: landingColors.cyan }} />
                </HexagonFrame>
              </motion.div>

              <motion.div
                className="absolute translate-x-32"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <HexagonFrame size="md" color="purple" glow>
                  <Zap className="w-8 h-8" style={{ color: landingColors.purple }} />
                </HexagonFrame>
              </motion.div>

              <motion.div
                className="absolute translate-y-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <HexagonFrame size="md" color="magenta" glow>
                  <PenTool className="w-8 h-8" style={{ color: landingColors.magenta }} />
                </HexagonFrame>
              </motion.div>

              <motion.div
                className="absolute -translate-x-32"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <HexagonFrame size="md" color="gold" glow>
                  <Music className="w-8 h-8" style={{ color: landingColors.gold }} />
                </HexagonFrame>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NeonGlassCard variant="cyan">
            <StatsCounter value={45} label="Lessons" icon={<Book />} color="cyan" />
          </NeonGlassCard>

          <NeonGlassCard variant="gold">
            <StatsCounter
              value={150}
              label="Avg. Earning/Project"
              prefix="$"
              icon={<DollarSign />}
              color="gold"
            />
          </NeonGlassCard>

          <NeonGlassCard variant="purple">
            <StatsCounter
              value={98}
              label="Student Success Rate"
              suffix="%"
              icon={<Award />}
              color="purple"
            />
          </NeonGlassCard>

          <NeonGlassCard variant="magenta">
            <StatsCounter value={30} label="Days to Monetization" icon={<Zap />} color="magenta" />
          </NeonGlassCard>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="primary">Master 4 Creative Domains</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Choose your path and build real-world skills that pay
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeonGlassCard variant={feature.color} hover>
                <div className="flex flex-col items-center text-center">
                  <HexagonFrame size="lg" color={feature.color} glow>
                    {feature.icon}
                  </HexagonFrame>
                  <h3
                    className="text-xl font-bold mt-4 mb-2"
                    style={{ color: landingColors.textPrimary }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: landingColors.textSecondary }}>{feature.description}</p>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="cyber">Trusted by 10,000+ Creators</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Real students, real results, real earnings
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <NeonGlassCard variant="cyan">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar hexagon */}
                  <HexagonFrame size="lg" color="cyan" glow>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: landingColors.cyan }}
                    >
                      {testimonial.avatar}
                    </div>
                  </HexagonFrame>

                  {/* Quote */}
                  <p
                    className="text-lg italic mt-4 mb-4"
                    style={{ color: landingColors.textSecondary }}
                  >
                    "{testimonial.quote}"
                  </p>

                  {/* Name and details */}
                  <div style={{ color: landingColors.textPrimary }} className="font-bold">
                    {testimonial.name}, {testimonial.age}
                  </div>
                  <div
                    className="text-sm mt-2 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: landingColors.cyanGlow,
                      color: landingColors.cyan,
                    }}
                  >
                    {testimonial.achievement}
                  </div>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <NeonGlassCard variant="gradient" glow>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText variant="cyber">Ready to Transform Your Future?</GradientText>
            </h2>
            <p className="text-xl mb-8" style={{ color: landingColors.textSecondary }}>
              Join thousands of Gen Z creators mastering AI and earning real money.
              No experience required—just bring your creativity.
            </p>
            <GradientButton to="/signup" size="lg" className="text-lg">
              Start Learning Free Today
            </GradientButton>
            <p className="text-sm mt-4" style={{ color: landingColors.textMuted }}>
              No credit card required • Cancel premium anytime • Forever free tier
            </p>
          </NeonGlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t" style={{ borderColor: landingColors.bgCard }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: landingColors.textMuted }}>
          <p>&copy; 2024 Lumora. Empowering Gen Z creators with AI.</p>
        </div>
      </footer>
    </div>
  );
}
