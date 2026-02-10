import { motion } from 'framer-motion';

interface BrutalistUIPlaceholderProps {
  section: 'lesson' | 'editor';
  className?: string;
}

/**
 * BrutalistUIPlaceholder - Wireframe-style UI mockups
 *
 * Lime grid lines, monospace labels, brutalist aesthetic
 * with richer visual representations of the actual platform
 */
export default function BrutalistUIPlaceholder({
  section,
  className = '',
}: BrutalistUIPlaceholderProps) {
  const layouts = {
    lesson: (
      <>
        {/* Video player area - rich mockup */}
        <div
          className="mb-4 relative overflow-hidden font-mono"
          style={{
            border: '4px solid #BFFF00',
            backgroundColor: '#0a0a0a',
            aspectRatio: '16/9',
          }}
        >
          {/* Dark gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
            }}
          />

          {/* Centered play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#BFFF00' }}
            >
              <div
                className="w-0 h-0 ml-1"
                style={{
                  borderLeft: '18px solid #000000',
                  borderTop: '11px solid transparent',
                  borderBottom: '11px solid transparent',
                }}
              />
            </div>
          </div>

          {/* Module label top-left */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase tracking-wider px-2 py-1" style={{ backgroundColor: '#BFFF00', color: '#000' }}>
              MODULE 3
            </span>
          </div>

          {/* Video title */}
          <div className="absolute bottom-0 left-0 right-0 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <p className="text-xs font-bold uppercase" style={{ color: '#BFFF00' }}>
              AI VIDEO EDITING — LESSON 12
            </p>
            <p className="text-[10px] uppercase mt-1" style={{ color: '#666' }}>
              COLOR GRADING WITH AI TOOLS
            </p>
          </div>

          {/* Fake timeline scrubber */}
          <div className="absolute bottom-[52px] left-0 right-0 px-3">
            <div className="h-1 relative" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#BFFF00' }}
                initial={{ width: '0%' }}
                whileInView={{ width: '42%' }}
                transition={{ duration: 2, delay: 0.3 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: '#BFFF00' }}
                initial={{ left: '0%' }}
                whileInView={{ left: '42%' }}
                transition={{ duration: 2, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px]" style={{ color: '#666' }}>5:12</span>
              <span className="text-[9px]" style={{ color: '#666' }}>12:30</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div
            className="h-2 relative overflow-hidden"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: '#BFFF00' }}
              initial={{ width: '0%' }}
              whileInView={{ width: '35%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xs font-mono" style={{ color: '#BFFF00' }}>
              PROGRESS: 35%
            </p>
            <p className="text-xs font-mono" style={{ color: '#666' }}>
              16/45 LESSONS
            </p>
          </div>
        </div>

        {/* Content lines - lesson list */}
        <div className="space-y-2">
          {['INTRO TO AI EDITING', 'TIMELINE BASICS', 'COLOR GRADING'].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-[8px] font-bold"
                style={{
                  backgroundColor: i < 2 ? '#BFFF00' : 'transparent',
                  border: i < 2 ? 'none' : '2px solid #333',
                  color: i < 2 ? '#000' : '#333',
                }}
              >
                {i < 2 ? '✓' : ''}
              </div>
              <div
                className="h-3 flex-1"
                style={{
                  backgroundColor: '#1a1a1a',
                  width: `${90 - i * 10}%`,
                }}
              />
              <span className="text-[9px] font-mono" style={{ color: i < 2 ? '#666' : '#333' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </>
    ),
    editor: (
      <>
        {/* Timeline with clips */}
        <div
          className="mb-4 p-3"
          style={{
            border: '4px solid #BFFF00',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/* Track labels */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-mono w-12" style={{ color: '#BFFF00' }}>VIDEO</span>
            <div className="flex gap-1 flex-1 h-6">
              {[
                { w: '30%', color: 'rgba(191,255,0,0.3)' },
                { w: '20%', color: 'rgba(191,255,0,0.2)' },
                { w: '35%', color: 'rgba(191,255,0,0.25)' },
              ].map((clip, i) => (
                <div key={i} style={{ width: clip.w, backgroundColor: clip.color, border: '1px solid rgba(191,255,0,0.4)' }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-mono w-12" style={{ color: '#666' }}>AUDIO</span>
            <div className="flex gap-1 flex-1 h-6">
              {[
                { w: '45%', color: 'rgba(99,102,241,0.3)' },
                { w: '40%', color: 'rgba(99,102,241,0.2)' },
              ].map((clip, i) => (
                <div key={i} style={{ width: clip.w, backgroundColor: clip.color, border: '1px solid rgba(99,102,241,0.4)' }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono w-12" style={{ color: '#666' }}>FX</span>
            <div className="flex gap-1 flex-1 h-6">
              <div style={{ width: '25%', backgroundColor: 'rgba(236,72,153,0.3)', border: '1px solid rgba(236,72,153,0.4)' }} />
            </div>
          </div>

          {/* Playhead */}
          <motion.div
            className="relative h-px mt-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              className="absolute top-0 w-px h-[80px] -mt-[76px]"
              style={{ backgroundColor: '#BFFF00' }}
              initial={{ left: '0%' }}
              whileInView={{ left: '38%' }}
              transition={{ duration: 2, delay: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Canvas area - with tool sidebar */}
        <div className="flex gap-2">
          {/* Tool sidebar */}
          <div className="flex flex-col gap-2 py-2">
            {['✂', '↔', '◐', '♫', 'Aa'].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center text-xs"
                style={{
                  border: `1px solid ${i === 0 ? '#BFFF00' : '#333'}`,
                  color: i === 0 ? '#BFFF00' : '#666',
                  backgroundColor: i === 0 ? 'rgba(191,255,0,0.1)' : 'transparent',
                }}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Preview canvas */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              border: '4px solid #BFFF00',
              backgroundColor: '#0a0a0a',
              aspectRatio: '16/9',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #0d1117 50%, #1a1a2e 100%)',
              }}
            />

            {/* Preview frame indicator */}
            <div className="absolute inset-4 border border-dashed" style={{ borderColor: 'rgba(191,255,0,0.2)' }} />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono font-bold uppercase" style={{ color: '#BFFF00' }}>
                LUMORA EDITOR
              </span>
            </div>

            {/* Frame counter */}
            <div className="absolute bottom-2 right-2">
              <span className="text-[9px] font-mono" style={{ color: '#666' }}>
                00:12:04 / 30fps
              </span>
            </div>
          </div>
        </div>
      </>
    ),
  };

  return (
    <motion.div
      className={`p-6 bg-black ${className}`}
      style={{
        border: '8px solid #BFFF00',
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(191,255,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,255,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative">{layouts[section]}</div>
    </motion.div>
  );
}
