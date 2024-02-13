import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Router } from 'react-router-dom';

import { SessionProvider } from '~/contexts';
import { WorkoutOptions } from '~/types';

import { ActiveWorkout } from './ActiveWorkoutPage';

const defaultWorkoutOptions: WorkoutOptions = {
  movements: ['Single Arm Clean & Press'],
  notes: 'Example Notes',
  repScheme: [5],
  duration: 20,
  bells: [16, 0],
  intervalTimer: 0,
};

export default {
  component: ActiveWorkout,
  args: {
    workoutOptions: defaultWorkoutOptions,
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <SessionProvider
        value={{
          user: {
            id: '123',
            app_metadata: {},
            user_metadata: {},
            created_at: '',
            aud: '',
          },
          access_token: '',
          refresh_token: '',
          expires_in: 10000,
          token_type: '',
        }}
      >
        <Story />
      </SessionProvider>
    ),
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

export const DoubleBells = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      bells: [20, 20],
    },
  },
};

export const SingleBell = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      bells: [20, 0],
    },
  },
};

export const RepLadders = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      repScheme: [1, 2, 3],
      bells: [16, 16],
    },
  },
};

export const MixedBells = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      bells: [20, 16],
    },
  },
};

export const SingleRung = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      repScheme: [10],
    },
  },
};

export const MultipleMovements = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      movements: ['Clean and Press', 'Front Squat'],
      bells: [16, 16],
    },
  },
};

export const MultipleMovementsAndMixedBells = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      movements: ['Clean and Press', 'Front Squat'],
      bells: [20, 16],
    },
  },
};

export const BodyweightMovements = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      movements: ['Push-Ups', 'Pull-Ups'],
      bells: [0, 0],
    },
  },
};

export const IntervalTimer = {
  args: {
    workoutOptions: {
      ...defaultWorkoutOptions,
      intervalTimer: 0.5,
    },
  },
};
