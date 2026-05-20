# Playbook: Add a Product

## Trigger

Use this playbook when a task mentions **adding a product**, **adding a tool**, or **registering a new project** in the product catalog.

---

## Pre-conditions

- `app/src/data/products.ts` exists and exports the `products` array
- `app/src/types/index.ts` defines the `Product` interface

---

## Checklist

### 1. Add Entry to Products Data

Add a new object to the `products` array in `app/src/data/products.ts`.

### 2. Verify Type Compliance

Ensure the entry satisfies the `Product` interface:

```ts
export interface Product {
  id: string;           // kebab-case identifier
  name: string;         // Full product name
  tagline: string;      // Short subtitle (2-4 words)
  description: string;  // One sentence, active voice
  icon: string;         // Lucide React icon name (PascalCase)
  platforms: string[];  // Deployment targets
  status: 'active' | 'beta' | 'archived';
  url: string;          // Product/landing page URL
  github?: string;      // Optional GitHub URL
  color?: string;       // Optional accent color token
}
```

### 3. No Page Edits Needed

The `ProductsPage` renders dynamically from the `products` array. No page modifications are required unless a custom detail page is being added (use `add-page` playbook for that).

### 4. Validate

Run the full Chrysalis Gates pipeline:

```bash
# From repository root
node .lorapok/scripts/brand-guard.mjs

# From app/ directory
cd app && npm run lint
cd app && npm run build
```

---

## Example Entry

```ts
{
  id: 'brain-spark',
  name: 'BrainSpark',
  tagline: 'Idea Generator',
  description: 'AI-powered brainstorming tool that transforms vague ideas into actionable project plans.',
  icon: 'Lightbulb',
  platforms: ['Web', 'CLI'],
  status: 'beta',
  url: 'https://lorapok.github.io',
  github: 'https://github.com/Maijied/brain-spark',
  color: 'var(--neon-green)',
},
```

---

## Brand Rules

| Rule | Requirement |
|------|-------------|
| Description | One sentence, active voice, no trailing period in tagline |
| Status | Must accurately reflect current state: `active`, `beta`, or `archived` |
| Tags | Use kebab-case for the `id` field |
| Icon | Must be a valid Lucide React icon name in PascalCase |
| URL | Must be a valid HTTPS URL |
| Platforms | List actual deployment targets (e.g., `Web`, `CLI`, `npm`, `VS Code`) |

---

## Post-conditions

After executing this playbook:

- [ ] A new entry exists in `app/src/data/products.ts`
- [ ] The entry satisfies the `Product` interface with no type errors
- [ ] The product renders correctly on the Products page
- [ ] Brand Guard passes with zero errors
- [ ] ESLint passes with zero errors
- [ ] Build completes successfully
