# Phase 2: Feature Extraction & Requirements

## Lorapok Labs Bible — PWA Website

---

## 1. Application Type & UX Paradigm

| Attribute | Decision |
|-----------|----------|
| Type | Progressive Web App (PWA) |
| UX Feel | Desktop application (window chrome, sidebar navigation, panel-based layout) |
| Aesthetic | "Biological UI" — cyber-industrial, glassmorphism, neon-on-dark |
| Target | Developer portfolio + Open-source ecosystem showcase |
| Offline | Full offline support via service worker |
| Install | Installable on desktop & mobile |

---

## 2. Pages & Sections

### 2.1 Landing / Hero Page
- **Animated mascot** (CSS/SVG cybernetic larva with glow effects)
- **Tagline**: "Building the Future. One Line at a Time."
- **Quick stats**: 8 products, 6+ years, millions served
- **CTA buttons**: Explore Products, View on GitHub
- **Particle/mesh background animation** (subtle, performant)

### 2.2 Products Page (Ecosystem Showcase)
- **Grid/card layout** with glassmorphic cards
- **Each product card** shows:
  - Icon/logo with neon glow
  - Product name & one-liner
  - Platform badges (npm, PyPI, Packagist, Android, etc.)
  - Status indicator (Active, Maintained, Beta)
  - Link to repository/live demo
- **Products to feature**:
  1. Lorapok Atlas API Directory
  2. Lorapok Media Player
  3. Lorapok Laravel Monitor
  4. Lorapok Keyboard
  5. Spotlight Tickets
  6. Linpad
  7. Roast as a Service
  8. Lorapok AI Agent

### 2.3 Atlas Deep-Dive Page (Flagship Product)
- Hero section with feature highlights
- Multi-platform availability: Web App, VS Code, MCP Server, npm, REST API
- Live stats: 2100+ APIs, 34 categories
- Code snippet showcase (JS, Python, cURL, Go)
- Product Hunt badge/link

### 2.4 About / Founder Page
- Professional bio of Mohammad Maizied Hasan Majumder
- Current role at Shohoz Ltd
- Tech stack visualization (skill bars or hex grid)
- Achievements section:
  - Arctic Code Vault Contributor
  - Mozilla Firefox localization (6 years)
  - 3rd Place IUT Hackathon
- Professional links (GitHub, Wellfound, LinkedIn)

### 2.5 Brand Identity Page
- Mascot showcase with description
- Color palette display (interactive swatches)
- Typography specimens
- Visual guidelines summary
- Design philosophy: "Products That Feel Alive"

### 2.6 Research & Philosophy Page
- Core philosophy: Zero-config efficiency, silent background optimization
- Digital metamorphosis concept
- Open-source philosophy
- "The best products aren't built overnight — they're built consistently"

### 2.7 Connect / Links Page
- All social links in a link-tree style layout
- GitHub, LinkedIn, Reddit, Instagram, Facebook, Product Hunt, Wellfound
- Contact CTA for opportunities

---

## 3. Desktop App UX Features

| Feature | Description |
|---------|-------------|
| Title Bar | Custom window chrome with app name, minimize/maximize/close (decorative) |
| Sidebar Navigation | Collapsible left panel with nav icons + labels |
| Status Bar | Bottom bar showing connection status, version, last updated |
| Panel System | Content areas with resizable/tabbed panels |
| Command Palette | Ctrl+K quick-search to jump between sections |
| Keyboard Shortcuts | Navigation shortcuts displayed in footer |
| Tooltips | Hover tooltips on all interactive elements |
| Loading States | Skeleton screens with neon pulse animation |

---

## 4. PWA Features

| Feature | Implementation |
|---------|---------------|
| Installable | manifest.json with proper icons, splash screens |
| Offline | Service worker caches all static assets + pages |
| App Shell | Instant load via cached shell architecture |
| Updates | Background SW update with user notification |
| Push Ready | Registration for future push notification support |
| Responsive | Full mobile/tablet/desktop adaptive layout |
| Performance | Lighthouse score target: 95+ |

---

## 5. Interactions & Animations

| Element | Animation |
|---------|-----------|
| Page transitions | Smooth fade/slide between routes |
| Cards | Hover: lift + glow intensify + border color shift |
| Mascot | Subtle idle animation (breathing/glow pulse) |
| Background | Floating particles/network mesh (CSS/Canvas) |
| Navigation | Active indicator slides smoothly |
| Loading | Neon pulse skeleton screens |
| Scroll | Reveal animations on scroll (intersection observer) |
| Buttons | Ripple effect with neon glow |

---

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Bundle Size | < 200KB gzipped (initial) |
| Lighthouse Performance | 95+ |
| Accessibility | WCAG 2.1 AA |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Mobile Support | iOS Safari, Android Chrome |
| SEO | Meta tags, OG tags, structured data |

---

## 7. Data Architecture

All content is **static** (no backend needed):
- Product data: JSON configuration file
- Social links: JSON configuration file
- Bio/text content: Embedded in components or markdown
- Images/assets: Optimized SVGs + WebP where needed

---

## 8. Deployment Target

- **GitHub Pages** (static hosting from the repository)
- **Custom domain ready** (CNAME support)
- **CI/CD**: GitHub Actions for build + deploy on push to main
