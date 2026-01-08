# Claude.md - AI Kids Spark Project Guide

**Last Updated:** 2026-01-08
**Project:** AI Kids Spark → AI Spark (13+ pivot recommended)
**Status:** Feature-complete frontend, backend implementation required for production
**Branch:** claude/deployment-compliance-review-3NyeN

---

## 🚨 CRITICAL - READ FIRST

### Security Issues Requiring Immediate Attention

**BEFORE ANY OTHER WORK, FIX THESE:**

1. **`src/utils/progressTracker.ts` Line 4:**
   ```typescript
   // CURRENT - SECURITY HOLE!
   const DEBUG_UNLOCK_ALL = true;

   // CHANGE TO:
   const DEBUG_UNLOCK_ALL = import.meta.env.DEV;
   ```
   **Impact:** Currently unlocks ALL content without completing lessons. Production security vulnerability.

2. **`src/App.tsx` Line 112:**
   ```typescript
   // REMOVE THIS ENTIRE LINE:
   <Route path="/debug/progress" element={<ProgressDebugger />} />
   ```
   **Impact:** Exposes progress manipulation tools publicly.

3. **Environment Variables:**
   - Verify `.env` is in `.gitignore`
   - Create `.env.example` (safe to commit)
   - Never commit actual `.env` file with Supabase keys

**Estimated Fix Time:** 30 minutes
**Priority:** 🔴 CRITICAL

---

## 🎯 Project Overview

**AI Kids Spark** is an educational web platform teaching AI concepts through interactive lessons, activities, and games.

**Current State:**
- ✅ Complete educational content (7 lessons, 4 projects, 40+ activities)
- ✅ Beautiful glass-morphism UI with accessibility standards
- ❌ No authentication (all content publicly accessible)
- ❌ No payment system (subscription UI is mockup only)
- ❌ No COPPA compliance (targets ages 6-12 but not implemented)

**Recommended Path:** Pivot to 13+ platform to avoid COPPA complexity
**See:** `IMPLEMENTATION_PLAN_OPTION_A.md` for detailed deployment strategy

---

## 📊 Current Tech Stack

### Frontend (Complete ✅)
- **Framework:** React 18.3.1 + TypeScript 5.5.3
- **Build Tool:** Vite 5.4.1
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3.4.11 + shadcn/ui
- **Animations:** Framer Motion 12.23
- **3D Graphics:** Three.js + React Three Fiber
- **Testing:** Playwright (53+ E2E tests), Vitest
- **CI/CD:** GitHub Actions + Husky pre-commit hooks

### Backend (Configured but Incomplete ⚠️)
- **Database:** Supabase (no schema yet)
- **Auth:** Supabase Auth (configured but not implemented)
- **Storage:** Currently localStorage only (needs cloud migration)
- **Payments:** None (needs Stripe integration)

### Content
- **7 Core Lessons:** intro-to-ai, machine-learning-basics, data-and-patterns, image-recognition, simple-algorithms, ai-ethics, future-of-ai
- **4 Major Projects:** music-ai-creator, ai-art-studio, build-chatbot, ai-video-magic
- **40+ Activities:** Interactive games, coding challenges, drawing activities

---

## 🏗️ Architecture & Design System

### "High-Opacity Glass" Design Language

**Source of Truth:** `src/pages/DesignPilot.tsx`

**Opacity Standards (NEVER DEVIATE):**
- `/90` - Main containers (GlassCard, InnerCard backgrounds)
- `/80` - Highlight boxes (tips, warnings)
- `/10` - Icon backgrounds
- `/20` - Inner card borders
- `/50` - GlassCard borders
- `/45` - Decorative gradients

### Kids-Friendly Color Palette

Defined in `tailwind.config.ts`:

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

**Note:** Keep these CSS variable names even after 13+ pivot. They're just color names, not age references.

### Component Helper Functions

**Location:** `src/design-system/tokens.ts`

```typescript
getInnerCardClasses('blue')           // Grid item cards
getIconContainerClasses('purple', 'md') // Icon containers
getHighlightBoxClasses('yellow')      // Tips/warnings
```

**Pattern Reference:** `src/design-system/patterns.md`
**Live Examples:** Visit `/design-pilot` in browser

---

## 📁 Project Structure

```
AI_kids_spark/
├── src/
│   ├── pages/              # 40+ route components
│   │   ├── Index.tsx       # Homepage (needs 6-12 → 13+ updates)
│   │   ├── Lessons.tsx     # Lesson overview
│   │   ├── DesignPilot.tsx # ⚠️ DESIGN REFERENCE - DO NOT MODIFY
│   │   └── projects/       # 4 project pages
│   ├── components/
│   │   ├── layout/         # LessonLayout, MainLayout
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Main nav (needs brand update)
│   │   └── Footer.tsx      # Site footer (needs age disclaimer)
│   ├── design-system/
│   │   ├── tokens.ts       # Design tokens & helpers
│   │   ├── patterns.md     # Pattern documentation
│   │   └── examples/       # PatternExamples.tsx
│   ├── utils/
│   │   └── progressTracker.ts # ⚠️ SECURITY: Fix DEBUG_UNLOCK_ALL
│   ├── integrations/supabase/
│   │   └── client.ts       # Supabase client (needs auth implementation)
│   └── App.tsx             # ⚠️ SECURITY: Remove /debug/progress route
│
├── .verification/          # Automated verification system
│   ├── agents/
│   │   ├── code-reviewer/  # 125+ ESLint rules
│   │   ├── ui-tester/      # 53+ Playwright tests
│   │   └── documentation-checker/
│   └── workflows/
│       ├── quick-check.js  # ~7s (TypeScript + ESLint)
│       └── full-verification.js # ~10-15min (all tests)
│
├── public/resources/       # Downloadable worksheets (need footer updates)
│
├── IMPLEMENTATION_PLAN_OPTION_A.md  # Deployment strategy (13+ pivot)
├── CONTENT_CHANGES_CHECKLIST.md    # File-by-file changes needed
├── BEFORE_AFTER_COMPARISON.md      # Visual before/after guide
└── Claude.md               # This file
```

---

## 🚀 Deployment Strategy: Option A (13+ Pivot)

### Why Pivot from 6-12 to 13+?

**Current Problem:**
- Targeting ages 6-12 requires COPPA compliance (US law)
- COPPA = months of implementation + $5k-10k legal fees
- Verifiable parental consent mechanisms required
- Extremely complex ongoing compliance

**Recommended Solution:**
- Change target audience to "Ages 13+"
- Update branding: "AI Kids Spark" → "AI Spark"
- Update messaging: "fun for kids" → "fundamentals for beginners"
- Implement basic GDPR compliance instead

**Benefits:**
- ✅ 70% less legal complexity
- ✅ $3,000-$8,000 saved in legal fees
- ✅ 2-3 weeks to launch (vs 2-3 months)
- ✅ Broader global audience
- ✅ Still family-friendly (parents can supervise 13+ on their account)

### Implementation Phases

**See `IMPLEMENTATION_PLAN_OPTION_A.md` for detailed code examples**

#### Phase 1: Critical Security Fixes (30 min) 🔴
- Fix `DEBUG_UNLOCK_ALL` flag
- Remove `/debug/progress` route
- Secure environment variables

#### Phase 2: Branding Updates (2-3 hours) 🟡
- Update "Ages 6-12" → "Ages 13+"
- Change "AI Kids Spark" → "AI Spark"
- Update testimonials with 13+ personas
- Add age disclaimer to footer

**Key Files:**
- `index.html` - Meta tags
- `src/pages/Index.tsx` - Hero, stats, testimonials
- `src/components/Header.tsx` - Brand name
- `src/components/Footer.tsx` - Age disclaimer
- `public/resources/*.html` - Footer updates

#### Phase 3: Authentication & Database (4-6 hours)
- Create Supabase schema with Row-Level Security
- Implement authentication context
- Build signup form with age verification (13+ check)
- Migrate progress from localStorage to database

**New Files:**
- `src/contexts/AuthContext.tsx`
- `src/components/auth/SignUpForm.tsx`
- `src/components/auth/SignInForm.tsx`
- `supabase/migrations/001_initial_schema.sql`

#### Phase 4: Stripe Integration (4-6 hours)
- Set up Stripe account + API keys
- Create product: "AI Spark Premium" ($9.99/month)
- Implement Stripe Checkout
- Create webhook handlers for subscription events
- Implement feature gating

**New Files:**
- `src/components/payment/SubscriptionCheckout.tsx`
- `src/hooks/useSubscription.ts`
- `supabase/functions/create-checkout-session/`
- `supabase/functions/stripe-webhook/`

#### Phase 5: GDPR Compliance (2-3 hours)
- Add cookie consent banner
- Create Privacy Policy page
- Create Terms of Service page
- Implement data export (download as JSON)
- Implement account deletion

**New Files:**
- `src/components/CookieConsent.tsx`
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`
- `src/components/account/DataExport.tsx`
- `src/components/account/DeleteAccount.tsx`

#### Phase 6: Testing & Deployment (2-3 hours)
- Test authentication flows
- Test payment flows (Stripe test cards)
- Test GDPR features
- Deploy to Vercel with SSL
- Update Stripe webhook URLs

**Total Time:** 15-20 hours over 2-3 weeks

---

## 💰 Cost Structure & Revenue Model

### Monthly Operating Costs

| Service | Free Tier | 100 Users | 1000 Users |
|---------|-----------|-----------|------------|
| Supabase | 500MB, 2GB | $25/mo | $599/mo |
| Stripe | Pay-per-use | ~$30/mo | ~$300/mo |
| Vercel | 100GB | Free | $20/mo |
| Domain | - | $12/year | $12/year |
| SendGrid | 100/day | $15/mo | $50/mo |
| Sentry | 5K events | Free | $26/mo |
| **TOTAL** | **$0** | **~$70/mo** | **~$975/mo** |

### Revenue Potential
- **Pricing:** $9.99/month for premium
- **Break-even:** ~7-10 paying subscribers
- **100 users:** ~$1,000/month
- **1,000 users:** ~$10,000/month

---

## 📋 Code Standards & Development Workflow

### TypeScript Rules
- ❌ NEVER use `any` type
- ✅ Use `const` instead of `let` when not reassigned
- ✅ Proper interface definitions
- ✅ ES6 imports (no `require()`)

### React Patterns
- ✅ Functional components with hooks
- ✅ TypeScript interfaces for props
- ✅ Descriptive component names
- ✅ One component per file
- ✅ Export at bottom

### Accessibility (WCAG 2.1 AA - Required)
- ✅ Touch targets: minimum 44px × 44px
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Visible focus states (`focus:ring-4 focus:ring-{color}/30`)
- ✅ Alt text on all images
- ✅ Semantic HTML

### Kids Safety & COPPA Compliance

**Location:** `.verification/agents/code-reviewer/rules/kids-safety.eslint.js`

**Rules (enforced by ESLint):**
- ❌ NO external links without parental consent warning
- ❌ NO data collection without clear privacy notice
- ❌ NO third-party tracking without disclosure
- ✅ Age-appropriate content only
- ✅ Safe color contrast for readability

**Note:** After 13+ pivot, these become "beginner-friendly safety rules" rather than COPPA compliance.

### NPM Scripts

```bash
# Development
npm run dev              # Start dev server (port 8080)

# Verification (automated)
npm run verify:quick     # Fast (~7s) - TypeScript + ESLint
npm run verify:full      # Full (~10-15min) - All tests
npm run verify:docs      # Check Claude.md is up-to-date

# Testing
npm run test:e2e         # Playwright tests (53+ scenarios)
npm run test             # Vitest unit tests

# Linting
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix issues

# Build
npm run build            # Production build
npm run preview          # Preview production build
```

### Pre-commit Hook

**Automatic on `git commit`:**
- Runs `verify:quick` (TypeScript + ESLint + smoke tests)
- Blocks commit if verification fails
- Takes ~7 seconds

**Bypass (use sparingly):**
```bash
git commit --no-verify -m "message"
```

---

## 🧪 Testing Strategy

### E2E Tests (Playwright)
- **Location:** `.verification/agents/ui-tester/test-suites/`
- **Coverage:** 53+ test scenarios
- **Devices:** Desktop Chrome, Mobile Chrome, iPad
- **Tests:** Navigation, lessons, activities, accessibility, performance

### Unit Tests (Vitest)
- **Location:** `src/**/*.test.ts(x)`
- **Coverage:** Components, utilities, Supabase logic

---

## 🔍 Common Issues & Solutions

### "ESLint errors blocking commit"
**Solution:** Run `npm run lint` to see errors, fix them, then re-commit.

### "Opacity looks wrong"
**Solution:** Check `src/pages/DesignPilot.tsx` and use correct opacity from design tokens.

### "Component doesn't match design"
**Solution:** Use helper functions from `src/design-system/tokens.ts` instead of manual Tailwind.

### "Pre-commit hook too slow"
**Solution:** Expected (~7s). It's preventing bugs before they reach codebase.

### "Can't find IMPLEMENTATION_PLAN_OPTION_A.md"
**Solution:** Make sure you're on branch `claude/deployment-compliance-review-3NyeN`, not main.

---

## 📚 Critical Files - NEVER MODIFY

1. **`src/pages/DesignPilot.tsx`** - Design system reference
2. **`src/design-system/tokens.ts`** - Design tokens
3. **`.verification/agents/code-reviewer/rules/kids-safety.eslint.js`** - Safety rules

---

## 🎓 Important Context for AI Assistants

### When Starting a New Session

1. **Read this file first** - Contains critical context
2. **Check current branch** - Should have implementation docs
3. **Understand deployment decision** - 13+ pivot vs COPPA compliance
4. **Review security issues** - Fix DEBUG_UNLOCK_ALL before other work
5. **Reference implementation plan** - `IMPLEMENTATION_PLAN_OPTION_A.md`

### When Making Changes

1. **Always run verification** after changes (`npm run verify:quick`)
2. **Update Claude.md** when making architectural changes
3. **Never skip ESLint errors** - They enforce critical standards
4. **Use DesignPilot.tsx** as visual reference
5. **Check existing components** before creating new ones
6. **Prioritize accessibility** - WCAG 2.1 AA required

### Communication Style

- ✅ Technical accuracy over validation
- ✅ Concise explanations
- ✅ Show actual results
- ❌ No emojis unless user requests
- ❌ No over-engineering

### Self-Healing Workflow

When user requests a change:
1. Make the change
2. If architectural → Update Claude.md (Last Updated, status)
3. Run `verify:quick`
4. If errors → Fix them
5. Re-run `verify:quick`
6. Repeat until ✅ all pass
7. Commit changes
8. Tell user "Done! Verification passed."

**Never say "you're done" until verification actually passes.**

---

## 📖 Documentation Reference

### In This Repository
- **`Claude.md`** - This file (master context)
- **`IMPLEMENTATION_PLAN_OPTION_A.md`** - Deployment strategy (1,828 lines)
- **`CONTENT_CHANGES_CHECKLIST.md`** - File-by-file changes (384 lines)
- **`BEFORE_AFTER_COMPARISON.md`** - Visual before/after (851 lines)
- **`README.md`** - Original Lovable platform setup
- **`src/design-system/patterns.md`** - Design patterns
- **`.verification/workflows/claude-feedback-loop.md`** - Verification docs

### External Resources
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **GDPR Guide:** https://gdpr.eu/
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/

---

## 🎯 Current Project Goals

### Immediate (Pre-Launch)
1. ✅ Fix security vulnerabilities (Phase 1)
2. ⚠️ Implement authentication (Phase 3)
3. ⚠️ Integrate Stripe payments (Phase 4)
4. ⚠️ Achieve GDPR compliance (Phase 5)
5. ⚠️ Deploy to production with SSL (Phase 6)

### Short-term (Month 1-2)
- Launch with 13+ branding
- Get first 100 paying subscribers
- Collect user feedback
- Iterate on UX

### Medium-term (Month 3-6)
- Social login (Google/GitHub)
- Email notifications
- Progress certificates
- Referral program
- Mobile improvements

### Long-term (Month 7-12)
- Mobile apps (React Native)
- AI tutor integration (ChatGPT)
- Community forum
- Instructor dashboard (for schools)
- Multi-language support

---

## 🚦 Project Status

### Architecture & Design System
- ✅ Design tokens created
- ✅ Component patterns documented
- ✅ Live examples available
- ✅ ESLint rules enforced
- ✅ Accessibility standards implemented

### Content & Features
- ✅ 7 core lessons complete
- ✅ 4 major projects complete
- ✅ 40+ activities complete
- ✅ Interactive components built
- ✅ Beautiful UI designed

### Backend & Deployment
- ⚠️ Supabase configured (no schema)
- ❌ Authentication not implemented
- ❌ Payments not integrated
- ❌ COPPA/GDPR not compliant
- ❌ Security issues present
- ❌ Not production-ready

### Decision Point
- 📍 **YOU ARE HERE:** Choosing deployment path
- 🎯 **Recommended:** Option A (13+ pivot)
- 📅 **Timeline:** 2-3 weeks to launch
- 💰 **Cost:** ~$0-500 (free tiers + legal templates)

---

## 📞 Contact & Support

- **Project Owner:** martin-valny
- **Repository:** https://github.com/martin-valny/AI_kids_spark
- **Current Branch:** claude/deployment-compliance-review-3NyeN
- **Support Email:** hello@aikidsspark.com (update after rebrand)

---

## 🔄 Version History

- **2026-01-08:** Merged architecture + deployment context into master Claude.md
- **2026-01-08:** Created Option A implementation plan (13+ pivot)
- **2026-01-08:** Design system refactoring (Phase 1 & 2 complete)
- **2026-01-07:** Initial project upload with complete frontend

---

**For new AI sessions:** Read this file first, then refer to implementation plans. This is the single source of truth for project context, architecture, and deployment strategy.

---

*This document is maintained by AI assistants. Update "Last Updated" date and relevant sections when making architectural or strategic changes.*
