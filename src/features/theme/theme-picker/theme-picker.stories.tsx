import type { Meta, StoryObj } from '@storybook/react'

import { ThemePicker } from '.'

const meta = {
  title: 'features/theme/picker',
  component: ThemePicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThemePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
