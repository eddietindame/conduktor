import { Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TopicSheetProvider } from '@/features/topic/topic-sheet'
import { LocaleProvider } from '@/features/locale'
import { ThemeProvider } from '@/features/theme'

const queryClient = new QueryClient()

export const withQueryClient: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
)

export const withThemeProvider: Decorator = Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)

export const withTopicSheetProvider: Decorator = Story => (
  <TopicSheetProvider>
    <Story />
  </TopicSheetProvider>
)

export const withSidebarProvider: Decorator = Story => (
  <SidebarProvider>
    <Story />
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

export const withFullWidth: Decorator = Story => (
  <div className="w-full">
    <Story />
  </div>
)

export const withFullHeight: Decorator = Story => (
  <div className="h-screen">
    <Story />
  </div>
)
