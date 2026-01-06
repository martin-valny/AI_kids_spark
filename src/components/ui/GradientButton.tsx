
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'default' | 'large';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'default', 
    icon: Icon, 
    iconPosition = 'right',
    children, 
    ...props 
  }, ref) => {
    const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    const sizeClasses = {
      small: 'btn-small',
      default: '',
      large: 'btn-large',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export { GradientButton };
