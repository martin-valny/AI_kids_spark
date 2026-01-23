import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Target } from 'lucide-react';
import VaporBackground from '@/components/effects/VaporBackground';
import NeonGlassCard from '@/components/ui/NeonGlassCard';
import GradientText from '@/components/ui/GradientText';
import { GradientButton } from '@/components/ui/GradientButton';
import { landingColors } from '@/constants/landingColors';

/**
 * Creative/Bold Landing Page Variation
 *
 * Theme: "Behance meets TikTok" - Portfolio-first, visually striking
 * Color: Magenta dominant (60%) with Gold (25%) and Cyan accents (15%)
 * Target: Artistic, visual learners who want to create amazing things
 */
export default function CreativeBold() {
  const portfolioItems = [
    { type: 'Video', title: 'AI Music Video', creator: 'Sarah M.', earning: '$250' },
    { type: 'Music', title: 'Lo-fi Beats Album', creator: 'Marcus T.', earning: '$180' },
    { type: 'Writing', title: 'Sci-Fi Short Story', creator: 'Alex K.', earning: '$95' },
    { type: 'Video', title: 'Product Review', creator: 'Jordan L.', earning: '$320' },
    { type: 'Automation', title: 'Social Media Bot', creator: 'Taylor R.', earning: '$400' },
    { type: 'Music', title: 'Game Soundtrack', creator: 'Chris P.', earning: '$500' },
    { type: 'Writing', title: 'Blog Content Pack', creator: 'Sam D.', earning: '$150' },
    { type: 'Video', title: 'Tutorial Series', creator: 'Jamie W.', earning: '$600' },
  ];

  const learningPath = [
    { step: 'Start', icon: '🚀', label: 'Begin Your Journey' },
    { step: 'Learn', icon: '📚', label: 'Foundations (45 min)' },
    { step: 'Choose', icon: '🎯', label: 'Pick Your Domain' },
    { step: 'Create', icon: '✨', label: 'Build 3 Projects' },
    { step: 'Earn', icon: '💰', label: 'Start Monetizing' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Vapor gradient background - magenta dominant */}
      <VaporBackground variant="magenta" intensity="strong" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div style={{ color: landingColors.textPrimary }} className="text-2xl font-bold">
          <GradientText variant="magentaPurple" as="span">Lumora</GradientText>
        </div>
        <GradientButton to="/signup" className="hidden md:inline-block">
          Start Creating Now
        </GradientButton>
      </nav>

      {/* Hero Section - Full bleed visual */}
      <section className="relative z-10 px-6 pt-12 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            <GradientText variant="magentaPurple" as="div" className="mb-4">
              Create.
            </GradientText>
            <GradientText variant="goldCyan" as="div" className="mb-4">
              Share.
            </GradientText>
            <GradientText variant="cyber" as="div">
              Earn.
            </GradientText>
          </h1>

          <p
            className="text-2xl mb-12 max-w-2xl mx-auto"
            style={{ color: landingColors.textSecondary }}
          >
            Transform your ideas into stunning AI-powered creations. No limits, no boring tutorials—just pure creativity.
          </p>

          <GradientButton to="/signup" size="lg" className="text-xl px-12 py-6">
            Start Creating Now →
          </GradientButton>
        </motion.div>

        {/* Portfolio preview grid - Below hero */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {portfolioItems.slice(0, 8).map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <NeonGlassCard
                variant={index % 4 === 0 ? 'magenta' : index % 4 === 1 ? 'gold' : index % 4 === 2 ? 'purple' : 'cyan'}
                glow
              >
                <div className="aspect-square flex flex-col items-center justify-center p-4">
                  <div
                    className="text-sm font-bold mb-2 px-2 py-1 rounded"
                    style={{
                      backgroundColor: landingColors.magentaGlow,
                      color: landingColors.magenta,
                    }}
                  >
                    {item.type}
                  </div>
                  <h3
                    className="font-bold text-center mb-2"
                    style={{ color: landingColors.textPrimary }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                    by {item.creator}
                  </p>
                  <div
                    className="text-lg font-bold mt-2"
                    style={{ color: landingColors.gold }}
                  >
                    {item.earning}
                  </div>
                </div>
              </NeonGlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bold Impact Stats */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <Sparkles className="w-16 h-16 mx-auto" style={{ color: landingColors.magenta }} />
              </div>
              <div className="text-7xl md:text-8xl font-black mb-4">
                <GradientText variant="magentaPurple">500+</GradientText>
              </div>
              <p className="text-xl" style={{ color: landingColors.textSecondary }}>
                Student Projects Created
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4">
                <TrendingUp className="w-16 h-16 mx-auto" style={{ color: landingColors.gold }} />
              </div>
              <div className="text-7xl md:text-8xl font-black mb-4">
                <GradientText variant="goldCyan">$50K+</GradientText>
              </div>
              <p className="text-xl" style={{ color: landingColors.textSecondary }}>
                Total Earnings by Students
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-4">
                <Target className="w-16 h-16 mx-auto" style={{ color: landingColors.purple }} />
              </div>
              <div className="text-7xl md:text-8xl font-black mb-4">
                <GradientText variant="cyber">4</GradientText>
              </div>
              <p className="text-xl" style={{ color: landingColors.textSecondary }}>
                Creative Domains Mastered
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Path Visualization */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <GradientText variant="magentaPurple">Your Creative Journey</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            From zero to earning in 5 simple steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-1 hidden md:block"
            style={{
              background: `linear-gradient(90deg, ${landingColors.magenta}, ${landingColors.gold})`,
            }}
          />

          {/* Steps */}
          <div className="grid md:grid-cols-5 gap-8 relative">
            {learningPath.map((item, index) => (
              <motion.div
                key={item.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeonGlassCard
                  variant={index % 2 === 0 ? 'magenta' : 'gold'}
                  className="mb-4 w-24 h-24 flex items-center justify-center"
                  glow
                >
                  <div className="text-4xl">{item.icon}</div>
                </NeonGlassCard>
                <h3 className="font-bold text-lg mb-1" style={{ color: landingColors.textPrimary }}>
                  {item.step}
                </h3>
                <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <GradientText variant="goldCyan">See What You'll Create</GradientText>
          </h2>
          <p className="text-xl" style={{ color: landingColors.textSecondary }}>
            Real projects from students just like you
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Video', 'Music', 'Writing', 'Automation'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-medium transition-all"
              style={{
                backgroundColor: filter === 'All' ? landingColors.magentaGlow : landingColors.bgCard,
                color: filter === 'All' ? landingColors.magenta : landingColors.textSecondary,
                border: `1px solid ${filter === 'All' ? landingColors.magenta : landingColors.bgCard}`,
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <NeonGlassCard variant="magenta" hover>
                <div className="aspect-video flex items-center justify-center mb-4 rounded-lg" style={{ backgroundColor: landingColors.bgDark }}>
                  <div className="text-6xl opacity-50">
                    {item.type === 'Video' ? '🎬' : item.type === 'Music' ? '🎵' : item.type === 'Writing' ? '✍️' : '⚡'}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: landingColors.textPrimary }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                      by {item.creator}
                    </p>
                  </div>
                  <div className="font-bold" style={{ color: landingColors.gold }}>
                    {item.earning}
                  </div>
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
            <div className="text-5xl mb-6">✨</div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <GradientText variant="magentaPurple">
                Ready to Create Something Amazing?
              </GradientText>
            </h2>
            <p className="text-xl mb-8" style={{ color: landingColors.textSecondary }}>
              Join the creative revolution. No experience needed—just bring your ideas and we'll teach you the rest.
            </p>
            <GradientButton to="/signup" size="lg" className="text-lg">
              Start Your Creative Journey →
            </GradientButton>
            <p className="text-sm mt-4" style={{ color: landingColors.textMuted }}>
              100% free to start • Build unlimited projects • Monetize whenever you're ready
            </p>
          </NeonGlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t" style={{ borderColor: landingColors.bgCard }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: landingColors.textMuted }}>
          <p>&copy; 2024 Lumora. Where creativity meets AI.</p>
        </div>
      </footer>
    </div>
  );
}
