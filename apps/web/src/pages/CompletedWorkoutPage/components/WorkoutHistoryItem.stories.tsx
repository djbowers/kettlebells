import { Meta, StoryObj } from '@storybook/react';

import {
  WorkoutHistoryItem,
  WorkoutHistoryItemProps,
} from './WorkoutHistoryItem';

const meta = {
  component: WorkoutHistoryItem,
  args: {
    completedAt: new Date('2024-01-01T13:15:00'),
    completedReps: 50,
    completedRungs: 10,
    completedRounds: 10,
    intervalTimer: 0,
    movementLogs: [
      {
        movementName: 'Single Arm Front Squat',
        id: 1,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 16,
        weightTwoUnit: null,
        weightTwoValue: 0,
      },
      {
        movementName: 'Single Arm Overhead Press',
        id: 2,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 16,
        weightTwoUnit: null,
        weightTwoValue: 0,
      },
    ],
    movementLogsLoading: false,
    restTimer: 0,
    startedAt: new Date('2024-01-01T12:00:00'),
    workoutDetails: 'The Giant 3.0 W1D2',
    workoutGoal: 10,
    workoutGoalUnits: 'minutes',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<WorkoutHistoryItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DoubleBells: Story = {
  args: {
    movementLogs: [
      {
        movementName: 'Double Front Squat',
        id: 1,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 24,
        weightTwoUnit: 'kilograms',
        weightTwoValue: 24,
      },
      {
        movementName: 'Double Overhead Press',
        id: 2,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 24,
        weightTwoUnit: 'kilograms',
        weightTwoValue: 24,
      },
    ],
  },
};

export const MixedBells: Story = {
  args: {
    movementLogs: [
      {
        movementName: 'Double Front Squat',
        id: 1,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 16,
        weightTwoUnit: 'kilograms',
        weightTwoValue: 24,
      },
      {
        movementName: 'Double Overhead Press',
        id: 2,
        repScheme: [5],
        weightOneUnit: 'kilograms',
        weightOneValue: 16,
        weightTwoUnit: 'kilograms',
        weightTwoValue: 24,
      },
    ],
  },
};

export const RoundsGoal: Story = {
  args: {
    workoutGoal: 15,
    workoutGoalUnits: 'rounds',
  },
};

export const Bodyweight: Story = {
  args: {
    movementLogs: [
      {
        movementName: 'Pull-Ups',
        id: 1,
        repScheme: [5],
        weightOneUnit: null,
        weightOneValue: null,
        weightTwoUnit: null,
        weightTwoValue: null,
      },
    ],
  },
};

export const WithTimers: Story = {
  args: {
    intervalTimer: 60,
    restTimer: 30,
  },
};

export const Loading: Story = {
  args: {
    movementLogsLoading: true,
  },
};
