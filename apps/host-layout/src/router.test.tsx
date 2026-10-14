import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from './router';

describe('TanStack Router Integration in Host Layout', () => {
  it('renders Dashboard page when route is /', async () => {
    const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });
    const testRouter = createAppRouter(memoryHistory);

    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /pembukuan v2/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /dashboard pembukuan/i })).toBeInTheDocument();
    });
  });

  it('renders Login page and remote slot when route is /login', async () => {
    const memoryHistory = createMemoryHistory({ initialEntries: ['/login'] });
    const testRouter = createAppRouter(memoryHistory);

    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId('remote-slot')).toBeInTheDocument();
    });
  });

  it('renders Design System page and remote slot when route is /design-system', async () => {
    const memoryHistory = createMemoryHistory({ initialEntries: ['/design-system'] });
    const testRouter = createAppRouter(memoryHistory);

    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId('remote-design-system-slot')).toBeInTheDocument();
    });
  });
});
