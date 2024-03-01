import { Meta } from '@storybook/react';
import { useState } from 'react';

import { WorkoutLog } from '~/types';

import { RPESelector } from './RPESelector';

export default {
  component: RPESelector,
} as Meta;

export const Default = () => {
  const [rpe, setRpe] = useState<WorkoutLog['rpe']>('ideal');
  return <RPESelector onSelectRPE={setRpe} rpeValue={rpe} />;
};
