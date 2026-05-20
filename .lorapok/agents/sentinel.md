<div align="center">

<br/>

# ◈ Lorapok Sentinel

**The AI Code Reviewer**

[![Platform](https://img.shields.io/badge/Platform-CodeRabbit-00e5ff?style=flat-square)](https://github.com/marketplace/coderabbitai)
[![Cost](https://img.shields.io/badge/Cost-Free%20for%20OSS-00ff88?style=flat-square)](https://www.coderabbit.ai/oss)
[![Config](https://img.shields.io/badge/Config-.coderabbit.yaml-1a237e?style=flat-square)](../../.coderabbit.yaml)

*"Every line reviewed. Every PR guarded."*

</div>

---

## What is Sentinel?


**Lorapok Sentinel** is the AI code reviewer in the Lorapok Agent Fleet. It watches every pull request opened against this repository — whether by humans, Chrysalis, or Morpheus — and provides contextual, brand-aware code reviews with inline suggestions.

Powered by [CodeRabbit](https://github.com/marketplace/coderabbitai) (free for open-source projects), Sentinel understands the Biological UI design system and enforces architectural decisions at review time.

---

## How It Works

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   1. PR OPENED (by human, Chrysalis, or Morpheus)            │
│      └─▶ CodeRabbit webhook fires automatically              │
│                                                              │
│   2. LOAD CONTEXT                                            │
│      └─▶ Reads .coderabbit.yaml configuration                │
│      └─▶ Applies path-specific review instructions           │
│      └─▶ Loads knowledge base (learnings from past reviews)  │
│                                                              │
│   3. REVIEW                                                  │
│      └─▶ High-level summary of changes                       │
│      └─▶ Sequence diagrams for complex flows                 │
│      └─▶ Inline suggestions on each file                     │
│      └─▶ Brand compliance checks (Biological UI)             │
│      └─▶ Security analysis                                   │
│                                                              │
│   4. DELIVER                                                 │
│      └─▶ Posts review comments directly on the PR            │
│      └─▶ Requests changes if violations found                │
│      └─▶ Auto-replies to follow-up questions                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Configuration

### File: `.coderabbit.yaml` (repo root)

Sentinel's brain — defines review behavior, path-specific instructions, and knowledge base.


### Path-Specific Intelligence

Sentinel applies different review rules based on file location:

| Path | Review Focus |
|------|-------------|
| `app/src/components/**` | Biological UI compliance, CSS Modules, accessibility |
| `app/src/pages/**` | No hardcoded data, HashRouter, framer-motion animations |
| `app/src/data/**` | Type compliance, valid Lucide icons, HTTPS URLs |
| `app/src/styles/**` | Token integrity, dark-theme-first, no breaking changes |
| `.lorapok/**` | YAML schema, playbook structure, Brand Guard rules |
| `app/package.json` | No forbidden deps (backend, CSS-in-JS, Tailwind) |

### Review Behavior

| Setting | Value | Why |
|---------|-------|-----|
| Profile | `assertive` | Catches more issues, fitting for brand compliance |
| Request changes | `enabled` | Blocks non-compliant PRs from merging |
| Sequence diagrams | `enabled` | Visualizes complex component interactions |
| Auto-reply | `enabled` | Responds to developer questions in threads |
| Draft PRs | `skipped` | Only reviews ready PRs |

---

## Activation

### Step 1: Install CodeRabbit

1. Visit [github.com/marketplace/coderabbitai](https://github.com/marketplace/coderabbitai)
2. Select **"Open Source"** plan (free forever for public repos)
3. Grant access to `Maijied/Lorapok-Labs-Bible`
4. Done — Sentinel activates on the next PR

### Step 2: Verify

Open any PR and look for CodeRabbit's review comment. It should reference the Biological UI guidelines and apply path-specific instructions.

---

## What Sentinel Reviews


### Brand Compliance
- CSS Modules usage (no inline styles for static values)
- Design token usage (no hardcoded colors)
- HashRouter enforcement
- No forbidden dependencies

### Code Quality
- TypeScript strictness (no `any`)
- Component structure (no React.FC, proper prop types)
- Data layer usage (no hardcoded arrays in pages)
- Import organization

### Security
- Dependency vulnerability scanning
- Secret detection
- Safe URL patterns

### Architecture
- Proper file placement (ui/ vs layout/ vs pages/)
- Route registration completeness
- Navigation entry consistency

---

## Interacting with Sentinel

### Accept a Suggestion
Just click "Commit suggestion" on any inline comment.

### Ask a Question
Reply to any Sentinel comment — it auto-replies with context.

### Override a Review
If Sentinel flags something incorrectly, reply explaining why. It learns from the interaction for future reviews.

### Ignore Specific Files
The `.coderabbit.yaml` already excludes:
- `app/package-lock.json`
- `app/dist/**`
- `**/*.min.js` / `**/*.min.css`

---

## Why CodeRabbit?

| Feature | Benefit for Lorapok |
|---------|-------------------|
| Free for OSS | No license cost for public repos |
| Path-specific rules | Different standards for components vs data vs styles |
| Knowledge base | Learns from past reviews, gets smarter over time |
| Auto-reply | Developers can ask "why?" and get instant answers |
| GitHub native | Shows up as regular PR review comments |
| Sequence diagrams | Auto-generated for complex component changes |

---

## Sentinel + Fleet Integration

```
Morpheus opens PR ──▶ Sentinel reviews ──▶ CI runs Gates ──▶ Merge
Chrysalis opens PR ──▶ Sentinel reviews ──▶ CI runs Gates ──▶ Merge
Human opens PR ────▶ Sentinel reviews ──▶ CI runs Gates ──▶ Merge
```

Every PR goes through Sentinel regardless of who opened it. This ensures consistent quality even when AI agents make mistakes.

---

<div align="center">

**Part of the [Lorapok Agent Fleet](../README.md)**

[◈ Chrysalis](chrysalis.md) · ◈ Sentinel · [◈ Morpheus](morpheus.md)

</div>
