# Playbook: Add a Data Entry (Achievements, Skills, Social Links)

> **Trigger:** Task involves adding achievements, skills, social links, or navigation items to the data layer.

## Checklist

1. **Identify the correct data file** in `app/src/data/`:
   | Content Type | File |
   |---|---|
   | Achievements / Milestones | `achievements.ts` |
   | Technical skills | `skills.ts` |
   | Social media links | `social-links.ts` |
   | Sidebar navigation | `navigation.ts` |
   | Products / Tools | `products.ts` |

2. **Add the entry** to the appropriate array, following the existing shape exactly.

3. **Verify type compliance** — all data files export typed arrays. If your entry needs a new field, update the interface in `app/src/types/index.ts` first, then update all existing entries.

4. **Order matters** — entries render in array order. Place new items logically:
   - Achievements: chronological (newest last).
   - Skills: grouped by category.
   - Social links: by importance/visibility.
   - Navigation: matches desired sidebar order.

5. **Validate**
   ```bash
   cd app
   npm run lint
   npm run build
   ```

## Icon Guidelines

- All icons come from the **Lucide React** library.
- Reference icons by PascalCase name string (e.g. `"Trophy"`, `"Github"`, `"Linkedin"`).
- Browse available icons: https://lucide.dev/icons

## Example: Adding a Social Link

```typescript
// app/src/data/social-links.ts
{
  id: 'producthunt',
  label: 'Product Hunt',
  url: 'https://www.producthunt.com/products/lorapok-atlas-api-directory',
  icon: 'Rocket',
}
```

## Example: Adding an Achievement

```typescript
// app/src/data/achievements.ts
{
  id: 'chrysalis-v1',
  title: 'Lorapok Chrysalis v1.0',
  description: 'Launched the first brand-compliant AI coding agent.',
  date: '2025-05',
  icon: 'Bot',
}
```

## Brand Rules

- Descriptions are punchy and concise (one line).
- Use present tense for ongoing capabilities ("Monitors", "Ships").
- Use past tense for milestone achievements ("Launched", "Reached").
- URLs must be HTTPS and publicly accessible.
- Never hardcode data in page components — always use the data layer.
