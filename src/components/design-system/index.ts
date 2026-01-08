/**
 * Design System Components
 *
 * Centralized exports for all design system components.
 *
 * @example
 * ```tsx
 * import { InnerCard, CardGrid, HighlightBox, IconContainer } from '@/components/design-system';
 * ```
 */

export { InnerCard, type InnerCardProps } from './InnerCard';
export { CardGrid, type CardGridProps } from './CardGrid';
export { HighlightBox, type HighlightBoxProps } from './HighlightBox';
export { IconContainer, type IconContainerProps } from './IconContainer';

// Re-export design tokens for convenience
export {
  type ColorVariant,
  type HighlightVariant,
  type IconSize,
  type GridColumns,
  DesignTokens,
  getInnerCardClasses,
  getIconContainerClasses,
  getHighlightBoxClasses,
  getGridClasses,
  highlightToColor,
} from '@/design-system/tokens';
