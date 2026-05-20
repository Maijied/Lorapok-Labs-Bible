# Playbook: Add a New Page

> **Trigger:** Task mentions adding a new page, route, or view to the app.

## Checklist

1. **Create the page component** at `app/src/pages/<PageName>Page.tsx`
   - Use a function component with PascalCase naming.
   - Import `motion` from `framer-motion` for entrance animations.
   - Use the `cn` helper from `../utils/cn` for class joining.

2. **Create the colocated CSS Module** at `app/src/pages/<PageName>Page.module.css`
   - Use design tokens from `../styles/tokens.css` (e.g. `var(--color-primary)`).
   - Follow the glassmorphic + neon-glow aesthetic.
   - Never use inline styles for static values.

3. **Register the route** in `app/src/App.tsx`
   - Import the new page lazily: `const <PageName>Page = lazy(() => import('./pages/<PageName>Page'))`.
   - Add a `<Route path="/<slug>" element={<PageName>Page />} />` inside the existing `<Routes>`.
   - Wrap in `<Suspense>` if not already handled by the parent.

4. **Add navigation entry** in `app/src/data/navigation.ts`
   - Add an object with `{ label, path, icon }` matching the Lucide icon set.
   - The sidebar auto-renders from this array — no manual sidebar edits needed.

5. **Validate**
   ```bash
   cd app
   npm run lint
   npm run build
   ```

## Brand Rules

- Page must use `HashRouter` paths (e.g. `/#/atlas`, never `/atlas`).
- Background must be dark (`var(--color-bg)`) with neon accent highlights.
- Include at least one `GlassCard` or glassmorphic container for content sections.
- Animate page entrance with `framer-motion` (fade-up or scale-in).

## File Template

```tsx
import { motion } from 'framer-motion';
import styles from './<PageName>Page.module.css';

export default function <PageName>Page() {
  return (
    <motion.main
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className={styles.title}>Page Title</h1>
      {/* Content here */}
    </motion.main>
  );
}
```
