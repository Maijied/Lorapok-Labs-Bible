import styles from './StatusBar.module.css';

export default function StatusBar() {
  return (
    <footer className={styles.statusbar}>
      <div className={styles.left}>
        <span className={styles.dot} />
        <span>Connected</span>
      </div>
      <div className={styles.center}>
        <span>v1.0.0</span>
        <span className={styles.divider}>|</span>
        <span>Lorapok Labs Bible</span>
      </div>
      <div className={styles.right}>
        <kbd className={styles.kbd}>Ctrl+K</kbd>
        <span>Command</span>
      </div>
    </footer>
  );
}
