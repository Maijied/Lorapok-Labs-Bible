import { motion } from 'framer-motion';
import {
  Code2, Award, Rocket, MessageCircle, Camera, Users, Briefcase, Globe, Layers, ExternalLink,
} from 'lucide-react';
import { socialLinks } from '@/data/social-links';
import GlassCard from '@/components/ui/GlassCard';
import styles from './ConnectPage.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github: Code2, Linkedin: Award, Rocket, MessageCircle, Instagram: Camera, Facebook: Users, Briefcase, Globe, Layers,
};

export default function ConnectPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.header}>
        <h1>Connect</h1>
        <p>Find Lorapok Labs and Mohammad Maizied across the internet.</p>
      </div>

      {/* Links grid */}
      <div className={styles.grid}>
        {socialLinks.map((link, i) => {
          const Icon = iconMap[link.icon];
          return (
            <GlassCard key={link.id} href={link.url} delay={i * 0.06}>
              <div className={styles.linkContent}>
                <div className={styles.linkIcon}>
                  {Icon && <Icon size={24} />}
                </div>
                <div className={styles.linkInfo}>
                  <h3 className={styles.linkName}>{link.name}</h3>
                  <p className={styles.linkUrl}>
                    {link.url.replace('https://', '').replace('www.', '')}
                  </p>
                </div>
                <ExternalLink size={14} className={styles.arrow} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Open to opportunities */}
      <section className={styles.opportunity}>
        <h2>Open to Opportunities</h2>
        <p>
          Currently looking for remote senior engineering roles and founding engineer opportunities
          at growth-stage startups globally. Open to equity-based compensation.
        </p>
        <p className={styles.interests}>
          Interests: Backend architecture, distributed systems, developer tools,
          open-source infrastructure, and AI-assisted development.
        </p>
      </section>
    </motion.div>
  );
}
