import { useContext, useRef } from 'react';

import { WARMUP_DURATION } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { generateWorkout } from '~/utils';

export const useGenerateWorkout = (options) => {
  const { exercises, variations, movementPatterns, configurations } =
    useContext(ExercisesContext);

  const { duration } = options;

  const remainingRef = useRef(duration - WARMUP_DURATION);

  return generateWorkout(
    exercises,
    variations,
    movementPatterns,
    configurations,
    options,
    remainingRef
  );
};
