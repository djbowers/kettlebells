import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { useLogWorkout } from '~/api';

import * as stories from './ActiveWorkoutPage.stories';

const {
  BodyweightMovements,
  DoubleWeights,
  MixedWeights,
  MultipleMovements,
  MultipleMovementsAndMixedWeights,
  OneHanded,
  RepLadders,
  TwoHanded,
  WorkoutGoalRounds,
} = composeStories(stories);

describe('finishing a workout', () => {
  vi.mock('~/api', () => ({
    useLogWorkout: vi.fn(),
  }));

  const logWorkout = vi.fn();

  beforeEach(() =>
    useLogWorkout.mockReturnValue({
      mutate: logWorkout,
      data: null,
      isLoading: false,
    }),
  );

  afterEach(() => vi.clearAllMocks());

  test('can finish workout early by clicking finish button', async () => {
    render(<DoubleWeights />);

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    // Should call logWorkout mutation
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: expect.any(Number),
      completedRounds: expect.any(Number),
      completedRungs: expect.any(Number),
    });
  });

  test('automatically finishes when reaching workout goal', async () => {
    const { workoutOptions } = WorkoutGoalRounds.parameters;
    render(<WorkoutGoalRounds />);

    // Complete all rounds
    for (let i = 0; i < workoutOptions.workoutGoal; i++) {
      await clickContinue();
    }

    // Should call logWorkout mutation
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: expect.any(Number),
      completedRounds: expect.any(Number),
      completedRungs: expect.any(Number),
    });
  });
});

describe('active workout page (double weights)', () => {
  const { workoutOptions } = DoubleWeights.parameters;

  beforeEach(() => {
    render(<DoubleWeights />);
  });

  test('renders the movement name', () => {
    screen.getByText(workoutOptions.movements[0].movementName);
  });

  test('displays left and right weights', () => {
    const { movements } = workoutOptions;
    const movement = movements[0];

    const leftWeight = screen.getByTestId('left-weight');
    const rightWeight = screen.getByTestId('right-weight');

    expect(leftWeight).toHaveTextContent(movement.weightOneValue);
    expect(rightWeight).toHaveTextContent(movement.weightTwoValue);
  });
});

describe('active workout page (one-handed)', () => {
  const { workoutOptions } = OneHanded.parameters;

  beforeEach(() => {
    render(<OneHanded />);
  });

  test('alternates single weight between right and left side for each rung', async () => {
    const { movements } = workoutOptions;
    const weightValue = movements[0].weightOneValue;

    const leftWeight = screen.getByTestId('left-weight');
    const rightWeight = screen.getByTestId('right-weight');
    const round = screen.getByTestId('current-round');

    expect(leftWeight).toHaveTextContent(weightValue);
    expect(rightWeight).not.toHaveTextContent();
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftWeight).not.toHaveTextContent();
    expect(rightWeight).toHaveTextContent(weightValue);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftWeight).toHaveTextContent(weightValue);
    expect(rightWeight).not.toHaveTextContent();
    expect(round).toHaveTextContent('2');

    await clickContinue();

    expect(leftWeight).not.toHaveTextContent();
    expect(rightWeight).toHaveTextContent(weightValue);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (two-handed)', () => {
  const { workoutOptions } = TwoHanded.parameters;

  beforeEach(() => {
    render(<TwoHanded />);
  });

  test('single weight is fixed on left side for two-handed workouts', async () => {
    const { movements } = workoutOptions;
    const weightValue = movements[0].weightOneValue;

    const leftWeight = screen.getByTestId('left-weight');
    const rightWeight = screen.getByTestId('right-weight');
    const round = screen.getByTestId('current-round');

    expect(leftWeight).toHaveTextContent(weightValue);
    expect(rightWeight).not.toHaveTextContent();
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftWeight).toHaveTextContent(weightValue);
    expect(rightWeight).not.toHaveTextContent();
    expect(round).toHaveTextContent('2');

    await clickContinue();

    expect(leftWeight).toHaveTextContent(weightValue);
    expect(rightWeight).not.toHaveTextContent();
    expect(round).toHaveTextContent('3');
  });
});

describe('active workout page (rep ladders)', () => {
  const { workoutOptions } = RepLadders.parameters;

  beforeEach(() => {
    render(<RepLadders />);
  });

  test('renders rep ladders correctly', async () => {
    const { movements } = workoutOptions;
    const repScheme = movements[0].repScheme;

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

describe('active workout page (mixed weights)', () => {
  const { workoutOptions } = MixedWeights.parameters;

  beforeEach(() => {
    render(<MixedWeights />);
  });

  test('alternates weights between left and right hands for each rung', async () => {
    const { movements } = workoutOptions;
    const primaryWeightValue = movements[0].weightOneValue;
    const secondaryWeightValue = movements[0].weightTwoValue;

    const leftWeight = screen.getByTestId('left-weight');
    const rightWeight = screen.getByTestId('right-weight');
    const round = screen.getByTestId('current-round');

    expect(leftWeight).toHaveTextContent(primaryWeightValue);
    expect(rightWeight).toHaveTextContent(secondaryWeightValue);

    await clickContinue();

    expect(leftWeight).toHaveTextContent(secondaryWeightValue);
    expect(rightWeight).toHaveTextContent(primaryWeightValue);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(leftWeight).toHaveTextContent(primaryWeightValue);
    expect(rightWeight).toHaveTextContent(secondaryWeightValue);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (multiple movements)', () => {
  const { workoutOptions } = MultipleMovements.parameters;

  beforeEach(() => {
    render(<MultipleMovements />);
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(
      workoutOptions.movements[0].movementName,
    );

    await clickContinue();

    expect(currentMovement).toHaveTextContent(
      workoutOptions.movements[1].movementName,
    );
  });
});

describe('active workout page (multiple movements and mixed weights)', () => {
  const { workoutOptions } = MultipleMovementsAndMixedWeights.parameters;

  beforeEach(() => {
    render(<MultipleMovementsAndMixedWeights />);
  });

  test('switches between mixed weights, then movements, then reps', async () => {
    const { movements } = workoutOptions;
    const primaryWeightValue = movements[0].weightOneValue;
    const secondaryWeightValue = movements[0].weightTwoValue;

    const currentMovement = screen.getByText(movements[0].movementName);
    const leftWeight = screen.getByTestId('left-weight');
    const rightWeight = screen.getByTestId('right-weight');
    const round = screen.getByTestId('current-round');
    expect(round).toHaveTextContent('1');

    expect(leftWeight).toHaveTextContent(primaryWeightValue);
    expect(rightWeight).toHaveTextContent(secondaryWeightValue);

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[0].movementName);
    expect(leftWeight).toHaveTextContent(secondaryWeightValue);
    expect(rightWeight).toHaveTextContent(primaryWeightValue);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[1].movementName);
    expect(leftWeight).toHaveTextContent(primaryWeightValue);
    expect(rightWeight).toHaveTextContent(secondaryWeightValue);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[1].movementName);
    expect(leftWeight).toHaveTextContent(secondaryWeightValue);
    expect(rightWeight).toHaveTextContent(primaryWeightValue);
    expect(round).toHaveTextContent('1');

    await clickContinue();

    expect(currentMovement).toHaveTextContent(movements[0].movementName);
    expect(leftWeight).toHaveTextContent(primaryWeightValue);
    expect(rightWeight).toHaveTextContent(secondaryWeightValue);
    expect(round).toHaveTextContent('2');
  });
});

describe('active workout page (bodyweight movements)', () => {
  const { workoutOptions } = BodyweightMovements.parameters;

  beforeEach(() => {
    render(<BodyweightMovements />);
  });

  test('alternates between movements', async () => {
    const currentMovement = screen.getByText(
      workoutOptions.movements[0].movementName,
    );

    await clickContinue();

    expect(currentMovement).toHaveTextContent(
      workoutOptions.movements[1].movementName,
    );
  });
});

const clickContinue = async () => {
  const continueButton = screen.getByRole('button', { name: 'Continue' });
  await userEvent.click(continueButton);
};
