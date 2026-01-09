import { ReactNode } from 'react';
import { LucideIcon, Lightbulb, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorVariant } from '@/design-system/tokens';

type HighlightVariant = 'tip' | 'warning' | 'success' | 'info' | 'important';

interface HighlightBoxProps {
  children: ReactNode;
  variant?: HighlightVariant;
  color?: ColorVariant;
  icon?: LucideIcon;
  title?: string;
  className?: string;
}

/**
 * HighlightBox - Callout box for tips, warnings, and important information
 *
 * Built-in variants:
 * - tip: Purple with lightbulb (Pro Tip)
 * - warning: Yellow with alert triangle
 * - success: Green with check circle
 * - info: Blue with info icon
 * - important: Orange with zap icon
 *
 * @example
 * ```tsx
 * <HighlightBox variant="tip">
 *   This is a helpful tip for learners!
 * </HighlightBox>
 *
 * <HighlightBox variant="warning" title="Caution">
 *   Be careful when doing this step.
 * </HighlightBox>
 *
 * <HighlightBox color="pink" icon={Heart} title="Fun Fact">
 *   Custom highlight with any color and icon!
 * </HighlightBox>
 * ```
 */
export function HighlightBox({
  children,
  variant,
  color,
  icon: CustomIcon,
  title,
  className,
}: HighlightBoxProps) {
  // Variant configurations
  const variantConfig: Record<HighlightVariant, { color: ColorVariant; icon: LucideIcon; title: string }> = {
    tip: { color: 'purple', icon: Lightbulb, title: 'Pro Tip' },
    warning: { color: 'yellow', icon: AlertTriangle, title: 'Warning' },
    success: { color: 'green', icon: CheckCircle, title: 'Success' },
    info: { color: 'blue', icon: Info, title: 'Info' },
    important: { color: 'orange', icon: Zap, title: 'Important' },
  };

  // Use variant config or custom values
  const config = variant ? variantConfig[variant] : null;
  const finalColor = color || config?.color || 'blue';
  const Icon = CustomIcon || config?.icon || Info;
  const finalTitle = title || config?.title;

  const colorClasses: Record<ColorVariant, { border: string; icon: string }> = {
    blue: { border: 'border-kids-blue/20', icon: 'text-kids-blue' },
    purple: { border: 'border-kids-purple/20', icon: 'text-kids-purple' },
    green: { border: 'border-kids-green/20', icon: 'text-kids-green' },
    pink: { border: 'border-kids-pink/20', icon: 'text-kids-pink' },
    orange: { border: 'border-kids-orange/20', icon: 'text-kids-orange' },
    yellow: { border: 'border-kids-yellow/20', icon: 'text-kids-yellow' },
    red: { border: 'border-kids-red/20', icon: 'text-kids-red' },
    teal: { border: 'border-kids-teal/20', icon: 'text-kids-teal' },
  };

  return (
    <div
      className={cn(
        'bg-white/80 p-4 rounded-xl border',
        colorClasses[finalColor].border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', colorClasses[finalColor].icon)} />
        <div className="flex-1">
          {finalTitle && (
            <span className={cn('font-bold text-sm', colorClasses[finalColor].icon)}>
              {finalTitle}:{' '}
            </span>
          )}
          <span className="text-sm text-gray-700">{children}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * TipBox - Shorthand for HighlightBox with tip variant
 */
export function TipBox({ children, className }: { children: ReactNode; className?: string }) {
  return <HighlightBox variant="tip" className={className}>{children}</HighlightBox>;
}

/**
 * WarningBox - Shorthand for HighlightBox with warning variant
 */
export function WarningBox({ children, className }: { children: ReactNode; className?: string }) {
  return <HighlightBox variant="warning" className={className}>{children}</HighlightBox>;
}

/**
 * SuccessBox - Shorthand for HighlightBox with success variant
 */
export function SuccessBox({ children, className }: { children: ReactNode; className?: string }) {
  return <HighlightBox variant="success" className={className}>{children}</HighlightBox>;
}

/**
 * InfoBox - Shorthand for HighlightBox with info variant
 */
export function InfoBox({ children, className }: { children: ReactNode; className?: string }) {
  return <HighlightBox variant="info" className={className}>{children}</HighlightBox>;
}

export default HighlightBox;
