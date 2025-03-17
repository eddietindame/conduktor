import { TopicRecord } from '@/api/topics'
import { Button } from '@/components/ui/button'
import { useTopicSheet } from '.'

type TopicSheetButtonProps = {
  topicRecord: TopicRecord
}

export const TopicSheetButton = ({ topicRecord }: TopicSheetButtonProps) => {
  const { openTopicSheet } = useTopicSheet()
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => {
        openTopicSheet(topicRecord)
      }}
    >
      Inspect
    </Button>
  )
}
