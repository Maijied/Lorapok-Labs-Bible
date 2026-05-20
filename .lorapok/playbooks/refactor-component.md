# Playbook: Refactor / Extract a Component

> **Trigger:** Task involves extracting, splitting, merging, or refactoring a UI component.

## Checklist

1. **Identify the extraction boundary**
   - What props does the new component need?
   - Does it own local state, or is state lifted to the parent?
   - Will it be reused across pages (→ `components/ui/`) or page-specific (keep in `pages/`)?

2. **Create the component file** at the appropriate location:
   - Shared/reusable → `app/src/components/ui/<ComponentName>.tsx`
   - Layout-level → `app/src/components/layout/<ComponentName>.tsx`
   - Page-specific helper → colocate next to the page file.

3. **Create the CSS Module** → `<ComponentName>.module.css` in the same directory.
   - Extract only the relevant styles from the parent's CSS Module.
   - Use design tokens; never hardcode colors or spacing.

4. **Define the Props interface** at the top of the component file:
   ```typescript
   interface <ComponentName>Props {
     // ...
   }
   ```
   - Export it if other components will import the type.
   - If shared across many files, add to `app/src/types/index.ts`.

5. **Update the parent component**
   - Replace the extracted JSX with `<ComponentName ... />`.
   - Remove unused imports and dead CSS classes from the parent.

6. **Check for side effects**
   - Search the codebase for any direct references to the old structure.
   - Ensure animations still work (check `framer-motion` layout IDs if used).

7. **Validate**
   ```bash
   cd app
   npm run lint
   npm run build
   ```

## Naming Convention

| Location | Example |
|----------|---------|
| `components/ui/` | `GlassCard`, `HexBadge`, `NeonButton` |
| `components/layout/` | `AppShell`, `Sidebar`, `TitleBar`, `StatusBar` |
| `components/mascot/` | `CyberLarva` |

## Brand Rules

- Every visible component should respect the Biological UI aesthetic.
- Interactive elements need hover/focus states with neon glow transitions.
- Use `framer-motion` for any enter/exit animations.
- Accessibility: all interactive elements must be keyboard-navigable.
- The `cn()` utility handles conditional class merging — use it instead of string templates.

## Anti-Patterns to Avoid

- Prop drilling more than 2 levels deep → consider context or composition.
- God components with 200+ lines → split further.
- Importing a component's CSS Module from another component's file.
- Using `React.FC` — prefer explicit return types on plain functions.
