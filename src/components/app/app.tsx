import { Route, Routes } from 'react-router'
import { useAuth0, User } from '@auth0/auth0-react'

import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { NotFound } from '@/components/not-found'
import { Explorer } from '@/components/explorer'
import { Console } from '@/components/console'
import { Header } from '@/components/header'
import { Home } from '@/components/home'

type AppProps = {
  onLogin: () => Promise<void>
  onLogout: () => Promise<void>
  isAuthenticated: boolean
  isLoading?: boolean
  user?: User
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
      <main className="flex h-full flex-col">
        <Header
          onLogin={onLogin}
          onLogout={onLogout}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          username={user?.name}
          userPicture={user?.picture}
        />
        <Routes>
          <Route
            path="/"
            element={<Home name={user?.name} isLoading={isLoading} />}
          />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/console" element={<Console />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
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
