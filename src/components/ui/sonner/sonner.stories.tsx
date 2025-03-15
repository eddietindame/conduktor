import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { Toaster } from '.'

const meta = {
  title: 'components/ui/toaster',
  component: Toaster,
  render: () => (
    <>
      <Toaster richColors />
      <div className="flex gap-4">
        <Button
          onClick={() => {
            toast('Hello, world!')
          }}
        >
          Toast
        </Button>
        <Button
          onClick={() => {
            toast.success('Success!')
          }}
          variant="green"
        >
          Success
        </Button>
        <Button
          onClick={() => {
            toast.error('Error!')
          }}
          variant="destructive"
        >
          Error
        </Button>
      </div>
    </>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

// using waitFor instead of findBy as even when the toast is rendered it not initially visible

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Toast' }))
    await waitFor(async () => {
      await expect(canvas.getByText('Hello, world!')).toBeVisible()
    })
  },
}

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Success' }))
    await waitFor(async () => {
      await expect(canvas.getByText('Success!')).toBeVisible()
    })
  },
}

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Error' }))
    await waitFor(async () => {
      await expect(canvas.getByText('Error!')).toBeVisible()
    })
  },
}
