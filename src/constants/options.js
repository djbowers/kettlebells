export const WARMUP_DURATION = 5; // minutes

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const LEVEL_OPTIONS = LEVELS.map((level) => ({
  label: level,
  value: level,
}));

export const FOCUSES = [
  'Full Body',
  'Cardio',
  'Legs',
  'Back',
  'Core',
  'Chest',
  'Arms',
  'Shoulders',
];

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
