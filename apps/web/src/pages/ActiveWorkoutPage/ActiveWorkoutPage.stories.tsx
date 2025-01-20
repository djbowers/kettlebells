import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import {
  DEFAULT_MOVEMENT_OPTIONS,
  DEFAULT_WORKOUT_OPTIONS,
  SessionProvider,
  WorkoutOptionsContext,
} from '~/contexts';
import { WorkoutOptions } from '~/types';

import { ActiveWorkoutPage } from './ActiveWorkoutPage';

const defaultWorkoutOptions: WorkoutOptions = {
  ...DEFAULT_WORKOUT_OPTIONS,
  movements: [
    { ...DEFAULT_MOVEMENT_OPTIONS, movementName: 'Single Arm Clean & Press' },
  ],
  workoutDetails: 'Example Workout Details',
};

const meta = {
  component: ActiveWorkoutPage,
  args: {
    defaultPaused: false,
  },
  decorators: [
    (Story, { parameters }) => (
      <WorkoutOptionsContext.Provider
        value={[
          {
            ...defaultWorkoutOptions,
            ...parameters.workoutOptions,
          },
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
} satisfies Meta<typeof ActiveWorkoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoubleWeights: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Double Front Squat',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 20,
          weightTwoUnits: 'kilograms',
        },
      ],
    },
  },
};

export const OneHanded: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Single Arm Front Squat',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 0,
          weightTwoUnits: null,
        },
      ],
    },
  },
};

export const TwoHanded: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Goblet Squat',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: null,
          weightTwoUnits: null,
        },
      ],
    },
  },
};

export const RepLadders: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Push-Ups',
          repScheme: [1, 2, 3],
          weightOneValue: null,
          weightOneUnits: null,
          weightTwoValue: null,
          weightTwoUnits: null,
        },
      ],
    },
  },
};

export const MixedWeights: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 16,
          weightTwoUnits: 'kilograms',
        },
      ],
    },
  },
};

export const MultipleMovements: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 20,
          weightTwoUnits: 'kilograms',
        },
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Front Squat',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 20,
          weightTwoUnits: 'kilograms',
        },
      ],
    },
  },
};

export const MultipleMovementsAndMixedWeights: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 16,
          weightTwoUnits: 'kilograms',
        },
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Front Squat',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 16,
          weightTwoUnits: 'kilograms',
        },
      ],
    },
  },
};

export const BodyweightMovements: Story = {
  parameters: {
    workoutOptions: {
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Push-Ups',
          weightOneValue: null,
          weightOneUnits: null,
          weightTwoValue: null,
          weightTwoUnits: null,
        },
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Pull-Ups',
          weightOneValue: null,
          weightOneUnits: null,
          weightTwoValue: null,
          weightTwoUnits: null,
        },
      ],
    },
  },
};

export const IntervalTimer: Story = {
  parameters: {
    workoutOptions: {
      intervalTimer: 30,
    },
  },
};

export const RestTimer: Story = {
  parameters: {
    workoutOptions: {
      restTimer: 30,
    },
  },
};

export const IntervalRestTimer: Story = {
  parameters: {
    workoutOptions: {
      intervalTimer: 5,
      restTimer: 5,
    },
  },
};

export const WorkoutGoalRounds: Story = {
  parameters: {
    workoutOptions: {
      workoutGoal: 10,
      workoutGoalUnits: 'rounds',
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
          weightOneValue: 20,
          weightOneUnits: 'kilograms',
          weightTwoValue: 20,
          weightTwoUnits: 'kilograms',
        },
      ],
    },
  },
};
