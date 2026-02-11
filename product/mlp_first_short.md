# MLP: Make Your First AI-Boosted Short

## Overview

**Route:** `/mlp/first-short`
**Time box:** 60–90 minutes
**Outcome:** A post-ready short video plan (hook, captions, template) saved to portfolio
**Entry points:** Homepage "Start Here" card, Lessons page banner

## 3-Step Flow

### Step 1: Pick a Template (10 min)

Three genre options:

1. **Trending Explainer** — "Did you know...?" format. Good for education, tech, or curiosity content.
2. **Day in the Life** — Show your process. Good for creators, students, freelancers.
3. **Product Showcase** — Highlight a tool, product, or project. Good for reviews and portfolios.

Each template provides a structure outline and example hooks.

### Step 2: Generate & Refine Hook + Captions (30–40 min)

**Hook generation:**
- Prompt template: "Write 3 scroll-stopping hooks for a [template type] short about [topic]. Keep each under 10 words."
- User picks or edits their favorite hook

**Caption generation:**
- Prompt template: "Write captions for a 30-60 second [template type] video with the hook: [hook]. Include a CTA."
- User reviews and refines

**Tips provided:**
- Hook formula: curiosity gap + specificity
- Caption structure: hook → value → CTA
- Length guide: 30-60 seconds optimal for TikTok/Reels/Shorts

### Step 3: Export Checklist + Save to Portfolio (20 min)

**Export checklist:**
- [ ] Hook finalized
- [ ] Captions written
- [ ] Template chosen
- [ ] Ready to film/edit in CapCut

**Save to Portfolio:**
- Saves template choice, hook, and captions to localStorage
- Visible in "My Projects" section on the MLP page
- Placeholder until full portfolio/gallery system (Month 10)

## Success Criteria

- User has a complete short video plan they can execute
- Output is saved and retrievable
- Total time under 90 minutes
- Zero required signups or paid tools to complete

## Technical Notes

- Page component: `/src/pages/mlp/FirstShort.tsx`
- Portfolio storage: `localStorage` key `lumora-mlp-projects`
- No backend dependency — fully client-side
