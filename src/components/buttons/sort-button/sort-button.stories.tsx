import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { SortButton } from '.'

const toggleSorting = fn()

const meta = {
  title: 'components/buttons/sort',
  component: SortButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    toggleSorting,
    isSorted: false,
    label: 'Name',
  },
} satisfies Meta<typeof SortButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Name' }))
    await expect(toggleSorting).toHaveBeenCalled()
  },
}

export const SortedAsc: Story = {
  args: {
    isSorted: 'asc',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Name sorted ascending' }),
    ).toBeVisible()
  },
}

export const SortedDesc: Story = {
  args: {
    isSorted: 'desc',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Name sorted descending' }),
    ).toBeVisible()
  },
}
