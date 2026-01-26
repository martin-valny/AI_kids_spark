import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { landingColors, shadows, borders, transitions } from '@/constants/landingColors';

interface NeonGlassCardProps {
  children: ReactNode;
  variant?: 'cyan' | 'magenta' | 'purple' | 'gold' | 'gradient' | 'default';
  glow?: boolean;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * NeonGlassCard - Enhanced glass morphism card with neon glow effects
 *
 * Evolution of the classic glass card with vibrant neon borders
 * designed for Lumora's modern tech aesthetic.
 */
export default function NeonGlassCard({
  children,
  variant = 'default',
  glow = true,
  hover = true,
  className = '',
  onClick,
}: NeonGlassCardProps) {
  // Get color-specific styles
  const getVariantStyles = () => {
    const baseStyles = {
      backgroundColor: `${landingColors.bgCard}CC`, // 80% opacity
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    };

    switch (variant) {
      case 'cyan':
        return {
          ...baseStyles,
          border: `1px solid ${borders.glowCyan}`,
          boxShadow: glow ? shadows.glowCyan : shadows.card,
        };
      case 'magenta':
        return {
          ...baseStyles,
          border: `1px solid ${borders.glowMagenta}`,
          boxShadow: glow ? shadows.glowMagenta : shadows.card,
        };
      case 'purple':
        return {
          ...baseStyles,
          border: `1px solid ${borders.glowPurple}`,
          boxShadow: glow ? shadows.glowPurple : shadows.card,
        };
      case 'gold':
        return {
          ...baseStyles,
          border: `1px solid ${borders.glowGold}`,
          boxShadow: glow ? shadows.glowGold : shadows.card,
        };
      case 'gradient':
        return {
          ...baseStyles,
          borderImage: 'linear-gradient(135deg, #00d4ff, #8b5cf6, #ff006e) 1',
          border: '2px solid',
          boxShadow: glow ? shadows.glowCyan : shadows.card,
        };
      default:
        return {
          ...baseStyles,
          border: `1px solid ${borders.default}`,
          boxShadow: shadows.card,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <motion.div
      className={`rounded-2xl p-6 ${className}`}
      style={variantStyles}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: glow
                ? variant === 'cyan'
                  ? `0 0 30px ${landingColors.cyanGlow}, 0 0 60px ${landingColors.cyanGlow}`
                  : variant === 'magenta'
                  ? `0 0 30px ${landingColors.magentaGlow}, 0 0 60px ${landingColors.magentaGlow}`
                  : variant === 'purple'
                  ? `0 0 30px ${landingColors.purpleGlow}, 0 0 60px ${landingColors.purpleGlow}`
                  : variant === 'gold'
                  ? `0 0 30px ${landingColors.goldGlow}, 0 0 60px ${landingColors.goldGlow}`
                  : shadows.elevated
                : shadows.elevated,
            }
          : {}
      }
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
