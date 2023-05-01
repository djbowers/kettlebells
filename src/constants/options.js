import { FOCUSES } from './focuses';
import { GRIPS } from './grips';
import { LEVELS } from './levels';

export const LEVEL_OPTIONS = LEVELS.map((level) => ({
  label: level,
  value: level,
}));

export const FOCUS_OPTIONS = FOCUSES.map((option) => ({
  label: option,
  value: option,
}));

const SET_COUNTS = [1, 2, 3, 4, 5];

export const SET_COUNT_OPTIONS = SET_COUNTS.map((sets) => ({
  label: `${sets} set${sets > 1 ? 's' : ''} / exercise`,
  value: sets,
}));

const SET_LENGTHS = [1, 2, 3, 4, 5];

export const SET_LENGTH_OPTIONS = SET_LENGTHS.map((setLength) => ({
  label: `${setLength} min / set`,
  value: setLength,
}));

export const GRIP_OPTIONS = GRIPS.map((grip) => ({
  label: grip,
  value: grip,
}));
