import { SETS, SET_LENGTHS } from '~/constants';

import { sampleRandomValue } from './random';

export const reduceVariations = (variations, exercises, options) => {
  const { duration } = options;

  const sets = options.sets || sampleRandomValue(SETS);
  const setLength = options.setLength || sampleRandomValue(SET_LENGTHS);

  const exerciseCounts = {};
  exercises.forEach(({ name }) => {
    exerciseCounts[name] = 0;
  });

  let remaining = duration;

  return variations.reduce((variations, variation) => {
    const [exerciseId] = variation.exercise;
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);

    if (remaining > 0 && exerciseCounts[exercise.name] < 1) {
      remaining -= setLength * sets;
      exerciseCounts[exercise.name] += 1;
      return [...variations, variation];
    }
    return variations;
  }, []);
};
