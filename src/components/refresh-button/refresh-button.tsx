import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type RefreshButtonProps = React.ComponentProps<'button'> & {
  isLoading?: boolean
}

export const RefreshButton = ({ isLoading, ...props }: RefreshButtonProps) => (
  <Button size="icon" disabled={isLoading} {...props}>
    <RefreshCw
      aria-hidden
      className={cn(
        isLoading && 'animate-reverse animation-duration-[2.5s] animate-spin',
      )}
    />
    <span className="sr-only">Refresh topics</span>
  </Button>
)
