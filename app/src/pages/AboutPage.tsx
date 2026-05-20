import { motion } from 'framer-motion';
import { Award, Code2, Snowflake, Globe, Trophy, Users } from 'lucide-react';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import styles from './AboutPage.module.css';

const achieveIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Snowflake, Globe, Trophy, Users,
};

export default function AboutPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Bio */}
      <div className={styles.hero}>
        <div className={styles.avatar}>M</div>
        <div className={styles.info}>
          <h1>Mohammad Maizied Hasan Majumder</h1>
          <p className={styles.role}>Senior Software Engineer @ Shohoz Ltd</p>
          <p className={styles.bio}>
            6+ years building production-grade systems at scale. Engineering backend infrastructure at
            Bangladesh&apos;s largest online ticketing platform. During peak seasons (Eid, holidays), our systems
            handle millions of concurrent users — keeping everything smooth, fast, and zero-downtime.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <section className={styles.section}>
        <h2><Code2 size={22} /> Tech Stack</h2>
        <div className={styles.skillGrid}>
          {skills.map((skill) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.skillMeta}>
                <span>{skill.name}</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className={styles.skillBar}>
                <motion.div
                  className={styles.skillFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className={styles.section}>
        <h2><Award size={22} /> Achievements</h2>
        <div className={styles.achievementGrid}>
          {achievements.map((a, i) => {
            const Icon = achieveIcons[a.icon];
            return (
              <GlassCard key={a.id} delay={i * 0.1}>
                {Icon && <div className={styles.achieveIcon}><Icon size={28} /></div>}
                <h4 className={styles.achieveTitle}>{a.title}</h4>
                <p className={styles.achieveDesc}>{a.description}</p>
                {a.year && <p className={styles.achieveYear}>{a.year}</p>}
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Links */}
      <section className={styles.section}>
        <h2>Connect</h2>
        <div className={styles.links}>
          <NeonButton href="https://github.com/maijied">GitHub</NeonButton>
          <NeonButton variant="secondary" href="https://wellfound.com/u/maizied">
            Wellfound
          </NeonButton>
          <NeonButton variant="ghost" href="https://maijied.github.io/Maijied">
            Portfolio
          </NeonButton>
        </div>
      </section>
    </motion.div>
  );
}
