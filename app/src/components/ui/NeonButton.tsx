import { cn } from '@/utils/cn';
import styles from './NeonButton.module.css';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
}: NeonButtonProps) {
  const classes = cn(styles.button, styles[variant], styles[size], className);

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
