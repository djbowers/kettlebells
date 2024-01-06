import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import { workoutLogs } from '~/mocks/data';

import { getDisplayDate } from './CompletedWorkoutPage';
import * as stories from './CompletedWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('completed workout page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('displays information about the completed workout', async () => {
    await screen.findByText(getDisplayDate(workoutLogs[0].started_at));
  });
});
