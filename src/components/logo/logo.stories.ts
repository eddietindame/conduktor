import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '.'

const meta = {
  title: 'components/logo/full',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: '765',
    height: '120',
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const SetColour: Story = {
  args: {
    textColor: 'red',
    shapeColor: 'red',
  },
}

export const TwoColours: Story = {
  args: {
    textColor: 'blue',
    shapeColor: 'green',
  },
}
