# 🎨 Comprehensive Refactoring Plan
## AI Kids Spark Learn - "High-Opacity Glass" Design System

**Based on**: `/src/pages/DesignPilot.tsx` - the official design reference
**Goal**: Consistent, accessible, kid-friendly UI across all 40+ pages
**Timeline**: 2-3 days (~24 hours total)

---

## 📋 Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Phase 1: Design System Setup](#phase-1-design-system-setup-4-hours)
3. [Phase 2: Fix Technical Debt](#phase-2-fix-technical-debt-2-hours)
4. [Phase 3: Component Library](#phase-3-component-library-6-hours)
5. [Phase 4: Page Refactoring](#phase-4-page-refactoring-8-hours)
6. [Phase 5: Polish & Optimize](#phase-5-polish--optimize-4-hours)
7. [Implementation Strategy](#implementation-strategy)
8. [Success Metrics](#success-metrics)

---

## 🎯 Design System Overview

### **Core Principle: "High-Opacity Glass"**

From DesignPilot:
> "Standard container uses **bg-white/90** to ensure perfect readability while maintaining a modern, airy feel."

### **Design Tokens Extracted from Pilot**

#### **1. Container System**

| Type | Background | Border | Use Case |
|------|------------|--------|----------|
| **Main GlassCard** | `bg-white/90` | `border-{color}-200/50` | Primary lesson containers |
| **Inner Card** | `bg-white/90` | `border-2 border-{color}/20` | Activity cards, feature cards |
| **Highlight Box** | `bg-white/80` | `border border-{color}/20` | Key takeaways, tips |

**Fix Required**: CSS defines `bg-white/95`, but pilot uses `bg-white/90`. Need to standardize to `/90`.

#### **2. Color Palette (Kids-Friendly)**

```typescript
// Already defined in tailwind.config.ts
kids: {
  blue: '#4285F4',      // Primary brand color
  purple: '#9C27B0',    // Secondary accent
  green: '#34A853',     // Success/positive
  red: '#EA4335',       // Alert/warning
  yellow: '#FBBC05',    // Highlight
  orange: '#FF9800',    // Warm accent
  pink: '#E91E63',      // Playful accent
  teal: '#009688'       // Cool accent
}
```

#### **3. Icon Container Pattern**

```tsx
<div className="w-12 h-12 bg-{color}/10 rounded-xl flex items-center justify-center">
  <Icon className="w-6 h-6 text-{color}" />
</div>
```

**Hover**: `group-hover:scale-110 transition-transform`

#### **4. Pastel Gradient Backgrounds**

```tsx
// Decorative backgrounds only (not for content)
<div className="bg-gradient-to-br from-{color}/45 to-{othercolor}/45">
```

**Opacity**: Always 45% for gradients
**Purpose**: Visual interest without compromising readability

#### **5. Hover States (Interactive Cards)**

```tsx
className="group ...
  hover:border-{color}           // Color change
  hover:shadow-lg                // Shadow increase
  hover:-translate-y-1          // Lift effect
  transition-all duration-300   // Smooth animation
"
```

**Icon**: `group-hover:scale-110`
**Title**: `group-hover:text-{color}`

#### **6. Typography Scale**

| Element | Desktop | Mobile | Weight | Use |
|---------|---------|--------|--------|-----|
| **Hero Title** | `text-3xl` | `text-2xl` | `font-bold` | Page hero |
| **Section Heading** | `text-2xl` | `text-xl` | `font-bold` | Section titles |
| **Card Title** | `text-lg` | `text-base` | `font-bold` | Card headings |
| **Body** | `text-base` | `text-sm` | `font-normal` | Body copy |
| **Small** | `text-sm` | `text-xs` | `font-normal` | Captions |

**Text Colors**:
- Headings: `text-gray-800` (high contrast)
- Body: `text-gray-700`
- Secondary: `text-gray-600`

#### **7. Spacing System**

| Context | Padding | Margin | Gap |
|---------|---------|--------|-----|
| **Main Container** | `p-8 md:p-12` | `mb-12` | - |
| **Card** | `p-6` | `mb-6` | - |
| **Grid** | - | - | `gap-6` |
| **Button Group** | - | - | `gap-4` |

**Grid**: Always `gap-6` between cards

#### **8. Responsive Grid**

```tsx
// Standard 3-column grid (adapts to mobile)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Breakpoints**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

#### **9. Border System**

| Element | Border | Radius |
|---------|--------|--------|
| **GlassCard** | `border` (1px) | `rounded-3xl` |
| **Inner Card** | `border-2` (2px) | `rounded-2xl` |
| **Small Box** | `border` (1px) | `rounded-xl` |
| **Button** | `border-2` (optional) | `rounded-full` |

**Opacity**: Border colors always 20% or 50% for subtle appearance

#### **10. Animation Standards**

```tsx
// Standard transition
transition-all duration-300

// Hover lift
hover:-translate-y-1

// Icon scale
group-hover:scale-110 transition-transform

// Fade in decorative elements
opacity-0 group-hover:opacity-100 transition-all
```

**Duration**: Always `duration-300` for consistency

---

## 📊 Current Issues Analysis

### **Issues Found in Codebase**

#### **A. Design Inconsistencies**

1. **Opacity Mismatch**:
   - CSS: `bg-white/95`
   - Pilot: `bg-white/90`
   - Various pages: `/80`, `/85`, `/90`, `/95`

2. **Border Inconsistencies**:
   - Some cards: no border
   - Some cards: `border`
   - Some cards: `border-2`
   - Pilot standard: `border-2` for inner cards

3. **Spacing Variations**:
   - Padding: ranges from `p-4` to `p-12` inconsistently
   - Grid gaps: `gap-4`, `gap-6`, `gap-8`
   - Pilot standard: `gap-6`

4. **Color Usage**:
   - Some pages use custom hex colors
   - Inconsistent use of `kids-` palette
   - Pilot standard: Always use `kids-{color}`

#### **B. Technical Debt (7 ESLint Errors)**

| File | Issue | Fix |
|------|-------|-----|
| `GenerativeArtWand.tsx:15` | Use `const` instead of `let` | Change to `const` |
| `GenerativeArtWand.tsx:19` | Use `const` instead of `let` | Change to `const` |
| `MascotPlayground.tsx:153` | Unexpected `any` type | Add proper type |
| `LessonLayout.tsx:16` | Unexpected `any` type | Add proper type |
| `ui/command.tsx:24` | Empty interface | Extend properly |
| `ui/textarea.tsx:5` | Empty interface | Extend properly |
| `tailwind.config.ts:194` | Use ES6 import | Change `require()` to `import` |

#### **C. Accessibility Issues**

1. Touch targets < 44px in some places
2. Color contrast issues in some components
3. Missing ARIA labels on interactive elements
4. Inconsistent focus states

#### **D. Component Pattern Issues**

1. Inline styles instead of Tailwind classes
2. Repeated card patterns (not using reusable components)
3. Inconsistent button variants
4. Mixed icon sizes

---

## 🚀 Phase 1: Design System Setup (4 hours)

### **Task 1.1: Update CSS Utilities** (1 hour)

**File**: `src/index.css`

**Changes**:
1. Fix glass-card opacity: `/95` → `/90`
2. Add missing utility classes
3. Ensure all color variants match pilot

**Before**:
```css
.glass-card {
  @apply bg-white/95 backdrop-blur-md ...
}
```

**After**:
```css
.glass-card {
  @apply bg-white/90 backdrop-blur-md ...
}
```

**New Utilities to Add**:
```css
/* Icon container pattern */
.icon-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center;
}

.icon-container-sm {
  @apply w-10 h-10 rounded-lg;
}

.icon-container-lg {
  @apply w-16 h-16 rounded-2xl;
}

/* Inner card pattern (from pilot) */
.inner-card {
  @apply bg-white/90 p-6 rounded-2xl border-2 shadow-sm
         hover:shadow-lg hover:-translate-y-1
         transition-all duration-300;
}

/* Pastel gradient backgrounds */
.gradient-pastel-blue {
  @apply bg-gradient-to-br from-kids-blue/45 to-cyan-400/45;
}

.gradient-pastel-purple {
  @apply bg-gradient-to-br from-kids-purple/45 to-kids-pink/45;
}

.gradient-pastel-green {
  @apply bg-gradient-to-br from-kids-green/45 to-emerald-400/45;
}

.gradient-pastel-orange {
  @apply bg-gradient-to-br from-kids-orange/45 to-kids-yellow/45;
}
```

### **Task 1.2: Create Design Tokens File** (30 min)

**New File**: `src/design-system/tokens.ts`

```typescript
/**
 * Design Tokens - AI Kids Spark Learn
 * Based on: src/pages/DesignPilot.tsx
 *
 * Use these constants throughout the app for consistency
 */

export const DesignTokens = {
  // Opacity values
  opacity: {
    glass: '90',      // Main containers: bg-white/90
    highlight: '80',  // Highlight boxes: bg-white/80
    icon: '10',       // Icon backgrounds: bg-{color}/10
    border: '20',     // Inner card borders: border-{color}/20
    borderSubtle: '50', // GlassCard borders: border-{color}/50
    gradient: '45',   // Decorative gradients: {color}/45
  },

  // Spacing scale
  spacing: {
    cardPadding: 'p-6',
    heroPadding: 'p-8 md:p-12',
    gridGap: 'gap-6',
    buttonGap: 'gap-4',
    sectionGap: 'space-y-12',
  },

  // Border widths
  border: {
    glassCard: 'border',    // 1px
    innerCard: 'border-2',  // 2px
  },

  // Border radius
  radius: {
    glassCard: 'rounded-3xl',
    innerCard: 'rounded-2xl',
    highlight: 'rounded-xl',
    icon: 'rounded-xl',
    button: 'rounded-full',
  },

  // Icon sizes
  icon: {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  },

  // Typography
  typography: {
    hero: 'text-3xl font-bold text-gray-800',
    section: 'text-2xl font-bold text-gray-800',
    cardTitle: 'text-lg font-bold text-gray-800',
    body: 'text-base text-gray-700',
    small: 'text-sm text-gray-600',
  },

  // Transitions
  transition: {
    standard: 'transition-all duration-300',
    transform: 'transition-transform duration-300',
  },

  // Hover effects
  hover: {
    lift: 'hover:-translate-y-1',
    shadow: 'hover:shadow-lg',
    scale: 'hover:scale-110',
  },
} as const;
```

### **Task 1.3: Document Component Patterns** (1 hour)

**New File**: `src/design-system/patterns.md`

```markdown
# Component Patterns - AI Kids Spark Learn

## 1. Main Container (GlassCard)

Use for: Lesson content, main sections

\`\`\`tsx
<GlassCard variant="blue" className="p-8 md:p-12">
  {children}
</GlassCard>
\`\`\`

## 2. Inner Card (Grid Item)

Use for: Activity cards, feature cards, info cards

\`\`\`tsx
<div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20
                shadow-sm hover:border-kids-blue hover:shadow-lg hover:-translate-y-1
                transition-all duration-300">
  {/* Icon Container */}
  <div className="w-12 h-12 bg-kids-blue/10 rounded-xl flex items-center justify-center mb-4
                  group-hover:scale-110 transition-transform">
    <Icon className="w-6 h-6 text-kids-blue" />
  </div>

  {/* Title */}
  <h4 className="text-lg font-bold text-gray-800 mb-2
                 group-hover:text-kids-blue transition-colors">
    Card Title
  </h4>

  {/* Description */}
  <p className="text-sm text-gray-600">
    Card description text
  </p>
</div>
\`\`\`

## 3. Highlight Box (Tips, Key Points)

Use for: Important callouts, tips, warnings

\`\`\`tsx
<div className="bg-white/80 p-4 rounded-xl border border-kids-purple/20 mb-6">
  <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
    <Icon className="w-4 h-4 text-kids-purple" />
    <strong>Pro Tip:</strong> Your key message here
  </p>
</div>
\`\`\`

## 4. Standard Grid

Use for: Multiple cards, activity listings

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Inner cards here */}
</div>
\`\`\`

## 5. Button Patterns

\`\`\`tsx
{/* Primary */}
<Button className="bg-kids-blue hover:bg-kids-blue/90 text-white
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
  Primary Action
</Button>

{/* Secondary */}
<Button variant="outline"
        className="border-2 border-kids-blue text-kids-blue hover:bg-kids-blue/5">
  Secondary Action
</Button>
\`\`\`

## 6. Split Layout (Text + Visual)

Use for: Detailed explanations, feature showcases

\`\`\`tsx
<GlassCard variant="purple" className="p-0 overflow-hidden">
  <div className="grid md:grid-cols-2">
    {/* Text Side */}
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Title</h3>
      <p className="text-gray-700 mb-6">Description</p>
      <Button>Call to Action</Button>
    </div>

    {/* Visual Side */}
    <div className="bg-gradient-to-br from-kids-purple/10 to-kids-pink/10
                    p-12 flex items-center justify-center">
      {/* Visual content */}
    </div>
  </div>
</GlassCard>
\`\`\`
\`\`\`

### **Task 1.4: Create Pattern Examples** (1.5 hours)

**New File**: `src/components/examples/PatternExamples.tsx`

```typescript
import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Star, Zap } from 'lucide-react';

/**
 * Pattern Examples Component
 *
 * Use this as a reference when building new pages
 * Copy-paste these patterns and customize
 */
export const PatternExamples = () => {
  return (
    <div className="space-y-12">

      {/* Pattern 1: Main Container */}
      <section>
        <h3 className="text-xl font-bold mb-4">Pattern 1: Main Container</h3>
        <GlassCard variant="blue" className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Main Content Area
          </h2>
          <p className="text-gray-700">
            Use GlassCard for primary content containers
          </p>
        </GlassCard>
      </section>

      {/* Pattern 2: Inner Card Grid */}
      <section>
        <h3 className="text-xl font-bold mb-4">Pattern 2: Inner Card Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['blue', 'purple', 'green'].map((color, idx) => (
            <div
              key={idx}
              className={`group bg-white/90 p-6 rounded-2xl border-2 border-kids-${color}/20
                         shadow-sm hover:border-kids-${color} hover:shadow-lg
                         hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-12 h-12 bg-kids-${color}/10 rounded-xl
                              flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform`}>
                <Brain className={`w-6 h-6 text-kids-${color}`} />
              </div>
              <h4 className={`text-lg font-bold text-gray-800 mb-2
                             group-hover:text-kids-${color} transition-colors`}>
                Card Title
              </h4>
              <p className="text-sm text-gray-600">
                Card description
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pattern 3: Highlight Box */}
      <section>
        <h3 className="text-xl font-bold mb-4">Pattern 3: Highlight Box</h3>
        <div className="bg-white/80 p-4 rounded-xl border border-kids-purple/20">
          <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-kids-purple" />
            <strong>Pro Tip:</strong> Use for key takeaways
          </p>
        </div>
      </section>

      {/* Pattern 4: Button Group */}
      <section>
        <h3 className="text-xl font-bold mb-4">Pattern 4: Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-kids-blue hover:bg-kids-blue/90 text-white
                           shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Primary Action
          </Button>
          <Button variant="outline"
                  className="border-2 border-kids-blue text-kids-blue hover:bg-kids-blue/5">
            Secondary Action
          </Button>
        </div>
      </section>

    </div>
  );
};
```

---

## 🔧 Phase 2: Fix Technical Debt (2 hours)

### **Task 2.1: Fix ESLint Errors** (1 hour)

All 7 errors from verification, one by one with automated testing after each fix.

### **Task 2.2: Type Safety Improvements** (1 hour)

Replace all `any` types with proper TypeScript types.

---

## 🧩 Phase 3: Component Library (6 hours)

### **Task 3.1: Create Reusable Card Components** (2 hours)

**New File**: `src/components/cards/InnerCard.tsx`

```typescript
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InnerCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow';
  onClick?: () => void;
  className?: string;
}

/**
 * InnerCard - Standardized card component based on DesignPilot
 *
 * Features:
 * - Consistent opacity (bg-white/90)
 * - 2px colored border
 * - Hover effects (lift, shadow, color)
 * - Icon container with scale animation
 */
export const InnerCard: React.FC<InnerCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'blue',
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-white/90 p-6 rounded-2xl border-2 shadow-sm',
        'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        `border-kids-${color}/20 hover:border-kids-${color}`,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Icon Container */}
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
        'group-hover:scale-110 transition-transform',
        `bg-kids-${color}/10`
      )}>
        <Icon className={`w-6 h-6 text-kids-${color}`} />
      </div>

      {/* Title */}
      <h4 className={cn(
        'text-lg font-bold text-gray-800 mb-2 transition-colors',
        `group-hover:text-kids-${color}`
      )}>
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};
```

**Also Create**:
- `ActivityCard.tsx` - For activity listings
- `LessonCard.tsx` - For lesson listings
- `FeatureCard.tsx` - For feature showcases
- `HighlightBox.tsx` - For tips/callouts

### **Task 3.2: Create Button Variants** (1 hour)

Update `src/components/ui/button.tsx` to match pilot patterns.

### **Task 3.3: Create Layout Components** (3 hours)

- `CardGrid.tsx` - Standardized 3-column grid
- `SplitSection.tsx` - Text + visual layout
- `HeroSection.tsx` - Page hero pattern

---

## 📄 Phase 4: Page Refactoring (8 hours)

### **Strategy**: Refactor 3-4 pages per hour

#### **Priority 1: High-Traffic Pages** (4 hours)

1. **Index.tsx** (Homepage) - 1 hour
2. **Lessons.tsx** (Lessons listing) - 1 hour
3. **Activities/PatternDetective.tsx** - 1 hour
4. **Lessons/IntroToAI.tsx** - 1 hour

#### **Priority 2: Activity Pages** (2 hours)

5-12. All activity pages (systematic refactoring)

#### **Priority 3: Lesson Pages** (2 hours)

13-19. All lesson pages (systematic refactoring)

### **Refactoring Checklist (Per Page)**:

```
□ Replace inline styles with Tailwind
□ Use GlassCard for main containers
□ Use InnerCard for grid items
□ Standardize opacity (bg-white/90)
□ Fix border widths (border-2 for inner cards)
□ Use kids-{color} palette consistently
□ Add proper hover states
□ Ensure 44px+ touch targets
□ Check color contrast (4.5:1 minimum)
□ Add ARIA labels where needed
□ Run verification after changes
```

---

## ✨ Phase 5: Polish & Optimize (4 hours)

### **Task 5.1: Image Optimization** (1 hour)

Run image audit and optimize oversized images.

### **Task 5.2: Bundle Optimization** (1 hour)

Analyze bundle and remove unused code.

### **Task 5.3: Performance Testing** (1 hour)

Run Lighthouse audits, fix performance issues.

### **Task 5.4: Final Verification** (1 hour)

Run full verification suite, fix any remaining issues.

---

## 🎯 Implementation Strategy

### **Day 1: Foundation** (8 hours)

**Morning** (4 hours):
- Phase 1: Design System Setup
  - Update CSS utilities
  - Create design tokens
  - Document patterns
  - Create examples

**Afternoon** (4 hours):
- Phase 2: Fix Technical Debt
  - Fix all 7 ESLint errors
  - Add proper types
- Phase 3 Start: Component Library
  - Create InnerCard
  - Create HighlightBox

### **Day 2: Components & Refactoring** (8 hours)

**Morning** (4 hours):
- Phase 3 Continue: Component Library
  - Create all card components
  - Create layout components
  - Create button variants

**Afternoon** (4 hours):
- Phase 4 Start: Page Refactoring
  - Refactor Index.tsx
  - Refactor Lessons.tsx
  - Refactor 2 activity pages

### **Day 3: Complete & Polish** (8 hours)

**Morning** (4 hours):
- Phase 4 Continue: Page Refactoring
  - Refactor all remaining activity pages
  - Refactor all lesson pages

**Afternoon** (4 hours):
- Phase 5: Polish & Optimize
  - Image optimization
  - Bundle optimization
  - Performance testing
  - Final verification

---

## 📊 Success Metrics

### **Design Consistency**

- [ ] All pages use `bg-white/90` for main containers
- [ ] All inner cards use `border-2 border-{color}/20`
- [ ] All icons use `w-12 h-12 bg-{color}/10 rounded-xl` pattern
- [ ] All grids use `gap-6`
- [ ] All hover states use `hover:-translate-y-1 hover:shadow-lg`
- [ ] All transitions use `duration-300`

### **Technical Quality**

- [ ] 0 ESLint errors
- [ ] 0 TypeScript errors
- [ ] All `any` types removed
- [ ] All components properly typed

### **Accessibility**

- [ ] All touch targets ≥ 44px
- [ ] Color contrast ≥ 4.5:1
- [ ] All interactive elements have ARIA labels
- [ ] Keyboard navigation works throughout

### **Performance**

- [ ] Lighthouse Performance: ≥ 85
- [ ] Lighthouse Accessibility: ≥ 95
- [ ] Bundle size: < 500KB
- [ ] LCP: < 2.5s

### **Automated Verification**

- [ ] `npm run verify:quick` passes (0 errors)
- [ ] `npm run verify:full` passes (all tests green)
- [ ] `npm run perf:check` passes (meets budgets)

---

## 🔄 Automated Workflow

**After Every Change**:

```bash
1. Make changes (edit files)
2. Auto-run verification (Claude does this automatically)
3. Fix any issues found
4. Re-run verification
5. Repeat until all checks pass
6. Commit changes
```

**No manual intervention needed** - verification agents run automatically!

---

## 📁 File Structure (New Files)

```
src/
├── design-system/
│   ├── tokens.ts                    # Design tokens
│   ├── patterns.md                  # Pattern documentation
│   └── examples/
│       └── PatternExamples.tsx      # Live examples
│
├── components/
│   ├── cards/
│   │   ├── InnerCard.tsx           # Standardized inner card
│   │   ├── ActivityCard.tsx        # Activity card variant
│   │   ├── LessonCard.tsx          # Lesson card variant
│   │   ├── FeatureCard.tsx         # Feature card variant
│   │   └── HighlightBox.tsx        # Callout/tip box
│   │
│   └── layout/
│       ├── CardGrid.tsx             # 3-column responsive grid
│       ├── SplitSection.tsx         # Text + visual layout
│       └── HeroSection.tsx          # Page hero pattern
│
└── pages/
    └── (refactored pages following pilot design)
```

---

## 🎯 Next Steps

**Ready to start?** I can begin with:

1. **Phase 1: Design System Setup** (4 hours)
   - Create all design tokens
   - Update CSS utilities
   - Document patterns

2. **Quick Win: Fix 7 ESLint Errors** (1 hour)
   - Immediate technical debt reduction
   - Demonstrates automated verification

3. **Pilot Refactoring: Refactor 2-3 pages as proof** (2 hours)
   - Show before/after
   - Validate the approach
   - Get your approval to continue

**Which would you like me to start with?** 🚀
