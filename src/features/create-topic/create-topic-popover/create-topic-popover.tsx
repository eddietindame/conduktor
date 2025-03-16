import { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CreateTopicFormContainer as CreateTopicForm } from '../'

type CreateTopicPopoverProps = {
  disabled?: boolean
  /** for mocking during testing only TODO: add MockServiceWorker */
  mockSubmit?: boolean
}

export const CreateTopicPopover = ({
  mockSubmit,
  disabled = false,
}: CreateTopicPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onSubmit = mockSubmit ? () => setIsOpen(false) : undefined

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Create
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-4 w-80">
        <CreateTopicForm
          onSuccess={() => setIsOpen(false)}
          onSubmit={onSubmit}
        />
      </PopoverContent>
    </Popover>
  )
}
