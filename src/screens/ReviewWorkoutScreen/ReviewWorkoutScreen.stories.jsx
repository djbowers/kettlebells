import { FOCUSES, LEVELS } from '~/constants';

import { ReviewWorkoutScreen } from './ReviewWorkoutScreen';

export default {
  component: ReviewWorkoutScreen,
};

export const Screen = {
  args: {
    route: {
      params: {
        options: {
          duration: 60,
          level: LEVELS[0],
          primaryFocus: FOCUSES[0],
          sets: 3,
          setLength: 3,
        },
      },
    },
  },
};
