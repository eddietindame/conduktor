import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { ClearButton } from '.'

const meta = {
  title: 'components/buttons/clear',
  component: ClearButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Clear',
  },
} satisfies Meta<typeof ClearButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Clear' })).toBeVisible()
  },
}
