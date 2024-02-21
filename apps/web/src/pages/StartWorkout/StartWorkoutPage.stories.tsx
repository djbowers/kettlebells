import { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_WORKOUT_OPTIONS, WorkoutOptionsContext } from '~/contexts';

import { StartWorkoutPage } from './StartWorkoutPage';

export default {
  component: StartWorkoutPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
    (Story, { parameters }) => (
      <WorkoutOptionsContext.Provider
        value={[DEFAULT_WORKOUT_OPTIONS, parameters.updateWorkoutOptions]}
      >
        <Story />
      </WorkoutOptionsContext.Provider>
    ),
  ],
} as Meta;

export const Default = {};
