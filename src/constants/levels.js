const BEGINNER = 'Beginner';
const INTERMEDIATE = 'Intermediate';
const ADVANCED = 'Advanced';

export const LEVEL_OPTIONS = [
  { label: 'Beginner 1', value: 'BEGINNER_1' },
  { label: 'Beginner 2', value: 'BEGINNER_2' },
  { label: 'Intermediate 1', value: 'INTERMEDIATE_1' },
  { label: 'Intermediate 2', value: 'INTERMEDIATE_2' },
  { label: 'Advanced', value: 'ADVANCED' },
];

export const LEVELS_MAP = {
  BEGINNER_1: [BEGINNER],
  BEGINNER_2: [BEGINNER, INTERMEDIATE],
  INTERMEDIATE_1: [INTERMEDIATE],
  INTERMEDIATE_2: [INTERMEDIATE, ADVANCED],
  ADVANCED: [ADVANCED],
};
