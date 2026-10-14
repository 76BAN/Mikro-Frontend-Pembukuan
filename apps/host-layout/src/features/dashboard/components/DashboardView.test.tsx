import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('calls onAddTransaction callback when action button in remote dashboard is clicked', async () => {
    const handleAddTransaction = vi.fn();
    render(<DashboardView onAddTransaction={handleAddTransaction} />);

    const addButton = await screen.findByRole('button', { name: /catat transaksi/i });
    fireEvent.click(addButton);

    expect(handleAddTransaction).toHaveBeenCalledTimes(1);
  });
});
