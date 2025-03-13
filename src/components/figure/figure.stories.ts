import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { Figure } from '.'

const meta = {
  title: 'components/figure',
  component: Figure,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 10,
    label: 'Figure',
  },
} satisfies Meta<typeof Figure>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('figure', { name: 'Figure' }),
    ).toHaveTextContent('10')
  },
}

export const LargeValue: Story = {
  args: {
    value: 1000,
    label: 'Figure',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('figure', { name: 'Figure' }),
    ).toHaveTextContent('1000')
  },
}

export const EvenLargerValue: Story = {
  args: {
    value: 1_403_870,
    label: 'Figure',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('figure', { name: 'Figure' }),
    ).toHaveTextContent('1403870')
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId('figure-skeleton')).toBeVisible()
  },
}
