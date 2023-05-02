import { FOCUSES, GRIPS } from '~/constants';

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
          primaryFocus: FOCUSES[2],
          secondaryFocus: null,
          sets: 3,
          setLength: 3,
          grip: GRIPS[0],
        },
      },
    },
  },
};
