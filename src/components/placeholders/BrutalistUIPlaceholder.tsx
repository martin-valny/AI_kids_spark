import { motion } from 'framer-motion';

interface BrutalistUIPlaceholderProps {
  section: 'lesson' | 'editor';
  className?: string;
}

/**
 * BrutalistUIPlaceholder - ASCII-art style UI wireframes
 *
 * Lime grid lines, monospace labels, brutalist aesthetic
 */
export default function BrutalistUIPlaceholder({
  section,
  className = '',
}: BrutalistUIPlaceholderProps) {
  const layouts = {
    lesson: (
      <>
        {/* Video player area */}
        <div
          className="mb-4 p-8 flex items-center justify-center font-mono text-sm"
          style={{
            border: '4px solid #BFFF00',
            backgroundColor: '#0a0a0a',
            aspectRatio: '16/9',
          }}
        >
          <span style={{ color: '#BFFF00' }}>[ VIDEO PLAYER AREA ]</span>
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
          <p className="text-xs font-mono mt-2" style={{ color: '#BFFF00' }}>
            PROGRESS: 35%
          </p>
        </div>

        {/* Content lines */}
        <div className="space-y-2">
          <div
            className="h-3"
            style={{
              backgroundColor: '#1a1a1a',
              width: '80%',
            }}
          />
          <div
            className="h-3"
            style={{
              backgroundColor: '#1a1a1a',
              width: '60%',
            }}
          />
        </div>
      </>
    ),
    editor: (
      <>
        {/* Timeline */}
        <div
          className="mb-4 p-4"
          style={{
            border: '4px solid #BFFF00',
            backgroundColor: '#0a0a0a',
            height: '120px',
          }}
        >
          <div className="flex gap-2 h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgba(191,255,0,0.2)' : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
          <p className="text-xs font-mono mt-2" style={{ color: '#BFFF00' }}>
            [ TIMELINE ]
          </p>
        </div>

        {/* Preview area */}
        <div
          className="p-8 flex items-center justify-center font-mono text-sm"
          style={{
            border: '4px solid #BFFF00',
            backgroundColor: '#0a0a0a',
            aspectRatio: '16/9',
          }}
        >
          <span style={{ color: '#BFFF00' }}>[ CANVAS AREA ]</span>
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
