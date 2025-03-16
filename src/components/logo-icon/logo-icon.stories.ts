import type { Meta, StoryObj } from '@storybook/react'

import { LogoIcon } from '.'

const meta = {
  title: 'components/logo/icon',
  component: LogoIcon,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: '120',
    height: '120',
  },
} satisfies Meta<typeof LogoIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const SetColour: Story = {
  args: {
    shapeColor: 'red',
  },
}
