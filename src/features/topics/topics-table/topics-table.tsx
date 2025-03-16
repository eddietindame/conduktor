import { Topic } from '@/api/topics'
import { DataTable } from '@/components/data-table'
import { columns } from './topics-table.columns'

type TopicsTableProps = {
  topics: Topic[]
  isLoading?: boolean
}

export const TopicsTable = ({ topics, isLoading }: TopicsTableProps) => (
  <DataTable
    columns={columns}
    data={topics}
    isLoading={isLoading}
    filter={{
      placeholder: 'Filter topics name...',
      key: 'name',
    }}
    hasPagination
  />
)
