import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export const App = () => (
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
    </main>
  </SidebarProvider>
)
