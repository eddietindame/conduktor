import type { Meta, StoryObj } from '@storybook/react'

import { App } from '.'

const meta = {
  title: 'components/app',
  component: App,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    user: {
      name: 'Eddie Tindame',
      picture: 'https://avatars.githubusercontent.com/u/14052875?v=4',
    },
    isAuthenticated: true,
    isLoading: false,
    onLogin: () => Promise.resolve(),
    onLogout: () => Promise.resolve(),
  },
} satisfies Meta<typeof App>

export default meta
type Story = StoryObj<typeof meta>

export const Authenticated: Story = {}

export const NotAuthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
