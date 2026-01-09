import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GridColumns = 1 | 2 | 3 | 4;

interface CardGridProps {
  children: ReactNode;
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * CardGrid - Responsive grid layout for cards
 *
 * Features:
 * - Responsive column layouts
 * - Configurable gap sizes
 * - Automatic stacking on mobile
 *
 * @example
 * ```tsx
 * <CardGrid columns={3}>
 *   <FeatureCard ... />
 *   <FeatureCard ... />
 *   <FeatureCard ... />
 * </CardGrid>
 *
 * <CardGrid columns={2} gap="lg">
 *   <LessonCard ... />
 *   <LessonCard ... />
 * </CardGrid>
 * ```
 */
export function CardGrid({
  children,
  columns = 3,
  gap = 'md',
  className,
}: CardGridProps) {
  const columnClasses: Record<GridColumns, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

interface SplitSectionProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}

/**
 * SplitSection - Two-column layout that stacks on mobile
 *
 * @example
 * ```tsx
 * <SplitSection>
 *   <div>Text content</div>
 *   <div>Visual content</div>
 * </SplitSection>
 *
 * <SplitSection reverse>
 *   <div>Visual on left for desktop</div>
 *   <div>Text on right for desktop</div>
 * </SplitSection>
 * ```
 */
export function SplitSection({
  children,
  reverse = false,
  className,
}: SplitSectionProps) {
  return (
    <div
      className={cn(
        'grid md:grid-cols-2 gap-8',
        reverse && 'md:[&>*:first-child]:order-2',
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * SectionContainer - Wrapper with consistent vertical spacing
 *
 * @example
 * ```tsx
 * <SectionContainer>
 *   <h2>Section Title</h2>
 *   <CardGrid>...</CardGrid>
 * </SectionContainer>
 * ```
 */
export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <section className={cn('space-y-8', className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * SectionHeader - Consistent header for content sections
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Popular Activities"
 *   description="Try these hands-on exercises"
 * />
 * ```
 */
export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
}

export default CardGrid;
