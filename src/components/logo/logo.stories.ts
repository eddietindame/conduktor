import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '.'

const meta = {
  title: 'components/logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: '765',
    height: '120',
    textColor: '#000',
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Red: Story = {
  args: {
    textColor: 'red',
    shapeColor: 'red',
  },
}
