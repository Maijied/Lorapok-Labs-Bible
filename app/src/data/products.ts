import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'atlas',
    name: 'Lorapok Atlas',
    tagline: 'API Directory',
    description:
      'Browse and live-test 2100+ free open-source APIs across 34 categories. Zero config, zero signup. Available as Web App, VS Code Extension, MCP Server, npm package, and REST API.',
    icon: 'Globe',
    platforms: ['Web', 'VS Code', 'MCP', 'npm', 'REST API'],
    status: 'active',
    url: 'https://producthunt.com/products/lorapok-atlas-api-directory',
    github: 'https://github.com/Maijied',
    color: 'var(--neon-green)',
  },
  {
    id: 'media-player',
    name: 'Lorapok Media Player',
    tagline: 'Cross-Platform Player',
    description:
      'A cross-platform media player for Web, Windows, Mac & Linux. Available on npm and Snapcraft.',
    icon: 'Music',
    platforms: ['Web', 'Windows', 'Mac', 'Linux', 'npm', 'Snapcraft'],
    status: 'active',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
  {
    id: 'laravel-monitor',
    name: 'Lorapok Laravel Monitor',
    tagline: 'Execution Monitor',
    description:
      'Zero-config real-time execution monitor for Laravel applications. Available on Packagist.',
    icon: 'Activity',
    platforms: ['PHP', 'Laravel', 'Packagist'],
    status: 'active',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
  {
    id: 'keyboard',
    name: 'Lorapok Keyboard',
    tagline: 'AI Bangla Keyboard',
    description:
      'AI-powered Bangla NLP keyboard for Android with intelligent text prediction and contextual suggestions.',
    icon: 'Keyboard',
    platforms: ['Android'],
    status: 'active',
    url: 'https://lorapok.github.io',
  },
  {
    id: 'spotlight-tickets',
    name: 'Spotlight Tickets',
    tagline: 'Event Ticketing',
    description:
      'Self-hosted open-source event ticketing platform. Full-featured, customizable, and privacy-first.',
    icon: 'Ticket',
    platforms: ['Web', 'Self-hosted'],
    status: 'active',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
  {
    id: 'linpad',
    name: 'Linpad',
    tagline: 'Text Editor',
    description: 'A minimalist text editor for Ubuntu. Clean, fast, and distraction-free.',
    icon: 'FileText',
    platforms: ['Ubuntu', 'Linux'],
    status: 'active',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
  {
    id: 'roast',
    name: 'Roast as a Service',
    tagline: 'Multi-platform API',
    description:
      'A fun multi-platform roasting API available on npm, PyPI, and Packagist. Because developers need humor too.',
    icon: 'Flame',
    platforms: ['npm', 'PyPI', 'Packagist'],
    status: 'active',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
  {
    id: 'ai-agent',
    name: 'Lorapok AI Agent',
    tagline: 'Coding Agent',
    description:
      'An intelligent coding agent built on top of AI APIs. Assists with code generation, debugging, and refactoring.',
    icon: 'Bot',
    platforms: ['CLI', 'API'],
    status: 'beta',
    url: 'https://lorapok.github.io',
    github: 'https://github.com/Maijied',
  },
];
