import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { withPadding } from '#/storybook/decorators'
import { TopicTable } from '.'

const data = Array.from({ length: 5 }).map((_, i) => ({
  key: `key${i + 1}`,
  value: `value${i + 1}`,
  offset: i + 1,
  partition: i + 1,
}))

const meta = {
  title: 'features/topic/table',
  component: TopicTable,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data,
  },
} satisfies Meta<typeof TopicTable>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('columnheader', { name: 'Key' }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('columnheader', { name: 'Value' }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('columnheader', { name: 'Offset' }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('columnheader', { name: 'Partition' }),
    ).toBeVisible()

    await expect(canvas.getByRole('cell', { name: 'key1' })).toBeVisible()
    await expect(canvas.getByRole('cell', { name: 'value1' })).toBeVisible()
    await expect(canvas.getAllByRole('cell', { name: '1' })).toHaveLength(2)
  },
}

const LOTS_OF_DATA_LENGTH = 50
const lotsOfData = Array.from({ length: LOTS_OF_DATA_LENGTH }).map((_, i) => ({
  key: `key${i + 1}`,
  value: `value${i + 1}`,
  offset: i + 1,
  partition: i + 1,
}))

export const LotsOfData: Story = {
  args: {
    data: lotsOfData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('row')).toHaveLength(
      LOTS_OF_DATA_LENGTH + 1,
    )
  },
}

export const NoData: Story = {
  args: {
    data: [],
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
