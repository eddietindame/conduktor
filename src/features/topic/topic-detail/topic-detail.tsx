import { useParams } from 'react-router'

import { TopicRecord, useTopicSubscription } from '@/api'
import {
  PlayButton,
  PauseButton,
  RefreshButton,
  ClearButton,
} from '@/components/buttons'
import { ErrorAlert } from '@/components/error-alert'
import { TopicStatus, TopicStatusProps } from '../topic-status'
import { TopicTable } from '../topic-table'

type TopicDetailProps = {
  name: string
  data: TopicRecord[]
  isOpen: boolean
  isSubscribed: boolean
  error?: string
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
      <ErrorAlert
        message={error}
        title="Subscription error"
        button={
          <RefreshButton title="Refresh connection" onClick={onClickRefresh} />
        }
      />
    ) : (
      <>
        <div className="mb-4 flex items-end justify-end gap-4">
          <ClearButton title="Clear data" onClick={onClickClear} />
          {isOpen ? (
            <PauseButton onClick={onClickClose} title="Pause connection" />
          ) : (
            <PlayButton onClick={onClickConnect} title="Open connection" />
          )}
          <RefreshButton title="Refresh connection" onClick={onClickRefresh} />
        </div>
        <TopicTable data={data} isLoading={!isOpen && !data.length} />
      </>
    )}
  </div>
)

export const TopicDetailContainer = () => {
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
  } = useTopicSubscription(topicName!)

  return (
    <TopicDetail
      name={topicName!}
      data={data}
      isOpen={isOpen}
      isSubscribed={isSubscribed}
      error={error}
      onClickClear={clearData}
      onClickConnect={connect}
      onClickClose={close}
      onClickRefresh={reset}
    />
  )
}
