import { createRouter } from '@tanstack/react-router';
import type { RouterHistory } from '@tanstack/react-router';
import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as loginRoute } from './routes/login';
import { Route as designSystemRoute } from './routes/design-system';

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, designSystemRoute]);

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    history,
  });
}

export const router = createAppRouter();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
