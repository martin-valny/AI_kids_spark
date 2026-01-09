import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ColorVariant } from '@/design-system/tokens';

interface InnerCardProps {
  children: ReactNode;
  color?: ColorVariant;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

/**
 * InnerCard - Base card component for grid items
 *
 * Features:
 * - High-opacity glass design (bg-white/90)
 * - Colored border with hover state
 * - Lift and shadow animation
 * - Uses group for nested hover effects
 *
 * @example
 * ```tsx
 * <InnerCard color="blue">
 *   <IconContainer color="blue">
 *     <Brain className="w-6 h-6 text-kids-blue" />
 *   </IconContainer>
 *   <h4>Card Title</h4>
 *   <p>Description</p>
 * </InnerCard>
 * ```
 */
export function InnerCard({
  children,
  color = 'blue',
  className,
  onClick,
  as: Component = 'div',
}: InnerCardProps) {
  const colorClasses: Record<ColorVariant, string> = {
    blue: 'border-kids-blue/20 hover:border-kids-blue',
    purple: 'border-kids-purple/20 hover:border-kids-purple',
    green: 'border-kids-green/20 hover:border-kids-green',
    pink: 'border-kids-pink/20 hover:border-kids-pink',
    orange: 'border-kids-orange/20 hover:border-kids-orange',
    yellow: 'border-kids-yellow/20 hover:border-kids-yellow',
    red: 'border-kids-red/20 hover:border-kids-red',
    teal: 'border-kids-teal/20 hover:border-kids-teal',
  };

  return (
    <Component
      className={cn(
        'group bg-white/90 p-6 rounded-2xl border-2 shadow-sm',
        'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        colorClasses[color],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </Component>
  );
}

interface IconContainerProps {
  children: ReactNode;
  color?: ColorVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * IconContainer - Styled container for icons within cards
 *
 * @example
 * ```tsx
 * <IconContainer color="blue" size="md">
 *   <Brain className="w-6 h-6 text-kids-blue" />
 * </IconContainer>
 * ```
 */
export function IconContainer({
  children,
  color = 'blue',
  size = 'md',
  className,
}: IconContainerProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
  };

  const colorClasses: Record<ColorVariant, string> = {
    blue: 'bg-kids-blue/10',
    purple: 'bg-kids-purple/10',
    green: 'bg-kids-green/10',
    pink: 'bg-kids-pink/10',
    orange: 'bg-kids-orange/10',
    yellow: 'bg-kids-yellow/10',
    red: 'bg-kids-red/10',
    teal: 'bg-kids-teal/10',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        'flex items-center justify-center mb-4',
        'group-hover:scale-110 transition-transform',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  color?: ColorVariant;
  className?: string;
}

/**
 * CardTitle - Styled title for cards with hover color change
 */
export function CardTitle({
  children,
  color = 'blue',
  className,
}: CardTitleProps) {
  const hoverClasses: Record<ColorVariant, string> = {
    blue: 'group-hover:text-kids-blue',
    purple: 'group-hover:text-kids-purple',
    green: 'group-hover:text-kids-green',
    pink: 'group-hover:text-kids-pink',
    orange: 'group-hover:text-kids-orange',
    yellow: 'group-hover:text-kids-yellow',
    red: 'group-hover:text-kids-red',
    teal: 'group-hover:text-kids-teal',
  };

  return (
    <h4
      className={cn(
        'text-lg font-bold text-gray-800 mb-2 transition-colors',
        hoverClasses[color],
        className
      )}
    >
      {children}
    </h4>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

/**
 * CardDescription - Styled description text for cards
 */
export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-gray-600', className)}>
      {children}
    </p>
  );
}

export default InnerCard;
