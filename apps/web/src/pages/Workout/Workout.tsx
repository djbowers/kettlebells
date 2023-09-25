import { useState } from 'react';

import { WorkoutOptions } from '~/types';

import { ActiveWorkout } from '../ActiveWorkout';
import { StartWorkoutPage } from '../StartWorkout';

export const Workout = () => {
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOptions | null>(
    null,
  );

  const handleStartWorkout = (opts: WorkoutOptions) => {
    setWorkoutOptions(opts);
    setStartedAt(new Date());
  };

  return (
    <>
      {startedAt && workoutOptions ? (
        <ActiveWorkout workoutOptions={workoutOptions} startedAt={startedAt} />
      ) : (
        <StartWorkoutPage onStart={handleStartWorkout} />
      )}
    </>
  );
};
