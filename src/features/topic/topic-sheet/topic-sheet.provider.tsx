import { useState } from 'react'

import { TopicRecord } from '@/api/topics'
import { TopicSheet, TopicSheetContext } from '.'

export const TopicSheetProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [topicRecord, setTopicRecord] = useState<TopicRecord | null>(null)

  const openTopicSheet = (record: TopicRecord) => {
    setTopicRecord(record)
    setIsOpen(true)
  }

  const closeTopicSheet = () => {
    setIsOpen(false)
    setTopicRecord(null)
  }

  return (
    <TopicSheetContext.Provider
      value={{ isOpen, topicRecord, openTopicSheet, closeTopicSheet }}
    >
      {children}
      <TopicSheet
        isOpen={isOpen}
        closeTopicSheet={closeTopicSheet}
        topicRecord={topicRecord}
      />
    </TopicSheetContext.Provider>
  )
}
