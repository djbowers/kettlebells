import { useState } from 'react';

import { ExercisesContext } from '../contexts';
import { useAirtableData } from '../hooks';

export const ExercisesProvider = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState([]);

  const { exercises, variations, movementPatterns, configurations } =
    useAirtableData();

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        variations,
        movementPatterns,
        configurations,
        activeWorkout,
        setActiveWorkout,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
