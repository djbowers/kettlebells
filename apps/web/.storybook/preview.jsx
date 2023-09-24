import { initialize, mswLoader } from 'msw-storybook-addon';

import { handlers } from '../src/mock';
import '../src/tailwind.css';

// Initialize MSW
initialize();

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: { handlers },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
