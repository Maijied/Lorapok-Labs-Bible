import styles from './CyberLarva.module.css';

interface CyberLarvaProps {
  size?: number;
  className?: string;
}

export default function CyberLarva({ size = 200, className }: CyberLarvaProps) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.mascot}
      >
        {/* Body segments */}
        <ellipse cx="100" cy="120" rx="55" ry="50" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
        <ellipse cx="100" cy="100" rx="48" ry="42" fill="#222" stroke="#444" strokeWidth="1" />
        <ellipse cx="100" cy="85" rx="40" ry="35" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />

        {/* Armor plating details */}
        <path d="M65 90 Q100 70 135 90" stroke="#333" strokeWidth="0.5" fill="none" />
        <path d="M70 105 Q100 85 130 105" stroke="#333" strokeWidth="0.5" fill="none" />
        <path d="M60 120 Q100 100 140 120" stroke="#333" strokeWidth="0.5" fill="none" />

        {/* Neon circuit patterns */}
        <path d="M75 100 L85 95 L95 100 L100 95" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" className={styles.circuit} />
        <path d="M105 95 L110 100 L120 95 L125 100" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" className={styles.circuit} />

        {/* Eyes (large, glowing) */}
        <circle cx="85" cy="75" r="12" fill="#111" stroke="#00ff88" strokeWidth="1.5" />
        <circle cx="115" cy="75" r="12" fill="#111" stroke="#00ff88" strokeWidth="1.5" />
        <circle cx="85" cy="75" r="6" fill="#00ff88" className={styles.eyeGlow} />
        <circle cx="115" cy="75" r="6" fill="#00ff88" className={styles.eyeGlow} />
        <circle cx="83" cy="73" r="2" fill="#fff" opacity="0.8" />
        <circle cx="113" cy="73" r="2" fill="#fff" opacity="0.8" />

        {/* Small robotic legs */}
        <line x1="70" y1="140" x2="60" y2="155" stroke="#444" strokeWidth="2" strokeLinecap="round" />
        <line x1="85" y1="145" x2="78" y2="160" stroke="#444" strokeWidth="2" strokeLinecap="round" />
        <line x1="115" y1="145" x2="122" y2="160" stroke="#444" strokeWidth="2" strokeLinecap="round" />
        <line x1="130" y1="140" x2="140" y2="155" stroke="#444" strokeWidth="2" strokeLinecap="round" />

        {/* Leg joints */}
        <circle cx="60" cy="155" r="2.5" fill="#00ff88" opacity="0.5" />
        <circle cx="78" cy="160" r="2.5" fill="#00ff88" opacity="0.5" />
        <circle cx="122" cy="160" r="2.5" fill="#00ff88" opacity="0.5" />
        <circle cx="140" cy="155" r="2.5" fill="#00ff88" opacity="0.5" />

        {/* Antenna */}
        <line x1="90" y1="55" x2="82" y2="40" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="110" y1="55" x2="118" y2="40" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="82" cy="40" r="3" fill="#00e5ff" className={styles.antennaTip} />
        <circle cx="118" cy="40" r="3" fill="#00e5ff" className={styles.antennaTip} />
      </svg>
    </div>
  );
}
