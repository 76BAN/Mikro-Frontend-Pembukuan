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
});