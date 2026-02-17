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
    ['#000000', '#0F0A1A', '#1A0A2E', '#0F0A1A', '#000000'],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ backgroundColor }}
    />
  );
}
