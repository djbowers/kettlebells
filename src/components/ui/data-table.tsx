import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Loading } from '~/components';

import { Button } from './button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pageSize: number;
  currentPage: number;
  onClickNextPage?: () => void;
  onClickPreviousPage?: () => void;
  onClickFirstPage?: () => void;
  onClickLastPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pageSize = 10,
  currentPage = 1,
  onClickNextPage,
  onClickPreviousPage,
  onClickFirstPage,
  onClickLastPage,
  hasNextPage,
  hasPreviousPage,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
  });

  const totalPages = Math.ceil(rowCount / pageSize);

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex justify-center">
                  <Loading />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} • {rowCount} total items
        </div>
        <div className="flex items-center space-x-2">
          {onClickFirstPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickFirstPage}
              disabled={!hasPreviousPage || isLoading}
            >
              First
            </Button>
          )}
          {onClickPreviousPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickPreviousPage}
              disabled={!hasPreviousPage || isLoading}
            >
              Previous
            </Button>
          )}
          {onClickNextPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickNextPage}
              disabled={!hasNextPage || isLoading}
            >
              Next
            </Button>
          )}
          {onClickLastPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickLastPage}
              disabled={!hasNextPage || isLoading}
            >
              Last
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
