export interface NavItemConfig {
  label: string;
  href: '/' | '/login' | '/design-system';
}

export const PRIMARY_NAV_ITEMS: readonly NavItemConfig[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Design System', href: '/design-system' },
];
