import { ReactNode } from 'react';
import { gradients } from '@/constants/landingColors';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'cyber' | 'goldCyan' | 'magentaPurple';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

/**
 * GradientText - Text with vibrant gradient fills
 *
 * Creates eye-catching gradient text effects for headlines and CTAs.
 * Original design element for Lumora's bold, modern aesthetic.
 */
export default function GradientText({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'span',
}: GradientTextProps) {
  const getGradient = () => {
    switch (variant) {
      case 'primary':
        return gradients.primary;
      case 'cyber':
        return gradients.cyber;
      case 'goldCyan':
        return gradients.goldCyan;
      case 'magentaPurple':
        return gradients.magentaPurple;
      default:
        return gradients.primary;
    }
  };

  return (
    <Component
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: getGradient(),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </Component>
  );
}
