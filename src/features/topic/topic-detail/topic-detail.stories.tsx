import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { withPadding } from '#/storybook/decorators'
import { TopicDetail } from '.'

const onClickRefresh = fn()
const onClickConnect = fn()
const onClickClose = fn()
const onClickClear = fn()

const data = Array.from({ length: 5 }).map((_, i) => ({
  key: `key${i + 1}`,
  value: `value${i + 1}`,
  offset: i + 1,
  partition: i + 1,
}))

const meta = {
  title: 'features/topic/detail',
  component: TopicDetail,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data,
    name: 'topic1',
    isOpen: true,
    isSubscribed: true,
    onClickRefresh,
    onClickConnect,
    onClickClose,
    onClickClear,
  },
} satisfies Meta<typeof TopicDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole('button', { name: 'Refresh connection' }),
    )
    await expect(onClickRefresh).toHaveBeenCalled()
    await userEvent.click(
      canvas.getByRole('button', { name: 'Pause connection' }),
    )
    await expect(onClickClose).toHaveBeenCalled()
    await userEvent.click(canvas.getByRole('button', { name: 'Clear data' }))
    await expect(onClickClear).toHaveBeenCalled()
  },
}

export const NoData: Story = {
  args: {
    data: [],
    isSubscribed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('cell', { name: 'No results.' }),
    ).toBeVisible()
  },
}

export const Error: Story = {
  args: {
    error: 'Error fetching data.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('alert', { name: 'Subscription error' }),
    ).toHaveTextContent('Error fetching data.')
    await userEvent.click(
      canvas.getByRole('button', { name: 'Refresh connection' }),
    )
    await expect(onClickRefresh).toHaveBeenCalled()
  },
}

export const Loading: Story = {
  args: {
    data: [],
    isOpen: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('data-table-skeleton')).toBeVisible()
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open connection' }),
    )
    await expect(onClickConnect).toHaveBeenCalled()
  },
}
