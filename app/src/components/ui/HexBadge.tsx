import { cn } from '@/utils/cn';
import styles from './HexBadge.module.css';

interface HexBadgeProps {
  label: string;
  variant?: 'cyan' | 'green' | 'blue';
}

export default function HexBadge({ label, variant = 'cyan' }: HexBadgeProps) {
  return <span className={cn(styles.badge, styles[variant])}>{label}</span>;
}
