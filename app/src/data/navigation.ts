import type { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: 'Home' },
  { id: 'products', label: 'Products', path: '/products', icon: 'Boxes' },
  { id: 'atlas', label: 'Atlas', path: '/atlas', icon: 'Globe' },
  { id: 'about', label: 'About', path: '/about', icon: 'User' },
  { id: 'brand', label: 'Brand', path: '/brand', icon: 'Palette' },
  { id: 'research', label: 'Research', path: '/research', icon: 'FlaskConical' },
  { id: 'connect', label: 'Connect', path: '/connect', icon: 'Link2' },
];
