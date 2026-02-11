import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from './ModeContext';

export default function ModeIndicator() {
  const { isFocus, isChaos } = useMode();

  return (
    <>
      {/* Focus Mode Indicator */}
      <AnimatePresence>
        {isFocus && (
          <motion.div
            className="fixed z-50 font-mono font-bold text-sm uppercase tracking-wider"
            style={{
              bottom: '24px',
              left: '24px',
              backgroundColor: '#000',
              color: '#BFFF00',
              border: '3px solid #BFFF00',
              padding: '10px 16px',
            }}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            🧘 FOCUS MODE
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chaos Mode Indicator */}
      <AnimatePresence>
        {isChaos && (
          <motion.div
            className="fixed z-[9999] font-mono font-extrabold text-sm uppercase cursor-pointer"
            style={{
              top: '80px',
              right: '24px',
              backgroundColor: '#FF0000',
              color: '#BFFF00',
              border: '3px solid #BFFF00',
              padding: '12px 20px',
              textAlign: 'center',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -5, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              y: { repeat: Infinity, duration: 0.5 },
              scale: { duration: 0.2 },
            }}
          >
            🔥 CHAOS MODE ACTIVE 🔥
            <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
              CLICK TOGGLE TO DISABLE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
