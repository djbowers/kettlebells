import { Meta } from '@storybook/react';

import {
  WorkoutHistoryItem,
  WorkoutHistoryItemProps,
} from './WorkoutHistoryItem';

export default {
  component: WorkoutHistoryItem,
} as Meta;

export const Default = {
  args: {
    completedWorkout: {
      bells: [16, 0],
      completedReps: 50,
      completedRounds: 10,
      date: new Date(),
      duration: 10,
      id: 123,
      movements: ['Front Squat'],
      notes: '',
      repScheme: [5],
      rpe: 'ideal',
    },
  } as WorkoutHistoryItemProps,
};
