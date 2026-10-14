import React from 'react';
import type {
  TableHTMLAttributes,
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from 'react';
import { cn } from '../../lib/utils';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, ...props }, ref) => (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-sm transition-colors ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
        wrapperClassName
      )}
    >
      <table
        ref={ref}
        className={cn('w-full text-left text-sm text-gray-700 dark:text-gray-200', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-gray-50/90 dark:bg-canvas/80 backdrop-blur-xs text-xs font-semibold uppercase text-muted border-b border-border',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-border/50', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-border font-medium bg-gray-50 dark:bg-canvas/40',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-blue-500/[0.03] dark:hover:bg-blue-400/[0.05]',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-11 px-4 text-left align-middle font-semibold text-gray-700 dark:text-gray-200 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle text-gray-800 dark:text-gray-200 [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
