import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'arctic',
    title: 'Arctic Code Vault Contributor',
    description: 'Code preserved in the GitHub Arctic Code Vault for future generations.',
    icon: 'Snowflake',
    year: '2020',
  },
  {
    id: 'mozilla',
    title: 'Mozilla Firefox Localization',
    description: '6 years of contributing to Mozilla Firefox localization for Bangla language.',
    icon: 'Globe',
    year: '2018-2024',
  },
  {
    id: 'hackathon',
    title: '3rd Place — IUT Hackathon',
    description: 'Secured 3rd place at the IUT National Hackathon competition.',
    icon: 'Trophy',
  },
  {
    id: 'shohoz',
    title: 'Millions of Users Served',
    description: 'Engineering backend systems at Shohoz Ltd handling millions during peak Eid/holiday seasons.',
    icon: 'Users',
  },
];
