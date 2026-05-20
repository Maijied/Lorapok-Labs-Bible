# Playbook: Add a Product to the Catalog

> **Trigger:** Task mentions adding a new product, tool, or project to the Lorapok ecosystem catalog.

## Checklist

1. **Add the product data** in `app/src/data/products.ts`
   - Append a new object to the `products` array.
   - Required fields: `id`, `name`, `description`, `url`, `icon`, `status`, `tags`.
   - Use a unique slug-style `id` (e.g. `"lorapok-atlas"`).
   - Pick an icon from the Lucide icon set that best represents the product.

2. **Verify type compliance** — the product object must satisfy the `Product` interface in `app/src/types/index.ts`. If the interface needs a new field, add it there first.

3. **No page edits needed** — `ProductsPage.tsx` renders dynamically from the data array.

4. **Validate**
   ```bash
   cd app
   npm run lint
   npm run build
   ```

## Data Shape Reference

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;        // Lucide icon name (PascalCase)
  status: 'live' | 'beta' | 'coming-soon' | 'archived';
  tags: string[];
}
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

- Product descriptions should be concise (one sentence, max two).
- Use active voice: "Monitors…", "Generates…", "Connects…".
- Status must accurately reflect the product's public availability.
- Tags use kebab-case and should include the primary platform.
