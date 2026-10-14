import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, ToastContainer } from './Toast';

describe('Toast Component', () => {
  it('renders title, description, and alert role', () => {
    render(
      <Toast
        title="Transaksi Berhasil"
        description="Data mutasi kas berhasil disimpan"
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Transaksi Berhasil')).toBeInTheDocument();
    expect(screen.getByText('Data mutasi kas berhasil disimpan')).toBeInTheDocument();
  });

  it('renders semantic variants properly', () => {
    const { rerender } = render(<Toast variant="success" data-testid="toast-variant" title="Sukses" />);
    let toastEl = screen.getByTestId('toast-variant');
    expect(toastEl).toHaveClass('border-green-500');

    rerender(<Toast variant="error" data-testid="toast-variant" title="Gagal" />);
    toastEl = screen.getByTestId('toast-variant');
    expect(toastEl).toHaveClass('border-red-500');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Toast
        title="Notifikasi"
        onClose={handleClose}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /tutup/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers auto dismiss after duration', () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();

    render(
      <Toast
        title="Auto Dismiss"
        duration={3000}
        onClose={handleClose}
      />
    );

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('renders ToastContainer with multiple toasts', () => {
    render(
      <ToastContainer data-testid="toast-container">
        <Toast title="Toast 1" />
        <Toast title="Toast 2" />
      </ToastContainer>
    );

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });
});
