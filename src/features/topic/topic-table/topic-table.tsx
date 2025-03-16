import { TopicRecord } from '@/api/topics'
import { DataTable } from '@/components/data-table'
import { columns } from './topic-table.columns'

type TopicTableProps = {
  data: TopicRecord[]
  isLoading?: boolean
}

export const TopicTable = ({ data, isLoading }: TopicTableProps) => (
  <DataTable
    columns={columns}
    data={data}
    isLoading={isLoading}
    maxHeight={600}
    highlightDuration={500}
  />
)
