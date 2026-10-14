import { createRootRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@pembukuan/ui';
import type { HeaderNavLink } from '@pembukuan/ui';
import { queryClient } from '../lib/queryClient';
import { useAuthStore } from '../store/authStore';
import { PRIMARY_NAV_ITEMS } from '../config/navigation';
import { useThemeStore } from '../store/themeStore';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const currentPath = routerState.location.pathname;

  const navLinks: HeaderNavLink[] = PRIMARY_NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.href,
    active: currentPath === item.href,
  }));

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-canvas text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans transition-colors duration-200">
        <Header
          title="Pembukuan v2"
          username={user?.username}
          navLinks={navLinks}
          onNavigate={(href) => navigate({ to: href as '/' | '/login' | '/design-system' })}
          onLogout={handleLogout}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <main className="flex-1 max-w-5xl w-full mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
