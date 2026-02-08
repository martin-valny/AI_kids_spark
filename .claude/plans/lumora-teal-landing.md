# Plan: Lumora Teal Landing Page

## Overview
Convert the provided HTML landing page to a React TSX component. This design features a dark theme with teal/emerald accents (#047857, #0d9488, #14b8a6), Inter font, animated mesh gradient background, and glassmorphism effects.

**CRITICAL**: Keep ALL design elements EXACTLY as provided - colors, effects, animations, spacing, typography. Only adapt content to match Lumora's spirit for Gen Z creators.

---

## Design Analysis

### Color Palette (PRESERVE EXACTLY)
```css
--color-bg-primary: #000000
--color-bg-secondary: #070808
--color-bg-elevated: #0c0f0e
--color-text-primary: #ffffff
--color-text-secondary: rgba(255, 255, 255, 0.72)
--color-text-muted: rgba(255, 255, 255, 0.48)
--color-accent: #047857
--color-accent-secondary: #0d9488
--color-accent-tertiary: #14b8a6
--color-border: rgba(255, 255, 255, 0.07)
```

### Typography (PRESERVE EXACTLY)
- Font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Hero h1: 5rem, 700 weight, -0.05em letter-spacing
- Section h2: 3.5rem, 700 weight, -0.02em letter-spacing
- Body: 1.6 line-height

### Key Visual Effects (PRESERVE EXACTLY)
1. **Animated mesh gradient** - radial gradients with 20s animation
2. **Glassmorphism** - backdrop-filter: blur(20px) saturate(180%)
3. **Scroll progress indicator** - gradient bar at top
4. **Nav blur on scroll** - padding reduction + darker bg
5. **Feature card hover** - translateY(-6px), radial glow, border color change
6. **Gallery hover** - image scale(1.05), overlay fade-in
7. **Parallax effects** - hero content, mesh background, feature cards

---

## Sections to Implement

### 1. Navigation
- Fixed position with blur backdrop
- Logo "Lumora" (simple text)
- Links: Features, Gallery, Pricing (hidden on mobile)
- Primary CTA button
- Scroll state: adds `.scrolled` class at 100px

### 2. Hero Section
- Hero metric badge (pill with icon + text)
- Main headline with `.highlight` span (underline glow effect)
- Subtitle paragraph
- Two CTA buttons (primary + secondary)
- Trust strip with brand logos placeholders
- Video showcase (frameless container with placeholder)

### 3. Features Section (6 cards)
Keep exact feature titles and descriptions from HTML:
1. AI Video in Minutes
2. Brand Visuals On-Demand
3. AI Writing Assistant
4. Marketing Automation
5. Music & Audio Tools
6. Done-For-You Templates

### 4. How It Works Section (3 steps)
1. Describe What You Want
2. AI Generates Your Content
3. Edit, Export & Launch

### 5. Gallery Section (6 items)
- Cyberpunk Dreams
- Ocean Serenity
- Product Showcase
- Character Design
- Abstract Art
- Nature's Beauty

### 6. Testimonials Section (3 cards)
Keep exact testimonials from HTML:
1. Sarah Kim - Online Course Creator
2. Marcus Chen - Digital Product Creator
3. Emily Parker - Solopreneur

### 7. Pricing Section (3 tiers)
- Starter: $0/month (50 generations, 720p)
- Pro: $49/month (unlimited, 4K) - FEATURED
- Enterprise: Custom

### 8. FAQ Section (7 items)
Keep all FAQ questions/answers exactly as provided.

### 9. CTA Section
- Title, subtitle, two buttons
- Rotating gradient background animation

### 10. Footer
- 4 columns: Product, Resources, Company, Legal
- Bottom bar with copyright and social links

---

## Images/Media to Populate

### Hero Video Placeholder
- Use a looping video URL showing AI content generation
- Fallback: Keep the SVG placeholder with description

### Gallery Images (6)
Use Unsplash/Picsum placeholders with appropriate themes:
1. Cyberpunk cityscape
2. Underwater/ocean scene
3. Product photography
4. Fantasy character/portrait
5. Abstract generative art
6. Nature landscape

### Step Visuals (3)
Keep as styled placeholder divs with descriptive text (as in original HTML)

### Trust Strip Logos
Keep as styled placeholder divs (as in original HTML)

---

## Implementation Steps

1. Create `/src/pages/landing/LumoraTeal.tsx`
2. Include all CSS as `<style>` tag in JSX (same pattern as other landing pages)
3. Implement React state for:
   - `isScrolled` - nav scroll state
   - `scrollProgress` - progress bar width
4. Implement useEffect for:
   - Scroll listener (progress + nav state)
   - Intersection Observer for fade-in animations
5. Add all sections in order
6. Add route to App.tsx: `/landing/lumora-teal`
7. Add entry to LandingShowcase.tsx
8. Commit and push

---

## Content Verification

The HTML content already perfectly matches Lumora's spirit:
- "Master AI Tools to Create, Design & Market Your Products"
- "The all-in-one platform for solo creators"
- Gen Z-friendly language and pricing
- Focus on speed, simplicity, no tech skills needed
- Emphasis on video, writing, design, automation, music

**NO content changes needed** - the HTML is already written for Lumora's target audience.

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/pages/landing/LumoraTeal.tsx` | CREATE - New landing page component |
| `src/App.tsx` | EDIT - Add import and route |
| `src/pages/landing/LandingShowcase.tsx` | EDIT - Add to variations array, update count to 21 |

---

## Showcase Entry

```javascript
{
  id: 'lumora-teal',
  name: 'Lumora Teal',
  path: '/landing/lumora-teal',
  tagline: 'Premium creator platform',
  description: 'Dark theme with teal/emerald accents, animated mesh gradient, glassmorphism cards, parallax effects. Professional creator-focused design.',
  color: '#14b8a6',
  icon: <Sparkles className="w-8 h-8" />,
  targetAudience: 'Gen Z creators who want premium, professional AI tool aesthetics',
  keyFeatures: [
    'Animated mesh gradient background',
    'Teal/emerald accent palette',
    'Glassmorphism feature cards',
    'Parallax scroll effects',
  ],
},
```
