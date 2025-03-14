import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { withFullHeight } from '#/storybook/decorators'
import { NotFound } from '.'

const meta = {
  title: 'components/not-found',
  component: NotFound,
  decorators: [withFullHeight],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('404')).toBeVisible()
    await expect(
      canvas.getByText("Oops! The page you're looking for doesn't exist."),
    ).toBeVisible()
    await expect(
      canvas.getByRole('link', { name: 'Go back home' }),
    ).toBeVisible()
  },
}
