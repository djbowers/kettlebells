import { Meta, StoryObj } from '@storybook/react';

import { WorkoutSummary } from './WorkoutSummary';

const meta = {
  component: WorkoutSummary,
  args: {
    completedReps: 15,
    completedRounds: 3,
    handleClickFinish: () => {},
    isBodyweight: false,
    startedAt: new Date(),
    workoutGoal: 30,
    workoutGoalUnits: 'minutes',
    workoutVolume: 600,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkoutSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bodyweight: Story = {
  args: {
    isBodyweight: true,
  },
};

export const Rounds: Story = {
  args: {
    workoutGoal: 10,
    workoutGoalUnits: 'rounds',
  },
};
