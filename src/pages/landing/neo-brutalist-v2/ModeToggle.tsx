import { useEffect, useRef } from 'react';
import { useMode, type LandingMode } from './ModeContext';

const MODES: { mode: LandingMode; icon: string; label: string }[] = [
  { mode: 'focus', icon: '🧘', label: 'Focus Mode' },
  { mode: 'normal', icon: '⚡', label: 'Normal' },
  { mode: 'chaos', icon: '🔥', label: 'Chaos Mode' },
];

export default function ModeToggle() {
  const { mode, setMode } = useMode();
  const cKeyCount = useRef(0);
  const cKeyTimer = useRef<ReturnType<typeof setTimeout>>();

  // Triple 'c' keyboard shortcut for chaos mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Ignore if user is typing in an input/textarea
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        cKeyCount.current++;
        clearTimeout(cKeyTimer.current);

        if (cKeyCount.current >= 3) {
          setMode(mode === 'chaos' ? 'normal' : 'chaos');
          cKeyCount.current = 0;
        } else {
          cKeyTimer.current = setTimeout(() => {
            cKeyCount.current = 0;
          }, 800);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(cKeyTimer.current);
    };
  }, [mode, setMode]);

  return (
    <div
      className="fixed z-50 flex flex-col gap-1 p-1"
      style={{
        bottom: '98px',
        right: '24px',
        backgroundColor: '#000',
        border: '3px solid #BFFF00',
      }}
    >
      {MODES.map(({ mode: m, icon, label }) => (
        <button
          key={m}
          title={label}
          onClick={() => setMode(m)}
          className="w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors duration-150"
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: mode === m ? '#BFFF00' : '#000',
            color: mode === m ? '#000' : '#BFFF00',
            border: 'none',
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
