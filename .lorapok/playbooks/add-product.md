# Playbook: Add a Product to the Catalog

> **Trigger:** Task mentions adding a new product, tool, or project.

## Checklist

1. **Add product data** in `app/src/data/products.ts`
   - Required fields: `id`, `name`, `description`, `url`, `icon`, `status`, `tags`.
   - Use a unique slug-style `id`.

2. **Verify type compliance** — must satisfy the `Product` interface in `app/src/types/index.ts`.

3. **No page edits needed** — `ProductsPage.tsx` renders dynamically.

4. **Validate**
   ```bash
   node .lorapok/scripts/brand-guard.mjs
   cd app && npm run lint && npm run build
   ```

## Example Entry

```typescript
{
  id: 'lorapok-brainspark',
  name: 'Lorapok BrainSpark',
  description: 'Neural micro-games that sharpen cognitive reflexes in 60-second bursts.',
  url: 'https://lorapok.github.io/brainspark',
  icon: 'Brain',
  status: 'live',
  tags: ['web-game', 'neuroscience', 'pwa'],
}
```

## Brand Rules

- Descriptions: one sentence, active voice ("Monitors…", "Generates…").
- Status must accurately reflect public availability.
- Tags use kebab-case.
