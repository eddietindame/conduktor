import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type RefreshButtonProps = React.ComponentProps<'button'> & {
  title: string
  isLoading?: boolean
}

export const RefreshButton = ({
  isLoading,
  title,
  ...props
}: RefreshButtonProps) => (
  <Button size="icon" disabled={isLoading} title={title} {...props}>
    <RefreshCw
      aria-hidden
      className={cn(
        isLoading && 'animate-reverse animation-duration-[2.5s] animate-spin',
      )}
    />
    <span className="sr-only">{title}</span>
  </Button>
)
