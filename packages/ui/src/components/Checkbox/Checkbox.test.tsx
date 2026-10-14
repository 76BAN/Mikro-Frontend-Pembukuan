import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders checkbox with role="checkbox" and correct unchecked state', () => {
    render(<Checkbox checked={false} onCheckedChange={() => {}} />);
    const el = screen.getByRole('checkbox');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-checked', 'false');
  });

  it('renders checked state when checked is true', () => {
    render(<Checkbox checked={true} onCheckedChange={() => {}} />);
    const el = screen.getByRole('checkbox');
    expect(el).toHaveAttribute('aria-checked', 'true');
  });

  it('renders mixed aria-checked when indeterminate is true', () => {
    render(<Checkbox checked={false} indeterminate onCheckedChange={() => {}} />);
    const el = screen.getByRole('checkbox');
    expect(el).toHaveAttribute('aria-checked', 'mixed');
  });

  it('triggers onCheckedChange with toggled boolean on click', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onCheckedChange={handleChange} />);

    const el = screen.getByRole('checkbox');
    fireEvent.click(el);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not trigger onCheckedChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} disabled onCheckedChange={handleChange} />);

    const el = screen.getByRole('checkbox');
    expect(el).toBeDisabled();
    fireEvent.click(el);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders label and associates with checkbox', () => {
    render(<Checkbox checked={false} onCheckedChange={() => {}} label="Pilih Semua Transaksi" />);
    expect(screen.getByText('Pilih Semua Transaksi')).toBeInTheDocument();
  });
});
