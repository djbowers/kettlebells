import { initialize, mswLoader } from 'msw-storybook-addon';

import { handlers } from '../src/mock';
import '../src/tailwind.css';

// Initialize MSW
initialize();

const preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' }, // A light background color
        { name: 'dark', value: '#000000' }, // A dark background color
        // Add other custom background colors if needed
      ],
    },
    msw: { handlers },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
