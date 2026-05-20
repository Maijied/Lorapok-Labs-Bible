#!/usr/bin/env node
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  LORAPOK CHRYSALIS — Brand Guard Engine                                    ║
// ║  Zero-dependency brand compliance scanner.                                 ║
// ║  "No PR ships off-brand."                                                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
//
// This script scans the `app/src/` directory for patterns that violate the
// Lorapok Biological UI design system and project architecture rules.
//
// It is designed to run in CI (copilot-setup-steps) AND locally before commits.
// Zero dependencies — uses only Node.js built-ins (fs, path, readline).
//
// Exit codes:
//   0 = All checks passed
//   1 = Brand violations detected
//
// Usage:
//   node .lorapok/scripts/brand-guard.mjs
//   node .lorapok/scripts/brand-guard.mjs --verbose
//   node .lorapok/scripts/brand-guard.mjs --fix-suggestions

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { argv, exit, cwd } from 'node:process';

// ─── Configuration ───────────────────────────────────────────────────────────

const ROOT = cwd();
const SCAN_DIR = join(ROOT, 'app', 'src');
const VERBOSE = argv.includes('--verbose');
const FIX_SUGGESTIONS = argv.includes('--fix-suggestions');

const SCAN_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.json',
]);

// Each rule has:
//   id        — unique short identifier
//   pattern   — RegExp to match
//   message   — human-readable violation description
//   severity  — 'error' (blocks PR) or 'warn' (advisory)
//   suggestion — optional fix hint
const RULES = [
  {
    id: 'no-browser-router',
    pattern: /BrowserRouter/g,
    message: 'BrowserRouter detected — HashRouter is required for GitHub Pages.',
    severity: 'error',
    suggestion: "Replace 'BrowserRouter' with 'HashRouter' from react-router-dom.",
  },
  {
    id: 'no-tailwind',
    pattern: /tailwindcss|@tailwind|tw`|className=.*"[^"]*\b(flex|grid|p-|m-|text-|bg-)\b/g,
    message: 'Tailwind CSS pattern detected — use CSS Modules + design tokens.',
    severity: 'error',
    suggestion: 'Use .module.css files with custom properties from tokens.css.',
  },
  {
    id: 'no-css-in-js',
    pattern: /styled-components|@emotion\/|css-in-js|styled\(|css`/g,
    message: 'CSS-in-JS library detected — project uses CSS Modules exclusively.',
    severity: 'error',
    suggestion: 'Create a colocated .module.css file instead.',
  },
  {
    id: 'no-backend-deps',
    pattern: /(?:from|require\s*\()\s*['"](?:express|fastify|koa|hono|next|nuxt)['"]/g,
    message: 'Backend/SSR framework import detected — this is a zero-backend static site.',
    severity: 'error',
    suggestion: 'Remove the server-side dependency. This project deploys to GitHub Pages.',
  },
  {
    id: 'no-any-type',
    pattern: /:\s*any\b(?!\s*\/\*\s*brand-guard-ignore)/g,
    message: 'TypeScript `any` type used — prefer `unknown` and narrow.',
    severity: 'warn',
    suggestion: "Replace 'any' with 'unknown' and add type narrowing logic.",
  },
  {
    id: 'no-inline-color',
    pattern: /style=\{[^}]*(?:color|background|backgroundColor)\s*:\s*['"]#(?!000|fff)/gi,
    message: 'Hardcoded color in inline style — use design tokens (CSS custom properties).',
    severity: 'warn',
    suggestion: 'Use var(--color-primary), var(--color-secondary), etc. from tokens.css.',
  },
  {
    id: 'no-direct-main-push',
    pattern: /git\s+push\s+(?:origin\s+)?main/g,
    message: 'Direct push to main detected in script/docs — use feature branches.',
    severity: 'warn',
    suggestion: 'Push to a feature branch and open a PR instead.',
  },
  {
    id: 'no-react-fc',
    pattern: /:\s*React\.FC\b|:\s*FC\b</g,
    message: 'React.FC usage detected — prefer explicit return types on plain functions.',
    severity: 'warn',
    suggestion: 'Remove React.FC and type props directly: function Comp(props: Props) { ... }',
  },
  {
    id: 'no-hardcoded-data-in-pages',
    pattern: /\/pages\/.*\.tsx.*(?:const\s+(?:products|achievements|skills|socialLinks)\s*=\s*\[)/gs,
    message: 'Hardcoded data array in page file — use the data layer (app/src/data/).',
    severity: 'warn',
    suggestion: 'Move the array to the appropriate file in app/src/data/ and import it.',
  },
];

// ─── Scanner ─────────────────────────────────────────────────────────────────

/** @typedef {{ rule: typeof RULES[0], file: string, line: number, col: number, match: string }} Violation */

/** Recursively collect file paths under a directory. */
async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      files.push(...await collectFiles(fullPath));
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

/** Find line and column for a character offset in content. */
function getLineCol(content, offset) {
  const lines = content.slice(0, offset).split('\n');
  return { line: lines.length, col: lines[lines.length - 1].length + 1 };
}

/** Scan a single file against all rules. */
function scanFile(filePath, content) {
  /** @type {Violation[]} */
  const violations = [];

  for (const rule of RULES) {
    // Special case: page-specific rule only applies to page files
    if (rule.id === 'no-hardcoded-data-in-pages') {
      if (!filePath.includes('/pages/')) continue;
    }

    // Reset regex state
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;

    while ((match = regex.exec(content)) !== null) {
      // Check for inline ignore comment on same line
      const lineStart = content.lastIndexOf('\n', match.index) + 1;
      const lineEnd = content.indexOf('\n', match.index);
      const lineContent = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);

      if (lineContent.includes('brand-guard-ignore')) continue;

      const { line, col } = getLineCol(content, match.index);
      violations.push({
        rule,
        file: relative(ROOT, filePath),
        line,
        col,
        match: match[0].slice(0, 60),
      });
    }
  }

  return violations;
}

// ─── Reporter ────────────────────────────────────────────────────────────────

function printHeader() {
  console.log('');
  console.log('  \x1b[36m╔══════════════════════════════════════════════════╗\x1b[0m');
  console.log('  \x1b[36m║\x1b[0m  \x1b[32m◈ LORAPOK CHRYSALIS — Brand Guard\x1b[0m              \x1b[36m║\x1b[0m');
  console.log('  \x1b[36m║\x1b[0m  \x1b[90m"No PR ships off-brand."\x1b[0m                       \x1b[36m║\x1b[0m');
  console.log('  \x1b[36m╚══════════════════════════════════════════════════╝\x1b[0m');
  console.log('');
}

function printViolation(v, index) {
  const icon = v.rule.severity === 'error' ? '\x1b[31m✖\x1b[0m' : '\x1b[33m⚠\x1b[0m';
  const sevColor = v.rule.severity === 'error' ? '\x1b[31m' : '\x1b[33m';

  console.log(`  ${icon} ${sevColor}${v.rule.id}\x1b[0m`);
  console.log(`    \x1b[90m${v.file}:${v.line}:${v.col}\x1b[0m`);
  console.log(`    ${v.rule.message}`);

  if (FIX_SUGGESTIONS && v.rule.suggestion) {
    console.log(`    \x1b[36m↳ Fix: ${v.rule.suggestion}\x1b[0m`);
  }

  if (VERBOSE) {
    console.log(`    \x1b[90mMatched: "${v.match}"\x1b[0m`);
  }

  console.log('');
}

function printSummary(errors, warnings, filesScanned) {
  console.log('  \x1b[90m─────────────────────────────────────────────────\x1b[0m');
  console.log(`  Files scanned: \x1b[36m${filesScanned}\x1b[0m`);

  if (errors === 0 && warnings === 0) {
    console.log('  \x1b[32m✓ All brand checks passed. The chrysalis holds.\x1b[0m');
  } else {
    if (errors > 0) {
      console.log(`  \x1b[31m✖ ${errors} error${errors > 1 ? 's' : ''}\x1b[0m (blocking)`);
    }
    if (warnings > 0) {
      console.log(`  \x1b[33m⚠ ${warnings} warning${warnings > 1 ? 's' : ''}\x1b[0m (advisory)`);
    }
  }

  console.log('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  printHeader();

  // Verify scan directory exists
  try {
    await stat(SCAN_DIR);
  } catch {
    console.error(`  \x1b[31m✖ Scan directory not found: ${SCAN_DIR}\x1b[0m`);
    console.error('  \x1b[90mRun this script from the repository root.\x1b[0m');
    exit(1);
  }

  const files = await collectFiles(SCAN_DIR);
  const allViolations = [];

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const violations = scanFile(file, content);
    allViolations.push(...violations);
  }

  // Sort: errors first, then warnings
  allViolations.sort((a, b) => {
    if (a.rule.severity === b.rule.severity) return 0;
    return a.rule.severity === 'error' ? -1 : 1;
  });

  // Print violations
  for (let i = 0; i < allViolations.length; i++) {
    printViolation(allViolations[i], i);
  }

  const errors = allViolations.filter(v => v.rule.severity === 'error').length;
  const warnings = allViolations.filter(v => v.rule.severity === 'warn').length;

  printSummary(errors, warnings, files.length);

  // Exit with error code if any blocking violations found
  exit(errors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('  \x1b[31m✖ Brand Guard crashed:\x1b[0m', err.message);
  exit(1);
});
