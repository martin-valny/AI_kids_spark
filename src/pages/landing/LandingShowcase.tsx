import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import VaporBackground from '@/components/effects/VaporBackground';
import NeonGlassCard from '@/components/ui/NeonGlassCard';
import GradientText from '@/components/ui/GradientText';
import { landingColors } from '@/constants/landingColors';

/**
 * Landing Page Showcase Directory
 *
 * Navigation page to preview all 3 landing page variations.
 * Used for user testing to determine which design resonates most with Gen Z.
 */
export default function LandingShowcase() {
  const variations = [
    {
      id: 'tech-professional',
      name: 'Tech/Professional',
      path: '/landing/tech-professional',
      tagline: 'LinkedIn meets Spotify',
      description: 'Data-driven, credibility-focused design that emphasizes earning potential and professional growth.',
      dominantColor: 'cyan',
      colorAccent: landingColors.cyan,
      icon: <TrendingUp className="w-12 h-12" />,
      targetAudience: 'Career-focused Gen Z seeking credibility and income',
      keyFeatures: [
        'Stats-driven metrics',
        'Professional aesthetic',
        'Earning potential highlighted',
        'Hexagonal tech elements',
      ],
    },
    {
      id: 'creative-bold',
      name: 'Creative/Bold',
      path: '/landing/creative-bold',
      tagline: 'Behance meets TikTok',
      description: 'Portfolio-first, visually striking design that puts student work front and center.',
      dominantColor: 'magenta',
      colorAccent: landingColors.magenta,
      icon: <Palette className="w-12 h-12" />,
      targetAudience: 'Artistic, visual learners who want to create amazing things',
      keyFeatures: [
        'Portfolio showcase grid',
        'Bold typography',
        'Visual-first storytelling',
        'Project earnings displayed',
      ],
    },
    {
      id: 'social-community',
      name: 'Social/Community',
      path: '/landing/social-community',
      tagline: 'Discord meets Duolingo',
      description: 'Community-focused, approachable design emphasizing belonging and peer support.',
      dominantColor: 'gold',
      colorAccent: landingColors.gold,
      icon: <Users className="w-12 h-12" />,
      targetAudience: 'Social Gen Z who value community and support',
      keyFeatures: [
        'Testimonial-focused',
        'Community activity feed',
        'Trust & safety signals',
        'Warm, approachable tone',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <VaporBackground variant="mixed" intensity="medium" />

      {/* Header */}
      <header className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-block">
          <GradientText variant="cyber" as="div" className="text-3xl font-bold">
            ← Back to Lumora
          </GradientText>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Intro Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <GradientText variant="cyber">Landing Page Variations</GradientText>
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ color: landingColors.textSecondary }}>
            We're testing 3 unique designs with Gen Z creators (ages 13-25)
          </p>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: landingColors.textMuted }}>
            Each variation targets a different audience segment. Click to explore each design
            and see which resonates most with your vision for Lumora.
          </p>
        </motion.div>

        {/* Variation Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {variations.map((variation, index) => (
            <motion.div
              key={variation.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link to={variation.path} className="block h-full">
                <NeonGlassCard
                  variant={variation.dominantColor as 'cyan' | 'magenta' | 'gold'}
                  glow
                  hover
                  className="h-full flex flex-col"
                >
                  {/* Icon and color indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div style={{ color: variation.colorAccent }}>
                      {variation.icon}
                    </div>
                    <div
                      className="w-16 h-16 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${variation.colorAccent}, ${landingColors.bgDark})`,
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2" style={{ color: landingColors.textPrimary }}>
                    {variation.name}
                  </h2>

                  {/* Tagline */}
                  <p
                    className="text-sm font-medium mb-4 uppercase tracking-wide"
                    style={{ color: variation.colorAccent }}
                  >
                    {variation.tagline}
                  </p>

                  {/* Description */}
                  <p className="mb-6 flex-grow" style={{ color: landingColors.textSecondary }}>
                    {variation.description}
                  </p>

                  {/* Target Audience */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: landingColors.bgDark }}>
                    <p className="text-sm font-medium mb-1" style={{ color: landingColors.textMuted }}>
                      Target Audience:
                    </p>
                    <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                      {variation.targetAudience}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2" style={{ color: landingColors.textMuted }}>
                      Key Features:
                    </p>
                    <ul className="space-y-1">
                      {variation.keyFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm flex items-center gap-2"
                          style={{ color: landingColors.textSecondary }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: variation.colorAccent }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: `${variation.colorAccent}15`,
                      color: variation.colorAccent,
                    }}
                  >
                    <span>Preview Design</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </NeonGlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Testing Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <NeonGlassCard variant="purple" className="max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: landingColors.textPrimary }}>
                <GradientText variant="cyber">User Testing Methodology</GradientText>
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: landingColors.cyan }}>
                    20
                  </div>
                  <p className="font-medium mb-1" style={{ color: landingColors.textPrimary }}>
                    Test Participants
                  </p>
                  <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                    10 ages 13-18, 10 ages 19-25
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: landingColors.magenta }}>
                    ≥70%
                  </div>
                  <p className="font-medium mb-1" style={{ color: landingColors.textPrimary }}>
                    Success Threshold
                  </p>
                  <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                    Positive feedback required to proceed
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: landingColors.gold }}>
                    3
                  </div>
                  <p className="font-medium mb-1" style={{ color: landingColors.textPrimary }}>
                    Design Approaches
                  </p>
                  <p className="text-sm" style={{ color: landingColors.textSecondary }}>
                    Tech, Creative, and Community-focused
                  </p>
                </div>
              </div>
            </div>
          </NeonGlassCard>
        </motion.div>

        {/* Design System Note */}
        <motion.div
          className="mt-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm" style={{ color: landingColors.textMuted }}>
            All variations use Lumora's original design system: Dark-first aesthetic,
            vapor gradients, hexagonal elements, and Gen Z-optimized typography.
            Each variation adapts these elements for different audience motivations.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 mt-20 border-t" style={{ borderColor: landingColors.bgCard }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: landingColors.textMuted }}>
          <p>&copy; 2024 Lumora. Session 1.1: Landing Page Showcase</p>
        </div>
      </footer>
    </div>
  );
}
