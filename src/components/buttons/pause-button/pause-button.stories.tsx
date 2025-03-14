import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { PauseButton } from '.'

const meta = {
  title: 'components/buttons/pause',
  component: PauseButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Pause',
  },
} satisfies Meta<typeof PauseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Pause' })).toBeVisible()
  },
}
