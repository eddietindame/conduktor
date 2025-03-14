import { LocaleSwitcherContainer as LocaleSwitcher } from '@/features/locale'
import { AuthButton } from '@/components/buttons'
import { Profile } from '@/components/profile'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = {
  onLogin: () => Promise<void>
  onLogout: () => Promise<void>
  isAuthenticated: boolean
  isLoading?: boolean
  username?: string
  userPicture?: string
}

export const Header = ({
  onLogin,
  onLogout,
  isAuthenticated,
  isLoading,
  username,
  userPicture,
}: HeaderProps) => (
  <div className="hidden flex-col border-b md:flex">
    <div className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Profile name={username} imageUrl={userPicture} isLoading={isLoading} />
      </div>
      <div className="flex gap-4">
        <LocaleSwitcher />
        <AuthButton
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      </div>
    </div>
  </div>
)
