# Phase 4: Design System — "Biological UI"

## Lorapok Labs Bible — PWA Website

---

## 1. Design Philosophy

> **"Products That Feel Alive"**

The Biological UI design system merges organic, living aesthetics with precision engineering. Every element should feel like it's breathing, pulsing, and alive — a cybernetic organism rendered in code.

### Design Principles
1. **Living Interfaces** — Elements have idle states that pulse/breathe subtly
2. **Depth & Dimension** — Layered glassmorphism creates volumetric depth
3. **Neon Luminescence** — Light emanates from within, not projected from outside
4. **Industrial Precision** — Clean edges, geometric patterns, hexagonal grids
5. **Silent Power** — Minimal motion, maximum impact when it moves

---

## 2. Color Palette

### Primary Colors (CSS Custom Properties)

```css
:root {
  /* === BACKGROUNDS === */
  --bg-void:          #050505;    /* Deepest black - body/canvas */
  --bg-primary:       #0a0a0a;    /* App shell background */
  --bg-secondary:     #111111;    /* Sidebar, panels */
  --bg-elevated:      #1a1a1a;    /* Cards, modals */
  --bg-surface:       #222222;    /* Input fields, hover states */

  /* === NEON ACCENTS === */
  --neon-green:       #00ff88;    /* PRIMARY accent - mascot eyes, CTAs */
  --neon-green-dim:   #00cc6a;    /* Hover state, secondary emphasis */
  --neon-green-glow:  #00ff8833;  /* Glow/shadow color (20% opacity) */
  --neon-green-subtle:#00ff8811;  /* Very subtle bg tint */

  --neon-cyan:        #00e5ff;    /* SECONDARY accent - links, highlights */
  --neon-cyan-dim:    #00b8d4;    /* Hover state */
  --neon-cyan-glow:   #00e5ff33;  /* Glow/shadow */

  /* === HEXAGONAL FRAMES === */
  --hex-blue:         #1a237e;    /* Dark blue structural elements */
  --hex-blue-light:   #283593;    /* Hex frame borders */
  --hex-blue-glow:    #1a237e44;  /* Hex glow effect */

  /* === TEXT === */
  --text-primary:     #f0f0f0;    /* Main body text */
  --text-secondary:   #a0a0a0;    /* Muted/descriptive text */
  --text-tertiary:    #666666;    /* Disabled/placeholder */
  --text-accent:      #00ff88;    /* Highlighted text */
  --text-link:        #00e5ff;    /* Links */

  /* === BORDERS & DIVIDERS === */
  --border-subtle:    #ffffff08;  /* 3% white - barely visible */
  --border-default:   #ffffff12;  /* 7% white - standard borders */
  --border-strong:    #ffffff20;  /* 12% white - emphasis */
  --border-neon:      #00ff8844;  /* Neon green border */
  --border-cyan:      #00e5ff44;  /* Cyan border */

  /* === GLASSMORPHISM === */
  --glass-bg:         rgba(255, 255, 255, 0.03);
  --glass-bg-hover:   rgba(255, 255, 255, 0.06);
  --glass-border:     rgba(255, 255, 255, 0.08);
  --glass-blur:       12px;

  /* === STATUS COLORS === */
  --status-active:    #00ff88;    /* Green - active/online */
  --status-beta:      #ffab00;    /* Amber - beta/experimental */
  --status-archived:  #666666;    /* Gray - archived */
  --status-error:     #ff3d71;    /* Red - error state */
}
```

### Color Usage Rules
| Context | Color | Token |
|---------|-------|-------|
| Page background | Near-black | `--bg-void` |
| App shell | Charcoal | `--bg-primary` |
| Cards | Elevated glass | `--glass-bg` + `--glass-border` |
| Primary CTA | Neon green | `--neon-green` |
| Links | Cyan | `--neon-cyan` |
| Body text | Light gray | `--text-primary` |
| Glow effects | Green 20% | `--neon-green-glow` |

---

## 3. Typography

### Font Stack

```css
:root {
  /* Display / Headings - Geometric, technical */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Monospace / Code - Developer aesthetic */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Body - Clean readability */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Type Scale (Modular — 1.250 ratio)

```css
:root {
  --text-xs:    0.75rem;    /* 12px - captions, badges */
  --text-sm:    0.875rem;   /* 14px - small text, status bar */
  --text-base:  1rem;       /* 16px - body text */
  --text-md:    1.125rem;   /* 18px - large body */
  --text-lg:    1.25rem;    /* 20px - section titles */
  --text-xl:    1.5rem;     /* 24px - card headings */
  --text-2xl:   2rem;       /* 32px - page titles */
  --text-3xl:   2.5rem;     /* 40px - hero subtitle */
  --text-4xl:   3.5rem;     /* 56px - hero headline */
  --text-5xl:   4.5rem;     /* 72px - splash/brand */

  /* Line Heights */
  --leading-tight:   1.2;
  --leading-normal:  1.5;
  --leading-relaxed: 1.7;

  /* Font Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    900;

  /* Letter Spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.05em;
  --tracking-wider:  0.1em;
}
```

### Typography Specimens

| Element | Font | Size | Weight | Color | Tracking |
|---------|------|------|--------|-------|----------|
| Hero Headline | Inter | 4xl | Black | text-primary | tight |
| Page Title | Inter | 2xl | Bold | text-primary | tight |
| Section Heading | Inter | xl | Semibold | text-primary | normal |
| Card Title | Inter | lg | Semibold | text-primary | normal |
| Body Text | Inter | base | Regular | text-secondary | normal |
| Code/Technical | JetBrains Mono | sm | Regular | neon-green | wide |
| Badge/Label | Inter | xs | Semibold | text-secondary | wider |
| Status Bar | JetBrains Mono | xs | Regular | text-tertiary | wide |

---

## 4. Spacing & Layout

### Spacing Scale (4px base unit)

```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
}
```

### Layout Dimensions

```css
:root {
  /* App Shell */
  --titlebar-height:  36px;
  --sidebar-width:    240px;
  --sidebar-collapsed: 56px;
  --statusbar-height: 28px;
  --content-max-width: 1200px;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* Shadows & Glow */
  --shadow-sm:   0 1px 2px rgba(0,0,0,0.5);
  --shadow-md:   0 4px 12px rgba(0,0,0,0.6);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.7);
  --shadow-neon: 0 0 20px var(--neon-green-glow), 0 0 60px var(--neon-green-glow);
  --shadow-cyan: 0 0 20px var(--neon-cyan-glow), 0 0 60px var(--neon-cyan-glow);
}
```

---

## 5. Component Specifications

### 5.1 GlassCard

```
┌─────────────────────────────────────┐
│  ╭ radius-lg ╮                      │
│  │                                  │
│  │  [Icon]  Title                   │
│  │  Description text here...        │
│  │                                  │
│  │  [Badge] [Badge] [Badge]         │
│  │                                  │
│  ╰──────────────────────────────────╯
└─────────────────────────────────────┘

Specs:
- Background: var(--glass-bg)
- Border: 1px solid var(--glass-border)
- Border-radius: var(--radius-lg)
- Backdrop-filter: blur(var(--glass-blur))
- Padding: var(--space-6)
- Hover: border-color transitions to var(--border-neon)
         background shifts to var(--glass-bg-hover)
         box-shadow: var(--shadow-neon)
         transform: translateY(-2px)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### 5.2 NeonButton

```
Primary:
┌─────────────────────┐
│  ▸ Button Label     │
└─────────────────────┘

Specs:
- Background: transparent
- Border: 1.5px solid var(--neon-green)
- Color: var(--neon-green)
- Border-radius: var(--radius-md)
- Padding: var(--space-3) var(--space-6)
- Font: var(--font-mono), var(--text-sm), var(--weight-semibold)
- Letter-spacing: var(--tracking-wide)
- Text-transform: uppercase
- Hover: background fills with var(--neon-green)
         color becomes var(--bg-primary)
         box-shadow: var(--shadow-neon)
- Active: scale(0.97)
- Transition: all 0.2s ease

Ghost variant:
- Border: 1px solid var(--border-default)
- Color: var(--text-secondary)
- Hover: border-color → var(--neon-cyan), color → var(--neon-cyan)
```

### 5.3 TitleBar

```
┌──[●]──[◐]──[○]───── Lorapok Labs ─────────────────────────────┐

Specs:
- Height: var(--titlebar-height)
- Background: var(--bg-secondary)
- Border-bottom: 1px solid var(--border-subtle)
- Display: flex, align-items: center
- Left: traffic light dots (decorative)
- Center: app name in var(--font-mono), var(--text-xs)
- Right: minimize/maximize/close icons (decorative)
- -webkit-app-region: drag (for installed PWA)
```

### 5.4 Sidebar

```
┌──────────┐
│  [Logo]  │
│          │
│  ◈ Home  │   ← active (neon-green indicator bar left)
│  ◇ Prod  │
│  ◇ Atlas │
│  ◇ About │
│  ◇ Brand │
│  ◇ Res.  │
│  ◇ Link  │
│          │
│  ─────── │
│  [◁ ▷]   │   ← collapse toggle
└──────────┘

Specs:
- Width: var(--sidebar-width) expanded, var(--sidebar-collapsed) collapsed
- Background: var(--bg-secondary)
- Border-right: 1px solid var(--border-subtle)
- Nav items: icon + label, padding var(--space-3) var(--space-4)
- Active indicator: 3px solid var(--neon-green) left border
- Active text: var(--neon-green)
- Hover: background var(--bg-surface)
- Transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Collapsed: only icons visible, tooltip on hover
```

### 5.5 StatusBar

```
┌─ ● Connected ──── v1.0.0 ──── Last updated: 2024 ──── ⌘K Command ─┐

Specs:
- Height: var(--statusbar-height)
- Background: var(--bg-secondary)
- Border-top: 1px solid var(--border-subtle)
- Font: var(--font-mono), var(--text-xs)
- Color: var(--text-tertiary)
- Items separated by subtle dividers
- Left: connection status dot + label
- Center: version info
- Right: keyboard shortcut hint
```

### 5.6 CommandPalette

```
┌─────────────────────────────────────────┐
│  🔍 Type to search...                  │
├─────────────────────────────────────────┤
│  ◈ Home                          ⌘ 1   │
│  ◇ Products                      ⌘ 2   │
│  ◇ Atlas                         ⌘ 3   │
│  ◇ About                         ⌘ 4   │
│  ◇ Brand Identity                ⌘ 5   │
│  ◇ Research                      ⌘ 6   │
│  ◇ Connect                       ⌘ 7   │
└─────────────────────────────────────────┘

Specs:
- Overlay: position fixed, z-index 1000
- Backdrop: rgba(0,0,0,0.7) + backdrop-filter blur(4px)
- Panel: max-width 560px, centered
- Background: var(--bg-elevated)
- Border: 1px solid var(--border-strong)
- Border-radius: var(--radius-xl)
- Box-shadow: var(--shadow-lg)
- Input: full-width, transparent bg, var(--text-lg)
- Results: list with hover highlight
- Animation: scale(0.95) → scale(1) + opacity 0 → 1
```

### 5.7 HexBadge

```
  ⬡ npm
  ⬡ PyPI

Specs:
- Display: inline-flex
- Background: var(--hex-blue)
- Border: 1px solid var(--hex-blue-light)
- Border-radius: var(--radius-sm)
- Padding: var(--space-1) var(--space-2)
- Font: var(--font-mono), var(--text-xs)
- Color: var(--neon-cyan)
- Clip-path: polygon(hexagonal shape) for true hex variant
```

---

## 6. Animation Specifications

### Keyframes

```css
/* Neon Pulse - for skeleton loading and idle states */
@keyframes neonPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Glow Breathe - mascot idle animation */
@keyframes glowBreathe {
  0%, 100% { 
    filter: drop-shadow(0 0 8px var(--neon-green-glow));
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 20px var(--neon-green-glow));
    transform: scale(1.02);
  }
}

/* Float - background particles */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Slide In - page content reveal */
@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Shimmer - loading skeleton */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Border Glow - card hover */
@keyframes borderGlow {
  0%, 100% { border-color: var(--border-neon); }
  50% { border-color: var(--neon-green); }
}
```

### Motion Tokens

```css
:root {
  /* Durations */
  --duration-fast:    150ms;
  --duration-normal:  300ms;
  --duration-slow:    500ms;
  --duration-slower:  800ms;

  /* Easings */
  --ease-default:     cubic-bezier(0.4, 0, 0.2, 1);   /* Material standard */
  --ease-in:          cubic-bezier(0.4, 0, 1, 1);
  --ease-out:         cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce:      cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Framer Motion Variants (for page transitions)

```typescript
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};
```

---

## 7. Iconography

### Style Rules
- **Library**: Lucide React (consistent, lightweight)
- **Stroke width**: 1.5px (matches the minimal aesthetic)
- **Size tokens**:
  - `icon-sm`: 16px (badges, inline)
  - `icon-md`: 20px (nav items, buttons)
  - `icon-lg`: 24px (section headers)
  - `icon-xl`: 32px (hero features)
- **Color**: Inherits from parent (usually `--text-secondary`)
- **Active state**: Color shifts to `--neon-green`

### Navigation Icons Mapping
| Page | Icon (Lucide) |
|------|---------------|
| Home | `Home` |
| Products | `Boxes` |
| Atlas | `Globe` |
| About | `User` |
| Brand | `Palette` |
| Research | `FlaskConical` |
| Connect | `Link2` |

---

## 8. Responsive Behavior

### Mobile Adaptations (< 640px)
- TitleBar: simplified, no window buttons
- Sidebar: transforms to bottom tab bar or hamburger overlay
- Cards: single column, full-width
- Hero text: scales down (text-3xl instead of text-4xl)
- StatusBar: hidden
- CommandPalette: full-screen overlay

### Tablet Adaptations (640-1024px)
- Sidebar: collapsed by default (icons only)
- Cards: 2-column grid
- Content padding reduced

---

## 9. Accessibility

| Concern | Implementation |
|---------|---------------|
| Color contrast | All text passes WCAG AA (4.5:1 minimum) |
| Focus indicators | Visible neon-green outline (2px) on focus-visible |
| Motion | `prefers-reduced-motion` disables all animations |
| Screen readers | Semantic HTML, aria-labels on icon-only buttons |
| Keyboard nav | Full tab order, visible focus states |
| Font scaling | All sizes in rem, scales with user preference |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Dark Mode Note

The entire app IS dark mode by default. There is no light mode variant. The "Biological UI" aesthetic requires the dark canvas to make neon elements pop. This is a deliberate brand choice, not a theming limitation.
