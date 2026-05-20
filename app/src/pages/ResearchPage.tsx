import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import styles from './ResearchPage.module.css';

const themes = [
  {
    title: 'Zero-Config Efficiency',
    description: 'Tools that work out of the box. No setup, no boilerplate, no configuration fatigue. Install and go.',
    icon: '01',
  },
  {
    title: 'Silent Background Optimization',
    description: 'Like the biological mascot itself — systems that quietly consume bottlenecks, optimize resources, and improve performance without user intervention.',
    icon: '02',
  },
  {
    title: 'Playful Neuroscience',
    description: 'Interfaces that delight through subtle motion, luminescence, and organic feedback. The brain responds to living things — our UIs exploit that.',
    icon: '03',
  },
  {
    title: 'Digital Metamorphosis',
    description: 'Software evolves. Continuously ship, iterate, transform. Each version is a new larval stage closer to its final form.',
    icon: '04',
  },
];

export default function ResearchPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.header}>
        <h1>Research & Philosophy</h1>
        <p>The principles that guide every line of code at Lorapok Labs.</p>
      </div>

      {/* Core Philosophy */}
      <section className={styles.section}>
        <div className={styles.quote}>
          <blockquote>
            &ldquo;The best products aren&apos;t built overnight — they&apos;re built consistently, one shipped feature at a time. That&apos;s the only philosophy I know.&rdquo;
          </blockquote>
          <cite>— Mohammad Maizied Hasan Majumder</cite>
        </div>
      </section>

      {/* Core Themes */}
      <section className={styles.section}>
        <h2>Core Themes</h2>
        <div className={styles.themeGrid}>
          {themes.map((theme, i) => (
            <GlassCard key={theme.title} delay={i * 0.1}>
              <span className={styles.themeIcon}>{theme.icon}</span>
              <h3 className={styles.themeTitle}>{theme.title}</h3>
              <p className={styles.themeDesc}>{theme.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className={styles.section}>
        <h2>Open Source Commitment</h2>
        <div className={styles.commitmentContent}>
          <p>
            Every product in the Lorapok Labs ecosystem is open source under the MIT license.
            We believe developer tools should be free, transparent, and community-driven.
          </p>
          <p>
            The source code is a living document — readable, maintainable, and welcoming to contributors.
            No proprietary lock-in. No hidden dependencies. Just clean, honest engineering.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className={styles.section}>
        <h2>Future Vision</h2>
        <div className={styles.commitmentContent}>
          <p>
            Lorapok Labs is building toward an interconnected ecosystem where each tool
            enhances the others. Atlas provides API discovery. The AI Agent generates integration code.
            The Media Player handles content. The Monitor ensures performance.
          </p>
          <p>
            The end state: a complete, self-reinforcing development environment that feels less like
            a toolbox and more like a living workspace — adapting, learning, and growing alongside the developer.
          </p>
        </div>
      </section>
    </motion.div>
  );
}
