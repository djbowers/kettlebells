import { createContext, useContext, useState } from 'react';

import { MovementOptions, WorkoutOptions } from '~/types';

export const DEFAULT_MOVEMENT_OPTIONS: MovementOptions = {
  movementName: '',
  repScheme: [5],
  weightOneUnit: 'kilograms',
  weightOneValue: 16,
  weightTwoUnit: null,
  weightTwoValue: null,
};

export const DEFAULT_WORKOUT_OPTIONS: WorkoutOptions = {
  intervalTimer: 0,
  movements: [],
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
