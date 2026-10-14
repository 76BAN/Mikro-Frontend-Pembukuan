import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders badge with default variant and children', () => {
    render(<Badge data-testid="test-badge">Kategori</Badge>);
    const badgeEl = screen.getByTestId('test-badge');
    expect(badgeEl).toBeInTheDocument();
    expect(badgeEl).toHaveTextContent('Kategori');
  });

  it('renders semantic variants properly', () => {
    const { rerender } = render(<Badge variant="success" data-testid="variant-badge">Pemasukan</Badge>);
    let badgeEl = screen.getByTestId('variant-badge');
    expect(badgeEl).toHaveClass('text-green-700');

    rerender(<Badge variant="danger" data-testid="variant-badge">Pengeluaran</Badge>);
    badgeEl = screen.getByTestId('variant-badge');
    expect(badgeEl).toHaveClass('text-red-700');

    rerender(<Badge variant="warning" data-testid="variant-badge">Pending</Badge>);
    badgeEl = screen.getByTestId('variant-badge');
    expect(badgeEl).toHaveClass('text-amber-800');

    rerender(<Badge variant="info" data-testid="variant-badge">Info</Badge>);
    badgeEl = screen.getByTestId('variant-badge');
    expect(badgeEl).toHaveClass('text-blue-700');

    rerender(<Badge variant="outline" data-testid="variant-badge">Outline</Badge>);
    badgeEl = screen.getByTestId('variant-badge');
    expect(badgeEl).toHaveClass('bg-transparent');
  });

  it('renders different size classes', () => {
    const { rerender } = render(<Badge size="sm" data-testid="size-badge">Kecil</Badge>);
    let badgeEl = screen.getByTestId('size-badge');
    expect(badgeEl).toHaveClass('px-2');

    rerender(<Badge size="md" data-testid="size-badge">Sedang</Badge>);
    badgeEl = screen.getByTestId('size-badge');
    expect(badgeEl).toHaveClass('px-2.5');
  });

  it('combines custom className with base classes', () => {
    render(<Badge className="custom-extra" data-testid="custom-badge">Custom</Badge>);
    const badgeEl = screen.getByTestId('custom-badge');
    expect(badgeEl).toHaveClass('custom-extra');
  });

  it('renders with dot and ping animation', () => {
    const { rerender } = render(<Badge dot data-testid="dot-badge">Live</Badge>);
    expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
    expect(screen.queryByTestId('badge-ping')).not.toBeInTheDocument();

    rerender(<Badge dot ping data-testid="dot-badge">Live Pulse</Badge>);
    expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
    expect(screen.getByTestId('badge-ping')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <Badge icon={<span data-testid="badge-icon">★</span>}>
        Featured
      </Badge>
    );
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });
});
