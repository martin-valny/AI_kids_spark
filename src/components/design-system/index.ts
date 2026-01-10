/**
 * Design System Components
 *
 * Centralized exports for all design system components.
 *
 * @example
 * ```tsx
 * import {
 *   InnerCard,
 *   CardGrid,
 *   HighlightBox,
 *   TipBox,
 *   ActivityCard,
 *   LessonCard,
 *   FeatureCard,
 *   SectionHeader
 * } from '@/components/design-system';
 * ```
 */

// Base components
export { InnerCard, type InnerCardProps } from './InnerCard';
export { IconContainer, type IconContainerProps } from './IconContainer';

// Specialized card components
export { ActivityCard, type ActivityCardProps } from './ActivityCard';
export { LessonCard, type LessonCardProps, type LessonStatus } from './LessonCard';
export { FeatureCard, type FeatureCardProps, type FeatureCardVariant } from './FeatureCard';

// Highlight/callout boxes
export {
  HighlightBox,
  TipBox,
  WarningBox,
  SuccessBox,
  InfoBox,
  type HighlightBoxProps
} from './HighlightBox';

// Layout components
export {
  CardGrid,
  SectionHeader,
  SplitSection,
  SectionContainer,
  type CardGridProps,
  type SectionHeaderProps,
  type SplitSectionProps,
  type SectionContainerProps
} from './CardGrid';

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
