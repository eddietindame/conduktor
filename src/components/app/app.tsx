import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Profile } from '@/components/profile'

export const App = () => (
  <SidebarProvider>
    <AppSidebar />
    <div className="flex-1">
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Profile name="Test" />
          </div>
        </div>
      </div>
      <main>
        <SidebarTrigger />
      </main>
    </div>
  </SidebarProvider>
)
