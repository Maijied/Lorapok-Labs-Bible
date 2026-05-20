# GitHub Copilot Coding Agent — Repo Instructions

These instructions are loaded automatically by the GitHub Copilot Coding Agent
(the "cloud agent") on every task in this repository. Keep them concise,
actionable, and current.

## Project Snapshot

**Lorapok Labs Bible** is the official website and brand guide for the Lorapok
Labs ecosystem. It is a fully static, JSON-driven Progressive Web App deployed
to GitHub Pages.

- Live site: https://maijied.github.io/Lorapok-Labs-Bible/
- Default branch: `main`
- Deploys automatically on push to `main` via `.github/workflows/deploy.yml`.

## Tech Stack

- **Framework:** React 19 + TypeScript (strict)
- **Build:** Vite 8
- **Routing:** React Router v7 (`HashRouter` — required for GitHub Pages)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Styling:** CSS Modules + custom properties (design tokens in
  `app/src/styles/tokens.css`)
- **PWA:** `vite-plugin-pwa`
- **Node:** v20 (matches CI)

## Repository Layout

This is a monorepo-style layout. The application lives in `app/`, **not** at
the repo root. Always run npm commands from inside `app/`.

```
.
├── .github/
│   ├── workflows/        CI + deploy + copilot-setup-steps
│   └── copilot-instructions.md   (this file)
├── app/                  React + Vite application (npm root)
│   ├── src/
│   │   ├── components/   layout/, mascot/, ui/
│   │   ├── data/         JSON-style content modules (achievements, products, …)
│   │   ├── pages/        one folder-less page per route
│   │   ├── styles/       globals.css, tokens.css, animations.css
│   │   ├── types/        shared TS types
│   │   └── utils/        cn.ts and other small helpers
│   ├── public/           static assets, icons, favicon
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── plan/                 design + architecture notes (markdown)
└── README.md
```

## Commands (run from `app/`)

| Task        | Command          |
|-------------|------------------|
| Install     | `npm ci`         |
| Dev server  | `npm run dev`    |
| Build       | `npm run build`  |
| Lint        | `npm run lint`   |
| Preview     | `npm run preview`|

`npm run build` runs `tsc -b && vite build`, so a build failure may be a
TypeScript error rather than a Vite error. Read the output carefully.

## Validation Before Opening a PR

Before pushing, the agent **must** run from the `app/` directory:

1. `npm run lint`   — must pass with zero errors.
2. `npm run build`  — must complete successfully (this is what CI runs).

If either fails, fix the issue before pushing. Do not push commits that break
the build.

There is no test suite at present, so do not invent one unless the task
explicitly asks for it.

## Coding Conventions

- **TypeScript:** strict mode is on. No `any` unless unavoidable; prefer
  `unknown` and narrow. Export types from `app/src/types/index.ts` when shared.
- **Components:** function components, PascalCase filenames, colocated
  `.module.css` next to the component (e.g. `GlassCard.tsx` +
  `GlassCard.module.css`).
- **Styling:** use CSS Modules and the design tokens defined in
  `app/src/styles/tokens.css`. Avoid inline styles for anything other than
  dynamic values that genuinely need them.
- **Class joining:** use the `cn` helper in `app/src/utils/cn.ts`.
- **Routing:** keep using `HashRouter`; switching to `BrowserRouter` will break
  GitHub Pages deep links.
- **Content data:** new products, skills, achievements, social links, and
  navigation entries belong in `app/src/data/*.ts`, not hardcoded in pages.
- **Imports:** relative imports inside `app/src` (no path aliases configured).
- **Formatting:** Prettier config lives at `app/.prettierrc`. Match existing
  file style.

## PR Guidelines

- Keep PRs focused on a single concern.
- Title format: `<type>: <short summary>` (e.g. `feat: add Atlas filter chip`,
  `fix: correct sidebar collapse on mobile`, `chore: …`, `docs: …`).
- In the description, list what changed and how it was verified
  (`npm run lint`, `npm run build`, manual check, etc.).
- Do not commit `app/dist/` or `node_modules/`.
- Do not edit `app/package-lock.json` by hand — let `npm` regenerate it.

## Things to Avoid

- Adding a backend, database, or server-side code — this site is intentionally
  zero-backend.
- Introducing a CSS-in-JS library or Tailwind — the project uses CSS Modules
  and tokens by design.
- Replacing `HashRouter` with `BrowserRouter`.
- Pushing directly to `main`.
