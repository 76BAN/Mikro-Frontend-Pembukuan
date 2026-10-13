import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { LoginView } from '../features/auth/components/LoginView';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginRouteComponent,
});

function LoginRouteComponent() {
  const navigate = useNavigate();
  return <LoginView onNavigateHome={() => navigate({ to: '/' })} />;
}
