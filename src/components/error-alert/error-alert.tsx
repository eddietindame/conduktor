import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReactNode, useId } from 'react'

type ErrorAlert = {
  message: string
  title?: string
  button?: ReactNode
}

export const ErrorAlert = ({ message, title, button }: ErrorAlert) => {
  const id = useId()
  return (
    <Alert variant="destructive" role="alert" aria-labelledby={id}>
      <AlertCircle className="h-4 w-4" />
      <div className="flex flex-1 justify-between">
        <div>
          {!!title && <AlertTitle id={id}>{title}</AlertTitle>}
          <AlertDescription>
            {message}
            {message[message.length - 1] === '.' ? '' : '.'}
          </AlertDescription>
        </div>
        <div className="flex items-center">{button}</div>
      </div>
    </Alert>
  )
}
