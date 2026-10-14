import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard Remote Component', () => {
  it('renders the dashboard heading and summary metrics', () => {
    render(<Dashboard />);

    expect(screen.getByRole('heading', { name: /ringkasan keuangan/i })).toBeInTheDocument();
    expect(screen.getByText(/total pemasukan/i)).toBeInTheDocument();
    expect(screen.getByText(/total pengeluaran/i)).toBeInTheDocument();
    expect(screen.getByText(/saldo Akhir/i)).toBeInTheDocument();
  });

  it("triggers onAddTransaction callback when action button is clicked", () => {
    const handleAddTransaction = vi.fn();
    render(<Dashboard onAddTransaction={handleAddTransaction} />);

    const addButton = screen.getByRole('button', { name: /catat transaksi/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(handleAddTransaction).toHaveBeenCalledTimes(1);
  });

  it('renders transactions table with rows and data', () => {
    render(<Dashboard />);

    expect(screen.getByRole('heading', { name: /buku kas & riwayat transaksi/i })).toBeInTheDocument();
    expect(screen.getByText('Pembayaran Invoice #1029')).toBeInTheDocument();
    expect(screen.getByText(/total 5 baris/i)).toBeInTheDocument();
  });

  it('opens transaction modal when Catat Transaksi button is clicked', () => {
    render(<Dashboard />);

    const addButton = screen.getByRole('button', { name: /catat transaksi/i });
    fireEvent.click(addButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /catat transaksi baru/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/keterangan transaksi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nominal \(rp\)/i)).toBeInTheDocument();
  });

  it('triggers and displays toast notification when new transaction is submitted', () => {
    render(<Dashboard />);

    const addButton = screen.getByRole('button', { name: /catat transaksi/i });
    fireEvent.click(addButton);

    const descInput = screen.getByLabelText(/keterangan transaksi/i);
    const amountInput = screen.getByLabelText(/nominal \(rp\)/i);
    const submitBtn = screen.getByRole('button', { name: /simpan transaksi/i });

    fireEvent.change(descInput, { target: { value: 'Penjualan Merchandise' } });
    fireEvent.change(amountInput, { target: { value: '350000' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/pencatatan kas "penjualan merchandise"/i)).toBeInTheDocument();
  });
});