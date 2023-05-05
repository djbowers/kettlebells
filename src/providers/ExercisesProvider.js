import { useState } from 'react';

import { ExercisesContext } from '../contexts';
import { useAirtableData } from '../hooks';

export const ExercisesProvider = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState([]);

  const { exercises, variations, movementPatterns, grips, levels } =
    useAirtableData();

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        variations,
        movementPatterns,
        grips,
        levels,
        activeWorkout,
        setActiveWorkout,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
