import type { Meta, StoryObj } from '@storybook/react'

import { App } from '.'

const meta = {
  title: 'components/app',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isAuthenticated: false,
    onLogin: () => Promise.resolve(),
    onLogout: () => Promise.resolve(),
  },
} satisfies Meta<typeof App>

export default meta
type Story = StoryObj<typeof meta>

export const NotAuthenticated: Story = {}

export const Authenticated: Story = {
  args: {
    user: {
      name: 'Eddie Tindame',
      picture: 'https://avatars.githubusercontent.com/u/14052875?v=4',
    },
    isAuthenticated: true,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
