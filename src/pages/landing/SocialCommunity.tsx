import { motion } from 'framer-motion';
import { Users, Globe, Heart, Shield, Lock, CheckCircle, TrendingUp } from 'lucide-react';
import VaporBackground from '@/components/effects/VaporBackground';
import NeonGlassCard from '@/components/ui/NeonGlassCard';
import GradientText from '@/components/ui/GradientText';
import StatsCounter from '@/components/ui/StatsCounter';
import { GradientButton } from '@/components/ui/GradientButton';
import { landingColors } from '@/constants/landingColors';

/**
 * Social/Community Landing Page Variation
 *
 * Theme: "Discord meets Duolingo" - Community-focused, approachable
 * Color: Gold dominant (55%) with Cyan accents (45%)
 * Target: Social, support-seeking Gen Z who value belonging
 */
export default function SocialCommunity() {
  const testimonials = [
    {
      quote: "I was nervous about learning AI alone, but this community is so supportive! Everyone cheers for your wins and helps when you're stuck.",
      name: "Emily Chen",
      age: 16,
      location: "California, USA",
      achievement: "Completed 12 lessons",
      avatar: "EC",
    },
    {
      quote: "The best part? Meeting other creators my age who get it. We collab on projects and push each other to be better.",
      name: "Jordan Martinez",
      age: 20,
      location: "Texas, USA",
      achievement: "2 successful collabs",
      avatar: "JM",
    },
    {
      quote: "My parents were skeptical at first, but seeing the safe environment and real progress changed their minds. Now they're my biggest fans!",
      name: "Aisha Patel",
      age: 15,
      location: "Ontario, Canada",
      achievement: "First project sold",
      avatar: "AP",
    },
  ];

  const communityFeed = [
    {
      avatar: "SK",
      name: "Sarah Kim",
      action: "just completed AI Video Editing!",
      time: "2 min ago",
      reactions: 24,
    },
    {
      avatar: "MT",
      name: "Marcus Thompson",
      action: "earned their first $100!",
      time: "15 min ago",
      reactions: 47,
    },
    {
      avatar: "JW",
      name: "Jasmine Williams",
      action: "shared a new music project",
      time: "1 hour ago",
      reactions: 31,
    },
    {
      avatar: "AL",
      name: "Alex Lee",
      action: "reached a 30-day streak!",
      time: "3 hours ago",
      reactions: 52,
    },
  ];

  const trustSignals = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Safe Community",
      description: "Moderated 24/7 by real humans. Zero tolerance for harassment or negativity.",
    },
    {
      icon: <Lock className="w-12 h-12" />,
      title: "Privacy Protected",
      description: "Your data is yours. We never sell information or spam you with ads.",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Supportive Environment",
      description: "Every question is welcome. We celebrate progress, not perfection.",
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Parent Approved",
      description: "Safe for ages 13+. Transparent progress reports for parents who want them.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Vapor gradient background - gold/cyan mix */}
      <VaporBackground variant="gold" intensity="medium" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div style={{ color: landingColors.textPrimary }} className="text-2xl font-bold">
          <GradientText variant="goldCyan" as="span">Lumora</GradientText>
        </div>
        <GradientButton to="/signup" className="hidden md:inline-block">
          Join Free Today
        </GradientButton>
      </nav>

      {/* Hero Section - Split layout */}
      <section className="relative z-10 px-6 pt-12 pb-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <GradientText variant="goldCyan" as="span">
                Join 10,000+ Creators
              </GradientText>
              <br />
              <span style={{ color: landingColors.textPrimary }}>
                Mastering AI
              </span>
            </h1>

            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: landingColors.textSecondary }}
            >
              Learn together, grow together, earn together. You're not just joining a platform—you're joining a movement of young creators changing the game.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <GradientButton to="/signup" size="lg">
                Join Free Today
              </GradientButton>
              <GradientButton to="/about" variant="outline" size="lg">
                Meet the Community
              </GradientButton>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold"
                    style={{
                      backgroundColor: landingColors.bgCard,
                      borderColor: landingColors.gold,
                      color: landingColors.gold,
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                Join <strong style={{ color: landingColors.gold }}>10,247</strong> active creators
              </p>
            </div>
          </motion.div>

          {/* Right: Community faces grid */}
          <motion.div
            className="grid grid-cols-4 gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  backgroundColor: landingColors.bgCard,
                  color: i % 3 === 0 ? landingColors.gold : landingColors.cyan,
                  border: `2px solid ${i % 3 === 0 ? landingColors.gold : landingColors.cyan}`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {String.fromCharCode(65 + i)}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - PRIMARY FOCUS */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="goldCyan">Real Students, Real Stories</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Hear from creators who found their tribe
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
              <NeonGlassCard variant={index % 2 === 0 ? 'gold' : 'cyan'} glow>
                <div className="flex flex-col">
                  {/* Avatar - circular not hexagonal */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{
                        backgroundColor: index % 2 === 0 ? landingColors.goldGlow : landingColors.cyanGlow,
                        color: index % 2 === 0 ? landingColors.gold : landingColors.cyan,
                        border: `3px solid ${index % 2 === 0 ? landingColors.gold : landingColors.cyan}`,
                      }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: landingColors.textPrimary }}>
                        {testimonial.name}, {testimonial.age}
                      </div>
                      <div className="text-sm" style={{ color: landingColors.textMuted }}>
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p
                    className="text-base italic mb-4 flex-grow"
                    style={{ color: landingColors.textSecondary }}
                  >
                    "{testimonial.quote}"
                  </p>

                  {/* Achievement badge */}
                  <div
                    className="text-sm px-3 py-2 rounded-lg text-center font-medium"
                    style={{
                      backgroundColor: index % 2 === 0 ? landingColors.goldGlow : landingColors.cyanGlow,
                      color: index % 2 === 0 ? landingColors.gold : landingColors.cyan,
                    }}
                  >
                    ✨ {testimonial.achievement}
                  </div>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Stats */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NeonGlassCard variant="gold">
            <StatsCounter value={10247} label="Active Students" icon={<Users />} color="gold" />
          </NeonGlassCard>

          <NeonGlassCard variant="cyan">
            <StatsCounter value={52} label="Countries" suffix="+" icon={<Globe />} color="cyan" />
          </NeonGlassCard>

          <NeonGlassCard variant="gold">
            <StatsCounter
              value={100}
              label="Total Earnings"
              prefix="$"
              suffix="K+"
              icon={<TrendingUp />}
              color="gold"
            />
          </NeonGlassCard>

          <NeonGlassCard variant="cyan">
            <StatsCounter
              value={98}
              label="Would Recommend"
              suffix="%"
              icon={<Heart />}
              color="cyan"
            />
          </NeonGlassCard>
        </div>
      </section>

      {/* Community Feed Preview */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="goldCyan">See What's Happening</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Real-time celebrations from our community
          </p>
        </motion.div>

        <div className="space-y-4">
          {communityFeed.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <NeonGlassCard variant="default" hover>
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{
                      backgroundColor: landingColors.goldGlow,
                      color: landingColors.gold,
                    }}
                  >
                    {post.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <p style={{ color: landingColors.textPrimary }}>
                      <strong>{post.name}</strong>{' '}
                      <span style={{ color: landingColors.textSecondary }}>{post.action}</span>
                    </p>
                    <p className="text-sm" style={{ color: landingColors.textMuted }}>
                      {post.time}
                    </p>
                  </div>

                  {/* Reactions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Heart className="w-5 h-5" style={{ color: landingColors.gold }} />
                    <span className="font-bold" style={{ color: landingColors.gold }}>
                      {post.reactions}
                    </span>
                  </div>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText variant="goldCyan">A Safe Space for Young Creators</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Your safety and growth are our top priorities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeonGlassCard variant={index % 2 === 0 ? 'gold' : 'cyan'}>
                <div className="text-center">
                  <div
                    className="mb-4 inline-block"
                    style={{ color: index % 2 === 0 ? landingColors.gold : landingColors.cyan }}
                  >
                    {signal.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: landingColors.textPrimary }}>
                    {signal.title}
                  </h3>
                  <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                    {signal.description}
                  </p>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <NeonGlassCard variant="gradient" glow>
            <div className="text-5xl mb-6">🤝</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText variant="goldCyan">You're Not Alone in This</GradientText>
            </h2>
            <p className="text-xl mb-8" style={{ color: landingColors.textSecondary }}>
              Join a supportive community of 10,000+ young creators who lift each other up.
              Find your people. Learn your craft. Build your future.
            </p>
            <GradientButton to="/signup" size="lg" className="text-lg">
              Join the Community Free →
            </GradientButton>
            <p className="text-sm mt-4" style={{ color: landingColors.textMuted }}>
              Free forever • Safe environment • Parent approved • Ages 13+
            </p>
          </NeonGlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t" style={{ borderColor: landingColors.bgCard }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: landingColors.textMuted }}>
          <p>&copy; 2024 Lumora. Building a community of creators, together.</p>
        </div>
      </footer>
    </div>
  );
}
