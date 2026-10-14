import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './DropdownMenu';

describe('DropdownMenu Component', () => {
  it('does not display menu content when closed', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Opsi</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.queryByText('Lihat Detail')).not.toBeInTheDocument();
  });

  it('opens menu when trigger button is clicked', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Opsi</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const triggerBtn = screen.getByRole('button', { name: 'Opsi' });
    fireEvent.click(triggerBtn);

    expect(screen.getByText('Lihat Detail')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('triggers item onClick and closes menu when item is selected', () => {
    const handleDetail = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Opsi</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleDetail}>Lihat Detail</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Opsi' }));
    const itemBtn = screen.getByText('Lihat Detail');
    fireEvent.click(itemBtn);

    expect(handleDetail).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Lihat Detail')).not.toBeInTheDocument();
  });

  it('closes dropdown when Escape key is pressed', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Opsi</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Opsi' }));
    expect(screen.getByText('Item')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  it('renders danger variant item with destructive classes and separator', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Aksi</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="menu-separator" />
          <DropdownMenuItem variant="danger" data-testid="danger-item">
            Hapus Transaksi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Aksi' }));
    expect(screen.getByTestId('menu-separator')).toBeInTheDocument();

    const dangerItem = screen.getByTestId('danger-item');
    expect(dangerItem).toHaveClass('text-red-600');
  });
});
