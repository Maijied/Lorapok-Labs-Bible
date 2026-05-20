export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  platforms: string[];
  status: 'active' | 'beta' | 'archived';
  url: string;
  github?: string;
  color?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  year?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 0-100
}
