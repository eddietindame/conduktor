import { ColumnDef } from '@tanstack/react-table'

import { TopicRecord } from '@/api'

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
]
