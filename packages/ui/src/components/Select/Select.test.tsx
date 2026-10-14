import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const mockOptions = [
  { value: 'pemasukan', label: 'Pemasukan' },
  { value: 'pengeluaran', label: 'Pengeluaran' },
  { value: 'transfer', label: 'Transfer Antar Kas', disabled: true },
];

describe('Select Component', () => {
  it('renders label, placeholder, and all options', () => {
    render(
      <Select
        label="Tipe Transaksi"
        placeholder="Pilih tipe"
        options={mockOptions}
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Tipe Transaksi')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Pilih tipe')).toBeInTheDocument();
    expect(screen.getByText('Pemasukan')).toBeInTheDocument();
    expect(screen.getByText('Pengeluaran')).toBeInTheDocument();
    expect(screen.getByText('Transfer Antar Kas')).toBeInTheDocument();
  });

  it('triggers onChange with selected option value', () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="Tipe Transaksi"
        options={mockOptions}
        value=""
        onChange={handleChange}
      />
    );

    const selectEl = screen.getByRole('combobox');
    fireEvent.change(selectEl, { target: { value: 'pengeluaran' } });

    expect(handleChange).toHaveBeenCalledWith('pengeluaran');
  });

  it('renders error message and applies error styles when error is provided', () => {
    render(
      <Select
        label="Kategori"
        options={mockOptions}
        value=""
        onChange={() => {}}
        error="Kategori wajib dipilih"
      />
    );

    expect(screen.getByText('Kategori wajib dipilih')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('border-red-500');
  });

  it('disables select when disabled prop is true', () => {
    render(
      <Select
        label="Kategori"
        options={mockOptions}
        value=""
        onChange={() => {}}
        disabled
      />
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('displays selected value correctly', () => {
    render(
      <Select
        label="Tipe Transaksi"
        options={mockOptions}
        value="pemasukan"
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('pemasukan');
  });
});
