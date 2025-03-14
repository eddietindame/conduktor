import { Pause } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PauseButtonProps = React.ComponentProps<'button'> & {
  title: string
}

export const PauseButton = ({ title, ...props }: PauseButtonProps) => (
  <Button size="icon" title={title} variant="outline" {...props}>
    <Pause aria-hidden />
    <span className="sr-only">{title}</span>
  </Button>
)
