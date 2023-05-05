import { FOCUSES } from './focuses.constants';
import { GRIPS } from './grips.constants';
import { LEVELS } from './levels.constants';
import { SET_LENGTHS } from './setLengths.constants';
import { SETS } from './sets.constants';

export const LEVEL_OPTIONS = LEVELS.map((level) => ({
  label: level,
  value: level,
}));

export const FOCUS_OPTIONS = FOCUSES.map((option) => ({
  label: option,
  value: option,
}));

export const SETS_OPTIONS = SETS.map((sets) => ({
  label: `${sets} set${sets > 1 ? 's' : ''} / exercise`,
  value: sets,
}));

export const SET_LENGTH_OPTIONS = SET_LENGTHS.map((setLength) => ({
  label: `${setLength} min / set`,
  value: setLength,
}));

export const GRIP_OPTIONS = GRIPS.map((grip) => ({
  label: grip,
  value: grip,
}));
