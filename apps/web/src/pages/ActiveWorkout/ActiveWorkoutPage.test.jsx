import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';



import * as stories from './ActiveWorkoutPage.stories';


const { Normal } = composeStories(stories);

describe('active workout page', () => {
  const { workoutOptions } = Normal.args;

  beforeEach(() => {
    render(<Normal />);
  });

  test('renders the task name and notes', () => {
    screen.getByText(workoutOptions.task);
    screen.getByText(workoutOptions.notes);
  });

  test('renders rep ladders correctly', () => {
    const { reps } = workoutOptions;
    const addButton = screen.getByLabelText('Add Reps');
    const displayedReps = screen.getByText(reps[0]);
    const round = screen.getByText('Round 1 Rung 1');
    const completed = screen.getByText('Completed 0 rungs and 0 reps');

    fireEvent.click(addButton);
    expect(displayedReps).toHaveTextContent(reps[1]);
    expect(round).toHaveTextContent('Round 1 Rung 2');
    expect(completed).toHaveTextContent('Completed 1 rungs and 1 reps');

    fireEvent.click(addButton);
    expect(displayedReps).toHaveTextContent(reps[2]);
    expect(round).toHaveTextContent('Round 1 Rung 3');
    expect(completed).toHaveTextContent('Completed 2 rungs and 3 reps');

    fireEvent.click(addButton);
    expect(displayedReps).toHaveTextContent(reps[0]);
    expect(round).toHaveTextContent('Round 2 Rung 1');
    expect(completed).toHaveTextContent('Completed 3 rungs and 6 reps');
  });
});