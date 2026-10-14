import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';

describe('Card Component', () => {
  it('renders card with children and base styling', () => {
    render(<Card data-testid="test-card">Card Body</Card>);
    const cardEl = screen.getByTestId('test-card');
    expect(cardEl).toBeInTheDocument();
    expect(cardEl).toHaveTextContent('Card Body');
  });

  it('supports custom className on Card', () => {
    render(<Card className="custom-class" data-testid="custom-card">Content</Card>);
    const cardEl = screen.getByTestId('custom-card');
    expect(cardEl).toHaveClass('custom-class');
  });

  it('renders composable sub-components properly', () => {
    render(
      <Card>
        <CardHeader data-testid="card-header">
          <CardTitle>Ringkasan</CardTitle>
          <CardDescription>Deskripsi keuangan</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">
          <p>Konten utama</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Ringkasan' })).toBeInTheDocument();
    expect(screen.getByText('Deskripsi keuangan')).toBeInTheDocument();
    expect(screen.getByText('Konten utama')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('handles click events when passed', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick} data-testid="clickable-card">Clickable</Card>);

    fireEvent.click(screen.getByTestId('clickable-card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies glass variant and hoverLift classes', () => {
    const { rerender } = render(
      <Card variant="glass" data-testid="styled-card">
        Glass
      </Card>
    );
    expect(screen.getByTestId('styled-card')).toHaveClass('backdrop-blur-md');

    rerender(
      <Card hoverLift data-testid="styled-card">
        Hoverable
      </Card>
    );
    expect(screen.getByTestId('styled-card')).toHaveClass('hover:-translate-y-0.5');
  });
});
