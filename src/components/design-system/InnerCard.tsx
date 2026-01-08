import React from 'react';
import { cn } from '@/lib/utils';
import {
  type ColorVariant,
  getInnerCardClasses,
  getIconContainerClasses,
  getIconInnerSize,
  DesignTokens,
} from '@/design-system/tokens';

export interface InnerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color variant for the card border and accents */
  color: ColorVariant;
  /** Optional title displayed at the top of the card */
  title?: string;
  /** Optional description text below the title */
  description?: string;
  /** Optional icon component to display in an icon container */
  icon?: React.ReactNode;
  /** Card content */
  children?: React.ReactNode;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Custom aria-label for accessibility */
  'aria-label'?: string;
}

/**
 * InnerCard Component
 *
 * A standardized card component for displaying content within the AI Kids Spark
 * application. Follows the "High-Opacity Glass" design pattern with consistent
 * framing, hover effects, and accessibility features.
 *
 * @example
 * ```tsx
 * <InnerCard
 *   color="blue"
 *   title="Learn AI Basics"
 *   description="Start your journey into artificial intelligence"
 *   icon={<Brain className="w-6 h-6" />}
 * />
 * ```
 */
export const InnerCard = React.forwardRef<HTMLDivElement, InnerCardProps>(
  (
    {
      color,
      title,
      description,
      icon,
      children,
      interactive = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const cardClasses = getInnerCardClasses(color, interactive);
    const iconContainerClasses = getIconContainerClasses(color, 'md');
    const iconInnerSize = getIconInnerSize('md');

    // Determine the appropriate role based on interactivity
    const role = interactive ? 'button' : undefined;
    const tabIndex = interactive ? 0 : undefined;

    return (
      <div
        ref={ref}
        className={cn(cardClasses, className)}
        role={role}
        tabIndex={tabIndex}
        aria-label={ariaLabel || title}
        {...props}
      >
        {/* Icon Container */}
        {icon && (
          <div
            className={cn(iconContainerClasses, 'mb-4')}
            aria-hidden="true"
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                  className: cn(
                    iconInnerSize,
                    DesignTokens.text[color],
                    (icon as React.ReactElement<{ className?: string }>).props.className
                  ),
                })
              : icon}
          </div>
        )}

        {/* Title */}
        {title && (
          <h4
            className={cn(
              'text-lg font-bold text-gray-800 mb-2',
              DesignTokens.groupHoverText[color],
              DesignTokens.transitions.colors
            )}
          >
            {title}
          </h4>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}

        {/* Additional Content */}
        {children}
      </div>
    );
  }
);

InnerCard.displayName = 'InnerCard';

export default InnerCard;
