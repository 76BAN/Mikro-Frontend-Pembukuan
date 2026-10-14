import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders spinner with role="status" and default accessible label', () => {
    render(<Spinner data-testid="default-spinner" />);
    const spinnerEl = screen.getByRole('status');
    expect(spinnerEl).toBeInTheDocument();
    expect(screen.getByText('Memuat...')).toBeInTheDocument();
  });

  it('renders custom visible label when label prop is provided', () => {
    render(<Spinner label="Memuat modul dashboard..." />);
    expect(screen.getByText('Memuat modul dashboard...')).toBeInTheDocument();
  });

  it('applies size classes properly', () => {
    const { rerender } = render(<Spinner size="sm" data-testid="size-spinner" />);
    let svg = screen.getByTestId('size-spinner').querySelector('svg');
    expect(svg).toHaveClass('h-4', 'w-4');

    rerender(<Spinner size="lg" data-testid="size-spinner" />);
    svg = screen.getByTestId('size-spinner').querySelector('svg');
    expect(svg).toHaveClass('h-8', 'w-8');
  });

  it('applies variant color classes properly', () => {
    const { rerender } = render(<Spinner variant="white" data-testid="var-spinner" />);
    let svg = screen.getByTestId('var-spinner').querySelector('svg');
    expect(svg).toHaveClass('text-white');

    rerender(<Spinner variant="muted" data-testid="var-spinner" />);
    svg = screen.getByTestId('var-spinner').querySelector('svg');
    expect(svg).toHaveClass('text-gray-400');
  });

  it('renders bottom label position when labelPosition is bottom', () => {
    render(
      <Spinner
        label="Memuat data..."
        labelPosition="bottom"
        data-testid="bottom-spinner"
      />
    );
    const container = screen.getByTestId('bottom-spinner');
    expect(container).toHaveClass('flex-col');
  });
});
