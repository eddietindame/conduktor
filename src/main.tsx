import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { LocaleProvider } from '@/features/locale'
import { ThemeProvider } from '@/features/theme'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppContainer } from '@/components/app'
import '@/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LocaleProvider>
            <ThemeProvider>
              <SidebarProvider>
                <AppContainer />
                <Toaster richColors />
              </SidebarProvider>
            </ThemeProvider>
          </LocaleProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>,
)
