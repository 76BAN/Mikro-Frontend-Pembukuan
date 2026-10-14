import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Inbox } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
import { Button } from '../Button';
import { Skeleton } from '../Skeleton';
import { cn } from '../../lib/utils';

export interface ServerTablePagination {
  page: number; // 1-based page
  pageSize: number;
  totalRows: number;
  pageCount?: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange?: (newSize: number) => void;
}

export interface ServerTableSort {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange: (columnId: string, order: 'asc' | 'desc') => void;
}

export interface ServerTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  isLoading?: boolean;
  skeletonRowCount?: number;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  zebra?: boolean;
  pagination?: ServerTablePagination;
  sort?: ServerTableSort;
  className?: string;
}

export function ServerTable<TData>({
  columns,
  data,
  isLoading = false,
  skeletonRowCount = 5,
  emptyMessage = 'Tidak ada data untuk ditampilkan.',
  emptyIcon,
  zebra = false,
  pagination,
  sort,
  className,
}: ServerTableProps<TData>) {
  const pageCount = pagination
    ? pagination.pageCount ?? Math.max(1, Math.ceil(pagination.totalRows / pagination.pageSize))
    : undefined;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
  });

  const handleSortClick = (columnId: string) => {
    if (!sort) return;
    const isCurrent = sort.sortBy === columnId;
    const nextOrder = isCurrent && sort.sortOrder === 'asc' ? 'desc' : 'asc';
    sort.onSortChange(columnId, nextOrder);
  };

  const currentPage = pagination?.page ?? 1;
  const totalPages = pageCount ?? 1;
  const startRow = pagination ? Math.min((currentPage - 1) * pagination.pageSize + 1, pagination.totalRows) : 0;
  const endRow = pagination ? Math.min(currentPage * pagination.pageSize, pagination.totalRows) : 0;

  return (
    <div className={cn('space-y-4', className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort() || header.column.columnDef.enableSorting;
                const isSorted = sort?.sortBy === header.column.id;
                const sortDirection = isSorted ? sort.sortOrder : undefined;

                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : canSort && sort ? (
                      <button
                        type="button"
                        onClick={() => handleSortClick(header.column.id)}
                        className="inline-flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer select-none -ml-1 px-1 py-0.5 rounded"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortDirection === 'asc' && <ArrowUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                        {sortDirection === 'desc' && <ArrowDown className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                        {!sortDirection && <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`} data-testid="table-skeleton-row">
                {columns.map((_, colIndex) => (
                  <TableCell key={`skeleton-cell-${colIndex}`}>
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(zebra && 'even:bg-gray-50/60 dark:even:bg-canvas/40')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-gray-500 dark:text-gray-400"
              >
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  {emptyIcon ?? (
                    <Inbox className="h-7 w-7 text-gray-400 dark:text-gray-500 stroke-[1.5]" />
                  )}
                  <span className="text-sm font-medium">{emptyMessage}</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs text-gray-600 dark:text-gray-300">
          <div>
            Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{startRow}-{endRow}</span> dari{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{pagination.totalRows}</span> data
          </div>

          <div className="flex items-center gap-4">
            <span>
              Halaman <strong className="text-gray-900 dark:text-white">{currentPage}</strong> dari{' '}
              <strong className="text-gray-900 dark:text-white">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <Button
                label="Sebelumnya"
                variant="outline"
                className="text-xs py-1 px-3"
                disabled={currentPage <= 1 || isLoading}
                onClick={() => pagination.onPageChange(currentPage - 1)}
              />
              <Button
                label="Selanjutnya"
                variant="outline"
                className="text-xs py-1 px-3"
                disabled={currentPage >= totalPages || isLoading}
                onClick={() => pagination.onPageChange(currentPage + 1)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServerTable;
