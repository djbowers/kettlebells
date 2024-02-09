import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './ActiveWorkoutPage.stories';

const {
  DoubleBells,
  SingleBell,
  MismatchedBells,
  MultipleMovements,
  MultipleMovementsAndMixedBells,
  BodyweightMovements,
} = composeStories(stories);

describe('active workout page (double bells)', () => {
  const { workoutOptions } = DoubleBells.args;
  let continueButton;

  beforeEach(() => {
    render(<DoubleBells />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('renders the movement name', () => {
    screen.getByText(workoutOptions.movements[0]);
  });

  test('renders rep ladders correctly', () => {
    const { repScheme } = workoutOptions;

    const currentReps = screen.getByTestId('current-reps');
    expect(currentReps).toHaveTextContent(repScheme[0]);

    const round = screen.getByTestId('current-round');
    const completedSection = screen.getByTestId('completed-section');
    expect(completedSection).toHaveTextContent('0');

    fireEvent.click(continueButton);
    expect(currentReps).toHaveTextContent(repScheme[1]);
    expect(round).toHaveTextContent('1');
    expect(completedSection).toHaveTextContent('1');

    fireEvent.click(continueButton);
    expect(currentReps).toHaveTextContent(repScheme[2]);

    expect(round).toHaveTextContent('1');
    expect(completedSection).toHaveTextContent('3');

    fireEvent.click(continueButton);
    expect(currentReps).toHaveTextContent(repScheme[0]);

    expect(round).toHaveTextContent('2');
    expect(completedSection).toHaveTextContent('6');
  });

  test('displays left and right weights', () => {
    const { bells } = workoutOptions;

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');

    expect(leftBell).toHaveTextContent(bells[0]);
    expect(rightBell).toHaveTextContent(bells[1]);
  });
});

describe('active workout page (single bell)', () => {
  const { workoutOptions } = SingleBell.args;
  let continueButton;

  beforeEach(() => {
    render(<SingleBell />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('alternates single bell between right and left side for each rung', () => {
    const { bells } = workoutOptions;
    const bell = bells[0];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();

    fireEvent.click(continueButton);

    expect(leftBell).not.toHaveTextContent();
    expect(rightBell).toHaveTextContent(bell);
    expect(round).toHaveTextContent('1');

    fireEvent.click(continueButton);

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('1');
  });
});

describe('active workout page (mixed bells)', () => {
  const { workoutOptions } = MismatchedBells.args;
  let continueButton;

  beforeEach(() => {
    render(<MismatchedBells />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('alternates weights between left and right hands for each rung', () => {
    const { bells } = workoutOptions;
    const primaryBell = bells[0];
    const secondBell = bells[1];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');

    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);

    fireEvent.click(continueButton);

    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    fireEvent.click(continueButton);

    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('1');
  });
});

describe('active workout page (multiple movements)', () => {
  const { workoutOptions } = MultipleMovements.args;
  let continueButton;

  beforeEach(() => {
    render(<MultipleMovements />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(workoutOptions.movements[0]);

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(workoutOptions.movements[1]);
  });
});

describe('active workout page (multiple movements and mixed bells)', () => {
  const { workoutOptions } = MultipleMovementsAndMixedBells.args;
  let continueButton;

  beforeEach(() => {
    render(<MultipleMovementsAndMixedBells />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('switches between mixed bells, then movements, then reps', async () => {
    const { bells, movements } = workoutOptions;
    const primaryBell = bells[0];
    const secondBell = bells[1];

    const currentMovement = screen.getByText(movements[0]);
    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');
    expect(round).toHaveTextContent('1');

    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(movements[0]);
    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(movements[1]);
    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('1');

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(movements[1]);
    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(movements[0]);
    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (bodyweight movements)', () => {
  const { workoutOptions } = BodyweightMovements.args;
  let continueButton;

  beforeEach(() => {
    render(<BodyweightMovements />);
    continueButton = screen.getByRole('button', { name: 'Continue' });
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(workoutOptions.movements[0]);

    await userEvent.click(continueButton);

    expect(currentMovement).toHaveTextContent(workoutOptions.movements[1]);
  });
});
