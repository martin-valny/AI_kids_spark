import React from 'react';
import { ArrowRight, Clock, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ColorVariant, DesignTokens } from '@/design-system/tokens';
import { InnerCard } from './InnerCard';

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: ColorVariant;
  lessonNumber?: number;
  duration?: string;
  status?: LessonStatus;
  progress?: number; // 0-100
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * LessonCard - Card for educational lessons with progress tracking
 *
 * Features:
 * - Lesson number badge
 * - Progress indicator
 * - Status states (locked, available, in-progress, completed)
 * - Duration display
 *
 * @example
 * ```tsx
 * <LessonCard
 *   title="Introduction to AI"
 *   description="Learn what AI is and how it works"
 *   icon={<Brain className="w-6 h-6" />}
 *   color="blue"
 *   lessonNumber={1}
 *   duration="15 min"
 *   status="completed"
 *   progress={100}
 *   onClick={() => navigate('/lesson/1')}
 * />
 * ```
 */
export const LessonCard = React.forwardRef<HTMLDivElement, LessonCardProps>(
  (
    {
      title,
      description,
      icon,
      color = 'blue',
      lessonNumber,
      duration,
      status = 'available',
      progress = 0,
      onClick,
      href,
      className,
      children,
    },
    ref
  ) => {
    const isClickable = status !== 'locked' && (onClick || href);

    const handleClick = () => {
      if (status === 'locked') return;
      if (href) {
        window.location.href = href;
      } else if (onClick) {
        onClick();
      }
    };

    const StatusIcon = () => {
      switch (status) {
        case 'completed':
          return <CheckCircle className="w-5 h-5 text-kids-green" />;
        case 'locked':
          return <Lock className="w-5 h-5 text-gray-400" />;
        default:
          return null;
      }
    };

    const effectiveColor = status === 'locked' ? 'blue' : color;

    return (
      <InnerCard
        ref={ref}
        color={effectiveColor}
        interactive={!!isClickable}
        onClick={isClickable ? handleClick : undefined}
        className={cn(status === 'locked' && 'opacity-60 cursor-not-allowed', className)}
      >
        {/* Header with lesson number and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                'group-hover:scale-110 transition-transform',
                status === 'locked' ? 'bg-gray-100' : DesignTokens.iconBg[color]
              )}
            >
              {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                    className: cn(
                      'w-6 h-6',
                      status === 'locked' ? 'text-gray-400' : DesignTokens.text[color]
                    ),
                  })
                : icon}
            </div>
            {lessonNumber && (
              <span
                className={cn(
                  'px-2 py-1 text-xs font-bold rounded-full',
                  status === 'locked'
                    ? 'bg-gray-100 text-gray-400'
                    : cn(DesignTokens.iconBg[color], DesignTokens.text[color])
                )}
              >
                Lesson {lessonNumber}
              </span>
            )}
          </div>
          <StatusIcon />
        </div>

        {/* Title with arrow */}
        <div className="flex items-center gap-2">
          <h4
            className={cn(
              'text-lg font-bold text-gray-800 mb-2',
              status !== 'locked' && DesignTokens.groupHoverText[color],
              DesignTokens.transitions.colors
            )}
          >
            {title}
          </h4>
          {isClickable && (
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
        <p className={cn('text-sm', status === 'locked' ? 'text-gray-400' : 'text-gray-600')}>
          {description}
        </p>

        {/* Progress bar */}
        {status !== 'locked' && progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', DesignTokens.bg[color])}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Duration */}
        {duration && (
          <div className="flex items-center gap-1 mt-4 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        )}

        {/* Additional content slot */}
        {children}
      </InnerCard>
    );
  }
);

LessonCard.displayName = 'LessonCard';

export default LessonCard;
