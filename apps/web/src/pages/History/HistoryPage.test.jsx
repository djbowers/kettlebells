import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import { workoutLogs } from '~/mocks/data';

import * as stories from './HistoryPage.stories';

const { Normal } = composeStories(stories);

describe('workout history page', () => {
  const workoutLog = workoutLogs[0];

  beforeEach(() => {
    render(<Normal />);
  });

  test('renders name of task', async () => {
    await screen.findByText(workoutLog.tasks[0], { exact: false });
  });

  test('renders additional notes', async () => {
    await screen.findByText(workoutLog.notes, { exact: false });
  });

  test('renders length of workout', async () => {
    await screen.findByText(`${workoutLog.minutes} Minutes`, { exact: false });
  });

  test('renders rep ladders correctly', async () => {
    await screen.findByText(`Reps / Round: ${workoutLog.reps.join(', ')}`, {
      exact: false,
    });
  });
});
