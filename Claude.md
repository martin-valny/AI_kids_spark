# Claude.md - AI Kids Spark Project Context

## Project Overview

**Name:** AI Kids Spark (→ AI Spark after pivot)
**Type:** Educational web application teaching AI fundamentals
**Tech Stack:** React 18, TypeScript, Vite, Tailwind, Supabase, Stripe
**Current Status:** Feature-complete frontend, requires backend implementation for production

---

## 🚨 CRITICAL DEPLOYMENT DECISION

### Current State (Pre-Production)
- ✅ Complete educational content (7 lessons, 4 projects, multiple activities)
- ✅ Beautiful UI with interactive components
- ❌ **No authentication** - all content publicly accessible
- ❌ **No payment system** - subscription is UI mockup only
- ❌ **No compliance** - targeted at ages 6-12 but COPPA not implemented
- ❌ **Security issues** - DEBUG flags active, debug routes exposed

### Recommended Path: **Option A - Pivot to 13+ Platform**

**Why:** Avoids COPPA compliance while maintaining educational value and expanding audience.

**Key Changes:**
1. **Branding:** "AI Kids Spark" → "AI Spark"
2. **Target Audience:** Ages 6-12 → Ages 13+
3. **Messaging:** "Fun for kids" → "Master fundamentals for beginners"
4. **Compliance:** COPPA (complex) → GDPR + age gate (simpler)

**Benefits:**
- ✅ 70% less legal complexity
- ✅ $3,000-$8,000 saved in legal fees
- ✅ 2-3 weeks to launch (vs 2-3 months)
- ✅ Broader global audience
- ✅ Still family-friendly (parents can supervise 13+ on their account)

---

## 📋 IMPLEMENTATION PLAN

**Detailed documentation in:**
- `IMPLEMENTATION_PLAN_OPTION_A.md` - Full technical guide with code examples
- `CONTENT_CHANGES_CHECKLIST.md` - File-by-file change list
- `BEFORE_AFTER_COMPARISON.md` - Visual before/after comparison

### Phase 1: Critical Security Fixes (30 min) 🔴 URGENT

**Files to fix immediately:**

1. **`src/utils/progressTracker.ts` Line 4:**
   ```typescript
   // CURRENT (SECURITY HOLE!)
   const DEBUG_UNLOCK_ALL = true;

   // CHANGE TO:
   const DEBUG_UNLOCK_ALL = import.meta.env.DEV;
   ```

2. **`src/App.tsx` Line 112:**
   ```typescript
   // REMOVE THIS LINE:
   <Route path="/debug/progress" element={<ProgressDebugger />} />
   ```

3. **Environment Variables:**
   - Verify `.env` is in `.gitignore`
   - Create `.env.example` (safe to commit)
   - Never commit actual `.env` file

### Phase 2: Branding Updates (2-3 hours)

**Global Find/Replace:**
- `aged 6-12` → `ages 13+`
- `AI Kids Spark` → `AI Spark` (except CSS vars)
- `kid-friendly` → `beginner-friendly`
- `Your Child` → `You` / `Learners`

**Key Files:**
- `index.html` - Update title and meta tags
- `src/pages/Index.tsx` - Hero section, testimonials, stats
- `src/components/Header.tsx` - Brand name
- `src/components/Footer.tsx` - Add age disclaimer
- `public/resources/*.html` - Update footers

### Phase 3: Authentication & Database (4-6 hours)

**Create Supabase Schema:**
```sql
-- profiles table with age verification
-- lesson_progress table
-- project_progress table
-- subscription_events table
-- audit_log table (GDPR)
-- Row-level security policies
```

**Create Components:**
- `src/contexts/AuthContext.tsx` - Auth provider
- `src/components/auth/SignUpForm.tsx` - With age verification (13+ check)
- `src/components/auth/SignInForm.tsx` - Standard login
- Protected routes wrapper

### Phase 4: Stripe Integration (4-6 hours)

**Setup:**
- Create Stripe account & get API keys
- Create product: "AI Spark Premium" ($9.99/month)
- Install `@stripe/stripe-js`

**Create Edge Functions:**
- `supabase/functions/create-checkout-session/` - Start subscription
- `supabase/functions/stripe-webhook/` - Handle subscription events
- `supabase/functions/cancel-subscription/` - Handle cancellations

**Components:**
- `src/components/payment/SubscriptionCheckout.tsx`
- `src/hooks/useSubscription.ts` - Check subscription status
- Feature gating based on subscription

### Phase 5: GDPR Compliance (2-3 hours)

**Required:**
1. **Cookie Consent:** Install `react-cookie-consent`, add banner
2. **Privacy Policy:** Create `src/pages/Privacy.tsx`
3. **Terms of Service:** Create `src/pages/Terms.tsx`
4. **Data Export:** `src/components/account/DataExport.tsx` - Download user data as JSON
5. **Account Deletion:** `src/components/account/DeleteAccount.tsx` - Self-service deletion

### Phase 6: Testing & Deployment (2-3 hours)

**Test Checklist:**
- [ ] Age verification (13+ pass, <13 fail)
- [ ] Authentication flows (signup, login, logout)
- [ ] Payment (test card: 4242 4242 4242 4242)
- [ ] Webhooks update subscription status
- [ ] Feature gating works
- [ ] Data export downloads JSON
- [ ] Account deletion works

**Deploy:**
- Platform: Vercel (recommended)
- SSL: Automatic with Vercel
- Environment variables in Vercel dashboard
- Update Stripe webhook URL to production

---

## 🔒 CURRENT SECURITY ISSUES

**CRITICAL - Fix Immediately:**

1. **DEBUG_UNLOCK_ALL = true** (Line 4 in `src/utils/progressTracker.ts`)
   - Currently unlocks ALL content without completing lessons
   - Bypasses all progress requirements
   - **MUST** be set to `import.meta.env.DEV` for dev-only

2. **Debug Route Exposed** (`/debug/progress` in `src/App.tsx`)
   - Comment says "Remove in production" but still present
   - Exposes progress manipulation tools
   - **MUST** be removed before deployment

3. **Environment Variables** (`.env` file)
   - Contains Supabase publishable key
   - Verify it's in `.gitignore`
   - Create `.env.example` for contributors

---

## 📊 CURRENT ARCHITECTURE

### Frontend (Complete ✅)
- **Framework:** React 18.3.1 + TypeScript 5.5.3
- **Build:** Vite 5.4.1
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **Animations:** Framer Motion
- **3D:** React Three Fiber

### Backend (Partially Configured ⚠️)
- **Database:** Supabase (configured but no schema)
- **Auth:** Supabase Auth (configured but not implemented)
- **Storage:** Currently localStorage only (needs migration to Supabase)
- **Payments:** None (needs Stripe integration)

### Content Structure
- **7 Core Lessons:** intro-to-ai, machine-learning-basics, data-and-patterns, image-recognition, simple-algorithms, ai-ethics, future-of-ai
- **4 Projects:** music-ai-creator, ai-art-studio, build-chatbot, ai-video-magic
- **Multiple Activities:** Games, coding challenges, ethics scenarios

---

## 🎯 PROJECT GOALS

### Immediate (Pre-Launch)
1. ✅ Fix security vulnerabilities
2. ⚠️ Implement authentication
3. ⚠️ Integrate payment system
4. ⚠️ Achieve GDPR compliance
5. ⚠️ Deploy to production with SSL

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
- Mobile-responsive improvements

### Long-term (Month 7-12)
- Mobile apps (React Native)
- AI tutor integration (ChatGPT)
- Community forum
- Instructor dashboard (for schools)
- Multi-language support

---

## 💰 COST STRUCTURE

### Monthly Operating Costs (Projected)

| Service | Free Tier | 100 Users | 1000 Users |
|---------|-----------|-----------|------------|
| **Supabase** | 500MB, 2GB bandwidth | $25/mo | $599/mo |
| **Stripe** | Pay-per-use | ~$30/mo | ~$300/mo |
| **Vercel** | 100GB bandwidth | Free | $20/mo |
| **Domain** | - | $12/year | $12/year |
| **Email (SendGrid)** | 100/day | $15/mo | $50/mo |
| **Sentry (errors)** | 5K events | Free | $26/mo |
| **TOTAL** | **$0** | **~$70/mo** | **~$975/mo** |

### Revenue Potential
- 100 subscribers × $9.99 = ~$1,000/month
- 1,000 subscribers × $9.99 = ~$10,000/month
- Break-even: ~7-10 paying subscribers

---

## 🚀 QUICK START FOR NEW AI SESSIONS

### For Implementation Work:
1. **Check current branch:** Should be on `claude/deployment-compliance-review-3NyeN`
2. **Read implementation plan:** `IMPLEMENTATION_PLAN_OPTION_A.md`
3. **Start with Phase 1:** Security fixes (30 minutes, critical)
4. **Reference checklist:** `CONTENT_CHANGES_CHECKLIST.md` for file changes

### For Content Updates:
1. **Age references:** Change all "6-12" to "13+"
2. **Branding:** "AI Kids Spark" → "AI Spark"
3. **Messaging:** "kids" → "students/learners", "kid-friendly" → "beginner-friendly"
4. **CSS colors:** Keep `kids-blue`, `kids-purple` etc. (just variable names)

### For Feature Development:
1. **Authentication:** Use Supabase Auth context pattern (see Phase 3)
2. **Payments:** Use Stripe Checkout + webhooks (see Phase 4)
3. **Data:** Migrate from localStorage to Supabase tables with RLS
4. **Progress tracking:** Update `progressTracker.ts` to sync with database

---

## 📖 KEY DOCUMENTATION

### In This Repository
- **`README.md`** - Original project setup (Lovable platform integration)
- **`IMPLEMENTATION_PLAN_OPTION_A.md`** - Complete technical implementation guide (1,828 lines)
- **`CONTENT_CHANGES_CHECKLIST.md`** - File-by-file change list (384 lines)
- **`BEFORE_AFTER_COMPARISON.md`** - Visual before/after guide (851 lines)
- **`Claude.md`** - This file (project context for AI assistants)

### External Resources
- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **GDPR Guide:** https://gdpr.eu/
- **React Query:** https://tanstack.com/query/latest

---

## ⚠️ IMPORTANT NOTES FOR AI ASSISTANTS

### When Making Changes:
1. **Always read files before editing** - Don't assume current state
2. **Test incrementally** - Each phase should be tested before moving on
3. **Use branches** - Create feature branches, don't commit directly to main
4. **Security first** - Phase 1 (security) must be done before anything else
5. **Commit frequently** - Small, atomic commits with clear messages

### When Answering Questions:
1. **Context matters** - This is a pivot from 6-12 to 13+ to avoid COPPA
2. **Legal complexity** - COPPA is extremely complex; 13+ with GDPR is much simpler
3. **Timeline realism** - Full implementation is 15-20 hours, not days
4. **Cost transparency** - Most services have generous free tiers initially

### When Stuck:
1. **Check existing docs** - Answer is likely in one of the implementation docs
2. **Supabase Discord** - Excellent community support
3. **Stripe Discord** - Fast responses on payment integration
4. **Don't guess on legal** - Use templates from Termly/iubenda or consult lawyer

---

## 🎓 EDUCATIONAL PHILOSOPHY

Despite the 13+ pivot, the platform maintains its core educational values:

- **Beginner-Friendly:** Clear explanations, no prior knowledge assumed
- **Hands-On:** Learn by doing, not just reading
- **Interactive:** Games, projects, and activities reinforce concepts
- **Ethical:** AI Ethics is a core lesson, not an afterthought
- **Accessible:** Beautiful UI, inclusive design, multi-device support

The content works perfectly for:
- High school students (13-18) exploring AI
- College students supplementing coursework
- Adult learners career-changing into tech
- Educators looking for teaching resources
- Parents supervising 13+ kids on family accounts

---

## 📞 CONTACT & SUPPORT

- **Project Owner:** martin-valny
- **Repository:** https://github.com/martin-valny/AI_kids_spark
- **Support Email:** hello@aikidsspark.com (update after rebrand)

---

**Last Updated:** 2026-01-08
**Branch:** claude/deployment-compliance-review-3NyeN
**Status:** Implementation plan complete, awaiting approval to proceed

---

## 🔄 VERSION HISTORY

- **2026-01-08:** Created comprehensive Option A implementation plan (13+ pivot)
- **2026-01-07:** Initial project upload with complete frontend
- **Earlier:** Development on Lovable platform

---

**For new AI sessions:** Read this file first, then refer to the detailed implementation plans in the links above.
