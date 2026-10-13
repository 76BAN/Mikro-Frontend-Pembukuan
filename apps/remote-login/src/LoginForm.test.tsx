import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm Remote Component', () => {
  it('renders login form elements properly', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
  });

  it('shows error validation when username is empty on submit', () => {
    const handleSuccess = vi.fn();
    render(<LoginForm onSuccess={handleSuccess} />);

    fireEvent.click(screen.getByRole('button', { name: /masuk/i }));

    expect(screen.getByText(/username wajib diisi/i)).toBeInTheDocument();
    expect(handleSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess when valid inputs are submitted', () => {
    const handleSuccess = vi.fn();
    render(<LoginForm onSuccess={handleSuccess} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /masuk/i }));

    expect(handleSuccess).toHaveBeenCalledWith({ username: 'admin' });
  });
});
