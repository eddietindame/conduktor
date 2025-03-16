import { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  maxHeight?: number
  highlightDuration?: number
  hasPagination?: boolean
  filter?: {
    placeholder: string
    key: string
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  maxHeight,
  highlightDuration = 0,
  filter,
  hasPagination = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    state: { sorting, columnFilters },
  })

  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  // Highlight the first row in the updated data array
  useEffect(() => {
    if (data.length > 0 && highlightDuration) {
      // stringify is a bit expensive, but it's the only way to compare objects
      const newRowId = JSON.stringify(data[0]) // First row in the updated data array

      // Prevent unnecessary re-glows if the same row remains at the top
      if (newRowId !== highlightedId) {
        setHighlightedId(newRowId)

        // Clear highlight after animation duration
        setTimeout(() => {
          setHighlightedId(null)
        }, highlightDuration)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div
        className={cn(
          'flex',
          hasPagination ? 'justify-between' : 'justify-end',
        )}
      >
        {hasPagination && (
          <div className="mb-4 flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
          </div>
        )}
        <div className="flex gap-4">
          {!!sorting.length && (
            <Button onClick={() => table.resetSorting()} className="mb-4">
              Reset sorting
            </Button>
          )}
          {filter && (
            <Input
              aria-label={filter.placeholder}
              placeholder={filter.placeholder}
              value={
                (table.getColumn(filter.key)?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn(filter.key)?.setFilterValue(event.target.value)
              }
              className="mb-4 max-w-xs"
            />
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table containerStyles={{ maxHeight }}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize() ? header.getSize() : undefined,
                      }}
                      className={cn(
                        maxHeight &&
                          'bg-background sticky top-0 z-10 rounded-md',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <tr>
                  <td colSpan={columns.length} className="px-3">
                    <Skeleton
                      data-testid="data-table-skeleton"
                      className="mt-3 h-4 w-[80%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={columns.length} className="px-3">
                    <Skeleton className="mt-2 h-4 w-full" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={columns.length} className="px-3">
                    <Skeleton className="mt-2 mb-3 h-4 w-[60%]" />
                  </td>
                </tr>
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={
                    JSON.stringify(row.original) === highlightedId
                      ? 'glow-effect'
                      : ''
                  }
                  style={{
                    animationDuration: `${highlightDuration}ms`,
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
