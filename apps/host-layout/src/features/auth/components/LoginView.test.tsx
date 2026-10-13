import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginView } from './LoginView';
import { useAuthStore } from '../../../store/authStore';

describe('LoginView Component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('renders RemoteLoginSlot when user is unauthenticated', () => {
    render(<LoginView />);
    expect(screen.getByTestId('remote-slot')).toBeInTheDocument();
  });

  it('renders already-logged-in view when user exists in authStore', () => {
    useAuthStore.getState().login({ username: 'siti' });
    const handleNavigate = vi.fn();

    render(<LoginView onNavigateHome={handleNavigate} />);

    expect(screen.getByText(/siti/i)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /buka dashboard/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(handleNavigate).toHaveBeenCalledTimes(1);
  });
});
