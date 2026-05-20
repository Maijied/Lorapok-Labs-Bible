import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  delay?: number;
}

export default function GlassCard({ children, className, onClick, href, delay = 0 }: GlassCardProps) {
  const content = (
    <motion.div
      className={cn(styles.card, className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {content}
      </a>
    );
  }

  return content;
}
