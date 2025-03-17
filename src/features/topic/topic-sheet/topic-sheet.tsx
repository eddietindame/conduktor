import { TopicRecord } from '@/api/topics'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useId } from 'react'

type TopicSheetProps = {
  isOpen: boolean
  closeTopicSheet: () => void
  topicRecord: TopicRecord | null
}

export const TopicSheet = ({
  isOpen,
  topicRecord,
  closeTopicSheet,
}: TopicSheetProps) => {
  const keyId = useId()
  const valueId = useId()
  const offsetId = useId()
  const partitionId = useId()

  return (
    <Sheet open={isOpen} onOpenChange={closeTopicSheet}>
      <SheetContent className="p-4 py-16">
        <SheetHeader className="text-3xl font-bold">
          <SheetTitle>Message detail</SheetTitle>
        </SheetHeader>
        {topicRecord && (
          <div className="flex flex-col gap-4 px-4">
            <div>
              <Label className="text-md inline font-bold" id={keyId}>
                Key:
              </Label>{' '}
              <span aria-labelledby={keyId}>{topicRecord.key}</span>
            </div>
            <div>
              <Label className="text-md inline font-bold" id={valueId}>
                Value:
              </Label>
              <pre
                className="bg-muted overflow-auto rounded-lg p-4 whitespace-pre-wrap"
                aria-labelledby={valueId}
              >
                {JSON.stringify(JSON.parse(topicRecord.value), null, 1)}
              </pre>
            </div>
            <div>
              <Label className="text-md inline font-bold" id={offsetId}>
                Offset:
              </Label>{' '}
              <span aria-labelledby={offsetId}>{topicRecord.offset}</span>
            </div>
            <div>
              <Label className="text-md inline font-bold" id={partitionId}>
                Partition:
              </Label>{' '}
              <span aria-labelledby={partitionId}>{topicRecord.partition}</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
