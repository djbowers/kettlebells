import {
  DEFAULT_DURATION,
  SETS,
  SET_LENGTHS,
  WARMUP_DURATION,
} from '~/constants';

import { sampleRandomValue } from './random';

export const getExerciseCount = (options = {}) => {
  const duration = options.duration || DEFAULT_DURATION;
  const sets = options.sets || sampleRandomValue(SETS);
  const setLength = options.setLength || sampleRandomValue(SET_LENGTHS);

  const withoutWarmup = duration - WARMUP_DURATION;
  const eachVariation = setLength * sets;

  return Math.floor(withoutWarmup / eachVariation);
};
