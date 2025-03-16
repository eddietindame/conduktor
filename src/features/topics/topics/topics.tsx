import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'

import { useAuthToken } from '@/hooks/use-auth-token'
import { Topic, topicsKey, useTopics } from '@/api/topics'
import { CreateTopicPopover } from '@/features/create-topic'
import { buttonVariants } from '@/components/ui/button'
import { RefreshButton } from '@/components/buttons'
import { IconAlert } from '@/components/icon-alert'
import { Figure } from '@/components/figure'
import { TopicsTable } from '..'

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
    <IconAlert
      message="Some topics may contain sensitive or confidential information. Ensure you have the appropriate authorization before consuming any data."
      title="Security advisory"
      className="mb-4"
      button={
        <Link
          to={`/security`}
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          Read more
        </Link>
      }
    />
    <h1 className="mb-4 text-3xl font-bold">Topics</h1>
    {error ? (
      <IconAlert
        variant="destructive"
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
            <CreateTopicPopover disabled={isLoading} />
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
  const token = useAuthToken()
  const queryClient = useQueryClient()

  return (
    <Topics
      topics={topics}
      isLoading={isLoading || !token}
      isFetching={isFetching}
      error={error?.message}
      onClickRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: [topicsKey] })
      }}
    />
  )
}
