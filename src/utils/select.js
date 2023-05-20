import { EXERCISES } from '~/data';

import { getExerciseCount, getExerciseLimit } from './exercises';

export const selectVariations = (variations, options) => {
  const numExercises = getExerciseCount(options);
  const primaryLimit = Math.floor(numExercises / 2) + (numExercises % 2);
  const secondaryLimit = Math.floor(numExercises / 2);

  const exerciseLimit = getExerciseLimit(options);

  const exerciseCounts = {};
  EXERCISES.forEach(({ name }) => {
    exerciseCounts[name] = 0;
  });

  const selectedPrimaryVariations = variations.reduce(
    (variations, variation) => {
      const exercise = EXERCISES.find(
        (exercise) => exercise.id === variation.exercise
      );
      const isUnderExerciseLimit =
        exerciseCounts[exercise.name] < exerciseLimit;

      const isUnderPrimaryLimit = variations.length < primaryLimit;

      if (isUnderPrimaryLimit && isUnderExerciseLimit) {
        exerciseCounts[exercise.name] += 1;
        return [...variations, variation];
      }
      return variations;
    },
    []
  );

  const selectedPrimaryIds = selectedPrimaryVariations.map(({ id }) => id);

  const selectedSecondaryVariations = variations.reduce(
    (variations, variation) => {
      const exercise = EXERCISES.find(
        (exercise) => exercise.id === variation.exercise
      );
      const isUnderExerciseLimit =
        exerciseCounts[exercise.name] < exerciseLimit;

      const isUnderSecondaryLimit = variations.length < secondaryLimit;

      const includedInPrimary = selectedPrimaryIds.includes(variation.id);

      if (isUnderSecondaryLimit && isUnderExerciseLimit && !includedInPrimary) {
        exerciseCounts[exercise.name] += 1;
        return [...variations, variation];
      }
      return variations;
    },
    []
  );

  return [...selectedPrimaryVariations, ...selectedSecondaryVariations];
};
