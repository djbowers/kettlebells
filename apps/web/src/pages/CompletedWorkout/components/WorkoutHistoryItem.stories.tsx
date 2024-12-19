import { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';

import {
  WorkoutHistoryItem,
  WorkoutHistoryItemProps,
} from './WorkoutHistoryItem';

const meta = {
  component: WorkoutHistoryItem,
  args: {
    bells: [16, 0],
    completedAt: new Date('2024-01-01T13:15:00'),
    completedReps: 50,
    completedRounds: 10,
    intervalTimer: 0,
    isOneHanded: true,
    movements: ['Single Arm Front Squat', 'Single Arm Overhead Press'],
    repScheme: [5],
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
    bells: [24, 24],
  },
};

export const MixedBells: Story = {
  args: {
    bells: [24, 16],
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
    bells: [0, 0],
    isOneHanded: null,
    movements: ['Pull-Ups'],
  },
};

export const WithTimers: Story = {
  args: {
    intervalTimer: 60,
    restTimer: 30,
  },
};
