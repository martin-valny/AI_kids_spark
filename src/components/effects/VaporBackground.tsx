import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { landingColors } from '@/constants/landingColors';

interface VaporBackgroundProps {
  variant?: 'cyan' | 'magenta' | 'purple' | 'gold' | 'mixed';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

/**
 * VaporBackground - Scroll-reactive gradient background
 */
export default function VaporBackground({
  variant = 'mixed',
  intensity = 'medium',
  className = '',
}: VaporBackgroundProps) {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const gradientY1 = useTransform(scrollYProgress, [0, 1], ['30%', '70%']);
  const gradientY2 = useTransform(scrollYProgress, [0, 1], ['50%', '30%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getColors = () => {
    switch (variant) {
      case 'cyan':
        return { primary: landingColors.cyan, secondary: landingColors.purple };
      case 'magenta':
        return { primary: landingColors.magenta, secondary: landingColors.gold };
      case 'gold':
        return { primary: landingColors.gold, secondary: landingColors.cyan };
      default:
        return { primary: landingColors.cyan, secondary: landingColors.magenta };
    }
  };

  const colors = getColors();
  const opacity = intensity === 'strong' ? 0.2 : intensity === 'medium' ? 0.15 : 0.1;

  return (
    <div
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ backgroundColor: landingColors.bgDark }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${colors.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
          y: gradientY1,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${100 - mousePosition.x}% ${mousePosition.y}%, ${colors.secondary}${Math.round(opacity * 0.8 * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
          y: gradientY2,
        }}
      />
    </div>
  );
}
