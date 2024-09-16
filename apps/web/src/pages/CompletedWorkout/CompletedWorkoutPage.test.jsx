import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    await userEvent.click(hardOption);

    expect(idealOption).not.toBeChecked();
    expect(hardOption).toBeChecked();
  });

  test('users can enter post-workout notes', async () => {
    await userEvent.click(
      await screen.findByRole('button', { name: 'Add Notes' }),
    );

    const notesInput = await screen.findByRole('textbox', {
      name: 'Workout Notes',
    });

    await userEvent.type(notesInput, 'These are my notes');
    fireEvent.blur(notesInput);

    expect(notesInput).toHaveValue('These are my notes');

    const clearButton = await screen.findByRole('button', {
      name: 'Clear Notes',
    });
    await userEvent.click(clearButton);

    expect(
      screen.queryByRole('textbox', { name: 'Workout Notes' }),
    ).not.toBeInTheDocument();
  });
});
