import { motion } from 'framer-motion';
import { Film, Music, FileText, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BrutalistWorkPlaceholderProps {
  type: 'video' | 'music' | 'writing' | 'automation';
  name: string;
  location: string;
  achievement: string;
  detail: string;
}

/**
 * BrutalistWorkPlaceholder - Brutalist-styled student work showcase
 *
 * 8px lime borders, monospace text, glitch effects, scanline animation
 */
export default function BrutalistWorkPlaceholder({
  type,
  name,
  location,
  achievement,
  detail,
}: BrutalistWorkPlaceholderProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const icons = {
    video: Film,
    music: Music,
    writing: FileText,
    automation: Zap,
  };

  const labels = {
    video: 'VIDEO PROJECT',
    music: 'MUSIC PROJECT',
    writing: 'WRITING PROJECT',
    automation: 'AUTOMATION PROJECT',
  };

  const Icon = icons[type];

  // Trigger glitch on hover
  const handleGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-black"
      style={{
        border: '8px solid #BFFF00',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={handleGlitch}
    >
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191,255,0,0.1) 2px, rgba(191,255,0,0.1) 4px)',
        }}
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(191,255,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,255,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content area */}
      <div className="relative aspect-video flex items-center justify-center p-8">
        <Icon
          className="w-24 h-24"
          style={{
            color: '#BFFF00',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Info section */}
      <div
        className={`p-6 font-mono transition-all duration-200 ${
          isGlitching ? 'translate-x-1 text-red-500' : ''
        }`}
        style={{
          backgroundColor: '#000000',
          borderTop: '4px solid #BFFF00',
        }}
      >
        <p
          className="text-xs mb-2 tracking-widest"
          style={{ color: '#BFFF00' }}
        >
          [{labels[type]}]
        </p>

        <p className="text-lg font-bold text-white uppercase mb-1">
          {name}
        </p>

        <p className="text-sm text-gray-400 uppercase mb-3">
          {location}
        </p>

        <div
          className="inline-block px-4 py-2 font-bold text-black uppercase text-sm"
          style={{ backgroundColor: '#BFFF00' }}
        >
          {achievement}
        </div>

        <p className="text-xs text-gray-400 uppercase mt-2">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}
