import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, Layers, Atom, Newspaper, Terminal, Construction, Star, Palette, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Landing Page Showcase Directory
 *
 * Navigation page to preview all 3 landing page variations.
 * Used for user testing to determine which design resonates most with Gen Z.
 */

const showcase = {
  bg: '#0a0a0f',
  bgCard: '#16161c',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#7c5cff',
};

export default function LandingShowcase() {
  const variations = [
    {
      id: 'neo-brutalist',
      name: 'Neo-Brutalist',
      path: '/landing/neo-brutalist',
      tagline: 'Anti-design meets authenticity',
      description: 'Raw, confrontational design that rejects polish for brutal honesty. Thick borders, monospace type, electric lime accent.',
      color: '#BFFF00',
      icon: <Zap className="w-8 h-8" />,
      targetAudience: 'Gen Z tired of corporate AI aesthetics',
      keyFeatures: [
        'No gradients or glass',
        'Exposed structure',
        'Monospace typography',
        'Glitchy animations',
      ],
    },
    {
      id: 'vapor-studio',
      name: 'Vapor Studio',
      path: '/landing/vapor-studio',
      tagline: 'Music production app aesthetic',
      description: 'Dark DAW-inspired design with vapor gradients, waveform visualizations, and neon accents. Like Ableton meets Spotify.',
      color: '#00d4ff',
      icon: <Sparkles className="w-8 h-8" />,
      targetAudience: 'Creative Gen Z who want professional tool vibes',
      keyFeatures: [
        'Vapor gradient overlays',
        'Waveform animations',
        'Glass panel mixer UI',
        'Cyan/magenta/purple palette',
      ],
    },
    {
      id: 'linear-motion',
      name: 'Linear Motion',
      path: '/landing/linear-motion',
      tagline: 'Linear/Notion/Stripe inspired',
      description: 'Ultra-clean SaaS aesthetic with sophisticated typography, subtle gradients, and refined micro-animations. Premium feel.',
      color: '#7c5cff',
      icon: <Layers className="w-8 h-8" />,
      targetAudience: 'Design-savvy Gen Z who appreciate refined simplicity',
      keyFeatures: [
        'Typography-driven hierarchy',
        'Subtle gradients',
        'Generous whitespace',
        'Micro-animations',
      ],
    },
    {
      id: 'cosmic-data',
      name: 'Cosmic Data',
      path: '/landing/cosmic-data',
      tagline: 'Futuristic data visualization',
      description: 'Dark cosmic aesthetic with 3D particle systems, geometric wireframe sphere, and flowing data waves. Ethereal, tech-forward, mysterious.',
      color: '#8b5cf6',
      icon: <Atom className="w-8 h-8" />,
      targetAudience: 'Tech-savvy Gen Z drawn to futuristic, data-driven aesthetics',
      keyFeatures: [
        '3D particle wave system',
        'Wireframe geometric sphere',
        'Bokeh light effects',
        'Cosmic purple/cyan palette',
      ],
    },
    {
      id: 'brutalist-redline',
      name: 'Redline Tabloid',
      path: '/landing/brutalist-redline',
      tagline: 'Punk zine newspaper aesthetic',
      description: 'Sensationalist tabloid design with newsprint textures, halftone dots, torn paper edges. Headlines scream urgency and authenticity.',
      color: '#e63946',
      icon: <Newspaper className="w-8 h-8" />,
      targetAudience: 'Gen Z who love bold statements and counter-culture vibes',
      keyFeatures: [
        'Newspaper column layouts',
        'Breaking news ticker',
        'Halftone dot textures',
        'Torn paper effects',
      ],
    },
    {
      id: 'brutalist-terminal',
      name: 'Terminal Hacker',
      path: '/landing/brutalist-terminal',
      tagline: 'Retro CRT hacker aesthetic',
      description: 'Green-on-black terminal interface with CRT scan lines, typing animations, and command prompts. Matrix vibes meets 1980s computing.',
      color: '#00ff00',
      icon: <Terminal className="w-8 h-8" />,
      targetAudience: 'Tech-obsessed Gen Z who romanticize hacker culture',
      keyFeatures: [
        'CRT screen effects',
        'Typing animations',
        'Command line interface',
        'ASCII art elements',
      ],
    },
    {
      id: 'brutalist-hazard',
      name: 'Hazard Zone',
      path: '/landing/brutalist-hazard',
      tagline: 'Industrial construction aesthetic',
      description: 'Black and yellow hazard stripes, warning signs, stencil typography. Construction zone energy with blueprint grids and safety iconography.',
      color: '#ffd000',
      icon: <Construction className="w-8 h-8" />,
      targetAudience: 'Gen Z who appreciate industrial, high-visibility aesthetics',
      keyFeatures: [
        'Hazard stripe patterns',
        'Stencil spray-paint type',
        'Warning sign UI',
        'Blueprint grid backgrounds',
      ],
    },
    {
      id: 'y2k-chrome',
      name: 'Y2K Chrome',
      path: '/landing/y2k-chrome',
      tagline: 'Early 2000s nostalgic cyber',
      description: 'Chrome text effects, holographic buttons, floating stars, cursor trails. Nostalgic Y2K futurism that Gen Z ironically loves.',
      color: '#ff69b4',
      icon: <Star className="w-8 h-8" />,
      targetAudience: 'Gen Z who love nostalgic early internet aesthetics',
      keyFeatures: [
        'Chrome metallic text',
        'Holographic gradients',
        'Floating star animations',
        'Bubble glass cards',
      ],
    },
    {
      id: 'aurora-canvas',
      name: 'Aurora Canvas',
      path: '/landing/aurora-canvas',
      tagline: 'Ethereal artist sanctuary',
      description: 'Flowing aurora gradients, organic blob shapes, elegant serif typography. Dreamy, sophisticated creative studio vibe for young artists.',
      color: '#00d4aa',
      icon: <Palette className="w-8 h-8" />,
      targetAudience: 'Creative Gen Z who want a refined, artistic aesthetic',
      keyFeatures: [
        'Flowing aurora backgrounds',
        'Organic blob shapes',
        'Elegant serif typography',
        'Soft glass morphism',
      ],
    },
    {
      id: 'aurora-pro',
      name: 'Aurora Pro',
      path: '/landing/aurora-pro',
      tagline: 'Sophisticated magic dust',
      description: 'Muted teal/purple/rose palette with gentle magic dust particles that drift on scroll. Whisper-light trails create creative energy feel - professional with a touch of magic.',
      color: '#5eead4',
      icon: <Orbit className="w-8 h-8" />,
      targetAudience: 'Professional creators who want sophistication with subtle enchantment',
      keyFeatures: [
        'Gentle scroll-reactive particles',
        'Whisper-light drift trails',
        'Muted teal/purple/rose accents',
        'Crimson Pro + DM Sans typography',
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: showcase.bg }}>
      {/* Header */}
      <header className="px-6 py-8 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: showcase.accent }}
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Lumora
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Intro Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: showcase.text }}>
            Landing Page{' '}
            <span style={{ color: showcase.accent }}>Variations</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ color: showcase.textSecondary }}>
            Testing 10 unique designs with Gen Z creators (ages 13-25)
          </p>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: showcase.textMuted }}>
            Each variation targets a different aesthetic preference. Click to explore each design
            and see which resonates most with your vision for Lumora.
          </p>
        </motion.div>

        {/* Variation Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {variations.map((variation, index) => (
            <motion.div
              key={variation.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={variation.path} className="block h-full group">
                <div
                  className="h-full rounded-2xl border p-8 transition-all duration-300 hover:border-opacity-50"
                  style={{
                    backgroundColor: showcase.bgCard,
                    borderColor: showcase.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = variation.color;
                    e.currentTarget.style.boxShadow = `0 0 40px ${variation.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = showcase.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon and color indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${variation.color}15`,
                        border: `1px solid ${variation.color}30`,
                        color: variation.color,
                      }}
                    >
                      {variation.icon}
                    </div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: variation.color }}
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2" style={{ color: showcase.text }}>
                    {variation.name}
                  </h2>

                  {/* Tagline */}
                  <p
                    className="text-sm font-medium mb-4 uppercase tracking-wide"
                    style={{ color: variation.color }}
                  >
                    {variation.tagline}
                  </p>

                  {/* Description */}
                  <p className="mb-6" style={{ color: showcase.textSecondary }}>
                    {variation.description}
                  </p>

                  {/* Target Audience */}
                  <div
                    className="mb-6 p-4 rounded-xl"
                    style={{ backgroundColor: `${showcase.bg}` }}
                  >
                    <p className="text-sm font-medium mb-1" style={{ color: showcase.textMuted }}>
                      Target Audience:
                    </p>
                    <p className="text-sm" style={{ color: showcase.textSecondary }}>
                      {variation.targetAudience}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <p className="text-sm font-medium mb-3" style={{ color: showcase.textMuted }}>
                      Key Features:
                    </p>
                    <ul className="space-y-2">
                      {variation.keyFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm flex items-center gap-2"
                          style={{ color: showcase.textSecondary }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: variation.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between px-5 py-3 rounded-xl font-medium transition-all group-hover:gap-4"
                    style={{
                      backgroundColor: `${variation.color}10`,
                      color: variation.color,
                    }}
                  >
                    <span>Preview Design</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Testing Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl border p-10"
            style={{ backgroundColor: showcase.bgCard, borderColor: showcase.border }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8" style={{ color: showcase.text }}>
                User Testing Methodology
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#00d4ff' }}>
                    20
                  </div>
                  <p className="font-medium mb-1" style={{ color: showcase.text }}>
                    Test Participants
                  </p>
                  <p className="text-sm" style={{ color: showcase.textSecondary }}>
                    10 ages 13-18, 10 ages 19-25
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#ff006e' }}>
                    ≥70%
                  </div>
                  <p className="font-medium mb-1" style={{ color: showcase.text }}>
                    Success Threshold
                  </p>
                  <p className="text-sm" style={{ color: showcase.textSecondary }}>
                    Positive feedback required to proceed
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#BFFF00' }}>
                    10
                  </div>
                  <p className="font-medium mb-1" style={{ color: showcase.text }}>
                    Design Approaches
                  </p>
                  <p className="text-sm" style={{ color: showcase.textSecondary }}>
                    4 Brutalist + Vapor + Linear + Cosmic + Y2K + 2 Aurora
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Design Philosophy Note */}
        <motion.div
          className="mt-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm" style={{ color: showcase.textMuted }}>
            10 distinct aesthetics: lime brutalist, tabloid punk, hacker terminal, industrial hazard,
            vapor studio, refined SaaS, cosmic data, Y2K chrome nostalgia, aurora canvas, and aurora pro hyperspace. Testing which resonates with Gen Z creators.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 py-12 mt-20 border-t"
        style={{ borderColor: showcase.border }}
      >
        <div className="max-w-7xl mx-auto text-center" style={{ color: showcase.textMuted }}>
          <p>© 2024 Lumora. Landing Page Showcase</p>
        </div>
      </footer>
    </div>
  );
}
