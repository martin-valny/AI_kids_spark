import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-responsive background that transitions:
 *   top → black → dark purple → black → bottom
 *
 * Renders as an absolute-fill layer — place inside a fixed container.
 */
export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#050508', '#150D28', '#2D0A3E', '#150D28', '#050508'],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ backgroundColor }}
    />
  );
}
