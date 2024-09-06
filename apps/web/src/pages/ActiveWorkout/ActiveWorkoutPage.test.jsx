import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './ActiveWorkoutPage.stories';

const {
  BodyweightMovements,
  DoubleBells,
  MixedBells,
  MultipleMovements,
  MultipleMovementsAndMixedBells,
  RepLadders,
  SingleBellOneHanded,
  SingleBellTwoHanded,
} = composeStories(stories);

describe('active workout page (double bells)', () => {
  const { workoutOptions } = DoubleBells.parameters;

  beforeEach(() => {
    render(<DoubleBells />);
  });

  test('renders the movement name', () => {
    screen.getByText(workoutOptions.movements[0]);
  });

  test('displays left and right weights', () => {
    const { bells } = workoutOptions;

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');

    expect(leftBell).toHaveTextContent(bells[0]);
    expect(rightBell).toHaveTextContent(bells[1]);
  });
});

describe('active workout page (single bell, one-handed)', () => {
  const { workoutOptions } = SingleBellOneHanded.parameters;

  beforeEach(() => {
    render(<SingleBellOneHanded />);
  });

  test('alternates single bell between right and left side for each rung', async () => {
    const { bells } = workoutOptions;
    const bell = bells[0];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftBell).not.toHaveTextContent();
    expect(rightBell).toHaveTextContent(bell);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('2');

    await clickContinue();

    expect(leftBell).not.toHaveTextContent();
    expect(rightBell).toHaveTextContent(bell);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (single bell, two-handed)', () => {
  const { workoutOptions } = SingleBellTwoHanded.parameters;

  beforeEach(() => {
    render(<SingleBellTwoHanded />);
  });

  test('single bell weight is fixed on left side for two-handed workouts', async () => {
    const { bells } = workoutOptions;
    const bell = bells[0];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('2');

    await clickContinue();

    expect(leftBell).toHaveTextContent(bell);
    expect(rightBell).not.toHaveTextContent();
    expect(round).toHaveTextContent('3');
  });
});

describe('active workout page (rep ladders)', () => {
  const { workoutOptions } = RepLadders.parameters;

  beforeEach(() => {
    render(<RepLadders />);
  });

  test('renders rep ladders correctly', async () => {
    const { repScheme } = workoutOptions;

    const currentReps = screen.getByTestId('current-reps');
    expect(currentReps).toHaveTextContent(repScheme[0]);

    const round = screen.getByTestId('current-round');
    const completedSection = screen.getByTestId('completed-section');
    expect(completedSection).toHaveTextContent('0');

    await clickContinue();
    expect(currentReps).toHaveTextContent(repScheme[1]);
    expect(round).toHaveTextContent('1');
    expect(completedSection).toHaveTextContent('1');

    await clickContinue();
    expect(currentReps).toHaveTextContent(repScheme[2]);

    expect(round).toHaveTextContent('1');
    expect(completedSection).toHaveTextContent('3');

    await clickContinue();
    expect(currentReps).toHaveTextContent(repScheme[0]);

    expect(round).toHaveTextContent('2');
    expect(completedSection).toHaveTextContent('6');
  });
});

describe('active workout page (mixed bells)', () => {
  const { workoutOptions } = MixedBells.parameters;

  beforeEach(() => {
    render(<MixedBells />);
  });

  test('alternates weights between left and right hands for each rung', async () => {
    const { bells } = workoutOptions;
    const primaryBell = bells[0];
    const secondBell = bells[1];

    const leftBell = screen.getByTestId('left-bell');
    const rightBell = screen.getByTestId('right-bell');
    const round = screen.getByTestId('current-round');

    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);

    await clickContinue();

    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (multiple movements)', () => {
  const { workoutOptions } = MultipleMovements.parameters;

  beforeEach(() => {
    render(<MultipleMovements />);
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(workoutOptions.movements[0]);

    await clickContinue();

    expect(currentMovement).toHaveTextContent(workoutOptions.movements[1]);
  });
});

describe('active workout page (multiple movements and mixed bells)', () => {
  const { workoutOptions } = MultipleMovementsAndMixedBells.parameters;

  beforeEach(() => {
    render(<MultipleMovementsAndMixedBells />);
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

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[0]);
    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[1]);
    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[1]);
    expect(leftBell).toHaveTextContent(secondBell);
    expect(rightBell).toHaveTextContent(primaryBell);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[0]);
    expect(leftBell).toHaveTextContent(primaryBell);
    expect(rightBell).toHaveTextContent(secondBell);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (bodyweight movements)', () => {
  const { workoutOptions } = BodyweightMovements.parameters;

  beforeEach(() => {
    render(<BodyweightMovements />);
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(workoutOptions.movements[0]);

    await clickContinue();

    expect(currentMovement).toHaveTextContent(workoutOptions.movements[1]);
  });
});

const clickContinue = async () => {
  const continueButton = screen.getByRole('button', { name: 'Continue' });
  await userEvent.click(continueButton);
};
