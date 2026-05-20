#!/usr/bin/env node
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  LORAPOK CHRYSALIS — Brand Guard Engine v2.0.0                             ║
// ║  Zero-dependency brand compliance scanner with CyberLarva animations.      ║
// ║  "No PR ships off-brand."                                                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
//
// Scans `app/src/` for patterns that violate the Lorapok Biological UI design
// system and project architecture rules.
//
// Exit codes:  0 = passed | 1 = errors (blocking) | 2 = script crash
//
// Usage:
//   node .lorapok/scripts/brand-guard.mjs
//   node .lorapok/scripts/brand-guard.mjs --verbose
//   node .lorapok/scripts/brand-guard.mjs --fix-suggestions
//   node .lorapok/scripts/brand-guard.mjs --json
//   node .lorapok/scripts/brand-guard.mjs --no-log   (skip log file)

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { argv, exit, cwd } from 'node:process';
import { Logger } from './logger.mjs';

// ─── Configuration ───────────────────────────────────────────────────────────

const ROOT = cwd();
const SCAN_DIR = join(ROOT, 'app', 'src');
const VERBOSE = argv.includes('--verbose');
const FIX_SUGGESTIONS = argv.includes('--fix-suggestions');
const JSON_OUTPUT = argv.includes('--json');
const NO_LOG = argv.includes('--no-log');

const log = new Logger('brand-guard', { silent: JSON_OUTPUT, noFile: NO_LOG });

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
    suggestion: 'Remove the server-side dependency. Deploys to GitHub Pages.',
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
    suggestion: 'Remove React.FC; type props directly.',
  },
  {
    id: 'no-direct-main-push',
    pattern: /git\s+push\s+(?:origin\s+)?main/g,
    message: 'Direct push to main referenced — use feature branches.',
    severity: 'warn',
    suggestion: 'Push to a feature branch and open a PR.',
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

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Show the CyberLarva working animation
  log.larva('working');
  log.header('LORAPOK CHRYSALIS — Brand Guard v2.0.0');

  // Verify scan directory
  try {
    await stat(SCAN_DIR);
  } catch {
    if (JSON_OUTPUT) {
      console.log(JSON.stringify({ error: `Scan directory not found: ${SCAN_DIR}` }));
    } else {
      log.error(`Scan directory not found: ${SCAN_DIR}`);
      log.info('Run this script from the repository root.');
      log.larva('error');
    }
    exit(2);
  }

  // Collect and scan
  const files = await collectFiles(SCAN_DIR);
  log.info(`Scanning ${files.length} files in app/src/...`);

  const allViolations = [];
  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const violations = scanFile(file, content);
    allViolations.push(...violations);
  }

  // Sort: errors first
  allViolations.sort((a, b) => {
    if (a.rule.severity === b.rule.severity) return 0;
    return a.rule.severity === 'error' ? -1 : 1;
  });

  // JSON output mode
  if (JSON_OUTPUT) {
    console.log(JSON.stringify({
      agent: 'lorapok-chrysalis/brand-guard',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
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
    exit(allViolations.filter(v => v.rule.severity === 'error').length > 0 ? 1 : 0);
  }

  // Print violations
  log.divider();
  for (const v of allViolations) {
    if (v.rule.severity === 'error') {
      log.error(`[${v.rule.id}] ${v.file}:${v.line}:${v.col}`, {
        message: v.rule.message,
        ...(FIX_SUGGESTIONS && { fix: v.rule.suggestion }),
        ...(VERBOSE && { matched: v.match }),
      });
    } else {
      log.warn(`[${v.rule.id}] ${v.file}:${v.line}:${v.col}`, {
        message: v.rule.message,
        ...(FIX_SUGGESTIONS && { fix: v.rule.suggestion }),
        ...(VERBOSE && { matched: v.match }),
      });
    }
  }

  const errors = allViolations.filter(v => v.rule.severity === 'error').length;
  const warnings = allViolations.filter(v => v.rule.severity === 'warn').length;

  // Show result larva
  if (errors === 0 && warnings === 0) {
    log.larva('success');
  } else if (errors > 0) {
    log.larva('error');
  }

  // Print summary
  log.summary({ files: files.length, errors, warnings });

  // Write log file
  const logPath = await log.flush();
  if (logPath) {
    log.info(`Log written: ${relative(ROOT, logPath)}`);
  }

  exit(errors > 0 ? 1 : 0);
}

main().catch((err) => {
  log.error(`Brand Guard crashed: ${err.message}`);
  log.larva('error');
  log.flush().then(() => exit(2));
});
