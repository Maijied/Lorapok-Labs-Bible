import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Boxes,
  Globe,
  User,
  Palette,
  FlaskConical,
  Link2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { navigation } from '@/data/navigation';
import { cn } from '@/utils/cn';
import styles from './Sidebar.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Home,
  Boxes,
  Globe,
  User,
  Palette,
  FlaskConical,
  Link2,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className={cn(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>L</div>
        {!collapsed && <span className={styles.logoText}>Lorapok</span>}
      </div>

      <nav className={styles.nav}>
        {navigation.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              className={cn(styles.navItem, isActive && styles.active)}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
            >
              {Icon && <Icon size={18} />}
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button className={styles.toggle} onClick={onToggle} aria-label="Toggle sidebar">
        {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>
    </aside>
  );
}
