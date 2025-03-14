import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { PlayButton } from '.'

const meta = {
  title: 'components/buttons/play',
  component: PlayButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Pause',
  },
} satisfies Meta<typeof PlayButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Pause' })).toBeVisible()
  },
}
