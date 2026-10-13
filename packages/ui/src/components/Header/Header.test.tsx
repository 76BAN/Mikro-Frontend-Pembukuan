import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Shared Header Component', () => {
  it('renders application title', () => {
    render(<Header title="Aplikasi Pembukuan" />);
    expect(screen.getByRole('heading', { name: 'Aplikasi Pembukuan' })).toBeInTheDocument();
  });

  it('renders navigation links and triggers onNavigate', () => {
    const handleNavigate = vi.fn();
    const links = [
      { label: 'Dashboard', href: '/', active: true },
      { label: 'Login', href: '/login', active: false },
    ];

    render(<Header title="Pembukuan" navLinks={links} onNavigate={handleNavigate} />);

    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    const loginLink = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginLink);

    expect(handleNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders user greeting and triggers onLogout', () => {
    const handleLogout = vi.fn();
    render(<Header title="Pembukuan" username="budi" onLogout={handleLogout} />);

    expect(screen.getByText(/budi/i)).toBeInTheDocument();
    const logoutBtn = screen.getByRole('button', { name: /keluar/i });
    fireEvent.click(logoutBtn);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
