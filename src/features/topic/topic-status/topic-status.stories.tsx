import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { TopicStatus } from '.'

const meta = {
  title: 'features/topic/status',
  component: TopicStatus,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TopicStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    status: 'Open',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Open')).toBeVisible()
  },
}

export const Subscribed: Story = {
  args: {
    status: 'Subscribed',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Subscribed')).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    status: 'Closed',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Closed')).toBeVisible()
  },
}
