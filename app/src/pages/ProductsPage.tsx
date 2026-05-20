import { motion } from 'framer-motion';
import {
  Globe, Music, Activity, Keyboard, Ticket, FileText, Flame, Bot, ExternalLink,
} from 'lucide-react';
import { products } from '@/data/products';
import GlassCard from '@/components/ui/GlassCard';
import HexBadge from '@/components/ui/HexBadge';
import styles from './ProductsPage.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Globe, Music, Activity, Keyboard, Ticket, FileText, Flame, Bot,
};

export default function ProductsPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.header}>
        <h1>Products</h1>
        <p>The complete Lorapok Labs ecosystem — built solo, open source, MIT licensed.</p>
      </div>

      <div className={styles.grid}>
        {products.map((product, i) => {
          const Icon = iconMap[product.icon];
          return (
            <GlassCard key={product.id} href={product.url} delay={i * 0.08}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {Icon && <Icon size={22} />}
                </div>
                <div className={styles.status} data-status={product.status}>
                  {product.status}
                </div>
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.tagline}>{product.tagline}</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.platforms}>
                {product.platforms.map((p) => (
                  <HexBadge key={p} label={p} />
                ))}
              </div>
              {product.github && (
                <div className={styles.link}>
                  <ExternalLink size={12} /> View
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </motion.div>
  );
}
