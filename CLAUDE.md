# CLAUDE.md - AI Assistant Guide

**Last Updated:** 2026-01-08
**Project:** AI Kids Spark Learn
**Status:** Phase 1 & 2 Complete (Refactoring in Progress)

---

## 🎯 Project Overview

**AI Kids Spark Learn** is an educational web platform that teaches artificial intelligence concepts to children (ages 8-14) through interactive lessons, activities, and games.

**Mission:** Make AI education accessible, engaging, and safe for children through gamified learning experiences.

**Tech Stack:**
- **Frontend:** React 18.3.1 + TypeScript 5.5.3 + Vite 5.4.1
- **Styling:** Tailwind CSS 3.4.11 with custom kids-friendly color palette
- **Backend:** Supabase (PostgreSQL + Auth + Real-time)
- **3D Graphics:** Three.js with @react-three/fiber
- **Testing:** Playwright (53+ E2E tests), Vitest
- **CI/CD:** GitHub Actions + Pre-commit hooks (Husky)

---

## 🏗️ Architecture & Key Decisions

### Design System: "High-Opacity Glass"

**Source of Truth:** `src/pages/DesignPilot.tsx`

The entire UI follows a glass morphism design system with strict opacity standards:

**Opacity Standards (CRITICAL - DO NOT DEVIATE):**
- `/90` - Main containers (GlassCard, InnerCard backgrounds)
- `/80` - Highlight boxes (tips, warnings, callouts)
- `/10` - Icon backgrounds
- `/20` - Inner card borders (subtle but visible)
- `/50` - GlassCard borders (very subtle)
- `/45` - Decorative pastel gradients

**Why this matters:** The opacity values create perfect readability while maintaining the glass aesthetic. Deviating from these values breaks visual consistency.

**Design Tokens Location:** `src/design-system/tokens.ts`

### Kids-Friendly Color Palette

All colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  'kids-blue': '#3B82F6',    // Primary
  'kids-purple': '#A855F7',  // Secondary
  'kids-green': '#10B981',   // Success
  'kids-pink': '#EC4899',    // Accent
  'kids-orange': '#F97316',  // Energy
  'kids-yellow': '#FBBF24',  // Warning
  'kids-red': '#EF4444',     // Error
  'kids-teal': '#14B8A6',    // Info
}
```

**Why these colors:** Vibrant, high-contrast, accessible (WCAG 2.1 AA), and psychologically engaging for children.

### Component Patterns

**Always use these helper functions from `src/design-system/tokens.ts`:**

```typescript
// Inner Card (clickable grid items)
getInnerCardClasses('blue') // Returns complete Tailwind classes

// Icon Container (with hover scale)
getIconContainerClasses('purple', 'md') // Color + size

// Highlight Box (tips, warnings)
getHighlightBoxClasses('yellow') // For callouts
```

**Pattern Reference:** See `src/design-system/patterns.md` for all 10 patterns with copy-paste code.

**Live Examples:** `src/design-system/examples/PatternExamples.tsx` - viewable in browser.

---

## 📁 Project Structure

```
AI_kids_spark/
├── src/
│   ├── pages/              # Route components (40+ activities, 7 lessons)
│   │   ├── Index.tsx       # Homepage
│   │   ├── Lessons.tsx     # Lesson overview
│   │   ├── DesignPilot.tsx # ⚠️ DESIGN REFERENCE - DO NOT MODIFY
│   │   ├── lesson-*/       # Lesson pages
│   │   └── activities/     # Activity pages
│   ├── components/         # Reusable components
│   │   ├── layout/         # LessonLayout, MainLayout
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Main navigation
│   │   └── Footer.tsx      # Site footer
│   ├── design-system/      # ⭐ NEW - Design system files
│   │   ├── tokens.ts       # Design tokens & helper functions
│   │   ├── patterns.md     # Pattern documentation
│   │   └── examples/       # Live pattern examples
│   ├── lib/                # Utilities
│   ├── supabase/           # Supabase client & types
│   └── index.css           # Global styles + utility classes
│
├── .verification/          # ⭐ Automated verification system
│   ├── agents/
│   │   ├── code-reviewer/  # ESLint rules (125+ custom rules)
│   │   │   └── rules/      # accessibility, performance, kids-safety, react
│   │   ├── ui-tester/      # Playwright tests (53+ tests)
│   │   └── performance-checker/ # Lighthouse CI
│   └── workflows/
│       ├── quick-check.js  # Fast (7s) - TypeScript + ESLint + Smoke tests
│       └── full-verification.js # Complete (10-15min) - All tests
│
├── .husky/                 # Git hooks
│   └── pre-commit          # Runs verify:quick before every commit
│
├── .github/workflows/      # CI/CD
│   └── verification.yml    # GitHub Actions pipeline
│
├── eslint.config.js        # ESLint base configuration
├── tailwind.config.ts      # Tailwind + kids colors
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🔒 Critical Files - NEVER MODIFY

1. **`src/pages/DesignPilot.tsx`** - Design system reference
   This page defines the visual language. All UI should match its patterns.

2. **`src/design-system/tokens.ts`** - Design tokens
   Only modify if updating the entire design system intentionally.

3. **`.verification/agents/code-reviewer/rules/kids-safety.eslint.js`** - COPPA compliance
   Contains rules for child safety, privacy, and COPPA compliance.

---

## 🛠️ Development Workflow

### Automated Verification (Self-Healing)

**When making ANY change:**

1. Make your changes
2. Verification runs **automatically** (via watch mode or pre-commit hook)
3. If errors: Fix them and re-run verification
4. Repeat until all checks pass
5. Tell user you're done

**Never commit code with ESLint errors or TypeScript errors.**

### NPM Scripts

```bash
# Development
npm run dev              # Start dev server (port 8080)

# Verification (runs automatically)
npm run verify:quick     # Fast check (7s) - Run after every change
npm run verify:full      # Full check (10-15min) - Run before PR

# Testing
npm run test:e2e         # Playwright E2E tests
npm run test             # Unit tests (Vitest)

# Linting
npm run lint             # ESLint
npm run lint:fix         # Auto-fix ESLint issues

# Build
npm run build            # Production build
npm run preview          # Preview production build
```

### Pre-commit Hook Behavior

**Automatic on `git commit`:**
- ✅ Runs `verify:quick` (TypeScript + ESLint + Smoke tests)
- ✅ Blocks commit if verification fails
- ✅ Shows detailed error output
- ⏱️ Takes ~7 seconds

**To bypass (use sparingly):**
```bash
git commit --no-verify -m "message"
```

---

## 📋 Code Standards

### TypeScript Rules

- ❌ **NEVER use `any` type** - Use `unknown`, specific types, or generics
- ✅ **Use const** instead of let when variables aren't reassigned
- ✅ **Proper interface definitions** - No empty interfaces
- ✅ **ES6 imports** - No `require()`

### React Patterns

- ✅ **Functional components** with hooks
- ✅ **TypeScript interfaces** for props
- ✅ **Descriptive component names** - `ActivityCard`, not `Card1`
- ✅ **One component per file** (except small helper components)
- ✅ **Export components at bottom** of file

### Accessibility (WCAG 2.1 AA Required)

- ✅ **Touch targets:** Minimum 44px × 44px
- ✅ **ARIA labels** on all interactive elements without visible text
- ✅ **Keyboard navigation** - All interactive elements must be keyboard accessible
- ✅ **Focus states** - Always visible focus rings (`focus:ring-4 focus:ring-{color}/30`)
- ✅ **Alt text** on all images
- ✅ **Semantic HTML** - Use `<button>`, `<nav>`, `<main>`, etc.

### Kids Safety & COPPA Compliance

**CRITICAL - These rules are enforced by ESLint:**

- ❌ **NO external links** without parental consent warning
- ❌ **NO data collection** without clear privacy notice
- ❌ **NO third-party tracking** without disclosure
- ❌ **NO complex privacy policies** - Language must be child-friendly
- ✅ **Age-appropriate content** only
- ✅ **Safe color contrast** for readability

**Location:** `.verification/agents/code-reviewer/rules/kids-safety.eslint.js`

---

## 🎨 Design System Usage

### Component Pattern Checklist

When creating a new component, ask:

1. **Does it need a container?** → Use `<GlassCard variant="color">`
2. **Is it a grid item?** → Use `getInnerCardClasses('color')`
3. **Is it a tip/warning?** → Use `getHighlightBoxClasses('color')`
4. **Does it have an icon?** → Use `getIconContainerClasses('color', 'size')`
5. **Is it interactive?** → Add hover states: `hover:shadow-lg hover:-translate-y-1`
6. **Does it need spacing?** → Use standard values: `p-6`, `gap-6`, `space-y-12`

### Common Patterns (Copy-Paste Ready)

**Grid of Cards:**
```tsx
<div className={DesignTokens.grid.threeCol}>
  {items.map(item => (
    <div key={item.id} className={getInnerCardClasses('blue')}>
      <div className={getIconContainerClasses('blue', 'md')}>
        <Icon className="w-6 h-6 text-kids-blue" />
      </div>
      <h4 className="text-lg font-bold text-gray-800 mb-2
                     group-hover:text-kids-blue transition-colors">
        {item.title}
      </h4>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  ))}
</div>
```

**Highlight Box (Tip):**
```tsx
<div className={getHighlightBoxClasses('purple')}>
  <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
    <Lightbulb className="w-4 h-4 text-kids-purple" />
    <strong>Pro Tip:</strong> Your message here
  </p>
</div>
```

**Primary Button:**
```tsx
<Button className="bg-kids-blue hover:bg-kids-blue/90 text-white
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5
                   transition-all">
  Click Me <ArrowRight className="ml-2 w-4 h-4" />
</Button>
```

---

## 🧪 Testing Strategy

### E2E Tests (Playwright)

**Location:** `.verification/agents/ui-tester/test-suites/`

**Coverage:**
- ✅ 53+ test scenarios
- ✅ Multi-device (Desktop Chrome, Mobile Chrome, iPad)
- ✅ Critical user flows (navigation, lessons, activities)
- ✅ Accessibility checks
- ✅ Performance budgets

**Run tests:**
```bash
npm run test:e2e
```

### Unit Tests (Vitest)

**Location:** `src/**/*.test.ts(x)`

**Coverage:**
- Component rendering
- Utility functions
- Supabase client logic

**Run tests:**
```bash
npm run test
```

---

## 🚀 Refactoring Plan Status

### ✅ Phase 1: Design System Setup (COMPLETE)
- Created design tokens file (`tokens.ts`)
- Documented component patterns (`patterns.md`)
- Created live pattern examples (`PatternExamples.tsx`)
- Updated CSS utilities (fixed opacity /95 → /90)

### ✅ Phase 2: Fix Technical Debt (COMPLETE)
- Fixed all 7 ESLint errors
- Removed all `any` types
- Converted `require()` to ES6 imports
- Updated to use `const` instead of `let` where appropriate

### ⏸️ Phase 3: Component Library (PENDING)
**Next tasks:**
1. Create `InnerCard.tsx` component
2. Create `HighlightBox.tsx` component
3. Create `ActivityCard.tsx`, `LessonCard.tsx`, `FeatureCard.tsx`
4. Create layout components: `CardGrid`, `SplitSection`, `HeroSection`
5. Update `Button` component with design system variants

**Estimated:** 6 hours

### ⏸️ Phase 4: Page Refactoring (PENDING)
- Refactor `Index.tsx` (homepage)
- Refactor `Lessons.tsx`
- Refactor all 40+ activity and lesson pages to use new components

**Estimated:** 8 hours

### ⏸️ Phase 5: Polish & Optimize (PENDING)
- Image optimization
- Bundle optimization
- Performance testing
- Final verification

**Estimated:** 4 hours

---

## 🔍 Common Issues & Solutions

### Issue: "ESLint errors blocking commit"
**Solution:** Run `npm run lint` to see errors, fix them, then re-commit.

### Issue: "Opacity looks wrong"
**Solution:** Check `src/pages/DesignPilot.tsx` and ensure you're using the correct opacity value from design tokens.

### Issue: "Component doesn't match design"
**Solution:** Use helper functions from `src/design-system/tokens.ts` instead of writing Tailwind classes manually.

### Issue: "Pre-commit hook too slow"
**Solution:** This is expected (~7 seconds). It's preventing bugs before they reach the codebase.

### Issue: "Playwright browsers not installed"
**Workaround:** This is a network limitation in the current environment. E2E tests work in CI/CD.

---

## 📚 Important Context for AI Assistants

### When Working on This Project:

1. **Always run verification after making changes** (`npm run verify:quick`)
2. **Never skip ESLint errors** - They enforce accessibility, performance, and kids-safety rules
3. **Use DesignPilot.tsx as visual reference** - All UI should match its aesthetic
4. **Favor existing components over creating new ones** - Check `src/components/` first
5. **Kids-first mindset** - Language should be simple, encouraging, and age-appropriate
6. **Accessibility is non-negotiable** - WCAG 2.1 AA compliance required
7. **COPPA compliance is critical** - This app is for children, privacy is paramount

### Communication Style:

- ✅ **Technical accuracy** over validation
- ✅ **Concise explanations** - Code speaks louder than prose
- ✅ **Show actual results** - "Verification passed" vs. "I think this might work"
- ❌ **No emojis** unless user explicitly requests them
- ❌ **No over-engineering** - Simple, focused solutions only

### Self-Healing Workflow:

When user requests a change:
1. Make the change
2. Run `verify:quick`
3. If errors → Fix them
4. Re-run `verify:quick`
5. Repeat until ✅ all pass
6. Commit changes
7. Tell user "Done! Verification passed."

**Never say "you're done" until verification actually passes.**

---

## 🎓 Learning Resources

- **Design System:** `src/design-system/patterns.md`
- **Live Examples:** View `/design-pilot` in browser
- **Pattern Reference:** `src/design-system/examples/PatternExamples.tsx`
- **Kids Safety Rules:** `.verification/agents/code-reviewer/rules/kids-safety.eslint.js`
- **Accessibility Rules:** `.verification/agents/code-reviewer/rules/accessibility.eslint.js`

---

## 📞 Support

- **GitHub Issues:** https://github.com/martin-valny/AI_kids_spark/issues
- **Verification Docs:** `.verification/workflows/claude-feedback-loop.md`

---

**Remember:** This is an educational platform for children. Every decision should prioritize their safety, learning experience, and engagement. Quality over speed. Accessibility over aesthetics. Safety over features.

---

*This document is maintained by AI assistants working on this project. Update it whenever architectural decisions change.*
