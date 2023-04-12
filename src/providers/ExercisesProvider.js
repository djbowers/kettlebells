import { useState } from 'react';

import { ExercisesContext } from '../contexts';
import { useAirtableExercises } from '../hooks';

export const ExercisesProvider = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const exercises = useAirtableExercises();

  return (
    <ExercisesContext.Provider
      value={{ exercises, activeWorkout, setActiveWorkout }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
