import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'

import { SortButtonContainer as SortButton } from '@/components/buttons/sort-button'
import { buttonVariants } from '@/components/ui/button'
import { Topic } from '@/api/topics'

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} label="Name" />,
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
          className={buttonVariants({ variant: 'secondary', size: 'sm' })}
        >
          Consume
        </Link>
      </div>
    ),
    size: 150,
  },
]
