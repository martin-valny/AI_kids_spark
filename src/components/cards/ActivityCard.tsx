import { ReactNode } from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorVariant } from '@/design-system/tokens';
import { InnerCard, IconContainer, CardTitle, CardDescription } from './InnerCard';

interface ActivityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: ColorVariant;
  onClick?: () => void;
  href?: string;
  badge?: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  className?: string;
  children?: ReactNode;
}

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
 *   icon={Brain}
 *   color="purple"
 *   duration="10 min"
 *   difficulty="easy"
 *   onClick={() => startActivity()}
 * />
 * ```
 */
export function ActivityCard({
  title,
  description,
  icon: Icon,
  color = 'blue',
  onClick,
  href,
  badge,
  duration,
  difficulty,
  className,
  children,
}: ActivityCardProps) {
  const colorTextClasses: Record<ColorVariant, string> = {
    blue: 'text-kids-blue',
    purple: 'text-kids-purple',
    green: 'text-kids-green',
    pink: 'text-kids-pink',
    orange: 'text-kids-orange',
    yellow: 'text-kids-yellow',
    red: 'text-kids-red',
    teal: 'text-kids-teal',
  };

  const difficultyColors = {
    easy: 'bg-kids-green/10 text-kids-green',
    medium: 'bg-kids-yellow/10 text-kids-yellow',
    hard: 'bg-kids-orange/10 text-kids-orange',
  };

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <InnerCard
      color={color}
      onClick={onClick || href ? handleClick : undefined}
      className={cn('relative', className)}
    >
      {/* Badge */}
      {badge && (
        <span className={cn(
          'absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full',
          `bg-kids-${color}/10 ${colorTextClasses[color]}`
        )}>
          {badge}
        </span>
      )}

      {/* Icon */}
      <IconContainer color={color}>
        <Icon className={cn('w-6 h-6', colorTextClasses[color])} />
      </IconContainer>

      {/* Title with arrow */}
      <div className="flex items-center gap-2">
        <CardTitle color={color}>{title}</CardTitle>
        {(onClick || href) && (
          <ArrowRight className={cn(
            'w-4 h-4 opacity-0 -translate-x-2',
            'group-hover:opacity-100 group-hover:translate-x-0',
            'transition-all',
            colorTextClasses[color]
          )} />
        )}
      </div>

      {/* Description */}
      <CardDescription>{description}</CardDescription>

      {/* Meta info */}
      {(duration || difficulty) && (
        <div className="flex items-center gap-3 mt-4">
          {duration && (
            <span className="text-xs text-gray-500">{duration}</span>
          )}
          {difficulty && (
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              difficultyColors[difficulty]
            )}>
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

export default ActivityCard;
