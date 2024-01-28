import { Meta } from '@storybook/react';

import { StartWorkoutPage } from './StartWorkoutPage';

export default {
  component: StartWorkoutPage,
  args: {
    onStart: console.log,
  },
} as Meta;

export const Default = {};
