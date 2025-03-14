import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

import { GenericSkeleton } from '@/components/generic-skeleton/generic-skeleton'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <GenericSkeleton />

  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
