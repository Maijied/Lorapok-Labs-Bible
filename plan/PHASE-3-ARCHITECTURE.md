# Phase 3: Architecture & Technical Design

## Lorapok Labs Bible — PWA Website

---

## 1. Tech Stack Decision

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **React 18** + **Vite** | Fast builds, HMR, optimal chunking, tree-shaking |
| Language | **TypeScript** | Type safety, better DX, refactoring confidence |
| Routing | **React Router v6** | Client-side routing, lazy loading, nested routes |
| Styling | **CSS Modules** + **CSS Custom Properties** | Zero runtime cost, scoped styles, design tokens via variables |
| Animations | **Framer Motion** | Declarative animations, page transitions, gesture support |
| Icons | **Lucide React** | Lightweight, tree-shakeable, consistent design |
| PWA | **Vite PWA Plugin** (vite-plugin-pwa) | Auto-generates SW, manifest, precaching |
| Build | **Vite 5** | ESBuild + Rollup, code splitting, asset optimization |
| Deploy | **GitHub Pages** | Free, integrated with repo, custom domain ready |
| Linting | **ESLint** + **Prettier** | Code quality and consistency |

### Why NOT Next.js/Astro?
- This is a **pure static SPA** with no SSR needs
- Desktop-app UX requires full client-side control
- Vite + React gives smallest bundle with fastest DX
- GitHub Pages deployment is simpler without server framework

---

## 2. Project Structure

```
lorapok-labs-bible/
├── public/
│   ├── icons/                    # PWA icons (192x192, 512x512, maskable)
│   ├── fonts/                    # Self-hosted fonts (JetBrains Mono, Inter)
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt
│   └── favicon.svg               # SVG favicon (neon larva)
│
├── src/
│   ├── main.tsx                  # App entry point
│   ├── App.tsx                   # Root component with router
│   ├── vite-env.d.ts             # Vite type declarations
│   │
│   ├── assets/                   # Static assets imported in code
│   │   ├── images/               # Optimized images/SVGs
│   │   └── mascot/               # Mascot SVG components
│   │
│   ├── components/               # Shared/reusable components
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      # Main desktop-app shell
│   │   │   ├── TitleBar.tsx      # Custom window title bar
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   ├── StatusBar.tsx     # Bottom status bar
│   │   │   └── ContentArea.tsx   # Main content wrapper
│   │   │
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx     # Glassmorphic card component
│   │   │   ├── NeonButton.tsx    # Neon-glow button
│   │   │   ├── HexBadge.tsx      # Hexagonal badge
│   │   │   ├── Tooltip.tsx       # Custom tooltip
│   │   │   ├── SkeletonLoader.tsx # Neon pulse skeleton
│   │   │   ├── CommandPalette.tsx # Ctrl+K command palette
│   │   │   └── ParticleField.tsx # Background particle animation
│   │   │
│   │   ├── sections/
│   │   │   ├── ProductCard.tsx   # Individual product card
│   │   │   ├── SkillGrid.tsx     # Tech stack visualization
│   │   │   ├── AchievementBadge.tsx
│   │   │   ├── SocialLink.tsx    # Social media link item
│   │   │   └── CodeSnippet.tsx   # Syntax highlighted snippet
│   │   │
│   │   └── mascot/
│   │       └── CyberLarva.tsx    # Animated SVG mascot
│   │
│   ├── pages/                    # Route-level page components
│   │   ├── HomePage.tsx          # Landing / Hero
│   │   ├── ProductsPage.tsx      # Products grid
│   │   ├── AtlasPage.tsx         # Atlas deep-dive
│   │   ├── AboutPage.tsx         # Founder bio
│   │   ├── BrandPage.tsx         # Brand identity showcase
│   │   ├── ResearchPage.tsx      # Philosophy & research
│   │   └── ConnectPage.tsx       # Links & contact
│   │
│   ├── data/                     # Static data (JSON-like TS exports)
│   │   ├── products.ts           # Product catalog
│   │   ├── social-links.ts       # Social media links
│   │   ├── achievements.ts       # Achievements data
│   │   ├── navigation.ts         # Sidebar nav items
│   │   └── skills.ts             # Tech stack data
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useCommandPalette.ts  # Ctrl+K handler
│   │   ├── useScrollReveal.ts    # Intersection observer animations
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useMediaQuery.ts      # Responsive breakpoints
│   │
│   ├── styles/                   # Global styles & design tokens
│   │   ├── globals.css           # CSS reset, custom properties, base styles
│   │   ├── tokens.css            # Design tokens (colors, spacing, typography)
│   │   ├── animations.css        # Keyframe animations
│   │   └── utilities.css         # Utility classes
│   │
│   ├── utils/                    # Helper functions
│   │   ├── cn.ts                 # Class name merger utility
│   │   └── constants.ts          # App-wide constants
│   │
│   └── types/                    # TypeScript type definitions
│       └── index.ts              # Shared types/interfaces
│
├── docs/                         # Project documentation
│   ├── PHASE-2-FEATURES.md
│   └── PHASE-3-ARCHITECTURE.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build → deploy to Pages
│
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # TS config for node scripts
├── package.json                  # Dependencies & scripts
├── .eslintrc.cjs                 # ESLint config
├── .prettierrc                   # Prettier config
├── .gitignore
└── README.md                     # Project README
```

---

## 3. Component Hierarchy

```
<App>
  <BrowserRouter>
    <AppShell>                         ← Desktop app frame
      <TitleBar />                     ← Window chrome (logo, title, window buttons)
      <div className="app-body">
        <Sidebar />                    ← Left navigation panel
        <ContentArea>                  ← Main content with scroll
          <AnimatePresence>            ← Page transitions (Framer Motion)
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/atlas" element={<AtlasPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/connect" element={<ConnectPage />} />
            </Routes>
          </AnimatePresence>
        </ContentArea>
      </div>
      <StatusBar />                    ← Bottom status bar
      <CommandPalette />               ← Overlay (Ctrl+K triggered)
      <ParticleField />                ← Background canvas (z-index: -1)
    </AppShell>
  </BrowserRouter>
</App>
```

---

## 4. Routing Strategy

| Route | Page | Lazy Loaded |
|-------|------|-------------|
| `/` | HomePage | No (critical path) |
| `/products` | ProductsPage | Yes |
| `/atlas` | AtlasPage | Yes |
| `/about` | AboutPage | Yes |
| `/brand` | BrandPage | Yes |
| `/research` | ResearchPage | Yes |
| `/connect` | ConnectPage | Yes |

**Hash-based routing** (`HashRouter`) for GitHub Pages compatibility (no server-side redirects needed).

---

## 5. PWA Configuration

### manifest.json
```json
{
  "name": "Lorapok Labs",
  "short_name": "Lorapok",
  "description": "Building the Future. One Line at a Time.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#00ff88",
  "orientation": "any",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker Strategy
- **Precache**: All static assets (HTML, CSS, JS, fonts, images)
- **Runtime caching**: Network-first for any dynamic data
- **Update flow**: Show toast notification when new version available

---

## 6. Performance Strategy

| Strategy | Implementation |
|----------|---------------|
| Code Splitting | React.lazy() for all pages except Home |
| Tree Shaking | ES modules + Vite's dead code elimination |
| Font Loading | `font-display: swap` + preload critical fonts |
| Image Optimization | SVG for icons/mascot, WebP for photos |
| CSS | CSS Modules = no unused CSS shipped per component |
| Bundle Analysis | `rollup-plugin-visualizer` for monitoring |
| Compression | Vite gzip/brotli via build config |

### Bundle Budget
```
Initial Load:
  - vendor.js (React, Router, Framer Motion): ~45KB gzipped
  - app.js (AppShell, Home, Sidebar): ~25KB gzipped
  - styles (globals + home): ~8KB gzipped
  - Total initial: ~78KB gzipped ✓

Lazy Chunks (per page): ~5-15KB each
Total all assets: < 200KB gzipped ✓
```

---

## 7. State Management

**No global state library needed.** The app is content-driven with minimal interactive state:

| State | Scope | Method |
|-------|-------|--------|
| Current route | App | React Router |
| Sidebar collapsed | AppShell | useState + localStorage |
| Command palette open | AppShell | useState + keyboard event |
| Theme (future) | App | CSS custom properties + localStorage |
| Scroll position | Per page | useRef |

---

## 8. Responsive Breakpoints

| Breakpoint | Name | Layout Behavior |
|------------|------|-----------------|
| < 640px | `mobile` | No sidebar, hamburger menu, stacked cards |
| 640-1024px | `tablet` | Collapsed sidebar (icons only), 2-col grid |
| > 1024px | `desktop` | Full sidebar, 3-col grid, all panels visible |

---

## 9. Deployment Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
trigger: push to main
steps:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build (npm run build)
  5. Deploy to GitHub Pages (peaceiris/actions-gh-pages)
```

---

## 10. Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vite-plugin-pwa": "^0.20.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0"
  }
}
```

---

## 11. Architecture Decisions Record (ADR)

| # | Decision | Reason |
|---|----------|--------|
| 1 | Vite over CRA/Next | Fastest builds, smallest output, no SSR needed |
| 2 | CSS Modules over Tailwind | Smaller bundle, better matches custom design system |
| 3 | HashRouter over BrowserRouter | GitHub Pages has no server-side routing |
| 4 | Framer Motion over CSS-only | Complex page transitions + gesture support |
| 5 | Self-hosted fonts over CDN | Offline PWA support, no external requests |
| 6 | No state library | App is mostly static, React state sufficient |
| 7 | TypeScript strict mode | Fewer bugs, better documentation |
| 8 | SVG mascot over raster | Scalable, animatable, small file size |
