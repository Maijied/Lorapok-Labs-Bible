# Phase 5: Implementation Task Breakdown

## Lorapok Labs Bible — PWA Website

---

## Implementation Order & Dependencies

```
[6.1] Project Scaffolding
  └─► [6.2] Config Files (vite, ts, eslint, prettier)
       └─► [6.3] Design Tokens CSS
            └─► [7.1] Layout Components (AppShell, TitleBar, Sidebar, StatusBar)
                 └─► [7.2] UI Components (GlassCard, NeonButton, HexBadge)
                      └─► [7.3] Utility Components (CommandPalette, ParticleField)
                           └─► [7.4] Data Files (products, links, nav, skills)
                                └─► [8.1] HomePage
                                     ├─► [8.2] ProductsPage
                                     ├─► [8.3] AtlasPage
                                     ├─► [8.4] AboutPage
                                     ├─► [8.5] BrandPage
                                     ├─► [8.6] ResearchPage
                                     └─► [8.7] ConnectPage
                                          └─► [9.1] PWA Setup
                                               └─► [9.2] GitHub Actions
                                                    └─► [10] Push & PR
```

---

## PHASE 6: Project Scaffolding & Core Setup

### Task 6.1 — Initialize Vite + React + TypeScript Project
- [ ] Run `npm create vite@latest` with react-ts template
- [ ] Install core dependencies: react, react-dom, react-router-dom, framer-motion, lucide-react
- [ ] Install dev dependencies: vite-plugin-pwa, @types/react, @types/react-dom
- [ ] Verify project builds with `npm run build`

### Task 6.2 — Configuration Files
- [ ] `vite.config.ts` — base path, PWA plugin, build optimization
- [ ] `tsconfig.json` — strict mode, path aliases (@/ → src/)
- [ ] `.eslintrc.cjs` — React + TypeScript rules
- [ ] `.prettierrc` — consistent formatting (single quotes, no semi, trailing commas)
- [ ] `.gitignore` — node_modules, dist, .env
- [ ] `index.html` — meta tags, OG tags, preload fonts, theme-color

### Task 6.3 — Global Styles & Design Tokens
- [ ] `src/styles/tokens.css` — all CSS custom properties from Phase 4
- [ ] `src/styles/globals.css` — CSS reset, base element styles, font-face declarations
- [ ] `src/styles/animations.css` — all keyframe animations
- [ ] `src/styles/utilities.css` — utility classes (flex, grid helpers)

---

## PHASE 7: Design System & Shared Components

### Task 7.1 — Layout Components
- [ ] `src/components/layout/AppShell.tsx` + `.module.css`
  - Desktop app frame wrapper
  - Manages sidebar collapsed state
  - Provides layout grid (title + sidebar + content + status)
- [ ] `src/components/layout/TitleBar.tsx` + `.module.css`
  - Decorative window chrome
  - Traffic light dots (left)
  - App title center (monospace)
  - Window buttons right (decorative)
- [ ] `src/components/layout/Sidebar.tsx` + `.module.css`
  - Navigation items with icons
  - Active route indicator (green left border)
  - Collapse toggle button
  - Responsive: becomes overlay on mobile
- [ ] `src/components/layout/StatusBar.tsx` + `.module.css`
  - Connection indicator
  - Version display
  - Keyboard shortcut hint
- [ ] `src/components/layout/ContentArea.tsx` + `.module.css`
  - Scrollable content wrapper
  - AnimatePresence for page transitions
  - Max-width constraint

### Task 7.2 — UI Components
- [ ] `src/components/ui/GlassCard.tsx` + `.module.css`
  - Glassmorphic container
  - Hover glow effect
  - Props: children, className, onClick, href
- [ ] `src/components/ui/NeonButton.tsx` + `.module.css`
  - Variants: primary (green), secondary (cyan), ghost
  - Props: variant, size, icon, children, onClick, href
  - Hover fill animation
- [ ] `src/components/ui/HexBadge.tsx` + `.module.css`
  - Platform/tech badges
  - Props: label, color variant
- [ ] `src/components/ui/Tooltip.tsx` + `.module.css`
  - Position-aware tooltip
  - Props: content, position, children
- [ ] `src/components/ui/SkeletonLoader.tsx` + `.module.css`
  - Neon shimmer loading placeholder
  - Props: width, height, variant (text, card, circle)

### Task 7.3 — Utility Components
- [ ] `src/components/ui/CommandPalette.tsx` + `.module.css`
  - Ctrl+K triggered modal overlay
  - Search/filter navigation items
  - Keyboard navigation (arrow keys, enter)
  - Escape to close
- [ ] `src/components/ui/ParticleField.tsx` + `.module.css`
  - Canvas-based subtle particle animation
  - Responsive particle count
  - Performance: requestAnimationFrame, respects prefers-reduced-motion
- [ ] `src/components/mascot/CyberLarva.tsx`
  - SVG animated mascot
  - Glowing eyes (neon-green)
  - Breathing/pulse idle animation
  - Segmented body with metallic sheen

### Task 7.4 — Data Files & Types
- [ ] `src/types/index.ts` — Product, SocialLink, NavItem, Achievement, Skill interfaces
- [ ] `src/data/products.ts` — All 8 products with metadata
- [ ] `src/data/social-links.ts` — All social/professional links
- [ ] `src/data/navigation.ts` — Sidebar nav items with icons and routes
- [ ] `src/data/achievements.ts` — Achievements and milestones
- [ ] `src/data/skills.ts` — Tech stack categorized

### Task 7.5 — Custom Hooks
- [ ] `src/hooks/useCommandPalette.ts` — Ctrl+K listener, open/close state
- [ ] `src/hooks/useScrollReveal.ts` — IntersectionObserver for reveal animations
- [ ] `src/hooks/useKeyboardShortcuts.ts` — Global keyboard shortcuts
- [ ] `src/hooks/useMediaQuery.ts` — Responsive breakpoint detection
- [ ] `src/utils/cn.ts` — className merger utility

---

## PHASE 8: Pages & Sections

### Task 8.1 — HomePage (Landing / Hero)
- [ ] Animated mascot (CyberLarva) center/left
- [ ] Hero headline: "Building the Future. One Line at a Time."
- [ ] Subtitle: ecosystem description
- [ ] Quick stats row: 8 products | 6+ years | millions served
- [ ] CTA buttons: Explore Products, View on GitHub
- [ ] Scroll-down indicator

### Task 8.2 — ProductsPage (Ecosystem Grid)
- [ ] Page title + intro text
- [ ] Responsive grid of GlassCards (3-col desktop, 2-col tablet, 1-col mobile)
- [ ] Each card: icon, name, description, platform badges, status, GitHub link
- [ ] Staggered reveal animation on load
- [ ] Filter/sort (optional stretch goal)

### Task 8.3 — AtlasPage (Flagship Product Deep-Dive)
- [ ] Hero banner with Atlas branding
- [ ] Feature grid: Web App, VS Code Extension, MCP Server, npm package, REST API
- [ ] Stats: 2100+ APIs, 34 categories, zero config
- [ ] Code snippet section (tabbed: JS, Python, cURL, Go)
- [ ] Product Hunt badge link
- [ ] CTA to try Atlas

### Task 8.4 — AboutPage (Founder Bio)
- [ ] Professional photo placeholder / avatar
- [ ] Bio text with current role (Shohoz Ltd)
- [ ] Experience highlights
- [ ] Tech stack visualization (skill grid with proficiency indicators)
- [ ] Achievements section with badges
- [ ] Professional links (GitHub, Wellfound, Portfolio)

### Task 8.5 — BrandPage (Brand Identity)
- [ ] Mascot showcase (large CyberLarva with annotations)
- [ ] Color palette display (clickable swatches with hex values)
- [ ] Typography specimens
- [ ] Design principles list
- [ ] Visual guidelines summary
- [ ] "Products That Feel Alive" philosophy

### Task 8.6 — ResearchPage (Philosophy & Context)
- [ ] Core philosophy statement
- [ ] Key themes: zero-config, silent optimization, playful neuroscience, digital metamorphosis
- [ ] Open-source commitment
- [ ] Builder's manifesto quote
- [ ] Research context and future vision

### Task 8.7 — ConnectPage (Links & Contact)
- [ ] Link-tree style layout
- [ ] Social links with icons (GitHub, LinkedIn, Reddit, Instagram, Facebook, Product Hunt, Wellfound)
- [ ] Each link as a GlassCard with hover effect
- [ ] "Open to opportunities" section
- [ ] Contact CTA

---

## PHASE 9: PWA Features & Polish

### Task 9.1 — PWA Configuration
- [ ] Configure vite-plugin-pwa in vite.config.ts
  - Manifest generation
  - Service worker (generateSW mode)
  - Precache patterns
  - Runtime caching strategies
- [ ] Create PWA icons: 192x192, 512x512, maskable (SVG-based placeholders)
- [ ] Add apple-touch-icon, splash screen meta tags
- [ ] Implement update notification (register SW update callback)

### Task 9.2 — Performance & Polish
- [ ] Verify all pages lazy-loaded (React.lazy + Suspense)
- [ ] Add loading fallback (SkeletonLoader)
- [ ] Optimize SVG mascot (minimize paths)
- [ ] Font preloading in index.html
- [ ] Run Lighthouse audit, fix any issues
- [ ] Add 404 route handler

### Task 9.3 — GitHub Actions Deploy
- [ ] `.github/workflows/deploy.yml`
  - Trigger on push to main
  - Node.js 20 setup
  - npm ci → npm run build
  - Deploy dist/ to gh-pages branch

---

## PHASE 10: Commit & Push

### Task 10.1 — Final Review & Push
- [ ] Clean up any TODO comments
- [ ] Verify build succeeds (`npm run build`)
- [ ] Update README.md with project description, setup instructions, tech stack
- [ ] Git add, commit with descriptive message
- [ ] Push to feature branch
- [ ] Create Pull Request

---

## Estimated Effort

| Phase | Tasks | Complexity |
|-------|-------|------------|
| 6 - Scaffolding | 3 | Low |
| 7 - Components | 5 | High |
| 8 - Pages | 7 | High |
| 9 - PWA/Polish | 3 | Medium |
| 10 - Deploy | 1 | Low |
| **Total** | **19 sub-tasks** | |

---

## Implementation Notes

1. **Build incrementally** — Each task should result in working code
2. **Start with AppShell** — Get the desktop frame working first, then fill pages
3. **Data-driven** — Products/links come from typed TS data files, easy to update
4. **Mobile-last** — Build desktop app feel first, then adapt for mobile
5. **Placeholder assets** — Use SVG placeholders for mascot/icons, can be upgraded later
