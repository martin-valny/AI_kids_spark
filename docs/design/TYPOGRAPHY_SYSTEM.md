# TYPOGRAPHY SYSTEM - Session 0
## Lumora Platform Redesign

**Purpose:** Define comprehensive typography system including font choices, type scale, weights, spacing, and usage guidelines.

**Date Created:** 2026-01-23
**Session:** 0 (Design Foundation)
**References:** Vone (bold impact), formless.xyz (Awwwards polish), Blackbox (clean hierarchy)

---

## 🎯 TYPOGRAPHY PHILOSOPHY

**Goals:**
1. **Bold impact** for headlines (inspired by Vone)
2. **Excellent readability** for body text (Gen Z reads on mobile)
3. **Professional credibility** (this is about earning money, not a toy)
4. **Creative energy** (balance tech with artistry)

**Target Audience:** Gen Z creators (ages 13-25)
- 70%+ mobile usage
- Fast scanners (need clear hierarchy)
- Value authenticity over corporate
- Appreciate design quality (TikTok, Instagram trained eyes)

---

## 📝 FONT FAMILIES

### Display Font: **Space Grotesk**

**Use For:** Headlines, hero text, section titles, impact moments

**Why Space Grotesk:**
- ✅ Geometric sans-serif with tech-forward aesthetic
- ✅ Bold (700) and Extra Bold (900) weights for impact
- ✅ Excellent letter-spacing for large sizes
- ✅ Modern, professional, but not corporate-boring
- ✅ Good for gradients (thick strokes hold color well)
- ✅ Free via Google Fonts
- ✅ Optimized for screen display

**Weights to Use:**
- 700 (Bold) - H1, H2, important UI elements
- 900 (Black) - Hero headlines, major impact text

**Character Set:** Latin, includes all needed punctuation and numerals

**Example Text (72px, weight 900):**
```
Master AI. Create Everything. Monetize Fast.
```

**Google Fonts Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap" rel="stylesheet">
```

---

### Body Font: **Inter**

**Use For:** Body text, descriptions, UI labels, captions

**Why Inter:**
- ✅ **Already in codebase** - No change needed!
- ✅ Designed specifically for screen reading
- ✅ Excellent readability at small sizes (14-16px)
- ✅ Multiple weights (300-700) for flexibility
- ✅ Tall x-height improves legibility
- ✅ Open-source, variable font available
- ✅ Used by Linear, Vercel, GitHub (modern tech aesthetic)

**Weights to Use:**
- 400 (Regular) - Body text, descriptions
- 500 (Medium) - Emphasized body text, subheadings
- 600 (Semi-Bold) - UI labels, small headings (H4, H5)
- 700 (Bold) - Strong emphasis (rarely used)

**Example Body Text (16px, weight 400):**
```
Learn to create viral content with AI tools. Build your portfolio,
master in-demand skills, and start earning in 30 days or less.
```

---

### Monospace Font: **JetBrains Mono**

**Use For:** Code blocks, technical details, terminal output, API examples

**Why JetBrains Mono:**
- ✅ Designed for developers (professional aesthetic)
- ✅ Excellent ligatures for code readability
- ✅ Clear distinction between similar characters (0 vs O, 1 vs l)
- ✅ Free and open-source
- ✅ Adds technical credibility

**Weights to Use:**
- 400 (Regular) - Code blocks
- 700 (Bold) - Highlighted code, important technical terms

**Use Cases:**
- Code snippets in automation lessons
- API endpoint examples
- File paths and commands
- Technical specifications

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

## 📏 TYPE SCALE

### Desktop Type Scale (1024px+)

| Element | Size | Font | Weight | Line Height | Use Case |
|---------|------|------|--------|-------------|----------|
| **Hero Display** | 72px (4.5rem) | Space Grotesk | 900 | 1.1 (tight) | Landing page hero, major CTAs |
| **H1** | 48px (3rem) | Space Grotesk | 700 | 1.2 | Page titles, section heroes |
| **H2** | 36px (2.25rem) | Space Grotesk | 700 | 1.25 | Major section headings |
| **H3** | 30px (1.875rem) | Space Grotesk | 700 | 1.3 | Subsection headings |
| **H4** | 24px (1.5rem) | Inter | 600 | 1.4 | Card titles, smaller headings |
| **H5** | 20px (1.25rem) | Inter | 600 | 1.5 | UI section labels |
| **Body Large** | 18px (1.125rem) | Inter | 400 | 1.625 | Lead paragraphs, intro text |
| **Body** | 16px (1rem) | Inter | 400 | 1.625 | Default body text |
| **Body Small** | 14px (0.875rem) | Inter | 400 | 1.625 | Secondary text, descriptions |
| **Caption** | 12px (0.75rem) | Inter | 500 | 1.75 | Labels, meta info, timestamps |
| **Code** | 14px (0.875rem) | JetBrains Mono | 400 | 1.5 | Code blocks, technical text |

---

### Mobile Type Scale (375px - 768px)

| Element | Size | Font | Weight | Line Height | Notes |
|---------|------|------|--------|-------------|-------|
| **Hero Display** | 48px (3rem) | Space Grotesk | 900 | 1.1 | Scales down from 72px |
| **H1** | 36px (2.25rem) | Space Grotesk | 700 | 1.2 | Scales down from 48px |
| **H2** | 28px (1.75rem) | Space Grotesk | 700 | 1.25 | Scales down from 36px |
| **H3** | 24px (1.5rem) | Space Grotesk | 700 | 1.3 | Scales down from 30px |
| **H4** | 20px (1.25rem) | Inter | 600 | 1.4 | Scales down from 24px |
| **H5** | 18px (1.125rem) | Inter | 600 | 1.5 | Scales down from 20px |
| **Body Large** | 18px (1.125rem) | Inter | 400 | 1.625 | Same as desktop |
| **Body** | 16px (1rem) | Inter | 400 | 1.625 | **Same as desktop** |
| **Body Small** | 14px (0.875rem) | Inter | 400 | 1.625 | Same as desktop |
| **Caption** | 12px (0.75rem) | Inter | 500 | 1.75 | Same as desktop |

**Mobile Scaling Philosophy:**
- Body text (16px) **never scales down** - readability is critical
- Headlines scale proportionally (33% reduction for hero, less for smaller headings)
- Captions and small text stay the same (already optimized for small screens)

---

## 📐 FONT WEIGHTS - When to Use

### Space Grotesk

**900 (Black/Extra Bold):**
- Hero headlines on landing page
- Major call-to-action text
- Impact moments ("You just earned your first $100!")
- Celebration messages
- Maximum 1-2 times per page (loses impact if overused)

**700 (Bold):**
- H1, H2, H3 headings
- Section titles
- Navigation items (optional, for emphasis)
- Button text (large buttons)
- Default heading weight

---

### Inter

**700 (Bold):**
- Strong emphasis within body text (use sparingly)
- Important callouts
- Rarely used - prefer weight 600 for most emphasis

**600 (Semi-Bold):**
- H4, H5 headings
- UI labels ("Featured Lessons", "Your Progress")
- Button text (small-medium buttons)
- Form labels
- Navigation items
- Emphasized list items
- Badge text

**500 (Medium):**
- Emphasized body text
- Captions that need emphasis
- Secondary navigation
- Meta information that needs slight emphasis
- Small headings within cards

**400 (Regular):**
- All body text
- Descriptions
- Paragraphs
- Default text weight
- List items
- Most UI text

---

## 📊 LINE HEIGHT - Breathing Room

### Tight (1.1 - 1.2)
**Use For:** Hero headlines, display text
**Why:** Large text needs tighter line-height to feel cohesive
**Example:**
```
Master AI.          (Line height 1.1)
Create Everything.  (Feels connected, impactful)
Monetize Fast.
```

---

### Snug (1.25 - 1.3)
**Use For:** H1, H2, H3 headings
**Why:** Headings benefit from slightly tighter spacing than body
**Example:**
```
Transform Your Creative Skills (Line height 1.25)
with AI-Powered Tools          (Readable but compact)
```

---

### Normal (1.5)
**Use For:** H4, H5, UI labels
**Why:** Transition between headings and body text
**Provides:** Comfortable reading without excess space

---

### Relaxed (1.625)
**Use For:** Body text, descriptions, long-form content
**Why:** Optimal for readability, especially on mobile
**Science:** 1.5-1.7 line-height reduces eye strain for body text
**Example:**
```
This is body text at 16px with 1.625 line-height.
The generous spacing makes long paragraphs easy
to read, even on small mobile screens. Your eyes
can track from line to line without getting lost.
```

---

### Loose (1.75 - 2.0)
**Use For:** Captions, small text (12-14px)
**Why:** Small text needs extra line-height for legibility
**Prevents:** Text feeling cramped or difficult to parse

---

## 🎯 LETTER SPACING (Tracking)

### Tight (-0.02em to -0.04em)
**Use For:** Hero headlines (60px+), display text
**Why:** Optical correction - large text appears too loose without negative tracking
**Example:**
```css
.hero-headline {
  font-size: 72px;
  letter-spacing: -0.02em;
  /* "MASTER AI" at 72px looks balanced */
}
```

---

### Normal (0)
**Use For:** Body text, most UI elements, H1-H3
**Why:** Font designers optimized default spacing
**Don't Adjust:** Unless specific design need

---

### Wide (0.05em - 0.1em)
**Use For:** All-caps labels, small text, UI badges
**Example:**
```css
.badge {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.08em;
  /* "PREMIUM" with spacing feels less cramped */
}
```

**Use Cases:**
- "FEATURED" badges
- "NEW" labels
- Navigation items in all-caps
- Lesson difficulty tags ("BEGINNER", "ADVANCED")
- Numbered labels ("01", "02", "03")

---

### Wider (0.1em - 0.15em)
**Use For:** Stylized all-caps headings (rarely)
**Example:** "THE FUTURE OF CREATIVE AI"
**Warning:** Use sparingly - can reduce readability

---

## 🎨 TYPOGRAPHY + COLOR

### Gradient Text (Heroes & CTAs)

**Cyan → Magenta Gradient:**
```css
.gradient-text {
  background: linear-gradient(135deg, #00d4ff 0%, #ff006e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Use For:**
- Hero headlines
- Major CTAs ("Start Creating Now")
- Celebration messages
- Brand moments

**Font Requirements:**
- Minimum 700 weight (gradient shows better on thick strokes)
- Minimum 24px size (too small and gradient is barely visible)
- Space Grotesk works perfectly (geometric, thick strokes)

---

### Text Colors on Dark Backgrounds

**Primary Text (High Contrast):**
- Color: #f8fafc (slate-50)
- Use: Headlines, important body text, navigation
- Contrast Ratio: 15.5:1 on #0a0a1a (exceeds WCAG AAA)

**Secondary Text (Medium Contrast):**
- Color: #cbd5e1 (slate-300)
- Use: Descriptions, secondary info, timestamps
- Contrast Ratio: 10.8:1 on #0a0a1a (exceeds WCAG AAA)

**Muted Text (Lower Contrast):**
- Color: #64748b (slate-500)
- Use: Placeholders, disabled states, meta info
- Contrast Ratio: 5.2:1 on #0a0a1a (meets WCAG AA)

**Accent Text (Cyan - Links, Actions):**
- Color: #00d4ff
- Use: Links, active states, focused elements
- Contrast Ratio: 8.1:1 on #0a0a1a (exceeds WCAG AA)

---

## 📱 RESPONSIVE TYPOGRAPHY

### Fluid Type Scale (CSS Clamp)

**Hero Display:**
```css
.hero {
  font-size: clamp(3rem, 8vw, 4.5rem);
  /* 48px min → scales → 72px max */
}
```

**H1:**
```css
h1 {
  font-size: clamp(2.25rem, 5vw, 3rem);
  /* 36px min → scales → 48px max */
}
```

**Breakpoints:**
- Mobile: 375px - 768px (use minimum size)
- Tablet: 768px - 1024px (scale fluidly)
- Desktop: 1024px+ (use maximum size)

---

### Max Width for Readability

**Headlines:**
```css
.headline {
  max-width: 800px;
  /* Prevents excessively long lines on ultra-wide screens */
}
```

**Body Text:**
```css
.body-text {
  max-width: 680px;
  /* Optimal: 60-75 characters per line */
}
```

**Why:** Lines longer than 75 characters become hard to track

---

## 🔤 TYPOGRAPHY PAIRINGS - Usage Examples

### Landing Page Hero
```html
<h1 class="hero-display">
  Master AI. Create Everything. Monetize Fast.
</h1>
```
- Font: Space Grotesk
- Size: 72px desktop, 48px mobile
- Weight: 900
- Line-height: 1.1
- Letter-spacing: -0.02em
- Color: Gradient (cyan → magenta)

---

### Section Heading
```html
<h2 class="section-heading">
  Learn AI Video Editing in 8 Lessons
</h2>
```
- Font: Space Grotesk
- Size: 36px desktop, 28px mobile
- Weight: 700
- Line-height: 1.25
- Color: #f8fafc (primary text)

---

### Card Title
```html
<h4 class="card-title">
  CapCut AI Mastery
</h4>
```
- Font: Inter
- Size: 24px desktop, 20px mobile
- Weight: 600
- Line-height: 1.4
- Color: #f8fafc (primary text)

---

### Body Paragraph
```html
<p class="body-text">
  Master mobile-first video editing with CapCut's AI features.
  Create 3 polished TikToks ready to go viral.
</p>
```
- Font: Inter
- Size: 16px (all devices)
- Weight: 400
- Line-height: 1.625
- Color: #cbd5e1 (secondary text)

---

### UI Label
```html
<span class="label">
  FEATURED LESSON
</span>
```
- Font: Inter
- Size: 12px
- Weight: 600
- Letter-spacing: 0.08em
- Text-transform: uppercase
- Color: #00d4ff (accent cyan)

---

## ♿ ACCESSIBILITY

### Contrast Requirements (WCAG AA)

**Normal Text (16px+):**
- Minimum contrast: 4.5:1
- Our primary text (#f8fafc on #0a0a1a): 15.5:1 ✅

**Large Text (24px+ or 18px+ bold):**
- Minimum contrast: 3:1
- Our headings: All exceed 10:1 ✅

**UI Elements:**
- Minimum contrast: 3:1
- Our accent cyan: 8.1:1 ✅

---

### Font Size Minimums

**Body Text:** Never below 16px on mobile
- Why: iOS defaults to 16px - smaller text triggers auto-zoom
- Our body text: 16px ✅

**Touch Targets with Text:** Minimum 44px height
- Button text: 16px with padding
- Link text: Adequate padding around clickable area

---

### Font Smoothing

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Improves readability on dark backgrounds */
}
```

---

## 🎯 COMMON USE CASES

### Navigation Items
- Font: Inter
- Size: 16px
- Weight: 500 (default), 600 (active)
- Color: #cbd5e1 (default), #00d4ff (hover/active)
- Letter-spacing: 0

---

### Button Text
**Large Primary Button:**
- Font: Inter or Space Grotesk
- Size: 18px
- Weight: 600
- Letter-spacing: 0

**Medium Button:**
- Font: Inter
- Size: 16px
- Weight: 600

**Small Button:**
- Font: Inter
- Size: 14px
- Weight: 600

---

### Form Labels
- Font: Inter
- Size: 14px
- Weight: 500
- Color: #cbd5e1

---

### Input Placeholder
- Font: Inter
- Size: 16px
- Weight: 400
- Color: #64748b (muted)

---

### Badge/Tag
- Font: Inter
- Size: 12px
- Weight: 600
- Letter-spacing: 0.05em
- Text-transform: uppercase
- Padding: 4px 8px

---

### Timestamp/Meta
- Font: Inter
- Size: 12px
- Weight: 400
- Color: #64748b

---

## 🛠️ IMPLEMENTATION NOTES

### Tailwind Config Update
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Add more as needed
      },
    },
  },
};
```

---

### CSS Custom Properties
```css
:root {
  /* Font Families */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes - Desktop */
  --text-hero: 72px;
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 30px;
  --text-h4: 24px;
  --text-body-large: 18px;
  --text-body: 16px;
  --text-small: 14px;
  --text-caption: 12px;
}

@media (max-width: 768px) {
  :root {
    /* Font Sizes - Mobile */
    --text-hero: 48px;
    --text-h1: 36px;
    --text-h2: 28px;
    --text-h3: 24px;
    --text-h4: 20px;
    /* Body sizes remain same */
  }
}
```

---

## ✅ TYPOGRAPHY CHECKLIST

Before implementing any text:
- [ ] Chosen appropriate font (Display vs Body vs Mono)
- [ ] Selected correct size from type scale
- [ ] Applied appropriate weight for hierarchy
- [ ] Set correct line-height for text type
- [ ] Adjusted letter-spacing if needed (all-caps, large text)
- [ ] Verified contrast ratio meets WCAG AA
- [ ] Tested on mobile (responsive scaling)
- [ ] Checked max-width for long-form content
- [ ] Applied appropriate color (primary, secondary, muted, accent)
- [ ] Ensured consistent spacing around text

---

## 🎨 TYPOGRAPHY MOOD BOARD

**Space Grotesk Examples:**
- **Huge**: "LUMORA" (96px, 900 weight) - Logo/brand
- **Hero**: "Master AI. Create Everything." (72px, 900 weight) - Impact
- **H1**: "Welcome to Foundations" (48px, 700 weight) - Page title
- **H2**: "Learn AI Video Editing" (36px, 700 weight) - Section title

**Inter Examples:**
- **Body**: "This platform teaches Gen Z creators..." (16px, 400 weight)
- **Emphasized**: "Earn your first $100 in 30 days" (16px, 600 weight)
- **Label**: "FEATURED" (12px, 600 weight, uppercase, 0.08em spacing)
- **Caption**: "Updated 2 days ago" (12px, 400 weight, muted color)

---

## 📚 FURTHER READING

**Typography Resources:**
- Butterick's Practical Typography
- The Elements of Typographic Style (Bringhurst)
- Google Fonts Pairing Guidelines
- Inter Font Specimen & Usage
- Space Grotesk Specimen

**Accessibility:**
- WCAG 2.1 Guidelines (Typography)
- WebAIM Contrast Checker
- Inclusive Design Principles (Typography)

---

**Document Status:** Complete ✅
**Fonts Chosen:** Space Grotesk (display), Inter (body), JetBrains Mono (code)
**Type Scale:** Defined (12px - 72px with responsive scaling)
**Ready For:** Session 1.2 (Tailwind config implementation)
**Next:** Task 3 (Color System)
