import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import { getDisplayDate } from './WorkoutHistoryItem';
import * as stories from './WorkoutHistoryItem.stories';

const { Default } = composeStories(stories);

describe('workout history item', () => {
  const { completedAt } = Default.args;

  beforeEach(() => {
    render(<Default />);
  });

  test('displays the date and duration of the workout', async () => {
    const date = getDisplayDate(completedAt.toISOString());
    await screen.findByText(`${date} (1h 15m)`);
  });
});
