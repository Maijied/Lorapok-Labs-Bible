# Playbook: Add a New Page

> **Trigger:** Task mentions adding a new page, route, or view to the app.

## Checklist

1. **Create the page component** at `app/src/pages/<PageName>Page.tsx`
   - Use a function component with PascalCase naming.
   - Import `motion` from `framer-motion` for entrance animations.
   - Use the `cn` helper from `../utils/cn` for class joining.

2. **Create the colocated CSS Module** at `app/src/pages/<PageName>Page.module.css`
   - Use design tokens from `../styles/tokens.css`.
   - Follow the glassmorphic + neon-glow aesthetic.

3. **Register the route** in `app/src/App.tsx`
   - Import the new page lazily.
   - Add a `<Route>` inside the existing `<Routes>`.

4. **Add navigation entry** in `app/src/data/navigation.ts`
   - Add an object with `{ label, path, icon }`.
   - The sidebar auto-renders from this array.

5. **Validate**
   ```bash
   node .lorapok/scripts/brand-guard.mjs
   cd app && npm run lint && npm run build
   ```

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
    </motion.main>
  );
}
```

## Brand Rules

- Background: dark (`var(--color-bg)`) with neon accent highlights.
- Include at least one `GlassCard` or glassmorphic container.
- Animate page entrance with `framer-motion` (fade-up or scale-in).
- HashRouter paths only (e.g. `/#/atlas`).
