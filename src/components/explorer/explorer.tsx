import { Topic, useTopics } from '@/api'
import { TopicsTable } from '@/components/topics-table'

type ExplorerProps = {
  topics: Topic[]
  isLoading?: boolean
}

export const Explorer = ({ topics, isLoading }: ExplorerProps) => (
  <div className="p-4">
    <h1 className="mb-4 text-3xl font-bold">Topics</h1>
    <TopicsTable topics={topics} isLoading={isLoading} />
  </div>
)

export const ExplorerContainer = () => {
  const { data: topics = [], isLoading } = useTopics()
  return <Explorer topics={topics} isLoading={isLoading} />
}
