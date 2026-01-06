
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red';
  hover?: boolean;
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const variantClasses = {
      default: 'glass-card',
      strong: 'glass-card-strong',
      blue: 'glass-blue',
      purple: 'glass-purple',
      green: 'glass-green',
      pink: 'glass-pink',
      orange: 'glass-orange',
      yellow: 'glass-yellow',
      red: 'glass-red',
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          hover && 'glass-card-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
