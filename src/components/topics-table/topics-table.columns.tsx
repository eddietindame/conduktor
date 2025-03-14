import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'

import { Topic } from '@/api'
import { buttonVariants } from '@/components/ui/button'

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
        <Link
          to={`/topics/${row.original.name}`}
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          Consume
        </Link>
      </div>
    ),
    size: 150,
  },
]
