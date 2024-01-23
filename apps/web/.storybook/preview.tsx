import { Preview } from '@storybook/react';

import { handlers } from '../src/mocks';
import '../src/tailwind.css';
import { initialize, mswLoader } from './decorators/mswLoader';

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
    msw: { handlers },
  },
  loaders: [mswLoader],
};

export default preview;
