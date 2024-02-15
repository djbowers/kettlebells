import { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { WorkoutOptionsContext } from '~/contexts';

import { DEFAULT_WORKOUT_OPTIONS, StartWorkoutPage } from './StartWorkoutPage';

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
