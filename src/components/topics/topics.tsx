import { useQueryClient } from '@tanstack/react-query'

import { Topic, topicsKey, useTopics } from '@/api'
import { CreateTopicPopover } from '@/features/create-topic'
import { RefreshButton } from '@/components/buttons'
import { TopicsTable } from '@/components/topics-table'
import { ErrorAlert } from '@/components/error-alert'
import { Figure } from '@/components/figure'

type TopicsProps = {
  topics: Topic[]
  error?: string
  isLoading?: boolean
  isFetching?: boolean
  onClickRefresh: () => Promise<void> | void
}

export const Topics = ({
  topics,
  isLoading,
  isFetching,
  error,
  onClickRefresh,
}: TopicsProps) => (
  <div className="p-4">
    <h1 className="mb-4 text-3xl font-bold">Topics</h1>
    {error ? (
      <ErrorAlert
        message={error}
        title="Fetch error"
        button={
          <RefreshButton
            title="Refresh topics"
            disabled={isLoading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onClickRefresh}
          />
        }
      />
    ) : (
      <>
        <div className="mb-4 flex justify-between">
          <div className="flex gap-4">
            <Figure label="Count" value={topics.length} isLoading={isLoading} />
            <Figure
              label="Partitions"
              value={topics.reduce(
                (total, topic) => total + topic.numberOfPartitions,
                0,
              )}
              isLoading={isLoading}
            />
          </div>
          <div className="flex items-end justify-end gap-4">
            <CreateTopicPopover />
            <RefreshButton
              title="Refresh topics"
              isLoading={isLoading || isFetching}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onClickRefresh}
            />
          </div>
        </div>
        <TopicsTable topics={topics} isLoading={isLoading} />
      </>
    )}
  </div>
)

export const TopicsContainer = () => {
  const { data: topics = [], isLoading, isFetching, error } = useTopics()
  const queryClient = useQueryClient()

  return (
    <Topics
      topics={topics}
      isLoading={isLoading}
      isFetching={isFetching}
      error={error?.message}
      onClickRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: [topicsKey] })
      }}
    />
  )
}
