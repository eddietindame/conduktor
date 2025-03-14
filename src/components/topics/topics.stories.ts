import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { Topics } from '.'

const onClickRefresh = fn()

const meta = {
  title: 'components/topics',
  component: Topics,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onClickRefresh,
    topics: [
      {
        name: 'Topic1',
        numberOfPartitions: 1,
      },
      {
        name: 'Topic2',
        numberOfPartitions: 2,
      },
      {
        name: 'Topic3',
        numberOfPartitions: 3,
      },
    ],
  },
} satisfies Meta<typeof Topics>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole('button', { name: 'Refresh topics' }),
    )
    await expect(onClickRefresh).toHaveBeenCalled()
  },
}

export const NoTopics: Story = {
  args: {
    topics: [],
  },
}

const TOPICS_COUNT = 50

export const ManyTopics: Story = {
  args: {
    topics: Array.from({ length: TOPICS_COUNT }).map((_, i) => ({
      name: 'Topic' + (i + 1),
      numberOfPartitions: i + 1,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('row')).toHaveLength(TOPICS_COUNT + 1)
    await expect(
      canvas.getByRole('figure', { name: 'Count' }),
    ).toHaveTextContent(TOPICS_COUNT.toString())
    await expect(
      canvas.getByRole('figure', { name: 'Partitions' }),
    ).toHaveTextContent('1275')
  },
}

export const Error: Story = {
  args: {
    error: 'Error fetching topics.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('alert', { name: 'Fetch error' }),
    ).toHaveTextContent('Error fetching topics.')
    await userEvent.click(
      canvas.getByRole('button', { name: 'Refresh topics' }),
    )
    await expect(onClickRefresh).toHaveBeenCalled()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
