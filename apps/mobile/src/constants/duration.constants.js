import { range } from '~/utils/range';

export const DEFAULT_DURATION = 30; // mins

export const MIN_DURATION = 10;
export const MAX_DURATION = 60;
export const DURATION_STEP = 5;

export const DURATIONS = range(MIN_DURATION, MAX_DURATION, DURATION_STEP);
