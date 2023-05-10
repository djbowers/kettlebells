import { FOCUSES, GRIPS } from '~/constants';
import { VARIATIONS } from '~/data';

import { ExerciseListItem } from './ExerciseListItem';

export default {
  component: ExerciseListItem,
};

export const Default = {
  args: {
    variation: VARIATIONS[4],
    options: {
      duration: 60,
      primaryFocus: FOCUSES[2],
      secondaryFocus: FOCUSES[4],
      sets: 3,
      setLength: 3,
      grip: GRIPS[0],
    },
  },
};
