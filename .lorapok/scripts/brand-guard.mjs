#!/usr/bin/env node
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  LORAPOK CHRYSALIS — Brand Guard Engine v1.0.0                             ║
// ║  Zero-dependency brand compliance scanner.                                 ║
// ║  "No PR ships off-brand."                                                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
//
// Scans `app/src/` for patterns that violate the Lorapok Biological UI design
// system and project architecture rules.
//
// Runs in CI (copilot-setup-steps, openhands-resolver) AND locally.
// Zero dependencies — uses only Node.js built-ins (fs, path).
//
// Exit codes:
//   0 = All checks passed
//   1 = Brand violations detected (errors)
//   2 = Script error
//
// Usage:
//   node .lorapok/scripts/brand-guard.mjs
//   node .lorapok/scripts/brand-guard.mjs --verbose
//   node .lorapok/scripts/brand-guard.mjs --fix-suggestions
//   node .lorapok/scripts/brand-guard.mjs --json

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { argv, exit, cwd } from 'node:process';

// ─── Configuration ───────────────────────────────────────────────────────────

const ROOT = cwd();
const SCAN_DIR = join(ROOT, 'app', 'src');
const VERBOSE = argv.includes('--verbose');
const FIX_SUGGESTIONS = argv.includes('--fix-suggestions');
const JSON_OUTPUT = argv.includes('--json');

const SCAN_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.json',
]);

// ─── Rules ───────────────────────────────────────────────────────────────────

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
    pattern: /tailwindcss|@tailwind|tw`/g,
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
    message: 'Backend/SSR framework import detected — zero-backend static site.',
    severity: 'error',
    suggestion: 'Remove the server-side dependency. This project deploys to GitHub Pages.',
  },
  {
    id: 'no-any-type',
    pattern: /:\s*any\b(?!\s*\/\*\s*brand-guard-ignore)/g,
    message: 'TypeScript `any` type used — prefer `unknown` and narrow.',
    severity: 'warn',
    suggestion: "Replace 'any' with 'unknown' and add type narrowing.",
  },
  {
    id: 'no-inline-color',
    pattern: /style=\{[^}]*(?:color|background|backgroundColor)\s*:\s*['"]#(?!000|fff)/gi,
    message: 'Hardcoded color in inline style — use design tokens.',
    severity: 'warn',
    suggestion: 'Use var(--color-primary), var(--color-secondary), etc.',
  },
  {
    id: 'no-react-fc',
    pattern: /:\s*React\.FC\b|:\s*FC</g,
    message: 'React.FC usage detected — prefer explicit return types.',
    severity: 'warn',
    suggestion: 'Remove React.FC; type props directly: function Comp(props: Props) {}',
  },
  {
    id: 'no-direct-main-push',
    pattern: /git\s+push\s+(?:origin\s+)?main/g,
    message: 'Direct push to main referenced — use feature branches.',
    severity: 'warn',
    suggestion: 'Push to a feature branch and open a PR instead.',
  },
];

// ─── Scanner ─────────────────────────────────────────────────────────────────

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

function getLineCol(content, offset) {
  const lines = content.slice(0, offset).split('\n');
  return { line: lines.length, col: lines[lines.length - 1].length + 1 };
}

function scanFile(filePath, content) {
  const violations = [];
  for (const rule of RULES) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
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
  if (JSON_OUTPUT) return;
  console.log('');
  console.log('  \x1b[36m╔══════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('  \x1b[36m║\x1b[0m  \x1b[32m◈ LORAPOK CHRYSALIS — Brand Guard v1.0.0\x1b[0m           \x1b[36m║\x1b[0m');
  console.log('  \x1b[36m║\x1b[0m  \x1b[90m"No PR ships off-brand."\x1b[0m                             \x1b[36m║\x1b[0m');
  console.log('  \x1b[36m╚══════════════════════════════════════════════════════════╝\x1b[0m');
  console.log('');
}

function printViolation(v) {
  if (JSON_OUTPUT) return;
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
  if (JSON_OUTPUT) return;
  console.log('  \x1b[90m──────────────────────────────────────────────────────────\x1b[0m');
  console.log(`  Files scanned: \x1b[36m${filesScanned}\x1b[0m`);
  if (errors === 0 && warnings === 0) {
    console.log('  \x1b[32m✓ All brand checks passed. The chrysalis holds.\x1b[0m');
  } else {
    if (errors > 0) console.log(`  \x1b[31m✖ ${errors} error${errors > 1 ? 's' : ''}\x1b[0m (blocking)`);
    if (warnings > 0) console.log(`  \x1b[33m⚠ ${warnings} warning${warnings > 1 ? 's' : ''}\x1b[0m (advisory)`);
  }
  console.log('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  printHeader();

  try {
    await stat(SCAN_DIR);
  } catch {
    if (JSON_OUTPUT) {
      console.log(JSON.stringify({ error: `Scan directory not found: ${SCAN_DIR}` }));
    } else {
      console.error(`  \x1b[31m✖ Scan directory not found: ${SCAN_DIR}\x1b[0m`);
      console.error('  \x1b[90mRun this script from the repository root.\x1b[0m');
    }
    exit(2);
  }

  const files = await collectFiles(SCAN_DIR);
  const allViolations = [];

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    allViolations.push(...scanFile(file, content));
  }

  allViolations.sort((a, b) => {
    if (a.rule.severity === b.rule.severity) return 0;
    return a.rule.severity === 'error' ? -1 : 1;
  });

  if (JSON_OUTPUT) {
    console.log(JSON.stringify({
      filesScanned: files.length,
      errors: allViolations.filter(v => v.rule.severity === 'error').length,
      warnings: allViolations.filter(v => v.rule.severity === 'warn').length,
      violations: allViolations.map(v => ({
        id: v.rule.id,
        severity: v.rule.severity,
        file: v.file,
        line: v.line,
        col: v.col,
        message: v.rule.message,
        suggestion: v.rule.suggestion,
      })),
    }, null, 2));
  } else {
    for (const v of allViolations) printViolation(v);
  }

  const errors = allViolations.filter(v => v.rule.severity === 'error').length;
  const warnings = allViolations.filter(v => v.rule.severity === 'warn').length;

  printSummary(errors, warnings, files.length);
  exit(errors > 0 ? 1 : 0);
}

main().catch((err) => {
  if (JSON_OUTPUT) {
    console.log(JSON.stringify({ error: err.message }));
  } else {
    console.error('  \x1b[31m✖ Brand Guard crashed:\x1b[0m', err.message);
  }
  exit(2);
});
