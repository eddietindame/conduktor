import type { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor, within } from '@storybook/test'
import { userEvent } from '@storybook/test'

import { locales, LocaleSwitcherContainer } from '.'

const meta = {
  title: 'features/locale/switcher',
  component: LocaleSwitcherContainer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LocaleSwitcherContainer>

export default meta
type Story = StoryObj<typeof meta>

// 'isVisible' works in storybook but not in vitest so using 'toBeInTheDocument' instead
// might be to do with the fact that the popover renders outside of the storybook root

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const iframe = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('combobox', { name: 'Locale' }))
    await expect(await iframe.findByRole('listbox')).toBeInTheDocument()
    await expect(iframe.getByText('Locale')).toBeInTheDocument()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    locales.forEach(async ({ label }) => {
      await expect(
        iframe.getByRole('option', { name: label }),
      ).toBeInTheDocument()
    })
    await expect(await canvas.findByText('English')).toBeInTheDocument()
  },
}

export const CloseOnSelect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const iframe = within(canvasElement.ownerDocument.body)
    const button = canvas.getByRole('combobox', { name: 'Locale' })

    await userEvent.click(button)
    await userEvent.click(
      await iframe.findByRole('option', { name: 'Japanese' }),
    )

    await waitFor(async () => {
      await expect(iframe.queryByRole('listbox')).not.toBeInTheDocument()
    })
    await expect(button).toHaveTextContent('Japanese')
  },
}
