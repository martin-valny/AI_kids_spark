import React from 'react';
import { cn } from '@/lib/utils';
import {
  type HighlightVariant,
  getHighlightBoxClasses,
  highlightToColor,
  DesignTokens,
} from '@/design-system/tokens';
import { Info, AlertTriangle, CheckCircle, Lightbulb, type LucideIcon } from 'lucide-react';

export interface HighlightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic variant determining the color and default icon */
  variant: HighlightVariant;
  /** Optional custom icon (overrides default variant icon) */
  icon?: React.ReactNode;
  /** Content of the highlight box */
  children: React.ReactNode;
  /** Whether to show the default variant icon */
  showIcon?: boolean;
  /** Custom aria-label for accessibility */
  'aria-label'?: string;
}

/**
 * Default icons for each variant
 */
const variantIcons: Record<HighlightVariant, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  tip: Lightbulb,
};

/**
 * Accessible labels for each variant
 */
const variantLabels: Record<HighlightVariant, string> = {
  info: 'Information',
  warning: 'Warning',
  success: 'Success',
  tip: 'Tip',
};

/**
 * HighlightBox Component
 *
 * A styled box for highlighting important information, tips, warnings,
 * or success messages. Uses semantic variants that map to appropriate
 * colors and icons.
 *
 * @example
 * ```tsx
 * <HighlightBox variant="tip">
 *   <strong>Pro Tip:</strong> Use these boxes for key takeaways.
 * </HighlightBox>
 *
 * <HighlightBox variant="warning" icon={<CustomIcon />}>
 *   Please review before proceeding.
 * </HighlightBox>
 * ```
 */
export const HighlightBox = React.forwardRef<HTMLDivElement, HighlightBoxProps>(
  (
    {
      variant,
      icon,
      children,
      showIcon = true,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const color = highlightToColor(variant);
    const boxClasses = getHighlightBoxClasses(color);
    const DefaultIcon = variantIcons[variant];

    // Determine the icon to display
    const renderIcon = () => {
      if (!showIcon) return null;

      if (icon) {
        // Custom icon provided
        return React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: cn(
                'w-4 h-4',
                DesignTokens.text[color],
                (icon as React.ReactElement<{ className?: string }>).props.className
              ),
            })
          : icon;
      }

      // Use default variant icon
      return <DefaultIcon className={cn('w-4 h-4', DesignTokens.text[color])} />;
    };

    return (
      <div
        ref={ref}
        className={cn(boxClasses, className)}
        role="note"
        aria-label={ariaLabel || variantLabels[variant]}
        {...props}
      >
        <div className="flex items-start gap-2">
          {showIcon && (
            <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
              {renderIcon()}
            </span>
          )}
          <div className="text-sm text-gray-700 font-medium flex-1">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

HighlightBox.displayName = 'HighlightBox';

/**
 * TipBox - Shorthand for HighlightBox with tip variant
 */
export const TipBox: React.FC<Omit<HighlightBoxProps, 'variant'>> = (props) => (
  <HighlightBox variant="tip" {...props} />
);
TipBox.displayName = 'TipBox';

/**
 * WarningBox - Shorthand for HighlightBox with warning variant
 */
export const WarningBox: React.FC<Omit<HighlightBoxProps, 'variant'>> = (props) => (
  <HighlightBox variant="warning" {...props} />
);
WarningBox.displayName = 'WarningBox';

/**
 * SuccessBox - Shorthand for HighlightBox with success variant
 */
export const SuccessBox: React.FC<Omit<HighlightBoxProps, 'variant'>> = (props) => (
  <HighlightBox variant="success" {...props} />
);
SuccessBox.displayName = 'SuccessBox';

/**
 * InfoBox - Shorthand for HighlightBox with info variant
 */
export const InfoBox: React.FC<Omit<HighlightBoxProps, 'variant'>> = (props) => (
  <HighlightBox variant="info" {...props} />
);
InfoBox.displayName = 'InfoBox';

export default HighlightBox;
