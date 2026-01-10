import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ColorVariant, DesignTokens } from '@/design-system/tokens';
import { InnerCard } from './InnerCard';

export interface ActivityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: ColorVariant;
  onClick?: () => void;
  href?: string;
  badge?: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  className?: string;
  children?: React.ReactNode;
}

const difficultyColors = {
  easy: 'bg-kids-green/10 text-kids-green',
  medium: 'bg-kids-yellow/10 text-kids-yellow',
  hard: 'bg-kids-orange/10 text-kids-orange',
};

/**
 * ActivityCard - Card for interactive activities and exercises
 *
 * Features:
 * - Icon with animated container
 * - Title and description
 * - Optional badge, duration, and difficulty
 * - Hover arrow indicator
 * - Click handler or link
 *
 * @example
 * ```tsx
 * <ActivityCard
 *   title="Pattern Detective"
 *   description="Can you spot the patterns?"
 *   icon={<Brain className="w-6 h-6" />}
 *   color="purple"
 *   duration="10 min"
 *   difficulty="easy"
 *   onClick={() => startActivity()}
 * />
 * ```
 */
export const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  (
    {
      title,
      description,
      icon,
      color = 'blue',
      onClick,
      href,
      badge,
      duration,
      difficulty,
      className,
      children,
    },
    ref
  ) => {
    const handleClick = () => {
      if (href) {
        window.location.href = href;
      } else if (onClick) {
        onClick();
      }
    };

    const isInteractive = !!(onClick || href);

    return (
      <InnerCard
        ref={ref}
        color={color}
        interactive={isInteractive}
        onClick={isInteractive ? handleClick : undefined}
        className={cn('relative', className)}
      >
        {/* Badge */}
        {badge && (
          <span
            className={cn(
              'absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full',
              DesignTokens.iconBg[color],
              DesignTokens.text[color]
            )}
          >
            {badge}
          </span>
        )}

        {/* Icon */}
        <InnerCard color={color} icon={icon} className="p-0 border-0 shadow-none bg-transparent">
          {/* Empty - just using for icon display */}
        </InnerCard>

        {/* Title with arrow */}
        <div className="flex items-center gap-2 -mt-4">
          <h4
            className={cn(
              'text-lg font-bold text-gray-800 mb-2',
              DesignTokens.groupHoverText[color],
              DesignTokens.transitions.colors
            )}
          >
            {title}
          </h4>
          {isInteractive && (
            <ArrowRight
              className={cn(
                'w-4 h-4 opacity-0 -translate-x-2',
                'group-hover:opacity-100 group-hover:translate-x-0',
                'transition-all',
                DesignTokens.text[color]
              )}
            />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Meta info */}
        {(duration || difficulty) && (
          <div className="flex items-center gap-3 mt-4">
            {duration && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {duration}
              </span>
            )}
            {difficulty && (
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  difficultyColors[difficulty]
                )}
              >
                {difficulty}
              </span>
            )}
          </div>
        )}

        {/* Additional content slot */}
        {children}
      </InnerCard>
    );
  }
);

ActivityCard.displayName = 'ActivityCard';

export default ActivityCard;
