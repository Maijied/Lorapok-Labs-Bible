<p align="center">
  <br/>
  <br/>
</p>

<h1 align="center">
  <code>◈</code> Lorapok Chrysalis
</h1>

<p align="center">
  <strong>Where ideas metamorphose into shippable code.</strong>
</p>

<p align="center">
  <a href="https://github.com/Maijied/Lorapok-Labs-Bible/actions"><img src="https://img.shields.io/github/actions/workflow/status/Maijied/Lorapok-Labs-Bible/copilot-setup-steps.yml?branch=main&label=Chrysalis%20Gates&style=flat-square&logo=github&logoColor=white&color=00ff88" alt="Chrysalis Gates" /></a>
  <a href="https://github.com/Maijied/Lorapok-Labs-Bible"><img src="https://img.shields.io/github/license/Maijied/Lorapok-Labs-Bible?style=flat-square&color=00e5ff" alt="License" /></a>
  <a href="https://github.com/Maijied/Lorapok-Labs-Bible"><img src="https://img.shields.io/badge/node-20-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node 20" /></a>
  <a href="https://github.com/Maijied/Lorapok-Labs-Bible"><img src="https://img.shields.io/badge/zero--deps-brand%20guard-00ff88?style=flat-square" alt="Zero Dependencies" /></a>
  <a href="https://lorapok.github.io/"><img src="https://img.shields.io/badge/Lorapok-Labs-1a237e?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwZmY4OCIgZD0iTTEyIDJMMyA3djEwbDkgNSA5LTV2LTEweiIvPjwvc3ZnPg==" alt="Lorapok Labs" /></a>
</p>

<br/>

```
         ╔══════════════════════════════════════════════════╗
         ║                                                  ║
         ║       ◈◈◈   LORAPOK CHRYSALIS   ◈◈◈            ║
         ║                                                  ║
         ║   ┌─────────────────────────────────────┐       ║
         ║   │  ██████╗██╗  ██╗██████╗ ██╗   ██╗  │       ║
         ║   │ ██╔════╝██║  ██║██╔══██╗╚██╗ ██╔╝  │       ║
         ║   │ ██║     ███████║██████╔╝ ╚████╔╝   │       ║
         ║   │ ██║     ██╔══██║██╔══██╗  ╚██╔╝    │       ║
         ║   │ ╚██████╗██║  ██║██║  ██║   ██║     │       ║
         ║   │  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝     │       ║
         ║   └─────────────────────────────────────┘       ║
         ║                                                  ║
         ║   Brand-Compliant AI Coding Agent               ║
         ║   by Lorapok Labs                               ║
         ║                                                  ║
         ╚══════════════════════════════════════════════════╝
```

---

## What is Lorapok Chrysalis?

**Lorapok Chrysalis** is a brand-aware, playbook-driven GitHub Copilot Coding Agent that ensures every line of AI-generated code respects your design system, architecture decisions, and brand identity.

Just as a chrysalis transforms a larva into something new — this agent transforms task descriptions into **shippable, on-brand pull requests** without human intervention.

### The Problem It Solves

AI coding agents are powerful but brand-blind. They'll happily introduce Tailwind into a CSS Modules project, swap your router, or hardcode data that belongs in a data layer. **Chrysalis prevents that** with:

- **Brand Guard Engine** — a zero-dependency scanner that blocks off-brand patterns at the gate
- **Playbook System** — step-by-step recipes the agent follows for common task types
- **Versioned Manifest** — machine-readable agent configuration (`apiVersion: lorapok.dev/v1`)
- **Chrysalis Gates** — a 3-step validation pipeline that must pass before any PR ships

---

## Features

### Brand Guard Engine

```
  ╔══════════════════════════════════════════════╗
  ║  ◈ LORAPOK CHRYSALIS — Brand Guard          ║
  ║  "No PR ships off-brand."                   ║
  ╚══════════════════════════════════════════════╝

  ✓ All brand checks passed. The chrysalis holds.
```

A zero-dependency Node.js script that scans your source for violations:

| Rule | What It Catches |
|------|----------------|
| `no-browser-router` | BrowserRouter usage (breaks GitHub Pages) |
| `no-tailwind` | Tailwind classes or imports |
| `no-css-in-js` | styled-components, Emotion, etc. |
| `no-backend-deps` | Express, Fastify, Koa imports |
| `no-any-type` | TypeScript `any` without explicit override |
| `no-inline-color` | Hardcoded colors outside design tokens |
| `no-direct-main-push` | References to pushing to main |
| `no-react-fc` | Deprecated `React.FC` pattern |
| `no-hardcoded-data-in-pages` | Data arrays in page components |

**Flags:**
```bash
node .lorapok/scripts/brand-guard.mjs                # Standard run
node .lorapok/scripts/brand-guard.mjs --verbose      # Show matched text
node .lorapok/scripts/brand-guard.mjs --fix-suggestions  # Show fix hints
```

**Inline suppression** (for justified exceptions):
```typescript
const legacy = value as any; // brand-guard-ignore
```

---

### Playbook System

Playbooks are repeatable recipes the agent loads based on task context:

| Playbook | Trigger | File |
|----------|---------|------|
| Add Page | "add a new page/route" | `playbooks/add-page.md` |
| Add Product | "add a product to catalog" | `playbooks/add-product.md` |
| Add Data Entry | "add achievements/skills/links" | `playbooks/add-data-entry.md` |
| Refactor Component | "extract/split a component" | `playbooks/refactor-component.md` |

Each playbook contains:
- Trigger condition
- Step-by-step checklist
- File templates
- Brand rules specific to the task
- Anti-patterns to avoid

---

### Chrysalis Gates (CI Pipeline)

Every commit must pass three sequential gates:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Gate 1          Gate 2          Gate 3                    │
│   ┌──────┐        ┌──────┐        ┌──────┐                │
│   │Brand │───✓───▶│ Lint │───✓───▶│Build │───✓───▶ Ship   │
│   │Guard │        │      │        │      │                  │
│   └──────┘        └──────┘        └──────┘                │
│                                                             │
│   Blocks off-     Zero ESLint     TypeScript +              │
│   brand patterns  errors          Vite bundle               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Agent Manifest

The `chrysalis.yml` manifest uses a custom API schema (`lorapok.dev/v1`) designed for future Lorapok tooling:

```yaml
apiVersion: lorapok.dev/v1
kind: CodingAgent
metadata:
  name: Lorapok Chrysalis
  version: 1.0.0
capabilities:
  playbooks: ...
  validation: ...
  guardrails: ...
```

This enables:
- Auto-discovery by Lorapok CLI tools
- Marketplace listing metadata
- Multi-repo agent orchestration
- Version-controlled agent behavior

---

## Installation

### For Existing Repos

1. Copy the `.lorapok/` directory into your repository root
2. Update `.lorapok/chrysalis.yml` with your project's specifics
3. Update `.github/copilot-instructions.md` with your tech stack
4. Customize Brand Guard rules in `.lorapok/scripts/brand-guard.mjs`
5. Enable GitHub Copilot Coding Agent in repo Settings → Copilot

### File Structure

```
your-repo/
├── .github/
│   ├── copilot-instructions.md     # Agent reads this on every task
│   └── workflows/
│       └── copilot-setup-steps.yml # Pre-task environment setup
└── .lorapok/
    ├── chrysalis.yml               # Agent manifest
    ├── README.md                   # This file
    ├── playbooks/
    │   ├── add-page.md
    │   ├── add-product.md
    │   ├── add-data-entry.md
    │   └── refactor-component.md
    └── scripts/
        └── brand-guard.mjs         # Zero-dep compliance scanner
```

---

## Usage

### Assign a Task

From the GitHub **Agents** tab (or via issue assignment):

1. Create an issue: *"Add a /research page showing current projects"*
2. Assign it to Copilot (or trigger from the Agents panel)
3. Chrysalis will:
   - Load `copilot-instructions.md`
   - Match the task to the `add-page` playbook
   - Follow the checklist step-by-step
   - Run all three Chrysalis Gates
   - Open a clean, on-brand PR

### Run Brand Guard Locally

```bash
# From repo root
node .lorapok/scripts/brand-guard.mjs

# With fix suggestions
node .lorapok/scripts/brand-guard.mjs --fix-suggestions
```

### Customize Rules

Edit the `RULES` array in `.lorapok/scripts/brand-guard.mjs`:

```javascript
{
  id: 'my-custom-rule',
  pattern: /somePattern/g,
  message: 'Human-readable explanation of why this is blocked.',
  severity: 'error',  // 'error' blocks, 'warn' is advisory
  suggestion: 'How to fix it.',
}
```

---

## Extending Chrysalis

### Add a New Playbook

1. Create `.lorapok/playbooks/<task-type>.md`
2. Follow the structure: Trigger → Checklist → Templates → Brand Rules → Anti-Patterns
3. Register it in `chrysalis.yml` under `capabilities.playbooks.catalog`
4. Reference it in `copilot-instructions.md` under the Playbook System table

### Add a Brand Guard Rule

1. Add a new entry to the `RULES` array in `brand-guard.mjs`
2. Test locally: `node .lorapok/scripts/brand-guard.mjs --verbose`
3. Add the rule to the guardrails table in `copilot-instructions.md`

### Multi-Repo Deployment

Chrysalis is designed to be portable. To deploy across multiple repos:

1. Fork/copy the `.lorapok/` directory
2. Customize `chrysalis.yml` metadata per repo
3. Adjust Brand Guard rules for the repo's specific stack
4. The `apiVersion: lorapok.dev/v1` schema stays consistent — enabling future central management

---

## Roadmap to Marketplace

This agent is designed to evolve into a standalone GitHub Marketplace product:

| Phase | Milestone | Status |
|-------|-----------|--------|
| 1 | Single-repo agent with Brand Guard | ✅ Complete |
| 2 | Reusable composite GitHub Action | 🔜 Planned |
| 3 | Lorapok CLI (`npx lorapok init`) | 🔜 Planned |
| 4 | GitHub Marketplace listing | 🔜 Planned |
| 5 | Multi-agent orchestration (Chrysalis Fleet) | 🔜 Planned |

---

## Design Philosophy

Chrysalis follows the **Lorapok Labs** principles:

| Principle | How Chrysalis Embodies It |
|-----------|--------------------------|
| Zero-config efficiency | Drop `.lorapok/` into any repo, agent works immediately |
| Silent background optimization | Brand Guard runs invisibly in CI, only speaks when violated |
| Digital metamorphosis | Tasks enter as raw issues → emerge as polished, on-brand PRs |
| Products That Feel Alive | The agent has personality, branded output, and evolves over time |

---

## The Lorapok Ecosystem

Chrysalis is part of the broader Lorapok Labs family:

| Product | Description |
|---------|-------------|
| [Lorapok Atlas](https://maijied.github.io/Lorapok-API_Atlas/) | API Directory & Discovery |
| [Roast as a Service](https://maijied.github.io/roast-as-a-service/) | Code Roasting Engine |
| [Dynamic Ollama Chat](https://maijied.github.io/Lorapok-Dynamic-Ollama-LLM-Chat-Interface/) | Local LLM Interface |
| [Lorapok AI Agent](https://github.com/Maijied/Lorapok_AI_Agent) | Autonomous AI Agent |
| [Laravel Execution Monitor](https://packagist.org/packages/lorapok/laravel-execution-monitor) | Backend Observability |
| [Lorapok Labs Bible](https://maijied.github.io/Lorapok-Labs-Bible/) | Brand Guide & Website |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `feat/your-feature`
3. Make changes following the [coding conventions](../.github/copilot-instructions.md)
4. Run the Chrysalis Gates locally
5. Open a PR with validation results

---

## License

MIT — Built with 🧬 by [Lorapok Labs](https://lorapok.github.io/)

---

<p align="center">
  <br/>
  <strong><code>◈</code> "Building the Future. One Line at a Time."</strong>
  <br/>
  <br/>
  <a href="https://lorapok.github.io/">Website</a> · <a href="https://github.com/Lorapok">GitHub</a> · <a href="https://www.linkedin.com/showcase/lorapok/">LinkedIn</a> · <a href="https://www.reddit.com/r/LorapokLabs/">Reddit</a> · <a href="https://www.instagram.com/lorapoklabs/">Instagram</a>
  <br/>
  <br/>
</p>
