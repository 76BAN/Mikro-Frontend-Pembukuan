import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { DashboardView } from '../features/dashboard/components/DashboardView';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  const navigate = useNavigate();
  return <DashboardView onNavigateToLogin={() => navigate({ to: '/login' })} />;
}
