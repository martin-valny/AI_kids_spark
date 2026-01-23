# MOBILE WIREFRAMES - Session 0
## Lumora Platform Redesign

**Purpose:** Mobile-first wireframes for 4 core pages, ensuring excellent mobile experience for Gen Z users.

**Date Created:** 2026-01-23
**Session:** 0 (Design Foundation)
**Mobile Target:** 375px (iPhone SE) as base, scales up to 768px (iPad)

---

## 🎯 WHY MOBILE-FIRST IS CRITICAL

**Gen Z Usage Patterns:**
- 89 minutes/day on TikTok (mobile)
- 70%+ of all web traffic is mobile
- First impression happens on phone, not desktop
- Mobile experience = primary experience

**Mobile-First Philosophy:**
- Design for 375px first, enhance for larger screens
- Touch-friendly (44px minimum targets)
- Thumb-zone optimization (bottom 2/3 of screen)
- Fast loading (3G networks, limited data)
- Readable without zoom (16px body text minimum)

---

## 📱 PAGE 1: HOMEPAGE MOBILE

**Screen Size:** 375px width
**Scroll:** Vertical (long-form)

### Layout Structure

```
┌─────────────────────────────────┐
│  [Hamburger] [Logo] [Profile]   │ ← Fixed header (60px)
├─────────────────────────────────┤
│                                 │
│         HERO SECTION            │
│      [Headline 3 lines]         │
│      [Subheadline]              │
│      [Visual 300px]             │
│      [CTA Button]               │
│                                 │
├─────────────────────────────────┤
│                                 │
│      METRICS (2x2 Grid)         │
│   [45 Lessons] [$50-150]        │
│   [98% Success] [30 Days]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│    FEATURES (Vertical Stack)    │
│   [AI Video Editing Card]       │
│   [AI Automation Card]          │
│   [AI Writing Card]             │
│   [AI Music Card]               │
│                                 │
├─────────────────────────────────┤
│                                 │
│   TESTIMONIALS (Swipe →)        │
│   [Card 1] [Card 2 (peek)]      │
│   ● ○ ○                         │
│                                 │
├─────────────────────────────────┤
│                                 │
│       FOOTER CTA                │
│   [Headline]                    │
│   [CTA Button]                  │
│                                 │
├─────────────────────────────────┤
│   [Bottom Tab Navigation]       │ ← Fixed bottom (56px)
│   Home | Lessons | Projects...  │
└─────────────────────────────────┘
```

---

### Header (Fixed, 60px height)

**Layout:**
- **Left:** Hamburger menu icon (44px tap target)
- **Center:** "Lumora" logo (gradient text, 24px)
- **Right:** Profile icon (44px tap target)

**Styling:**
- Background: bg-elevated (#1a1a2e)
- Border-bottom: 1px solid border-subtle
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1) (subtle)
- Position: fixed top, z-index: 50

**Interactions:**
- Hamburger → Slides out left menu
- Profile → Opens profile dropdown or navigates to profile

---

### Hero Section (Vertical Stack)

**Headline (Space Grotesk 900, 36px):**
```
Master AI.
Create Everything.
Monetize Fast.
```
- 3 lines, each word/phrase on separate line
- Gradient text: cyan → magenta
- Line-height: 1.1
- Margin: 24px left/right (creates breathing room)

**Subheadline (Inter 400, 16px):**
"The premier creative AI platform for Gen Z creators."
- Color: text-secondary
- Max 2 lines
- Margin: 16px top, 24px left/right

**Visual (Full-width, 300px height):**
- Simplified 3D wireframe OR
- Static image with particle overlay
- Mobile: Reduce particles (30 instead of 100)
- Lazy load (not in initial viewport)

**CTA Button (Full-width, 56px height):**
- "Start Learning Free"
- Gradient background (cyan → magenta)
- Margin: 24px left/right (creates white space)
- Font: Inter 600, 18px
- Border-radius: 16px
- Glow effect (subtle on mobile)

**Spacing:**
- Top padding: 80px (clears fixed header)
- Bottom padding: 48px

---

### Metrics Section (2x2 Grid)

**Layout:**
```
┌───────────────┬───────────────┐
│  45 Lessons   │ $50-150/proj  │
│  [Icon Book]  │ [Icon Dollar] │
├───────────────┼───────────────┤
│  98% Success  │  30 Days      │
│  [Icon Award] │  [Icon Zap]   │
└───────────────┴───────────────┘
```

**Card Sizing:**
- Each card: 165px width × 120px height (fits 2 per row)
- Gap: 12px between cards
- Margin: 24px left/right

**Card Content:**
- Icon: 32px (smaller than desktop 48px)
- Number: 36px (smaller than desktop 60px)
- Label: 12px, 2 lines max

**Styling:**
- Background: bg-card
- Border: 1px solid border-default
- Border-radius: 16px
- Padding: 16px

**Animation:**
- Count-up on scroll into view (same as desktop)
- Reduce motion: Instant numbers (no animation)

---

### Features Section (Vertical Stack)

**Heading:**
"Master 4 Creative Domains"
- Space Grotesk 700, 28px (smaller than desktop 48px)
- Centered
- Margin: 48px top, 24px bottom

**Cards (Full-width, stack vertically):**

**Card Structure:**
```
┌───────────────────────────────┐
│  [Hex Icon 48px]  AI Video   │
│                   Editing     │
│                               │
│  Create viral TikToks and     │
│  Reels with CapCut AI...      │
│                               │
│  [Learn More →]               │
└───────────────────────────────┘
```

**Card Sizing:**
- Width: Full-width minus 24px margin each side
- Height: Auto (content-based, ~180px)
- Gap: 16px between cards

**Card Content:**
- Hexagon icon: 48px (smaller than desktop 64px)
- Title: Inter 600, 20px
- Description: Inter 400, 14px, 3 lines max
- Link: Inter 500, 14px, cyan color

**Hover (on mobile = tap):**
- Border glow (cyan/magenta/purple/gold)
- No lift (doesn't work well on mobile)
- Visual feedback: Border color change

**Cards Order:**
1. AI Video Editing (cyan)
2. AI Automation (purple)
3. AI Content Writing (magenta)
4. AI Music Production (gold)

---

### Testimonials Section (Horizontal Scroll)

**Heading:**
"Trusted by 10,000+ Creators"
- Space Grotesk 700, 28px
- Margin: 48px top, 24px bottom

**Carousel Layout:**
```
┌──────────────┬──────────────┬
│  [Card 1]    │  [Card 2]    │ [Card 3]
│  Full width  │  (20% peek)  │ (hidden)
└──────────────┴──────────────┴
     Swipe →
```

**Card Sizing:**
- Width: 300px (shows 1.2 cards, indicates more content)
- Height: Auto (~280px)
- Gap: 16px
- Horizontal scroll (snap to card)

**Card Content:**
- Profile photo: 80px circular (hexagon is complex on small screen)
- Name: Inter 600, 16px
- Quote: Inter 400, 14px, 5-6 lines
- Achievement badge: 12px text, gold background

**Scroll Indicators:**
- Dots: 8px diameter, gold when active
- Position: Center below cards
- Swipe gesture (native mobile behavior)

---

### Footer CTA Section

**Background:**
- Simplified vapor gradient (2 layers instead of 5)
- Subtle, not overwhelming

**Content:**
- Headline: "Ready to Start?" (Space Grotesk 700, 32px)
- Subheading: "Join 10,000+ creators" (Inter 400, 16px)
- CTA: "Start Learning Free" (Full-width button, 56px)
- Trust: "No credit card • 100% free" (Inter 400, 12px, muted)

**Padding:**
- 48px top/bottom
- 24px left/right

---

### Bottom Tab Navigation (Fixed, 56px height)

**Layout:**
```
┌─────┬─────┬─────┬─────┬─────┐
│Home │Lessons│Projects│Profile│More│
│ ●  │  ○   │   ○    │   ○   │ ○ │
└─────┴─────┴─────┴─────┴─────┘
```

**Tab Items:**
- 5 tabs: Home, Lessons, Projects, Profile, More
- Each: Icon (24px) + Label (10px)
- Tap target: Full width of tab (minimum 60px)

**Active State:**
- Icon color: cyan
- Label color: cyan
- Dot indicator below icon
- Other tabs: muted color

**Styling:**
- Background: bg-elevated
- Border-top: 1px solid border-subtle
- Box-shadow: 0 -2px 8px rgba(0,0,0,0.1)
- Position: fixed bottom, z-index: 50

---

## 📱 PAGE 2: LESSONS PAGE MOBILE

### Layout Structure

```
┌─────────────────────────────────┐
│  [← Back] Lessons [Filter 🔍]   │ ← Header
├─────────────────────────────────┤
│  All | Video | Music | Write... │ ← Horizontal scroll tabs
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │[Thumb] CapCut AI Mastery  │  │ ← Lesson card
│  │80px    1.5h • Beginner    │  │
│  │        ▓▓▓▓░░░░ 40%       │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │[Thumb] Viral Video Formula│  │
│  │        1.5h • Intermediate│  │
│  │        ░░░░░░░░░░ 0%      │  │
│  └───────────────────────────┘  │
│                                 │
│  ... (more cards)               │
│                                 │
├─────────────────────────────────┤
│   [Bottom Tab Navigation]       │
└─────────────────────────────────┘
```

---

### Header (60px height)

**Layout:**
- **Left:** Back arrow (44px tap target)
- **Center:** "Lessons" title (Inter 600, 18px)
- **Right:** Filter/search icon (44px tap target)

**Background:** bg-elevated
**Fixed:** Yes (stays visible while scrolling)

---

### Domain Tabs (48px height, horizontal scroll)

**Tabs:**
- All, Video, Automation, Writing, Music
- Each tab: Inter 500, 14px, padding 12px 16px
- Horizontal scroll (swipe left/right)
- Active tab: cyan underline (3px), cyan text
- Inactive: text-secondary

**Interaction:**
- Tap to filter lessons
- Smooth scroll to active tab
- Active tab centered if possible

---

### Lesson Cards (Vertical List)

**Card Sizing:**
- Full-width minus 24px margin
- Height: 120px
- Gap: 12px between cards

**Card Layout:**
```
┌────────┬──────────────────────┐
│        │  Title (2 lines max) │
│  80×80 │  Duration • Level    │
│ Thumb  │  ▓▓▓▓░░░░ 40%       │
│        │  Continue →          │
└────────┴──────────────────────┘
```

**Left Section (80px × 80px):**
- Lesson thumbnail OR
- Hexagon icon with domain color
- Border-radius: 12px

**Right Section:**
- Title: Inter 600, 16px, max 2 lines
- Meta: Inter 400, 12px, text-muted ("1.5h • Beginner")
- Progress bar: 8px height, full width
  - Fill: cyan gradient
  - Background: rgba(255,255,255,0.1)
- Link: "Continue →" or "Start Lesson" (Inter 500, 14px, cyan)

**States:**
- Not started: "Start Lesson", 0% progress
- In progress: "Continue →", % progress
- Completed: "Review" + checkmark icon, 100% progress

**Tap Area:**
- Entire card is tappable
- Navigates to lesson detail page

---

## 📱 PAGE 3: LESSON DETAIL MOBILE

### Layout Structure

```
┌─────────────────────────────────┐
│  [← Back] [Share] [••• More]    │ ← Header
├─────────────────────────────────┤
│                                 │
│   [Video Player 16:9]           │ ← Content area
│   OR                            │
│   [Lesson Content]              │
│                                 │
├─────────────────────────────────┤
│  CapCut AI Mastery              │ ← Title
│  1.5 hours • Beginner           │ ← Meta
│  [▼ Description]                │ ← Collapsible
├─────────────────────────────────┤
│                                 │
│  Sections (Accordion)           │
│  ▼ 1. Introduction (5 min) ✓    │
│  ▶ 2. AI Features (15 min)      │
│  ▶ 3. Editing Workflow (20 min) │
│  🔒 4. Advanced Tips (10 min)   │ ← Locked (premium)
│                                 │
├─────────────────────────────────┤
│  [Continue - Next Section →]    │ ← Fixed bottom CTA
└─────────────────────────────────┘
```

---

### Header (60px)

- Back arrow (left)
- Share button (right, second from right)
- More menu (right, ••• icon)

---

### Content Area

**Video Player (if video lesson):**
- 16:9 aspect ratio
- Full-width
- Controls: Play/pause, progress, fullscreen
- Thumbnail with play button before playing

**OR Text/Interactive Content:**
- Scrollable content area
- Code blocks (if applicable)
- Images (full-width)
- Interactive exercises

---

### Lesson Info Section

**Title:**
- Space Grotesk 700, 24px
- Max 2 lines
- Margin: 24px left/right

**Meta Info:**
- Duration + Difficulty badges
- Inter 400, 14px
- Icons: Clock, BarChart

**Description (Collapsible):**
- Collapsed by default: Shows 2 lines + "Read more ▼"
- Expanded: Full description + "Show less ▲"
- Inter 400, 14px, text-secondary

---

### Sections Accordion

**Section Item:**
```
▼ 1. Introduction (5 min) ✓
  ├─ What You'll Learn
  ├─ Getting Started
  └─ Tools Needed
```

**States:**
- **Collapsed:** ▶ icon, section title, duration
- **Expanded:** ▼ icon, subsections visible
- **Completed:** ✓ checkmark, cyan color
- **Locked:** 🔒 icon, "Upgrade to Premium" label

**Interaction:**
- Tap section to expand/collapse
- Tap subsection to navigate to that part
- Locked sections show upgrade modal

**Styling:**
- Background: bg-card (alternating for visual separation)
- Padding: 16px
- Border-radius: 12px
- Gap: 8px between sections

---

### Progress Bar (Fixed Bottom, above CTA)

**Design:**
```
▓▓▓▓▓▓▓░░░░░░ 45% Complete
```

- Full-width bar, 4px height
- Cyan fill, subtle background
- Label: Inter 500, 12px, center

---

### Continue Button (Fixed Bottom, 64px height)

**Button:**
- "Continue - Next Section →"
- Full-width (minus 24px margin)
- 56px height
- Gradient cyan → magenta
- Inter 600, 16px

**Behavior:**
- Scrolls to next uncompleted section
- OR navigates to next lesson if complete
- Sticky (always visible)

**Background:**
- bg-elevated (to separate from content)
- Padding: 8px left/right, 8px top

---

## 📱 PAGE 4: PROFILE PAGE MOBILE

### Layout Structure

```
┌─────────────────────────────────┐
│  [← Back] Profile [Settings ⚙️] │ ← Header
├─────────────────────────────────┤
│                                 │
│     [Avatar 96px]               │ ← Profile header
│     Sarah Chen                  │
│     @sarahcreates               │
│                                 │
│   12 Lessons | 8 Projects | 🔥5 │ ← Stats row
│                                 │
├─────────────────────────────────┤
│  Portfolio | Achievements | ... │ ← Tabs (swipeable)
├─────────────────────────────────┤
│                                 │
│   ┌────────┬────────┐           │
│   │Project │Project │           │ ← Portfolio grid (2 cols)
│   │ Card 1 │ Card 2 │           │
│   │        │        │           │
│   └────────┴────────┘           │
│                                 │
│   ┌────────┬────────┐           │
│   │Project │Project │           │
│   │ Card 3 │ Card 4 │           │
│   └────────┴────────┘           │
│                                 │
│   ... (more projects)           │
│                                 │
├─────────────────────────────────┤
│   [Bottom Tab Navigation]       │
└─────────────────────────────────┘
```

---

### Profile Header (Centered)

**Avatar:**
- 96px diameter (hexagonal OR circular)
- Cyan glow border on own profile
- Tap to upload new photo (if own profile)

**Name:**
- Space Grotesk 700, 24px
- Center-aligned

**Username:**
- Inter 400, 14px, text-muted
- "@sarahcreates"

**Edit Profile Button (if own profile):**
- Small outline button
- "Edit Profile"
- Inter 500, 14px

**Spacing:**
- 32px padding top/bottom

---

### Stats Row (3 columns)

```
┌──────────┬──────────┬──────────┐
│12 Lessons│8 Projects│ 🔥 5 Day │
│Completed │ Created  │ Streak   │
└──────────┴──────────┴──────────┘
```

**Each Stat:**
- Number: Inter 600, 20px
- Label: Inter 400, 12px, text-muted
- Center-aligned

**Styling:**
- Background: bg-card
- Border-radius: 12px
- Padding: 12px
- Gap: 8px between stats

---

### Tabs (Horizontal, Swipeable)

**Tabs:**
- Portfolio (grid of projects)
- Achievements (badges earned)
- Settings (if own profile)

**Tab Design:**
- Horizontal scroll
- Active: cyan underline, cyan text
- Inactive: text-secondary
- Inter 500, 14px

---

### Portfolio Tab (2-Column Grid)

**Project Cards:**
- 2 columns, equal width
- Square aspect ratio (1:1)
- Gap: 12px

**Card Content:**
```
┌────────────┐
│            │
│   Image    │
│  Overlay   │
│            │
└────────────┘
```

**Default State:**
- Project thumbnail/preview image
- No overlay

**Tap/Hover:**
- Dark overlay: rgba(0,0,0,0.7)
- Project title: Inter 600, 14px
- Tools used: Inter 400, 12px (e.g., "Made with CapCut")
- View icon: Eye + view count

**Tap Action:**
- Opens full project detail modal
- Shows full description, images, video

---

### Achievements Tab

**Badge Grid (3 columns):**
```
┌─────┬─────┬─────┐
│Badge│Badge│Badge│
│ 1   │ 2   │ 3   │
├─────┼─────┼─────┤
│Badge│Badge│Badge│
│ 4   │ 5   │ 6   │
└─────┴─────┴─────┘
```

**Badge:**
- Hexagon shape, 80px
- Icon inside
- Gold for unlocked, gray for locked
- Tap shows details

**Badge Details Modal:**
- Badge name
- How to earn
- Progress toward next badge

---

## 📐 MOBILE DESIGN SYSTEM

### Touch Targets

**Minimum Sizes:**
- Buttons: 44px × 44px (iOS guideline)
- Recommended: 48px × 48px (Android, easier to tap)
- Icons: 44px tap area (even if icon is 24px)
- Links: 44px height minimum

**Spacing Between Targets:**
- Minimum: 8px gap
- Recommended: 12-16px (prevents mis-taps)

---

### Typography Mobile Scale

| Element | Size | Font | Weight |
|---------|------|------|--------|
| Hero Headline | 36px | Space Grotesk | 900 |
| H1 | 28px | Space Grotesk | 700 |
| H2 | 24px | Space Grotesk | 700 |
| H3 | 20px | Inter | 600 |
| Body | 16px | Inter | 400 |
| Small | 14px | Inter | 400 |
| Caption | 12px | Inter | 500 |

**Never smaller than 16px for body text** (prevents iOS auto-zoom)

---

### Spacing System (Mobile)

- XXS: 4px
- XS: 8px
- S: 12px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px

**Page margins:** 24px left/right (creates breathing room)

---

### Navigation Patterns

**Bottom Tab Bar (Recommended):**
- Thumb-friendly (easy to reach)
- Always visible
- Clear active state
- 5 tabs maximum

**Hamburger Menu (Secondary):**
- For less frequent actions
- Slides from left
- Overlay with backdrop
- Swipe to close

**Back Button:**
- Always top-left
- Consistent across all pages
- Arrow icon + "Back" label (optional)

---

### Responsive Breakpoints

**Mobile:** 375px - 768px
- 375px: Base design (iPhone SE)
- 390px: iPhone 12/13/14
- 414px: iPhone Plus models
- 768px: Transition to tablet

**Tablet:** 768px - 1024px
- 2-column layouts
- Larger touch targets (48px+)
- Side navigation (optional)

**Desktop:** 1024px+
- Switch to desktop layout
- Top navigation
- 3-4 column grids

---

### Mobile Performance

**Critical:**
- First Contentful Paint: <2s
- Largest Contentful Paint: <2.5s
- Total page weight: <1MB (3G networks)

**Optimizations:**
- Lazy load images below fold
- Reduce particle count (50 vs 100)
- Simplify 3D effects (or remove)
- Use system fonts fallback
- Compress images (WebP format)
- Defer non-critical JavaScript

---

### Mobile Interactions

**Gestures:**
- Swipe: Carousels, tabs
- Tap: All buttons, links, cards
- Pull-to-refresh: Lesson list (optional)
- Long-press: Context menus (optional)

**Feedback:**
- Visual: Border color, background change
- Haptic: Vibration on important actions (iOS)
- Loading: Skeleton screens, not spinners

**Scroll Behavior:**
- Smooth scrolling
- Snap to sections (optional)
- Sticky headers
- Fixed bottom navigation

---

### Accessibility (Mobile)

**Touch Targets:**
- ≥44px × 44px (WCAG 2.1 Level AAA)
- Clear active/focus states
- Sufficient spacing between targets

**Text:**
- Minimum 16px body text
- Sufficient contrast (WCAG AA)
- Resizable without breaking layout

**Motion:**
- Respect prefers-reduced-motion
- Disable auto-play carousels
- Provide pause controls

**Screen Readers:**
- Proper heading hierarchy
- Alt text for images
- ARIA labels for icons
- Focus management

---

## ✅ MOBILE WIREFRAME CHECKLIST

For each page:
- [ ] Designed for 375px width minimum
- [ ] All touch targets ≥44px
- [ ] Text readable (16px body minimum)
- [ ] Thumb-zone optimized (critical actions in bottom 2/3)
- [ ] Responsive scaling defined (375px → 768px)
- [ ] Navigation pattern chosen (bottom tabs or hamburger)
- [ ] Loading states designed
- [ ] Error states designed
- [ ] Empty states designed
- [ ] Accessibility verified (contrast, targets, labels)
- [ ] Performance budgets met (<1MB, <2s FCP)
- [ ] Tested on real device (iOS + Android)

---

**Document Status:** Complete ✅
**Pages Wireframed:** 4 (Homepage, Lessons, Lesson Detail, Profile)
**Mobile-First:** Yes (375px base design)
**Ready For:** Session 1.1+ (Mobile implementation)
**Next:** Task 7 (Component States)
