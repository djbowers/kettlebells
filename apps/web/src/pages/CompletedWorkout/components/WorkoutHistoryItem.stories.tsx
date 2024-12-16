import { Meta } from '@storybook/react';

import {
  WorkoutHistoryItem,
  WorkoutHistoryItemProps,
} from './WorkoutHistoryItem';

export default {
  component: WorkoutHistoryItem,
  args: {
    completedWorkout: {
      bells: [16, 0],
      completedReps: 50,
      completedRounds: 10,
      date: new Date(),
      workoutGoal: 10,
      id: 123,
      movements: ['Front Squat'],
      repScheme: [5],
      rpe: 'ideal',
      workoutDetails: '',
    },
  } as WorkoutHistoryItemProps,
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = {};

export const Bodyweight = {
  args: {
    completedWorkout: {
      bells: [0, 0],
      completedReps: 50,
      completedRounds: 10,
      date: new Date(),
      workoutGoal: 10,
      id: 456,
      movements: ['Pull-Ups'],
      repScheme: [5],
      rpe: 'ideal',
      workoutDetails: '',
    },
  } as WorkoutHistoryItemProps,
};
