import { motion } from 'framer-motion';
import CyberLarva from '@/components/mascot/CyberLarva';
import GlassCard from '@/components/ui/GlassCard';
import styles from './BrandPage.module.css';

const colors = [
  { name: 'Void Black', hex: '#050505', color: '#050505' },
  { name: 'Primary BG', hex: '#0a0a0a', color: '#0a0a0a' },
  { name: 'Neon Green', hex: '#00ff88', color: '#00ff88' },
  { name: 'Neon Cyan', hex: '#00e5ff', color: '#00e5ff' },
  { name: 'Hex Blue', hex: '#1a237e', color: '#1a237e' },
  { name: 'Surface', hex: '#222222', color: '#222222' },
  { name: 'Text Primary', hex: '#f0f0f0', color: '#f0f0f0' },
  { name: 'Text Muted', hex: '#a0a0a0', color: '#a0a0a0' },
];

const principles = [
  { title: 'Living Interfaces', desc: 'Elements have idle states that pulse and breathe subtly.' },
  { title: 'Depth & Dimension', desc: 'Layered glassmorphism creates volumetric depth.' },
  { title: 'Neon Luminescence', desc: 'Light emanates from within, not projected from outside.' },
  { title: 'Industrial Precision', desc: 'Clean edges, geometric patterns, hexagonal grids.' },
  { title: 'Silent Power', desc: 'Minimal motion, maximum impact when it moves.' },
];

export default function BrandPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.header}>
        <h1>Brand Identity</h1>
        <p>The visual language of Lorapok Labs — &ldquo;Products That Feel Alive.&rdquo;</p>
      </div>

      {/* Mascot */}
      <section className={styles.section}>
        <h2>The Mascot</h2>
        <div className={styles.mascotShowcase}>
          <CyberLarva size={200} />
          <div className={styles.mascotInfo}>
            <h3>Cybernetic Black Soldier Fly Larva</h3>
            <p>Plump, segmented, cute, and friendly with small robotic legs and large, expressive, glowing eyes.</p>
            <p>Materials: Sleek dark-metallic/charcoal armor plating fused with bright, glowing neon-green panels.</p>
            <p>Symbolism: The ultimate &ldquo;Friendly Helper&rdquo; that silently consumes bottlenecks and optimizes systems in the background.</p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className={styles.section}>
        <h2>Color Palette</h2>
        <div className={styles.colorGrid}>
          {colors.map((c) => (
            <div key={c.hex} className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ backgroundColor: c.color }} />
              <div className={styles.colorMeta}>
                <p className={styles.colorName}>{c.name}</p>
                <p className={styles.colorHex}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <h2>Typography</h2>
        <div className={styles.typeSpecimen}>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Display</span>
            <span style={{ fontFamily: 'Inter', fontSize: '2rem', fontWeight: 900 }}>
              Building the Future
            </span>
          </div>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Heading</span>
            <span style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 700 }}>
              Lorapok Labs Ecosystem
            </span>
          </div>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Body</span>
            <span style={{ fontFamily: 'Inter', fontSize: '1rem' }}>
              Products that feel alive, built with precision.
            </span>
          </div>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Mono</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: 'var(--neon-green)' }}>
              const future = buildOneLineAtATime();
            </span>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className={styles.section}>
        <h2>Design Principles</h2>
        <div className={styles.principles}>
          {principles.map((p, i) => (
            <GlassCard key={p.title} delay={i * 0.08}>
              <p className={styles.principleNum}>0{i + 1}</p>
              <h4 className={styles.principleTitle}>{p.title}</h4>
              <p className={styles.principleDesc}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
