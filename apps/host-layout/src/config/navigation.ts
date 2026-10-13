export interface NavItemConfig {
  label: string;
  href: '/' | '/login';
}

export const PRIMARY_NAV_ITEMS: readonly NavItemConfig[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Login', href: '/login' },
];
