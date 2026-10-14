import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  it('does not render content when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Tambah Transaksi">
        <p>Form Konten</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Tambah Transaksi')).not.toBeInTheDocument();
  });

  it('renders modal dialog, title, description, and children when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Tambah Transaksi"
        description="Masukkan rincian mutasi kas"
      >
        <p>Form Konten</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tambah Transaksi' })).toBeInTheDocument();
    expect(screen.getByText('Masukkan rincian mutasi kas')).toBeInTheDocument();
    expect(screen.getByText('Form Konten')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Judul Modal">
        Konten
      </Modal>
    );

    const closeBtn = screen.getByRole('button', { name: /tutup/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Judul Modal">
        Konten
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop overlay is clicked but not when clicking inside modal panel', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Judul Modal">
        <div data-testid="modal-inner">Konten Dalam</div>
      </Modal>
    );

    const innerPanel = screen.getByTestId('modal-inner');
    fireEvent.click(innerPanel);
    expect(handleClose).not.toHaveBeenCalled();

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when closeOnOverlayClick is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        closeOnOverlayClick={false}
        title="Modal Tetap"
      >
        Konten
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when modal is open and restores when unmounted', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={() => {}} title="Scroll Lock Test">
        Konten
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
