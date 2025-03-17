import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { withPadding } from '#/storybook/decorators'
import { TopicSheet } from '.'

const meta = {
  title: 'features/topic-sheet',
  component: TopicSheet,
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    closeTopicSheet: () => {},
    topicRecord: {
      key: 'key1',
      value:
        '{"id":"9734fefd-ce0a-43d7-9e68-1b06c65e6463","timestamp":1742172261383}',
      offset: 1,
      partition: 1,
    },
  },
} satisfies Meta<typeof TopicSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const iframe = within(canvasElement.ownerDocument.body)
    await expect(await iframe.findByLabelText('Key:')).toHaveTextContent('key1')
    await expect(await iframe.findByLabelText('Value:')).toHaveTextContent(
      '{ "id": "9734fefd-ce0a-43d7-9e68-1b06c65e6463", "timestamp": 1742172261383 }',
    )
    await expect(await iframe.findByLabelText('Offset:')).toHaveTextContent('1')
    await expect(await iframe.findByLabelText('Partition:')).toHaveTextContent(
      '1',
    )
  },
}
