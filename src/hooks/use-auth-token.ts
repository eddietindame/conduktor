import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

export const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setToken(accessToken)
    }

    if (isAuthenticated) {
      getToken().catch(err => console.error('Error getting access token:', err))
    }
  }, [getAccessTokenSilently, isAuthenticated])

  return token
}

// TODO: add retry attempts
// TODO: add refresh logic
