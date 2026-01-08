/**
 * Design System Tokens
 *
 * Centralized design tokens for the AI Kids Spark application.
 * These tokens provide consistent styling across all components.
 *
 * @module design-system/tokens
 */

// ============================================================================
// COLOR VARIANTS
// ============================================================================

export type ColorVariant = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red' | 'teal';
export type HighlightVariant = 'info' | 'warning' | 'success' | 'tip';
export type IconSize = 'sm' | 'md' | 'lg';
export type GridColumns = 2 | 3 | 4;

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const DesignTokens = {
  // Border colors for different color variants (at 20% opacity for subtle effect)
  border: {
    blue: 'border-kids-blue/20',
    purple: 'border-kids-purple/20',
    green: 'border-kids-green/20',
    pink: 'border-kids-pink/20',
    orange: 'border-kids-orange/20',
    yellow: 'border-kids-yellow/20',
    red: 'border-kids-red/20',
    teal: 'border-kids-teal/20',
  } as const,

  // Hover border colors (full opacity for emphasis)
  borderHover: {
    blue: 'hover:border-kids-blue',
    purple: 'hover:border-kids-purple',
    green: 'hover:border-kids-green',
    pink: 'hover:border-kids-pink',
    orange: 'hover:border-kids-orange',
    yellow: 'hover:border-kids-yellow',
    red: 'hover:border-kids-red',
    teal: 'hover:border-kids-teal',
  } as const,

  // Background colors at 10% opacity (for icon containers and highlights)
  background: {
    blue: 'bg-kids-blue/10',
    purple: 'bg-kids-purple/10',
    green: 'bg-kids-green/10',
    pink: 'bg-kids-pink/10',
    orange: 'bg-kids-orange/10',
    yellow: 'bg-kids-yellow/10',
    red: 'bg-kids-red/10',
    teal: 'bg-kids-teal/10',
  } as const,

  // Text colors for icons and highlighted text
  text: {
    blue: 'text-kids-blue',
    purple: 'text-kids-purple',
    green: 'text-kids-green',
    pink: 'text-kids-pink',
    orange: 'text-kids-orange',
    yellow: 'text-kids-yellow',
    red: 'text-kids-red',
    teal: 'text-kids-teal',
  } as const,

  // Group hover text colors (for parent hover effects)
  groupHoverText: {
    blue: 'group-hover:text-kids-blue',
    purple: 'group-hover:text-kids-purple',
    green: 'group-hover:text-kids-green',
    pink: 'group-hover:text-kids-pink',
    orange: 'group-hover:text-kids-orange',
    yellow: 'group-hover:text-kids-yellow',
    red: 'group-hover:text-kids-red',
    teal: 'group-hover:text-kids-teal',
  } as const,

  // Icon container sizes
  iconSize: {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  } as const,

  // Icon sizes within containers
  iconInnerSize: {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  } as const,

  // Responsive grid configurations
  grid: {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  } as const,

  // Common spacing and sizing
  spacing: {
    cardPadding: 'p-6',
    cardGap: 'gap-6',
    sectionGap: 'gap-8',
  } as const,

  // Common transitions
  transitions: {
    all: 'transition-all duration-300',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-300',
  } as const,

  // Common hover effects
  hover: {
    lift: 'hover:-translate-y-1',
    shadow: 'hover:shadow-lg',
    scale: 'hover:scale-105',
    scaleIcon: 'group-hover:scale-110',
  } as const,

  // Focus states for accessibility
  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-offset-2',
    ringBlue: 'focus:ring-kids-blue',
    ringPurple: 'focus:ring-kids-purple',
    ringGreen: 'focus:ring-kids-green',
  } as const,

  // Base card styles
  card: {
    base: 'bg-white/90 rounded-2xl border-2 shadow-sm',
    interactive: 'cursor-pointer',
  } as const,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get combined classes for an InnerCard component
 */
export function getInnerCardClasses(
  color: ColorVariant,
  interactive: boolean = false
): string {
  const baseClasses = [
    DesignTokens.card.base,
    DesignTokens.spacing.cardPadding,
    DesignTokens.border[color],
    DesignTokens.borderHover[color],
    DesignTokens.hover.lift,
    DesignTokens.hover.shadow,
    DesignTokens.transitions.all,
    'group',
  ];

  if (interactive) {
    baseClasses.push(DesignTokens.card.interactive);
  }

  return baseClasses.join(' ');
}

/**
 * Get combined classes for an IconContainer component
 */
export function getIconContainerClasses(
  color: ColorVariant,
  size: IconSize = 'md'
): string {
  return [
    DesignTokens.iconSize[size],
    DesignTokens.background[color],
    'rounded-xl',
    'flex items-center justify-center',
    DesignTokens.hover.scaleIcon,
    DesignTokens.transitions.transform,
  ].join(' ');
}

/**
 * Get the icon size class based on container size
 */
export function getIconInnerSize(size: IconSize = 'md'): string {
  return DesignTokens.iconInnerSize[size];
}

/**
 * Map highlight variants to color variants
 */
export function highlightToColor(variant: HighlightVariant): ColorVariant {
  const mapping: Record<HighlightVariant, ColorVariant> = {
    info: 'blue',
    warning: 'yellow',
    success: 'green',
    tip: 'purple',
  };
  return mapping[variant];
}

/**
 * Get combined classes for a HighlightBox component
 */
export function getHighlightBoxClasses(variant: HighlightVariant): string {
  const color = highlightToColor(variant);

  return [
    'bg-white/80',
    'p-4',
    'rounded-xl',
    `border border-kids-${color}/20`,
  ].join(' ');
}

/**
 * Get grid classes based on column count
 */
export function getGridClasses(columns: GridColumns): string {
  return [
    'grid',
    DesignTokens.grid[columns],
    DesignTokens.spacing.cardGap,
  ].join(' ');
}

/**
 * Get button classes for design system variants
 */
export function getButtonClasses(color: ColorVariant): string {
  return [
    `bg-kids-${color}`,
    `hover:bg-kids-${color}/90`,
    'text-white',
    'shadow-lg',
    'hover:shadow-xl',
    'hover:-translate-y-0.5',
    'transition-all',
    'min-h-[44px]', // WCAG 2.1 AA touch target
    'min-w-[44px]',
  ].join(' ');
}

/**
 * Get outline button classes for design system variants
 */
export function getOutlineButtonClasses(color: ColorVariant): string {
  return [
    'border-2',
    `border-kids-${color}`,
    `text-kids-${color}`,
    `hover:bg-kids-${color}/5`,
    'min-h-[44px]', // WCAG 2.1 AA touch target
    'min-w-[44px]',
  ].join(' ');
}
