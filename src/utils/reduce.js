import { SETS, SET_LENGTHS, WARMUP_DURATION } from '~/constants';

import { sampleRandomValue } from './random';

export const reduceVariations = (variations, exercises, options) => {
  const { duration } = options;

  const sets = options.sets || sampleRandomValue(SETS);
  const setLength = options.setLength || sampleRandomValue(SET_LENGTHS);

  const exerciseCounts = {};
  exercises.forEach(({ name }) => {
    exerciseCounts[name] = 0;
  });

  let remaining = duration - WARMUP_DURATION;

  return variations.reduce((variations, variation) => {
    const [exerciseId] = variation.exercise;
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);

    const allSetsLength = setLength * sets;

    if (remaining >= allSetsLength && exerciseCounts[exercise.name] < 1) {
      remaining -= allSetsLength;
      exerciseCounts[exercise.name] += 1;
      return [...variations, variation];
    }
    return variations;
  }, []);
};
