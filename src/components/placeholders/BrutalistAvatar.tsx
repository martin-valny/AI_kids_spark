import { motion } from 'framer-motion';

interface BrutalistAvatarProps {
  initials: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * BrutalistAvatar - Square avatar with lime border
 *
 * Black background, white initials, brutalist aesthetic
 */
export default function BrutalistAvatar({
  initials,
  size = 'medium',
}: BrutalistAvatarProps) {
  const dimensions = {
    small: { size: 64, fontSize: 20 },
    medium: { size: 96, fontSize: 32 },
    large: { size: 128, fontSize: 40 },
  };

  const { size: boxSize, fontSize } = dimensions[size];

  return (
    <motion.div
      className="flex items-center justify-center font-mono font-bold"
      style={{
        width: boxSize,
        height: boxSize,
        border: '4px solid #BFFF00',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {initials}
    </motion.div>
  );
}
