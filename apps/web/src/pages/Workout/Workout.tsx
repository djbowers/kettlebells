import { useState } from 'react';

import { ActiveWorkout, WorkoutOptions } from '../ActiveWorkout';
import { StartWorkout } from '../StartWorkout';

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
        <StartWorkout onStart={handleStartWorkout} />
      )}
    </>
  );
};
