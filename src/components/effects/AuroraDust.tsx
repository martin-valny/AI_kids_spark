import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getParticleColor, auroraMotion } from '@/constants/landingColors';

interface AuroraDustProps {
  zone?: 'hero' | 'ambient' | 'celebration';
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

/**
 * AuroraDust - Magic dust particles from Aurora Pro
 *
 * Gentle, scroll-reactive particles that add depth without distraction
 * 60 particles on desktop, 30 on mobile
 * Purposeful placement: guide attention, celebrate achievements
 */
export default function AuroraDust({ zone = 'ambient', className = '' }: AuroraDustProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position for parallax (subtle, 10% influence)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.1;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Particle count based on zone and device
  const particleCount = useMemo(() => {
    const baseCounts = {
      hero: 40,
      ambient: 60,
      celebration: 80,
    };
    return isMobile ? Math.floor(baseCounts[zone] / 2) : baseCounts[zone];
  }, [zone, isMobile]);

  // Generate particles with deterministic properties
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // Zone-specific positioning
      let x, y;
      if (zone === 'hero') {
        // Concentrated around center/CTA area (40-60% horizontal, 30-70% vertical)
        x = 40 + Math.random() * 20;
        y = 30 + Math.random() * 40;
      } else if (zone === 'celebration') {
        // Burst pattern from center
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        x = 50 + Math.cos(angle) * distance;
        y = 50 + Math.sin(angle) * distance;
      } else {
        // Ambient: distributed across viewport
        x = Math.random() * 100;
        y = Math.random() * 100;
      }

      return {
        id: i,
        x,
        y,
        size: 1 + Math.random() * 3, // 1-4px
        color: getParticleColor(i),
        duration: 20 + Math.random() * 20, // 20-40s per particle
        delay: Math.random() * 5, // Staggered start
      };
    });
  }, [particleCount, zone]);

  // Scroll-reactive opacity (fade at page top/bottom)
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

  // Mouse parallax transforms (subtle, 10% influence)
  const parallaxX = useTransform(mouseX, (value) => value * 20);
  const parallaxY = useTransform(mouseY, (value) => value * 20);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity,
            x: parallaxX,
            y: parallaxY,
          }}
          animate={{
            y: [0, -30, 0], // Vertical drift
            x: [
              0,
              Math.sin(particle.id) * 15, // Horizontal sway (sine wave)
              0,
            ],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Additional celebration burst animation for celebration zone */}
      {zone === 'celebration' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${auroraMotion.tealGlow} 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
