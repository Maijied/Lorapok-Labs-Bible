import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { name: 'PHP', category: 'language', proficiency: 95 },
  { name: 'TypeScript', category: 'language', proficiency: 90 },
  { name: 'JavaScript', category: 'language', proficiency: 92 },
  { name: 'Python', category: 'language', proficiency: 80 },
  { name: 'Java/Kotlin', category: 'language', proficiency: 70 },

  // Frameworks
  { name: 'Laravel', category: 'framework', proficiency: 95 },
  { name: 'React', category: 'framework', proficiency: 88 },
  { name: 'Node.js', category: 'framework', proficiency: 85 },
  { name: 'Android', category: 'framework', proficiency: 72 },

  // Tools
  { name: 'MySQL', category: 'tool', proficiency: 90 },
  { name: 'Git / GitHub Actions', category: 'tool', proficiency: 92 },
  { name: 'Docker', category: 'tool', proficiency: 78 },

  // Platforms
  { name: 'Cloudflare Workers', category: 'platform', proficiency: 85 },
  { name: 'Linux/Ubuntu', category: 'platform', proficiency: 88 },
  { name: 'AWS', category: 'platform', proficiency: 72 },
];
