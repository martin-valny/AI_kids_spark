import { motion } from 'framer-motion';

interface StudentAvatarPlaceholderProps {
  initials?: string;
  size?: 'small' | 'medium' | 'large';
  colorScheme?: 'teal' | 'purple' | 'rose' | 'auto';
}

/**
 * StudentAvatarPlaceholder - Circular avatar with gradient background
 *
 * Shows initials with deterministic color assignment, not generic silhouette
 */
export default function StudentAvatarPlaceholder({
  initials = 'SK',
  size = 'medium',
  colorScheme = 'auto',
}: StudentAvatarPlaceholderProps) {
  const dimensions = {
    small: { diameter: 64, fontSize: 20 },
    medium: { diameter: 96, fontSize: 32 },
    large: { diameter: 128, fontSize: 40 },
  };

  const gradients = {
    teal: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
    purple: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)',
    rose: 'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
  };

  // Deterministic color assignment based on initials hash
  const getColorScheme = (): 'teal' | 'purple' | 'rose' => {
    if (colorScheme !== 'auto') return colorScheme;

    // Simple hash function
    const hash = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const schemes: ('teal' | 'purple' | 'rose')[] = ['teal', 'purple', 'rose'];
    return schemes[hash % 3];
  };

  const selectedScheme = getColorScheme();
  const { diameter, fontSize } = dimensions[size];

  return (
    <motion.div
      className="relative flex items-center justify-center rounded-full border-2"
      style={{
        width: diameter,
        height: diameter,
        background: gradients[selectedScheme],
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
    >
      {/* Initials */}
      <span
        className="font-bold select-none"
        style={{
          fontSize: `${fontSize}px`,
          color: '#ffffff',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {initials}
      </span>

      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
