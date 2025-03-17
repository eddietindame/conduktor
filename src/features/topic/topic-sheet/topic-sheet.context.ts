import { createContext, useContext } from 'react'

import { TopicRecord } from '@/api/topics'

type TopicSheetContextType = {
  isOpen: boolean
  topicRecord: TopicRecord | null
  openTopicSheet: (record: TopicRecord) => void
  closeTopicSheet: () => void
}

export const TopicSheetContext = createContext<
  TopicSheetContextType | undefined
>(undefined)

export const useTopicSheet = () => {
  const context = useContext(TopicSheetContext)
  if (!context) throw new Error('useSheet must be used within a SheetProvider')
  return context
}
