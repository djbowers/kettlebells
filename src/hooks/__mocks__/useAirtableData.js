import {
  EXAMPLE_EXERCISES,
  EXAMPLE_GRIPS,
  EXAMPLE_MOVEMENT_PATTERNS,
  EXAMPLE_VARIATIONS,
} from '~/examples';

export const useAirtableData = () => {
  return {
    exercises: EXAMPLE_EXERCISES,
    variations: EXAMPLE_VARIATIONS,
    movementPatterns: EXAMPLE_MOVEMENT_PATTERNS,
    grips: EXAMPLE_GRIPS,
  };
};
