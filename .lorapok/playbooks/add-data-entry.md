# Playbook: Add a Data Entry (Achievements, Skills, Social Links)

> **Trigger:** Task involves adding achievements, skills, social links, or navigation items.

## Checklist

1. **Identify the correct file** in `app/src/data/`:
   | Content Type | File |
   |---|---|
   | Achievements | `achievements.ts` |
   | Skills | `skills.ts` |
   | Social links | `social-links.ts` |
   | Navigation | `navigation.ts` |
   | Products | `products.ts` |

2. **Add the entry** following the existing array shape.

3. **Verify type compliance** with interfaces in `app/src/types/index.ts`.

4. **Order matters** — entries render in array order.

5. **Validate**
   ```bash
   node .lorapok/scripts/brand-guard.mjs
   cd app && npm run lint && npm run build
   ```

## Icon Guidelines

- All icons from **Lucide React** (PascalCase name).
- Browse: https://lucide.dev/icons

## Brand Rules

- Descriptions: punchy, one line.
- Present tense for capabilities, past tense for milestones.
- URLs must be HTTPS and publicly accessible.
- Never hardcode data in page components.
