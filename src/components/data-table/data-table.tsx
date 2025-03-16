import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  maxHeight?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  maxHeight,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  })

  return (
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
                      maxHeight && 'bg-background sticky top-0 z-10 rounded-md',
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
              >
                {row.getVisibleCells().map(cell => (
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
    </div>
  )
}
