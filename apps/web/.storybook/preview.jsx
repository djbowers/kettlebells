import { initialize, mswLoader } from 'msw-storybook-addon';

import { handlers } from '../src/mock';
import '../src/tailwind.css';

// Initialize MSW
initialize();

const preview = {
  parameters: {
    msw: { handlers },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
