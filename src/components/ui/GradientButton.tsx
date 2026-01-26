
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GradientButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'default' | 'large' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

interface GradientButtonAsButton extends GradientButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: never;
}

interface GradientButtonAsLink extends GradientButtonBaseProps {
  to: string;
  onClick?: never;
  type?: never;
}

type GradientButtonProps = GradientButtonAsButton | GradientButtonAsLink;

const GradientButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, GradientButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'default',
    icon: Icon,
    iconPosition = 'right',
    children,
    to,
    ...props
  }, ref) => {
    // Normalize size prop
    const normalizedSize = size === 'lg' ? 'large' : size;

    const baseClasses = variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
      ? 'btn-secondary'
      : 'btn-secondary';

    const sizeClasses = {
      small: 'btn-small',
      default: '',
      large: 'btn-large',
    };

    const content = (
      <>
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
      </>
    );

    const combinedClassName = cn(
      baseClasses,
      sizeClasses[normalizedSize],
      className
    );

    if (to) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={combinedClassName}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export { GradientButton };
