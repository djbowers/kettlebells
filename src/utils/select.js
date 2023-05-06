import {
  LIMIT_PER_EXERCISE,
  SETS,
  SET_LENGTHS,
  WARMUP_DURATION,
} from '~/constants';

import { sampleRandomValue } from './random';

export const selectVariations = (
  primaryVariations,
  secondaryVariations,
  exercises,
  options
) => {
  const { duration } = options;

  const sets = options.sets || sampleRandomValue(SETS);
  const setLength = options.setLength || sampleRandomValue(SET_LENGTHS);

  const withoutWarmup = duration - WARMUP_DURATION;
  const eachVariation = setLength * sets;

  const numExercises = Math.floor(withoutWarmup / eachVariation);
  const primaryLimit = Math.floor(numExercises / 2) + (numExercises % 2);
  const secondaryLimit = Math.floor(numExercises / 2);

  const exerciseCounts = {};
  exercises.forEach(({ name }) => {
    exerciseCounts[name] = 0;
  });

  const selectedPrimaryVariations = primaryVariations.reduce(
    (variations, variation) => {
      const exercise = exercises.find(
        (exercise) => exercise.id === variation.exercise
      );
      const isUnderExerciseLimit =
        exerciseCounts[exercise.name] < LIMIT_PER_EXERCISE;

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

  const selectedSecondaryVariations = secondaryVariations.reduce(
    (variations, variation) => {
      const exercise = exercises.find(
        (exercise) => exercise.id === variation.exercise
      );
      const isUnderExerciseLimit =
        exerciseCounts[exercise.name] < LIMIT_PER_EXERCISE;

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
