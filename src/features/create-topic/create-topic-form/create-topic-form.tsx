import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { CreateTopicInput, useCreateTopic } from '@/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type CreateTopicFormProps = {
  onSubmit: (topic: CreateTopicInput) => void
  isLoading?: boolean
  isError?: boolean
  className?: string
}

export const CreateTopicForm = ({
  className,
  onSubmit,
  isLoading,
  isError,
}: CreateTopicFormProps) => {
  const id = useId()
  const topicNameId = useId()
  const numberOfPartionsId = useId()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTopicInput>()

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      aria-labelledby={id}
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="leading-none font-medium" id={id}>
            New topic
          </h4>
          <p className="text-muted-foreground text-sm">
            Fill in the topic details.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={topicNameId}>Name</Label>
              <Input
                id={topicNameId}
                className={cn(
                  'col-span-2 h-8',
                  errors.topicName &&
                    'border-destructive focus-visible:border-destructive',
                )}
                {...register('topicName', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={numberOfPartionsId}>Partitions</Label>
              <Input
                id={numberOfPartionsId}
                type="number"
                defaultValue={1}
                min={1}
                className={cn(
                  'col-span-2 h-8',
                  errors.numberOfPartitions &&
                    'border-destructive focus-visible:border-destructive',
                )}
                {...register('numberOfPartitions', {
                  valueAsNumber: true,
                  required: true,
                  min: 1,
                })}
              />
            </div>
          </div>
        </div>
        {(errors.topicName || errors.numberOfPartitions) && (
          <span className="text-destructive">Fields are required.</span>
        )}
        {isError && (
          <span className="text-destructive">Something went wrong.</span>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 aria-hidden className="animate-spin" />}
          {isLoading ? 'Please wait' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

type CreateTopicFormContainerProps = {
  onSuccess?: () => void
  /** for mocking during testing only TODO: add MockServiceWorker */
  onSubmit?: () => void
}

export const CreateTopicFormContainer = ({
  onSuccess,
  onSubmit: _onSubmit,
}: CreateTopicFormContainerProps) => {
  const { mutate, isPending, isError } = useCreateTopic(onSuccess)
  const onSubmit = (topic: CreateTopicInput) =>
    _onSubmit ? _onSubmit() : mutate(topic)

  return (
    <CreateTopicForm
      onSubmit={onSubmit}
      isLoading={isPending}
      isError={isError}
    />
  )
}

// TODO: add extra validation for name structure and/or partition size
