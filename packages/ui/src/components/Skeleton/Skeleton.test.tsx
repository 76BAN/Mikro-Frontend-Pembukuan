import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders skeleton element with role="status" and default pulse styling', () => {
    render(<Skeleton data-testid="default-skeleton" />);
    const el = screen.getByTestId('default-skeleton');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('animate-pulse');
    expect(el).toHaveAttribute('role', 'status');
    expect(screen.getByText('Memuat konten...')).toBeInTheDocument();
  });

  it('supports custom className for dimensions and layout', () => {
    render(<Skeleton className="h-10 w-32" data-testid="custom-skeleton" />);
    const el = screen.getByTestId('custom-skeleton');
    expect(el).toHaveClass('h-10', 'w-32');
  });

  it('supports rounded shape props', () => {
    const { rerender } = render(<Skeleton rounded="full" data-testid="rounded-skeleton" />);
    let el = screen.getByTestId('rounded-skeleton');
    expect(el).toHaveClass('rounded-full');

    rerender(<Skeleton rounded="none" data-testid="rounded-skeleton" />);
    el = screen.getByTestId('rounded-skeleton');
    expect(el).toHaveClass('rounded-none');
  });

  it('supports shimmer gradient variant', () => {
    render(<Skeleton variant="shimmer" data-testid="shimmer-skeleton" />);
    const el = screen.getByTestId('shimmer-skeleton');
    expect(el).toHaveClass('bg-gradient-to-r');
  });
});
