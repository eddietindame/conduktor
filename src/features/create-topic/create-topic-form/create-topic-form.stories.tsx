import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, within, userEvent, waitFor } from '@storybook/test'

import { CreateTopicForm } from '.'

const onSubmit = fn()

const meta = {
  title: 'features/create-topic/form',
  component: CreateTopicForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit,
  },
} satisfies Meta<typeof CreateTopicForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const EnterFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nameValue = 'topic'
    await userEvent.type(canvas.getByLabelText('Name'), nameValue)
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }))
    await waitFor(async () => {
      // react-hook-form has odd behaviour with testing-library
      // have to drill into the mock calls to get the value without the synthetic event
      await expect(onSubmit.mock.calls[0][0]).toEqual({
        topicName: nameValue,
        numberOfPartitions: 1,
      })
    })
  },
}

export const MissingFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }))
    await expect(canvas.getByText('Fields are required.')).toBeVisible()
    await expect(onSubmit).not.toBeCalled()
  },
}

export const Error: Story = {
  args: { isError: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Something went wrong.')).toBeVisible()
  },
}
