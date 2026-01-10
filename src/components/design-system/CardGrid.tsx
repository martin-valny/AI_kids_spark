import React from 'react';
import { cn } from '@/lib/utils';
import { type GridColumns, getGridClasses } from '@/design-system/tokens';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns for the grid layout */
  columns?: GridColumns;
  /** Card components to display in the grid */
  children: React.ReactNode;
  /** Custom aria-label for accessibility */
  'aria-label'?: string;
}

/**
 * CardGrid Component
 *
 * A responsive grid layout container for InnerCard components.
 * Automatically adjusts columns based on screen size.
 *
 * Column Breakpoints:
 * - 2 columns: 1 on mobile, 2 on md+
 * - 3 columns: 1 on mobile, 2 on md, 3 on lg+
 * - 4 columns: 2 on mobile, 4 on md+
 *
 * @example
 * ```tsx
 * <CardGrid columns={3}>
 *   <InnerCard color="blue" title="Card 1" />
 *   <InnerCard color="purple" title="Card 2" />
 *   <InnerCard color="green" title="Card 3" />
 * </CardGrid>
 * ```
 */
export const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  (
    {
      columns = 3,
      children,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const gridClasses = getGridClasses(columns);

    return (
      <div
        ref={ref}
        className={cn(gridClasses, className)}
        role="list"
        aria-label={ariaLabel || `Grid with ${columns} columns`}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          // Wrap each child with role="listitem" for accessibility
          return (
            <div role="listitem" key={index}>
              {child}
            </div>
          );
        })}
      </div>
    );
  }
);

CardGrid.displayName = 'CardGrid';

/**
 * SectionHeader - Consistent header for content sections
 */
export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, className }) => (
  <div className={cn('space-y-2', className)}>
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {description && <p className="text-lg text-gray-600">{description}</p>}
  </div>
);
SectionHeader.displayName = 'SectionHeader';

/**
 * SplitSection - Two-column layout that stacks on mobile
 */
export interface SplitSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  reverse?: boolean;
}

export const SplitSection = React.forwardRef<HTMLDivElement, SplitSectionProps>(
  ({ children, reverse = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid md:grid-cols-2 gap-8', reverse && 'md:[&>*:first-child]:order-2', className)}
      {...props}
    >
      {children}
    </div>
  )
);
SplitSection.displayName = 'SplitSection';

/**
 * SectionContainer - Wrapper with consistent vertical spacing
 */
export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  ({ children, className, ...props }, ref) => (
    <section ref={ref} className={cn('space-y-8', className)} {...props}>
      {children}
    </section>
  )
);
SectionContainer.displayName = 'SectionContainer';

export default CardGrid;
