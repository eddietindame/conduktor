import type { Meta, StoryObj } from '@storybook/react'

import { Explorer } from '.'

const meta = {
  title: 'components/explorer',
  component: Explorer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Explorer>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
