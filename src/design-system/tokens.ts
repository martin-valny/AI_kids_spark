/**
 * Design Tokens - AI Spark
 * Based on: src/pages/DesignPilot.tsx
 *
 * Use these constants throughout the app for consistency.
 * All values extracted from the official DesignPilot reference page.
 *
 * @see src/pages/DesignPilot.tsx - Official design reference
 * @see .verification/REFACTORING_PLAN.md - Implementation guide
 */

export const DesignTokens = {
  /**
   * Opacity Values - Based on DesignPilot "High-Opacity Glass" system
   *
   * Main containers use 90% opacity for perfect readability
   * while maintaining the glassmorphism aesthetic.
   */
  opacity: {
    /** Main containers (GlassCard): bg-white/90 */
    glass: '90',

    /** Highlight boxes and tips: bg-white/80 */
    highlight: '80',

    /** Icon container backgrounds: bg-{color}/10 */
    icon: '10',

    /** Inner card borders: border-{color}/20 */
    border: '20',

    /** GlassCard borders (more subtle): border-{color}/50 */
    borderSubtle: '50',

    /** Decorative gradients only: {color}/45 */
    gradient: '45',
  },

  /**
   * Spacing Scale - Consistent spacing throughout the app
   */
  spacing: {
    /** Card padding: p-6 */
    cardPadding: 'p-6',

    /** Hero/main section padding: p-8 md:p-12 */
    heroPadding: 'p-8 md:p-12',

    /** Grid gap between cards: gap-6 */
    gridGap: 'gap-6',

    /** Button group spacing: gap-4 */
    buttonGap: 'gap-4',

    /** Vertical section spacing: space-y-12 */
    sectionGap: 'space-y-12',

    /** Margin bottom for sections: mb-12 */
    sectionMargin: 'mb-12',
  },

  /**
   * Border Widths - Different borders for different contexts
   */
  border: {
    /** GlassCard border (subtle): border (1px) */
    glassCard: 'border',

    /** Inner card border (visible): border-2 (2px) */
    innerCard: 'border-2',
  },

  /**
   * Border Radius - Consistent rounded corners
   */
  radius: {
    /** GlassCard: rounded-3xl */
    glassCard: 'rounded-3xl',

    /** Inner cards: rounded-2xl */
    innerCard: 'rounded-2xl',

    /** Highlight boxes: rounded-xl */
    highlight: 'rounded-xl',

    /** Icon containers: rounded-xl */
    icon: 'rounded-xl',

    /** Buttons: rounded-full */
    button: 'rounded-full',
  },

  /**
   * Icon Sizes - Standard icon dimensions
   */
  icon: {
    /** Small icons (in text): w-4 h-4 */
    sm: 'w-4 h-4',

    /** Medium icons (in cards): w-6 h-6 */
    md: 'w-6 h-6',

    /** Icon container size: w-12 h-12 */
    container: 'w-12 h-12',

    /** Large decorative icons: w-16 h-16 */
    lg: 'w-16 h-16',

    /** Extra large (hero): w-24 h-24 */
    xl: 'w-24 h-24',
  },

  /**
   * Typography - Text styles from DesignPilot
   *
   * All headings use text-gray-800 for high contrast
   * Body text uses text-gray-700 or text-gray-600
   */
  typography: {
    /** Page hero title: text-3xl font-bold text-gray-800 */
    hero: 'text-3xl font-bold text-gray-800',

    /** Section heading: text-2xl font-bold text-gray-800 */
    section: 'text-2xl font-bold text-gray-800',

    /** Card title: text-lg font-bold text-gray-800 */
    cardTitle: 'text-lg font-bold text-gray-800',

    /** Body text: text-base text-gray-700 */
    body: 'text-base text-gray-700',

    /** Small text/captions: text-sm text-gray-600 */
    small: 'text-sm text-gray-600',

    /** Lead paragraph: text-lg text-gray-700 */
    lead: 'text-lg text-gray-700',
  },

  /**
   * Transitions - Consistent animation timing
   */
  transition: {
    /** Standard transition for all properties: transition-all duration-300 */
    standard: 'transition-all duration-300',

    /** Transform-only transition: transition-transform duration-300 */
    transform: 'transition-transform duration-300',

    /** Color-only transition: transition-colors duration-300 */
    colors: 'transition-colors duration-300',
  },

  /**
   * Hover Effects - Interactive states from DesignPilot
   */
  hover: {
    /** Lift effect: hover:-translate-y-1 */
    lift: 'hover:-translate-y-1',

    /** Shadow increase: hover:shadow-lg */
    shadow: 'hover:shadow-lg',

    /** Icon scale on hover: hover:scale-110 (inside group) */
    iconScale: 'group-hover:scale-110',

    /** Full hover combination for cards */
    card: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
  },

  /**
   * Grid Patterns - Standard responsive grids
   */
  grid: {
    /** 3-column responsive grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */
    threeCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',

    /** 2-column responsive grid: grid grid-cols-1 md:grid-cols-2 gap-6 */
    twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-6',

    /** 4-column responsive grid: grid grid-cols-2 md:grid-cols-4 gap-4 */
    fourCol: 'grid grid-cols-2 md:grid-cols-4 gap-4',
  },

  /**
   * Color Palette - Kids-friendly colors
   *
   * Use kids-{color} from Tailwind config
   * Examples: kids-blue, kids-purple, kids-green, etc.
   */
  colors: {
    /** Primary brand color */
    primary: 'kids-blue',

    /** Secondary accent */
    secondary: 'kids-purple',

    /** Success/positive */
    success: 'kids-green',

    /** Warning/alert */
    warning: 'kids-yellow',

    /** Error/danger */
    danger: 'kids-red',

    /** Info/neutral */
    info: 'kids-teal',

    /** Playful accent */
    accent: 'kids-pink',

    /** Warm accent */
    warm: 'kids-orange',
  },

  /**
   * Shadow Levels - Box shadow scale
   */
  shadow: {
    /** Default card shadow: shadow-sm */
    sm: 'shadow-sm',

    /** Medium shadow: shadow-lg */
    lg: 'shadow-lg',

    /** Large shadow (hover): shadow-xl */
    xl: 'shadow-xl',
  },

  /**
   * Accessibility - Touch targets and contrast
   */
  a11y: {
    /** Minimum touch target: 44px × 44px */
    minTouchTarget: 44,

    /** Minimum color contrast ratio: 4.5:1 */
    minContrast: 4.5,

    /** Focus ring: focus:ring-4 focus:ring-{color}/30 */
    focusRing: 'focus:outline-none focus:ring-4',
  },
} as const;

/**
 * Helper function to build inner card classes
 *
 * @param color - Color variant (blue, purple, green, etc.)
 * @returns Tailwind classes for inner card
 *
 * @example
 * ```tsx
 * <div className={getInnerCardClasses('blue')}>
 *   Card content
 * </div>
 * ```
 */
export function getInnerCardClasses(
  color: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red' | 'teal'
): string {
  return `group bg-white/90 p-6 rounded-2xl border-2 border-kids-${color}/20 shadow-sm hover:border-kids-${color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`;
}

/**
 * Helper function to build icon container classes
 *
 * @param color - Color variant
 * @param size - Size variant (sm, md, lg)
 * @returns Tailwind classes for icon container
 *
 * @example
 * ```tsx
 * <div className={getIconContainerClasses('blue')}>
 *   <Icon className="w-6 h-6 text-kids-blue" />
 * </div>
 * ```
 */
export function getIconContainerClasses(
  color: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red' | 'teal',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
  };

  return `${sizeClasses[size]} bg-kids-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`;
}

/**
 * Helper function to build highlight box classes
 *
 * @param color - Color variant
 * @returns Tailwind classes for highlight box
 *
 * @example
 * ```tsx
 * <div className={getHighlightBoxClasses('purple')}>
 *   <strong>Pro Tip:</strong> Important message
 * </div>
 * ```
 */
export function getHighlightBoxClasses(
  color: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red' | 'teal'
): string {
  return `bg-white/80 p-4 rounded-xl border border-kids-${color}/20`;
}

/**
 * Type definitions for design tokens
 */
export type ColorVariant = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red' | 'teal';
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
export type SpacingVariant = keyof typeof DesignTokens.spacing;
export type TypographyVariant = keyof typeof DesignTokens.typography;
