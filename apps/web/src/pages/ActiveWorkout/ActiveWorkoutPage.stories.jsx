import { Router } from 'react-router-dom';

import { SessionProvider } from '~/contexts';

import { ActiveWorkout } from './ActiveWorkoutPage';

export default {
  component: ActiveWorkout,
  decorators: [
    (Story) => (
      <Router location="/">
        <Story />
      </Router>
    ),
    (Story) => (
      <SessionProvider value={{ user: {} }}>
        <Story />
      </SessionProvider>
    ),
  ],
};

export const Normal = {
  args: {
    workoutOptions: {
      task: 'Clean and Press',
      notes: 'The Giant',
      reps: [1, 2, 3],
      minutes: 5,
    },
  },
};
