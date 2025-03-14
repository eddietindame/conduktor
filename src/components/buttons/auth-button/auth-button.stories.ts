import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { AuthButton } from '.'

const onLogin = fn()
const onLogout = fn()

const meta = {
  title: 'components/buttons/auth',
  component: AuthButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isAuthenticated: true,
    onLogin,
    onLogout,
  },
} satisfies Meta<typeof AuthButton>

export default meta
type Story = StoryObj<typeof meta>

export const Authenticated: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Logout' })
    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(onLogout).toHaveBeenCalled()
  },
}

export const NotAuthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Login' })
    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(onLogin).toHaveBeenCalled()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Please wait' })
    await expect(button).toBeVisible()
  },
}
