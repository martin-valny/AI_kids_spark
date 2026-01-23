import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { vaporGradients, landingColors } from '@/constants/landingColors';

interface VaporBackgroundProps {
  variant?: 'cyan' | 'magenta' | 'purple' | 'gold' | 'mixed';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

/**
 * VaporBackground - Original scroll-reactive gradient background
 *
 * Creates an ethereal, shifting gradient effect that responds to scroll position.
 * Inspired by modern web design trends but uniquely designed for Lumora's
 * Gen Z AI creator aesthetic.
 */
export default function VaporBackground({
  variant = 'mixed',
  intensity = 'medium',
  className = ''
}: VaporBackgroundProps) {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Scroll-based transformations for dynamic gradients
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['30%', '50%']);
  const layer2X = useTransform(scrollYProgress, [0, 1], ['70%', '40%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['80%', '60%']);
  const layer4X = useTransform(scrollYProgress, [0, 1], ['20%', '60%']);

  // Mouse parallax effect (subtle)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate gradient colors based on variant
  const getGradientColors = () => {
    const baseOpacity = intensity === 'subtle' ? 0.1 : intensity === 'medium' ? 0.2 : 0.3;

    switch (variant) {
      case 'cyan':
        return {
          color1: `rgba(0, 212, 255, ${baseOpacity})`,
          color2: `rgba(0, 212, 255, ${baseOpacity * 0.5})`,
          color3: `rgba(139, 92, 246, ${baseOpacity * 0.4})`,
        };
      case 'magenta':
        return {
          color1: `rgba(255, 0, 110, ${baseOpacity})`,
          color2: `rgba(255, 0, 110, ${baseOpacity * 0.5})`,
          color3: `rgba(251, 191, 36, ${baseOpacity * 0.4})`,
        };
      case 'purple':
        return {
          color1: `rgba(139, 92, 246, ${baseOpacity})`,
          color2: `rgba(139, 92, 246, ${baseOpacity * 0.5})`,
          color3: `rgba(255, 0, 110, ${baseOpacity * 0.4})`,
        };
      case 'gold':
        return {
          color1: `rgba(251, 191, 36, ${baseOpacity})`,
          color2: `rgba(251, 191, 36, ${baseOpacity * 0.5})`,
          color3: `rgba(0, 212, 255, ${baseOpacity * 0.4})`,
        };
      default: // mixed
        return {
          color1: `rgba(0, 212, 255, ${baseOpacity})`,
          color2: `rgba(255, 0, 110, ${baseOpacity * 0.6})`,
          color3: `rgba(139, 92, 246, ${baseOpacity * 0.5})`,
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={{ backgroundColor: landingColors.bgDark }}
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${landingColors.bgDark} 0%, ${landingColors.bgElevated} 100%)`,
        }}
      />

      {/* Animated vapor layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${layer2X} ${layer1Y}, ${colors.color1} 0%, transparent 50%)`,
          mixBlendMode: 'screen',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${layer4X} 40%, ${colors.color2} 0%, transparent 60%)`,
          mixBlendMode: 'screen',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 60% ${layer3Y}, ${colors.color3} 0%, transparent 55%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Mouse-reactive layer (subtle parallax) */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors.color1} 0%, transparent 40%)`,
          mixBlendMode: 'screen',
          opacity: 0.3,
        }}
      />

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
