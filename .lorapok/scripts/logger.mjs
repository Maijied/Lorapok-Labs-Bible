#!/usr/bin/env node
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  LORAPOK AGENT FLEET — Logger v1.0.0                                       ║
// ║  Branded logging utility with CyberLarva ASCII animations.                 ║
// ║  "Silent optimization, visible when it matters."                           ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
//
// Zero-dependency logger for the Lorapok Agent Fleet.
// Writes to console (with ANSI colors) AND to .lorapok/logs/ (plain text).
//
// Usage:
//   import { Logger } from './logger.mjs';
//   const log = new Logger('brand-guard');
//   log.success('All checks passed');
//   log.error('Violation found', { file: 'App.tsx', line: 42 });
//   log.info('Scanning files...');
//   log.larva('idle');    // Show larva animation frame
//   log.flush();         // Write log file

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { cwd } from 'node:process';

// ─── CyberLarva ASCII Art ────────────────────────────────────────────────────

const LARVA_IDLE = `
    ╭───────────────────────────╮
    │    ◈ LORAPOK CYBERLARVA   │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ ◉    ◉ ╲
        │  ╰────╯  │
        │  ┌────┐  │
     ╭──┤  │ ▓▓ │  ├──╮
    ╱╲  │  └────┘  │  ╱╲
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊    ┊──────────────┊    ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ░░░░░░  │  ╲╱
        │  ░░░░░░  │
        ╰──────────╯
`;

const LARVA_SUCCESS = `
    ╭───────────────────────────╮
    │   ✓ CHRYSALIS COMPLETE    │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ ★    ★ ╲
        │  ╰─▽──╯  │    ✨
        │  ┌────┐  │
     ╭──┤  │ ▓▓ │  ├──╮
    ╱╲  │  └────┘  │  ╱╲  ✓
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊    ┊──────────────┊    ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ░░▓▓░░  │  ╲╱
        │  ░░▓▓░░  │
        ╰──────────╯
     ⚡ All systems nominal ⚡
`;

const LARVA_ERROR = `
    ╭───────────────────────────╮
    │   ✖ VIOLATION DETECTED    │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ ✖    ✖ ╲
        │  ╰─△──╯  │    ⚠
        │  ┌────┐  │
     ╭──┤  │ !! │  ├──╮
    ╱╲  │  └────┘  │  ╱╲  ✖
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊    ┊──────────────┊    ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ▓▓▓▓▓▓  │  ╲╱
        │  ▓▓▓▓▓▓  │
        ╰──────────╯
     🔥 Brand breach found 🔥
`;

const LARVA_WORKING = `
    ╭───────────────────────────╮
    │   ◈ SCANNING CODEBASE     │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ ◉    ◉ ╲
        │  ╰────╯  │    ⟳
        │  ┌────┐  │
     ╭──┤  │ .. │  ├──╮
    ╱╲  │  └────┘  │  ╱╲  ~
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊ >> ┊──────────────┊ >> ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ▒▒▒▒▒▒  │  ╲╱
        │  ▒▒▒▒▒▒  │
        ╰──────────╯
     ⚙ Processing files... ⚙
`;

const LARVA_MORPHEUS = `
    ╭───────────────────────────╮
    │   ◈ MORPHEUS RESOLVING    │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ ◉    ◉ ╲
        │  ╰────╯  │    🔧
        │  ┌────┐  │
     ╭──┤  │ AI │  ├──╮
    ╱╲  │  └────┘  │  ╱╲  →
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊ ◈◈ ┊──────────────┊ ◈◈ ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ▓▒▓▒▓▒  │  ╲╱
        │  ▒▓▒▓▒▓  │
        ╰──────────╯
   🧬 Autonomous resolution 🧬
`;

const LARVA_SENTINEL = `
    ╭───────────────────────────╮
    │   ◈ SENTINEL REVIEWING    │
    ╰───────────────────────────╯
          ╭──────╮
         ╱ 👁    👁 ╲
        │  ╰────╯  │    🔍
        │  ┌────┐  │
     ╭──┤  │ CR │  ├──╮
    ╱╲  │  └────┘  │  ╱╲  ✎
   ╱  ╲ ╰──────────╯ ╱  ╲
  ┊    ┊══════════════┊    ┊
  ┊ << ┊──────────────┊ << ┊
   ╲  ╱ ╭──────────╮ ╲  ╱
    ╲╱  │  ░▒░▒░▒  │  ╲╱
        │  ▒░▒░▒░  │
        ╰──────────╯
    📝 Code review in progress 📝
`;

const LARVA_MAP = {
  idle: LARVA_IDLE,
  success: LARVA_SUCCESS,
  error: LARVA_ERROR,
  working: LARVA_WORKING,
  morpheus: LARVA_MORPHEUS,
  sentinel: LARVA_SENTINEL,
};

// ─── Colors ──────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  neonGreen: '\x1b[38;2;0;255;136m',
  neonCyan: '\x1b[38;2;0;229;255m',
  neonRed: '\x1b[38;2;255;107;53m',
};

// ─── Logger Class ────────────────────────────────────────────────────────────

export class Logger {
  constructor(agentName = 'fleet', options = {}) {
    this.agentName = agentName;
    this.entries = [];
    this.startTime = Date.now();
    this.logDir = join(cwd(), '.lorapok', 'logs');
    this.silent = options.silent || false;
    this.noFile = options.noFile || false;
  }

  // ─── Public API ──────────────────────────────────────────────────────

  larva(state = 'idle') {
    if (this.silent) return;
    const art = LARVA_MAP[state] || LARVA_MAP.idle;
    const colored = state === 'error'
      ? `${C.neonRed}${art}${C.reset}`
      : state === 'success'
        ? `${C.neonGreen}${art}${C.reset}`
        : `${C.neonCyan}${art}${C.reset}`;
    console.log(colored);
    this._record('LARVA', state);
  }

  header(title) {
    if (!this.silent) {
      console.log('');
      console.log(`  ${C.cyan}╔${'═'.repeat(56)}╗${C.reset}`);
      console.log(`  ${C.cyan}║${C.reset}  ${C.neonGreen}◈ ${title}${C.reset}${' '.repeat(Math.max(0, 53 - title.length))}${C.cyan}║${C.reset}`);
      console.log(`  ${C.cyan}║${C.reset}  ${C.gray}"No PR ships off-brand."${C.reset}${' '.repeat(29)}${C.cyan}║${C.reset}`);
      console.log(`  ${C.cyan}╚${'═'.repeat(56)}╝${C.reset}`);
      console.log('');
    }
    this._record('HEADER', title);
  }

  success(msg, meta = null) {
    if (!this.silent) {
      console.log(`  ${C.neonGreen}✓${C.reset} ${msg}`);
      if (meta) console.log(`    ${C.gray}${JSON.stringify(meta)}${C.reset}`);
    }
    this._record('SUCCESS', msg, meta);
  }

  error(msg, meta = null) {
    if (!this.silent) {
      console.log(`  ${C.neonRed}✖${C.reset} ${C.red}${msg}${C.reset}`);
      if (meta) console.log(`    ${C.gray}${JSON.stringify(meta)}${C.reset}`);
    }
    this._record('ERROR', msg, meta);
  }

  warn(msg, meta = null) {
    if (!this.silent) {
      console.log(`  ${C.yellow}⚠${C.reset} ${C.yellow}${msg}${C.reset}`);
      if (meta) console.log(`    ${C.gray}${JSON.stringify(meta)}${C.reset}`);
    }
    this._record('WARN', msg, meta);
  }

  info(msg, meta = null) {
    if (!this.silent) {
      console.log(`  ${C.neonCyan}◈${C.reset} ${msg}`);
      if (meta) console.log(`    ${C.gray}${JSON.stringify(meta)}${C.reset}`);
    }
    this._record('INFO', msg, meta);
  }

  divider() {
    if (!this.silent) {
      console.log(`  ${C.gray}${'─'.repeat(56)}${C.reset}`);
    }
  }

  summary(stats) {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);
    if (!this.silent) {
      this.divider();
      console.log(`  ${C.gray}Agent: ${C.neonCyan}${this.agentName}${C.reset}`);
      console.log(`  ${C.gray}Duration: ${C.cyan}${elapsed}s${C.reset}`);
      if (stats.files) console.log(`  ${C.gray}Files scanned: ${C.cyan}${stats.files}${C.reset}`);
      if (stats.errors !== undefined) {
        if (stats.errors === 0 && (!stats.warnings || stats.warnings === 0)) {
          console.log(`  ${C.neonGreen}✓ All brand checks passed. The chrysalis holds.${C.reset}`);
        } else {
          if (stats.errors > 0) console.log(`  ${C.red}✖ ${stats.errors} error${stats.errors > 1 ? 's' : ''}${C.reset} (blocking)`);
          if (stats.warnings > 0) console.log(`  ${C.yellow}⚠ ${stats.warnings} warning${stats.warnings > 1 ? 's' : ''}${C.reset} (advisory)`);
        }
      }
      console.log('');
    }
    this._record('SUMMARY', `Completed in ${elapsed}s`, stats);
  }

  // ─── Log File Output ─────────────────────────────────────────────────

  async flush() {
    if (this.noFile) return null;

    try {
      await mkdir(this.logDir, { recursive: true });
    } catch { /* exists */ }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${this.agentName}_${timestamp}.log`;
    const filepath = join(this.logDir, filename);

    const header = [
      '╔══════════════════════════════════════════════════════════════╗',
      `║  LORAPOK ${this.agentName.toUpperCase()} — Log File`,
      `║  Generated: ${new Date().toISOString()}`,
      `║  Duration: ${((Date.now() - this.startTime) / 1000).toFixed(2)}s`,
      '╚══════════════════════════════════════════════════════════════╝',
      '',
    ].join('\n');

    const body = this.entries.map(e => {
      const ts = new Date(e.time).toISOString().slice(11, 23);
      const meta = e.meta ? ` | ${JSON.stringify(e.meta)}` : '';
      return `[${ts}] [${e.level.padEnd(7)}] ${e.msg}${meta}`;
    }).join('\n');

    const content = header + body + '\n';

    await writeFile(filepath, content, 'utf-8');
    return filepath;
  }

  // ─── Internal ────────────────────────────────────────────────────────

  _record(level, msg, meta = null) {
    this.entries.push({ time: Date.now(), level, msg, meta });
  }
}

// ─── Standalone Banner (for CI steps) ────────────────────────────────────────

export function printBanner(agent = 'LORAPOK AGENT FLEET', subtitle = '') {
  console.log('');
  console.log(`  ${C.cyan}╔${'═'.repeat(56)}╗${C.reset}`);
  console.log(`  ${C.cyan}║${C.reset}  ${C.neonGreen}◈ ${agent}${C.reset}${' '.repeat(Math.max(0, 53 - agent.length))}${C.cyan}║${C.reset}`);
  if (subtitle) {
    console.log(`  ${C.cyan}║${C.reset}  ${C.gray}${subtitle}${C.reset}${' '.repeat(Math.max(0, 53 - subtitle.length))}${C.cyan}║${C.reset}`);
  }
  console.log(`  ${C.cyan}╚${'═'.repeat(56)}╝${C.reset}`);
  console.log('');
}

// ─── Export larvae art for external use ──────────────────────────────────────

export const LARVAE = LARVA_MAP;
