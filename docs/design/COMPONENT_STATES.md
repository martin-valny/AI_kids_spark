# COMPONENT STATES - Session 0
## Lumora Platform Redesign

**Purpose:** Comprehensive documentation of all interactive states for UI components.

**Date Created:** 2026-01-23
**Session:** 0 (Design Foundation)
**Standard:** Every state must feel smooth, responsive, accessible

---

## 🎯 STATE DESIGN PHILOSOPHY

**Principles:**
1. **Immediate Feedback** - User sees response <100ms
2. **Smooth Transitions** - 200-300ms duration (feels snappy, not sluggish)
3. **Clear Affordances** - User knows what's clickable/interactive
4. **Accessible States** - Focus states for keyboard navigation
5. **Performance First** - Use transform/opacity (GPU-accelerated)

**Universal Timing:**
- Hover response: 200-300ms
- Loading transitions: 300-500ms
- Modal animations: 200ms open, 150ms close
- Never use: linear easing (use ease, ease-in-out, or custom curves)

---

## 🎨 GLASS CARD COMPONENT

**Purpose:** Primary container for content (lessons, features, stats, etc.)

### States

**Default:**
```css
.glass-card {
  background: rgba(37, 37, 64, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 300ms ease-in-out;
}
```

**Hover:**
```css
.glass-card:hover {
  border: 1px solid rgba(0, 212, 255, 0.3); /* Cyan glow */
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.3), /* Glow */
    0 12px 40px rgba(0, 0, 0, 0.4);  /* Elevated shadow */
  transform: translateY(-2px);
}
```

**Active (Click/Press):**
```css
.glass-card:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); /* Reduced shadow */
}
```

**Focus (Keyboard Navigation):**
```css
.glass-card:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 4px;
  border: 1px solid rgba(0, 212, 255, 0.5);
}
```

**Disabled:**
```css
.glass-card:disabled,
.glass-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Loading:**
```css
.glass-card.loading {
  position: relative;
  pointer-events: none;
}

.glass-card.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

### Variants

**Cyan Variant:**
```css
.glass-card--cyan:hover {
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
}
```

**Magenta Variant:**
```css
.glass-card--magenta:hover {
  border-color: rgba(255, 0, 110, 0.5);
  box-shadow: 0 0 30px rgba(255, 0, 110, 0.4);
}
```

**Purple Variant:**
```css
.glass-card--purple:hover {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
}
```

**Gold Variant:**
```css
.glass-card--gold:hover {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.4);
}
```

---

## 🔘 GRADIENT BUTTON COMPONENT

**Purpose:** Primary and secondary CTAs

### States

**Default (Primary):**
```css
.btn-gradient {
  background: linear-gradient(135deg, #00d4ff 0%, #ff006e 100%);
  color: #f8fafc;
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font: 600 16px 'Inter';
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
  transition: all 200ms ease-in-out;
  cursor: pointer;
}
```

**Hover:**
```css
.btn-gradient:hover {
  filter: brightness(110%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
}
```

**Active:**
```css
.btn-gradient:active {
  filter: brightness(90%);
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
}
```

**Focus:**
```css
.btn-gradient:focus-visible {
  outline: 3px solid rgba(0, 212, 255, 0.5);
  outline-offset: 3px;
}
```

**Loading:**
```css
.btn-gradient.loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-gradient.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  border-radius: inherit;
}

.btn-gradient.loading::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #f8fafc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

**Disabled:**
```css
.btn-gradient:disabled {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

### Button Variants

**Secondary (Outline):**
```css
.btn-outline {
  background: transparent;
  border: 2px solid #00d4ff;
  color: #00d4ff;
  box-shadow: none;
}

.btn-outline:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}
```

**Ghost (Text Only):**
```css
.btn-ghost {
  background: transparent;
  border: none;
  color: #00d4ff;
  box-shadow: none;
  padding: 8px 16px;
}

.btn-ghost:hover {
  background: rgba(0, 212, 255, 0.1);
  text-decoration: underline;
}
```

---

### Button Sizes

**Small:**
```css
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
}
```

**Medium (Default):**
```css
.btn-md {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 16px;
}
```

**Large:**
```css
.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 16px;
}
```

---

## 🔗 NAVIGATION LINK COMPONENT

**Purpose:** Header navigation, footer links, in-content links

### States

**Default:**
```css
.nav-link {
  color: #cbd5e1; /* text-secondary */
  text-decoration: none;
  position: relative;
  padding: 8px 12px;
  transition: color 200ms ease-in-out;
}
```

**Hover:**
```css
.nav-link:hover {
  color: #00d4ff; /* cyan */
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, #ff006e);
  transition: width 200ms ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}
```

**Active (Current Page):**
```css
.nav-link.active {
  color: #f8fafc; /* text-primary */
  font-weight: 600;
}

.nav-link.active::after {
  width: 100%;
  background: #00d4ff;
}
```

**Focus:**
```css
.nav-link:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 4px;
  border-radius: 4px;
}
```

---

## 📝 INPUT FIELD COMPONENT

**Purpose:** Text inputs, textareas, search fields

### States

**Default:**
```css
.input-field {
  background: rgba(37, 37, 64, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #f8fafc;
  font: 400 16px 'Inter';
  transition: all 200ms ease-in-out;
}

.input-field::placeholder {
  color: #64748b; /* text-muted */
}
```

**Focus:**
```css
.input-field:focus {
  outline: none;
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  background: rgba(37, 37, 64, 0.7);
}
```

**Error:**
```css
.input-field.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-field.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}
```

**Success:**
```css
.input-field.success {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
}
```

**Disabled:**
```css
.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(37, 37, 64, 0.3);
}
```

---

## ☑️ CHECKBOX COMPONENT

**Purpose:** Multi-select options, settings toggles

### States

**Default (Unchecked):**
```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}
```

**Checked:**
```css
.checkbox:checked {
  background: linear-gradient(135deg, #00d4ff, #ff006e);
  border-color: #00d4ff;
}

.checkbox:checked::after {
  content: '✓';
  display: block;
  color: #f8fafc;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
}
```

**Hover (Unchecked):**
```css
.checkbox:hover {
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
}
```

**Focus:**
```css
.checkbox:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}
```

**Disabled:**
```css
.checkbox:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

---

## 🔘 RADIO BUTTON COMPONENT

**Purpose:** Single-select options

### States

**Default (Unselected):**
```css
.radio {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: transparent;
  position: relative;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}
```

**Selected:**
```css
.radio:checked {
  border-color: #00d4ff;
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
}

.radio:checked::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #00d4ff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Hover:**
```css
.radio:hover {
  border-color: rgba(0, 212, 255, 0.5);
}
```

**Focus:**
```css
.radio:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}
```

---

## 📋 DROPDOWN/SELECT COMPONENT

**Purpose:** Selection menus

### States

**Default (Closed):**
```css
.select {
  background: rgba(37, 37, 64, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 40px 12px 16px;
  color: #f8fafc;
  cursor: pointer;
  position: relative;
  transition: all 200ms ease-in-out;
}

.select::after {
  content: '▼';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #cbd5e1;
  transition: transform 200ms ease-in-out;
}
```

**Open:**
```css
.select.open {
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.select.open::after {
  transform: translateY(-50%) rotate(180deg);
}
```

**Dropdown Menu:**
```css
.select-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(37, 37, 64, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
}

.select-option {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 150ms ease-in-out;
}

.select-option:hover {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
}

.select-option.selected {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  font-weight: 600;
}
```

---

## 🗨️ MODAL/DIALOG COMPONENT

**Purpose:** Overlays, confirmations, forms

### States

**Opening Animation:**
```css
@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 26, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modal-fade-in 200ms ease-out;
}

.modal-content {
  background: rgba(37, 37, 64, 0.95);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modal-scale-in 200ms ease-out 100ms both;
}
```

**Closing Animation:**
```css
.modal-overlay.closing {
  animation: modal-fade-in 150ms ease-in reverse;
}

.modal-overlay.closing .modal-content {
  animation: modal-scale-in 150ms ease-in reverse;
}
```

**Focus Trap:**
- First focusable element gets focus on open
- Tab cycles through modal elements only
- ESC key closes modal
- Click overlay closes modal

---

## 🎚️ TOGGLE SWITCH COMPONENT

**Purpose:** On/off settings

### States

**Default (Off):**
```css
.toggle {
  width: 48px;
  height: 24px;
  background: rgba(100, 116, 139, 0.3);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 200ms ease-in-out;
}

.toggle::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background: #64748b;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: all 200ms ease-in-out;
}
```

**On:**
```css
.toggle.on {
  background: linear-gradient(135deg, #00d4ff, #ff006e);
}

.toggle.on::after {
  left: calc(100% - 21px);
  background: #f8fafc;
}
```

**Hover:**
```css
.toggle:hover::after {
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
}
```

**Focus:**
```css
.toggle:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}
```

---

## 📊 PROGRESS BAR COMPONENT

**Purpose:** Lesson progress, loading states

### States

**Default:**
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #ff006e);
  border-radius: 4px;
  transition: width 500ms ease-in-out;
}
```

**Animated (Loading):**
```css
.progress-bar.loading .progress-fill {
  background: linear-gradient(
    90deg,
    #00d4ff 0%,
    #ff006e 50%,
    #00d4ff 100%
  );
  background-size: 200% 100%;
  animation: progress-shimmer 1.5s ease-in-out infinite;
}

@keyframes progress-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Complete (100%):**
```css
.progress-bar.complete .progress-fill {
  background: linear-gradient(90deg, #14b8a6, #10b981);
}
```

---

## 🏷️ BADGE COMPONENT

**Purpose:** Labels, status indicators, achievements

### States

**Default:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font: 600 12px 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 200ms ease-in-out;
}
```

**Variants:**
```css
.badge--cyan {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.badge--magenta {
  background: rgba(255, 0, 110, 0.2);
  color: #ff006e;
  border: 1px solid rgba(255, 0, 110, 0.3);
}

.badge--gold {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.badge--success {
  background: rgba(20, 184, 166, 0.2);
  color: #14b8a6;
  border: 1px solid rgba(20, 184, 166, 0.3);
}
```

**Interactive (Clickable):**
```css
.badge.interactive {
  cursor: pointer;
}

.badge.interactive:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px currentColor;
}
```

---

## 💬 TOOLTIP COMPONENT

**Purpose:** Contextual help, additional info

### States

**Default (Hidden):**
```css
.tooltip {
  position: absolute;
  background: rgba(10, 10, 26, 0.95);
  color: #f8fafc;
  padding: 8px 12px;
  border-radius: 8px;
  font: 400 14px 'Inter';
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-in-out;
  z-index: 9999;
}
```

**Visible:**
```css
.tooltip.visible {
  opacity: 1;
  pointer-events: auto;
}
```

**Arrow:**
```css
.tooltip::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

/* Arrow pointing down */
.tooltip.top::before {
  border-top-color: rgba(10, 10, 26, 0.95);
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## ✅ COMPONENT STATE CHECKLIST

Before implementing any component:
- [ ] All states defined (default, hover, active, focus, disabled)
- [ ] Loading state designed (if applicable)
- [ ] Error state designed (if applicable)
- [ ] Empty state designed (if applicable)
- [ ] Transitions smooth (200-300ms)
- [ ] Keyboard navigation works (focus states visible)
- [ ] Touch-friendly on mobile (44px+ targets)
- [ ] Reduced motion alternative provided
- [ ] Colors meet WCAG AA contrast
- [ ] Animations use transform/opacity (GPU-accelerated)
- [ ] States tested in all variants
- [ ] Accessibility attributes added (ARIA)

---

## 🎯 UNIVERSAL STATE STANDARDS

**Timing:**
- Hover/Focus: 200ms
- Active: 150ms
- Modal open: 200ms
- Modal close: 150ms
- Loading: 300ms minimum (prevents flash)

**Easing:**
- Default: ease-in-out
- Entrance: ease-out
- Exit: ease-in
- Never: linear (feels robotic)

**Colors:**
- Default state: Muted
- Hover state: Accent color
- Active state: Darker accent
- Focus state: Always visible (outlines, borders)
- Disabled state: Reduced opacity (0.5-0.6)

**Accessibility:**
- Focus indicators: 2-3px outline, 2-4px offset
- Min contrast: 4.5:1 (text), 3:1 (UI elements)
- Touch targets: 44px minimum
- Keyboard navigation: Tab order logical, ESC closes modals

---

**Document Status:** Complete ✅
**Components Documented:** 12 (Cards, Buttons, Links, Inputs, Checkboxes, Radios, Dropdowns, Modals, Toggles, Progress, Badges, Tooltips)
**States per Component:** 5-8 (Default, Hover, Active, Focus, Disabled, Loading, Error, Success)
**Ready For:** Session 1.4+ (Component implementation)
**Next:** Task 8 (Design System Summary)
