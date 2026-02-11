import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type LandingMode = 'focus' | 'normal' | 'chaos';

interface ModeContextValue {
  mode: LandingMode;
  setMode: (mode: LandingMode) => void;
  isFocus: boolean;
  isChaos: boolean;
  isNormal: boolean;
  chaosAccent: string;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = 'lumora-mode';
const VALID_MODES: LandingMode[] = ['focus', 'normal', 'chaos'];
const CHAOS_COLORS = ['#BFFF00', '#00FF88', '#00FFFF', '#FF00FF', '#FF0088'];

function getInitialMode(): LandingMode {
  // URL param takes priority
  const urlParams = new URLSearchParams(window.location.search);
  const urlMode = urlParams.get('mode') as LandingMode | null;
  if (urlMode && VALID_MODES.includes(urlMode)) return urlMode;

  // Then localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as LandingMode | null;
    if (stored && VALID_MODES.includes(stored)) return stored;
  } catch {
    // localStorage unavailable
  }

  return 'normal';
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LandingMode>(getInitialMode);
  const [chaosAccent, setChaosAccent] = useState(CHAOS_COLORS[0]);

  const setMode = useCallback((newMode: LandingMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // localStorage unavailable
    }
    // Update URL param without navigation
    const url = new URL(window.location.href);
    if (newMode === 'normal') {
      url.searchParams.delete('mode');
    } else {
      url.searchParams.set('mode', newMode);
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Chaos color cycling
  useEffect(() => {
    if (mode !== 'chaos') {
      setChaosAccent(CHAOS_COLORS[0]);
      return;
    }
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % CHAOS_COLORS.length;
      setChaosAccent(CHAOS_COLORS[index]);
    }, 2500);
    return () => clearInterval(interval);
  }, [mode]);

  const value: ModeContextValue = {
    mode,
    setMode,
    isFocus: mode === 'focus',
    isChaos: mode === 'chaos',
    isNormal: mode === 'normal',
    chaosAccent,
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}
