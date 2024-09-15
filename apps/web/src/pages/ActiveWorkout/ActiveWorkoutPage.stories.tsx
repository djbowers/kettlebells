import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import {
  DEFAULT_WORKOUT_OPTIONS,
  SessionProvider,
  WorkoutOptionsContext,
} from '~/contexts';
import { WorkoutOptions } from '~/types';

import { ActiveWorkoutPage } from './ActiveWorkoutPage';

const defaultWorkoutOptions: WorkoutOptions = {
  ...DEFAULT_WORKOUT_OPTIONS,
  movements: ['Single Arm Clean & Press'],
  workoutDetails: 'Example Workout Details',
};

export default {
  component: ActiveWorkoutPage,
  args: {
    defaultPaused: false,
  },
  decorators: [
    (Story, { parameters }) => (
      <WorkoutOptionsContext.Provider
        value={[
          { ...defaultWorkoutOptions, ...parameters.workoutOptions },
          () => {},
        ]}
      >
        <Story />
      </WorkoutOptionsContext.Provider>
    ),
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

export const DoubleBells: StoryObj = {
  parameters: {
    workoutOptions: {
      movements: ['Single Arm Front Squat'],
      bells: [20, 20],
    },
  },
};

export const SingleBellOneHanded: StoryObj = {
  parameters: {
    workoutOptions: {
      bells: [20, 0],
      isOneHanded: true,
    },
  },
};

export const SingleBellTwoHanded: StoryObj = {
  parameters: {
    workoutOptions: {
      bells: [20, 0],
      isOneHanded: false,
    },
  },
};

export const RepLadders: StoryObj = {
  parameters: {
    workoutOptions: {
      repScheme: [1, 2, 3],
      bells: [0, 0],
    },
  },
};

export const MixedBells: StoryObj = {
  parameters: {
    workoutOptions: {
      bells: [20, 16],
    },
  },
};

export const MultipleMovements: StoryObj = {
  parameters: {
    workoutOptions: {
      movements: ['Clean and Press', 'Front Squat'],
      bells: [16, 16],
    },
  },
};

export const MultipleMovementsAndMixedBells: StoryObj = {
  parameters: {
    workoutOptions: {
      movements: ['Clean and Press', 'Front Squat'],
      bells: [20, 16],
    },
  },
};

export const BodyweightMovements: StoryObj = {
  parameters: {
    workoutOptions: {
      movements: ['Push-Ups', 'Pull-Ups'],
      bells: [0, 0],
    },
  },
};

export const IntervalTimer: StoryObj = {
  parameters: {
    workoutOptions: {
      intervalTimer: 30,
    },
  },
};

export const RestTimer: StoryObj = {
  parameters: {
    workoutOptions: {
      restTimer: 30,
    },
  },
};

export const IntervalRestTimer: StoryObj = {
  parameters: {
    workoutOptions: {
      intervalTimer: 5,
      restTimer: 5,
    },
  },
};
