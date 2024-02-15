import { createContext, useContext, useState } from 'react';

import { DEFAULT_WORKOUT_OPTIONS } from '~/pages';
import { WorkoutOptions } from '~/types';

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
