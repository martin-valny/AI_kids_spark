import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorVariant } from '@/design-system/tokens';
import { InnerCard, IconContainer, CardTitle, CardDescription } from './InnerCard';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: ColorVariant;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
  children?: ReactNode;
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
 *   icon={BookOpen}
 *   color="blue"
 *   variant="default"
 * />
 * ```
 */
export function FeatureCard({
  title,
  description,
  icon: Icon,
  color = 'blue',
  variant = 'default',
  className,
  children,
}: FeatureCardProps) {
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

  if (variant === 'horizontal') {
    return (
      <InnerCard color={color} className={cn('flex items-start gap-4', className)}>
        <IconContainer color={color} className="mb-0 flex-shrink-0">
          <Icon className={cn('w-6 h-6', colorTextClasses[color])} />
        </IconContainer>
        <div className="flex-1">
          <CardTitle color={color}>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {children}
        </div>
      </InnerCard>
    );
  }

  if (variant === 'compact') {
    return (
      <InnerCard color={color} className={cn('p-4', className)}>
        <IconContainer color={color} size="sm">
          <Icon className={cn('w-5 h-5', colorTextClasses[color])} />
        </IconContainer>
        <h4 className={cn(
          'text-base font-bold text-gray-800 mb-1 transition-colors',
          `group-hover:${colorTextClasses[color]}`
        )}>
          {title}
        </h4>
        <p className="text-xs text-gray-600">{description}</p>
        {children}
      </InnerCard>
    );
  }

  // Default variant
  return (
    <InnerCard color={color} className={className}>
      <IconContainer color={color}>
        <Icon className={cn('w-6 h-6', colorTextClasses[color])} />
      </IconContainer>
      <CardTitle color={color}>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {children}
    </InnerCard>
  );
}

export default FeatureCard;
