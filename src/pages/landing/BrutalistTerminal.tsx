import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Film, PenTool, Music, Bot, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/**
 * BRUTALIST TERMINAL - Landing Page Variation
 *
 * Theme: Retro hacker / CRT terminal aesthetic
 * Colors: Black screen + phosphor green + amber accents
 * Vibe: Command line interface, Matrix vibes, 1980s computing
 *
 * Design DNA:
 * - CRT scan lines and screen curvature
 * - Monospace everything
 * - Typing animations
 * - Blinking cursors
 * - ASCII art elements
 * - Green-on-black terminal look
 * - DOS/Unix command prompts
 */

const term = {
  black: '#0a0a0a',
  blackLight: '#121212',
  green: '#00ff00',
  greenDim: '#00aa00',
  greenDark: '#006600',
  amber: '#ffaa00',
  white: '#cccccc',
  gray: '#666666',
};

// CRT screen effect overlay
function CRTOverlay() {
  return (
    <>
      {/* Scan lines */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.08]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      {/* Screen flicker */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        style={{ backgroundColor: term.green }}
        animate={{ opacity: [0, 0.02, 0, 0.01, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 + Math.random() * 5 }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
}

// Typing animation component
function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    if (cursor) {
      const interval = setInterval(() => setShowCursor((s) => !s), 530);
      return () => clearInterval(interval);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>}
    </span>
  );
}

// Command prompt component
function CommandLine({
  command,
  output,
  delay = 0,
}: {
  command: string;
  output?: string[];
  delay?: number;
}) {
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowOutput(true), delay + command.length * 50 + 500);
    return () => clearTimeout(timeout);
  }, [delay, command.length]);

  return (
    <div className="font-mono text-sm md:text-base mb-4">
      <div className="flex items-center gap-2">
        <span style={{ color: term.green }}>lumora@gen-z</span>
        <span style={{ color: term.white }}>:</span>
        <span style={{ color: term.amber }}>~</span>
        <span style={{ color: term.white }}>$</span>
        <TypeWriter text={command} delay={delay} cursor={!showOutput} />
      </div>
      {showOutput && output && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 pl-4 border-l-2"
          style={{ borderColor: term.greenDark }}
        >
          {output.map((line, i) => (
            <div key={i} style={{ color: term.greenDim }}>
              {line}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ASCII art logo
function ASCIILogo() {
  const logo = `
██╗     ██╗   ██╗███╗   ███╗ ██████╗ ██████╗  █████╗
██║     ██║   ██║████╗ ████║██╔═══██╗██╔══██╗██╔══██╗
██║     ██║   ██║██╔████╔██║██║   ██║██████╔╝███████║
██║     ██║   ██║██║╚██╔╝██║██║   ██║██╔══██╗██╔══██║
███████╗╚██████╔╝██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║
╚══════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
  `.trim();

  return (
    <pre
      className="text-[6px] sm:text-[8px] md:text-xs leading-none font-mono"
      style={{ color: term.green }}
    >
      {logo}
    </pre>
  );
}

// Terminal window component
function TerminalWindow({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-2 ${className}`}
      style={{ borderColor: term.green, backgroundColor: term.black }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: term.green, backgroundColor: term.blackLight }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: term.amber }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: term.greenDim }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: term.green }} />
          </div>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider" style={{ color: term.green }}>
          {title}
        </span>
        <div className="w-16" />
      </div>
      {/* Content */}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

// Progress bar component
function TerminalProgress({ label, value }: { label: string; value: number }) {
  const filled = Math.round(value / 5);
  const empty = 20 - filled;

  return (
    <div className="font-mono text-sm flex items-center gap-4">
      <span style={{ color: term.green }} className="w-24">
        {label}
      </span>
      <span style={{ color: term.greenDim }}>
        [{'█'.repeat(filled)}{'░'.repeat(empty)}]
      </span>
      <span style={{ color: term.amber }}>{value}%</span>
    </div>
  );
}

// Stat display component
function TerminalStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border p-4 text-center" style={{ borderColor: term.greenDark }}>
      <div className="font-mono text-3xl md:text-5xl font-bold" style={{ color: term.green }}>
        {value}
      </div>
      <div className="font-mono text-xs uppercase tracking-wider mt-2" style={{ color: term.greenDim }}>
        {label}
      </div>
    </div>
  );
}

export default function BrutalistTerminal() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setBootComplete(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const domains = [
    { cmd: 'video', name: 'AI Video Editing', desc: 'Edit viral content with CapCut AI', lessons: 12 },
    { cmd: 'music', name: 'AI Music Production', desc: 'Produce tracks with Suno/Udio', lessons: 10 },
    { cmd: 'write', name: 'AI Content Writing', desc: 'Generate copy with ChatGPT', lessons: 11 },
    { cmd: 'auto', name: 'AI Automation', desc: 'Build bots with Make.com', lessons: 12 },
  ];

  return (
    <div className="min-h-screen font-mono" style={{ backgroundColor: term.black, color: term.green }}>
      <CRTOverlay />

      {/* Boot sequence overlay */}
      {!bootComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ backgroundColor: term.black }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-2xl w-full">
            <div className="text-sm mb-4" style={{ color: term.greenDim }}>
              LUMORA BIOS v2.024
            </div>
            <CommandLine
              command="./init_creative_ai.sh"
              output={[
                'Loading modules...',
                '> video_editing.mod [OK]',
                '> music_production.mod [OK]',
                '> content_writing.mod [OK]',
                '> automation.mod [OK]',
                '',
                'System ready. Welcome to LUMORA.',
              ]}
              delay={500}
            />
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="border-b-2 sticky top-0 z-40" style={{ borderColor: term.green, backgroundColor: term.black }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2">
            <Terminal className="w-5 h-5" style={{ color: term.green }} />
            <span className="font-bold tracking-tight">LUMORA_</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/lessons" className="hover:underline" style={{ color: term.greenDim }}>
              ./courses
            </Link>
            <Link to="/projects" className="hover:underline" style={{ color: term.greenDim }}>
              ./projects
            </Link>
            <Link
              to="/lessons"
              className="px-4 py-2 border transition-colors hover:bg-green-500/10"
              style={{ borderColor: term.green }}
            >
              ./start --free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bootComplete ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-8">
              <ASCIILogo />
            </div>

            <TerminalWindow title="main.sh" className="max-w-4xl mb-8">
              <CommandLine
                command="cat ./mission.txt"
                output={[
                  '',
                  '  ╔══════════════════════════════════════════════════════════════╗',
                  '  ║                                                              ║',
                  '  ║   LEARN AI. SHIP REAL WORK. OPEN NEW OPPORTUNITIES.         ║',
                  '  ║                                                              ║',
                  '  ║   The creative AI platform for Gen Z (ages 16+)             ║',
                  '  ║   > 45+ lessons across 4 domains                            ║',
                  '  ║   > Real projects, real skills, real money                  ║',
                  '  ║   > No fluff. No theory. Just results.                      ║',
                  '  ║                                                              ║',
                  '  ╚══════════════════════════════════════════════════════════════╝',
                  '',
                ]}
                delay={bootComplete ? 0 : 3000}
              />

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lessons"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 transition-all hover:bg-green-500/20"
                  style={{ borderColor: term.green, color: term.green }}
                >
                  $ ./start_learning.sh <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 transition-all hover:bg-amber-500/10"
                  style={{ borderColor: term.amber, color: term.amber }}
                >
                  $ ./view_projects.sh
                </Link>
              </div>
            </TerminalWindow>

            {/* Quick stats as terminal output */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              <TerminalStat value="45+" label="Lessons" />
              <TerminalStat value="$150" label="Avg/Project" />
              <TerminalStat value="98%" label="Success" />
              <TerminalStat value="30" label="Days" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domains Section - As menu options */}
      <section className="py-16 px-4 border-y-2" style={{ borderColor: term.greenDark }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span style={{ color: term.greenDim }}>// SELECT_DOMAIN</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              AVAILABLE MODULES:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {domains.map((domain, i) => (
              <motion.div
                key={domain.cmd}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/lessons"
                  className="block border-2 p-6 transition-all hover:border-amber-500"
                  style={{ borderColor: term.greenDark }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${term.green}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: term.amber }}>{`[${i + 1}]`}</span>
                    <span className="font-bold text-xl">{domain.name}</span>
                  </div>
                  <div className="text-sm mb-4" style={{ color: term.greenDim }}>
                    {domain.desc}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: term.gray }}>
                      $ lumora install {domain.cmd}
                    </span>
                    <span style={{ color: term.amber }}>
                      {domain.lessons} lessons
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <TerminalWindow title="student_progress.log">
            <div className="mb-6" style={{ color: term.greenDim }}>
              // AVERAGE STUDENT JOURNEY
            </div>
            <div className="space-y-4">
              <TerminalProgress label="WEEK 1" value={25} />
              <TerminalProgress label="WEEK 2" value={50} />
              <TerminalProgress label="WEEK 3" value={75} />
              <TerminalProgress label="WEEK 4" value={100} />
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: term.greenDark }}>
              <span style={{ color: term.amber }}>OUTPUT:</span>
              <span style={{ color: term.green }}> Portfolio complete. Ready to earn.</span>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4" style={{ backgroundColor: term.blackLight }}>
        <div className="max-w-4xl mx-auto">
          <TerminalWindow title="testimonial.txt">
            <div style={{ color: term.greenDim }}>
              {'>'} cat ./reviews/verified_student_001.txt
            </div>
            <div className="mt-4 pl-4 border-l-2" style={{ borderColor: term.amber }}>
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                "I went from copying code from Stack Overflow to building
                automation tools that companies pay $500+ for.
                <span style={{ color: term.amber }}> In 6 weeks.</span>"
              </p>
              <div className="text-sm" style={{ color: term.greenDim }}>
                -- jordan_kim (age: 19, role: "Freelance AI Specialist", earned: $4200)
              </div>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 border-t-2" style={{ borderColor: term.green }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="text-6xl md:text-8xl font-bold" style={{ color: term.green }}>
                {'>'}_
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              READY TO EXECUTE?
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: term.greenDim }}>
              Initialize your creative journey. Free tier available.
              No credit card required. sudo not needed.
            </p>
            <Link
              to="/lessons"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 text-lg font-bold transition-all hover:bg-green-500/20"
              style={{ borderColor: term.green, color: term.green }}
            >
              $ ./start_now.sh --free <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-2" style={{ borderColor: term.greenDark }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div style={{ color: term.gray }}>
            © 2024 LUMORA // PID: 42069 // UPTIME: ∞
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:underline" style={{ color: term.greenDim }}>
              ./privacy
            </Link>
            <Link to="/terms" className="hover:underline" style={{ color: term.greenDim }}>
              ./terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
