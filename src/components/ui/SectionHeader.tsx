
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary' | 'section';
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  variant = 'secondary',
  centered = true,
  className,
}) => {
  const variantClasses = {
    primary: 'heading-primary',
    secondary: 'heading-secondary',
    section: 'heading-section',
  };

  return (
    <div className={cn(
      'mb-12',
      centered && 'text-center',
      className
    )}>
      <h2 className={cn(variantClasses[variant], 'mb-4')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-body max-w-3xl',
          centered && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export { SectionHeader };
