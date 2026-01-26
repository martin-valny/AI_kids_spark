import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { landingColors } from '@/constants/landingColors';

interface StatsCounterProps {
  value: number;
  label: string;
  icon?: ReactNode;
  suffix?: string;
  prefix?: string;
  color?: 'cyan' | 'magenta' | 'purple' | 'gold';
  duration?: number;
  decimals?: number;
}

/**
 * StatsCounter - Animated counting statistics component
 *
 * Counts up to a target number when scrolled into view.
 * Adds dynamic, engaging feel to metrics and data displays.
 */
export default function StatsCounter({
  value,
  label,
  icon,
  suffix = '',
  prefix = '',
  color = 'cyan',
  duration = 2,
  decimals = 0,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [springValue]);

  // Get color for icon and accents
  const getColor = () => {
    switch (color) {
      case 'cyan':
        return landingColors.cyan;
      case 'magenta':
        return landingColors.magenta;
      case 'purple':
        return landingColors.purple;
      case 'gold':
        return landingColors.gold;
      default:
        return landingColors.cyan;
    }
  };

  const accentColor = getColor();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Icon */}
      {icon && (
        <div
          className="mb-3 text-4xl"
          style={{ color: accentColor }}
        >
          {icon}
        </div>
      )}

      {/* Animated number */}
      <div
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${landingColors.textPrimary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </div>

      {/* Label */}
      <div
        className="text-sm md:text-base font-medium"
        style={{ color: landingColors.textSecondary }}
      >
        {label}
      </div>
    </motion.div>
  );
}
