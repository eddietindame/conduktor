import { NavLink } from 'react-router'
import {
  ChevronsLeftRightEllipsis,
  Home,
  ShieldAlert,
  Telescope,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { LogoIcon } from '@/components/logo-icon'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Explorer',
    url: '/topics',
    icon: Telescope,
  },
  {
    title: 'Console',
    url: '/console',
    icon: ChevronsLeftRightEllipsis,
  },
  {
    title: 'Security',
    url: '/security',
    icon: ShieldAlert,
  },
]

export const AppSidebar = () => (
  <Sidebar collapsible="icon" className="@container">
    <SidebarHeader>
      <Logo className="@4xs:block opacity-fade-in hidden w-full p-2" />
      <LogoIcon className="@4xs:hidden opacity-fade-in w-full p-2" />
    </SidebarHeader>
    <SidebarContent className="opacity-fade-in">
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <>
                        <item.icon />
                        <span className={isActive ? 'font-bold' : ''}>
                          {item.title}
                        </span>
                      </>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
)
