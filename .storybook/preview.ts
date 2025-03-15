import type { Preview } from '@storybook/react'
import 'react-loading-skeleton/dist/skeleton.css'
import { withRouter } from 'storybook-addon-remix-react-router'
import { withThemeByClassName } from '@storybook/addon-themes'

import {
  withLocaleProvider,
  withQueryClient,
  withThemeProvider,
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
  ],
}

export default preview
