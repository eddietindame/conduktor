import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { GenericSkeleton } from '.'

const meta = {
  title: 'components/generic-skeleton',
  component: GenericSkeleton,
  render: () => (
    <div className="p-4">
      <GenericSkeleton />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GenericSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('generic-skeleton')).toBeVisible()
  },
}
