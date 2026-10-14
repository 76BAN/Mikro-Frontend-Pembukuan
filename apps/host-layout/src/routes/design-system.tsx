import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { RemoteDesignSystemSlot } from '../features/design-system/components/RemoteDesignSystemSlot';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design-system',
  component: RemoteDesignSystemSlot,
});

export default Route;
