import { ColumnDef } from '@tanstack/react-table'

import { TopicRecord } from '@/api/topics'
import { TopicSheetButton } from '@/features/topic/topic-sheet/topic-sheet-button'

export const columns: ColumnDef<TopicRecord>[] = [
  {
    accessorKey: 'key',
    header: 'Key',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    size: 300,
  },
  {
    accessorKey: 'offset',
    header: 'Offset',
  },
  {
    accessorKey: 'partition',
    header: 'Partition',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="text-right">
        <TopicSheetButton topicRecord={row.original} />
      </div>
    ),
    size: 150,
  },
]
