import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  ServerTable,
} from './index';

interface Transaction {
  id: string;
  description: string;
  amount: number;
}

const mockColumns: ColumnDef<Transaction, unknown>[] = [
  {
    accessorKey: 'description',
    header: 'Keterangan',
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Nominal',
    cell: (info) => `Rp ${Number(info.getValue()).toLocaleString('id-ID')}`,
  },
];

const mockData: Transaction[] = [
  { id: '1', description: 'Penjualan Produk A', amount: 500000 },
  { id: '2', description: 'Beli ATK', amount: 75000 },
];

describe('Table Primitives', () => {
  it('renders semantic table structure with correct classes', () => {
    render(
      <Table data-testid="table-root">
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('table-root')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('ServerTable Component (TanStack Table)', () => {
  it('renders table columns and data rows correctly', () => {
    render(
      <ServerTable
        columns={mockColumns}
        data={mockData}
      />
    );

    expect(screen.getByText('Keterangan')).toBeInTheDocument();
    expect(screen.getByText('Nominal')).toBeInTheDocument();
    expect(screen.getByText('Penjualan Produk A')).toBeInTheDocument();
    expect(screen.getByText('Rp 500.000')).toBeInTheDocument();
    expect(screen.getByText('Beli ATK')).toBeInTheDocument();
  });

  it('renders empty message when data is empty and not loading', () => {
    render(
      <ServerTable
        columns={mockColumns}
        data={[]}
        emptyMessage="Tidak ada transaksi ditemukan."
      />
    );

    expect(screen.getByText('Tidak ada transaksi ditemukan.')).toBeInTheDocument();
  });

  it('renders loading skeletons when isLoading is true', () => {
    render(
      <ServerTable
        columns={mockColumns}
        data={[]}
        isLoading={true}
      />
    );

    const skeletonRows = screen.getAllByTestId('table-skeleton-row');
    expect(skeletonRows.length).toBeGreaterThan(0);
  });

  it('triggers onSortChange when clicking a sortable column header', () => {
    const handleSortChange = vi.fn();
    render(
      <ServerTable
        columns={mockColumns}
        data={mockData}
        sort={{
          sortBy: 'description',
          sortOrder: 'asc',
          onSortChange: handleSortChange,
        }}
      />
    );

    const headerBtn = screen.getByRole('button', { name: /keterangan/i });
    fireEvent.click(headerBtn);

    expect(handleSortChange).toHaveBeenCalledWith('description', 'desc');
  });

  it('renders pagination controls and triggers onPageChange', () => {
    const handlePageChange = vi.fn();
    render(
      <ServerTable
        columns={mockColumns}
        data={mockData}
        pagination={{
          page: 1,
          pageSize: 2,
          totalRows: 10,
          onPageChange: handlePageChange,
        }}
      />
    );

    expect(screen.getByText(/halaman/i)).toHaveTextContent(/halaman 1 dari 5/i);
    expect(screen.getByText(/menampilkan/i)).toHaveTextContent(/menampilkan 1-2 dari 10 data/i);

    const prevButton = screen.getByRole('button', { name: /sebelumnya/i });
    const nextButton = screen.getByRole('button', { name: /selanjutnya/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('renders zebra striping and custom emptyIcon', () => {
    const { rerender } = render(
      <ServerTable
        columns={mockColumns}
        data={mockData}
        zebra
      />
    );
    const rows = screen.getAllByRole('row');
    // header is row 0, row 1 is odd, row 2 is even
    expect(rows[2]).toHaveClass('even:bg-gray-50/60');

    rerender(
      <ServerTable
        columns={mockColumns}
        data={[]}
        emptyIcon={<span data-testid="custom-empty-icon">Kosong</span>}
      />
    );
    expect(screen.getByTestId('custom-empty-icon')).toBeInTheDocument();
  });
});
