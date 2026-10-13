import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardView } from './DashboardView';
import { useAuthStore } from '../../../store/authStore';

describe('DashboardView Component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('renders dashboard heading and description', () => {
    render(<DashboardView />);
    expect(screen.getByRole('heading', { name: /dashboard pembukuan/i })).toBeInTheDocument();
  });

  it('shows unauthenticated message when user is not logged in', () => {
    render(<DashboardView />);
    expect(screen.getByText(/belum masuk ke dalam akun/i)).toBeInTheDocument();
  });

  it('shows username when user is logged in', () => {
    useAuthStore.getState().login({ username: 'hendra' });
    render(<DashboardView />);
    expect(screen.getByText(/hendra/i)).toBeInTheDocument();
  });
});
