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
  WeightUnitsPounds,
  SingleWeight24Kg,
  DoubleWeights16And12Kg,
  SingleWeight53Lb,
  MixedUnits16KgAnd26_5Lb,
  MixedUnits35LbAnd12Kg,
  OneHanded16Kg,
  RepLadder16Kg,
  VolumeGoalExactMatch,
  VolumeGoalExceeded,
  VolumeGoalWithDecimalRounding,
  VolumeGoalWithDecimalRoundingUp,
  MinutesGoalHighVolume,
  RoundsGoalHighVolume,
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
      completedVolume: expect.any(Number),
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
      completedVolume: expect.any(Number),
    });
  });

  test('logs correct volume when using pounds as weight units', async () => {
    render(<WeightUnitsPounds />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 34,
    });
  });
});

describe('integration tests for previous volume persistence', () => {
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

  test('stores completed volume in workout log when workout is finished', async () => {
    render(<SingleWeight24Kg />);

    // Complete one set: 24kg × 5 reps = 120kg
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    // Verify completedVolume is included in the logged data
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120,
    });
  });

  test('stores completed volume when workout finishes automatically with volume goal', async () => {
    render(<VolumeGoalExactMatch />);

    // Complete one set: 24kg × 5 reps = 120kg (exactly matches goal)
    await clickContinue();

    // Should automatically call logWorkout with completedVolume
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120,
    });
  });

  test('stores rounded completed volume in workout log', async () => {
    render(<VolumeGoalWithDecimalRounding />);

    // Complete one set: 24.08kg × 5 reps = 120.4kg
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    // Verify volume is rounded to nearest integer
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120, // 120.4 rounds to 120
    });
  });
});

describe('volume calculation with kilogram weights', () => {
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

  test('calculates volume correctly for single weight (24kg × 5 reps = 120kg)', async () => {
    render(<SingleWeight24Kg />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120,
    });
  });

  test('calculates volume correctly for double weights ((16kg + 12kg) × 5 reps = 140kg)', async () => {
    render(<DoubleWeights16And12Kg />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 0,
      completedRungs: 0,
      completedVolume: 140,
    });
  });
});

describe('volume calculation with pound weights', () => {
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

  test('converts pounds to kilograms before calculation (53lb × 5 reps ≈ 120.2kg)', async () => {
    render(<SingleWeight53Lb />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: expect.any(Number),
    });

    // Verify conversion accuracy: 53lb × 0.453592 × 5 reps ≈ 120.2kg (rounded to 120)
    const actualVolume = logWorkout.mock.calls[0][0].completedVolume;
    expect(actualVolume).toBeCloseTo(120, 0);
  });
});

describe('volume calculation with mixed weight units', () => {
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

  test('converts mixed units independently (16kg + 26.5lb) × 5 reps ≈ 140kg', async () => {
    render(<MixedUnits16KgAnd26_5Lb />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 0,
      completedRungs: 0,
      completedVolume: expect.any(Number),
    });

    // Verify: (16 + 26.5 × 0.453592) × 5 ≈ 140kg
    const actualVolume = logWorkout.mock.calls[0][0].completedVolume;
    expect(actualVolume).toBeCloseTo(140, 0);
  });

  test('converts mixed units independently (35lb + 12kg) × 5 reps ≈ 139.3kg', async () => {
    render(<MixedUnits35LbAnd12Kg />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 0,
      completedRungs: 0,
      completedVolume: expect.any(Number),
    });

    // Verify: (35 × 0.453592 + 12) × 5 ≈ 139kg (rounded)
    const actualVolume = logWorkout.mock.calls[0][0].completedVolume;
    expect(actualVolume).toBeCloseTo(139, 0);
  });
});

describe('volume calculation with one-handed movements', () => {
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

  test('uses only primary weight when weightTwoValue === 0 (16kg × 5 reps = 80kg)', async () => {
    render(<OneHanded16Kg />);

    // Complete first side
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 0,
      completedRungs: 0,
      completedVolume: 80,
    });
  });
});

describe('volume calculation with bodyweight movements', () => {
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

  test('calculates volume as 0 when both weights are null', async () => {
    render(<BodyweightMovements />);

    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 0,
      completedRungs: 0,
      completedVolume: 0,
    });
  });
});

describe('volume accumulation across multiple rungs', () => {
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

  test('accumulates volume correctly across rep ladder [1, 2, 3] with 16kg (total = 96kg)', async () => {
    render(<RepLadder16Kg />);

    // Complete rung 1 (1 rep × 16kg = 16kg)
    await clickContinue();

    // Complete rung 2 (2 reps × 16kg = 32kg, total = 48kg)
    await clickContinue();

    // Complete rung 3 (3 reps × 16kg = 48kg, total = 96kg)
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 6, // 1 + 2 + 3
      completedRounds: 1,
      completedRungs: 3,
      completedVolume: 96, // 16 + 32 + 48
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

describe('automatic workout completion with volume goals', () => {
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

  test('automatically finishes when volume goal is exactly reached', async () => {
    render(<VolumeGoalExactMatch />);

    // Complete one set: 24kg × 5 reps = 120kg (exactly matches goal)
    await clickContinue();

    // Should automatically call logWorkout mutation
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120,
    });
  });

  test('automatically finishes when volume goal is exceeded', async () => {
    render(<VolumeGoalExceeded />);

    // Complete one set: 24kg × 5 reps = 120kg (exceeds goal of 100kg)
    await clickContinue();

    // Should automatically call logWorkout mutation
    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120,
    });
  });
});

describe('volume rounding on workout completion', () => {
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

  test('rounds volume down when decimal is < 0.5 (120.4kg rounds to 120kg)', async () => {
    render(<VolumeGoalWithDecimalRounding />);

    // Complete one set: 24.08kg × 5 reps = 120.4kg
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 120, // 120.4 rounds down to 120
    });
  });

  test('rounds volume up when decimal is >= 0.5 (120.6kg rounds to 121kg)', async () => {
    render(<VolumeGoalWithDecimalRoundingUp />);

    // Complete one set: 24.12kg × 5 reps = 120.6kg
    await clickContinue();

    await userEvent.click(
      screen.getByRole('button', { name: /finish workout/i }),
    );

    expect(logWorkout).toHaveBeenCalledWith({
      completedReps: 5,
      completedRounds: 1,
      completedRungs: 1,
      completedVolume: 121, // 120.6 rounds up to 121
    });
  });
});

describe('volume does not trigger completion for non-volume goals', () => {
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

  test('does not finish workout when reaching high volume with minutes goal', async () => {
    render(<MinutesGoalHighVolume />);

    // Complete multiple sets to accumulate high volume
    await clickContinue(); // 120kg
    await clickContinue(); // 240kg
    await clickContinue(); // 360kg

    // Should NOT automatically finish (minutes goal is 10 minutes)
    expect(logWorkout).not.toHaveBeenCalled();
  });

  test('does not finish workout when reaching high volume with rounds goal', async () => {
    render(<RoundsGoalHighVolume />);

    // Complete multiple sets to accumulate high volume
    await clickContinue(); // 120kg, round 1
    await clickContinue(); // 240kg, round 2
    await clickContinue(); // 360kg, round 3

    // Should NOT automatically finish (rounds goal is 10 rounds)
    expect(logWorkout).not.toHaveBeenCalled();
  });
});

const clickContinue = async () => {
  const continueButton = screen.getByRole('button', { name: 'Continue' });
  await userEvent.click(continueButton);
};
