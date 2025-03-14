import type { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'
import { userEvent } from '@storybook/test'

import { CreateTopicPopover } from '.'

const meta = {
  title: 'features/create-topic/popover',
  component: CreateTopicPopover,
  parameters: {
    layout: 'centered',
  },
  args: {
    mockSubmit: true,
  },
} satisfies Meta<typeof CreateTopicPopover>

export default meta
type Story = StoryObj<typeof meta>

// 'isVisible' works in storybook but not in vitest so using 'toBeInTheDocument' instead
// might be to do with the fact that the popover renders outside of the storybook root

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const iframe = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Create' }))
    await expect(await iframe.findByRole('dialog')).toBeInTheDocument()
    await expect(
      await iframe.findByRole('form', { name: 'New topic' }),
    ).toBeInTheDocument()
  },
}

export const CloseOnSubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const iframe = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Create' }))
    await expect(await iframe.findByRole('dialog')).toBeInTheDocument()
    await expect(
      await iframe.findByRole('form', { name: 'New topic' }),
    ).toBeInTheDocument()

    await userEvent.type(iframe.getByLabelText('Name'), 'topic')
    await userEvent.click(iframe.getByRole('button', { name: /submit/i }))

    await waitFor(async () => {
      await expect(iframe.queryByRole('dialog')).not.toBeInTheDocument()
      await expect(
        iframe.queryByRole('form', { name: 'New topic' }),
      ).not.toBeInTheDocument()
    })
  },
}
