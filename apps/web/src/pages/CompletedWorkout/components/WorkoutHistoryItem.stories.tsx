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
    completedAt: DateTime.now().toJSDate(),
    completedReps: 50,
    completedRounds: 10,
    intervalTimer: 0,
    isOneHanded: false,
    movements: ['Front Squat'],
    repScheme: [5],
    restTimer: 0,
    startedAt: DateTime.now()
      .minus({ hours: 1, minutes: 15, seconds: 30 })
      .toJSDate(),
    workoutDetails: '',
    workoutGoal: 10,
    workoutGoalUnits: 'minutes',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<WorkoutHistoryItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RoundsGoal: Story = {
  args: {
    workoutGoal: 10,
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
    intervalTimer: 10,
    restTimer: 10,
  },
};
