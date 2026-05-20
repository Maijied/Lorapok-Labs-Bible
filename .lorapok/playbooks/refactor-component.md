# Playbook: Refactor / Extract a Component

> **Trigger:** Task involves extracting, splitting, merging, or refactoring a UI component.

## Checklist

1. **Identify the extraction boundary**
   - What props does the new component need?
   - Shared → `components/ui/`, Layout → `components/layout/`, Page-specific → colocate.

2. **Create the component** at the appropriate location.

3. **Create CSS Module** → `<ComponentName>.module.css` in the same directory.
   - Extract only relevant styles. Use design tokens.

4. **Define Props interface** at the top of the component file.

5. **Update the parent** — replace extracted JSX, remove dead imports/CSS.

6. **Check for side effects** — search for references, verify animations.

7. **Validate**
   ```bash
   node .lorapok/scripts/brand-guard.mjs
   cd app && npm run lint && npm run build
   ```

## Naming Convention

| Location | Example |
|----------|---------|
| `components/ui/` | `GlassCard`, `HexBadge`, `NeonButton` |
| `components/layout/` | `AppShell`, `Sidebar`, `TitleBar` |
| `components/mascot/` | `CyberLarva` |

## Anti-Patterns

- Prop drilling > 2 levels → use composition.
- God components > 200 lines → split further.
- Importing another component's CSS Module.
- Using `React.FC`.
