import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CompletedWorkoutPage } from './CompletedWorkoutPage';

export default {
  component: CompletedWorkoutPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/history/66']}>
        <Routes>
          <Route path="/history/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const Normal = {};
