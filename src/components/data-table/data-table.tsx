import Skeleton from 'react-loading-skeleton'
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
                      maxHeight && 'bg-background sticky top-0 z-10',
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
                <td colSpan={columns.length} className="px-3 pt-2 pr-[20%]">
                  <Skeleton containerTestId="data-table-skeleton" />
                </td>
              </tr>
              <tr>
                <td colSpan={columns.length} className="px-3 pt-2">
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td colSpan={columns.length} className="px-3 py-2 pr-[40%]">
                  <Skeleton />
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
