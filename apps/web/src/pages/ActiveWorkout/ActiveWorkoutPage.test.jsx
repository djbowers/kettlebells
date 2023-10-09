import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';

import * as stories from './ActiveWorkoutPage.stories';

const { DoubleBells, SingleBell, MismatchedBells } = composeStories(stories);

describe('active workout page (double bells)', () => {
  const { workoutOptions } = DoubleBells.args;
  let addButton;

  beforeEach(() => {
    render(<DoubleBells />);
    addButton = screen.getByLabelText('Add Reps');
  });

  test('renders the task name and notes', () => {
    screen.getByText(workoutOptions.tasks[0]);
    screen.getByText(workoutOptions.notes);
  });

  test('renders rep ladders correctly', () => {
    const { reps } = workoutOptions;

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

  test('displays left and right weights', () => {
    const { bells } = workoutOptions;

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');

    expect(leftBell).toHaveTextContent(`${bells[0]} kg`);
    expect(rightBell).toHaveTextContent(`${bells[1]} kg`);
  });
});

describe('active workout page (single bell)', () => {
  const { workoutOptions } = SingleBell.args;
  let addButton;

  beforeEach(() => {
    render(<SingleBell />);
    addButton = screen.getByLabelText('Add Reps');
  });

  test('alernates single bell between right and left side for each rung', () => {
    const { bells } = workoutOptions;
    const bell = bells[0];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const roundText = screen.getByText('Round 1 Rung 1');

    expect(leftBell).toHaveTextContent(`${bell} kg`);
    expect(rightBell).not.toHaveTextContent();

    fireEvent.click(addButton);

    expect(leftBell).not.toHaveTextContent();
    expect(rightBell).toHaveTextContent(`${bell} kg`);
    expect(roundText).toHaveTextContent('Round 1 Rung 1');

    fireEvent.click(addButton);

    expect(leftBell).toHaveTextContent(`${bell} kg`);
    expect(rightBell).not.toHaveTextContent();
    expect(roundText).toHaveTextContent('Round 1 Rung 2');
  });
});

describe('active workout page (mismatched bells)', () => {
  const { workoutOptions } = MismatchedBells.args;
  let addButton;

  beforeEach(() => {
    render(<MismatchedBells />);
    addButton = screen.getByLabelText('Add Reps');
  });

  test('alternates weights between left and right hands for each rung', () => {
    const { bells } = workoutOptions;
    const primaryBell = bells[0];
    const secondBell = bells[1];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const roundText = screen.getByText('Round 1 Rung 1');

    expect(leftBell).toHaveTextContent(`${primaryBell} kg`);
    expect(rightBell).toHaveTextContent(`${secondBell} kg`);

    fireEvent.click(addButton);

    expect(leftBell).toHaveTextContent(`${secondBell} kg`);
    expect(rightBell).toHaveTextContent(`${primaryBell} kg`);
    expect(roundText).toHaveTextContent('Round 1 Rung 1');

    fireEvent.click(addButton);

    expect(leftBell).toHaveTextContent(`${primaryBell} kg`);
    expect(rightBell).toHaveTextContent(`${secondBell} kg`);
    expect(roundText).toHaveTextContent('Round 1 Rung 2');
  });
});
