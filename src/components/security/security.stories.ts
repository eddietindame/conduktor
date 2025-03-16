import type { Meta, StoryObj } from '@storybook/react'

import { withPadding } from '#/storybook/decorators'
import { Security } from '.'

const meta = {
  title: 'components/security',
  component: Security,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Security>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
