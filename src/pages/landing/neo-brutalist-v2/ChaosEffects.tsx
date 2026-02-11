import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from './ModeContext';

// ─── Animated Grid Overlay ────────────────────────────────────────────────────

function ChaosOverlay() {
  const { isChaos } = useMode();

  if (!isChaos) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{
        background: `
          linear-gradient(0deg, rgba(191,255,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(191,255,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
      animate={{
        backgroundPosition: ['0px 0px', '40px 40px'],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      initial={{ opacity: 0 }}
    />
  );
}

// ─── Cursor Trail ─────────────────────────────────────────────────────────────

interface TrailDot {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

function CursorTrail() {
  const { isChaos } = useMode();
  const [dots, setDots] = useState<TrailDot[]>([]);
  const nextId = useRef(0);
  const isPointerFine = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    if (!isChaos || !isPointerFine.current) {
      setDots([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newDot: TrailDot = {
        id: nextId.current++,
        x: e.pageX,
        y: e.pageY,
        timestamp: Date.now(),
      };
      setDots(prev => [...prev.slice(-14), newDot]);
    };

    // Cleanup old dots periodically
    const cleanup = setInterval(() => {
      const now = Date.now();
      setDots(prev => prev.filter(d => now - d.timestamp < 600));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanup);
      setDots([]);
    };
  }, [isChaos]);

  if (!isChaos || !isPointerFine.current) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[55]" style={{ overflow: 'hidden' }}>
      <AnimatePresence>
        {dots.map((dot, i) => {
          const age = (Date.now() - dot.timestamp) / 600;
          const opacity = Math.max(0, 0.8 - age);
          return (
            <motion.div
              key={dot.id}
              className="absolute"
              style={{
                left: dot.x - 4,
                top: dot.y - 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#BFFF00',
                boxShadow: '0 0 10px #BFFF00',
                opacity,
                pointerEvents: 'none',
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Screen Shake ─────────────────────────────────────────────────────────────

function ScreenShake() {
  const { isChaos } = useMode();
  const lastScrollY = useRef(0);
  const lastShakeTime = useRef(0);

  useEffect(() => {
    if (!isChaos) return;

    const handleScroll = () => {
      const now = Date.now();
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      lastScrollY.current = window.scrollY;

      if (delta > 80 && now - lastShakeTime.current > 500) {
        lastShakeTime.current = now;
        const root = document.getElementById('neo-brutalist-root');
        if (root) {
          root.style.transition = 'transform 0.05s';
          root.style.transform = `translateX(${Math.random() > 0.5 ? 3 : -3}px)`;
          setTimeout(() => {
            root.style.transform = 'translateX(0)';
          }, 100);
          setTimeout(() => {
            root.style.transition = '';
            root.style.transform = '';
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isChaos]);

  return null;
}

// ─── Combined Export ──────────────────────────────────────────────────────────

export default function ChaosEffects() {
  return (
    <>
      <ChaosOverlay />
      <CursorTrail />
      <ScreenShake />
    </>
  );
}
