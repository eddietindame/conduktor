import { AlertCircle, TriangleAlert } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReactNode, useId } from 'react'

type IconAlertProps = {
  message: string
  title?: string
  button?: ReactNode
  variant?: 'destructive' | 'warning' | 'default'
  className?: string
}

export const IconAlert = ({
  message,
  title,
  button,
  variant = 'default',
  className,
}: IconAlertProps) => {
  const id = useId()
  return (
    <Alert
      variant={variant}
      role="alert"
      aria-labelledby={id}
      className={className}
    >
      {variant === 'warning' ? (
        <TriangleAlert className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <div className="flex flex-1 justify-between">
        <div>
          {!!title && <AlertTitle id={id}>{title}</AlertTitle>}
          <AlertDescription>
            {message}
            {message[message.length - 1] === '.' ? '' : '.'}
          </AlertDescription>
        </div>
        {button && <div className="ml-4 flex items-center">{button}</div>}
      </div>
    </Alert>
  )
}
