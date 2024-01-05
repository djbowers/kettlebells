import { MemoryRouter } from 'react-router-dom';

import { HistoryPage } from './HistoryPage';

export default {
  component: HistoryPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Normal = {};
