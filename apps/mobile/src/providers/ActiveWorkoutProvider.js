import { useState } from 'react';
import { ActiveWorkoutContext } from '~/contexts';

export const ActiveWorkoutProvider = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState([]);

  return (
    <ActiveWorkoutContext.Provider value={[activeWorkout, setActiveWorkout]}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
