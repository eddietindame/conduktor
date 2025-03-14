import { Play } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PlayButtonProps = React.ComponentProps<'button'> & {
  title: string
}

export const PlayButton = ({ title, ...props }: PlayButtonProps) => (
  <Button size="icon" title={title} variant="green" {...props}>
    <Play aria-hidden />
    <span className="sr-only">{title}</span>
  </Button>
)
