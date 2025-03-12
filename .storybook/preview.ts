import type { Preview } from '@storybook/react'
import 'react-loading-skeleton/dist/skeleton.css'
import { withRouter } from 'storybook-addon-remix-react-router'

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
  decorators: [withRouter],
}

export default preview
