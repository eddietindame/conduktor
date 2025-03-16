import { useParams } from 'react-router'

import { TopicRecord, useTopicSubscription } from '@/api/topics'
import {
  PlayButton,
  PauseButton,
  RefreshButton,
  ClearButton,
} from '@/components/buttons'
import { IconAlert } from '@/components/icon-alert'
import { TopicStatus, TopicStatusProps } from '../topic-status'
import { TopicTable } from '../topic-table'
import { useAuthToken } from '@/hooks/use-auth-token'

type TopicDetailProps = {
  name: string
  data: TopicRecord[]
  isOpen: boolean
  isSubscribed: boolean
  limit: number
  error?: string
  isLoading?: boolean
  onClickRefresh: () => void
  onClickConnect: () => void
  onClickClose: () => void
  onClickClear: () => void
}

const getStatus = (
  isOpen: boolean,
  isSubscribed: boolean,
): TopicStatusProps['status'] => {
  if (!isOpen) return 'Closed'
  if (isSubscribed) return 'Subscribed'
  return 'Open'
}

export const TopicDetail = ({
  name,
  data,
  isOpen,
  isSubscribed,
  error,
  limit,
  isLoading = false,
  onClickRefresh,
  onClickConnect,
  onClickClose,
  onClickClear,
}: TopicDetailProps) => (
  <div className="p-4">
    <h1 className="mb-4 text-3xl font-bold">Realtime consumer</h1>
    <div className="mb-4 flex items-center gap-4">
      <h2 className="text-xl">
        Topic: <span className="font-mono font-bold italic">{name}</span>
      </h2>
      <TopicStatus status={getStatus(isOpen, isSubscribed)} />
    </div>
    {error ? (
      <IconAlert
        message={error}
        title="Subscription error"
        button={
          <RefreshButton
            title="Refresh connection"
            onClick={onClickRefresh}
            disabled={isLoading}
          />
        }
      />
    ) : (
      <>
        <div className="flex items-end justify-between">
          <div className="mb-3 italic">
            Showing last <code>{limit}</code> messages
          </div>
          <div className="mb-4 flex items-end justify-end gap-4">
            <ClearButton
              title="Clear data"
              onClick={onClickClear}
              disabled={isLoading}
            />
            {isOpen ? (
              <PauseButton
                onClick={onClickClose}
                title="Pause connection"
                disabled={isLoading}
              />
            ) : (
              <PlayButton
                onClick={onClickConnect}
                title="Open connection"
                disabled={isLoading}
              />
            )}
            <RefreshButton
              title="Refresh connection"
              onClick={onClickRefresh}
              disabled={isLoading}
            />
          </div>
        </div>
        <TopicTable data={data} isLoading={!isOpen && !data.length} />
      </>
    )}
  </div>
)

export const TopicDetailContainer = () => {
  const token = useAuthToken()
  const limit = 50
  const { topicName } = useParams<{
    topicName: string
  }>()
  const {
    isOpen,
    isSubscribed,
    data,
    error,
    clearData,
    connect,
    close,
    reset,
  } = useTopicSubscription(topicName!, limit)

  return (
    <TopicDetail
      limit={limit}
      name={topicName!}
      data={data}
      isOpen={isOpen}
      isSubscribed={isSubscribed}
      error={error}
      isLoading={!token}
      onClickClear={clearData}
      onClickConnect={connect}
      onClickClose={close}
      onClickRefresh={reset}
    />
  )
}
