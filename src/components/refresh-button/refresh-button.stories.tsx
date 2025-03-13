import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { RefreshButton } from '.'

const meta = {
  title: 'components/refresh-button',
  component: RefreshButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RefreshButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Refresh topics' }),
    ).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Refresh topics' }),
    ).toBeDisabled()
  },
}
