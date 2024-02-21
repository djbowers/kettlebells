import { createContext, useContext, useState } from 'react';

import { WorkoutOptions } from '~/types';

export const DEFAULT_WORKOUT_OPTIONS: WorkoutOptions = {
  bells: [16, 0],
  duration: 10,
  intervalTimer: 0,
  movements: [''],
  notes: '',
  repScheme: [5],
  restTimer: 0,
};

export const WorkoutOptionsContext = createContext<
  [WorkoutOptions, (workoutOptions: WorkoutOptions) => void]
>(undefined!);

export const WorkoutOptionsProvider = ({ ...props }) => {
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOptions>(
    DEFAULT_WORKOUT_OPTIONS,
  );

  return (
    <WorkoutOptionsContext.Provider
      value={[workoutOptions, setWorkoutOptions]}
      {...props}
    />
  );
};

export const useWorkoutOptions = () => useContext(WorkoutOptionsContext);
