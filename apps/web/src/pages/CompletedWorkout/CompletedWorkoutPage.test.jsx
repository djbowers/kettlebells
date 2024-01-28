import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import * as stories from './CompletedWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('completed workout page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('renders the completed workout history item', async () => {
    await screen.findByTestId('workout-history-item');
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
