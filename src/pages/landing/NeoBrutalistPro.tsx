import { motion } from 'framer-motion';
import { ArrowRight, Zap, Film, PenTool, Music, Bot, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import BrutalistWorkPlaceholder from '@/components/placeholders/BrutalistWorkPlaceholder';
import BrutalistUIPlaceholder from '@/components/placeholders/BrutalistUIPlaceholder';
import BrutalistAvatar from '@/components/placeholders/BrutalistAvatar';
import { neoBrutalist } from '@/constants/landingColors';

/**
 * Neo-Brutalist Pro - Award-Winning Design
 *
 * Enhanced with trust elements, social proof, and platform transparency
 * while maintaining the bold brutalist aesthetic
 */

// Glitch animation variants
const glitchIn = {
  hidden: { opacity: 0, x: -20, skewX: -5 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.3, ease: 'steps(8)' },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Scanline overlay
function Scanline() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 opacity-10"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191,255,0,0.3) 2px, rgba(191,255,0,0.3) 4px)',
      }}
      animate={{ y: ['0vh', '100vh'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// Glitching text component
function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 10000); // Glitch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`transition-all duration-100 ${isGlitching ? 'translate-x-1 text-red-500 skew-x-3' : ''} ${className}`}
    >
      {children}
    </span>
  );
}

export default function NeoBrutalistPro() {
  return (
    <div className="bg-black text-white font-mono overflow-x-hidden">
      <Scanline />

      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-40 px-6 py-4"
        style={{
          backgroundColor: neoBrutalist.black,
          borderBottom: `4px solid ${neoBrutalist.lime}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold" style={{ color: neoBrutalist.lime }}>
            LUMORA
          </div>
          <button
            className="px-6 py-3 font-bold uppercase"
            style={{
              backgroundColor: neoBrutalist.lime,
              color: neoBrutalist.black,
              border: `4px solid ${neoBrutalist.lime}`,
            }}
          >
            START FREE
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase mb-8 leading-none"
            style={{ color: neoBrutalist.white }}
            initial="hidden"
            animate="visible"
            variants={glitchIn}
          >
            <GlitchText>STOP SCROLLING.</GlitchText>
            <br />
            <span style={{ color: neoBrutalist.lime }}>START CREATING.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl uppercase"
            style={{ color: neoBrutalist.white }}
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            Master AI tools. Build real projects. Make actual money.
            <br />
            No fluff. No BS. Just results.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <button
              className="px-8 py-5 text-lg font-bold uppercase flex items-center justify-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform"
              style={{
                backgroundColor: neoBrutalist.lime,
                color: neoBrutalist.black,
                border: `4px solid ${neoBrutalist.lime}`,
              }}
            >
              GET STARTED FREE
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              className="px-8 py-5 text-lg font-bold uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform"
              style={{
                backgroundColor: neoBrutalist.black,
                color: neoBrutalist.lime,
                border: `4px solid ${neoBrutalist.lime}`,
              }}
            >
              VIEW COURSES
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div
        className="py-4 overflow-hidden"
        style={{ backgroundColor: neoBrutalist.lime }}
      >
        <motion.div
          className="flex gap-12 text-2xl font-bold uppercase whitespace-nowrap"
          style={{ color: neoBrutalist.black }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>LEARN AI</span>
              <span>•</span>
              <span>BUILD PROJECTS</span>
              <span>•</span>
              <span>MAKE MONEY</span>
              <span>•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '45', label: 'LESSONS' },
            { value: '$150', label: 'AVG EARNINGS' },
            { value: '98%', label: 'SUCCESS RATE' },
            { value: '30', label: 'DAYS TO MONEY' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 text-center"
              style={{
                backgroundColor: neoBrutalist.black,
                border: `4px solid ${neoBrutalist.lime}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="text-5xl md:text-6xl font-bold mb-2"
                style={{ color: neoBrutalist.lime }}
              >
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Student Showcase Section */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.black }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold text-center mb-4 uppercase"
            style={{ color: neoBrutalist.lime }}
          >
            REAL STUDENTS. REAL PROJECTS. REAL MONEY.
          </h2>
          <p className="text-center text-xl mb-12 uppercase" style={{ color: neoBrutalist.white }}>
            No fake testimonials. No stock photos. Just Gen Z creators crushing it.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <BrutalistWorkPlaceholder
              type="video"
              name="SARAH CHEN, 17"
              location="LOS ANGELES, CA"
              achievement="EARNED $2,150"
              detail="EDITING YOUTUBE VIDEOS"
            />

            <BrutalistWorkPlaceholder
              type="music"
              name="MARCUS JOHNSON, 19"
              location="ATLANTA, GA"
              achievement="PRODUCED FIRST BEAT"
              detail="IN 1 WEEK"
            />

            <BrutalistWorkPlaceholder
              type="writing"
              name="JASMINE LEE, 16"
              location="NEW YORK, NY"
              achievement="10,000 READS"
              detail="ON PUBLISHED STORY"
            />
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center">
            MASTER 4 CREATIVE DOMAINS
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Film, title: 'AI VIDEO EDITING', desc: 'YouTube, TikTok, Reels' },
              { icon: Music, title: 'AI MUSIC PRODUCTION', desc: 'Beats, tracks, royalties' },
              { icon: PenTool, title: 'AI CONTENT WRITING', desc: 'Blogs, scripts, copy' },
              { icon: Bot, title: 'AI AUTOMATION', desc: 'Tools, bots, systems' },
            ].map((domain, i) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={i}
                  className="p-8 group hover:translate-x-1 hover:-translate-y-1 transition-transform"
                  style={{
                    backgroundColor: neoBrutalist.black,
                    border: `4px solid ${neoBrutalist.lime}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-12 h-12 mb-4" style={{ color: neoBrutalist.lime }} />
                  <h3 className="text-xl font-bold mb-2 uppercase">{domain.title}</h3>
                  <p className="text-sm uppercase" style={{ color: neoBrutalist.white }}>
                    {domain.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW: Platform Transparency Section */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.black }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold text-center mb-16 uppercase"
            style={{ color: neoBrutalist.lime }}
          >
            SEE THE ACTUAL PLATFORM. NO PHOTOSHOP MOCKUPS.
          </h2>

          {/* Lesson Interface */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <BrutalistUIPlaceholder section="lesson" />
            <div>
              <h3 className="text-4xl font-bold mb-6 uppercase" style={{ color: neoBrutalist.white }}>
                LESSONS FEEL LIKE NETFLIX
              </h3>
              <ul className="space-y-4 text-xl uppercase">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>BITE-SIZED VIDEOS</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>TRACK YOUR PROGRESS</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>LEARN AT YOUR PACE</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>MOBILE-FRIENDLY</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Editor Interface */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-bold mb-6 uppercase" style={{ color: neoBrutalist.white }}>
                AI EDITOR BUILT FOR CREATORS
              </h3>
              <ul className="space-y-4 text-xl uppercase">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>PRO-LEVEL TOOLS</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>NO DOWNLOADS REQUIRED</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>REAL-TIME AI HELP</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: neoBrutalist.lime }} />
                  <span>EXPORT IN 4K</span>
                </li>
              </ul>
            </div>
            <BrutalistUIPlaceholder section="editor" className="order-1 md:order-2" />
          </div>
        </div>
      </section>

      {/* Anti-Features */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.lime }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center"
            style={{ color: neoBrutalist.black }}
          >
            NOT ANOTHER BORING COURSE
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6 uppercase flex items-center gap-3" style={{ color: neoBrutalist.black }}>
                <X className="w-8 h-8" /> NOT THIS
              </h3>
              <ul className="space-y-4 text-lg uppercase" style={{ color: neoBrutalist.black }}>
                <li>• Boring video lectures</li>
                <li>• Theory without practice</li>
                <li>• No real skills gained</li>
                <li>• Generic certificates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6 uppercase flex items-center gap-3" style={{ color: neoBrutalist.black }}>
                <Check className="w-8 h-8" /> NOW THIS
              </h3>
              <ul className="space-y-4 text-lg uppercase" style={{ color: neoBrutalist.black }}>
                <li>• Build real projects</li>
                <li>• Launch actual products</li>
                <li>• Earn real money</li>
                <li>• Portfolio that matters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Expanded Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center">
            TESTIMONIALS FROM STUDENTS
            <br />
            <span style={{ color: neoBrutalist.lime }}>WHO ACTUALLY MADE MONEY</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="p-8"
              style={{
                backgroundColor: neoBrutalist.black,
                border: `8px solid ${neoBrutalist.lime}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BrutalistAvatar initials="JK" size="large" />
              <p className="text-xl my-6 uppercase">
                "I built automation tools that companies pay $500+ for. Lumora changed my career at 19."
              </p>
              <p className="font-bold uppercase mb-1">JORDAN KIM, 19</p>
              <p className="text-sm uppercase mb-4" style={{ color: neoBrutalist.mediumGray }}>
                SEATTLE, WA
              </p>
              <div
                className="inline-block px-4 py-2 text-sm font-bold uppercase"
                style={{
                  backgroundColor: neoBrutalist.lime,
                  color: neoBrutalist.black,
                }}
              >
                💰 $500+ PER AUTOMATION
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="p-8"
              style={{
                backgroundColor: neoBrutalist.black,
                border: `8px solid ${neoBrutalist.lime}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <BrutalistAvatar initials="SM" size="large" />
              <p className="text-xl my-6 uppercase">
                "Made $2,000 in 3 months editing YouTube videos. Started with zero skills."
              </p>
              <p className="font-bold uppercase mb-1">SARAH MARTINEZ, 17</p>
              <p className="text-sm uppercase mb-4" style={{ color: neoBrutalist.mediumGray }}>
                MIAMI, FL
              </p>
              <div
                className="inline-block px-4 py-2 text-sm font-bold uppercase"
                style={{
                  backgroundColor: neoBrutalist.lime,
                  color: neoBrutalist.black,
                }}
              >
                🎬 50+ VIDEOS EDITED
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="p-8"
              style={{
                backgroundColor: neoBrutalist.black,
                border: `8px solid ${neoBrutalist.lime}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <BrutalistAvatar initials="AC" size="large" />
              <p className="text-xl my-6 uppercase">
                "Released my first beat in 1 week. Now I'm a music producer with clients."
              </p>
              <p className="font-bold uppercase mb-1">ALEX CHEN, 18</p>
              <p className="text-sm uppercase mb-4" style={{ color: neoBrutalist.mediumGray }}>
                SAN FRANCISCO, CA
              </p>
              <div
                className="inline-block px-4 py-2 text-sm font-bold uppercase"
                style={{
                  backgroundColor: neoBrutalist.lime,
                  color: neoBrutalist.black,
                }}
              >
                🎵 MUSIC PRODUCER
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6" style={{ backgroundColor: neoBrutalist.black }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-bold mb-16 uppercase text-center"
            style={{ color: neoBrutalist.lime }}
          >
            YOUR PATH TO SUCCESS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'LEARN', desc: '45 bite-sized lessons. Master AI tools fast.' },
              { step: '02', title: 'BUILD', desc: 'Create 3 portfolio projects. Real work, not theory.' },
              { step: '03', title: 'EARN', desc: 'Land clients or freelance. Build skills worth $150+/project.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-6xl font-bold mb-4"
                  style={{ color: neoBrutalist.lime }}
                >
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold mb-4 uppercase">{item.title}</h3>
                <p className="text-lg uppercase">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Trust Signals */}
      <section
        className="py-12 px-6"
        style={{ borderTop: `8px solid ${neoBrutalist.lime}`, borderBottom: `8px solid ${neoBrutalist.lime}` }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            'FREE TO START',
            'NO CREDIT CARD',
            'CANCEL ANYTIME',
            'SAFE COMMUNITY',
          ].map((text, i) => (
            <div key={i}>
              <div className="text-4xl mb-2" style={{ color: neoBrutalist.lime }}>✓</div>
              <p className="font-bold uppercase text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase">
            <GlitchText>READY TO STOP WAITING?</GlitchText>
          </h2>

          <p className="text-2xl mb-12 uppercase">
            JOIN 10,000+ CREATORS BUILDING THE FUTURE
          </p>

          <button
            className="px-12 py-6 text-2xl font-bold uppercase hover:translate-x-2 hover:-translate-y-2 transition-transform inline-flex items-center gap-4"
            style={{
              backgroundColor: neoBrutalist.lime,
              color: neoBrutalist.black,
              border: `4px solid ${neoBrutalist.lime}`,
            }}
          >
            START NOW FOR FREE
            <ArrowRight className="w-8 h-8" />
          </button>

          <p className="text-sm mt-6 uppercase" style={{ color: neoBrutalist.mediumGray }}>
            NO CREDIT CARD. NO FLUFF. JUST START.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: `4px solid ${neoBrutalist.lime}` }}
      >
        <p className="text-sm uppercase" style={{ color: neoBrutalist.mediumGray }}>
          © 2024 LUMORA. NEO-BRUTALIST PRO DESIGN.
        </p>
      </footer>
    </div>
  );
}
