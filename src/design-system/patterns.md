# Design System Patterns

This document describes the implementation patterns for the AI Kids Spark design system.

## Overview

The design system follows the "High-Opacity Glass" aesthetic, providing:
- **Readability**: High opacity backgrounds (90%+) for perfect text contrast
- **Consistency**: Standardized components with predictable behavior
- **Accessibility**: WCAG 2.1 AA compliant touch targets and focus states
- **Delight**: Smooth animations and colorful, kid-friendly visuals

## Color Variants

All components support these color variants:

| Variant  | Use Case                           |
|----------|-----------------------------------|
| `blue`   | Primary actions, information      |
| `purple` | Interactive elements, tips        |
| `green`  | Success states, achievements      |
| `pink`   | Creative features                 |
| `orange` | Warnings, attention               |
| `yellow` | Highlights, energy                |
| `red`    | Errors, important alerts          |
| `teal`   | Secondary information             |

## Component Patterns

### InnerCard

A card component for content within GlassCard containers.

```tsx
import { InnerCard } from '@/components/design-system/InnerCard';
import { Brain } from 'lucide-react';

<InnerCard
  color="blue"
  title="AI Basics"
  description="Learn how AI works"
  icon={<Brain />}
/>
```

**Props:**
- `color`: ColorVariant - Border and accent color
- `title?`: string - Card title
- `description?`: string - Card description
- `icon?`: ReactNode - Icon to display
- `interactive?`: boolean - Makes card clickable
- `children?`: ReactNode - Additional content

### CardGrid

Responsive grid layout for InnerCard components.

```tsx
import { CardGrid } from '@/components/design-system/CardGrid';

<CardGrid columns={3}>
  <InnerCard color="blue" title="Card 1" />
  <InnerCard color="purple" title="Card 2" />
  <InnerCard color="green" title="Card 3" />
</CardGrid>
```

**Props:**
- `columns`: 2 | 3 | 4 - Number of columns (responsive)
- `children`: ReactNode - InnerCard components

**Responsive Behavior:**
- 2 columns: 1 col on mobile, 2 on md+
- 3 columns: 1 on mobile, 2 on md, 3 on lg+
- 4 columns: 2 on mobile, 4 on md+

### HighlightBox

Semantic highlight box for tips, warnings, and information.

```tsx
import { HighlightBox } from '@/components/design-system/HighlightBox';

<HighlightBox variant="tip">
  <strong>Pro Tip:</strong> Use these for key takeaways.
</HighlightBox>
```

**Props:**
- `variant`: 'info' | 'warning' | 'success' | 'tip'
- `icon?`: ReactNode - Custom icon (overrides default)
- `showIcon?`: boolean - Show/hide icon (default: true)
- `children`: ReactNode - Content

**Variant Mapping:**
- `info` → blue with Info icon
- `warning` → yellow with AlertTriangle icon
- `success` → green with CheckCircle icon
- `tip` → purple with Lightbulb icon

### IconContainer

Styled container for icons with consistent sizing.

```tsx
import { IconContainer } from '@/components/design-system/IconContainer';
import { Star } from 'lucide-react';

<IconContainer color="purple" size="md" icon={<Star />} />
```

**Props:**
- `color`: ColorVariant - Background and icon color
- `size`: 'sm' | 'md' | 'lg' - Container size
- `icon?`: ReactNode - Icon to display
- `children?`: ReactNode - Alternative to icon prop
- `animateOnGroupHover?`: boolean - Scale on parent hover

**Size Reference:**
- `sm`: 32x32px container, 16x16px icon
- `md`: 48x48px container, 24x24px icon
- `lg`: 64x64px container, 32x32px icon

### Button (Design System Variants)

Extended Button component with kids-friendly variants.

```tsx
import { Button } from '@/components/ui/button';

<Button variant="kids-blue">Primary Action</Button>
<Button variant="kids-purple-outline">Secondary</Button>
<Button variant="kids-green" size="touch">Accessible</Button>
```

**New Variants:**
- `kids-blue`, `kids-purple`, `kids-green`, `kids-pink`
- `kids-orange`, `kids-yellow`, `kids-red`, `kids-teal`
- `kids-blue-outline`, `kids-purple-outline`, `kids-green-outline`

**New Size:**
- `touch`: 44px minimum for WCAG 2.1 AA accessibility

## Using Design Tokens

Import tokens for consistent styling:

```tsx
import {
  DesignTokens,
  getInnerCardClasses,
  getHighlightBoxClasses,
  getIconContainerClasses,
} from '@/design-system/tokens';

// Use token values
const borderClass = DesignTokens.border.blue;
const textClass = DesignTokens.text.purple;

// Or use helper functions
const cardClasses = getInnerCardClasses('green', true);
```

## Accessibility Requirements

1. **Touch Targets**: All interactive elements must be at least 44x44px
2. **Focus States**: Visible focus rings with appropriate contrast
3. **ARIA Labels**: Provide descriptive labels for screen readers
4. **Color Contrast**: Text maintains 4.5:1 ratio on all backgrounds

## Animation Guidelines

1. **Duration**: Use 200-300ms for micro-interactions
2. **Easing**: Use `ease-out` for entering, `ease-in` for exiting
3. **Hover Effects**: Subtle lifts (-1 to -4px) and shadow increases
4. **Reduced Motion**: Respect `prefers-reduced-motion` where possible

## File Structure

```
src/
├── design-system/
│   ├── tokens.ts          # Design tokens and helpers
│   └── patterns.md        # This documentation
└── components/
    ├── design-system/
    │   ├── InnerCard.tsx
    │   ├── CardGrid.tsx
    │   ├── HighlightBox.tsx
    │   └── IconContainer.tsx
    └── ui/
        ├── button.tsx     # Extended with design variants
        └── GlassCard.tsx  # Container component
```
