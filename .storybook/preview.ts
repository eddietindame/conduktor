import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-remix-react-router'
import { withThemeByClassName } from '@storybook/addon-themes'

import {
  withLocaleProvider,
  withQueryClient,
  withThemeProvider,
  withTopicSheetProvider,
} from './decorators'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    withRouter,
    withQueryClient,
    withThemeProvider,
    withLocaleProvider,
    withTopicSheetProvider,
  ],
}

export default preview
