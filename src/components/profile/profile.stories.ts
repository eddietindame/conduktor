import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { Profile } from '.'

const imageUrl = 'https://avatars.githubusercontent.com/u/14052875?v=4'

const meta = {
  title: 'components/profile',
  component: Profile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    imageUrl,
    name: 'Eddie Tindame',
  },
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const WithPicture: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(await canvas.findByRole('img')).toHaveAttribute(
      'src',
      imageUrl,
    )
    await expect(canvas.getByText('Eddie Tindame')).toBeVisible()
  },
}

export const WithoutPicture: Story = {
  args: {
    imageUrl: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument()
    await expect(canvas.getByText('ET')).toBeVisible()
    await expect(canvas.getByText('Eddie Tindame')).toBeVisible()
  },
}

export const LoggedOut: Story = {
  args: {
    imageUrl: undefined,
    name: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument()
    await expect(canvas.queryByText('ET')).not.toBeInTheDocument()
    await expect(canvas.queryByText('Eddie Tindame')).not.toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument()
    await expect(canvas.queryByText('ET')).not.toBeInTheDocument()
    await expect(canvas.queryByText('Eddie Tindame')).not.toBeInTheDocument()
    await expect(canvas.getByTestId('profile-avatar-skeleton')).toBeVisible()
    await expect(canvas.getByTestId('profile-name-skeleton')).toBeVisible()
  },
}
