import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { withPadding } from '#/storybook/decorators'
import { DataTable } from '.'

const meta = {
  title: 'components/data-table',
  component: DataTable,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data: [
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
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'numberOfPartitions',
        header: 'Partitions',
      },
    ],
  },
} satisfies Meta<typeof DataTable>

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
