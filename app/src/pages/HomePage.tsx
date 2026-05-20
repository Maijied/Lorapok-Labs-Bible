import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CyberLarva from '@/components/mascot/CyberLarva';
import NeonButton from '@/components/ui/NeonButton';
import styles from './HomePage.module.css';

const stats = [
  { value: '8', label: 'Products' },
  { value: '6+', label: 'Years' },
  { value: '2100+', label: 'APIs (Atlas)' },
  { value: '34', label: 'Categories' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.p
            className={styles.badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Independent Open-Source Ecosystem
          </motion.p>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Building the Future.
            <br />
            <span className={styles.accent}>One Line at a Time.</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Lorapok Labs creates experimental open-source developer tools with a signature
            &ldquo;Biological UI&rdquo; aesthetic. Products that feel alive.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NeonButton onClick={() => navigate('/products')}>
              Explore Products <ArrowRight size={14} />
            </NeonButton>
            <NeonButton variant="ghost" href="https://github.com/maijied">
              <Code2 size={14} /> GitHub
            </NeonButton>
          </motion.div>
        </div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CyberLarva size={240} />
        </motion.div>
      </div>

      <motion.div
        className={styles.stats}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
