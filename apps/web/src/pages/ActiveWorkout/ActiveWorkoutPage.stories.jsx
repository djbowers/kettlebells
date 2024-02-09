import { QueryClient, QueryClientProvider } from 'react-query';
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
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const DoubleBells = {
  args: {
    workoutOptions: {
      movements: ['Clean and Press'],
      notes: 'The Giant',
      repScheme: [1, 2, 3],
      duration: 20,
      bells: [20, 20],
    },
  },
};

export const SingleBell = {
  args: {
    workoutOptions: {
      movements: ['Snatch'],
      notes: 'King Sized Killer',
      repScheme: [1, 2, 3, 4, 5],
      duration: 20,
      bells: [20, 0],
    },
  },
};

export const MismatchedBells = {
  args: {
    workoutOptions: {
      movements: ['Clean and Press'],
      notes: 'The Giant',
      repScheme: [3, 6, 9],
      duration: 20,
      bells: [20, 16],
    },
  },
};

export const SingleRung = {
  args: {
    workoutOptions: {
      movements: ['Swing'],
      notes: 'Simple and Sinister',
      repScheme: [10],
      duration: 5,
      bells: [28, 0],
    },
  },
};

export const MultipleMovements = {
  args: {
    workoutOptions: {
      movements: ['Clean and Press', 'Front Squat'],
      repScheme: [3],
      duration: 10,
      bells: [16, 16],
    },
  },
};

export const MultipleMovementsAndMixedBells = {
  args: {
    workoutOptions: {
      movements: ['Clean and Press', 'Front Squat'],
      repScheme: [3],
      duration: 10,
      bells: [20, 16],
    },
  },
};

export const BodyweightMovements = {
  args: {
    workoutOptions: {
      movements: ['Push-Ups', 'Pull-Ups'],
      repScheme: [5],
      duration: 10,
      bells: [0, 0],
    },
  },
};
