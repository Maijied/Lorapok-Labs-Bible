import { Minus, Square, X } from 'lucide-react';
import styles from './TitleBar.module.css';
import { cn } from '@/utils/cn';

export default function TitleBar() {
  return (
    <header className={styles.titlebar}>
      <div className={styles.dots}>
        <span className={cn(styles.dot, styles.red)} />
        <span className={cn(styles.dot, styles.yellow)} />
        <span className={cn(styles.dot, styles.green)} />
      </div>
      <span className={styles.title}>Lorapok Labs</span>
      <div className={styles.actions}>
        <Minus size={14} />
        <Square size={12} />
        <X size={14} />
      </div>
    </header>
  );
}
