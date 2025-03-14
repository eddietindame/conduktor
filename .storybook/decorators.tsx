import { Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SidebarProvider } from '@/components/ui/sidebar'
import { LocaleProvider } from '@/features/locale'

const queryClient = new QueryClient()

export const withQueryClient: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
)

export const withSidebarProvider: Decorator = Story => (
  <SidebarProvider>
    <div className="w-full">
      <Story />
    </div>
  </SidebarProvider>
)
export const withLocaleProvider: Decorator = Story => (
  <LocaleProvider>
    <Story />
  </LocaleProvider>
)

export const withPadding: Decorator = Story => (
  <div className="p-4">
    <Story />
  </div>
)

export const withFullHeight: Decorator = Story => (
  <div className="h-screen">
    <Story />
  </div>
)
