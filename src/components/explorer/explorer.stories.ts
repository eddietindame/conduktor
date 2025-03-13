import type { Meta, StoryObj } from '@storybook/react'

import { Explorer } from '.'

const meta = {
  title: 'components/explorer',
  component: Explorer,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    topics: [
      {
        name: 'Topic1',
        numberOfPartitions: 1,
      },
      {
        name: 'Topic2',
        numberOfPartitions: 2,
      },
      {
        name: 'Topic3',
        numberOfPartitions: 3,
      },
    ],
  },
} satisfies Meta<typeof Explorer>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const NoTopics: Story = {
  args: {
    topics: [],
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
