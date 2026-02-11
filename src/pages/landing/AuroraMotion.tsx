import { motion } from 'framer-motion';
import { ArrowRight, Book, DollarSign, Award, Clock, Film, Music, FileText, Zap, Check } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import StatsCounter from '@/components/ui/StatsCounter';
import StudentWorkPlaceholder from '@/components/placeholders/StudentWorkPlaceholder';
import UIScreenshotPlaceholder from '@/components/placeholders/UIScreenshotPlaceholder';
import StudentAvatarPlaceholder from '@/components/placeholders/StudentAvatarPlaceholder';
import AuroraDust from '@/components/effects/AuroraDust';
import { auroraMotion, auroraGradients } from '@/constants/landingColors';

/**
 * Aurora Motion - Hybrid Landing Page
 *
 * Combines Linear Motion's clean structure + Aurora Pro's magic + Warm Coral accent
 * Professional credibility with a whisper of enchantment
 */
export default function AuroraMotion() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: auroraMotion.bg }}
    >
      {/* Magic dust particles */}
      <AuroraDust zone="ambient" />

      {/* Section 1: Hero */}
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto">
        {/* Hero particles concentrated around CTA */}
        <AuroraDust zone="hero" />

        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline with gradient */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: auroraGradients.aurora,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Learn AI. Ship Real Work.
            <br />
            Open New Opportunities.
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl mb-12"
            style={{ color: auroraMotion.textSecondary }}
          >
            The creative AI platform built for Gen Z creators ages 16+.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: auroraGradients.coral,
                boxShadow: `0 0 30px ${auroraMotion.coralGlow}`,
              }}
            >
              Start Learning Free <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>

            <button
              className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                color: auroraMotion.teal,
                border: `2px solid ${auroraMotion.teal}`,
                backgroundColor: 'transparent',
              }}
            >
              View Courses
            </button>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Student Work Showcase */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: auroraMotion.text,
            }}
          >
            See What You'll Create
          </h2>
          <p
            className="text-lg text-center mb-12 max-w-2xl mx-auto"
            style={{ color: auroraMotion.textSecondary }}
          >
            Real projects from students like you. AI-generated videos, music, writing, and automation.
          </p>

          {/* 3 placeholder cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <StudentWorkPlaceholder type="video" size="medium" variant="sketch" />
              <div className="mt-4 text-center">
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Sarah, 17
                </p>
                <p className="text-sm" style={{ color: auroraMotion.teal }}>
                  Earned $2,150
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <StudentWorkPlaceholder type="music" size="medium" variant="sketch" />
              <div className="mt-4 text-center">
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Marcus, 19
                </p>
                <p className="text-sm" style={{ color: auroraMotion.purple }}>
                  First beat produced
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <StudentWorkPlaceholder type="writing" size="medium" variant="sketch" />
              <div className="mt-4 text-center">
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Jasmine, 16
                </p>
                <p className="text-sm" style={{ color: auroraMotion.rose }}>
                  Published story
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Platform Transparency (UI Screenshots) */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto space-y-20">
        {/* Lesson interface */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            <UIScreenshotPlaceholder section="lesson" />
          </div>
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: auroraMotion.text,
              }}
            >
              Lessons That Feel Like Netflix
            </h3>
            <ul className="space-y-4" style={{ color: auroraMotion.textSecondary }}>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.teal }} />
                <span>Bite-sized videos you can watch on your schedule</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.teal }} />
                <span>Track your progress and earn achievements</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.teal }} />
                <span>Learn at your own pace, mobile-friendly</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Editor interface */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="order-2 md:order-1">
            <h3
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: auroraMotion.text,
              }}
            >
              AI Video Editor Built for Creators
            </h3>
            <ul className="space-y-4" style={{ color: auroraMotion.textSecondary }}>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.purple }} />
                <span>Professional-level tools, no downloads required</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.purple }} />
                <span>Real-time AI assistance as you edit</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: auroraMotion.purple }} />
                <span>Export in 4K, ready for YouTube, TikTok, Instagram</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <UIScreenshotPlaceholder section="editor" />
          </div>
        </motion.div>
      </section>

      {/* Section 4: Data & Trust (Stats) */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: auroraMotion.text,
            }}
          >
            Trusted by 10,000+ Creators
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCounter value={45} label="Lessons" icon={<Book />} color="cyan" />
            <StatsCounter value={150} label="Avg. Earnings/Month" prefix="$" icon={<DollarSign />} color="gold" />
            <StatsCounter value={98} label="Success Rate" suffix="%" icon={<Award />} color="purple" />
            <StatsCounter value={4} label="Skill Domains" icon={<Clock />} color="magenta" />
          </div>
        </motion.div>

        {/* Celebration particles for stats */}
        <AuroraDust zone="celebration" />
      </section>

      {/* Section 5: Real Testimonials */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: auroraMotion.text,
            }}
          >
            Real Students, Real Results
          </h2>
          <p
            className="text-lg text-center mb-12 max-w-2xl mx-auto"
            style={{ color: auroraMotion.textSecondary }}
          >
            Don't just take our word for it. Hear from creators who transformed their skills and income.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: auroraMotion.bgCard,
                borderColor: 'rgba(196, 181, 253, 0.2)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <StudentAvatarPlaceholder initials="SK" size="large" colorScheme="teal" />
                <p
                  className="mt-6 mb-4 text-lg italic"
                  style={{ color: auroraMotion.text }}
                >
                  "Lumora changed my life. I went from zero skills to earning $2,150 in just 3 months."
                </p>
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Sarah Kim, 17
                </p>
                <p className="text-sm" style={{ color: auroraMotion.textSecondary }}>
                  Los Angeles, CA
                </p>
                <div
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: auroraGradients.coral,
                    color: 'white',
                  }}
                >
                  💰 Earned $2,150 in 3 months
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: auroraMotion.bgCard,
                borderColor: 'rgba(196, 181, 253, 0.2)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <StudentAvatarPlaceholder initials="MJ" size="large" colorScheme="purple" />
                <p
                  className="mt-6 mb-4 text-lg italic"
                  style={{ color: auroraMotion.text }}
                >
                  "The lessons are so easy to follow. I produced my first beat in just one week!"
                </p>
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Marcus Johnson, 19
                </p>
                <p className="text-sm" style={{ color: auroraMotion.textSecondary }}>
                  Atlanta, GA
                </p>
                <div
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: `${auroraMotion.purple}30`,
                    color: auroraMotion.purple,
                  }}
                >
                  🎵 Music Producer
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: auroraMotion.bgCard,
                borderColor: 'rgba(196, 181, 253, 0.2)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <StudentAvatarPlaceholder initials="JL" size="large" colorScheme="rose" />
                <p
                  className="mt-6 mb-4 text-lg italic"
                  style={{ color: auroraMotion.text }}
                >
                  "I published my first story and it got 10,000 reads! Lumora gave me the confidence to create."
                </p>
                <p className="font-semibold" style={{ color: auroraMotion.text }}>
                  Jasmine Lee, 16
                </p>
                <p className="text-sm" style={{ color: auroraMotion.textSecondary }}>
                  New York, NY
                </p>
                <div
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: `${auroraMotion.rose}30`,
                    color: auroraMotion.rose,
                  }}
                >
                  📖 Published Author
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 6: Footer CTA */}
      <section
        className="relative px-6 py-24 mt-20"
        style={{
          background: `linear-gradient(180deg, ${auroraMotion.bg} 0%, rgba(255,138,92,0.05) 100%)`,
        }}
      >
        <AuroraDust zone="hero" />

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: auroraMotion.text,
            }}
          >
            Ready to Start Your Creative AI Journey?
          </h2>
          <p
            className="text-xl mb-10"
            style={{ color: auroraMotion.textSecondary }}
          >
            Join 10,000+ creators mastering AI and monetizing their creativity.
          </p>

          <button
            className="px-12 py-5 rounded-xl text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: auroraGradients.coral,
              boxShadow: `0 0 40px ${auroraMotion.coralGlow}`,
            }}
          >
            Start Learning Free <ArrowRight className="inline w-6 h-6 ml-2" />
          </button>

          {/* Trust signals */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm" style={{ color: auroraMotion.textMuted }}>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Safe community
            </span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="max-w-7xl mx-auto text-center text-sm" style={{ color: auroraMotion.textMuted }}>
          <p>© 2024 Lumora. Aurora Motion Design.</p>
        </div>
      </footer>
    </div>
  );
}
