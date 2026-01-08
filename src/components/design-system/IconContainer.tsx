import React from 'react';
import { cn } from '@/lib/utils';
import {
  type ColorVariant,
  type IconSize,
  getIconContainerClasses,
  getIconInnerSize,
  DesignTokens,
} from '@/design-system/tokens';

export interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color variant for the container background and icon color */
  color: ColorVariant;
  /** Size of the icon container */
  size?: IconSize;
  /** Icon to display (can be passed as children or icon prop) */
  icon?: React.ReactNode;
  /** Alternative to icon prop - icon can also be passed as children */
  children?: React.ReactNode;
  /** Whether the container should animate on parent group hover */
  animateOnGroupHover?: boolean;
  /** Custom aria-label for accessibility */
  'aria-label'?: string;
}

/**
 * IconContainer Component
 *
 * A styled container for icons with consistent sizing, colors,
 * and hover animations. Used within InnerCard or standalone.
 *
 * Size Reference:
 * - sm: 32x32px container, 16x16px icon
 * - md: 48x48px container, 24x24px icon
 * - lg: 64x64px container, 32x32px icon
 *
 * @example
 * ```tsx
 * // Using icon prop
 * <IconContainer color="blue" size="md" icon={<Brain />} />
 *
 * // Using children
 * <IconContainer color="purple" size="lg">
 *   <Sparkles />
 * </IconContainer>
 *
 * // Within a group (animates on parent hover)
 * <div className="group">
 *   <IconContainer color="green" animateOnGroupHover />
 * </div>
 * ```
 */
export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  (
    {
      color,
      size = 'md',
      icon,
      children,
      animateOnGroupHover = true,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Get base container classes
    const baseClasses = [
      DesignTokens.iconSize[size],
      DesignTokens.background[color],
      'rounded-xl',
      'flex items-center justify-center',
      DesignTokens.transitions.transform,
    ];

    // Add group hover animation if enabled
    if (animateOnGroupHover) {
      baseClasses.push(DesignTokens.hover.scaleIcon);
    }

    const containerClasses = baseClasses.join(' ');
    const iconSizeClass = getIconInnerSize(size);

    // Determine which icon to render (icon prop takes precedence over children)
    const iconToRender = icon || children;

    // Clone the icon element to add appropriate size and color classes
    const renderIcon = () => {
      if (!iconToRender) return null;

      if (React.isValidElement(iconToRender)) {
        return React.cloneElement(iconToRender as React.ReactElement<{ className?: string }>, {
          className: cn(
            iconSizeClass,
            DesignTokens.text[color],
            (iconToRender as React.ReactElement<{ className?: string }>).props.className
          ),
        });
      }

      return iconToRender;
    };

    return (
      <div
        ref={ref}
        className={cn(containerClasses, className)}
        role="img"
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        {...props}
      >
        {renderIcon()}
      </div>
    );
  }
);

IconContainer.displayName = 'IconContainer';

export default IconContainer;
