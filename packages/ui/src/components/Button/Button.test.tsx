import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button label="Klik Saya" />);
    expect(screen.getByRole('button', { name: 'Klik Saya' })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Aksi" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Aksi' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Nonaktif" disabled />);
    expect(screen.getByRole('button', { name: 'Nonaktif' })).toBeDisabled();
  });

  it('applies variant classes correctly', () => {
    render(<Button label="Bahaya" variant="danger" />);
    const btn = screen.getByRole('button', { name: 'Bahaya' });
    expect(btn.className).toContain('bg-red-600');
  });
});
