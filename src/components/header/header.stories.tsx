import type { Meta, StoryObj } from '@storybook/react'

import { withSidebarProvider } from '#/storybook/decorators'
import { Header } from '.'

const meta = {
  title: 'components/header',
  component: Header,
  decorators: [withSidebarProvider],
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
    isAuthenticated: true,
    username: 'Eddie Tindame',
    userPicture: 'https://avatars.githubusercontent.com/u/14052875?v=4',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
