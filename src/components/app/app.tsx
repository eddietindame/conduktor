import { useAuth0, User } from '@auth0/auth0-react'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { AuthButton } from '@/components/auth-button'
import { Profile } from '@/components/profile'

type AppProps = {
  onLogin: () => Promise<void>
  onLogout: () => Promise<void>
  isAuthenticated: boolean
  user?: User
  isLoading?: boolean
}

export const App = ({
  onLogin,
  onLogout,
  isAuthenticated,
  user,
  isLoading,
}: AppProps) => (
  <SidebarProvider>
    <AppSidebar />
    <div className="flex-1">
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <div>
              {isAuthenticated && (
                <Profile
                  name={user?.name}
                  imageUrl={user?.picture}
                  isLoading={isLoading}
                />
              )}
            </div>
            <AuthButton
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              onLogin={onLogin}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
      <main>
        <SidebarTrigger />
      </main>
    </div>
  </SidebarProvider>
)

export const AppContainer = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0()

  const onLogin = () => loginWithRedirect()
  const onLogout = () => logout()

  return (
    <App
      user={user}
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      onLogin={onLogin}
      onLogout={onLogout}
    />
  )
}
