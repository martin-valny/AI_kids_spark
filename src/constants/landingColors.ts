/**
 * Lumora Landing Page Color System
 *
 * Original color palette designed for Gen Z AI creators (ages 16+)
 * Dark-first design with vibrant accent colors
 */

export const landingColors = {
  // Backgrounds - Deep, professional dark tones
  bgDark: '#0a0a1a',
  bgElevated: '#1a1a2e',
  bgCard: '#252540',
  bgOverlay: 'rgba(10, 10, 26, 0.95)',

  // Text - High contrast for readability
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  textInverse: '#0a0a1a',

  // Accent Colors - Vibrant, energetic
  cyan: '#00d4ff',
  cyanGlow: 'rgba(0, 212, 255, 0.4)',
  magenta: '#ff006e',
  magentaGlow: 'rgba(255, 0, 110, 0.4)',
  purple: '#8b5cf6',
  purpleGlow: 'rgba(139, 92, 246, 0.4)',
  gold: '#fbbf24',
  goldGlow: 'rgba(251, 191, 36, 0.4)',

  // Functional Colors
  success: '#14b8a6',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const gradients = {
  // Primary gradients for buttons and CTAs
  primary: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
  cyber: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #ff006e 100%)',
  goldCyan: 'linear-gradient(135deg, #fbbf24 0%, #00d4ff 100%)',
  magentaPurple: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)',

  // Subtle gradients for backgrounds
  subtle: 'linear-gradient(180deg, #1a1a2e 0%, #252540 100%)',
  glow: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15) 0%, transparent 70%)',
};

export const vaporGradients = {
  // Multi-layer vapor gradients inspired by modern design trends
  layer1: 'radial-gradient(circle at 30% 50%, rgba(26, 10, 46, 0.8) 0%, rgba(26, 26, 46, 0.4) 100%)',
  layer2: 'radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)',
  layer3: 'radial-gradient(circle at 50% 80%, rgba(255, 0, 110, 0.15) 0%, transparent 60%)',
  layer4: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 55%)',
};

export const shadows = {
  // Glow shadows for interactive elements
  glowCyan: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
  glowMagenta: '0 0 20px rgba(255, 0, 110, 0.3), 0 0 40px rgba(255, 0, 110, 0.1)',
  glowPurple: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)',
  glowGold: '0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.1)',

  // Standard shadows
  card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  elevated: '0 20px 60px rgba(0, 0, 0, 0.5)',
};

export const borders = {
  subtle: 'rgba(255, 255, 255, 0.05)',
  default: 'rgba(255, 255, 255, 0.1)',
  glowCyan: 'rgba(0, 212, 255, 0.5)',
  glowMagenta: 'rgba(255, 0, 110, 0.5)',
  glowPurple: 'rgba(139, 92, 246, 0.5)',
  glowGold: 'rgba(251, 191, 36, 0.5)',
};

// Animation timing for consistent feel
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '400ms ease-in-out',
  vapor: '1500ms ease-in-out',
};

/**
 * Aurora Motion - Hybrid design combining Linear Motion + Aurora Pro
 *
 * Professional credibility with a whisper of enchantment
 * Muted sophisticated palette with warm coral accent
 */
export const auroraMotion = {
  // Dark backgrounds (from Linear Motion)
  bg: '#0f0f13',
  bgElevated: '#16161c',
  bgCard: '#1c1c24',

  // Aurora Pro muted palette
  teal: '#5eead4',
  tealGlow: 'rgba(94, 234, 212, 0.4)',
  purple: '#c4b5fd',
  purpleGlow: 'rgba(196, 181, 253, 0.4)',
  rose: '#fda4af',
  roseGlow: 'rgba(253, 164, 175, 0.4)',

  // NEW: Warm coral for human touches
  coral: '#ff8a5c',
  coralGlow: 'rgba(255, 138, 92, 0.4)',

  // Text (Aurora Pro's warm white + Linear Motion's muted)
  text: '#faf5ff',
  textSecondary: '#9898a2',
  textMuted: '#a8a29e',
};

export const auroraGradients = {
  // Subtle Professional (Primary CTAs)
  coral: 'linear-gradient(135deg, #ff8a5c 0%, #ff6b6b 100%)',

  // Aurora Magic (Backgrounds, accents)
  aurora: 'linear-gradient(135deg, #5eead4 0%, #c4b5fd 50%, #fda4af 100%)',

  // Muted Overlay (Section transitions)
  overlay: 'linear-gradient(180deg, rgba(15,15,19,0) 0%, rgba(15,15,19,0.8) 100%)',
};

/**
 * Get particle color based on index (deterministic distribution)
 * 70% neutral, 15% teal, 10% purple, 5% rose
 */
export const getParticleColor = (index: number): string => {
  const mod = index % 100;
  if (mod < 70) return `rgba(250, 245, 255, 0.2)`; // 70% neutral
  if (mod < 85) return auroraMotion.teal; // 15% teal
  if (mod < 95) return auroraMotion.purple; // 10% purple
  return auroraMotion.rose; // 5% rose
};

/**
 * Neo-Brutalist Pro - Award-winning brutalist design
 *
 * Electric lime on black with thick borders, monospace typography
 * Enhanced with trust elements and social proof
 */
export const neoBrutalist = {
  lime: '#BFFF00',
  limeGlow: 'rgba(191, 255, 0, 0.4)',
  black: '#000000',
  white: '#ffffff',
  darkGray: '#1a1a1a',
  mediumGray: '#666666',
  borderThick: '8px',
  borderMedium: '4px',
  borderThin: '2px',
};

/**
 * Lumora Creative - Dark luxury design with white gold accents
 *
 * Sophisticated dark palette with metallic gold accents
 * Clean, premium aesthetic for Gen Z creators
 */
export const lumoraCreative = {
  // Backgrounds - Deep luxury dark tones
  bg: '#0a0a0a',
  bgElevated: '#121212',
  bgCard: '#171717',
  bgSurface: '#0f0f0f',

  // White Gold palette
  gold: '#d4c5a0',
  goldLight: '#e8dcc4',
  goldDark: '#a89968',
  goldGlow: 'rgba(212, 197, 160, 0.3)',
  goldBorder: 'rgba(212, 197, 160, 0.25)',

  // Text
  text: '#f5f0e6',
  textSecondary: '#a8a29e',
  textMuted: '#6b6560',

  // Accents
  accent: '#d4c5a0',
  accentHover: '#e8dcc4',
};

export const lumoraGradients = {
  // Gold metallic gradient for text
  goldText: 'linear-gradient(180deg, #f5f0e6 0%, #d4c5a0 50%, #a89968 100%)',
  // Gold button gradient
  goldButton: 'linear-gradient(180deg, #d4c5a0 0%, #a89968 100%)',
  // Subtle gold glow
  goldGlow: 'radial-gradient(circle at 50% 50%, rgba(212, 197, 160, 0.15) 0%, transparent 70%)',
};

/**
 * Lumora Aqua - Precision tech aesthetic
 *
 * Dark grid background with animated aqua light beams
 * Glass morphism cards, breathing animations, parallax effects
 */
export const lumoraAqua = {
  // Backgrounds
  bg: '#050807',
  bgGradient: `
    radial-gradient(circle at 20% 10%, rgba(60,255,200,0.12), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(120,160,255,0.08), transparent 45%),
    #040807
  `,

  // Aqua accent palette
  aqua: '#78ffdc',
  aquaGlow: 'rgba(120,255,220,0.45)',
  aquaMuted: 'rgba(120,255,220,0.35)',
  aquaSubtle: 'rgba(120,255,220,0.18)',

  // Text
  text: '#e6fff6',
  textSecondary: 'rgba(220,255,245,0.82)',
  textMuted: 'rgba(220,255,245,0.7)',

  // Cards & UI
  cardBg: 'rgba(255,255,255,0.035)',
  cardBorder: 'rgba(255,255,255,0.16)',
  cardGlow: 'rgba(120,255,220,0.18)',
  cardShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 24px 48px rgba(0,0,0,0.55)',

  // Grid
  gridLine: 'rgba(255,255,255,0.035)',
};
