<div align="center">

<br/>

# ◈ Lorapok Morpheus

**The Autonomous Issue Resolver**

[![Platform](https://img.shields.io/badge/Platform-OpenHands-ff6b35?style=flat-square)](https://github.com/All-Hands-AI/OpenHands)
[![Cost](https://img.shields.io/badge/Cost-Free%20%2B%20BYOK-00ff88?style=flat-square)](https://docs.all-hands.dev)
[![Trigger](https://img.shields.io/badge/Trigger-label%3A%20fix--me-ff6b35?style=flat-square)](../../.github/workflows/openhands-resolver.yml)

*"From issue to pull request, autonomously."*

</div>

---

## What is Morpheus?


**Lorapok Morpheus** is the autonomous issue resolver in the Lorapok Agent Fleet. When you label a GitHub issue with `fix-me` (or comment `@openhands-agent`), Morpheus spins up a sandboxed environment, analyzes the codebase, implements a fix, and opens a pull request — completely autonomously.

Powered by [OpenHands](https://github.com/All-Hands-AI/OpenHands) (open-source, bring-your-own-key), Morpheus works **without requiring a GitHub Copilot license**.

---

## How It Works

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   1. TRIGGER                                                 │
│      └─▶ Issue labeled 'fix-me'                              │
│      └─▶ OR comment '@openhands-agent' on any issue          │
│                                                              │
│   2. ENVIRONMENT SETUP                                       │
│      └─▶ GitHub Actions spins up Ubuntu runner               │
│      └─▶ Checks out repo, installs Node 20, runs npm ci      │
│      └─▶ Injects LLM credentials from secrets                │
│                                                              │
│   3. RESOLVE                                                 │
│      └─▶ OpenHands reads the issue description               │
│      └─▶ Loads Morpheus macro (brand rules, validation)      │
│      └─▶ Explores codebase, identifies relevant files        │
│      └─▶ Implements fix following Biological UI guidelines    │
│      └─▶ Runs Chrysalis Gates (Brand Guard + lint + build)   │
│                                                              │
│   4. DELIVER                                                 │
│      └─▶ Creates branch: fix/<issue-slug>                    │
│      └─▶ Opens PR with fix description                       │
│      └─▶ Sentinel auto-reviews the PR                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Configuration

### Workflow: `.github/workflows/openhands-resolver.yml`

Triggers on:
- `issues` event with `labeled` action (when label = `fix-me`)
- `issue_comment` event (when comment starts with `@openhands-agent`)

### Required Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Required | Description | Example |
|--------|----------|-------------|---------|
| `LLM_API_KEY` | ✅ | Your LLM provider API key | `sk-ant-api03-...` |
| `LLM_MODEL` | ❌ | Model identifier (defaults to Claude Sonnet) | `anthropic/claude-sonnet-4-20250514` |
| `LLM_BASE_URL` | ❌ | Custom LLM endpoint | `https://api.openai.com/v1` |


### Supported LLM Providers

| Provider | Model | `LLM_MODEL` Value |
|----------|-------|-------------------|
| Anthropic | Claude Sonnet 4 | `anthropic/claude-sonnet-4-20250514` |
| Anthropic | Claude Opus 4 | `anthropic/claude-opus-4-20250514` |
| OpenAI | GPT-4o | `openai/gpt-4o` |
| OpenAI | GPT-4.1 | `openai/gpt-4.1` |
| Google | Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| DeepSeek | DeepSeek V3 | `deepseek/deepseek-chat` |
| Local | Ollama (any model) | Set `LLM_BASE_URL` to your endpoint |

---

## Activation

### Step 1: Add Secrets

1. Go to repo **Settings** → **Secrets and variables** → **Actions**
2. Add `LLM_API_KEY` with your provider's API key
3. (Optional) Add `LLM_MODEL` if not using the default

### Step 2: Test It

1. Create a test issue: *"The sidebar doesn't collapse on mobile viewport"*
2. Add the label `fix-me`
3. Watch the **Actions** tab — Morpheus will start resolving
4. A PR will appear within minutes

### Step 3: Review

Morpheus opens a PR → Sentinel auto-reviews → You approve or request changes.

---

## Morpheus Macro

The workflow injects brand-specific instructions into OpenHands:

```
You are Lorapok Morpheus, an autonomous issue resolver.

CRITICAL CONTEXT:
- App lives in app/, NOT the repo root
- React 19 + TypeScript + Vite 8 + HashRouter
- CSS Modules + design tokens
- Check .lorapok/playbooks/ for recipes
- Check .lorapok/chrysalis.yml for manifest

BEFORE OPENING A PR, you MUST pass:
1. node .lorapok/scripts/brand-guard.mjs
2. cd app && npm run lint
3. npm run build

GUARDRAILS:
- No BrowserRouter, No Tailwind, No CSS-in-JS
- No backend deps, No `any` type
- Data in app/src/data/*.ts only
```

This ensures Morpheus follows the same rules as Chrysalis and human developers.

---

## Usage Patterns

### Bug Fixes
```
Issue: "Navigation link to /research is broken"
Label: fix-me
→ Morpheus checks App.tsx routes, finds the issue, fixes it
```

### Simple Features
```
Issue: "Add LinkedIn social link to the Connect page"
Label: fix-me
→ Morpheus adds entry to social-links.ts data file
```

### Refactoring
```
Issue: "Extract the hero section from HomePage into its own component"
Label: fix-me
→ Morpheus reads refactor-component playbook, creates new component
```


### What Morpheus Should NOT Handle

- Complex multi-page architectural changes
- Design system overhauls
- Dependency major version upgrades
- Anything requiring human judgment on UX

For these, use Chrysalis (with human guidance) or do it manually.

---

## Why OpenHands?

| Feature | Benefit for Lorapok |
|---------|-------------------|
| **Open source** | No vendor lock-in, full transparency |
| **BYOK** | Use any LLM provider (Anthropic, OpenAI, local) |
| **GitHub-native** | Runs as a GitHub Action, no external infra |
| **Sandboxed** | Each resolution runs in an isolated environment |
| **Free** | Only pay for LLM API calls (your own key) |
| **No Copilot required** | Works without any GitHub Copilot license |

---

## Cost Estimation

Morpheus costs = LLM API usage per resolution attempt.

| Model | Avg Cost per Issue | Speed |
|-------|-------------------|-------|
| Claude Sonnet 4 | ~$0.05–0.20 | Fast |
| GPT-4o | ~$0.03–0.15 | Fast |
| DeepSeek V3 | ~$0.01–0.05 | Medium |
| Local Ollama | Free (your hardware) | Varies |

Typical simple fixes cost under $0.10. Complex multi-file changes may cost up to $0.50.

---

## Morpheus + Fleet Integration

```
1. You label issue 'fix-me'
2. Morpheus resolves → opens PR
3. Sentinel reviews the PR automatically
4. CI runs Chrysalis Gates (Brand Guard + lint + build)
5. You review and merge (or request changes)
```

If Morpheus's fix isn't perfect:
- Comment feedback on the PR
- Comment `@openhands-agent` to request another attempt
- Or fix it manually — Sentinel will re-review

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow doesn't trigger | Verify issue has `fix-me` label (exact match) |
| LLM error | Check `LLM_API_KEY` secret is valid and not expired |
| Fix is incorrect | Comment `@openhands-agent try again with: <guidance>` |
| Times out | Reduce issue complexity, or use a faster model |
| Brand Guard fails | Morpheus should auto-fix; if not, the PR will show the failure |

---

<div align="center">

**Part of the [Lorapok Agent Fleet](../README.md)**

[◈ Chrysalis](chrysalis.md) · [◈ Sentinel](sentinel.md) · ◈ Morpheus

</div>
