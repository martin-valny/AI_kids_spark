import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { landingColors, shadows, borders } from '@/constants/landingColors';

interface HexagonFrameProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'cyan' | 'magenta' | 'purple' | 'gold' | 'gradient';
  glow?: boolean;
  className?: string;
  imageUrl?: string;
  icon?: ReactNode;
}

/**
 * HexagonFrame - Original hexagonal container component
 *
 * Creates geometric hexagonal frames for icons, images, or content.
 * Unique design element for Lumora's tech-creative aesthetic.
 */
export default function HexagonFrame({
  children,
  size = 'md',
  color = 'cyan',
  glow = false,
  className = '',
  imageUrl,
  icon,
}: HexagonFrameProps) {
  // Size configurations
  const sizes = {
    sm: 64,
    md: 96,
    lg: 128,
    xl: 160,
  };

  const dimension = sizes[size];

  // Color configurations
  const getColors = () => {
    switch (color) {
      case 'cyan':
        return {
          border: landingColors.cyan,
          borderGlow: borders.glowCyan,
          shadow: glow ? shadows.glowCyan : 'none',
        };
      case 'magenta':
        return {
          border: landingColors.magenta,
          borderGlow: borders.glowMagenta,
          shadow: glow ? shadows.glowMagenta : 'none',
        };
      case 'purple':
        return {
          border: landingColors.purple,
          borderGlow: borders.glowPurple,
          shadow: glow ? shadows.glowPurple : 'none',
        };
      case 'gold':
        return {
          border: landingColors.gold,
          borderGlow: borders.glowGold,
          shadow: glow ? shadows.glowGold : 'none',
        };
      case 'gradient':
        return {
          border: 'url(#hexGradient)',
          borderGlow: borders.glowCyan,
          shadow: glow ? shadows.glowCyan : 'none',
        };
      default:
        return {
          border: landingColors.cyan,
          borderGlow: borders.glowCyan,
          shadow: glow ? shadows.glowCyan : 'none',
        };
    }
  };

  const colors = getColors();

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: dimension, height: dimension }}
      whileHover={{ scale: glow ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        className="absolute inset-0"
      >
        <defs>
          {/* Gradient definition for multi-color borders */}
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={landingColors.cyan} />
            <stop offset="50%" stopColor={landingColors.purple} />
            <stop offset="100%" stopColor={landingColors.magenta} />
          </linearGradient>

          {/* Hexagon clip path */}
          <clipPath id={`hexClip-${dimension}`}>
            <polygon points="30,7 70,7 93,50 70,93 30,93 7,50" />
          </clipPath>

          {/* Glow filter */}
          {glow && (
            <filter id={`hexGlow-${dimension}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Background hexagon */}
        <polygon
          points="30,7 70,7 93,50 70,93 30,93 7,50"
          fill={landingColors.bgCard}
          fillOpacity="0.6"
        />

        {/* Border hexagon */}
        <polygon
          points="30,7 70,7 93,50 70,93 30,93 7,50"
          fill="none"
          stroke={color === 'gradient' ? 'url(#hexGradient)' : colors.border}
          strokeWidth="2"
          filter={glow ? `url(#hexGlow-${dimension})` : undefined}
          style={{
            boxShadow: colors.shadow,
          }}
        />

        {/* Image if provided */}
        {imageUrl && (
          <image
            href={imageUrl}
            x="7"
            y="7"
            width="86"
            height="86"
            clipPath={`url(#hexClip-${dimension})`}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
      </svg>

      {/* Icon or children content */}
      {(icon || children) && !imageUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            clipPath: 'polygon(30% 7%, 70% 7%, 93% 50%, 70% 93%, 30% 93%, 7% 50%)',
          }}
        >
          {icon || children}
        </div>
      )}
    </motion.div>
  );
}
