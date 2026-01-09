import { ReactNode } from 'react';
import { LucideIcon, ArrowRight, Clock, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorVariant } from '@/design-system/tokens';
import { InnerCard, IconContainer, CardTitle, CardDescription } from './InnerCard';

interface LessonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: ColorVariant;
  lessonNumber?: number;
  duration?: string;
  status?: 'locked' | 'available' | 'in-progress' | 'completed';
  progress?: number; // 0-100
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: ReactNode;
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
 *   icon={Brain}
 *   color="blue"
 *   lessonNumber={1}
 *   duration="15 min"
 *   status="completed"
 *   progress={100}
 *   onClick={() => navigate('/lesson/1')}
 * />
 * ```
 */
export function LessonCard({
  title,
  description,
  icon: Icon,
  color = 'blue',
  lessonNumber,
  duration,
  status = 'available',
  progress = 0,
  onClick,
  href,
  className,
  children,
}: LessonCardProps) {
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

  const colorBgClasses: Record<ColorVariant, string> = {
    blue: 'bg-kids-blue',
    purple: 'bg-kids-purple',
    green: 'bg-kids-green',
    pink: 'bg-kids-pink',
    orange: 'bg-kids-orange',
    yellow: 'bg-kids-yellow',
    red: 'bg-kids-red',
    teal: 'bg-kids-teal',
  };

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

  return (
    <InnerCard
      color={status === 'locked' ? 'blue' : color}
      onClick={isClickable ? handleClick : undefined}
      className={cn(
        status === 'locked' && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      {/* Header with lesson number and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <IconContainer color={status === 'locked' ? 'blue' : color}>
            <Icon className={cn(
              'w-6 h-6',
              status === 'locked' ? 'text-gray-400' : colorTextClasses[color]
            )} />
          </IconContainer>
          {lessonNumber && (
            <span className={cn(
              'px-2 py-1 text-xs font-bold rounded-full',
              status === 'locked'
                ? 'bg-gray-100 text-gray-400'
                : `bg-kids-${color}/10 ${colorTextClasses[color]}`
            )}>
              Lesson {lessonNumber}
            </span>
          )}
        </div>
        <StatusIcon />
      </div>

      {/* Title with arrow */}
      <div className="flex items-center gap-2">
        <CardTitle color={status === 'locked' ? 'blue' : color}>
          {title}
        </CardTitle>
        {isClickable && (
          <ArrowRight className={cn(
            'w-4 h-4 opacity-0 -translate-x-2',
            'group-hover:opacity-100 group-hover:translate-x-0',
            'transition-all',
            colorTextClasses[color]
          )} />
        )}
      </div>

      {/* Description */}
      <CardDescription className={status === 'locked' ? 'text-gray-400' : undefined}>
        {description}
      </CardDescription>

      {/* Progress bar */}
      {status !== 'locked' && progress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', colorBgClasses[color])}
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

export default LessonCard;
