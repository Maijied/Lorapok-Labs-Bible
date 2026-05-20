import { motion } from 'framer-motion';
import { Globe, Code2, Puzzle, Bot, Server, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import styles from './AtlasPage.module.css';

const platforms = [
  { icon: Globe, label: 'Web App', desc: 'Live HTTP testing in browser, code snippets in JS, Python, cURL & Go' },
  { icon: Puzzle, label: 'VS Code Extension', desc: 'Search & insert API snippets without leaving your editor' },
  { icon: Bot, label: 'MCP Server', desc: 'Plug into Claude, Cursor or Kiro and ask for APIs' },
  { icon: Code2, label: 'npm Package', desc: 'Typed, zero-dependency JS/TS library with searchApis(), getApi()' },
  { icon: Server, label: 'REST API', desc: 'Deployed on Cloudflare Workers, auto-deployed via CI/CD' },
];

const codeExamples: Record<string, string> = {
  JavaScript: `import { searchApis } from 'lorapok-atlas';

const results = await searchApis('weather');
console.log(results);`,
  Python: `import requests

response = requests.get(
  'https://atlas-api.lorapok.workers.dev/search?q=weather'
)
print(response.json())`,
  cURL: `curl -s "https://atlas-api.lorapok.workers.dev/search?q=weather" | jq`,
  Go: `resp, _ := http.Get(
  "https://atlas-api.lorapok.workers.dev/search?q=weather")
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)`,
};

export default function AtlasPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <div className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.badge}>
            <Zap size={12} /> Flagship Product
          </div>
          <h1>
            Lorapok <span className={styles.accent}>Atlas</span>
          </h1>
          <p className={styles.subtitle}>
            Browse and live-test 2100+ free open-source APIs across 34 categories.
            Zero config, zero signup.
          </p>
          <div className={styles.statsRow}>
            <span className={styles.stat}><strong>2100+</strong> APIs</span>
            <span className={styles.stat}><strong>34</strong> Categories</span>
            <span className={styles.stat}><strong>5</strong> Platforms</span>
          </div>
          <div className={styles.actions}>
            <NeonButton href="https://producthunt.com/products/lorapok-atlas-api-directory">
              View on Product Hunt
            </NeonButton>
            <NeonButton variant="ghost" href="https://github.com/Maijied">
              Source Code
            </NeonButton>
          </div>
        </motion.div>
      </div>

      {/* Multi-platform */}
      <section className={styles.section}>
        <h2>Available Everywhere</h2>
        <div className={styles.platformGrid}>
          {platforms.map((p, i) => (
            <GlassCard key={p.label} delay={i * 0.1}>
              <div className={styles.platformIcon}>
                <p.icon size={24} />
              </div>
              <h4>{p.label}</h4>
              <p className={styles.platformDesc}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Code examples */}
      <section className={styles.section}>
        <h2>Quick Start</h2>
        <div className={styles.codeGrid}>
          {Object.entries(codeExamples).map(([lang, code]) => (
            <div key={lang} className={styles.codeBlock}>
              <div className={styles.codeLang}>{lang}</div>
              <pre className={styles.codeContent}>
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
