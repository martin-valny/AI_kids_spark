# Component Patterns - AI Spark

**Based on**: `src/pages/DesignPilot.tsx` (official design reference)
**Design System**: "High-Opacity Glass" with beginner-friendly colors

This document contains copy-paste ready patterns for building consistent UI.

---

## Table of Contents

1. [Main Container (GlassCard)](#1-main-container-glasscard)
2. [Inner Card (Grid Item)](#2-inner-card-grid-item)
3. [Highlight Box (Tips, Callouts)](#3-highlight-box-tips-callouts)
4. [Standard Grid](#4-standard-grid)
5. [Button Patterns](#5-button-patterns)
6. [Split Layout (Text + Visual)](#6-split-layout-text--visual)
7. [Icon Container](#7-icon-container)
8. [Pastel Gradient Backgrounds](#8-pastel-gradient-backgrounds)

---

## 1. Main Container (GlassCard)

**Use for**: Primary lesson content, main sections, page containers

**Features**:
- `bg-white/90` for perfect readability
- Subtle colored border (`border-{color}-200/50`)
- Backdrop blur for glassmorph effect
- Hover effects included

```tsx
<GlassCard variant="blue" className="p-8 md:p-12">
  <h2 className="text-3xl font-bold text-gray-800 mb-4">
    Section Title
  </h2>
  <p className="text-lg text-gray-700 mb-8">
    Description text goes here
  </p>
  {/* Content */}
</GlassCard>
```

**Variants**: `blue`, `purple`, `green`, `pink`, `orange`, `yellow`, `red`

---

## 2. Inner Card (Grid Item)

**Use for**: Activity cards, feature cards, info cards in grids

**Features**:
- `bg-white/90` with `border-2 border-{color}/20`
- Icon container with scale animation
- Title color change on hover
- Lift and shadow effects

```tsx
<div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20
                shadow-sm hover:border-kids-blue hover:shadow-lg hover:-translate-y-1
                transition-all duration-300">

  {/* Icon Container */}
  <div className="w-12 h-12 bg-kids-blue/10 rounded-xl
                  flex items-center justify-center mb-4
                  group-hover:scale-110 transition-transform">
    <Brain className="w-6 h-6 text-kids-blue" />
  </div>

  {/* Title */}
  <h4 className="text-lg font-bold text-gray-800 mb-2
                 group-hover:text-kids-blue transition-colors">
    Card Title
  </h4>

  {/* Description */}
  <p className="text-sm text-gray-600">
    Card description text that explains the feature or activity.
  </p>
</div>
```

**With Helper Function**:
```tsx
import { getInnerCardClasses } from '@/design-system/tokens';

<div className={getInnerCardClasses('blue')}>
  {/* Content */}
</div>
```

**Color Variants**: Replace `kids-blue` with `kids-purple`, `kids-green`, `kids-pink`, etc.

---

## 3. Highlight Box (Tips, Callouts)

**Use for**: Important callouts, tips, warnings, key takeaways

**Features**:
- `bg-white/80` (slightly more transparent)
- Subtle border
- Icon + text layout

```tsx
<div className="bg-white/80 p-4 rounded-xl border border-kids-purple/20 mb-6">
  <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
    <Zap className="w-4 h-4 text-kids-purple" />
    <strong>Pro Tip:</strong> Your key message here
  </p>
</div>
```

**With Helper Function**:
```tsx
import { getHighlightBoxClasses } from '@/design-system/tokens';

<div className={getHighlightBoxClasses('purple')}>
  {/* Content */}
</div>
```

**Variants**: Tips (purple), Warnings (yellow), Success (green), Info (blue)

---

## 4. Standard Grid

**Use for**: Multiple cards, activity listings, feature grids

**Features**:
- Responsive: 1 col mobile → 2 col tablet → 3 col desktop
- Consistent `gap-6` spacing

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Inner cards here */}
  <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20 ...">
    Card 1
  </div>
  <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 ...">
    Card 2
  </div>
  <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-green/20 ...">
    Card 3
  </div>
</div>
```

**With Design Token**:
```tsx
import { DesignTokens } from '@/design-system/tokens';

<div className={DesignTokens.grid.threeCol}>
  {/* Cards */}
</div>
```

**Variants**:
- Two columns: `grid-cols-1 md:grid-cols-2 gap-6`
- Four columns: `grid-cols-2 md:grid-cols-4 gap-4`

---

## 5. Button Patterns

**Use for**: Primary and secondary actions

### Primary Button

```tsx
<Button className="bg-kids-blue hover:bg-kids-blue/90 text-white
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5
                   transition-all">
  Primary Action
</Button>
```

### Secondary Button (Outline)

```tsx
<Button variant="outline"
        className="border-2 border-kids-blue text-kids-blue
                   hover:bg-kids-blue/5">
  Secondary Action
</Button>
```

### Button with Icon

```tsx
<Button className="bg-kids-purple hover:bg-kids-purple/90 text-white
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5
                   transition-all">
  Start Learning <ArrowRight className="ml-2 w-4 h-4" />
</Button>
```

### Button Group

```tsx
<div className="flex flex-wrap gap-4">
  <Button className="bg-kids-blue ...">Primary</Button>
  <Button variant="outline" className="border-2 border-kids-blue ...">
    Secondary
  </Button>
</div>
```

---

## 6. Split Layout (Text + Visual)

**Use for**: Detailed explanations, feature showcases, two-column content

**Features**:
- Text on left, visual on right
- Responsive: stacks on mobile
- Decorative gradient background on visual side

```tsx
<GlassCard variant="purple" className="p-0 overflow-hidden">
  <div className="grid md:grid-cols-2">

    {/* Text Side */}
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Structured Content Layouts
      </h3>
      <p className="text-gray-700 mb-6 leading-relaxed">
        For complex explanations, we use this split layout.
        The text side is clean and focused.
      </p>

      {/* Highlight Box */}
      <div className="bg-white/80 p-4 rounded-xl border border-kids-purple/20 mb-6">
        <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
          <Zap className="w-4 h-4 text-kids-purple" />
          <strong>Pro Tip:</strong> Use these for key takeaways
        </p>
      </div>

      <Button className="w-fit bg-kids-purple hover:bg-kids-purple/90 text-white">
        Start Learning <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>

    {/* Visual Side */}
    <div className="bg-gradient-to-br from-kids-purple/10 to-kids-pink/10
                    p-12 flex items-center justify-center relative">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-kids-purple/5 backdrop-blur-sm" />

      {/* Visual content (mockup, image, graphic) */}
      <div className="relative bg-white/90 p-6 rounded-2xl shadow-xl
                      border-2 border-white transform rotate-3
                      hover:rotate-0 transition-transform duration-500">
        <div className="w-32 h-32 bg-kids-purple/20 rounded-xl
                        flex items-center justify-center mb-4">
          <Play className="w-12 h-12 text-kids-purple" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>

  </div>
</GlassCard>
```

---

## 7. Icon Container

**Use for**: Icons in cards, feature highlights

**Features**:
- `w-12 h-12` standard size
- `bg-{color}/10` light background
- Scale animation on card hover

```tsx
{/* Within a group-enabled card */}
<div className="w-12 h-12 bg-kids-blue/10 rounded-xl
                flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform">
  <Brain className="w-6 h-6 text-kids-blue" />
</div>
```

**Sizes**:
- Small: `w-10 h-10 rounded-lg` (icon `w-5 h-5`)
- Medium (default): `w-12 h-12 rounded-xl` (icon `w-6 h-6`)
- Large: `w-16 h-16 rounded-2xl` (icon `w-8 h-8`)

**With Helper Function**:
```tsx
import { getIconContainerClasses } from '@/design-system/tokens';

<div className={getIconContainerClasses('blue', 'md')}>
  <Icon className="w-6 h-6 text-kids-blue" />
</div>
```

---

## 8. Pastel Gradient Backgrounds

**Use for**: Decorative backgrounds only (not for content)

**Features**:
- Always 45% opacity for subtle effect
- Gradient combinations for visual interest

```tsx
{/* Blue gradient */}
<div className="bg-gradient-to-br from-kids-blue/45 to-cyan-400/45
                p-6 rounded-xl border border-kids-blue/20">
  Content
</div>

{/* Purple gradient */}
<div className="bg-gradient-to-br from-kids-purple/45 to-kids-pink/45
                p-6 rounded-xl border border-kids-purple/20">
  Content
</div>

{/* Green gradient */}
<div className="bg-gradient-to-br from-kids-green/45 to-emerald-400/45
                p-6 rounded-xl border border-kids-green/20">
  Content
</div>

{/* Orange gradient */}
<div className="bg-gradient-to-br from-kids-orange/45 to-kids-yellow/45
                p-6 rounded-xl border border-kids-orange/20">
  Content
</div>
```

**With CSS Utility**:
```tsx
<div className="gradient-pastel-blue p-6 rounded-xl border border-kids-blue/20">
  Content
</div>
```

**Available**: `gradient-pastel-blue`, `gradient-pastel-purple`, `gradient-pastel-green`, `gradient-pastel-orange`

---

## 9. Hover State Pattern

**Standard hover effects** for interactive elements:

```tsx
className="
  group                          {/* Enable group hover */}
  hover:border-kids-blue        {/* Border color change */}
  hover:shadow-lg               {/* Shadow increase */}
  hover:-translate-y-1          {/* Lift effect */}
  transition-all duration-300   {/* Smooth animation */}
"
```

**For nested elements**:
```tsx
{/* Icon in card */}
<div className="group-hover:scale-110 transition-transform">
  <Icon />
</div>

{/* Title in card */}
<h4 className="group-hover:text-kids-blue transition-colors">
  Title
</h4>

{/* Arrow appearing on hover */}
<ArrowRight className="w-4 h-4
                       opacity-0 -translate-x-2
                       group-hover:opacity-100 group-hover:translate-x-0
                       transition-all" />
```

---

## 10. Accessibility Patterns

### Touch Targets (44px minimum)

```tsx
{/* Button with adequate touch target */}
<button className="min-w-[44px] min-h-[44px]
                   inline-flex items-center justify-center
                   px-6 py-3 ...">
  Button Text
</button>
```

### Focus States

```tsx
{/* Clear focus indicator */}
<button className="focus:outline-none focus:ring-4 focus:ring-kids-blue/30
                   rounded-full ...">
  Button
</button>
```

### ARIA Labels

```tsx
{/* Icon-only button */}
<button aria-label="Close dialog" className="...">
  <X className="w-6 h-6" />
</button>

{/* Interactive card */}
<div role="button"
     tabIndex={0}
     aria-label="Learn about AI basics"
     className="...">
  Card content
</div>
```

---

## Quick Reference

### Opacity Standards
- Main containers: `/90`
- Highlight boxes: `/80`
- Icon backgrounds: `/10`
- Inner borders: `/20`
- Subtle borders: `/50`
- Gradients: `/45`

### Spacing Standards
- Card padding: `p-6`
- Hero padding: `p-8 md:p-12`
- Grid gap: `gap-6`
- Button gap: `gap-4`
- Section spacing: `space-y-12`

### Border Standards
- GlassCard: `border` (1px)
- Inner cards: `border-2` (2px)

### Animation Standards
- Duration: `duration-300` (always)
- Hover lift: `hover:-translate-y-1`
- Icon scale: `group-hover:scale-110`
- Shadow: `hover:shadow-lg`

---

## Examples in Codebase

**See these files for reference**:
- `src/pages/DesignPilot.tsx` - Official design reference
- `src/design-system/tokens.ts` - Design tokens
- `src/design-system/examples/PatternExamples.tsx` - Live examples (coming soon)

---

## Design Principles

1. **Readability First**: Always use `bg-white/90` for content containers
2. **Consistent Spacing**: Use `gap-6` for grids, `p-6` for cards
3. **Predictable Hover**: All interactive elements lift and increase shadow
4. **Kids-Friendly Colors**: Use `kids-{color}` palette exclusively
5. **Accessibility**: 44px+ touch targets, 4.5:1 contrast, clear focus states
6. **Animation Timing**: Always `duration-300` for consistency
7. **Border Clarity**: Use `border-2` for inner cards so they're visible

---

**Last Updated**: 2026-01-07
**Based On**: DesignPilot.tsx
**Version**: 1.0
