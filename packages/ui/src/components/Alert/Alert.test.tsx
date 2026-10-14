import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert Component', () => {
  it('renders alert with role="alert" and default info variant', () => {
    render(<Alert data-testid="test-alert">Pesan informasi</Alert>);
    const alertEl = screen.getByRole('alert');
    expect(alertEl).toBeInTheDocument();
    expect(alertEl).toHaveTextContent('Pesan informasi');
    expect(alertEl).toHaveClass('text-blue-900');
  });

  it('renders all semantic variants properly', () => {
    const { rerender } = render(<Alert variant="success" data-testid="var-alert">Sukses</Alert>);
    let alertEl = screen.getByTestId('var-alert');
    expect(alertEl).toHaveClass('text-green-900');

    rerender(<Alert variant="warning" data-testid="var-alert">Peringatan</Alert>);
    alertEl = screen.getByTestId('var-alert');
    expect(alertEl).toHaveClass('text-amber-900');

    rerender(<Alert variant="error" data-testid="var-alert">Gagal</Alert>);
    alertEl = screen.getByTestId('var-alert');
    expect(alertEl).toHaveClass('text-red-900');
  });

  it('renders title, description, and children together', () => {
    render(
      <Alert
        title="Peringatan Saldo"
        description="Saldo kas utama menipis"
        variant="warning"
      >
        <p>Segera lakukan rekonsiliasi</p>
      </Alert>
    );

    expect(screen.getByRole('heading', { name: 'Peringatan Saldo' })).toBeInTheDocument();
    expect(screen.getByText('Saldo kas utama menipis')).toBeInTheDocument();
    expect(screen.getByText('Segera lakukan rekonsiliasi')).toBeInTheDocument();
  });

  it('renders dismiss button and triggers onClose callback when clicked', () => {
    const handleClose = vi.fn();
    render(
      <Alert onClose={handleClose} data-testid="dismissible-alert">
        Alert dapat ditutup
      </Alert>
    );

    const closeBtn = screen.getByRole('button', { name: /tutup/i });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when onClose is not provided', () => {
    render(<Alert>Non dismissible</Alert>);
    expect(screen.queryByRole('button', { name: /tutup/i })).not.toBeInTheDocument();
  });

  it('renders composable AlertTitle and AlertDescription sub-components', () => {
    render(
      <Alert>
        <AlertTitle>Judul Sub</AlertTitle>
        <AlertDescription>Deskripsi Sub</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('heading', { name: 'Judul Sub' })).toBeInTheDocument();
    expect(screen.getByText('Deskripsi Sub')).toBeInTheDocument();
  });
});
