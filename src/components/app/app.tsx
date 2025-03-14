import { Route, Routes } from 'react-router'
import { useAuth0, User } from '@auth0/auth0-react'

import { useLocale } from '@/features/locale'
import { useSidebar } from '@/components/ui/sidebar'
import ProtectedRoute from '@/components/protected-route/protected-route'
import { TopicDetailContainer as TopicDetail } from '@/features/topic/topic-detail'
import { TopicsContainer as Topics } from '@/components/topics'
import { AppSidebar } from '@/components/app-sidebar'
import { NotFound } from '@/components/not-found'
import { Console } from '@/components/console'
import { Header } from '@/components/header'
import { Home } from '@/components/home'
import { cn } from '@/lib/utils'

type AppProps = {
  onLogin: () => Promise<void>
  onLogout: () => Promise<void>
  isAuthenticated: boolean
  locale: string
  isLoading?: boolean
  user?: User
}

export const App = ({
  onLogin,
  onLogout,
  isAuthenticated,
  user,
  isLoading,
  locale,
}: AppProps) => {
  const { open } = useSidebar()
  return (
    <>
      <AppSidebar />
      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          open ? 'w-[calc(100%_-_var(--sidebar-width))]' : 'w-full',
        )}
      >
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
              element={
                <Home name={user?.name} isLoading={isLoading} locale={locale} />
              }
            />
            <Route
              path="/topics"
              element={
                <ProtectedRoute>
                  <Topics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/topics/:topicName"
              element={
                <ProtectedRoute>
                  <TopicDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/console"
              element={
                <ProtectedRoute>
                  <Console />
                </ProtectedRoute>
              }
            />
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export const AppContainer = () => {
  const { locale } = useLocale()
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
      locale={locale}
    />
  )
}
