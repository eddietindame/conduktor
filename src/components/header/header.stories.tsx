import type { Meta, StoryObj } from '@storybook/react'

import { SidebarProvider } from '@/components/ui/sidebar'
import { Header } from '.'

const meta = {
  title: 'components/header',
  component: Header,
  render: args => (
    <SidebarProvider>
      <div className="w-full">
        <Header {...args} />
      </div>
    </SidebarProvider>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: () => Promise.resolve(),
    onLogout: () => Promise.resolve(),
    isAuthenticated: false,
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const NotAuthenticated: Story = {}

export const Authenticated: Story = {
  args: {
    username: 'Eddie Tindame',
    userPicture: 'https://avatars.githubusercontent.com/u/14052875?v=4',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
