# AI Kids Spark - Project Documentation

> **Last Updated:** 2026-01-08

AI Kids Spark is an interactive educational platform teaching children about artificial intelligence concepts through engaging lessons, activities, and visual demos.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **3D Graphics:** React Three Fiber + Drei
- **Routing:** React Router DOM
- **State/Data:** TanStack Query + Supabase

## Project Structure

```
src/
├── components/
│   ├── design-system/     # Reusable design system components
│   ├── ui/                # shadcn/ui + custom UI components
│   ├── layout/            # Layout components
│   └── algorithms/        # Algorithm visualization components
├── design-system/         # Design tokens and patterns
├── pages/                 # Route pages
├── data/                  # Static data
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
└── integrations/          # External service integrations
```

## Design System

The project uses a "High-Opacity Glass" design system with:
- Kid-friendly color palette (kids-blue, kids-purple, kids-green, etc.)
- Glassmorphism effects with high readability
- WCAG 2.1 AA accessibility compliance

### Design System Components

Located in `src/components/design-system/`:

| Component | Description |
|-----------|-------------|
| `InnerCard` | Content card with color variants, hover effects |
| `CardGrid` | Responsive grid layout for cards |
| `HighlightBox` | Semantic highlight box (info/warning/success/tip) |
| `IconContainer` | Styled icon container with sizing |

### Design Tokens

Located in `src/design-system/tokens.ts`:
- Color variant tokens
- Spacing and sizing tokens
- Helper functions for consistent styling

### Button Variants

Extended `Button` component includes:
- `kids-blue`, `kids-purple`, `kids-green`, `kids-pink`, `kids-orange`, `kids-yellow`, `kids-red`, `kids-teal`
- Outline variants: `kids-blue-outline`, `kids-purple-outline`, `kids-green-outline`
- Touch-accessible `size="touch"` (44px minimum)

## Refactoring Progress

### Phase 1: Design System Setup (COMPLETE)
- Created design tokens and color system
- Established component patterns

### Phase 2: Technical Debt (COMPLETE)
- Fixed existing code issues
- Improved type safety

### ✅ Phase 3: Component Library (COMPLETE)
- Created InnerCard component with color variants
- Created HighlightBox component with semantic variants
- Created CardGrid component for responsive layouts
- Created IconContainer component for styled icons
- Extended Button with design system variants
- Added WCAG 2.1 AA accessibility features
- Created patterns.md documentation

### ✅ Phase 4: Page Refactoring (COMPLETE)
- Applied design system to key lesson pages (IntroToAI, MachineLearningBasics, DataAndPatterns)
- Updated Lessons.tsx with HighlightBox components
- Replaced inline Tailwind patterns with InnerCard, CardGrid, HighlightBox
- Established patterns for remaining pages to follow

### Phase 5: Testing & Polish (PENDING)
- Add component tests
- Final accessibility audit

## Key Files

- `src/design-system/tokens.ts` - Design token definitions
- `src/design-system/patterns.md` - Usage patterns documentation
- `src/components/design-system/index.ts` - Component exports
- `src/pages/DesignPilot.tsx` - Visual reference implementation

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| kids-blue | #4285F4 | Primary, information |
| kids-purple | #9C27B0 | Interactive, tips |
| kids-green | #34A853 | Success, achievements |
| kids-pink | #E91E63 | Creative features |
| kids-orange | #FF9800 | Attention, warnings |
| kids-yellow | #FBBC05 | Highlights, energy |
| kids-red | #EA4335 | Errors, alerts |
| kids-teal | #009688 | Secondary info |
