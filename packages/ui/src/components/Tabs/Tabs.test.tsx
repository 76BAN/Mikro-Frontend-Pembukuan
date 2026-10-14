import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs Component', () => {
  it('renders tabs and displays default active tab content', () => {
    render(
      <Tabs defaultValue="semua">
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="pemasukan">Pemasukan</TabsTrigger>
          <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
        </TabsList>
        <TabsContent value="semua">Konten Semua</TabsContent>
        <TabsContent value="pemasukan">Konten Pemasukan</TabsContent>
        <TabsContent value="pengeluaran">Konten Pengeluaran</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'Semua' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Konten Semua')).toBeInTheDocument();
    expect(screen.queryByText('Konten Pemasukan')).not.toBeInTheDocument();
  });

  it('switches content when clicking a different tab trigger', () => {
    const handleValueChange = vi.fn();
    render(
      <Tabs defaultValue="semua" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="pemasukan">Pemasukan</TabsTrigger>
        </TabsList>
        <TabsContent value="semua">Konten Semua</TabsContent>
        <TabsContent value="pemasukan">Konten Pemasukan</TabsContent>
      </Tabs>
    );

    const pemasukanTab = screen.getByRole('tab', { name: 'Pemasukan' });
    fireEvent.click(pemasukanTab);

    expect(handleValueChange).toHaveBeenCalledWith('pemasukan');
    expect(screen.getByText('Konten Pemasukan')).toBeInTheDocument();
    expect(screen.queryByText('Konten Semua')).not.toBeInTheDocument();
  });

  it('respects controlled value prop', () => {
    const { rerender } = render(
      <Tabs value="tab1" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();

    rerender(
      <Tabs value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('does not trigger change when tab is disabled', () => {
    const handleValueChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2 Disabled</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2 Disabled' });
    expect(disabledTab).toBeDisabled();
    fireEvent.click(disabledTab);
    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
