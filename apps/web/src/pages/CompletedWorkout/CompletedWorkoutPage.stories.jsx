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
  ],
};

export const Normal = {};
