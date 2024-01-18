import { Meta } from '@storybook/react';

import { WorkoutLog } from '~/types';

import { useState } from 'react';
import { RPESelector } from './RPESelector';

export default {
  component: RPESelector,
} as Meta;

export const Default = () => {
  const [rpe, setRpe] = useState<WorkoutLog['rpe']>('ideal')
  return <RPESelector rpeValue={rpe} onSelectRPE={setRpe} />
}