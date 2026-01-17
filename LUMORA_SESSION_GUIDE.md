# 🎨 LUMORA - Session-Based Implementation Guide
## Transform to The Creative AI Platform | Step-by-Step Execution

**Last Updated:** 2026-01-17
**Current Status:** ⬜ Planning Complete - Ready to Execute

---

## 📊 PROGRESS DASHBOARD

```
┌─────────────────────────────────────────────────────────────┐
│  OVERALL PROGRESS: ░░░░░░░░░░░░░░░░░░░░  0% (0/10 sessions) │
└─────────────────────────────────────────────────────────────┘

✅ COMPLETED SESSIONS: None yet
🔄 CURRENT SESSION: SESSION 1 - Core Rebrand to LUMORA
📋 NEXT SESSION: SESSION 2 - Resource Files & Secondary Pages
```

### Session Status Table

| Session | Task | Files | Time | Status | Branch |
|---------|------|-------|------|--------|--------|
| **1** | Core Rebrand to LUMORA | 8 | 3-4h | ⬜ TODO | `lumora/session-1-core-rebrand` |
| **2** | Resource Files & Secondary | 16 | 2-3h | ⬜ NEXT | `lumora/session-2-resources` |
| **3** | Visual Assets & Images | N/A | 4-6h | ⬜ WAIT | `lumora/session-3-visuals` |
| **4** | Content Maturity Updates | 10 | 4-5h | ⬜ WAIT | `lumora/session-4-content` |
| **5** | AI Tutor Chatbot | 4 | 6-8h | ⬜ WAIT | `lumora/session-5-ai-tutor` |
| **6** | Quiz System | 3 | 5-6h | ⬜ WAIT | `lumora/session-6-quizzes` |
| **7** | Certification Program | 2 | 4-5h | ⬜ WAIT | `lumora/session-7-certs` |
| **8** | Community Gallery | 3 | 5-6h | ⬜ WAIT | `lumora/session-8-community` |
| **9** | Final Polish & Testing | 10+ | 3-4h | ⬜ WAIT | `lumora/session-9-polish` |
| **10** | Deploy & Launch | N/A | 4-5h | ⬜ WAIT | `lumora/session-10-launch` |

**Legend:** ⬜ TODO | 🔄 IN PROGRESS | ✅ DONE | ⏸️ BLOCKED | ❌ SKIPPED

---

## 🎨 LUMORA Brand Overview

**Platform Name:** LUMORA
**Tagline:** "Master AI. Create Everything."
**Positioning:** The creative AI platform for Gen Z and beyond

**Target:** Ages 13-25 (teens, young adults, college students)
**Focus:** Creative AI (art, music, video) not coding bootcamp
**Approach:** Industry tools, portfolio-building, hands-on projects

**Key Decisions:**
- ✅ Name: LUMORA (user confirmed)
- ✅ Keep YouTube videos with curator enhancements
- ✅ Images: Mix of AI art + teens creating
- ✅ Rebrand first, then features
- ✅ Budget: $0-50 total

---

## 📝 HOW TO USE THIS GUIDE

### 🚀 Quick Start Template (Use for EVERY session)

**Starting SESSION 1 (first time):**
```
I'm ready to execute SESSION 1 of the LUMORA rebrand.
Guide me through the core rebrand step-by-step.
```

**Starting SESSION 2+ (new Claude conversation):**
```
I'm continuing the LUMORA rebrand project.

Read LUMORA_SESSION_GUIDE.md and execute SESSION [X].

Current status: SESSION [X-1] complete ✅, now starting SESSION [X].
```

**What happens automatically:**
- ✅ I read the plan file
- ✅ Check progress dashboard
- ✅ Load current session details
- ✅ Pull from master plan if needed (Sessions 4+)
- ✅ Guide you step-by-step
- ✅ You just follow along!

---

### For Each Session:

1. **Start Fresh Conversation** - Resets token count (critical!)
2. **Use Quick Start Template** - Copy-paste message above
3. **Follow Steps** - I guide you through each file edit
4. **Verify Changes** - Run tests I provide
5. **Commit & Push** - Use templates I provide
6. **Merge to Main** - Complete the session
7. **Update Plan Progress** - I help you mark ✅ DONE
8. **Repeat** - Next session, fresh conversation

### Session Scope Guidelines:

- Each session = 1 feature branch → commit → merge
- Estimated time: 2-8 hours per session
- Token usage: < 100k per session (leaves buffer)
- Fresh conversation per session (CRITICAL for token reset)
- Sequential execution (no parallel sessions)

---

# 🚀 SESSION 1: Core Rebrand to LUMORA

**Status:** ⬜ TODO (START HERE!)
**Estimated Time:** 3-4 hours
**Token Estimate:** 60-80k tokens
**Priority:** CRITICAL - Must complete first

## Session Overview

Transform core user-facing files from "AI Kids Spark" → "LUMORA". Update branding, messaging, and positioning to target ages 13-25 creative focus.

**Files to Edit: 8**
1. `index.html` - Meta tags and title
2. `package.json` - Project name
3. `src/components/Header.tsx` - Navigation logo
4. `src/components/Footer.tsx` - Footer branding & emails
5. `src/pages/About.tsx` - About page mission
6. `src/pages/Index.tsx` - Homepage hero
7. `src/pages/Terms.tsx` - Legal pages
8. `src/pages/Privacy.tsx` - Privacy policy

---

## Pre-Session Checklist

- [ ] On `main` branch with latest changes
- [ ] No uncommitted changes (`git status` clean)
- [ ] Read LUMORA brand guidelines above
- [ ] Understand tone shift (professional, creative, ages 13-25)

---

## Step 1: Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b lumora/session-1-core-rebrand
```

**Branch Name:** `lumora/session-1-core-rebrand`

---

## Step 2: File-by-File Edits

### 📄 File 1: index.html (4 changes)

**Location:** `/home/user/AI_kids_spark/index.html`

**Line 7:** Title Tag
```html
<!-- OLD -->
<title>ai-kids-spark-learn</title>

<!-- NEW -->
<title>Lumora - Master AI. Create Everything.</title>
```

**Line 8:** Meta Description
```html
<!-- OLD -->
<meta name="description" content="Lovable Generated Project" />

<!-- NEW -->
<meta name="description" content="Master AI through creativity. Build art, music, videos, and stories with cutting-edge AI tools. The creative AI platform for teens and young creators ages 13-25." />
```

**Line 11:** Open Graph Title
```html
<!-- OLD -->
<meta property="og:title" content="ai-kids-spark-learn" />

<!-- NEW -->
<meta property="og:title" content="Lumora - The Creative AI Platform" />
```

**Line 12:** Open Graph Description
```html
<!-- OLD -->
<meta property="og:description" content="Lovable Generated Project" />

<!-- NEW -->
<meta property="og:description" content="Master AI through creativity. Build art, music, and videos with AI. For ages 13-25." />
```

**Time:** 10 minutes

---

### 📄 File 2: package.json (1 change)

**Location:** `/home/user/AI_kids_spark/package.json`

**Line 2:** Package Name
```json
// OLD
"name": "vite_react_shadcn_ts",

// NEW
"name": "lumora",
```

**Time:** 2 minutes

---

### 📄 File 3: Header.tsx (1 change)

**Location:** `/home/user/AI_kids_spark/src/components/Header.tsx`

**Line 44:** Logo Text
```tsx
// OLD
AI Spark

// NEW
Lumora
```

**Optional Enhancement (text-only logo for now):**
```tsx
<div className="flex items-center gap-2">
  <Sparkles className="w-8 h-8 text-kids-purple" />
  <span className="text-2xl font-bold bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent">
    Lumora
  </span>
</div>
```

**Time:** 15 minutes

---

### 📄 File 4: Footer.tsx (4 changes)

**Location:** `/home/user/AI_kids_spark/src/components/Footer.tsx`

**Line 11:** Footer Brand Name
```tsx
// OLD
AI Spark

// NEW
Lumora
```

**Line 13:** Footer Description
```tsx
// OLD
"Making AI fun and accessible for learners ages 13 and up!"

// NEW
"Master AI through creativity. For teens and young creators ages 13-25."
```

**Lines 59 & 62:** Email Address
```tsx
// OLD
hello@aispark.com

// NEW
hello@lumora.ai
```

**Line 67:** Copyright
```tsx
// OLD
© {new Date().getFullYear()} AI Spark. All rights reserved.

// NEW
© {new Date().getFullYear()} Lumora. All rights reserved.
```

**Time:** 15 minutes

---

### 📄 File 5: About.tsx (5 changes)

**Location:** `/home/user/AI_kids_spark/src/pages/About.tsx`

**Line 12:** Age Demographic (in features array)
```tsx
// OLD
"Our lessons are crafted for learners ages 13 and up"

// NEW
"Our lessons are crafted for creators ages 13-25"
```

**Line 64:** Page Heading
```tsx
// OLD
About <span>AI Spark</span>

// NEW
About <span>Lumora</span>
```

**Line 73:** Mission Statement (MAJOR REWRITE)
```tsx
// OLD
We're on a mission to make artificial intelligence accessible,
fun, and educational for the next generation of young innovators.

// NEW
We're building the creative AI platform for Gen Z and beyond.

AI is transforming every creative industry - from film to music to
design. At Lumora, we don't just teach AI concepts. We teach
you how to create with AI, using the same tools professionals use.

Our mission: Empower the next generation of digital creators to
shape culture, not just consume it.
```

**Line 103:** Brand Mention
```tsx
// OLD
At AI Spark, we turn complex AI concepts into fun, accessible learning experiences

// NEW
At Lumora, we empower you to master AI through hands-on creative projects
using industry-standard tools.
```

**Line 140:** Section Heading
```tsx
// OLD
Why Choose <span>AI Spark</span>?

// NEW
Why Choose <span>Lumora</span>?
```

**Additional Edits:**
- Update "learners" → "creators" throughout
- Update "learning" → "creating" where appropriate

**Time:** 30 minutes

---

### 📄 File 6: Index.tsx - Homepage (MAJOR REWRITE)

**Location:** `/home/user/AI_kids_spark/src/pages/Index.tsx`

**Line 15:** Meta Description (SEO)
```tsx
description: "Master AI through creativity - build art, music, videos, and stories with cutting-edge AI tools. The creative AI platform for ages 13-25."
```

**Lines ~60-100:** Hero Section (COMPLETE REWRITE)

Find the hero `<h1>` and `<p>` tags, replace with:

```tsx
<h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
  Master AI. <br />
  <span className="bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent">
    Create Everything.
  </span>
</h1>

<p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
  The creative AI platform for the next generation of digital artists,
  musicians, storytellers, and innovators. From prompt engineer to digital
  creator - build art, music, videos, and interactive experiences with
  cutting-edge AI tools.
</p>
```

**Line 170 (approx):** Age Demographics
```tsx
// OLD
"Fun, interactive lessons and games designed for beginners aged 13 and up"

// NEW
"Hands-on creative projects designed for teens and young adults ages 13-25"
```

**CTA Buttons:** Update throughout
```tsx
// OLD
"Start Learning Today! 🎉"

// NEW
"Start Creating"
```

**Time:** 45 minutes

---

### 📄 File 7: Terms.tsx (Find & Replace)

**Location:** `/home/user/AI_kids_spark/src/pages/Terms.tsx`

**Find & Replace ALL instances:**
- `AI Spark` → `Lumora`

**Line 165:** Legal Email
```tsx
// OLD
legal@aispark.com

// NEW
legal@lumora.ai
```

**Time:** 10 minutes

---

### 📄 File 8: Privacy.tsx (Find & Replace)

**Location:** `/home/user/AI_kids_spark/src/pages/Privacy.tsx`

**Find & Replace:**
- Line 30: `AI Spark ("we", "our", or "us")` → `Lumora ("we", "our", or "us")`
- Lines 102, 151: `privacy@aispark.com` → `privacy@lumora.ai`
- Line 152: `dpo@aispark.com` → `dpo@lumora.ai`

**Time:** 10 minutes

---

## Step 3: Verification & Testing

### Acceptance Criteria Checklist:

**Visual Verification (Browser):**
- [ ] Run `npm run dev`
- [ ] Navigate to `http://localhost:5173`
- [ ] Header shows "Lumora" (not "AI Spark")
- [ ] Footer shows "Lumora" and @lumora.ai emails
- [ ] Homepage hero says "Master AI. Create Everything."
- [ ] About page mission mentions "creative AI platform"
- [ ] No visible instances of "AI Spark" or "AI Kids Spark"

**Code Verification (Grep):**
```bash
# Should return 0 results in user-facing files:
grep -r "AI Spark" src/pages/ src/components/Header.tsx src/components/Footer.tsx index.html

# Should find "Lumora":
grep -r "Lumora" src/pages/Index.tsx src/pages/About.tsx src/components/Header.tsx
```

**Meta Tag Verification:**
- [ ] View page source in browser
- [ ] `<title>` contains "Lumora"
- [ ] Meta description mentions "creative AI platform"

**Mobile Verification:**
- [ ] Open DevTools → Toggle device toolbar
- [ ] Check mobile view (iPhone, iPad sizes)
- [ ] Branding looks good on mobile

**Time:** 20 minutes

---

## Step 4: Commit & Push

```bash
# Stage changes
git add index.html package.json src/components/Header.tsx src/components/Footer.tsx src/pages/About.tsx src/pages/Index.tsx src/pages/Terms.tsx src/pages/Privacy.tsx

# Verify what's staged
git status

# Commit with detailed message
git commit -m "SESSION 1: Core rebrand to LUMORA

Transform core user-facing files from 'AI Kids Spark' to 'LUMORA'.
Update positioning to target ages 13-25 creative focus.

Changes:
- Rebrand all page titles and meta tags
- Update header/footer with Lumora branding
- Rewrite homepage hero for creative positioning
- Update About page mission statement
- Replace all email addresses with @lumora.ai
- Update legal pages (Terms, Privacy)

Files modified: 8
- index.html (meta tags)
- package.json (project name)
- Header.tsx (logo)
- Footer.tsx (branding, emails)
- About.tsx (mission, positioning)
- Index.tsx (homepage hero)
- Terms.tsx (legal)
- Privacy.tsx (privacy policy)

Target audience: Ages 13-25
New tagline: Master AI. Create Everything.
Brand positioning: Creative AI platform for Gen Z

Verification: ✅ All visual checks passed
Next: SESSION 2 - Resource files & secondary pages"

# Push to remote
git push -u origin lumora/session-1-core-rebrand
```

---

## Step 5: Create Pull Request (Optional)

**If using PR workflow:**
```bash
# Get PR URL from git push output
# Or create manually on GitHub
```

**PR Title:** `SESSION 1: Core Rebrand to LUMORA`
**PR Description:**
```markdown
## Session 1: Core Rebrand to LUMORA

Transforms core user-facing files from "AI Kids Spark" to "LUMORA".

### Changes Made:
✅ 8 files updated with new branding
✅ Homepage hero rewritten for creative focus
✅ About page mission statement updated
✅ All email addresses → @lumora.ai
✅ Target audience: 13-25 (not 6-12)
✅ Positioning: Creative AI platform

### Testing:
✅ Visual verification in browser
✅ Mobile responsive check
✅ No instances of old brand visible
✅ Meta tags updated for SEO

### Next Steps:
Ready for SESSION 2: Resource Files & Secondary Pages
```

---

## Step 6: Merge to Main

**Option A: Merge Locally**
```bash
git checkout main
git merge lumora/session-1-core-rebrand
git push origin main
```

**Option B: Merge via GitHub PR**
- Review and approve PR
- Click "Merge Pull Request"
- Delete branch after merge

---

## Step 7: Update This Plan File

**Mark Session 1 as complete in Progress Dashboard:**

Update line 10 of this file:
```
✅ COMPLETED SESSIONS: SESSION 1 ✅
🔄 CURRENT SESSION: SESSION 2 - Resource Files & Secondary Pages
```

Update Session Status Table (Session 1 row):
```
| **1** | Core Rebrand to LUMORA | 8 | 3-4h | ✅ DONE | `merged` |
```

**Commit the update:**
```bash
git add LUMORA_SESSION_GUIDE.md
git commit -m "Update plan: SESSION 1 complete ✅"
git push origin main
```

---

## Step 8: Start Next Session

**In a NEW Claude conversation (important for token reset):**

Copy-paste this exact message to start SESSION 2:

```
I'm continuing the LUMORA rebrand project.

Read LUMORA_SESSION_GUIDE.md and execute SESSION 2.

Current status: SESSION 1 complete ✅, now starting SESSION 2.
```

**What happens next:**
- I'll read the plan file automatically
- See SESSION 1 is marked complete
- See SESSION 2 is next
- Guide you through SESSION 2 step-by-step
- No need to explain context - plan file has everything

**Pro tip:** Bookmark this exact message format for each session!

---

# 🚀 SESSION 2: Resource Files & Secondary Pages

**Status:** ⬜ TODO (NEXT)
**Estimated Time:** 2-3 hours
**Token Estimate:** 40-60k tokens
**Priority:** HIGH

## Session Overview

Update 12 HTML resource files and 4 secondary page files with LUMORA branding.

**Files to Edit: 16**

### HTML Resources (12 files):
1. `public/resources/rhythm-cards.html`
2. `public/resources/prompt-idea-cards.html`
3. `public/resources/blank-music-sheet.html`
4. `public/resources/conversation-flowchart.html`
5. `public/resources/ethics-checklist.html`
6. `public/resources/music-pattern-worksheet.html`
7. `public/resources/script-writing-guide.html`
8. `public/resources/personality-worksheet.html`
9. `public/resources/art-gallery-template.html`
10. `public/resources/storyboard-template.html`
11. `public/resources/video-planning-sheet.html`
12. `public/resources/style-reference-sheet.html`

### Secondary Pages (4 files):
13. `src/components/auth/SignUpForm.tsx`
14. `src/pages/Resources.tsx`
15. `src/utils/progressTracker.ts`
16. `src/design-system/tokens.ts`

---

## Pre-Session Checklist

- [ ] SESSION 1 complete and merged to main
- [ ] On `main` branch with latest changes
- [ ] Read SESSION 1 learnings (any issues?)

---

## Step 1: Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b lumora/session-2-resources
```

---

## Step 2: Automated HTML Updates (FASTEST)

**All 12 HTML files need:**
1. `<title>` tag: "- AI Spark" → "- Lumora"
2. Footer branding: "AI Spark" → "Lumora"

### Option A: Automated (Recommended)

```bash
cd public/resources

# Find & replace in all HTML files
for file in *.html; do
  sed -i 's/AI Spark/Lumora/g' "$file"
done

# Verify changes
grep "Lumora" *.html

# Should show multiple matches in each file
```

**Time:** 5 minutes

### Option B: Manual (If sed doesn't work)

Open each file, find "AI Spark", replace with "Lumora" (usually 2 instances per file).

**Time:** 1.5 hours

---

## Step 3: Secondary Page Edits

### 📄 File 13: SignUpForm.tsx

**Location:** `/home/user/AI_kids_spark/src/components/auth/SignUpForm.tsx`

**Line 109:**
```tsx
// OLD
"Join AI Spark and start learning!"

// NEW
"Join Lumora and start creating!"
```

**Time:** 5 minutes

---

### 📄 File 14: Resources.tsx

**Location:** `/home/user/AI_kids_spark/src/pages/Resources.tsx`

**Line 151:**
```tsx
// OLD
help@aikidsspark.com

// NEW
help@lumora.ai
```

**Time:** 5 minutes

---

### 📄 File 15: progressTracker.ts

**Location:** `/home/user/AI_kids_spark/src/utils/progressTracker.ts`

**Line 1:** Update comment
```typescript
// OLD
// Progress Tracking Utility for AI Spark

// NEW
// Progress Tracking Utility for Lumora
```

**Time:** 2 minutes

---

### 📄 File 16: tokens.ts

**Location:** `/home/user/AI_kids_spark/src/design-system/tokens.ts`

**Line 2:** Update comment
```typescript
// OLD
* Design Tokens - AI Spark

// NEW
* Design Tokens - Lumora
```

**Time:** 2 minutes

---

## Step 4: Verification

```bash
# Verify HTML files updated
grep -r "Lumora" public/resources/

# Should show hits in all 12 files

# Verify secondary files
grep "Lumora" src/components/auth/SignUpForm.tsx
grep "lumora.ai" src/pages/Resources.tsx

# Test in browser
npm run dev
# Visit http://localhost:5173/resources
# Click download links, verify worksheets show "Lumora"
```

**Time:** 15 minutes

---

## Step 5: Commit & Push

```bash
git add public/resources/*.html src/components/auth/SignUpForm.tsx src/pages/Resources.tsx src/utils/progressTracker.ts src/design-system/tokens.ts

git commit -m "SESSION 2: Resource files & secondary pages rebrand

Update all downloadable resources and secondary pages with Lumora branding.

Changes:
- Update 12 HTML resource worksheets (titles + footers)
- Update SignUp form messaging (learning → creating)
- Update Resources page email address
- Update utility file comments

Files modified: 16
- 12 HTML worksheets in public/resources/
- SignUpForm.tsx
- Resources.tsx
- progressTracker.ts
- tokens.ts

Verification: ✅ All resources show Lumora branding
Next: SESSION 3 - Visual assets & images"

git push -u origin lumora/session-2-resources
```

---

## Step 6: Merge & Update Plan

Follow same process as SESSION 1:
1. Merge to main
2. Update plan progress dashboard
3. Mark SESSION 2 as ✅ DONE
4. Move to SESSION 3

---

# 🚀 SESSION 3: Visual Assets & Images

**Status:** ⬜ TODO (AFTER SESSION 2)
**Estimated Time:** 4-6 hours
**Token Estimate:** 60-80k tokens
**Priority:** HIGH

## Session Overview

Create text-based logo, update images to show AI creativity and teen creators.

**Deliverables:**
1. Text-based Lumora logo in Header
2. Favicon update (optional)
3. Homepage images (3 updates)
4. About page images (2 updates)
5. YouTube video curator introductions (6 lessons)

---

## Pre-Session Checklist

- [ ] SESSION 2 complete and merged
- [ ] Understand brand aesthetic (creative, modern, ages 13-25)
- [ ] Review Unsplash for image inspiration

---

## Step 1: Create Branch

```bash
git checkout main
git pull origin main
git checkout -b lumora/session-3-visuals
```

---

## Step 2: Text-Based Logo (30 minutes)

**File:** `src/components/Header.tsx`

**Find the logo section, enhance with gradient text:**

```tsx
<div className="flex items-center gap-2">
  <Sparkles className="w-8 h-8 text-kids-purple" />
  <span className="text-2xl font-bold bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent">
    Lumora
  </span>
</div>
```

**Import Sparkles:**
```tsx
import { Sparkles } from 'lucide-react';
```

---

## Step 3: Homepage Images (2-3 hours)

**File:** `src/pages/Index.tsx`

**Images to Update:**

### Image 1: Hero Section Background
Search Unsplash: "teen digital art creation" or "AI generated art colorful"

```tsx
// Find existing hero section, add background image or update
<img
  src="https://images.unsplash.com/photo-[SELECTED]?auto=format&fit=crop&w=1200&q=80"
  alt="Creative AI in action"
/>
```

### Image 2: "What You'll Create" Section
Update 3 cards with AI art examples:
- AI Art: Midjourney-style creative image
- AI Music: Music visualizer or waveform
- AI Video: Video editing or creation scene

### Image 3: Testimonials
Update student photos to teens (ages 13-19), diverse

**Curated Unsplash Searches:**
- https://unsplash.com/s/photos/artificial-intelligence-art
- https://unsplash.com/s/photos/digital-art-creation
- https://unsplash.com/s/photos/teen-technology-creative
- https://unsplash.com/s/photos/music-production-young

---

## Step 4: About Page Images (1 hour)

**File:** `src/pages/About.tsx`

**Line 122:** Mission Section Image
```tsx
// OLD: Kids learning image
<img
  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?..."
  alt="Kids learning together"
/>

// NEW: Teens creating with tech
<img
  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
  alt="Students creating with AI"
/>
```

Search: "teens collaboration technology" or "young adults creative workspace"

---

## Step 5: YouTube Video Curator Intros (1-2 hours)

Add contextual introductions above each embedded video.

**Files to Edit (6 lessons):**
1. `src/pages/IntroToAI.tsx`
2. `src/pages/MachineLearningBasics.tsx`
3. `src/pages/DataAndPatterns.tsx`
4. `src/pages/ImageRecognition.tsx`
5. `src/pages/AIEthics.tsx`
6. `src/pages/FutureOfAI.tsx`

**Template to Add Above Each Video:**

```tsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-2xl">
  <p className="font-semibold text-blue-900 mb-2">📺 Recommended Watch</p>
  <p className="text-gray-700">
    This video provides an excellent introduction to [TOPIC]. Watch to see
    real-world examples, then complete the hands-on activities below to
    apply what you've learned.
  </p>
</div>

{/* Existing YouTube embed */}
```

**Customize each curator intro** to match the lesson topic.

---

## Step 6: Verification

```bash
npm run dev

# Visual checks:
# ✓ Header shows gradient "Lumora" logo
# ✓ Homepage images show teens/AI creativity (not young kids)
# ✓ About page images updated
# ✓ YouTube videos have curator intros
# ✓ All images load correctly
# ✓ Mobile responsive
```

---

## Step 7: Commit, Push, Merge

```bash
git add src/components/Header.tsx src/pages/Index.tsx src/pages/About.tsx src/pages/IntroToAI.tsx src/pages/MachineLearningBasics.tsx src/pages/DataAndPatterns.tsx src/pages/ImageRecognition.tsx src/pages/AIEthics.tsx src/pages/FutureOfAI.tsx

git commit -m "SESSION 3: Visual assets & images update

Add text-based logo, update imagery for ages 13-25 creative focus,
enhance YouTube videos with curator introductions.

Changes:
- Gradient text logo with Sparkles icon
- Homepage images → AI creativity & teen creators
- About page images → collaborative creative workspace
- Curator intros added to all 6 lesson videos

Files modified: 9
Visual identity now reflects creative AI platform for Gen Z

Verification: ✅ All images appropriate for 13-25 audience
Next: SESSION 4 - Content maturity updates"

git push -u origin lumora/session-3-visuals

# Merge to main, update plan
```

---

# 🚀 SESSION 4-10: Feature Development

**Status:** ⬜ WAIT (Complete Sessions 1-3 first)

**Note:** Detailed implementations for Sessions 4-10 are available in:
- `CREATIVE_AI_PLATFORM_MASTER_PLAN.md` (90-day full plan with code)
- `REBRAND_CHECKLIST.md` (brand messaging guide)

**Sessions 4-10 Quick Reference:**

| Session | Scope | Source Reference | Time |
|---------|-------|-----------------|------|
| **4** | Content Maturity (7 lessons) | Master Plan Phase 1, Week 1 | 4-5h |
| **5** | AI Tutor Chatbot | Master Plan Phase 2, Week 5 | 6-8h |
| **6** | New Lessons (3 lessons) | Master Plan Phase 1, Week 2 | 8-10h |
| **7** | Quiz System (50 questions) | Master Plan Phase 3, Week 9 | 5-6h |
| **8** | Certification Program | Master Plan Phase 3, Week 10 | 4-5h |
| **9** | Community Gallery | Master Plan Phase 3, Week 11 | 5-6h |
| **10** | Deploy & Launch | Master Plan Phase 4, Week 12 | 4-5h |

**Why are detailed plans deferred?**
1. Keep initial sessions focused and manageable
2. Rebrand must complete first (foundation)
3. Detailed plans pull directly from master plan when needed
4. Reduces cognitive load for each session

**How SESSION 4+ works (Automatic - No thinking required!):**

When you start SESSION 4 in a fresh conversation, say:
```
Read LUMORA_SESSION_GUIDE.md and execute SESSION 4.
```

**What I'll do automatically:**
1. ✅ Read session guide → see "SESSION 4: Master Plan Phase 1, Week 1"
2. ✅ Open CREATIVE_AI_PLATFORM_MASTER_PLAN.md → navigate to Phase 1, Week 1, Days 5-7
3. ✅ Extract detailed instructions (lesson rewrites, examples, code)
4. ✅ Guide you step-by-step through content maturity updates
5. ✅ You just follow along - all details pulled automatically

**You never need to:**
- ❌ Manually reference the master plan
- ❌ Find the right section yourself
- ❌ Copy-paste code examples
- ❌ Remember where you left off

**I handle all the cross-referencing behind the scenes!**

---

## 📚 Reference: Brand Voice Guidelines

### Tone Shift Examples:

**OLD (AI Kids Spark - ages 6-12):**
- "Super exciting! 🎉"
- "Amazing and fun!"
- "Let's learn together, kids!"
- Emoji-heavy, playful, enthusiastic, childlike

**NEW (Lumora - ages 13-25):**
- "Master AI through creativity"
- "Build professional portfolios"
- "Industry-standard tools"
- Emoji-light (strategic use), confident, inspiring, professional-yet-accessible

### Example Rewrites:

**Homepage Hero:**
- ❌ "Welcome to AI Kids Spark! 🚀 Discover the Amazing World of AI!"
- ✅ "Master AI. Create Everything. The creative AI platform for the next generation."

**About Mission:**
- ❌ "We make AI super fun and easy to understand for kids!"
- ✅ "We empower teens and young adults to master AI through hands-on creative projects using industry-standard tools."

**CTA Buttons:**
- ❌ "Start Learning Today! 🎉"
- ✅ "Start Creating" or "Explore the Platform"

**Lesson Intros:**
- ❌ "Get ready for an amazing adventure into the world of AI!"
- ✅ "In this lesson, you'll learn how professional artists use AI to generate stunning visuals."

---

## 🎯 Success Criteria (Overall)

### Rebrand Complete When:

**Visual:**
- ✅ 0 instances of "AI Spark" or "AI Kids Spark" visible to users
- ✅ All email addresses use @lumora.ai domain
- ✅ Visual identity reflects creative focus (not elementary school)
- ✅ Messaging emphasizes creation over learning

**Content:**
- ✅ Age demographic consistent (13-25) throughout
- ✅ Images show AI creativity & teen creators
- ✅ Tone is professional, inspiring, accessible
- ✅ No "super fun!" or overly childish language

**Technical:**
- ✅ All legal pages updated (Terms, Privacy)
- ✅ Meta tags optimized for SEO
- ✅ Mobile responsive and tested
- ✅ YouTube videos enhanced with curator context

**User Perception Shift:**
- Before: "Cute AI learning app for little kids"
- After: "Professional creative AI platform for young creators"

---

## 💡 Tips for Success

1. **One session at a time** - Don't skip ahead
2. **Fresh Claude conversation** for each session (resets tokens)
3. **Test thoroughly** before committing
4. **Update this plan** after each session completion
5. **Ask questions** if anything is unclear
6. **Take breaks** - 3-4 hours is a lot of focused work
7. **Commit early, commit often** - Small commits are better
8. **Mobile test** - Always check mobile view
9. **Read aloud** - New copy should sound natural for ages 13-25
10. **Have fun** - You're building something cool!

---

## 📞 Questions or Issues?

**Stuck on a session?** In your next Claude conversation:
- Say: "I'm stuck on SESSION X, [describe issue]"
- Provide error messages or screenshots if applicable
- We'll troubleshoot and get you back on track

**Want to skip something?**
- Mark session as ❌ SKIPPED in progress table
- Note reason in commit message
- Continue to next session

**Need to pause?**
- Commit current work
- Note progress in this plan file
- Resume in fresh Claude session later

---

**🎉 Ready to start? Begin with SESSION 1!**

In your current or next Claude conversation, say:
> "I'm ready to execute SESSION 1: Core Rebrand to LUMORA. Let's begin!"
