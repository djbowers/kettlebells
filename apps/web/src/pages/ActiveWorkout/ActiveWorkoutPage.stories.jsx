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

export const DoubleBells = {
  args: {
    workoutOptions: {
      task: 'Clean and Press',
      notes: 'The Giant',
      reps: [1, 2, 3],
      minutes: 20,
      bells: [20, 20],
    },
  },
};

export const SingleBell = {
  args: {
    workoutOptions: {
      task: 'Snatch',
      notes: 'King Sized Killer',
      reps: [1, 2, 3, 4, 5],
      minutes: 20,
      bells: [20],
    },
  },
};

export const MismatchedBells = {
  args: {
    workoutOptions: {
      task: 'Clean and Press',
      notes: 'The Giant',
      reps: [3, 6, 9],
      minutes: 20,
      bells: [20, 16],
    },
  },
};

export const SingleRung = {
  args: {
    workoutOptions: {
      task: 'Simple & Sinister',
      reps: [10],
      minutes: 5,
      bells: [28],
    },
  },
};
