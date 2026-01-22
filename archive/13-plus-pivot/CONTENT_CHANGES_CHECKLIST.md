# Content Changes Checklist - Option A (13+ Pivot)

## Quick Find/Replace Operations

### Global Search & Replace (Use with caution - review each)

| Find | Replace | Notes |
|------|---------|-------|
| `aged 6-12` | `ages 13+` | Age references |
| `ages 6-12` | `ages 13 and up` | Age references |
| `for kids` | `for students` or `for learners` | Context-dependent |
| `kid-friendly` | `beginner-friendly` | Messaging |
| `AI Kids Spark` | `AI Spark` | Brand name (except CSS color vars) |
| `Your Child` | `You` or `Learners` | Messaging |
| `young minds` | `beginners` or `learners` | Messaging |
| `families` | `learners worldwide` | Testimonials |
| `parents` | `educators` or `students` | Context-dependent |

**⚠️ EXCEPTIONS - Do NOT replace:**
- `kids-blue`, `kids-purple`, `kids-green` (CSS Tailwind color classes)
- File paths containing "kids"
- Internal variable names (refactor separately if needed)

---

## File-by-File Changes

### 🔴 CRITICAL - Phase 1 (30 min)

#### `src/utils/progressTracker.ts`
- **Line 4:** `const DEBUG_UNLOCK_ALL = true;` → `const DEBUG_UNLOCK_ALL = import.meta.env.DEV;`
- **Line 1:** Comment: `for AI Kids Spark Learn` → `for AI Spark`
- **Line 45:** `STORAGE_KEY = 'ai-kids-progress'` → `'ai-spark-progress'`

#### `src/App.tsx`
- **Line 112:** Delete entire line: `<Route path="/debug/progress" element={<ProgressDebugger />} />`

#### `.gitignore`
- Verify `.env` is present
- Add if missing:
  ```
  .env
  .env.local
  .env.*.local
  ```

#### Create `.env.example`
```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

---

### 🟡 HIGH PRIORITY - Phase 2 (2-3 hours)

#### `index.html`
- **Line 7:** `<title>ai-kids-spark-learn</title>` → `<title>AI Spark - Learn AI (Ages 13+)</title>`
- **Line 11:** Update og:title meta tag → `AI Spark - Interactive AI Learning Platform`
- **Add new meta tags:**
  ```html
  <meta name="description" content="Master AI fundamentals through interactive lessons. For ages 13+." />
  <meta property="og:description" content="Interactive AI education for ages 13 and up." />
  ```

#### `src/pages/Index.tsx`

| Line | Current | New |
|------|---------|-----|
| 162 | `Through Play` | `Fundamentals` |
| 170 | `for kids aged 6-12` | `for teens and adults (13+)` |
| 265 | `Everything Your Child Needs` | `Everything You Need` |
| 268 | `for young minds` | `for beginners to advanced learners (13+)` |
| 15 | `kid-friendly way` | `beginner-friendly lessons` |
| 68 | `Kid-friendly explanations` | `Beginner-friendly explanations` |
| 77 | `Kids Learning` | `Students Learning` |
| 79 | `Kid-Safe Content` | `Quality Content` |
| 499 | `Loved by Kids & Parents` | `Trusted by Learners Worldwide` |
| 502 | `what families are saying` | `what students and educators are saying` |
| 588 | `Join thousands of kids` | `Join thousands of learners` |

**Testimonials (Lines 508-528):** Replace all three with:
```tsx
{
  quote: "The interactive lessons helped me understand AI concepts that seemed impossible before. Already built my first chatbot!",
  author: "Sarah M., Age 16",
  role: "High School Student",
  avatar: "👩",
  rating: 5
},
{
  quote: "Perfect for beginners! The projects are practical and the explanations make complex topics easy to grasp.",
  author: "Alex K., Age 22",
  role: "College Student",
  avatar: "🧑",
  rating: 5
},
{
  quote: "I'm a teacher using this with my 14+ students. The content is age-appropriate and genuinely educational.",
  author: "David Chen",
  role: "Computer Science Teacher",
  avatar: "👨‍🏫",
  rating: 5
}
```

#### `src/components/Header.tsx`
- **Line 45:** `AI Kids Spark` → `AI Spark`

#### `src/components/Footer.tsx`
Add new section:
```tsx
<div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
  <p>
    AI Spark is designed for learners aged 13 and above. Parents and educators
    are welcome to supervise younger learners using their own accounts.
  </p>
  <p className="mt-2">
    By using this platform, you confirm that you are 13 years or older.
  </p>
</div>
```

#### `package.json`
- **Line 2:** `"name": "vite_react_shadcn_ts"` → `"name": "ai-spark-learn"`

---

### 🟢 MEDIUM PRIORITY - Resource Files

All files in `public/resources/`:

#### Update footers in these files:
- `ethics-checklist.html` (Line 241)
- `music-pattern-worksheet.html` (Line 450)
- `storyboard-template.html` (Line 227)
- `script-writing-guide.html` (Line 267)
- `personality-worksheet.html` (Line 242)
- `prompt-idea-cards.html` (Line 223)
- `rhythm-cards.html` (Line 376)

**Change:** `AI Kids Spark Learn` → `AI Spark`

#### `blank-music-sheet.html`
- **Line 396:** `For Younger Kids` → `Beginner Level`
- **Line 444:** `For Older Kids` → `Advanced Level`
- **Line 492:** `AI Kids Spark Learn` → `AI Spark`

---

### 🔵 OPTIONAL - Additional Content Files

#### `src/data/projectsData.ts`
- **Line 110:** `'AI Ethics for Kids'` → `'AI Ethics Fundamentals'`

#### Content files with "children" or "kids" in descriptions:
Run this search to find them:
```bash
grep -r "children" src/pages/*.tsx
grep -r "kids learn" src/pages/*.tsx
```

**Manual review each result** and replace contextually:
- "help kids learn" → "help students learn"
- "children building" → "learners building"
- "young children" → "beginners"

---

## New Files to Create

### Authentication (Phase 3)

1. **`src/contexts/AuthContext.tsx`** - See implementation plan
2. **`src/components/auth/SignUpForm.tsx`** - With age verification
3. **`src/components/auth/SignInForm.tsx`** - Standard login
4. **`src/pages/SignUp.tsx`** - Signup page
5. **`src/pages/SignIn.tsx`** - Login page

### Payment (Phase 4)

1. **`src/components/payment/SubscriptionCheckout.tsx`** - Stripe checkout
2. **`src/hooks/useSubscription.ts`** - Subscription status hook
3. **`supabase/functions/create-checkout-session/index.ts`** - Edge function
4. **`supabase/functions/stripe-webhook/index.ts`** - Webhook handler
5. **`supabase/functions/cancel-subscription/index.ts`** - Cancellation handler

### GDPR (Phase 5)

1. **`src/components/CookieConsent.tsx`** - Cookie banner
2. **`src/pages/Privacy.tsx`** - Privacy policy page
3. **`src/pages/Terms.tsx`** - Terms of service page
4. **`src/components/account/DataExport.tsx`** - Data export button
5. **`src/components/account/DeleteAccount.tsx`** - Account deletion
6. **`src/pages/AccountSettings.tsx`** - Settings page with GDPR tools

### Database

1. **`supabase/migrations/001_initial_schema.sql`** - Database schema

---

## Routes to Add in App.tsx

```tsx
// Authentication routes
<Route path="/signup" element={<SignUp />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/signout" element={<SignOut />} />
<Route path="/verify-email" element={<EmailVerification />} />

// Account management
<Route path="/account/settings" element={<AccountSettings />} />
<Route path="/account/subscription" element={<SubscriptionManagement />} />

// Legal pages
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />

// Subscription flow
<Route path="/subscribe" element={<Subscribe />} />
<Route path="/subscription/success" element={<SubscriptionSuccess />} />
<Route path="/subscription/canceled" element={<SubscriptionCanceled />} />
```

---

## Protected Routes (Require Authentication)

Wrap these in `<ProtectedRoute>` component:
- All lesson pages
- All project pages
- `/account/*` routes
- `/subscribe`

Example:
```tsx
<Route
  path="/lessons/intro-to-ai"
  element={
    <ProtectedRoute>
      <IntroToAI />
    </ProtectedRoute>
  }
/>
```

---

## Environment Variables Needed

### `.env` (local development)
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Supabase Edge Functions Secrets
(Set in Supabase Dashboard → Edge Functions → Secrets)
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Vercel Environment Variables
(Same as .env but set in Vercel Dashboard)
- Use `pk_live_...` for Stripe in production

---

## Testing Checklist

### Manual Testing After Content Changes

- [ ] Homepage loads without errors
- [ ] All "AI Kids Spark" → "AI Spark" visible on site
- [ ] No "6-12" age references visible
- [ ] Testimonials show new 13+ personas
- [ ] Footer disclaimer shows "Ages 13+"
- [ ] Meta tags updated (check view source)
- [ ] All lesson pages load
- [ ] All project pages load
- [ ] Resource PDFs updated

### After Authentication Implementation

- [ ] Signup form shows age verification
- [ ] Under-13 signup blocked with helpful message
- [ ] Email verification works
- [ ] Login/logout works
- [ ] Protected routes redirect to login
- [ ] Session persists on refresh

### After Stripe Implementation

- [ ] Subscribe button works
- [ ] Stripe checkout loads
- [ ] Test payment succeeds
- [ ] Webhook updates user status
- [ ] Premium content unlocks
- [ ] Cancel subscription works

### After GDPR Implementation

- [ ] Cookie banner appears
- [ ] Cookie preferences save
- [ ] Privacy policy page loads
- [ ] Terms page loads
- [ ] Data export downloads JSON
- [ ] Account deletion works

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install @stripe/stripe-js react-cookie-consent

# 2. Run database migrations
supabase db push

# 3. Deploy Edge Functions
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build

# 6. Deploy to Vercel
vercel --prod
```

---

## Rollback Plan

If you need to revert changes:

1. **Git:** Create a branch before starting
   ```bash
   git checkout -b option-a-implementation
   ```

2. **Database:** Keep a backup
   ```bash
   supabase db dump > backup.sql
   ```

3. **localStorage Migration:** Keep the migration helper in code for 1 month

4. **DNS:** Don't switch domains until fully tested

---

## Support Contacts

**If you get stuck:**

- **Supabase Support:** https://supabase.com/support
- **Stripe Support:** https://support.stripe.com/
- **GDPR Questions:** Consult with lawyer or use https://gdpr.eu/
- **Community Help:**
  - Supabase Discord: https://discord.supabase.com/
  - Stripe Discord: https://discord.gg/stripe

---

**Remember:** You can start with just Phase 1 (security fixes) today and implement the rest gradually over 2-3 weeks!

**Next Steps:**
1. Review this checklist
2. Start with Phase 1 (30 min - security fixes)
3. Create a git branch: `git checkout -b option-a-pivot`
4. Make changes incrementally
5. Test after each phase
6. Deploy when Phases 1-5 are complete

Good luck! 🚀
