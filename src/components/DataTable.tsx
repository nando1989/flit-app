/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
  RowSelectionState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRightIcon } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Table as TableUi,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface IProps<T> {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
  onAction?(data: T): React.ReactNode;
  pagination?: boolean;
  onSetFilters?(): void;
  onSetRowSelected?: OnChangeFn<RowSelectionState>;
  rowSelected?: RowSelectionState;
}

export interface ITableRef {
  setFilter: (field: string, value: string) => void;
  resetFilters: () => void;
}

export const DataTable = forwardRef<ITableRef, IProps<any>>(
  ({ data, pagination, columns, onAction, onSetRowSelected, rowSelected }, ref) => {
    const [, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: onSetRowSelected,
      getRowId: (row) => row.id,
      state: {
        rowSelection: rowSelected ?? {},
      },
    });

    useImperativeHandle(ref, () => ({
      setFilter: (field: string, value: string) => {
        table.getColumn(field)?.setFilterValue(value);
      },
      resetFilters: () => {
        setColumnFilters([]);
        table.resetColumnFilters();
      },
    }));

    return (
      <div className="flex flex-1 flex-col justify-between">
        <TableUi className="mb-4 min-w-[550px] border-b border-slate-200 dark:border-slate-800">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  <TableHead
                    className="text-md font-semibold text-slate-600 dark:text-slate-400"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
                {onAction && data.length > 0 && (
                  <TableHead className="text-md font-semibold text-slate-600 dark:text-slate-400" />
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-slate-500" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                  {onAction && (
                    <TableCell className="w-28 text-slate-500">{onAction(row.original)}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 w-full text-center">
                  Vázio
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableUi>

        {pagination && <DataTablePagination table={table} />}
      </div>
    );
  },
);

DataTable.displayName = 'TABLE';

interface IDataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: IDataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end p-6">
      {/* <div className="flex-1 text-sm text-muted-foreground text-slate-600 dark:text-slate-400">
        {table.getFilteredSelectedRowModel().rows.length} de{' '}
        {table.getFilteredRowModel().rows.length}
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Linhas por página
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-400">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
