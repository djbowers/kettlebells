import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { workoutLogs } from '~/mocks/data';

import { getDisplayDate } from './CompletedWorkoutPage';
import * as stories from './CompletedWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('completed workout page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('displays the date of the workout', async () => {
    const date = getDisplayDate(workoutLogs[0].started_at);
    await screen.findByText(date);
  });

  test('clicking on an RPE value updates the selected value', async () => {
    const idealOption = await screen.findByRole('radio', { name: 'Ideal' });
    const hardOption = screen.getByRole('radio', { name: 'Hard' });

    expect(idealOption).toBeChecked();
    expect(hardOption).not.toBeChecked();

    fireEvent.click(hardOption);

    await waitFor(() => {
      expect(idealOption).not.toBeChecked();
    });
    expect(hardOption).toBeChecked();
  });
});
