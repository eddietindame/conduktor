import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Topic } from '@/api'

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'numberOfPartitions',
    header: 'Partitions',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          size="sm"
          onClick={() => {
            console.log(row.original.name)
          }}
        >
          Consume
        </Button>
      </div>
    ),
    size: 150,
  },
]
