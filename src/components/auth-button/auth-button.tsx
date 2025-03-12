import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

type AuthButtonProps = {
  isAuthenticated: boolean
  onLogin: () => Promise<void>
  onLogout: () => Promise<void>
  isLoading?: boolean
}

export const AuthButton = ({
  isAuthenticated,
  isLoading,
  onLogin,
  onLogout,
}: AuthButtonProps) => {
  if (isLoading) {
    return (
      <Button disabled>
        <Loader2 aria-hidden className="animate-spin" />
        Please wait
      </Button>
    )
  }

  if (isAuthenticated) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return <Button onClick={onLogout}>Logout</Button>
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <Button onClick={onLogin}>Login</Button>
}
