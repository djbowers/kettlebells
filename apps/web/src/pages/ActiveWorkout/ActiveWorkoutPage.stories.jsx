import { Router } from 'react-router-dom';

import { Page } from '~/components';
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
      <Page>
        <Story />
      </Page>
    ),
  ],
};

export const Normal = {
  args: {
    workoutOptions: {
      task: 'Clean and Press',
      notes: 'The Giant Week 2 Day 3',
      reps: [6],
      minutes: 5,
    },
  },
};
