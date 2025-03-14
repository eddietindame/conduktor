import { Eraser } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ClearButtonProps = React.ComponentProps<'button'> & {
  title: string
}

export const ClearButton = ({ title, ...props }: ClearButtonProps) => (
  <Button size="icon" title={title} variant="outline" {...props}>
    <Eraser aria-hidden />
    <span className="sr-only">{title}</span>
  </Button>
)
