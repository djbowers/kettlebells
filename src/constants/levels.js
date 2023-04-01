const BEGINNER = 'Beginner';
const INTERMEDIATE = 'Intermediate';
const ADVANCED = 'Advanced';

export const LEVEL_OPTIONS = [
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate 1', value: 'INTERMEDIATE_1' },
  { label: 'Intermediate 2', value: 'INTERMEDIATE_2' },
  { label: 'Advanced 1', value: 'ADVANCED_1' },
  { label: 'Advanced 2', value: 'ADVANCED_2' },
];

export const LEVELS_MAP = {
  BEGINNER: [BEGINNER],
  INTERMEDIATE_1: [BEGINNER, INTERMEDIATE],
  INTERMEDIATE_2: [INTERMEDIATE],
  ADVANCED_1: [INTERMEDIATE, ADVANCED],
  ADVANCED_2: [ADVANCED],
};
