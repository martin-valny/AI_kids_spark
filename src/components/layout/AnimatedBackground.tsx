import NeuralBackground from './NeuralBackground';

/**
 * Base background layer — neural mesh canvas with electrical pulses.
 * Renders behind all content via position: fixed at z-index: 0.
 */
export default function AnimatedBackground() {
  return <NeuralBackground />;
}
