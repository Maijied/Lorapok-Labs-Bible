# Playbook: Refactor / Extract a Component

## Trigger

Use this playbook when a task mentions **refactoring a component**, **extracting a component**, **splitting a component**, or **creating a reusable UI element**.

---

## Pre-conditions

- The parent component or page file exists
- The component boundary is identifiable (repeated patterns, large render blocks, distinct concerns)

---

## Checklist

### 1. Identify the Component Boundary

Determine what to extract based on:
- Repeated UI patterns (→ reusable component)
- Distinct visual section (→ layout component)
- Self-contained logic + UI (→ feature component)
- Components exceeding ~150 lines (→ split candidates)

### 2. Create the Component File

Place the new component in the appropriate directory:

| Type | Directory | Example |
|------|-----------|---------|
| Reusable UI primitive | `app/src/components/ui/` | `GlassCard`, `NeonButton`, `HexBadge` |
| Layout/structural | `app/src/components/layout/` | `Sidebar`, `AppShell`, `TitleBar` |
| Page-specific section | `app/src/pages/` (colocated) | Section within a page |
| Feature-specific | `app/src/components/<feature>/` | `CyberLarva` (mascot) |

### 3. Create Colocated CSS Module

Create `<ComponentName>.module.css` in the same directory as the component.

- Import as: `import styles from './<ComponentName>.module.css';`
- Use CSS tokens for all values (colors, spacing, radii, shadows)
- No global styles — everything is scoped via the module

### 4. Define Props Interface

Define a `Props` interface (not `type`) directly in the component file:

```tsx
interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

- Do NOT use `React.FC` — use arrow functions with explicit return
- Export the component as the default export
- Accept optional `className` prop for composability

### 5. Update the Parent

- Replace the extracted JSX with the new component
- Add the import statement
- Pass required props
- Remove any migrated CSS classes from the parent's module

### 6. Check Side Effects

- Verify no broken imports in other files
- Ensure animations still work (framer-motion variants may need forwarding)
- Check that CSS Module class references are updated in both parent and child

### 7. Validate

Run the full Chrysalis Gates pipeline:

```bash
# From repository root
node .lorapok/scripts/brand-guard.mjs

# From app/ directory
cd app && npm run lint
cd app && npm run build
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | PascalCase + `.tsx` | `GlassCard.tsx` |
| CSS Module | PascalCase + `.module.css` | `GlassCard.module.css` |
| Props interface | `Props` (local to file) | `interface Props { ... }` |
| CSS class names | camelCase | `.cardWrapper`, `.titleText` |
| Component export | `export default` | `export default GlassCard;` |
| Utility functions | camelCase + `.ts` | `formatDate.ts` |

---

## Component Template

```tsx
import { motion } from 'framer-motion';
import styles from './<ComponentName>.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function <ComponentName>({ children, className }: Props) {
  return (
    <motion.div
      className={`${styles.root} ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default <ComponentName>;
```

---

## Anti-patterns to Avoid

| Anti-pattern | Why It's Wrong | Do This Instead |
|-------------|---------------|-----------------|
| `React.FC<Props>` | Implicit children, legacy pattern | Arrow function with typed props |
| Inline styles with hex | Breaks brand token system | Use CSS Module + `var(--token)` |
| `styled.div` | CSS-in-JS is forbidden | Use `.module.css` |
| Prop drilling > 2 levels | Creates tight coupling | Use composition or context |
| `any` type on props | Breaks type safety | Define explicit interface |
| Importing from parent's CSS Module | Creates circular dependency | Move shared styles to own module |
| Giant `className` strings | Hard to read, error-prone | Use `cn()` utility helper |
| Default export + named export | Confusing import patterns | One default export per component |

---

## Post-conditions

After executing this playbook:

- [ ] New component file exists at the appropriate location
- [ ] Colocated CSS Module exists with token-based styles
- [ ] Props interface is defined with proper types
- [ ] Parent component is updated to use the new component
- [ ] No orphaned CSS classes in parent module
- [ ] No broken imports across the codebase
- [ ] Brand Guard passes with zero errors
- [ ] ESLint passes with zero errors
- [ ] Build completes successfully
