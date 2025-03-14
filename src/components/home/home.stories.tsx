import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { withFullHeight } from '#/storybook/decorators'
import { Home } from '.'

const meta = {
  title: 'components/home',
  component: Home,
  decorators: [withFullHeight],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const NotAuthenticated: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Sign in')).toBeVisible()
  },
}

export const Authenticated: Story = {
  args: {
    name: 'Eddie Tindame',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Welcome,')).toBeVisible()
    await expect(canvas.getByText('Eddie Tindame')).toBeVisible()
    await expect(
      canvas.getByText('Explore the app through the nav-bar!'),
    ).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('generic-skeleton')).toBeVisible()
  },
}
