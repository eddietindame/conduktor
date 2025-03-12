import type { Meta, StoryObj } from '@storybook/react'

import { Console } from '.'

const meta = {
  title: 'components/console',
  component: Console,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Console>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
