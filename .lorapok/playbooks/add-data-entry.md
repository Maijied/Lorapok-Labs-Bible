# Playbook: Add a Data Entry

## Trigger

Use this playbook when a task mentions **adding an achievement**, **adding a skill**, **adding a social link**, or **updating data arrays** in the app.

---

## Content Type Reference

| Content Type | Data File | Interface | Icon Source |
|-------------|-----------|-----------|-------------|
| Achievements | `app/src/data/achievements.ts` | `Achievement` | Lucide React |
| Skills | `app/src/data/skills.ts` | `Skill` | N/A |
| Social Links | `app/src/data/social-links.ts` | `SocialLink` | Lucide React |
| Products | `app/src/data/products.ts` | `Product` | Lucide React |
| Navigation | `app/src/data/navigation.ts` | `NavItem` | Lucide React |

---

## Checklist

### 1. Identify the Correct File

Use the table above to determine which file to modify based on the content type.

### 2. Add the Entry

Append a new object to the relevant array, following the existing pattern and interface.

### 3. Verify Type Compliance

Ensure the new entry satisfies the corresponding TypeScript interface defined in `app/src/types/index.ts`:

```ts
// Achievement
{ id: string; title: string; description: string; icon: string; year?: string; }

// Skill
{ name: string; category: 'language' | 'framework' | 'tool' | 'platform'; proficiency: number; }

// SocialLink
{ id: string; name: string; url: string; icon: string; color?: string; }

// NavItem
{ id: string; label: string; path: string; icon: string; }
```

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

## Icon Guidelines

- All icons come from **Lucide React** (`lucide-react` package)
- Use **PascalCase** icon names (e.g., `Globe`, `Trophy`, `Snowflake`, `Github`)
- Browse available icons at: https://lucide.dev/icons
- Icon names must exactly match Lucide's export names
- Do NOT use FontAwesome, Heroicons, or any other icon library

---

## Brand Rules

| Rule | Requirement |
|------|-------------|
| Descriptions | Punchy, concise — one sentence maximum |
| Achievement tense | Past tense for completed, present for ongoing |
| Skill proficiency | Integer 0–100, honest self-assessment |
| Social URLs | Must be valid HTTPS URLs |
| IDs | kebab-case, unique within the array |
| Icons | Valid Lucide React PascalCase name |
| Ordering | New entries go at the end of the array (unless chronological) |

---

## Examples

### Adding an Achievement

```ts
{
  id: 'npm-downloads',
  title: '10K npm Downloads',
  description: 'Lorapok Atlas npm package crossed 10,000 weekly downloads.',
  icon: 'Download',
  year: '2025',
},
```

### Adding a Skill

```ts
{ name: 'Rust', category: 'language', proficiency: 45 },
```

### Adding a Social Link

```ts
{
  id: 'twitter',
  name: 'Twitter / X',
  url: 'https://twitter.com/lorapoklabs',
  icon: 'Twitter',
},
```

---

## Post-conditions

After executing this playbook:

- [ ] The new entry exists in the correct data file
- [ ] The entry satisfies the corresponding TypeScript interface
- [ ] No duplicate `id` values exist in the array
- [ ] Icon name is a valid Lucide React export
- [ ] URLs are valid HTTPS links
- [ ] Brand Guard passes with zero errors
- [ ] ESLint passes with zero errors
- [ ] Build completes successfully
