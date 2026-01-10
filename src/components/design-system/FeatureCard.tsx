import React from 'react';
import { cn } from '@/lib/utils';
import { type ColorVariant, DesignTokens } from '@/design-system/tokens';
import { InnerCard } from './InnerCard';

export type FeatureCardVariant = 'default' | 'compact' | 'horizontal';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: ColorVariant;
  variant?: FeatureCardVariant;
  className?: string;
  children?: React.ReactNode;
}

/**
 * FeatureCard - Card for displaying features and benefits
 *
 * Variants:
 * - default: Vertical layout with icon, title, description
 * - compact: Smaller padding, good for dense grids
 * - horizontal: Icon on left, content on right
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   title="Interactive Lessons"
 *   description="Learn by doing with hands-on exercises"
 *   icon={<BookOpen className="w-6 h-6" />}
 *   color="blue"
 *   variant="default"
 * />
 * ```
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, icon, color = 'blue', variant = 'default', className, children }, ref) => {
    if (variant === 'horizontal') {
      return (
        <InnerCard ref={ref} color={color} className={cn('flex items-start gap-4', className)}>
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              'group-hover:scale-110 transition-transform',
              DesignTokens.iconBg[color]
            )}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                  className: cn('w-6 h-6', DesignTokens.text[color]),
                })
              : icon}
          </div>
          <div className="flex-1">
            <h4
              className={cn(
                'text-lg font-bold text-gray-800 mb-2',
                DesignTokens.groupHoverText[color],
                DesignTokens.transitions.colors
              )}
            >
              {title}
            </h4>
            <p className="text-sm text-gray-600">{description}</p>
            {children}
          </div>
        </InnerCard>
      );
    }

    if (variant === 'compact') {
      return (
        <InnerCard ref={ref} color={color} className={cn('p-4', className)}>
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
              'group-hover:scale-110 transition-transform',
              DesignTokens.iconBg[color]
            )}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                  className: cn('w-5 h-5', DesignTokens.text[color]),
                })
              : icon}
          </div>
          <h4
            className={cn(
              'text-base font-bold text-gray-800 mb-1',
              DesignTokens.groupHoverText[color],
              DesignTokens.transitions.colors
            )}
          >
            {title}
          </h4>
          <p className="text-xs text-gray-600">{description}</p>
          {children}
        </InnerCard>
      );
    }

    // Default variant
    return (
      <InnerCard
        ref={ref}
        color={color}
        icon={icon}
        title={title}
        description={description}
        className={className}
      >
        {children}
      </InnerCard>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
