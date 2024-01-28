import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import { getDisplayDate } from '../CompletedWorkoutPage';
import * as stories from './WorkoutHistoryItem.stories';

const { Default } = composeStories(stories);

describe('workout history item', () => {
  beforeEach(() => {
    render(<Default />);
  });

  test('displays the date of the workout', async () => {
    const date = getDisplayDate(
      Default.args.completedWorkout.date.toISOString(),
    );
    await screen.findByText(date);
  });
});
