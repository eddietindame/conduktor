import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Button } from '@/components/ui/button'

import { withPadding } from '#/storybook/decorators'
import { IconAlert } from '.'

const message = 'This is an alert'
const title = 'Alert'

const meta = {
  title: 'components/icon-alert',
  component: IconAlert,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    message,
    title,
  },
} satisfies Meta<typeof IconAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('alert', { name: title })).toHaveTextContent(
      message + '.',
    )
  },
}

const longTitle = 'Lorem ipsum dolor sit amet'
const longMessage =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut necessitatibus eius rem aspernatur veritatis eos ab totam quasi repellendus harum soluta, beatae voluptatibus. Cum, deserunt voluptatibus. Cumque fuga enim esse!'

export const LongText: Story = {
  args: {
    title: longTitle,
    message: longMessage,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('alert', { name: longTitle }),
    ).toHaveTextContent(longMessage)
  },
}

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('alert')).toHaveTextContent(message + '.')
  },
}

export const WithButton: Story = {
  args: {
    button: <Button>Hello</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('alert', { name: title })).toHaveTextContent(
      message,
    )
    await expect(canvas.getByRole('button', { name: 'Hello' })).toBeVisible()
  },
}

export const Error: Story = {
  args: {
    variant: 'destructive',
    message: 'This is an error message.',
    title: 'Error',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'This is a warning message.',
    title: 'Warning',
  },
}
