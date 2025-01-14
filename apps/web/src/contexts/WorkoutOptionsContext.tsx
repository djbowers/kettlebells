import { createContext, useContext, useState } from 'react';

import { WorkoutOptions } from '~/types';

export const DEFAULT_WORKOUT_OPTIONS: WorkoutOptions = {
  bells: [16, 0],
  intervalTimer: 0,
  isOneHanded: true,
  movements: [''],
  repScheme: [5],
  restTimer: 0,
  workoutDetails: null,
  workoutGoal: 10,
  workoutGoalUnits: 'minutes',
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
