import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { withPadding } from '#/storybook/decorators'
import { SortButtonContainer as SortButton } from '@/components/buttons/sort-button'
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

export const Sorting: Story = {
  args: {
    columns: [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortButton column={column} label="Name" />,
      },
      {
        accessorKey: 'numberOfPartitions',
        header: 'Partitions',
      },
    ],
    data: [
      {
        name: 'Topic2',
        numberOfPartitions: 2,
      },
      {
        name: 'Topic1',
        numberOfPartitions: 1,
      },
      {
        name: 'Topic3',
        numberOfPartitions: 3,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sortButton = canvas.getByRole('button', { name: 'Name' })
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic2')
    await userEvent.click(sortButton)
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic1')
    await userEvent.click(sortButton)
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic3')
    await expect(
      canvas.getByRole('button', { name: 'Reset sorting' }),
    ).toBeVisible()
  },
}

export const ResetSorting: Story = {
  args: {
    columns: [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortButton column={column} label="Name" />,
      },
      {
        accessorKey: 'numberOfPartitions',
        header: 'Partitions',
      },
    ],
    data: [
      {
        name: 'Topic2',
        numberOfPartitions: 2,
      },
      {
        name: 'Topic1',
        numberOfPartitions: 1,
      },
      {
        name: 'Topic3',
        numberOfPartitions: 3,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sortButton = canvas.getByRole('button', { name: 'Name' })
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic2')
    await userEvent.click(sortButton)
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic1')
    await userEvent.click(sortButton)
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic3')
    await userEvent.click(canvas.getByRole('button', { name: 'Reset sorting' }))
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Topic2')
    await expect(
      canvas.queryByRole('button', { name: 'Reset sorting' }),
    ).not.toBeInTheDocument()
  },
}

export const Filter: Story = {
  args: {
    filter: {
      placeholder: 'Filter topics name...',
      key: 'name',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('row')).toHaveLength(4)
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Filter topics name...' }),
      'Topic1',
    )
    await expect(canvas.getAllByRole('row')).toHaveLength(2)
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
