# Playbook: Add a New Page

## Trigger

Use this playbook when a task mentions **adding a new page**, **creating a new route**, or **adding a new section** to the app.

---

## Pre-conditions

- `app/src/App.tsx` exists and contains the route definitions
- `app/src/data/navigation.ts` exists and exports the `navigation` array
- `app/src/pages/` directory exists

---

## Checklist

### 1. Create the Page Component

Create `app/src/pages/<Name>Page.tsx` using the template below.

- Use `framer-motion` for page enter/exit transitions
- Wrap content in a `motion.main` element
- Import `GlassCard` from `@/components/ui/GlassCard` for content sections
- Use Lucide React icons for visual accents

### 2. Create Colocated CSS Module

Create `app/src/pages/<Name>Page.module.css` alongside the component.

- Use CSS custom properties from `tokens.css` for all colors and spacing
- Dark background by default (`var(--color-surface)`)
- Neon-green and cyan accents for headings, borders, and highlights
- No hardcoded hex values — tokens only

### 3. Register Route in App.tsx

Add a lazy import and `<Route>` entry in `app/src/App.tsx`:

```tsx
const <Name>Page = lazy(() => import('./pages/<Name>Page'));

// Inside <Routes>:
<Route path="/<slug>" element={<<Name>Page />} />
```

### 4. Add Navigation Entry

Add an entry to `app/src/data/navigation.ts`:

```ts
{ id: '<slug>', label: '<Label>', path: '/<slug>', icon: '<LucideIcon>' },
```

### 5. Validate

Run the full Chrysalis Gates pipeline:

```bash
# From repository root
node .lorapok/scripts/brand-guard.mjs

# From app/ directory
cd app && npm run lint
cd app && npm run build
```

All three must pass before opening a PR.

---

## File Template

```tsx
import { motion } from 'framer-motion';
import styles from './<Name>Page.module.css';

function <Name>Page() {
  return (
    <motion.main
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={styles.title}><Page Title></h1>
      {/* Page content here */}
    </motion.main>
  );
}

export default <Name>Page;
```

---

## Brand Rules

| Rule | Requirement |
|------|-------------|
| Background | Dark surface (`var(--color-surface)` or `var(--color-bg)`) |
| Accents | Neon-green (`var(--color-neon)`) and cyan (`var(--color-cyan)`) |
| Cards | Use `GlassCard` component for content containers |
| Routing | HashRouter paths only — no `BrowserRouter` |
| Animations | `framer-motion` for page transitions, CSS for micro-interactions |
| Typography | Use token-based font sizes (`var(--font-size-*)`) |
| Spacing | Use token-based spacing (`var(--space-*)`) |

---

## Post-conditions

After executing this playbook:

- [ ] A new page component exists at `app/src/pages/<Name>Page.tsx`
- [ ] A colocated CSS Module exists at `app/src/pages/<Name>Page.module.css`
- [ ] The route is registered in `app/src/App.tsx` with lazy loading
- [ ] A navigation entry exists in `app/src/data/navigation.ts`
- [ ] Brand Guard passes with zero errors
- [ ] ESLint passes with zero errors
- [ ] Build completes successfully
