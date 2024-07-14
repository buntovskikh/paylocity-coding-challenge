import React from 'react';
import { cn } from '../../utils/cn';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="m-5 w-full rounded-lg border overflow-auto">
    <table ref={ref} className="w-full" {...props} />
  </div>
));

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className="uppercase" {...props} />,
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className="" {...props} />,
);

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & { header?: boolean }>(
  ({ className, header, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b last:border-0', { 'bg-gray-200': header }, { 'hover:bg-gray-50': !header })} {...props} />
  ),
);

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn('h-12 px-4 text-left align-middle text-xs font-medium', className)} {...props} />
  ),
);

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement> & { isSticky?: boolean }>(
  ({ className, isSticky, children, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle text-xs', className)} {...props}>
      {children}
    </td>
  ),
);
