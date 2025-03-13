import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { TopicsTable } from '.'

const meta = {
  title: 'components/topics-table',
  component: TopicsTable,
  render: args => (
    <div className="p-4">
      <TopicsTable {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
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
} satisfies Meta<typeof TopicsTable>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('cell', { name: 'Topic1' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: '1' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: 'Topic2' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: '2' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: 'Topic3' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: '3' })).toBeVisible()
  },
}

export const LongTopicNames: Story = {
  args: {
    topics: [
      {
        name: Array.from({ length: 10 })
          .map(() => 'long')
          .join('_'),
        numberOfPartitions: 1,
      },
      {
        name: Array.from({ length: 13 })
          .map(() => 'long')
          .join('_'),
        numberOfPartitions: 2,
      },
      {
        name: Array.from({ length: 7 })
          .map(() => 'long')
          .join('_'),
        numberOfPartitions: 3,
      },
    ],
  },
}

export const NoData: Story = {
  args: {
    topics: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('cell', { name: 'No results.' }),
    ).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('data-table-skeleton')).toBeVisible()
  },
}
