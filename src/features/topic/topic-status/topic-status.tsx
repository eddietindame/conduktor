import { cn } from '@/lib/utils'

export type TopicStatusProps = {
  status: 'Closed' | 'Subscribed' | 'Open'
}

const getStatusColorClassName = (status: TopicStatusProps['status']) => {
  switch (status) {
    case 'Closed':
      return 'bg-red-500'
    case 'Subscribed':
      return 'bg-green-500'
    case 'Open':
      return 'bg-yellow-500'
    default:
      return 'bg-grey-500'
  }
}

export const TopicStatus = ({ status }: TopicStatusProps) => {
  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      <span className="font-bold">Status:</span>
      <span
        className={cn('size-3 rounded-full', getStatusColorClassName(status))}
      />
      <span className="italic">{status}</span>
    </div>
  )
}
