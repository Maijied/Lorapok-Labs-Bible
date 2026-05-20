<div align="center">

<br/>

# ◈ Lorapok Chrysalis

**The Brand-Compliant Builder**

[![Platform](https://img.shields.io/badge/Platform-GitHub%20Copilot%20%2F%20Any%20LLM-00ff88?style=flat-square)](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent)
[![Gates](https://img.shields.io/github/actions/workflow/status/Maijied/Lorapok-Labs-Bible/copilot-setup-steps.yml?branch=main&label=Chrysalis%20Gates&style=flat-square&color=00ff88)](https://github.com/Maijied/Lorapok-Labs-Bible/actions)
[![Manifest](https://img.shields.io/badge/API-lorapok.dev%2Fv1-1a237e?style=flat-square)](../chrysalis.yml)

*"Where ideas metamorphose into shippable code."*

</div>

---

## What is Chrysalis?

**Lorapok Chrysalis** is the primary coding agent in the Lorapok Agent Fleet. It receives task assignments, follows brand-specific playbooks, enforces design system compliance through Brand Guard, and opens polished pull requests — all without human intervention.

Just as a chrysalis transforms a larva into something beautiful, this agent transforms raw task descriptions into **shippable, on-brand code**.

---

## How It Works

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   1. RECEIVE TASK                                            │
│      └─▶ From Copilot panel, issue assignment, or API        │
│                                                              │
│   2. LOAD CONTEXT                                            │
│      └─▶ Reads .github/copilot-instructions.md               │
│      └─▶ Identifies matching playbook                        │
│      └─▶ Loads .lorapok/chrysalis.yml for brand rules        │
│                                                              │
│   3. EXECUTE                                                 │
│      └─▶ Follows playbook checklist step-by-step             │
│      └─▶ Creates/modifies files using Biological UI style    │
│      └─▶ Respects all guardrails (no Tailwind, no any, etc.) │
│                                                              │
│   4. VALIDATE (Chrysalis Gates)                              │
│      └─▶ Gate 1: Brand Guard scan                            │
│      └─▶ Gate 2: ESLint (zero errors)                        │
│      └─▶ Gate 3: TypeScript + Vite build                     │
│                                                              │
│   5. DELIVER                                                 │
│      └─▶ Opens PR on feature branch                          │
│      └─▶ Sentinel (CodeRabbit) auto-reviews                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Configuration

### Primary Config: `.github/copilot-instructions.md`

This file is loaded automatically by GitHub Copilot's coding agent on every task. It contains:

- Agent identity and fleet context
- Project snapshot (tech stack, layout)
- Playbook system reference
- Coding conventions (Biological UI)
- Validation requirements (Chrysalis Gates)
- Hard guardrails

### Setup Workflow: `.github/workflows/copilot-setup-steps.yml`

Pre-installs dependencies and runs validation gates before the agent's firewall engages:

```yaml
jobs:
  copilot-setup-steps:  # ← This exact name is required
    steps:
      - Checkout
      - Setup Node 20
      - npm ci (in app/)
      - Gate 1: Brand Guard
      - Gate 2: Lint
      - Gate 3: Build
```

---

## Activation

### With GitHub Copilot License

1. Go to repo **Settings** → **Copilot** → **Coding agent** → Enable
2. Assign tasks from the **Agents** tab
3. Chrysalis automatically reads its instructions

### Without Copilot License (Alternative LLMs)

Chrysalis is designed to work with **any LLM that has GitHub access**. The instructions in `.github/copilot-instructions.md` are universal — they work equally well when:

- Fed to Claude/GPT via MCP GitHub tools
- Used with Cursor, Windsurf, or other AI editors
- Loaded by SWE-agent or OpenHands as context
- Referenced by any AI with repo access

Simply ensure the LLM reads `.github/copilot-instructions.md` and `.lorapok/chrysalis.yml` before starting work.

---

## Playbooks

Chrysalis selects the appropriate playbook based on task context:

| Task Pattern | Playbook | What It Does |
|-------------|----------|-------------|
| "Add a new page" | `add-page.md` | Create component + CSS Module + route + nav entry |
| "Add a product" | `add-product.md` | Add to data layer with correct type shape |
| "Add achievement/skill" | `add-data-entry.md` | Append to typed arrays with proper icons |
| "Extract component" | `refactor-component.md` | Split, create CSS Module, update parent |

---

## Chrysalis Gates

Every commit must pass sequentially:

| Gate | Command | What It Checks |
|------|---------|---------------|
| 1 | `node .lorapok/scripts/brand-guard.mjs` | Brand compliance (8 rules) |
| 2 | `cd app && npm run lint` | ESLint zero errors |
| 3 | `npm run build` | TypeScript + Vite bundle |

If any gate fails, Chrysalis must fix the issue before pushing.

---

## Guardrails

These are hard-coded into both Brand Guard and the instructions:

| Forbidden | Reason |
|-----------|--------|
| `BrowserRouter` | GitHub Pages requires HashRouter |
| Tailwind CSS | Project uses CSS Modules + tokens |
| styled-components / Emotion | Conflicts with Biological UI |
| Express / Fastify / Koa | Zero-backend static site |
| `any` type | TypeScript strict mode |
| `React.FC` | Deprecated pattern |
| Hardcoded data in pages | Must use data layer |

---

## Example Task Flow

**Issue:** *"Add a /changelog page showing release history"*

1. Chrysalis identifies this matches `add-page` playbook
2. Creates `app/src/pages/ChangelogPage.tsx` with framer-motion animation
3. Creates `app/src/pages/ChangelogPage.module.css` with glassmorphic styling
4. Adds route in `App.tsx`
5. Adds nav entry in `app/src/data/navigation.ts`
6. Runs Brand Guard → ✓
7. Runs lint → ✓
8. Runs build → ✓
9. Opens PR: `feat: add changelog page`
10. Sentinel auto-reviews the PR

---

## Marketplace Readiness

Chrysalis is designed to become a standalone product:

| Feature | Marketplace Value |
|---------|------------------|
| Versioned manifest (`lorapok.dev/v1`) | Machine-readable agent config |
| Playbook system | Extensible task recipes |
| Brand Guard engine | Zero-dep, portable compliance |
| Universal instructions | Works with any LLM platform |
| Branded output | Professional CLI aesthetics |

---

<div align="center">

**Part of the [Lorapok Agent Fleet](../README.md)**

◈ Chrysalis · [◈ Sentinel](sentinel.md) · [◈ Morpheus](morpheus.md)

</div>
