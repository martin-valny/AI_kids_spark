import { motion } from 'framer-motion';
import { Film, Music, FileText, Zap } from 'lucide-react';

interface StudentWorkPlaceholderProps {
  type: 'video' | 'music' | 'writing' | 'automation';
  size?: 'small' | 'medium' | 'large';
  variant?: 'sketch' | 'wireframe';
}

/**
 * StudentWorkPlaceholder - Elegant placeholder for student project showcases
 *
 * Uses sketch or wireframe aesthetic - intentional design, not "missing image"
 */
export default function StudentWorkPlaceholder({
  type,
  size = 'medium',
  variant = 'sketch',
}: StudentWorkPlaceholderProps) {
  const dimensions = {
    small: { width: 200, height: 150 },
    medium: { width: 400, height: 300 },
    large: { width: 800, height: 450 },
  };

  const icons = {
    video: Film,
    music: Music,
    writing: FileText,
    automation: Zap,
  };

  const labels = {
    video: 'Your AI video',
    music: 'Your music project',
    writing: 'Your writing',
    automation: 'Your automation',
  };

  const Icon = icons[type];
  const { width, height } = dimensions[size];

  const sketchColor = 'rgba(94, 234, 212, 0.3)'; // Teal at 30% opacity
  const wireframeColor = 'rgba(196, 181, 253, 0.2)'; // Purple at 20% opacity
  const borderColor = variant === 'sketch' ? sketchColor : wireframeColor;

  return (
    <motion.div
      className="relative rounded-2xl border overflow-hidden group"
      style={{
        width: size === 'small' ? '100%' : width,
        height,
        maxWidth: '100%',
        borderColor,
        backgroundColor: 'rgba(28, 28, 36, 0.5)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        borderColor: variant === 'sketch' ? '#5eead4' : '#c4b5fd',
        boxShadow: variant === 'sketch'
          ? '0 0 20px rgba(94, 234, 212, 0.3)'
          : '0 0 20px rgba(196, 181, 253, 0.3)',
      }}
      viewport={{ once: true }}
    >
      {/* Background pattern */}
      {variant === 'wireframe' && (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`dots-${type}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#c4b5fd" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${type})`} />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Icon */}
        <motion.div
          animate={{
            rotate: variant === 'sketch' ? [-1, 1, -1] : 0,
          }}
          transition={{
            duration: 3,
            repeat: variant === 'sketch' ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <Icon
            className="w-12 h-12 md:w-16 md:h-16 mb-4"
            style={{
              color: variant === 'sketch' ? '#5eead4' : '#c4b5fd',
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Label */}
        <p
          className="text-sm md:text-base font-medium"
          style={{ color: '#a8a29e' }}
        >
          {labels[type]}
        </p>
        <p
          className="text-xs md:text-sm mt-1"
          style={{ color: '#64748b' }}
        >
          featured here
        </p>

        {/* Sketch lines animation */}
        {variant === 'sketch' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
            <motion.path
              d={`M 20 ${height / 2} Q ${width / 2} ${height / 2 - 20}, ${width - 20} ${height / 2}`}
              stroke="#5eead4"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        )}
      </div>

      {/* Footer label */}
      <div
        className="absolute bottom-0 left-0 right-0 py-2 px-4 text-xs text-center"
        style={{
          backgroundColor: 'rgba(15, 15, 19, 0.8)',
          color: '#64748b',
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        Student Work Showcase
      </div>
    </motion.div>
  );
}
