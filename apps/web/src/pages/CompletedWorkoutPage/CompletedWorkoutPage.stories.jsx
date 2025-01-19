import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { WorkoutOptionsContext } from '~/contexts';

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
    (Story, { parameters }) => (
      <WorkoutOptionsContext.Provider
        value={[{}, parameters.updateWorkoutOptions]}
      >
        <Story />
      </WorkoutOptionsContext.Provider>
    ),
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const Default = {};
